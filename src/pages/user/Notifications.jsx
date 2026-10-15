import { Bell, Sparkles, CheckCircle2, Clock } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

const notifications = [
  {
    id: 1,
    title: "Upcoming Reservation Reminder",
    message: "Your reservation for Smart Parking A (Slot A-24) starts at 06:00 PM today.",
    time: "10 mins ago",
    type: "alert",
  },
  {
    id: 2,
    title: "AI Occupancy Alert",
    message: "High demand predicted at Smart Parking A (86% occupancy) between 05:30 PM - 07:00 PM.",
    time: "1 hour ago",
    type: "ai",
  },
  {
    id: 3,
    title: "Payment Receipt",
    message: "₹40.00 debited from ParkSmart Wallet for booking BK-88219.",
    time: "2 hours ago",
    type: "success",
  },
];

const Notifications = () => {
  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <div className="pt-20 flex">
        <Sidebar />

        <main className="flex-1 p-6 md:p-10 max-w-7xl">
          <div className="mb-8">
            <p className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
              NOTIFICATION CENTER
            </p>
            <h1 className="text-4xl font-black text-slate-900 mt-2 tracking-tight">
              Alerts & Updates
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Real-time alerts for your parking slots, payment receipts, and AI forecasts.
            </p>
          </div>

          <div className="space-y-4">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex items-start gap-4 hover:border-emerald-300 hover:shadow-md transition"
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border shadow-xs ${
                    n.type === "ai"
                      ? "bg-purple-100 text-purple-700 border-purple-200"
                      : n.type === "alert"
                      ? "bg-amber-100 text-amber-800 border-amber-200"
                      : "bg-emerald-100 text-emerald-700 border-emerald-200"
                  }`}
                >
                  {n.type === "ai" ? (
                    <Sparkles size={20} />
                  ) : n.type === "alert" ? (
                    <Bell size={20} />
                  ) : (
                    <CheckCircle2 size={20} />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900 text-base">{n.title}</h3>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                      <Clock size={12} /> {n.time}
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
