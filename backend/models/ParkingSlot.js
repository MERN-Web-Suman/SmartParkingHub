import mongoose from "mongoose";

const parkingSlotSchema = new mongoose.Schema(
  {
    parkingAreaId: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingArea", required: true },
    slotNumber: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "occupied", "reserved", "maintenance"],
      default: "available",
    },
    vehicleType: { type: String, enum: ["car", "bike"], default: "car" },
  },
  { timestamps: true }
);

export default mongoose.model("ParkingSlot", parkingSlotSchema);
