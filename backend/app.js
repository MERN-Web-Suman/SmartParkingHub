import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import parkingRoutes from "./routes/parkingRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { verifyQREntry, verifyQRExit } from "./controllers/entryController.js";
import { protect } from "./middleware/authMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/parking", parkingRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/admin", adminRoutes);

// Gate QR Entry & Exit Endpoints
app.post("/api/entry/verify-qr", protect, verifyQREntry);
app.post("/api/entry/verify-exit", protect, verifyQRExit);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", service: "SmartPark Backend API", timestamp: new Date() });
});

export default app;
