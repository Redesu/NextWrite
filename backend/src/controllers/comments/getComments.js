import db from '../../config/db.js'


export const getComments = async (req, res) => {
    try {
        const { postSlug } = req.params;
        const { rows } = await db.query(`
            SELECT c.*, u.username
            FROM comments c
            JOIN users u ON c.author_id = u.id
            WHERE post_slug = $1
            ORDER BY c.created_at DESC
            `, [postSlug]);
        res.status(201).json(rows);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Something went wrong while fetching comments' });
    }
}