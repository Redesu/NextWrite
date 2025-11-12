import db from "../../config/db.js";

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!commentId || !userId) {
      return res
        .status(400)
        .json({ message: "Comment ID and user ID are required" });
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
