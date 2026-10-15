import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    parkingAreaId: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingArea", required: true },
    slotId: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingSlot" },
    slotNumber: { type: String, required: true },
    vehiclePlate: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    durationHours: { type: Number, required: true },
    totalFee: { type: Number, required: true },
    qrPassCode: { type: String, required: true },
    status: {
      type: String,
      enum: ["Active", "Completed", "Cancelled"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
