import request from "supertest";
import app from "../../../server.js";

describe("Health check", () => {
  test("should return 200", async () => {
    const response = await request(app).get("/api/ping");
    expect(response.status).toBe(200);
  });
});
