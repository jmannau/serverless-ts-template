import * as createEvent from "aws-event-mocks";
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
    post(event, {}, (error, response) => {
      expect(response).toMatchObject({
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ data: "hello world" })
      });
      expect(error).toBeNull();
      done();
    });
  });
});
