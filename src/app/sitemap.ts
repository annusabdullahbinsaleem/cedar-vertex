import type { MetadataRoute } from "next";

const siteUrl = "https://www.cedarvertex.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: `${siteUrl}/terms-of-service` },
    { url: `${siteUrl}/privacy-policy` },
  ];
}
