const TARGET_BASE = (Netlify.env.get("TARGET_DOMAIN") || "").replace(/\/$/, "");
export default async function handler(request) {
  if (!TARGET_BASE) return new Response("TARGET_DOMAIN is not set", { status: 500 });
  const url = new URL(request.url);
  const targetUrl = TARGET_BASE + url.pathname + url.search;
  const headers = new Headers(request.headers);
  headers.delete("host");
  return fetch(targetUrl, { method: request.method, headers, body: request.body, redirect: "manual" });
}
