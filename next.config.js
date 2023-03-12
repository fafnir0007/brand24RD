module.exports = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/meilisearch/:path*',
        destination: 'https://meilisearch.willy.im/:path*',
      },
      {
        source: '/directus',
        destination: 'https://meilisearch.willy.im', // TODO: add direcuts URL
      }
    ]
  },
}