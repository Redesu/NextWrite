import { jest } from "@jest/globals";
import { getComments } from "../../../../src/controllers";

describe("getComments", () => {
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

  test("should fetch comments and return 200", async () => {
    await getComments(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("should return 200 with a empty array if no comments found", async () => {
    await getComments(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  test("should return 400 if postSlug is not provided", async () => {
    req.params.postSlug = null;
    await getComments(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
