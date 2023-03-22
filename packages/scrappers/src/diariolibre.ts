import { endpoint } from "@brand24/common";
import { z } from "zod";
import { getDocumentDomElement } from "./lib/htmlParser";
import { PlainArticle, PlainArticleSchema } from "./schemas";

export const handleDiarioLibre = endpoint(
  {
    method: "post",
    bodySchema: z.object({
      urls: z.array(z.string().url()),
    }),
    responseSchema: z.object({
      articles: z.array(PlainArticleSchema),
    }),
  },
  async ({ body }) => {
    const htmls = await Promise.allSettled(
      body.urls.map((url) => fetch(url).then((res) => res.text()))
    );

    const articles = htmls
      .map((html) =>
        html.status === "fulfilled" ? parseArticleHtml(html.value) : []
      )
      .flat();

    return { body: { articles } };
  }
);

export function parseArticleHtml(html: string): PlainArticle {
  const document = getDocumentDomElement(html);

  const ldJSON = document.querySelector('script[type="application/ld+json"]');
  const ldJSONContent = JSON.parse(ldJSON?.textContent);

  const ldArticle = ldJSONContent["@graph"].find(
    (e: any) => e["@type"] === "NewsArticle"
  );

  // ldArticle.publicationDate is in a weird format: 2023-03-09T00:01:00-04:00, so lets use this
  const publicationDate = document
    .querySelector('meta[name="ArticlePublicationDate"]')
    .getAttribute("content");

  const plainArticle = {
    title: ldArticle["headline"].replace("- Diario Libre", "").trim(),
    author: ldArticle["author"]["name"],
    url: ldArticle["mainEntityOfPage"]["@id"],
    publication_date: publicationDate,
    content: ldArticle["articleBody"]
      ?.replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
      .replace(/\s+/g, " ")
      .trim(),
    tags: ldArticle["articleSection"]?.split(",") ?? [],
  };

  return PlainArticleSchema.parse(plainArticle);
}
