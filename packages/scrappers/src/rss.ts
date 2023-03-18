import z from "zod";

import { endpoint, required } from "@brand24/common";
import Parser from "rss-parser";

import { OnlyArticleUrlSchema, PlainArticleSchema } from "./schemas";

// TODO: add support for iso dates
const bodySchema = z.object({
  secret: z.string(),
  since: z.string().datetime().optional(),
  feeds: z.array(
    z.object({
      id: z.string(),
      urls: z.array(z.string()),
      fieldsConfig: z
        .object({
          publicationDate: z.string(),
          urlField: z.string(),
          content: z.string(),
          categories: z.string(),
          title: z.string(),
          author: z.string(),
        })
        .optional(),
      config: z // TODO: refactor this
        .object({
          urlsOnly: z.boolean().optional(),
        })
        .optional(),
    })
  ),
});

const responseSchema = z.object({
  result: z.array(
    z.object({
      items: z.union([
        z.array(PlainArticleSchema),
        z.array(OnlyArticleUrlSchema),
      ]),
      id: z.string(),
    })
  ),
  errors: z
    .array(
      z.object({
        id: z.string(),
        error: z.object({}),
      })
    )
    .optional(),
});

export const handleRSS = endpoint(
  {
    method: "post",
    bodySchema,
    responseSchema,
  },
  async ({ body }) => {
    const parser = new Parser();
    const since = body.since ? new Date(body.since) : undefined;

    const result: z.infer<typeof responseSchema>["result"] = [];
    const errors: z.infer<typeof responseSchema>["errors"] = [];

    for (const feed of body.feeds) {
      // TODO: make this in a way that we only parse fields that are present
      const fields = {
        ...feed.fieldsConfig,
        publicationDate: "isoDate",
        urlField: "link",
        content: "content:encodedSnippet",
        categories: "categories",
        title: "title",
        author: "creator",
      };

      const feedsSettled = await Promise.allSettled(
        feed.urls.map((u) => parser.parseURL(u))
      );

      feedsSettled.forEach((settled) => {
        if (settled.status === "rejected") {
          errors.push({
            id: feed.id,
            error: JSON.stringify({
              type: "promise_rejected",
              error: settled.reason,
            }),
          });
        } else {
          const filteredFeeds = settled.value.items.filter((feed) => {
            return since
              ? feed.items.filter((item: any) => {
                  const dateField = item[fields.publicationDate];

                  if (!dateField) {
                    return false;
                  }

                  return new Date(dateField) > since;
                })
              : settled.value.items;
          });

          const rssItems:
            | z.infer<typeof PlainArticleSchema>
            | z.infer<typeof OnlyArticleUrlSchema>[] = [];

          filteredFeeds.forEach((item) => {
            const url = new URL(
              required(
                item[fields.urlField],
                `item.link is missing from item: ${item}`
              )
            );

            const rssItem = {
              title: item[fields.title],
              author: item[fields.author],
              url: url.toString(),
              publication_date: item[fields.publicationDate],
              content: item[fields.content],
              tags: item[fields.categories],
            };

            const parsed = feed.config?.urlsOnly
              ? PlainArticleSchema.safeParse(rssItem)
              : OnlyArticleUrlSchema.safeParse(rssItem);

            if (parsed.success) {
              rssItems.push(parsed.data);
            } else {
              errors.push({
                id: feed.id,
                error: { url: url.toString(), error: parsed.error.flatten() },
              });
            }
          });

          result.push({
            id: feed.id,
            items: rssItems,
          });
        }
      });
    }

    return { body: { result, errors } };
  }
);
