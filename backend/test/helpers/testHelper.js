import jwt from "jsonwebtoken";

export function generateTestToken(payload = { userId: 1 }) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

export function generateExpiredToken(payload = { userId: 1 }) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "-1h",
  });
}
