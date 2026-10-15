import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plateNumber: { type: String, required: true, uppercase: true },
    model: { type: String, required: true },
    type: { type: String, enum: ["car", "bike", "ev"], default: "car" },
    color: { type: String, default: "Standard" },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Vehicle", vehicleSchema);
