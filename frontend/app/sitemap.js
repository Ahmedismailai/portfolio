import { getPublicApi } from "@/lib/serverApi";

export default async function sitemap() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const routes = ["", "/blog", "/projects", "/skills", "/services", "/testimonials"];
  const response = await getPublicApi("/blogs/published", { blogs: [] });

  return [
    ...routes.map((route) => ({ url: `${baseUrl}${route}`, changeFrequency: "weekly", priority: route ? 0.8 : 1 })),
    ...(response.blogs || []).map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || blog.createdAt,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
