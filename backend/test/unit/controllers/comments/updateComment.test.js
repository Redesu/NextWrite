import { jest } from "@jest/globals";
import { updateComment } from "../../../../src/controllers";

describe("updateComment", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        commentId: 1,
      },
      body: {
        content: "Updated content",
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

  test("should update a comment and return 200", async () => {
    await updateComment(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("should return 400 if commentId or userId is not provided", async () => {
    req.params.commentId = null;
    req.user.id = null;
    await updateComment(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should return 404 if comment is not found or user does not have permission", async () => {
    req.params.commentId = 1;
    req.user.id = 2;
    await updateComment(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
