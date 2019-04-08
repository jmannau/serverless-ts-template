import * as cors from "@koa/cors";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as serverlessHttp from "serverless-http";
import "source-map-support/register";
import { HttpWarmup } from "./lib/http-warmup";

const app = new Koa();

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

export const post = (<any>serverlessHttp)(app);
