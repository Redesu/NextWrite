import db from "../../config/db.js";

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    // this should delete the refresh token from the database
    if (refreshToken) {
      await db.query("DELETE FROM refresh_tokens WHERE token = $1", [
        refreshToken,
      ]);
    }

    // clear the cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Something went wrong while logging out" });
  }
};
