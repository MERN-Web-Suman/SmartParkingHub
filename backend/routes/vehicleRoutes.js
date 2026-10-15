import express from "express";
import { getVehicles, addVehicle, deleteVehicle } from "../controllers/vehicleController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", getVehicles);
router.post("/", addVehicle);
router.delete("/:id", deleteVehicle);

export default router;
