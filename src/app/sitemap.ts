import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://geethikahairoil.shop";

  const staticRoutes = [
    "",
    "/collection",
    "/wishlist",
    "/policies/contact",
    "/policies/privacy-policy",
    "/policies/returns",
    "/policies/shipping",
    "/policies/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...staticRoutes];
}
