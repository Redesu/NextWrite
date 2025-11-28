import db from "../../config/db.js";

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    if (!req.body) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { content } = req.body;
    const userId = req.user.id;

    if (!commentId || !userId || isNaN(commentId)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const comment = await db.query(
      "SELECT * FROM comments WHERE id = $1 AND author_id = $2 AND deleted_at IS NULL",
      [commentId, userId]
    );

    if (!comment.rows.length) {
      return res.status(404).json({
        message: "Comment not found or you don't have permission to update it",
      });
    }

    const result = await db.query(
      "UPDATE comments SET content = $1 WHERE id = $2 AND author_id = $3 RETURNING *",
      [content, commentId, userId]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        message: "Comment not found or you don't have permission to update it",
      });
    }

    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error("Error updating comment:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while updating the comment" });
  }
};
