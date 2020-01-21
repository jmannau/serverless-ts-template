import * as cors from "@koa/cors";
import {
  APIGatewayEvent,
  APIGatewayEventRequestContext,
  APIGatewayProxyHandler
} from "aws-lambda";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import "source-map-support/register";
import { HttpWarmup } from "./lib/http-warmup";
import serverlessHttp = require("serverless-http");

/**
 * This type definition allows us to update the Koa.ParameterizedContext with
 * the custom request mapping defined below.
 */
interface CustomRequestContext {
  req: {
    event: APIGatewayEvent;
    context: APIGatewayEventRequestContext;
  };
}

const app = new Koa<any, CustomRequestContext>();

app.use(bodyParser());
app.use(cors({ keepHeadersOnError: true }));

app.use(HttpWarmup);

app.use(async ctx => {
  const {} = ctx.request.body;
  // const key = process.env["API_KEY"];
  try {
    ctx.response.body = { data: "hello world" };
  } catch (error) {
    console.error("error", error);
    ctx.throw(400, error.description);
  }
});

export const post = (serverlessHttp(app, {
  request: (
    request,
    event: APIGatewayEvent,
    context: APIGatewayEventRequestContext
  ) => {
    request.event = event;
    request.context = context;
  }
}) as unknown) as APIGatewayProxyHandler; // Until serverless-http releases a new package with updated types
