import Parser, { Item } from "rss-parser";
import { z } from "zod";

export const FeedErrorSchema = z.object({
  feedId: z.string(),
  error: z.object({
    type: z.string(),
    description: z.unknown(),
  }),
});

export type FeedError = z.infer<typeof FeedErrorSchema>;

export const parseFeed = async <T, Error extends FeedError>(
  feedId: string,
  urls: string[],
  transformer: (item: Item & Record<string, string>) =>
    | {
        parsed: T;
      }
    | { error: string }
): Promise<{ errors: Error[]; results: T[] }> => {
  const parser = new Parser();
  const errors: Error[] = [];
  const results: T[] = [];

  const feedsSettled = await Promise.allSettled(
    urls.map((u) => parser.parseURL(u))
  );

  feedsSettled.forEach((settled) => {
    if (settled.status === "rejected") {
      errors.push({
        feedId,
        error: {
          type: "promise_rejected",
          description: settled.reason.message,
        },
      } as Error);
    } else {
      settled.value.items.flatMap(transformer).forEach((item) =>
        "error" in item
          ? errors.push({
              feedId: feedId,
              error: { type: "transformer_error", description: item.error },
            } as Error)
          : results.push(item.parsed)
      );
    }
  });

  return { errors, results };
};
