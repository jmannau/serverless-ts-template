import * as createEvent from "aws-event-mocks";
import { Context } from "aws-lambda";
import { post } from "../index";

describe("index.ts", () => {
  it("should work", async() => {
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
    const response = await post(event, {} as Context, undefined);

    expect(response).toMatchObject({
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ data: "hello world" })
    });
  });

  it("should return an empty response if the X-Serverless-Warmup header is present", async() => {
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
    const response = await post(event, {} as Context, undefined);
    expect(response).toMatchObject({
      statusCode: 204,
      body: ""
    });

  });

  it("should add cors headers to response", async() => {
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
    const response = await post(event, {} as Context, undefined);
    if( !response){
      throw new Error("response is void");
    }
    expect(response.headers).toMatchObject({
      "access-control-allow-origin": origin
    });
  });
});
