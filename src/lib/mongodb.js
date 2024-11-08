import mongoose from "mongoose";

let isConnected = false; // Track connection status

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  console.log(process.env.MONGODB_URI);

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Connected to MongoDb");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}
