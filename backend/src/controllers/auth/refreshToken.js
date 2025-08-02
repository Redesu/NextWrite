import jwt from 'jsonwebtoken';
import db from "../../config/db.js";
import "dotenv/config";

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }

        // this verifies the refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        // checking if the refresh token already exists in the database
        const tokenDb = await db.query('SELECT * FROM refresh_tokens WHERE token = $1 AND user_id = $2', [refreshToken, decoded.id]);

        if (tokenDb.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        // checking if the token is expired
        if (new Date(tokenDb.rows[0].expires_at) < new Date()) {
            await db.query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]);
            return res.status(401).json({ message: 'Refresh token expired' });
        }

        // generates new token
        const accessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        //set the token into cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 15 * 60 * 1000,
        });

        res.status(200).json({ message: 'Token refreshed successfully' });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }
        console.error('Error refreshing token:', error);
        res.status(500).json({ message: "Something went wrong while refreshing the token" });
    }
}