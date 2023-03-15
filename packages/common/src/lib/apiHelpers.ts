import type { NextApiHandler } from "next";
import { asHandler, endpoint } from "./better-api";

export type Decorator<T> = (handler: NextApiHandler<T>) => NextApiHandler<T>;
type Endpoint = ReturnType<typeof endpoint>;

export const mergeRouteHandlers =
  (
    maybeRoutes: Record<string, Endpoint>,
    decorators: Decorator<unknown>[] = []
  ): NextApiHandler =>
  (req, res) => {
    const flatPath = Array.isArray(req.query.path)
      ? `/${req.query.path.join("/")}`
      : req.query.path ?? "/";

    const handler = maybeRoutes[flatPath];

    if (!handler) {
      res.status(404).end();
      return;
    }

    return asHandler([handler], {
      decorators,
    })(req, res);
  };
