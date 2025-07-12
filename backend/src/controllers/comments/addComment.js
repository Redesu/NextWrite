import db from '../../config/db.js';

export const addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { parent_id } = req.body;
        const { postSlug } = req.params;
        const userId = req.user.id; // Assuming user ID is available in req.user

        if (!content || !slug) {
            return res.status(400).json({ message: 'Content and post slug are required' });
        }

        const result = await db.query(
            `INSERT INTO comments (content, post_slug, author_id, parent_id)
             VALUES ($1, $2, $3, $4)
             RETURNING *, (SELECT username FROM users where id = $2) as username`,
            [content, postSlug, userId, parent_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Something went wrong while adding the comment' });
    }
}