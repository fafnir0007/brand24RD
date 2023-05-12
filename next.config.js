/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  output: "standalone",

  experimental: {
    appDir: true,
  },
  async rewrites() {
    const meilisearchHost =
      process.env.MEILISEARCH_HOST ?? "https://meilisearch.willy.im";

    const directusHost =
      process.env.DIRECTUS_HOST ?? "https://directus.willy.im";
    return [
      {
        source: "/meilisearch/:path*",
        destination: `${meilisearchHost}/:path*`,
      },
      {
        source: "/directus",
        destination: `${directusHost}/`,
      },
    ];
  },
};
