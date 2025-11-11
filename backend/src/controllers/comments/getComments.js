import db from "../../config/db.js";

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    // Fetch comments for the given post ID
    const result = await db.query(
      "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC",
      [postId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this post" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching comments" });
  }
};
