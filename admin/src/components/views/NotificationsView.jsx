import { useState } from "react";
import { Bell, AlertTriangle, CheckCircle, Info, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const initialFeed = [
  { id: 1, type: "alert", title: "Occupancy Surge", desc: "City Mall Complex crossed 90% occupancy threshold", time: "2 minutes ago", read: false },
  { id: 2, type: "success", title: "Payment Successful", desc: "₹450 received from Suman Kumar for Booking #RES-8801", time: "10 minutes ago", read: false },
  { id: 3, type: "info", title: "New Vehicle Registered", desc: "Honda City (OR-02-AX-4821) registered by user Rahul Sharma", time: "25 minutes ago", read: true },
  { id: 4, type: "alert", title: "Gate Sensor Alert", desc: "Barrier Gate 3 at Airport Terminal 1 experienced minor latency", time: "1 hour ago", read: true },
];

const NotificationsView = () => {
  const [feed, setFeed] = useState(initialFeed);

  const markAllRead = () => {
    setFeed(feed.map((f) => ({ ...f, read: true })));
    toast.success("All notifications marked as read!");
  };

  return (
    <div className="space-y-8">
      <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Bell size={22} className="text-emerald-400" />
            System Notifications & Log Alerts
          </h3>
          <p className="text-xs text-slate-400 mt-1">Real-time alerts for reservations, payments, and gate sensors.</p>
        </div>

        <button
          onClick={markAllRead}
          className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/20 transition"
        >
          Mark All Read
        </button>
      </div>

      <div className="space-y-4">
        {feed.map((n) => (
          <div
            key={n.id}
            className={`p-5 rounded-2xl border flex items-start gap-4 transition ${
              n.read ? "bg-[#0D1B2A]/60 border-white/5" : "bg-[#0D1B2A] border-emerald-500/30 ring-1 ring-emerald-500/20"
            }`}
          >
            {n.type === "alert" ? (
              <AlertTriangle className="text-amber-400 shrink-0 mt-1" size={22} />
            ) : n.type === "success" ? (
              <CheckCircle className="text-emerald-400 shrink-0 mt-1" size={22} />
            ) : (
              <Info className="text-blue-400 shrink-0 mt-1" size={22} />
            )}

            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-white">{n.title}</h4>
                <span className="text-[11px] text-slate-400 font-medium">{n.time}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsView;
