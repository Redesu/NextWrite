import db from "../../config/db.js";

export const getPosts = async (req, res) => {
    try {
        const offset = req.query.offset || 0;
        const limit = req.query.limit || 10;

        const result = await db.query(
            `SELECT * FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }
        res.status(200).json(result.rows);

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Something went wrong while fetching posts' });
    }
}