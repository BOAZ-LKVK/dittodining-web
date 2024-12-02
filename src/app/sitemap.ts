import { HOST } from "@/constants";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: HOST,
      lastModified: new Date(),
      priority: 1,
    },
  ];
}
