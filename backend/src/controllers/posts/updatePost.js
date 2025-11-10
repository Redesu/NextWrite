import db from "../../config/db.js";

export const updatePost = async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const { postSlug } = req.params;
    const username = req.user.username;

    if (!title || !description || !content) {
      return res
        .status(400)
        .json({ message: "Title, description, and content are required" });
    }

    const result = await db.query(
      `UPDATE posts SET title = $1, description = $2, content = $3 WHERE slug = $4 AND created_by = $5 RETURNING *`,
      [title, description, content, postSlug, username]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating post:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while updating the post" });
  }
};
