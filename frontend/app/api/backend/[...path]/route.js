import { revalidatePath } from "next/cache.js";

const requestHeaders = [
  "accept",
  "accept-language",
  "authorization",
  "content-type",
  "cookie",
  "user-agent",
];
const responseHeaders = [
  "content-disposition",
  "content-type",
  "vary",
];

const backendUrl = () => {
  const value = process.env.BACKEND_API_URL?.trim().replace(/\/$/, "");
  if (!value) return null;
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("Invalid backend URL");
  return url;
};

const revalidateContent = (resource) => {
  const paths = {
    blogs: ["/", "/blog"],
    experience: ["/"],
    projects: ["/", "/projects"],
    resume: ["/"],
    seo: ["/", "/robots.txt", "/sitemap.xml"],
    services: ["/", "/services"],
    settings: ["/"],
    skills: ["/", "/skills"],
    testimonials: ["/", "/testimonials"],
    "work-with": ["/"],
  }[resource];

  if (!paths) return;

  try {
    for (const path of paths) revalidatePath(path);
    if (resource === "blogs") revalidatePath("/blog/[slug]", "page");
  } catch (error) {
    if (process.env.NODE_ENV !== "test") {
      console.error("Content cache revalidation failed:", error.message);
    }
  }
};

async function handler(request, { params }) {
  let base;
  try {
    base = backendUrl();
  } catch {
    return Response.json(
      { success: false, message: "Backend URL is invalid" },
      { status: 500 },
    );
  }
  if (!base) {
    return Response.json(
      { success: false, message: "Backend is not configured" },
      { status: 503 },
    );
  }

  const resolvedParams = await params;
  const path = resolvedParams?.path || [];
  const incoming = new URL(request.url);
  const upstreamUrl = new URL(
    `${base.toString().replace(/\/$/, "")}/${path.map(encodeURIComponent).join("/")}`,
  );
  upstreamUrl.search = incoming.search;

  const headers = new Headers();
  for (const name of requestHeaders) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) headers.set("x-forwarded-for", forwardedFor);

  const isHasBody = !["GET", "HEAD"].includes(request.method);

  const init = {
    method: request.method,
    headers,
    redirect: "manual",
    cache: "no-store",
  };

  if (isHasBody) {
    init.body = request.body;
    init.duplex = "half";
  }

  try {
    const upstream = await fetch(upstreamUrl, init);
    const outputHeaders = new Headers();
    for (const name of responseHeaders) {
      const value = upstream.headers.get(name);
      if (value) outputHeaders.set(name, value);
    }
    outputHeaders.set("cache-control", "private, no-store, max-age=0");
    outputHeaders.set("pragma", "no-cache");

    const setCookies = upstream.headers.getSetCookie
      ? upstream.headers.getSetCookie()
      : upstream.headers.get("set-cookie")
        ? [upstream.headers.get("set-cookie")]
        : [];
    for (const cookie of setCookies)
      outputHeaders.append("set-cookie", cookie);

    if (
      upstream.ok &&
      ["POST", "PUT", "PATCH", "DELETE"].includes(request.method)
    ) {
      revalidateContent(path[0]);
    }

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: outputHeaders,
    });
  } catch (error) {
    console.error("Proxy route fetch error:", error.message);
    return Response.json(
      {
        success: false,
        message: "Backend is temporarily unavailable",
      },
      {
        status: 502,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}

export const dynamic = "force-dynamic";
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const HEAD = handler;
