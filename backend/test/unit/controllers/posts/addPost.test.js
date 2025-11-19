import { jest } from "@jest/globals";
import { addPost } from "../../../../src/controllers";

describe("addPost", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        title: "Test Title",
        description: "Test Description",
        content: "Test Content",
      },
      params: {
        postSlug: "test-post",
      },
      user: {
        id: 1,
        username: "testuser",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("should create a new post and return 201", async () => {
    await addPost(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("should return 400 if a element is not provided or null", async () => {
    req.params.postSlug = null;
    await addPost(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
