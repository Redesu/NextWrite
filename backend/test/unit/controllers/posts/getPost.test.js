import { jest } from "@jest/globals";
import { getPost } from "../../../../src/controllers";

describe("getPost", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        postSlug: "test-post",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("should fetch a post and return 200", async () => {
    await getPost(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("should return 400 if postSlug is not provided", async () => {
    req.params.postSlug = null;
    await getPost(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should return 404 if post is not found", async () => {
    req.params.postSlug = "nonexistent-post";
    await getPost(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
