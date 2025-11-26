import request from "supertest";
import app from "../../../server.js";

describe("Comments routes", () => {
  describe("/comments", () => {
    let accessTokenCookie;
    let createPostResponse;
    let createCommentResponse;
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
      if (Array.isArray(cookies)) {
        accessTokenCookie = cookies.find((cookie) =>
          cookie.startsWith("accessToken=")
        );
      }

      // create a new post
      createPostResponse = await request(app)
        .post("/api/posts")
        .set("Cookie", accessTokenCookie)
        .send({
          title: "Test-Post",
          content: "This is a test post",
        });

      // create a new comment
      createCommentResponse = await request(app)
        .post(`/api/comments/${createPostResponse.body.slug}`)
        .set("Cookie", accessTokenCookie)
        .send({
          content: "This is a test comment",
        });
    });

    test("should create a new comment and return 201", async () => {
      const response = await request(app)
        .post(`/api/comments/${createPostResponse.body.slug}`)
        .set("Cookie", accessTokenCookie)
        .send({
          content: "This is a test comment",
        });
      expect(response.status).toBe(201);
    });

    test("should return 400 if a field is missing while creating a comment", async () => {
      const response = await request(app)
        .post(`/api/comments/${createPostResponse.body.slug}`)
        .set("Cookie", accessTokenCookie);
      expect(response.status).toBe(400);
    });

    test("should return 404 if the post does not exist while creating a comment", async () => {
      const response = await request(app)
        .post(`/api/comments/invalid-slug`)
        .set("Cookie", accessTokenCookie)
        .send({
          content: "This is a test comment",
        });
      expect(response.status).toBe(404);
    });

    test("should update a comment and return 200", async () => {
      const response = await request(app)
        .put(`/api/comments/update/${createCommentResponse.body.id}`)
        .set("Cookie", accessTokenCookie)
        .send({
          content: "This is an updated test comment",
        });
      expect(response.status).toBe(200);
    });

    test("should return 400 if a field is missing while updating a comment", async () => {
      const response = await request(app)
        .put(`/api/comments/update/${createCommentResponse.body.id}`)
        .set("Cookie", accessTokenCookie);
      expect(response.status).toBe(400);
    });

    test("should return 404 if the comment does not exist while updating a comment", async () => {
      const response = await request(app)
        .put(`/api/comments/update/invalid-id`)
        .set("Cookie", accessTokenCookie)
        .send({
          content: "This is an updated test comment",
        });
      expect(response.status).toBe(404);
    });

    test("should delete a comment and return 200", async () => {
      const response = await request(app)
        .delete(`/api/comments/delete/${createCommentResponse.body.id}`)
        .set("Cookie", accessTokenCookie)
        .send();
      expect(response.status).toBe(200);
    });

    test("should return 404 if the delete target comment does not exist", async () => {
      const response = await request(app)
        .delete(`/api/comments/delete/invalid-id`)
        .set("Cookie", accessTokenCookie)
        .send();
      expect(response.status).toBe(404);
    });

    test("should return 200 and an array of comments", async () => {
      const response = await request(app).get(
        `/api/comments/${createPostResponse.body.slug}`
      );
      expect(response.status).toBe(200);
    });

    test("should return 200 with an empty array if there are no comments", async () => {
      const response = await request(app).get(`/api/comments/unvalid-slug`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });
});
