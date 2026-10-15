import ParkingArea from "../models/ParkingArea.js";
import ParkingSlot from "../models/ParkingSlot.js";

export const getParkingAreas = async (req, res) => {
  try {
    const areas = await ParkingArea.find();
    if (areas.length === 0) {
      // Mock seed data response
      return res.json([
        {
          _id: "area_1",
          name: "Smart Parking A",
          location: "Unit 4, Bhubaneswar",
          totalSlots: 100,
          availableSlots: 42,
          hourlyRate: 20,
          carSlots: 25,
          bikeSlots: 17,
        },
        {
          _id: "area_2",
          name: "City Center Parking",
          location: "Saheed Nagar, Main Market",
          totalSlots: 80,
          availableSlots: 45,
          hourlyRate: 30,
          carSlots: 45,
          bikeSlots: 35,
        },
      ]);
    }
    res.json(areas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getParkingAreaById = async (req, res) => {
  try {
    const area = await ParkingArea.findById(req.params.id);
    const slots = await ParkingSlot.find({ parkingAreaId: req.params.id });
    res.json({ area, slots });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
