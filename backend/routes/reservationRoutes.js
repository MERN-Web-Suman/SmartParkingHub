import express from "express";
import { createReservation, getMyReservations, cancelReservation } from "../controllers/reservationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.post("/", createReservation);
router.get("/", getMyReservations);
router.put("/:id/cancel", cancelReservation);

export default router;
