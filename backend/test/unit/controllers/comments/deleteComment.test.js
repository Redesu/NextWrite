import { jest } from "@jest/globals";
import { deleteComment } from "../../../../src/controllers";

describe("deleteComment", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        commentId: 1,
      },
      user: {
        id: 2,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("should delete a comment and return 200", async () => {
    await deleteComment(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("should return 400 if commentId or userId is not provided", async () => {
    req.params.commentId = null;
    req.user.id = null;
    await deleteComment(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should return 404 if comment is not found or user doesn't have permission", async () => {
    req.user.id = 3;
    await deleteComment(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
