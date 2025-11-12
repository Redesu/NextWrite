import { neonConfig, Pool as NeonPool } from "@neondatabase/serverless";
import { Pool as PgPool } from "pg";
import ws from "ws";

const isProduction = process.env.NODE_ENV === "production";
let pool;

if (isProduction) {
  neonConfig.webSocketConstructor = ws;
  pool = new NeonPool({
    connectionString: process.env.DB_HOST,
    ssl: true,
  });
} else {
  pool = new PgPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

export default {
  query: (text, params) => pool.query(text, params),
};
