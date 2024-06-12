import Fastify from "fastify";

import app from "./src/app.js";

const env =
  process.env.NODE_ENV === "development" ? "development" : "production";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
};

async function initAppServer() {
  const fastify = Fastify({
    logger: envToLogger[env],
  });

  await fastify.register(app);
  await fastify.ready();

  try {
    await fastify.listen({
      port: fastify.config.HTTP_PORT,
      host: fastify.config.HTTP_HOST,
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

initAppServer();
