import fastifyEnv from "@fastify/env";
import { FastifyPluginCallback } from "fastify";
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

const configPlugin: FastifyPluginCallback = (fastify, options, done) => {
  const configOptions = {
    confKey: "config",
    schema: schema,
    data: process.env,
    dotenv: true,
    removeAdditional: true,
  };

  return fastifyEnv(fastify, configOptions, done);
};

export default fp(configPlugin, { name: "env-plugin" });
