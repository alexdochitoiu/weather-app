import sqlite3 from "sqlite3";
import path from "path";

sqlite3.verbose();

const dbPath = path.resolve(__dirname, "../../weather.db");

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to database:", err);
  } else {
    console.log("Connected to SQLite database at", dbPath);
  }
});
