import request from "supertest";
import app from "../../../server.js";

describe("Posts routes", () => {
  describe("/posts", () => {
    let accessTokenCookie;
    let createPostResponse;
    beforeEach(async () => {
      const timestamp = Date.now();
      // create a user
      const registerResponse = await request(app)
        .post("/api/auth/register")
        .send({
          username: "test",
          email: `test@test${timestamp}.com`,
          password: "password",
        });
      const cookies = registerResponse.headers["set-cookie"];
      if (Array.isArray(cookies)) {
        accessTokenCookie = cookies.find((cookie) =>
          cookie.startsWith("accessToken=")
        );
      }

      createPostResponse = await request(app)
        .post(`/api/posts/test-post-${timestamp}`)
        .set("Cookie", accessTokenCookie)
        .send({
          title: `Test-Post-${timestamp}`,
          description: "Testing description",
          content: "This is a test post",
        });

      console.log(createPostResponse.body);
      console.log("slug:", createPostResponse.body.slug);
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
      const response = await request(app).get(
        `/api/posts/${createPostResponse.body.slug}`
      );
      expect(response.status).toBe(200);
    });

    test("should update a post and return 200", async () => {
      debugger;
      console.log("update slug:", createPostResponse.body.slug);
      const response = await request(app)
        .put(`/api/posts/update/${createPostResponse.body.slug}`)
        .set("Cookie", accessTokenCookie)
        .send({
          title: "Updated Test",
          description: "This is an updated test post",
          content: "This is an updated test post",
        });
      expect(response.status).toBe(200);
    });

    test("should return 400 if a field is missing when updating a post", async () => {
      debugger;
      console.log("update slug:", createPostResponse.body.slug);
      const response = await request(app)
        .put(`/api/posts/update/${createPostResponse.body.slug}`)
        .set("Cookie", accessTokenCookie)
        .send({
          title: "Test",
          description: "Test description",
        });
      expect(response.status).toBe(400);
    });

    test("should return 404 if the post does not exist or the user is not the author when updating a post", async () => {
      const response = await request(app)
        .put(`/api/posts/update/invalid-slug`)
        .set("Cookie", accessTokenCookie)
        .send({
          title: "Test",
          content: "This is an updated test post",
        });
      expect(response.status).toBe(404);
    });

    test("should delete a post and return 200", async () => {
      const response = await request(app)
        .delete(`/api/posts/delete/${createPostResponse.body.slug}`)
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
