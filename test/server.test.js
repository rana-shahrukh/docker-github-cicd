const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../src/app");

test("GET / returns API status", async () => {
  const response = await request(app)
    .get("/")
    .expect(200);

  assert.deepStrictEqual(response.body, {
    message: "Notes API is running"
  });
});

test("GET /health returns OK", async () => {
  const response = await request(app)
    .get("/health")
    .expect(200);

  assert.deepStrictEqual(response.body, {
    status: "OK"
  });
});
