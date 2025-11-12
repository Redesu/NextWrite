import db from "../../config/db.js";

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    if (!commentId || !userId) {
      return res
        .status(400)
        .json({ message: "Comment ID and user ID are required" });
    }

    const result = await db.query(
      "UPDATE comments SET deleted_at = NOW() WHERE id = $1 AND author_id = $2 RETURNING *",
      [commentId, userId]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        message: "Comment not found or you don't have permission to delete it",
      });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while deleting the comment" });
  }
};
