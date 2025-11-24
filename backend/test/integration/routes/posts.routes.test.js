import request from "supertest";
import app from "../../../server.js";

describe("Posts routes", () => {
  describe("/comments", () => {
    let accessTokenCookie;
    let createPostResponse;
    beforeEach(async () => {
      // create a user
      const registerResponse = await request(app)
        .post("/api/auth/register")
        .send({
          username: "test",
          email: "test@test.com",
          password: "password",
        });
      const cookies = registerResponse.headers["set-cookie"];
      const cookieArray = cookies.split("; ");
      accessTokenCookie = cookieArray.find((cookie) =>
        cookie.startsWith("accessTokenCookie=")
      );

      // create a new post
      createPostResponse = await request(app)
        .post("/api/posts")
        .set("Cookie", accessTokenCookie)
        .send({
          title: "Test-Post",
          content: "This is a test post",
        });
    });

    test("should create a new post and return 201", async () => {
      const response = await request(app)
        .post("/api/posts")
        .set("Cookie", accessTokenCookie)
        .send({
          title: "Test",
          content: "This is a test post",
        });
      expect(response.status).toBe(201);
    });

    test("should return 400 if a field is missing when creating a post", async () => {
      const response = await request(app)
        .post("/api/posts")
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
      const response = await request(app)
        .put(`/api/posts/update/${createPostResponse.body.slug}`)
        .set("Cookie", accessTokenCookie)
        .send({
          title: "Test",
          description: "This is a test post",
          content: "This is an updated test post",
        });
      expect(response.status).toBe(200);
    });

    test("should return 400 if a field is missing when updating a post", async () => {
      const response = await request(app)
        .put(`/api/posts/update/${createPostResponse.body.slug}`)
        .set("Cookie", accessTokenCookie)
        .send({
          title: "Test",
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
