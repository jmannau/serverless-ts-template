import * as createEvent from "aws-event-mocks";
import { Context } from "aws-lambda";
import { post } from "../index";

describe("index.ts", () => {
  it("should work", done => {
    const event = createEvent({
      template: "aws:apiGateway",
      merge: {
        // body: {
        //   first_name: 'Sam',
        //   last_name: 'Smith'
        // }
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        path: "testhost:3000/test"
      }
    });
    post(event, {} as Context, (error, response) => {
      expect(response).toMatchObject({
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ data: "hello world" })
      });
      expect(error).toBeNull();
      done();
    });
  });

  it("should return an empty response if the X-Serverless-Warmup header is present", done => {
    const event = createEvent({
      template: "aws:apiGateway",
      merge: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-serverless-warmup": "true"
        },
        path: "testhost:3000/test",
        origin: ""
      }
    });
    post(event, {} as Context, (error, response) => {
      expect(response).toMatchObject({
        statusCode: 204,
        body: ""
      });

      expect(error).toBeNull();
      done();
    });
  });

  it("should add cors headers to response", done => {
    const origin = "http://test.test";
    const event = createEvent({
      template: "aws:apiGateway",
      merge: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          origin
        },
        path: "testhost:3000/test"
      }
    });
    post(event, {} as Context, (error, response) => {
      expect(response.headers).toMatchObject({
        "access-control-allow-origin": origin
      });

      expect(error).toBeNull();
      done();
    });
  });
});
