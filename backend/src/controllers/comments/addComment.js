import db from "../../config/db.js";

export const addComment = async (req, res) => {
  try {
    const { postSlug } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!postSlug || !content || !userId) {
      return res
        .status(400)
        .json({ message: "Post ID and content are required" });
    }

    const post = await db.query(
      "SELECT * FROM posts WHERE slug = $1 AND deleted_at IS NULL",
      [postSlug]
    );

    if (!post.rows.length) {
      return res.status(404).json({ message: "Post not found" });
    }

    const result = await db.query(
      "INSERT INTO comments (post_slug, author_id, content) VALUES ($1, $2, $3) RETURNING *",
      [postSlug, userId, content]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating comment:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while creating the comment" });
  }
};
