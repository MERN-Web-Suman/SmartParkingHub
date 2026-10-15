import { useState } from "react";
import { QrCode, Clock, MapPin, Calendar, Car, X, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

const initialBookings = [
  {
    id: "BK-88219",
    parkingName: "Smart Parking A",
    slot: "Slot A-24",
    vehicle: "OD02AB1234",
    duration: "2 hours",
    amount: "₹40",
    time: "Today, 06:00 PM",
    status: "Active",
  },
  {
    id: "BK-77102",
    parkingName: "City Parking Hub",
    slot: "Slot B-12",
    vehicle: "OD02CD5678",
    duration: "3 hours",
    amount: "₹60",
    time: "24 Sep 2026, 02:30 PM",
    status: "Completed",
  },
  {
    id: "BK-66044",
    parkingName: "Central Parking",
    slot: "Slot C-05",
    vehicle: "OD02XY9999",
    duration: "2 hours",
    amount: "₹40",
    time: "20 Sep 2026, 11:00 AM",
    status: "Completed",
  },
];

const MyBookings = () => {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("parkingBookings");
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [activeTab, setActiveTab] = useState("all");
  const [selectedQR, setSelectedQR] = useState(null);

  const handleCancel = (id) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: "Cancelled" } : b
    );
    setBookings(updated);
    localStorage.setItem("parkingBookings", JSON.stringify(updated));
    toast.success("Reservation cancelled");
  };

  const filtered = bookings.filter((b) => {
    if (activeTab === "active") return b.status === "Active";
    if (activeTab === "completed") return b.status === "Completed";
    return true;
  });

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <div className="pt-20 flex">
        <Sidebar />

        <main className="flex-1 p-6 md:p-10 max-w-7xl">
          <div className="mb-8">
            <p className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
              BOOKING HISTORY
            </p>
            <h1 className="text-4xl font-black text-slate-900 mt-2 tracking-tight">
              My Bookings
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              View your active parking reservations, digital entry passes, and historical trips.
            </p>
          </div>

          <div className="flex gap-2 border-b border-slate-200 pb-4 mb-8">
            {["all", "active", "completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filtered.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-100 rounded-lg text-slate-700 border border-slate-200">
                      {b.id}
                    </span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-bold border ${
                        b.status === "Active"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : b.status === "Completed"
                          ? "bg-sky-50 text-sky-800 border-sky-200"
                          : "bg-rose-50 text-rose-800 border-rose-200"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{b.parkingName}</h3>

                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600 pt-1">
                    <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <MapPin size={14} className="text-emerald-600" /> {b.slot}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <Car size={14} className="text-sky-600" /> {b.vehicle}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <Calendar size={14} className="text-purple-600" /> {b.time}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <Clock size={14} className="text-amber-600" /> {b.duration}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-semibold">Total Paid</p>
                    <p className="text-2xl font-black text-emerald-600">{b.amount}</p>
                  </div>

                  {b.status === "Active" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedQR(b)}
                        className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-md shadow-emerald-500/25 cursor-pointer"
                      >
                        <QrCode size={16} /> Entry Pass
                      </button>
                      <button
                        onClick={() => handleCancel(b.id)}
                        className="px-3.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold text-xs transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-16 bg-white border border-slate-200/80 rounded-3xl shadow-xs">
                <p className="text-lg font-bold text-slate-900">No bookings found</p>
                <p className="text-slate-500 text-sm mt-1">You don't have any reservations matching this filter.</p>
              </div>
            )}
          </div>

          {/* QR Pass Modal */}
          {selectedQR && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 w-full max-w-sm text-center shadow-2xl relative">
                <button
                  onClick={() => setSelectedQR(null)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-2 cursor-pointer"
                >
                  <X size={20} />
                </button>

                <h3 className="text-xl font-black text-slate-900 mb-1">Smart Parking Pass</h3>
                <p className="text-xs text-slate-500 mb-6 font-medium">{selectedQR.parkingName} - {selectedQR.slot}</p>

                <div className="bg-emerald-50 p-6 rounded-2xl inline-block shadow-inner border-2 border-emerald-200">
                  <div className="w-48 h-48 bg-white rounded-xl flex flex-col items-center justify-center p-4 text-emerald-800 font-mono text-center shadow-md">
                    <QrCode size={130} className="text-slate-900" />
                    <p className="text-xs text-slate-900 font-bold mt-2">{selectedQR.id}</p>
                  </div>
                </div>

                <div className="mt-6 text-xs text-slate-700 space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p><span className="text-slate-400 font-medium">Vehicle:</span> <span className="font-bold">{selectedQR.vehicle}</span></p>
                  <p><span className="text-slate-400 font-medium">Slot:</span> <span className="font-bold">{selectedQR.slot}</span></p>
                  <p className="text-emerald-700 font-bold flex items-center justify-center gap-1 mt-2">
                    <CheckCircle size={14} className="text-emerald-600" /> Scan at Barrier Gate
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyBookings;
