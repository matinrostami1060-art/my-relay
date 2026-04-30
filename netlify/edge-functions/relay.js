export default async (request, context) => {
  try {
    const TARGET_DOMAIN = Deno.env.get("TARGET_DOMAIN") || "https://vpn.matsa12345.ir:8080";
    
    const url = new URL(request.url);
    const target = new URL(TARGET_DOMAIN);

    const newUrl = new URL(url.pathname + url.search, target.origin);

    const headers = new Headers(request.headers);
    headers.set("host", target.hostname);

    return await fetch(newUrl.toString(), {
      method: request.method,
      headers,
      body: request.body,
      redirect: "manual",
    });
  } catch (e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
};
