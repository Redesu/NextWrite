import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.NODE_ENV = "test";

dotenv.config({
  path: path.resolve(__dirname, "../.env.test"),
});

console.log("Preload - NODE_ENV:", process.env.NODE_ENV);
console.log("Preload - DB_NAME:", process.env.DB_NAME);
console.log("Preload - DB_PASSWORD:", process.env.DB_PASSWORD);
