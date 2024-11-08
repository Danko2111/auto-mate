import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const CarSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  milage: { type: String, required: true },
  notes: { type: Array, required: false },
  lastServiceDate: { type: String, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.models.Car || mongoose.model("Car", CarSchema);
