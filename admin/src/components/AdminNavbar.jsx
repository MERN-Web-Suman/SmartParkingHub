import { useState } from "react";
import {
  Search,
  Bell,
  Plus,
  RefreshCw,
  Menu,
  X,
  Megaphone,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import toast from "react-hot-toast";

const AdminNavbar = ({ activeTabTitle, onQuickAddArea, onQuickAddSlot, onBroadcast, mobileOpen, setMobileOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: "High Occupancy Warning", desc: "City Mall Parking at 94% capacity", time: "5m ago", type: "alert" },
    { id: 2, title: "New Reservation", desc: "User Suman Kumar reserved Slot A-12", time: "12m ago", type: "info" },
    { id: 3, title: "Payment Completed", desc: "₹450 received via UPI (Txn #8841)", time: "25m ago", type: "success" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#07111f]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
      {/* Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-white/10"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white capitalize tracking-tight flex items-center gap-2">
            {activeTabTitle}
          </h2>
          <p className="text-xs text-slate-400 hidden sm:block">
            ParkSmart AI Central Control Center
          </p>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search users, slot IDs, vehicle plates, or bookings..."
            className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Right Quick Actions & Admin Avatar */}
      <div className="flex items-center gap-3">
        <button
          onClick={onQuickAddArea}
          className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition"
        >
          <Plus size={15} />
          Add Area
        </button>

        <button
          onClick={onBroadcast}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-bold transition"
        >
          <Megaphone size={15} className="text-amber-400" />
          Broadcast
        </button>

        <button
          onClick={() => toast.success("System data synced in real-time!")}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition"
          title="Refresh Data"
        >
          <RefreshCw size={18} />
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition"
            title="System Alerts"
          >
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 sm:w-96 rounded-2xl bg-[#0D1B2A] border border-white/10 p-4 shadow-2xl z-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-white text-sm">System Notifications</h4>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  Live Stream
                </span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 bg-white/5 rounded-xl border border-white/5 flex gap-3 items-start">
                    {n.type === "alert" ? (
                      <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                    ) : n.type === "success" ? (
                      <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Bell size={18} className="text-blue-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h5 className="text-xs font-bold text-white">{n.title}</h5>
                      <p className="text-[11px] text-slate-400 mt-0.5">{n.desc}</p>
                      <span className="text-[10px] text-slate-500 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Admin Avatar Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
            AD
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-black text-white leading-none">System Admin</p>
            <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">Superuser</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
