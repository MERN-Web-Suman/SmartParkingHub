import { useState } from "react";
import { Car, Search, Filter, History, Zap, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const initialVehicles = [
  { id: 1, plate: "OR-02-AX-4821", owner: "Suman Kumar", type: "Car (Sedan)", model: "Honda City", ev: false, status: "Parked", slot: "A-12" },
  { id: 2, plate: "OR-02-EV-9012", owner: "Rahul Sharma", type: "EV Car", model: "Tata Nexon EV", ev: true, status: "Charging", slot: "EV-02" },
  { id: 3, plate: "OR-05-BC-1123", owner: "Priya Patel", type: "SUV", model: "Hyundai Creta", ev: false, status: "Out", slot: "-" },
  { id: 4, plate: "OR-02-BK-7744", owner: "Amit Verma", type: "Bike / Scooter", model: "TVS Jupiter", ev: false, status: "Parked", slot: "M-05" },
  { id: 5, plate: "OR-01-EV-3344", owner: "Sneha Reddy", type: "EV Scooter", model: "Ather 450X", ev: true, status: "Charging", slot: "EV-01" },
];

const VehicleMgmtView = () => {
  const [vehicles] = useState(initialVehicles);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = vehicles.filter((v) => {
    const matchSearch =
      v.plate.toLowerCase().includes(search.toLowerCase()) ||
      v.owner.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || (typeFilter === "ev" ? v.ev : v.type.toLowerCase().includes(typeFilter));
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-8">
      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#0D1B2A] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-slate-400 font-semibold uppercase">Total Registered</p>
          <h3 className="text-2xl font-black text-white mt-1">412</h3>
        </div>
        <div className="bg-[#0D1B2A] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-emerald-400 font-semibold uppercase">Currently Parked</p>
          <h3 className="text-2xl font-black text-emerald-400 mt-1">328</h3>
        </div>
        <div className="bg-[#0D1B2A] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-cyan-400 font-semibold uppercase">EV Vehicles</p>
          <h3 className="text-2xl font-black text-cyan-400 mt-1">54</h3>
        </div>
        <div className="bg-[#0D1B2A] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-purple-400 font-semibold uppercase">Two Wheelers</p>
          <h3 className="text-2xl font-black text-purple-400 mt-1">98</h3>
        </div>
      </div>

      {/* Main Vehicle Table */}
      <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Car size={22} className="text-emerald-400" />
              Vehicle Management & License History
            </h3>
            <p className="text-xs text-slate-400 mt-1">Search license plates, monitor active EV charging, and inspect history.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search plate or owner..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
            >
              <option value="all">All Types</option>
              <option value="car">Car (Sedan/SUV)</option>
              <option value="ev">EV Vehicles Only</option>
              <option value="bike">Bike / Scooter</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Plate Number</th>
                <th className="py-3.5 px-4">Owner</th>
                <th className="py-3.5 px-4">Type & Model</th>
                <th className="py-3.5 px-4">Current Slot</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">History</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-medium text-slate-200">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-mono font-black text-white text-base flex items-center gap-2">
                    <span className="bg-slate-900 border border-amber-500/50 text-amber-300 px-3 py-1 rounded-lg text-xs font-bold">
                      {v.plate}
                    </span>
                    {v.ev && <Zap size={16} className="text-cyan-400 animate-pulse" title="EV Vehicle" />}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-300">{v.owner}</td>
                  <td className="py-4 px-4 text-xs text-slate-400">
                    <p className="font-bold text-white">{v.type}</p>
                    <p>{v.model}</p>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-emerald-400">{v.slot}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                        v.status === "Parked"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : v.status === "Charging"
                          ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                          : "bg-slate-800 text-slate-400 border-white/10"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => toast.success(`Viewing parking logs for ${v.plate}`)}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold border border-white/10 flex items-center gap-1.5 ml-auto"
                    >
                      <History size={14} />
                      Log History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VehicleMgmtView;
