import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDb } from "./src/config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
