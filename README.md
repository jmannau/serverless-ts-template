# Serverless + Koa + Typescript + Jest Starter Project

[![Greenkeeper badge](https://badges.greenkeeper.io/jmannau/serverless-ts-template.svg)](https://greenkeeper.io/)

We often use [Serverless](https://serverless.com) for microservices. This is an opinionated starter project for serverless http microservices that uses;

- Serverless
- [serverless-http](https://github.com/dougmoscrop/serverless-http)
- [serverless-webpack](https://github.com/serverless-heaven/serverless-webpack)
- [Koa](https://koajs.com)
- Typescript
- Jest for testing
- Support for debugging via VisualStudioCode
- Node stack traces supporting sourcemaps

## Why Koa?

We often use serverless functions for http microservices. These all require common functionality including:

- CORS
- JSON Body Parsing
- Error handling
- Response mapping

Koa has well maintained middleware to handle all of the above and much more. These are used by many people, have been designed with security in mind to prevent common attacks.

## Installation

1. Clone or download this project
1. `npm install` or `yarn install`
1. `npm test` to run tests
1. `npm run sls:offline` to start the offline server using serverless-offline
