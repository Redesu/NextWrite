import { jest } from "@jest/globals";
import { getPosts } from "../../../../src/controllers";

describe("getPosts", () => {
  let req, res;

  beforeEach(() => {
    req = {
      query: {
        offset: 0,
        limit: 10,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("should fetch 10 posts and return 200", async () => {
    await getPosts(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("should return 404 if no posts found", async () => {
    req.query.offset = 0;
    req.query.limit = 0;
    await getPosts(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
