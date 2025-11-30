import request from "supertest";
import app from "../../../server.js";

describe("Posts routes", () => {
  describe("/posts", () => {
    let accessTokenCookie;
    let createPostResponse;
    beforeEach(async () => {
      // create a user
      const loginResponse = await request(app).post("/api/auth/login").send({
        email: `7VpGm@example.com`,
        password: "password",
      });
      const cookies = loginResponse.headers["set-cookie"];
      if (Array.isArray(cookies)) {
        accessTokenCookie = cookies.find((cookie) =>
          cookie.startsWith("accessToken=")
        );
      }
    });

    test("should create a new post and return 201", async () => {
      const response = await request(app)
        .post("/api/posts/testing-test-post")
        .set("Cookie", accessTokenCookie)
        .send({
          title: "Test",
          description: "Testing description",
          content: "This is a test post",
        });
      expect(response.status).toBe(201);
    });

    test("should return 400 if a field is missing when creating a post", async () => {
      const response = await request(app)
        .post("/api/posts/test-post2")
        .set("Cookie", accessTokenCookie)
        .send({
          title: "Test",
        });
      expect(response.status).toBe(400);
    });

    test("should return 200 and an array of posts", async () => {
      const response = await request(app).get("/api/posts");
      expect(response.status).toBe(200);
    });

    test("should return 200 and a post", async () => {
      const response = await request(app).get(`/api/posts/test-post`);
      expect(response.status).toBe(200);
    });

    test("should update a post and return 200", async () => {
      const response = await request(app)
        .put(`/api/posts/test-post`)
        .set("Cookie", accessTokenCookie)
        .send({
          title: "Updated Test",
          description: "This is an updated test post",
          content: "This is an updated test post",
        });
      expect(response.status).toBe(200);
    });

    test("should return 400 if a field is missing when updating a post", async () => {
      const response = await request(app)
        .put(`/api/posts/test-post`)
        .set("Cookie", accessTokenCookie)
        .send({
          title: "Test",
          description: "Test description",
        });
      expect(response.status).toBe(400);
    });

    test("should return 404 if the post does not exist or the user is not the author when updating a post", async () => {
      const response = await request(app)
        .put(`/api/posts/invalid-slug`)
        .set("Cookie", accessTokenCookie)
        .send({
          title: "Test",
          description: "Test description",
          content: "This is an updated test post",
        });
      expect(response.status).toBe(404);
    });

    test("should delete a post and return 200", async () => {
      const response = await request(app)
        .delete(`/api/posts/test-post`)
        .set("Cookie", accessTokenCookie)
        .send();
      expect(response.status).toBe(200);
    });

    test("should return 404 if the post does not exist or the user is not the author when deleting a post", async () => {
      const response = await request(app)
        .delete(`/api/posts/delete/invalid-slug`)
        .set("Cookie", accessTokenCookie)
        .send();
      expect(response.status).toBe(404);
    });
  });
});
