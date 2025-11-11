import db from "../../config/db.js";

export const getPost = async (req, res) => {
  try {
    const { postSlug } = req.params;
    if (!postSlug) {
      return res.status(400).json({ message: "Post slug is required" });
    }

    const result = await db.query(`SELECT * FROM posts WHERE slug = $1`, [
      postSlug,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching post:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching the post" });
  }
};
