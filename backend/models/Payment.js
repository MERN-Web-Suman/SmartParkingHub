import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reservationId: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation" },
    amount: { type: Number, required: true },
    method: { type: String, enum: ["wallet", "upi", "card"], default: "wallet" },
    status: { type: String, enum: ["Success", "Pending", "Failed"], default: "Success" },
    transactionId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
