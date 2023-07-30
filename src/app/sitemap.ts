import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_SITE_URL as string;
  return [
    {
      url,
      lastModified: new Date(),
    },
    {
      url: `${url}/news`,
      lastModified: new Date(),
    },
  ];
}
