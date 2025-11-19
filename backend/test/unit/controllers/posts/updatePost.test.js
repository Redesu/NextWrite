import { jest } from "@jest/globals";
import { updatePost } from "../../../../src/controllers";

describe("updatePost", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        postSlug: "test-post",
      },
      body: {
        title: "Updated Title",
        description: "Updated Description",
        content: "Updated Content",
      },
      user: {
        username: "testuser",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("should update a post and return 200", async () => {
    await updatePost(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("should return 400 if any field is not provided", async () => {
    req.params.postSlug = null;
    await updatePost(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should return 404 if post is not found or user does not have permission", async () => {
    req.params.postSlug = "non-existent-post";
    await updatePost(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
