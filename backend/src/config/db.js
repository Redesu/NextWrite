// import { Pool } from "pg";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import "dotenv/config";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({
  connectionString: process.env.DB_HOST,
  ssl: true,
});

// If you are using a local database then use the following
// const pool = new Pool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

export default {
  query: (text, params) => pool.query(text, params),
};
