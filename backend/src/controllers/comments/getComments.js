import db from "../../config/db.js";

export const getComments = async (req, res) => {
  try {
    const { postSlug } = req.params;

    if (!postSlug) {
      return res.status(400).json({ message: "Post slug is required" });
    }

    // Fetch comments for the given post slug
    const result = await db.query(
      `SELECT c.id, c.content, 
      c.created_at, u.username FROM comments c INNER JOIN users u ON 
      c.author_id = u.id WHERE post_slug = $1 ORDER BY 
      c.created_at DESC`,
      [postSlug]
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
