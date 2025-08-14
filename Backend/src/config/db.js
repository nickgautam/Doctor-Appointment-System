import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB database connected successfully"))
    .catch((err) => console.error(`MongoDB connection failed: ${err.message}`));
};
