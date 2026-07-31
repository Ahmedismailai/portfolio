const requestHeaders = [
  "accept",
  "accept-language",
  "authorization",
  "content-type",
  "cookie",
  "user-agent",
];
const responseHeaders = [
  "cache-control",
  "content-disposition",
  "content-type",
  "etag",
  "last-modified",
  "vary",
];

const backendUrl = () => {
  const value = (process.env.BACKEND_API_URL || "https://portfolio-34jv.onrender.com/api")
    .trim()
    .replace(/\/$/, "");
  if (!value) return null;
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("Invalid backend URL");
  return url;
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
    const setCookies = upstream.headers.getSetCookie
      ? upstream.headers.getSetCookie()
      : upstream.headers.get("set-cookie")
        ? [upstream.headers.get("set-cookie")]
        : [];
    for (const cookie of setCookies)
      outputHeaders.append("set-cookie", cookie);

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: outputHeaders,
    });
  } catch (err) {
    console.error("Proxy route fetch error:", err);
    return Response.json(
      {
        success: false,
        message: err.message || "Backend is temporarily unavailable",
      },
      { status: 502 },
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
