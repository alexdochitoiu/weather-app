import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "@/db/init";
import citiesRouter from "@/routes/cities.routes";

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:4000', 'http://localhost:4001', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

app.use("/api/cities", citiesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
