import app from "./src/app.js";
import Fastify from "fastify";

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
  fastify.register(app);

  await fastify.ready();

  try {
    await fastify.listen({
      // port: fastify.config.HTTP_PORT,
      // host: fastify.config.HTTP_HOST,
      port: 3000,
      host: "localhost",
    });
    console.log("config is", fastify.config);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

initAppServer();
