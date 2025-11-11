import db from "../../config/db.js";

export const addPost = async (req, res) => {
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
      `INSERT INTO posts (slug, title, description, content, created_by)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
      [postSlug, title, description, content, username]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding post:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while adding the post" });
  }
};
