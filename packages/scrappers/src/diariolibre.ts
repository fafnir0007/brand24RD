import { endpoint, required } from "@brand24/common";
import { z } from "zod";
import { getDocumentDomElement } from "./lib/htmlParser";
import { FeedErrorSchema, parseFeed } from "./lib/parseRssFeeds";
import { PlainArticleSchema } from "./schemas";

export const handleDiarioLibre = endpoint(
  {
    method: "post",
    bodySchema: z.object({
      urls: z.array(z.string().url()),
    }),
    responseSchema: z.object({
      articles: z.array(PlainArticleSchema),
      errors: z.array(FeedErrorSchema).optional(),
    }),
  },
  async ({ body }) => {
    const parsedRssFeed = await parseFeed("diario_libre", body.urls, (item) => {
      return { parsed: item.link };
    });

    const htmls = await Promise.allSettled(
      parsedRssFeed.results
        .filter((url) => url)
        .map((url) => fetch(required(url)).then((res) => res.text()))
    );

    const articles = htmls
      .map((html) =>
        html.status === "fulfilled" ? parseArticleHtml(html.value) : []
      )
      .flat();

    return { body: { articles, errors: parsedRssFeed.errors } };
  }
);

export function parseArticleHtml(html: string) {
  const document = getDocumentDomElement(html);

  const ldJSON = document.querySelector('script[type="application/ld+json"]');
  const ldJSONContent = JSON.parse(ldJSON?.textContent);

  const ldArticle = ldJSONContent["@graph"].find(
    (e: any) => e["@type"] === "NewsArticle"
  );

  // ldArticle.publicationDate is in a weird format: 2023-03-09T00:01:00-04:00, so lets use this
  const publicationDate = document.querySelector(
    'meta[name="ArticlePublicationDate"]'
  );

  // TODO: log errors
  if (!ldArticle || !publicationDate) {
    return [];
  }

  const plainArticle = {
    title: ldArticle["headline"].replace("- Diario Libre", "").trim(),
    author: ldArticle["author"]["name"],
    url: ldArticle["mainEntityOfPage"]["@id"],
    publication_date: publicationDate?.getAttribute("content") ?? null,
    content: ldArticle["articleBody"]
      ?.replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
      .replace(/\s+/g, " ")
      .trim(),
    tags: ldArticle["articleSection"]?.split(",") ?? [],
  };

  return PlainArticleSchema.parse(plainArticle);
}
