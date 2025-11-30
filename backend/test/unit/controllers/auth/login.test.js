import { login } from "../../../../src/controllers";
import { jest } from "@jest/globals";

describe("login", () => {
  let req, res;

  const credentials = {
    email: `7VpGm@example.com`,
    password: "password",
  };

  beforeEach(() => {
    req = {
      body: {
        email: credentials.email,
        password: credentials.password,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
  });

  test("should set access and refresh tokens for the user and return 200", async () => {
    await login(req, res);
    expect(res.cookie).toHaveBeenCalledWith(
      "accessToken",
      expect.any(String),
      expect.any(Object)
    );
    expect(res.cookie).toHaveBeenCalledWith(
      "refreshToken",
      expect.any(String),
      expect.any(Object)
    );
    expect(res.cookie).toHaveBeenCalledTimes(2);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("should return 400 if the user is not found", async () => {
    req.body.email = "invalid_email";
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
