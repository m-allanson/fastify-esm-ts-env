import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      DEBUG_LEVEL: number | undefined;
      HTTP_HOST: string;
      HTTP_PORT: number;
      API_KEY: string;
    };
  }
}
