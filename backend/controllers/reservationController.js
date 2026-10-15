import Reservation from "../models/Reservation.js";
import { generateQRCode } from "../utils/generateQR.js";

export const createReservation = async (req, res) => {
  const { parkingAreaId, slotNumber, vehiclePlate, startTime, endTime, durationHours, totalFee } = req.body;

  try {
    const qrPassCode = `QR-PARK-${Date.now().toString().slice(-6)}`;
    const qrDataUrl = await generateQRCode(qrPassCode);

    const reservation = await Reservation.create({
      userId: req.user._id,
      parkingAreaId,
      slotNumber,
      vehiclePlate,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      durationHours,
      totalFee,
      qrPassCode,
    });

    res.status(201).json({ reservation, qrDataUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    reservation.status = "Cancelled";
    await reservation.save();
    res.json({ message: "Reservation cancelled successfully", reservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
