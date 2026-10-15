import { useState, useEffect } from "react";
import { Clock, Play, Square, AlertCircle, ArrowUpRight, DollarSign, Car } from "lucide-react";
import toast from "react-hot-toast";

const initialSessions = [
  { id: "SES-101", user: "Suman Kumar", vehicle: "OR-02-AX-4821", area: "City Mall", slot: "A-12", entryTime: "13:15:00", durationMin: 75, fee: 40, status: "Active" },
  { id: "SES-102", user: "Rahul Sharma", vehicle: "OR-02-EV-9012", area: "Airport T1", slot: "EV-02", entryTime: "12:00:00", durationMin: 150, fee: 125, status: "Active" },
  { id: "SES-103", user: "Sneha Reddy", vehicle: "OR-01-EV-3344", area: "Tech Park", slot: "D-19", entryTime: "11:30:00", durationMin: 180, fee: 120, status: "Active" },
  { id: "SES-104", user: "Priya Patel", vehicle: "OR-05-BC-1123", area: "Metro North", slot: "C-04", entryTime: "10:00:00", durationMin: 270, fee: 110, status: "Active" },
];

const SessionsView = () => {
  const [sessions, setSessions] = useState(initialSessions);
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTicker((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const forceEndSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast.success(`Session ${id} closed. Vehicle exited gate!`);
  };

  return (
    <div className="space-y-8">
      {/* Live Counter Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#0D1B2A] border border-emerald-500/30 p-5 rounded-2xl">
          <div className="flex justify-between items-center">
            <span className="text-xs text-emerald-400 font-bold uppercase">Active Live Sessions</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <h3 className="text-3xl font-black text-white mt-2">{sessions.length} Vehicles</h3>
        </div>
        <div className="bg-[#0D1B2A] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-slate-400 font-semibold uppercase">Avg Duration</p>
          <h3 className="text-3xl font-black text-white mt-2">1.8 Hours</h3>
        </div>
        <div className="bg-[#0D1B2A] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-amber-400 font-semibold uppercase">Accrued Fees</p>
          <h3 className="text-3xl font-black text-amber-400 mt-2">₹395</h3>
        </div>
        <div className="bg-[#0D1B2A] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-purple-400 font-semibold uppercase">Gate Sensors</p>
          <h3 className="text-3xl font-black text-purple-400 mt-2">100% Online</h3>
        </div>
      </div>

      {/* Live Sessions Table */}
      <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex justify-between items-center pb-6 border-b border-white/10">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock size={22} className="text-emerald-400" />
              Real-time Parking Sessions
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Live tracking of vehicles inside parking lots with real-time fee calculation.
            </p>
          </div>

          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Auto Refreshing
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Session ID</th>
                <th className="py-3.5 px-4">Driver</th>
                <th className="py-3.5 px-4">Vehicle Plate</th>
                <th className="py-3.5 px-4">Area & Slot</th>
                <th className="py-3.5 px-4">Entry Time</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Current Fee</th>
                <th className="py-3.5 px-4 text-right">Force Gate Exit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-medium text-slate-200">
              {sessions.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-mono font-bold text-emerald-400">{s.id}</td>
                  <td className="py-4 px-4 font-bold text-white">{s.user}</td>
                  <td className="py-4 px-4 font-mono text-xs font-bold text-slate-300">
                    <span className="bg-slate-900 border border-white/10 px-2.5 py-1 rounded-lg">
                      {s.vehicle}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-300">
                    <p className="font-bold text-white">{s.area}</p>
                    <p className="text-amber-400 font-mono font-bold">{s.slot}</p>
                  </td>
                  <td className="py-4 px-4 text-xs font-mono text-slate-400">{s.entryTime}</td>
                  <td className="py-4 px-4 text-xs font-bold text-white">
                    {Math.floor((s.durationMin + ticker) / 60)}h {(s.durationMin + ticker) % 60}m
                  </td>
                  <td className="py-4 px-4 font-black text-emerald-400 text-base">
                    ₹{s.fee + Math.floor(ticker * 2)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => forceEndSession(s.id)}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1.5 ml-auto"
                    >
                      <Square size={14} />
                      Gate Exit
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

export default SessionsView;
