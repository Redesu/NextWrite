import jwt from 'jsonwebtoken';
import db from '../config/db.js';

export const protect = async (req, res, next) => {
    try {
        let token;

        // check if there is a token in cookies
        if (req.cookies.acessToken) {
            token = req.cookies.acessToken;
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' })
        }

        // verifying the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // check if the user still exists
        const user = await db.query('SELECT * FROM users WHERE id = $1', [decoded.id]);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'User no longer exists' });
        }

        req.user = user.rows[0];
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};