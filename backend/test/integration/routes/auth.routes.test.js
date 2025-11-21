import request from "supertest";
import app from "../../../server.js";

describe("Auth routes", () => {
  describe("/logout", () => {
    test("should clear access and refresh tokens and return 200", async () => {
      const response = await request(app).post("/api/auth/logout");
      expect(response.status).toBe(200);
    });
  });

  describe("/register", () => {
    const credentials = {
      username: "test",
      email: "test@test.com",
      password: "password",
    };

    test("should register a new user and return 201", async () => {
      const response = await request(app).post("/api/auth/register").send({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      });
      expect(response.status).toBe(201);
    });

    test("should return 400 if a field is missing", async () => {
      const response = await request(app).post("/api/auth/register").send({
        username: credentials.username,
        email: credentials.email,
      });
      expect(response.status).toBe(400);
    });

    test("should return 400 if the user or email already exists", async () => {
      const response = await request(app).post("/api/auth/register").send({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      });
      expect(response.status).toBe(400);
    });
  });

  describe("/login", () => {
    test("should set access and refresh tokens for the user and return 200", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: `test@test.com`,
        password: "password",
      });

      expect(response.status).toBe(200);
      expect(response.headers).toHaveProperty("set-cookie");
      expect(response.headers["set-cookie"].length).toBe(2);
    });

    test("should return 400 if the email or password is incorrect", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: `test@test.com`,
        password: "wrong-password",
      });

      expect(response.status).toBe(400);
    });

    test("should return 400 if the email or password is missing", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: `test@test.com`,
      });

      expect(response.status).toBe(400);
    });
  });

  describe("/refresh-token", () => {
    let refreshTokenCookie;
    beforeEach(async () => {
      const loginResponse = await request(app).post("/api/auth/login").send({
        email: `test@test.com`,
        password: "password",
      });

      const cookies = loginResponse.headers["set-cookie"];
      const cookieArray = cookies.split("; ");
      refreshTokenCookie = cookieArray.find((cookie) =>
        cookie.startsWith("refreshToken=")
      );
    });

    test('should return 200 and set "accessToken" cookie', async () => {
      const response = await request(app)
        .post("/api/auth/refresh-token")
        .set("Cookie", refreshTokenCookie)
        .send();

      expect(response.status).toBe(200);
      expect(response.headers).toHaveProperty("set-cookie");
      expect(response.headers["set-cookie"].length).toBe(1);
    });

    test('should return 401 if "refreshToken" cookie is missing or its expired/invalid', async () => {
      const response = await request(app)
        .post("/api/auth/refresh-token")
        .send();
      expect(response.status).toBe(401);
    });
  });

  describe("/me", () => {
    let accessTokenCookie;
    beforeEach(async () => {
      const loginResponse = await request(app).post("/api/auth/login").send({
        email: `test@test.com`,
        password: "password",
      });

      const cookies = loginResponse.headers["set-cookie"];
      const cookieArray = cookies.split("; ");
      accessTokenCookie = cookieArray.find((cookie) =>
        cookie.startsWith("accessToken=")
      );
    });

    test("should return 200 and receive the user object", async () => {
      const response = await request(app)
        .get("/api/auth/me")
        .set("Cookie", accessTokenCookie)
        .send();
      expect(response.status).toBe(200);
    });

    test('should return 401 if "accessToken" cookie is missing or its expired/invalid', async () => {
      const response = await request(app).get("/api/auth/me").send();
      expect(response.status).toBe(401);
    });
  });
});
