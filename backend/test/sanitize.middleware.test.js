const test = require("node:test");
const assert = require("node:assert/strict");
const { sanitizeRequest } = require("../src/middleware/sanitize.middleware");

const run = (body) =>
  new Promise((resolve) => {
    sanitizeRequest({ body, query: {}, params: {} }, {}, (error) => resolve(error));
  });

test("accepts normal nested request data", async () => {
  assert.equal(await run({ title: "Portfolio", links: { github: "https://example.com" } }), undefined);
});

test("rejects MongoDB operator keys", async () => {
  const error = await run({ email: { $ne: null } });
  assert.equal(error.statusCode, 400);
});

test("rejects prototype-pollution keys", async () => {
  const value = JSON.parse('{"nested":{"constructor":{"prototype":{"admin":true}}}}');
  const error = await run(value);
  assert.equal(error.statusCode, 400);
});
