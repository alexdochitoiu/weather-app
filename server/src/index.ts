import express from "express";
import dotenv from "dotenv";
import "@/db/init";
import citiesRouter from "@/routes/cities.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/cities", citiesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
