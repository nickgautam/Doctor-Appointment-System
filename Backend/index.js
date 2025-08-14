import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDb } from "./src/config/db.js";
import userRoutes from "./src/routes/user.js";
const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.use("/api/auth", userRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
