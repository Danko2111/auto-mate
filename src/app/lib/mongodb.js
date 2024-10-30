import mongoose from "mongoose";

let isConnected = false; // Track connection status

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDb");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}
