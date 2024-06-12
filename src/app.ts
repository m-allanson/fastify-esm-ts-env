import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import * as path from "path";
import { fileURLToPath } from "url";

import envPlugin from "./plugins/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
// const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // This loads up config variables from the environment, run it first
  await fastify.register(envPlugin);

  // Load all plugins in the plugins directory
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: opts,
    forceESM: true,
    maxDepth: 1,
    // Exclude env plugin because it was loaded earlier
    ignorePattern: /env.(j|t)s$/,
  });

  // Load routes
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: opts,
    forceESM: true,
  });
};

export default fp(app);
