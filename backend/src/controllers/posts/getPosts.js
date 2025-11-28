import db from "../../config/db.js";

export const getPosts = async (req, res) => {
  try {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 0;

    const result = await db.query(
      `SELECT * FROM posts WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching posts" });
  }
};
