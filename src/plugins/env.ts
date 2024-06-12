import fastifyEnv from "@fastify/env";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  export interface FastifyInstance {
    config: {
      DEBUG_LEVEL: number | undefined;
      HTTP_HOST: string;
      HTTP_PORT: number;
      API_KEY: string;
    };
  }
}

export interface EnvPluginOptions {}

export const schema = {
  type: "object",
  required: ["HTTP_PORT", "HTTP_HOST", "API_KEY"],
  properties: {
    DEBUG_LEVEL: {
      type: "number",
      default: 1000,
    },
    HTTP_HOST: {
      type: "string",
      default: "0.0.0.0",
    },
    HTTP_PORT: {
      type: "number",
      default: 3000,
    },
    API_KEY: {
      type: "string",
    },
  },
};

/**
 * Util method, allows callback style plugins to be called async-style
 *
 * e.g.
 *
 */
const pluginCbToAsync = (
  plugin: (
    fastify: FastifyInstance,
    options: Record<string, any>,
    done: (err?: Error | undefined) => void
  ) => unknown,
  fastify: FastifyInstance,
  options: Record<string, any>
) => {
  return new Promise<void>((resolve) => {
    const done = () => resolve();
    plugin(fastify, options, done);
  });
};

const configPlugin: FastifyPluginAsync = async (
  fastify,
  options
): Promise<void> => {
  const configOptions = {
    confKey: "config",
    schema: schema,
    data: process.env,
    dotenv: true,
    removeAdditional: true,
  };

  pluginCbToAsync(fastifyEnv, fastify, configOptions);
};

export default fp(configPlugin, { name: "env-plugin" });
