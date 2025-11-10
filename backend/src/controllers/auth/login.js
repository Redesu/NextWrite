import bcrypt from "bcrypt";
import db from "../../config/db.js";
import { generateTokens } from "./generateTokens.js";
import { storeRefreshToken } from "./storeRefreshTokens.js";
import "dotenv/config";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //check the password
    const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //generates the tokens
    const { accessToken, refreshToken } = generateTokens(user.rows[0].id);

    //store the refresh token in the database
    await storeRefreshToken(user.rows[0].id, refreshToken);

    //set the cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? "none" : "lax",
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? "none" : "lax",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      id: user.rows[0].id,
      username: user.rows[0].username,
      email: user.rows[0].email,
      message: "Login successful!",
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Something went wrong while logging in" });
  }
};
