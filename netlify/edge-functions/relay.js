export default async (request, context) => {
  try {
    // گرفتن آدرس از متغیر یا استفاده از مقدار پیش‌فرض
    const rawTarget = Deno.env.get("TARGET_DOMAIN") || "http://vpn.matsa12345.ir:8080";
    const targetBase = new URL(rawTarget);
    
    const url = new URL(request.url);
    const targetUrl = new URL(url.pathname + url.search, targetBase.origin);

    const headers = new Headers(request.headers);
    // حذف هدرهایی که باعث اختلال در هدایت می‌شوند
    headers.delete("host");
    headers.set("host", targetBase.hostname);

    return await fetch(targetUrl.toString(), {
      method: request.method,
      headers,
      body: request.body,
      redirect: "manual",
    });
  } catch (e) {
    return new Response("Matin, Debug Error: " + e.message, { status: 500 });
  }
};
