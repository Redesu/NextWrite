import bcrypt from "bcrypt";
import db from "../../config/db.js";
import { generateTokens } from "./generateTokens.js";
import { storeRefreshToken } from "./storeRefreshTokens.js";
import "dotenv/config";

export const register = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //checking if the user exist
    const userExists = await db.query(
      "SELECT * FROM users where email = $1 OR username = $2",
      [email, username]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating the user
    const newUser = await db.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    //generates the tokens
    const { accessToken, refreshToken } = generateTokens(newUser.rows[0].id);

    //store the refresh token in the database
    await storeRefreshToken(newUser.rows[0].id, refreshToken);

    //set the cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      id: newUser.rows[0].id,
      username: newUser.rows[0].username,
      email: newUser.rows[0].email,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Something went wrong while registering" });
  }
};
