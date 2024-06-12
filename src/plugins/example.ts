import fp from "fastify-plugin";

export interface ExamplePluginOptions {
  // Specify Example plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<ExamplePluginOptions>(async (fastify, opts) => {
  fastify.decorate("example", function () {
    return "example!";
  });
});

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyInstance {
    example(): string;
  }
}
