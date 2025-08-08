import { db } from "./connection";

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS cities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      state TEXT,
      country TEXT NOT NULL,
      tourist_rating INTEGER CHECK(tourist_rating >= 1 AND tourist_rating <= 5),
      date_established TEXT,
      estimated_population INTEGER
    )
  `, (err) => {
    if (err) {
      console.error("Error creating cities table:", err);
    } else {
      console.log("Cities table ready.");
    }
  });
});
