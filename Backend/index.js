import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDb } from "./src/config/db.js";
import userRoutes from "./src/routes/user.js";
import adminRoutes from "./src/routes/admin.js";
import doctorRoutes from "./src/routes/doctor.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
