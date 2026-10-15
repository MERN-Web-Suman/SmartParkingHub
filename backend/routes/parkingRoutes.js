import express from "express";
import { getParkingAreas, getParkingAreaById } from "../controllers/parkingController.js";

const router = express.Router();

router.get("/", getParkingAreas);
router.get("/:id", getParkingAreaById);

export default router;
