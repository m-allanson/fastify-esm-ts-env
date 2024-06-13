# About

An example Fastify setup, using TypeScript and ESM, with support for loading env vars from a .env file. Tests use the built in [NodeJS test runner](https://nodejs.org/api/test.html) (requires NodeJS v22 or higher).

Adapted from the [`fastify-cli` TypeScript ESM example app](https://github.com/fastify/fastify-cli/tree/master/templates/app-ts-esm).

## Getting Started

- clone this repo
- run `npm install`
- copy `.env.example` to `.env` and update any values as needed
- run `npm run dev`
- browse to http://localhost:3000

Add new routes in `./src/routes`. New plugins added to `./src/plugins` will be loaded automatically. The server will restart on file changes.

### Other commands

- `npm run build` generate a production build
- `npm run start` run the production build
- `npm run test` run the tests

## Features

### Environment variables

Configured to use the `@fastify/env` plugin to handle environment variables.

The schema for environment variables is defined in `src/plugins/env.ts`. The app will error for missing / invalid variables.

Env vars will be read from `.env` file. They can be overridden like:

- `HTTP_PORT=3001 npm run dev`

### TypeScript

`tsx` is used to run the development server and tests. `tsc` to emit the production build.

### Plugins and routes

Plugins and routes are loaded automatically via the `@fastify/autoload` plugin.

There is an example plugin at `src/plugins/example.ts`.

### Misc

Everything is ESM, and `pino` has been configured as the logger.
