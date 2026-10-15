import Payment from "../models/Payment.js";
import User from "../models/User.js";

export const processPayment = async (req, res) => {
  const { reservationId, amount, method } = req.body;

  try {
    const transactionId = `TXN-${Date.now()}`;
    const payment = await Payment.create({
      userId: req.user._id,
      reservationId,
      amount,
      method,
      status: "Success",
      transactionId,
    });

    if (method === "wallet" && req.user.walletBalance) {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { walletBalance: -amount },
      });
    }

    res.status(201).json({ message: "Payment processed successfully", payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
