const test = require("node:test");
const assert = require("node:assert/strict");
const sendToken = require("../src/utils/sendToken");

test("sets an HTTP-only cookie without exposing the token in JSON", () => {
  let cookie;
  let payload;
  const response = {
    status(code) { assert.equal(code, 200); return this; },
    cookie(name, value, options) { cookie = { name, value, options }; return this; },
    json(value) { payload = value; return this; },
  };
  const user = {
    _id: "admin-id",
    name: "Admin",
    email: "admin@example.com",
    role: "admin",
    avatar: {},
    getJwtToken: () => "signed-token",
  };

  sendToken(user, 200, response);

  assert.equal(cookie.name, "token");
  assert.equal(cookie.options.httpOnly, true);
  assert.equal(cookie.options.path, "/");
  assert.equal(payload.token, undefined);
  assert.equal(payload.user.email, "admin@example.com");
});
