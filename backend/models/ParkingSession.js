import mongoose from "mongoose";

const parkingSessionSchema = new mongoose.Schema(
  {
    reservationId: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vehiclePlate: { type: String, required: true },
    entryTime: { type: Date, default: Date.now },
    exitTime: { type: Date },
    totalFee: { type: Number, default: 0 },
    gateStatus: { type: String, enum: ["entered", "exited"], default: "entered" },
  },
  { timestamps: true }
);

export default mongoose.model("ParkingSession", parkingSessionSchema);
