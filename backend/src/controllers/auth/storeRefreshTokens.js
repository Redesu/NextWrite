import db from '../../config/db.js';
import "dotenv/config";

export const storeRefreshToken = async (userId, token) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + parseInt(process.env.COOKIE_EXPIRES_IN));

    await db.query(
        'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
        [userId, token, expiresAt]
    );
};