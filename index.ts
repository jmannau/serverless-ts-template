import * as cors from "@koa/cors";
import {
  APIGatewayEventRequestContext,
  APIGatewayProxyHandler
} from "aws-lambda";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as serverlessHttp from "serverless-http";
import "source-map-support/register";
import { HttpWarmup } from "./lib/http-warmup";

/**
 * This type definition allows us to update the Koa.ParameterizedContext with
 * the custom request mapping defined below.
 */
interface CustomRequestContext {
  req: {
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

export const post: APIGatewayProxyHandler = (<any>serverlessHttp)(app, {
  request: (request, _, context) => {
    request.context = context;
  }
});
