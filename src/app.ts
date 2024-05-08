import Fastify from "fastify";

import indexRoutes from "./routes/index.js";
import envPlugin from "./plugins/env.js";

export default async function appFramework() {
  const fastify = Fastify({ logger: true });
  fastify.register(envPlugin);
  fastify.register(indexRoutes);

  await fastify.ready();

  return fastify;
}
