import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Car,
  ArrowLeft,
  ShieldCheck,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import SlotCard from "../../components/parking/SlotCard";
import Button from "../../components/common/Button";

const slots = [
  { number: "A01", status: "available" },
  { number: "A02", status: "occupied" },
  { number: "A03", status: "available" },
  { number: "A04", status: "reserved" },
  { number: "A05", status: "available" },
  { number: "A06", status: "occupied" },
  { number: "A07", status: "available" },
  { number: "A08", status: "available" },
  { number: "A09", status: "occupied" },
  { number: "A10", status: "available" },
  { number: "A11", status: "available" },
  { number: "A12", status: "maintenance" },
  { number: "A13", status: "available" },
  { number: "A14", status: "available" },
  { number: "A15", status: "occupied" },
  { number: "A16", status: "available" },
];

const ParkingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [durationHours, setDurationHours] = useState(2);
  const [selectedVehicle, setSelectedVehicle] = useState("OD02AB1234");

  const hourlyRate = 20;
  const totalPrice = selectedSlot ? durationHours * hourlyRate : 0;

  const handleSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleReservation = () => {
    if (!selectedSlot) {
      toast.error("Please select an available parking slot first");
      return;
    }

    toast.success(`Slot ${selectedSlot.number} successfully reserved for ${durationHours} hrs!`);
    
    // Save booking to localStorage for demonstration persistence
    const existingBookings = JSON.parse(localStorage.getItem("parkingBookings") || "[]");
    const newBooking = {
      id: "BK-" + Date.now().toString().slice(-5),
      parkingName: "Smart Parking A",
      slot: selectedSlot.number,
      vehicle: selectedVehicle,
      duration: `${durationHours} hours`,
      amount: `₹${totalPrice}`,
      time: new Date().toLocaleString(),
      status: "Active",
    };
    localStorage.setItem("parkingBookings", JSON.stringify([newBooking, ...existingBookings]));

    navigate("/bookings");
  };

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <div className="pt-20 flex">
        <Sidebar />

        <main className="flex-1 p-6 md:p-10 max-w-7xl">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 text-sm transition font-semibold cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back to search
          </button>

          <div className="grid lg:grid-cols-3 gap-7">

            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs">

                <div className="flex flex-col sm:flex-row justify-between gap-5">
                  <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                      Smart Parking A
                    </h1>

                    <div className="flex items-center gap-2 text-slate-500 mt-2 text-sm">
                      <MapPin size={16} className="text-emerald-600" />
                      Unit 4, Bhubaneswar
                    </div>
                  </div>

                  <div className="text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2 h-fit text-sm font-bold shadow-xs">
                    42 Slots Available
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 mt-6 text-sm text-slate-700 border-y border-slate-100 py-4 font-semibold">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-emerald-600" />
                    Open 24/7
                  </div>

                  <div className="flex items-center gap-2">
                    <Car size={16} className="text-sky-600" />
                    ₹20 / hour
                  </div>

                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-purple-600" />
                    CCTV & Guarded
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <h2 className="text-xl font-bold text-slate-900">
                      Select Parking Slot
                    </h2>

                    <div className="flex flex-wrap gap-4 text-xs font-bold">
                      <span className="text-emerald-700 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available
                      </span>

                      <span className="text-rose-600 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Occupied
                      </span>

                      <span className="text-amber-700 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Reserved
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4">
                    {slots.map((slot) => (
                      <SlotCard
                        key={slot.number}
                        slot={slot}
                        selected={selectedSlot?.number === slot.number}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs sticky top-28 space-y-5">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  RESERVATION SUMMARY
                </p>

                <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4">
                  <p className="text-emerald-800 text-xs font-bold uppercase">Selected Slot</p>
                  <h2 className="text-4xl font-black text-emerald-600 mt-1">
                    {selectedSlot?.number || "--"}
                  </h2>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                    Select Vehicle
                  </label>
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 outline-none focus:bg-white focus:border-emerald-500 text-sm font-semibold cursor-pointer"
                  >
                    <option value="OD02AB1234">🚘 Car - OD02AB1234 (Hyundai Creta)</option>
                    <option value="OD02CD5678">🚘 Car - OD02CD5678 (Tata Nexon)</option>
                    <option value="OD02XY9999">🏍️ Bike - OD02XY9999 (Royal Enfield)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                    Duration (Hours)
                  </label>
                  <div className="flex items-center gap-3">
                    {[1, 2, 4, 8].map((h) => (
                      <button
                        key={h}
                        onClick={() => setDurationHours(h)}
                        className={`flex-1 py-2 rounded-xl text-sm font-bold border transition cursor-pointer ${
                          durationHours === h
                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-500 shadow-xs"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        {h}h
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Rate per hour</span>
                    <span className="font-bold text-slate-900">₹{hourlyRate}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Duration</span>
                    <span className="font-bold text-slate-900">{durationHours} Hours</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Reservation Fee</span>
                    <span className="font-bold text-emerald-600">FREE</span>
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex justify-between text-lg font-black">
                    <span className="text-slate-900">Total Amount</span>
                    <span className="text-emerald-600">₹{totalPrice}</span>
                  </div>
                </div>

                <Button
                  onClick={handleReservation}
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-base font-bold shadow-md shadow-emerald-500/25"
                >
                  <Check size={18} />
                  Confirm & Reserve
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParkingDetails;
