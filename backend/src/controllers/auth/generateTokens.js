import jwt from 'jsonwebtoken';
import "dotenv/config";

export const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    );

    return { accessToken, refreshToken };
};