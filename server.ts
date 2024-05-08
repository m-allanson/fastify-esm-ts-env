import appFramework from "./src/app.js";

async function initAppServer() {
  const app = await appFramework();

  try {
    await app.listen({
      port: app.config.HTTP_PORT,
      host: app.config.HTTP_HOST,
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

initAppServer();
