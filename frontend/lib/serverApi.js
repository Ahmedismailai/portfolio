const rawApiUrl =
  process.env.BACKEND_API_URL || "http://localhost:5000/api";
const API_BASE_URL = (() => {
  const value = rawApiUrl.replace(/\/$/, "");
  if (/^https?:\/\//.test(value)) return value;
  return new URL(value, process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").toString().replace(/\/$/, "");
})();

export async function getPublicApi(path, fallback) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 120 },
      signal: AbortSignal.timeout(4000),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return fallback;
    return await response.json();
  } catch {
    return fallback;
  }
}
