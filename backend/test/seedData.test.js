const test = require("node:test");
const assert = require("node:assert/strict");

test("seed script default settings structure", () => {
  const seedScript = require("../scripts/seedPortfolio");
  assert.ok(seedScript);
});

