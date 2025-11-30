import db from "../src/config/db.js";
import bcrypt from "bcrypt";

beforeAll(async () => {
  await db.query("TRUNCATE comments RESTART IDENTITY CASCADE");
  await db.query("TRUNCATE posts RESTART IDENTITY CASCADE");
  await db.query("TRUNCATE users RESTART IDENTITY CASCADE");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash("password", salt);

  await db.query(
    `
    INSERT INTO users (username, email, password_hash)
    VALUES ('testuser', '7VpGm@example.com', $1)
  `,
    [hashPassword]
  );

  await db.query(`
    INSERT INTO posts (slug, title, description, content, created_by)
    VALUES ('test-post', 'Test Post', 'Test description', 'This is a test post', 'testuser')
  `);

  await db.query(`
    INSERT INTO comments (post_slug, content, author_id)
    VALUES ('test-post', 'This is a test comment', 1)
  `);
});

afterAll(async () => {
  await db.end();
});
