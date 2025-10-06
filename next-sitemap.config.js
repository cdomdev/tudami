/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://tudami.com/",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/api/*"],
  additionalPaths: async () => [
    {
      loc: "/",
      changefreq: "daily",
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/questions/create",
      changefreq: "daily",
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/questions/explore",
      changefreq: "daily",
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/offers/create  ",
      changefreq: "daily",
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/offers/explore",
      changefreq: "weekly",
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/resources",
      changefreq: "weekly",
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/news",
      changefreq: "daily",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/auth/login",
      changefreq: "weekly",
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/auth/register",
      changefreq: "weekly",
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/about",
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/cookies",
      changefreq: "yearly",
      priority: 0.3,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/privacy",
      changefreq: "yearly",
      priority: 0.3,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/terms",
      changefreq: "yearly",
      priority: 0.3,
      lastmod: new Date().toISOString(),
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api"],
      },
    ],
  },
};
