import { FastifyPluginAsync } from "fastify";

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async (request, reply) => {
    return {
      hello: "hello world",
      debugLevel: fastify.config.DEBUG_LEVEL,
    };
  });

  fastify.post("/api/v1", async (request, reply) => {
    return { item: "Some example content is here" };
  });
};

export default routes;
