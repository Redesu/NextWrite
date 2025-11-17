import { protect } from "../../../../src/middleware/auth.middleware";

describe("auth middleware", () => {
  let req, res;

  beforeEach(() => {
    req = {
      cookies: {
        accessToken: "valid_access_token",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("should return 401 if no token is present in cookies", () => {
    req.cookies.accessToken = null;
    protect(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("should return 401 if the user no longer exists", () => {
    req.cookies.accessToken = "invalid_access_token";
    protect(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});
