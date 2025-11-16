import { logout } from "../../../../src/controllers";
import { jest } from "@jest/globals";

describe("logout", () => {
  let req, res;

  beforeEach(() => {
    req = {
      cookies: {
        accessToken: "valid_access_token",
        refreshToken: "valid_refresh_token",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      clearCookie: jest.fn(),
    };
  });

  test("should clear access and refresh tokens and return 200", async () => {
    await logout(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.clearCookie).toHaveBeenCalledWith("accessToken");
    expect(res.clearCookie).toHaveBeenCalledWith("refreshToken");
    expect(res.clearCookie).toHaveBeenCalledTimes(2);
  });
});
