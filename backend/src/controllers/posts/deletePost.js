import db from "../../config/db.js";

export const deletePost = async (req, res) => {
  try {
    const { postSlug } = req.params;
    if (!postSlug) {
      return res.status(400).json({ message: "Post slug is required" });
    }
    await db.query(`UPDATE posts SET deleted_at = NOW() WHERE slug = $1`, [
      postSlug,
    ]);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while deleting the post" });
  }
};
