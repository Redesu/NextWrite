import db from "../src/config/db.js";

console.log("Setup - Using database:", process.env.DB_NAME);
console.log("Setup - Using password:", process.env.DB_PASSWORD);

beforeAll(async () => {
  await db.query("TRUNCATE comments RESTART IDENTITY CASCADE");
  await db.query("TRUNCATE posts RESTART IDENTITY CASCADE");
  await db.query("TRUNCATE users RESTART IDENTITY CASCADE");
});

afterAll(async () => {
  await db.end();
});
