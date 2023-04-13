import z from "zod";

import { endpoint, required } from "@brand24/common";

import { FeedError, FeedErrorSchema, parseFeed } from "./lib/parseRssFeeds";
import { PlainArticle, PlainArticleSchema } from "./schemas";

const bodySchema = z.object({
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
    })
  ),
});

const responseSchema = z.object({
  result: z.array(
    z.object({
      items: z.array(PlainArticleSchema),
      id: z.string(),
    })
  ),
  errors: z.array(FeedErrorSchema).optional(),
});

export const handleRSS = endpoint(
  {
    method: "post",
    bodySchema,
    responseSchema,
  },
  async ({ body }) => {
    const result: z.infer<typeof responseSchema>["result"] = [];
    const errors: FeedError[] = [];

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

      const parsedFeed = await parseFeed<PlainArticle, FeedError>(
        feed.id,
        feed.urls,
        (item) => {
          const url = new URL(
            required(
              item[fields.urlField],
              `item.link is missing from item: ${item}`
            )
          );

          // TODO: this is specific to listinDiario
          const fallbackDate = url.pathname.split("/").slice(2, -2).join("-");
          const fallbackDateString = `${fallbackDate}T00:00:00.000Z`;

          const rssItem = {
            title: item[fields.title],
            author: item[fields.author],
            url: url.toString(),
            publication_date:
              item[fields.publicationDate] ?? fallbackDateString,
            content: item[fields.content],
            tags: item[fields.categories],
          };

          const parsed = PlainArticleSchema.safeParse(rssItem);

          if (parsed.success) {
            return { parsed: parsed.data };
          } else {
            return {
              error: JSON.stringify({
                url: url.toString(),
                error: parsed.error.flatten(),
              }),
            };
          }
        }
      );

      result.push({ id: feed.id, items: parsedFeed.results });
      parsedFeed.errors.forEach((e) => errors.push(e));
    }

    return {
      body: {
        result,
        errors,
      },
    };
  }
);
