import mongoose from "mongoose";

const parkingAreaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    totalSlots: { type: Number, required: true },
    availableSlots: { type: Number, required: true },
    hourlyRate: { type: Number, default: 30 },
    carSlots: { type: Number, default: 50 },
    bikeSlots: { type: Number, default: 30 },
  },
  { timestamps: true }
);

export default mongoose.model("ParkingArea", parkingAreaSchema);
