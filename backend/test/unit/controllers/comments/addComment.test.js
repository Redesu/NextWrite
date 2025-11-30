import { addComment } from "../../../../src/controllers";
import { jest } from "@jest/globals";

describe("addComment", () => {
  let req, res;

  const post = {
    slug: "test-post",
    content: "Test content",
  };

  beforeEach(() => {
    req = {
      params: {
        postSlug: post.slug,
      },
      body: {
        content: post.content,
      },
      user: {
        id: 1,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("should create a new comment and return 201", async () => {
    await addComment(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("should return 400 if post ID or content is missing", async () => {
    req.params.postSlug = "";
    req.body.content = "";
    await addComment(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should return 404 if post is not found", async () => {
    req.params.postSlug = "nonexistent-post";
    await addComment(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
