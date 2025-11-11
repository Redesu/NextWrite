import db from "../../config/db.js";

export const newComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!postId || !content) {
      return res
        .status(400)
        .json({ message: "Post ID and content are required" });
    }

    // Insert new comment into the database
    const result = await db.query(
      "INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
      [postId, req.user.id, content]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating comment:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while creating the comment" });
  }
};
