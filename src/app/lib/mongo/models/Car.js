import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  mileage: Number,
  maintenanceHistory: [
    {
      date: Date,
      description: String,
    },
  ],
});

export default mongoose.models.Car || mongoose.model("Car", CarSchema);
