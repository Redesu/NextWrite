import db from "../../config/db.js";

export const deletePost = async (req, res) => {
  try {
    const { postSlug } = req.params;
    const username = req.user.username;
    if (!postSlug) {
      return res.status(400).json({ message: "Post slug is required" });
    }
    const result = await db.query(
      `UPDATE posts SET deleted_at = NOW() WHERE slug = $1 AND created_by = $2 RETURNING *`,
      [postSlug, username]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        message: "Post not found or you don't have permission to delete it",
      });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while deleting the post" });
  }
};
