import { z } from "zod";

// TODO: generate full schema from opeapi spec
export const DirectusArticleSchema = z.object({
  id: z.number().optional(),
  slug: z.string(),
  newspaper: z.string(),
  title: z.string(),
  author: z.string(),
  link: z.string(),
  // publication_date: z.string().datetime(),
  publication_date: z
    .string()
    .refine((d) => !isNaN(new Date(d).getTime()), "valid date"), // TODO: use zod date,
  content: z.string(),
  tags: z.array(z.string()),
});

export type DirectusArticle = z.infer<typeof DirectusArticleSchema>;

export const DirectusKV = z.object({
  key: z.string(),
  value: z.string(),
});

export const env = z.object({
  DIRECTUS_TOKEN: z.string(),
  DIRECTUS_URL: z.string(),
  CF_ACCESS_CLIENT_ID: z.string(),
  CF_ACCESS_CLIENT_SECRET: z.string(),
});

export const PlainArticleSchema = z.object({
  title: z.string(),
  author: z.string(),
  url: z.string(),
  content: z.string(),
  publication_date: z.string().datetime(),
  tags: z.array(z.string()),
  raw: z.object({}).optional(),
});

export type PlainArticle = z.infer<typeof PlainArticleSchema>;
