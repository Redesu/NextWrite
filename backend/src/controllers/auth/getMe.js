import db from "../../config/db.js";

export const getMe = async (req, res) => {
    try {
        const user = await db.query(
            'SELECT id, username, email FROM users WHERE id = $1', [req.user.id]
        );
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.rows[0]);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Something went wrong while fetching user data' });
    }
}