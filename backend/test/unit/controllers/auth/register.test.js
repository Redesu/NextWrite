import { register } from "../../../../src/controllers";
import { jest } from "@jest/globals";

describe("register", () => {
  let req, res;
  const credentials = {
    username: (Math.random() + 1).toString(36).substring(7),
    email: `${(Math.random() + 1).toString(36).substring(7)}@gmail.com`,
    password: "password",
  };

  beforeEach(() => {
    req = {
      body: {
        username: credentials.username,
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

  test("should create user and return 201", async () => {
    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("should reject duplicate email/username with 400", async () => {
    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
