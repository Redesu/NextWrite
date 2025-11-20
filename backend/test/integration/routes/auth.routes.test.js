import request from "supertest";
import app from "../../../server.js";

describe("Auth routes", () => {
  test("should clear access and refresh tokens and return 200", async () => {
    const response = await request(app).post("/logout");
    expect(response.status).toBe(200);
  });

  test("should register a new user and return 201", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        username: (Math.random() + 1).toString(36).substring(7),
        email: `${(Math.random() + 1).toString(36).substring(7)}@gmail.com`,
        password: "password",
      });
    expect(response.status).toBe(201);
  });

  test("should return 400 if a field is missing", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        username: (Math.random() + 1).toString(36).substring(7),
        email: `${(Math.random() + 1).toString(36).substring(7)}@gmail.com`,
      });
    expect(response.status).toBe(400);
  });

  test("should return 400 if the user or email already exists", async () => {
    const response = await request(app).post("/register").send({
      username: "test",
      email: `test@test.com`,
      password: "password",
    });
    expect(response.status).toBe(400);
  });
});
