import Vehicle from "../models/Vehicle.js";

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ userId: req.user._id });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addVehicle = async (req, res) => {
  const { plateNumber, model, type, color } = req.body;
  try {
    const vehicle = await Vehicle.create({
      userId: req.user._id,
      plateNumber,
      model,
      type,
      color,
    });
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
