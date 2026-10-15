import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URI ? "MongoDB Atlas" : "Local MongoDB (fallback)");
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smartpark", {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    // Non-blocking fallback for local preview without MongoDB server
  }
};

export default connectDB;
