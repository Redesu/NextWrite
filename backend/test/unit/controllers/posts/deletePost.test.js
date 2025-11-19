import { jest } from "@jest/globals";
import { deletePost } from "../../../../src/controllers";

describe("deletePost", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        postSlug: "test-post",
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

  test("should delete a post and return 200", async () => {
    await deletePost(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("should return 400 if postSlug is not provided", async () => {
    req.params.postSlug = null;
    await deletePost(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should return 404 if post is not found or user does not have permission to delete it", async () => {
    req.user.username = null;
    await deletePost(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
