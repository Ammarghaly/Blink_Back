import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection 🚀");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log("New MongoDB Connection Established 🚀");
  } catch (error) {
    console.error("DB Connection Error:", error.message);
    // In serverless, we don't necessarily want to exit the process
    // throw error; 
  }
};

export default connectDB;

