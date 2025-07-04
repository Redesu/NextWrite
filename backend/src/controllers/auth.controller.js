import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../config/db.js';
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

export const storeRefreshToken = async (userId, token) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + parseInt(process.env.COOKIE_EXPIRES_IN));

    await db.query(
        'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
        [userId, token, expiresAt]
    );
};

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //checking if the user exist
        const userExists = await db.query(
            'SELECT * FROM users where email = $1 OR username = $2',
            [email, username]
        );

        if (userExists.rows.lenght > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating the user
        const newUser = await db.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        //generates the tokens
        const { accessToken, refreshToken } = generateTokens(newUser.rows[0].id);

        //store the refresh token in the database
        await storeRefreshToken(newUser.rows[0].id, refreshToken);

        //set the cookies
        res.cookie('acessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        console.log("User created successfully");
        res.status(201).json({
            id: newUser.rows[0].id,
            username: newUser.rows[0].username,
            email: newUser.rows[0].email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //check the password
        const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //generates the tokens
        const { accessToken, refreshToken } = generateTokens(user.rows[0].id);

        //store the refresh token in the database
        await storeRefreshToken(user.rows[0].id, refreshToken);

        //set the cookies
        res.cookie('acessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            id: user.rows[0].id,
            username: user.rows[0].username,
            email: user.rows[0].email,
            message: 'Login successful!'
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        // this should delete the refresh token from the database
        if (refreshToken) {
            await db.query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]);
        }

        // clear the cookies
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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

        if (tokenDb.rows.lenght === 0) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        //checking if the token is expired
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
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });

        res.status(200).json({ message: 'Token refreshed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
        res.status(500).json({ message: error.message });
    }
}