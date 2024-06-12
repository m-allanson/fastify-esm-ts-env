import assert from "assert";
import Fastify, { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import test, { afterEach, beforeEach, describe } from "node:test";

import app from "../app.js";

let fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>;

describe("tests", async () => {
  beforeEach(() => {
    fastify = Fastify();
    fastify.register(app);
  });

  afterEach(() => {
    fastify.close();
  });

  test("GET / should return expected response", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/",
    });

    assert.strictEqual(response.statusCode, 200);
    assert.deepStrictEqual(response.json(), {
      hello: "hello world",
      debugLevel: fastify.config.DEBUG_LEVEL,
    });
  });

  test("POST /api/v1 should return expected response", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/api/v1",
    });

    assert.strictEqual(response.statusCode, 200);
    assert.deepStrictEqual(response.json(), {
      item: "Some example content is here",
    });
  });
});
