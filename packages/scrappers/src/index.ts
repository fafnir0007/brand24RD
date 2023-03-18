import { mergeRouteHandlers } from "@brand24/common";
import { handleDiarioLibre } from "./diariolibre";
import { handleRSS } from "./rss";

export const handler = mergeRouteHandlers({
  "/rss": handleRSS,
  "/diario_libre": handleDiarioLibre,
});
