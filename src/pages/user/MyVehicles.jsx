import { useState } from "react";
import { Car, Bike, Plus, Trash2, CheckCircle2, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import Button from "../../components/common/Button";

const initialVehicles = [
  {
    id: "v1",
    plate: "OD02AB1234",
    model: "Hyundai Creta",
    type: "car",
    color: "Polar White",
    isDefault: true,
  },
  {
    id: "v2",
    plate: "OD02CD5678",
    model: "Tata Nexon EV",
    type: "car",
    color: "Teal Blue",
    isDefault: false,
  },
  {
    id: "v3",
    plate: "OD02XY9999",
    model: "Royal Enfield Classic 350",
    type: "bike",
    color: "Stealth Black",
    isDefault: false,
  },
];

const MyVehicles = () => {
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem("parkingVehicles");
    return saved ? JSON.parse(saved) : initialVehicles;
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    plate: "",
    model: "",
    type: "car",
    color: "",
  });

  const saveToStorage = (updated) => {
    setVehicles(updated);
    localStorage.setItem("parkingVehicles", JSON.stringify(updated));
  };

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!newVehicle.plate || !newVehicle.model) {
      toast.error("Please provide vehicle registration number and model");
      return;
    }

    const created = {
      id: "v_" + Date.now(),
      plate: newVehicle.plate.toUpperCase(),
      model: newVehicle.model,
      type: newVehicle.type,
      color: newVehicle.color || "Standard",
      isDefault: vehicles.length === 0,
    };

    const updated = [created, ...vehicles];
    saveToStorage(updated);
    toast.success(`Vehicle ${created.plate} added successfully!`);
    setShowAddModal(false);
    setNewVehicle({ plate: "", model: "", type: "car", color: "" });
  };

  const handleDelete = (id) => {
    const updated = vehicles.filter((v) => v.id !== id);
    saveToStorage(updated);
    toast.success("Vehicle deleted");
  };

  const handleSetDefault = (id) => {
    const updated = vehicles.map((v) => ({
      ...v,
      isDefault: v.id === id,
    }));
    saveToStorage(updated);
    toast.success("Default vehicle updated");
  };

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <div className="pt-20 flex">
        <Sidebar />

        <main className="flex-1 p-6 md:p-10 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
            <div>
              <p className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
                VEHICLE MANAGEMENT
              </p>
              <h1 className="text-4xl font-black text-slate-900 mt-2 tracking-tight">
                My Vehicles
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Manage your registered cars and bikes for express parking reservations and automatic barrier entry.
              </p>
            </div>

            <Button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 py-3 px-5 text-sm font-bold shadow-md shadow-emerald-500/25"
            >
              <Plus size={18} />
              Add New Vehicle
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((v) => (
              <div
                key={v.id}
                className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-xl hover:border-emerald-300 relative overflow-hidden flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-100 to-teal-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shadow-xs">
                      {v.type === "car" ? <Car size={24} /> : <Bike size={24} />}
                    </div>

                    {v.isDefault ? (
                      <span className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                        <CheckCircle2 size={13} className="text-emerald-600" /> Default
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSetDefault(v.id)}
                        className="text-xs text-slate-500 hover:text-emerald-600 underline font-semibold cursor-pointer"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>

                  <div className="mt-5">
                    <h3 className="text-2xl font-black tracking-wider text-slate-900">
                      {v.plate}
                    </h3>
                    <p className="text-sm font-bold text-slate-700 mt-1">
                      {v.model}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Color: {v.color}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    Verified Plate
                  </span>

                  <button
                    onClick={() => handleDelete(v.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                    title="Delete Vehicle"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {showAddModal && (
            <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
                <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">Register Vehicle</h3>
                <p className="text-xs text-slate-500 mb-6">Enter your vehicle details for automatic entry gate verification.</p>

                <form onSubmit={handleAddVehicle} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      Registration Plate Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. OD02AB1234"
                      value={newVehicle.plate}
                      onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 outline-none focus:bg-white focus:border-emerald-500 text-sm uppercase font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      Vehicle Model
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hyundai Creta"
                      value={newVehicle.model}
                      onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 outline-none focus:bg-white focus:border-emerald-500 text-sm font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                        Vehicle Type
                      </label>
                      <select
                        value={newVehicle.type}
                        onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 outline-none focus:bg-white focus:border-emerald-500 text-sm font-semibold cursor-pointer"
                      >
                        <option value="car">🚗 Car (4-Wheeler)</option>
                        <option value="bike">🏍️ Bike (2-Wheeler)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                        Color
                      </label>
                      <input
                        type="text"
                        placeholder="White / Black"
                        value={newVehicle.color}
                        onChange={(e) => setNewVehicle({ ...newVehicle, color: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 outline-none focus:bg-white focus:border-emerald-500 text-sm font-semibold"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <Button type="submit" className="flex-1 py-3">
                      Save Vehicle
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyVehicles;
