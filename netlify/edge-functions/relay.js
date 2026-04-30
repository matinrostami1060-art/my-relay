export default async (request, context) => {
  const TARGET_DOMAIN = Deno.env.get("TARGET_DOMAIN");

  if (!TARGET_DOMAIN) {
    return new Response("TARGET_DOMAIN is not defined", { status: 500 });
  }

  const url = new URL(request.url);
  const targetUrl = new URL(TARGET_DOMAIN);
  
  url.protocol = targetUrl.protocol;
  url.hostname = targetUrl.hostname;
  url.port = targetUrl.port;

  const headers = new Headers(request.headers);
  headers.set("host", targetUrl.hostname);

  return fetch(url.toString(), {
    method: request.method,
    headers,
    body: request.body,
    redirect: "manual",
  });
};
