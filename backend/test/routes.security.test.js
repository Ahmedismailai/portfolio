const test = require("node:test");
const assert = require("node:assert/strict");

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-only-secret";
process.env.FRONTEND_URL = "http://localhost:3000";

const app = require("../src/app");

let server;
let baseUrl;

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, "127.0.0.1", () => {
      baseUrl = `http://127.0.0.1:${server.address().port}`;
      resolve();
    });
  });
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

test("health endpoint is public", async () => {
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
});

for (const [method, path] of [
  ["POST", "/api/auth/register"],
  ["GET", "/api/analytics"],
  ["GET", "/api/activity"],
  ["GET", "/api/blogs"],
]) {
  test(`${method} ${path} requires authentication`, async () => {
    const response = await fetch(`${baseUrl}${path}`, {
      method,
      headers: method === "POST" ? { "Content-Type": "application/json" } : undefined,
      body: method === "POST" ? JSON.stringify({}) : undefined,
    });
    assert.equal(response.status, 401);
  });
}

test("rejects a cross-origin API request from an untrusted origin", async () => {
  const response = await fetch(`${baseUrl}/api/home`, {
    headers: { Origin: "https://malicious.example" },
  });
  assert.equal(response.status, 403);
});
