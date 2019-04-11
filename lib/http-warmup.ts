import { Middleware } from "koa";

const WARMUP_HEADER = "x-serverless-warmup";

export const HttpWarmup: Middleware = (ctx, next) => {
  if (ctx.request.headers[WARMUP_HEADER] === "true") {
    ctx.response.body = undefined;
    return;
  }
  return next();
};
