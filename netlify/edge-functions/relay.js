export default async (request) => {
  const url = new URL(request.url);
  url.protocol = "http:";
  url.hostname = "vpn.matsa12345.ir";
  url.port = "8080";

  const headers = new Headers(request.headers);
  headers.set("host", "vpn.matsa12345.ir");

  return await fetch(url.toString(), {
    method: request.method,
    headers,
    body: request.body,
    redirect: "manual",
  });
};
