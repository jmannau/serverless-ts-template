# Serverless + Koa + Typescript + Jest Starter Project

[![Build Status](https://travis-ci.org/jmannau/serverless-ts-template.svg?branch=master)](https://travis-ci.org/jmannau/serverless-ts-template) [![Greenkeeper badge](https://badges.greenkeeper.io/jmannau/serverless-ts-template.svg)](https://greenkeeper.io/)

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

- [CORS](https://github.com/koajs/cors)
- [Request Body Parsing](https://github.com/koajs/bodyparser)
- [Error handling](https://github.com/koajs/koa/blob/master/docs/error-handling.md)
- [Request validation](https://www.npmjs.com/search?q=koa%20validation&ranking=optimal)
- [And more...](https://www.npmjs.com/search?q=koa%20middleware)

Koa has a library of well maintained, tested & proven middleware to handle all of the above and much more. These are used by many people, have been designed with security in mind to prevent common attacks. There is no need to manually add CORS headers to responses, nor parse request bodies.

## Installation

- Clone or download this project
- or $ `serverless install --url https://github.com/jmannau/serverless-ts-template --name project-name`

then

1. `npm install` or `yarn install`
1. `npm test` to run tests or `npm test -- --watch` to run the tests in watch mode.
1. `npm run sls:offline` to start the offline server using serverless-offline
