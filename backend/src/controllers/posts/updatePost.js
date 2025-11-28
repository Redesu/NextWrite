import db from "../../config/db.js";

export const updatePost = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { title, description, content } = req.body;
    const { postSlug } = req.params;
    const username = req.user.username;

    if (!title || !description || !content || !postSlug || !username) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const post = await db.query(
      "SELECT * FROM posts WHERE slug = $1 AND deleted_at IS NULL",
      [postSlug]
    );

    if (!post.rows.length) {
      return res
        .status(404)
        .json({
          message: "Post not found or you don't have permission to update it",
        });
    }

    const result = await db.query(
      `UPDATE posts SET title = $1, description = $2, content = $3 WHERE slug = $4 AND created_by = $5 AND deleted_at IS NULL RETURNING *`,
      [title, description, content, postSlug, username]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({
          message: "Post not found or you don't have permission to update it",
        });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating post:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while updating the post" });
  }
};
