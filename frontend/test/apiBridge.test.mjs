import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

process.env.NODE_ENV = "test";
const route = await import("../app/api/backend/[...path]/route.js");
const listen = (server) => new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const close = (server) => new Promise((resolve) => server.close(resolve));

test("API bridge forwards query, JSON body and secure session cookie", async () => {
  const calls = [];
  const upstream = http.createServer(async (request, response) => {
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    calls.push({ url: request.url, body: Buffer.concat(chunks).toString(), cookie: request.headers.cookie });
    response.setHeader("content-type", "application/json");
    response.setHeader("set-cookie", "token=admin-session; Path=/; HttpOnly; SameSite=Lax");
    response.end(JSON.stringify({ success: true }));
  });
  await listen(upstream);
  process.env.BACKEND_API_URL = `http://127.0.0.1:${upstream.address().port}/api`;
  try {
    const login = await route.POST(
      new Request("http://site.test/api/backend/auth/login?from=dashboard", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "admin@example.com", password: "test-password" }) }),
      { params: Promise.resolve({ path: ["auth", "login"] }) },
    );
    assert.equal(login.status, 200);
    assert.match(login.headers.get("set-cookie"), /token=admin-session/);
    assert.match(login.headers.get("cache-control"), /no-store/);
    assert.equal(calls[0].url, "/api/auth/login?from=dashboard");
    assert.deepEqual(JSON.parse(calls[0].body), { email: "admin@example.com", password: "test-password" });

    await route.GET(new Request("http://site.test/api/backend/auth/me", { headers: { cookie: "token=admin-session" } }), { params: Promise.resolve({ path: ["auth", "me"] }) });
    assert.equal(calls[1].cookie, "token=admin-session");
  } finally {
    delete process.env.BACKEND_API_URL;
    await close(upstream);
  }
});

test("API bridge fails safely without an upstream URL", async () => {
  delete process.env.BACKEND_API_URL;
  const response = await route.GET(new Request("http://site.test/api/backend/home"), { params: Promise.resolve({ path: ["home"] }) });
  assert.equal(response.status, 503);
});

test("API bridge preserves multipart uploads and prevents stale reads", async () => {
  const calls = [];
  const upstream = http.createServer(async (request, response) => {
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    calls.push({
      body: Buffer.concat(chunks),
      contentType: request.headers["content-type"],
    });
    response.setHeader("content-type", "application/json");
    response.setHeader(
      "cache-control",
      "public, max-age=30, s-maxage=120",
    );
    response.end(JSON.stringify({ success: true }));
  });
  await listen(upstream);
  process.env.BACKEND_API_URL =
    `http://127.0.0.1:${upstream.address().port}/api`;

  try {
    const form = new FormData();
    form.append("title", "Updated project");
    form.append(
      "image",
      new Blob(["test-image-bytes"], { type: "image/png" }),
      "project.png",
    );

    const response = await route.PUT(
      new Request("http://site.test/api/backend/projects/project-id", {
        method: "PUT",
        body: form,
      }),
      { params: Promise.resolve({ path: ["projects", "project-id"] }) },
    );

    assert.equal(response.status, 200);
    assert.match(calls[0].contentType, /^multipart\/form-data; boundary=/);
    assert.match(calls[0].body.toString(), /name="image"/);
    assert.match(calls[0].body.toString(), /test-image-bytes/);
    assert.equal(
      response.headers.get("cache-control"),
      "private, no-store, max-age=0",
    );
  } finally {
    delete process.env.BACKEND_API_URL;
    await close(upstream);
  }
});
