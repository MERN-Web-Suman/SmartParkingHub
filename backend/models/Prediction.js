import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    parkingAreaId: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingArea" },
    locationName: { type: String, required: true },
    targetDate: { type: String, required: true },
    targetTime: { type: String, required: true },
    predictedOccupancy: { type: Number, required: true },
    recommendedTime: { type: String, required: true },
    demandLevel: { type: String, enum: ["LOW", "MEDIUM", "HIGH"], default: "MEDIUM" },
  },
  { timestamps: true }
);

export default mongoose.model("Prediction", predictionSchema);
