import { useState } from "react";
import { CalendarCheck, Search, CheckCircle, XCircle, Clock, Eye, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const initialReservations = [
  { id: "RES-8801", user: "Suman Kumar", area: "City Mall Complex", slot: "A-12", vehicle: "OR-02-AX-4821", date: "2026-09-26", time: "14:00 - 17:00", fee: "₹90", status: "Active" },
  { id: "RES-8802", user: "Rahul Sharma", area: "Airport Terminal 1", slot: "B-08", vehicle: "OR-02-EV-9012", date: "2026-09-26", time: "16:00 - 20:00", fee: "₹200", status: "Upcoming" },
  { id: "RES-8803", user: "Priya Patel", area: "Metro Station North", slot: "C-04", vehicle: "OR-05-BC-1123", date: "2026-09-26", time: "10:00 - 12:00", fee: "₹50", status: "Completed" },
  { id: "RES-8804", user: "Amit Verma", area: "Central Market Hub", slot: "A-01", vehicle: "OR-02-BK-7744", date: "2026-09-25", time: "11:00 - 13:00", fee: "₹60", status: "Cancelled" },
  { id: "RES-8805", user: "Sneha Reddy", area: "Tech Park Block B", slot: "D-19", vehicle: "OR-01-EV-3344", date: "2026-09-26", time: "13:00 - 18:00", fee: "₹200", status: "Active" },
];

const ReservationsView = () => {
  const [list, setList] = useState(initialReservations);
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  const updateStatus = (id, newStatus) => {
    setList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    toast.success(`Reservation ${id} updated to ${newStatus}`);
  };

  const filtered = list.filter((r) => {
    const matchTab = tab === "All" || r.status === tab;
    const matchSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.area.toLowerCase().includes(search.toLowerCase()) ||
      r.slot.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Tab Filter Header */}
      <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CalendarCheck size={22} className="text-emerald-400" />
              Reservation Control Hub
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Filter reservations by status, manage live bookings, and review details.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search booking ID or user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
          {["All", "Upcoming", "Active", "Completed", "Cancelled"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                tab === t
                  ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-md"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Booking ID</th>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Location & Slot</th>
                <th className="py-3.5 px-4">Vehicle Plate</th>
                <th className="py-3.5 px-4">Time Slot</th>
                <th className="py-3.5 px-4">Fee</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-medium text-slate-200">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-mono font-bold text-emerald-400">{r.id}</td>
                  <td className="py-4 px-4 font-bold text-white">{r.user}</td>
                  <td className="py-4 px-4 text-xs text-slate-300">
                    <p className="font-bold text-white">{r.area}</p>
                    <p className="text-amber-400 font-mono font-bold">Slot: {r.slot}</p>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-slate-300">{r.vehicle}</td>
                  <td className="py-4 px-4 text-xs text-slate-400">
                    <p>{r.date}</p>
                    <p className="text-white font-bold">{r.time}</p>
                  </td>
                  <td className="py-4 px-4 font-bold text-emerald-400">{r.fee}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                        r.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : r.status === "Upcoming"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          : r.status === "Completed"
                          ? "bg-slate-800 text-slate-400 border-white/10"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    {r.status === "Active" && (
                      <button
                        onClick={() => updateStatus(r.id, "Completed")}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold"
                      >
                        End Session
                      </button>
                    )}
                    {r.status === "Upcoming" && (
                      <button
                        onClick={() => updateStatus(r.id, "Cancelled")}
                        className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => toast.success(`Reservation Ticket: ${r.id}`)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-bold"
                    >
                      View Ticket
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

export default ReservationsView;
