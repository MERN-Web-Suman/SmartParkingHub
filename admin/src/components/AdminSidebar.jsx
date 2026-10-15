import {
  LayoutDashboard,
  MapPin,
  Users,
  Car,
  CalendarCheck,
  Clock,
  CreditCard,
  TrendingUp,
  Sparkles,
  Bell,
  Megaphone,
  Activity,
  FileText,
  Settings,
  LogOut,
  CarFront,
  ShieldCheck,
  ExternalLink
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
  { id: "parking", label: "Parking Management", icon: MapPin, badge: "6 Areas" },
  { id: "users", label: "User Management", icon: Users, badge: "500" },
  { id: "vehicles", label: "Vehicle Management", icon: Car, badge: null },
  { id: "reservations", label: "Reservations", icon: CalendarCheck, badge: "32 New" },
  { id: "sessions", label: "Parking Sessions", icon: Clock, badge: "Live" },
  { id: "payments", label: "Payments", icon: CreditCard, badge: null },
  { id: "analytics", label: "Analytics", icon: TrendingUp, badge: null },
  { id: "predictions", label: "AI Predictions", icon: Sparkles, badge: "ML 98%" },
  { id: "notifications", label: "Notifications", icon: Bell, badge: "5" },
  { id: "announcements", label: "Announcements", icon: Megaphone, badge: null },
  { id: "live", label: "Live Monitoring", icon: Activity, badge: "Realtime" },
  { id: "reports", label: "Reports", icon: FileText, badge: null },
  { id: "settings", label: "Settings", icon: Settings, badge: null },
];

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-72 bg-[#0D1B2A] border-r border-white/10 hidden lg:flex flex-col justify-between p-5 sticky top-0 h-screen overflow-y-auto shrink-0 select-none">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 pt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <CarFront className="text-slate-950" size={22} />
            </div>
            <div>
              <h1 className="text-white font-extrabold text-lg leading-tight flex items-center gap-1.5">
                Park<span className="text-emerald-400">Smart</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-black tracking-widest uppercase">
                  Admin
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 tracking-wider">MANAGEMENT CONSOLE</p>
            </div>
          </div>
        </div>

        {/* Admin User Card */}
        <div className="flex items-center gap-3 px-3 py-2.5 bg-gradient-to-r from-white/5 to-white/[0.02] rounded-2xl border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <ShieldCheck size={20} />
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-bold text-white truncate">Administrator</p>
            <p className="text-xs text-slate-400 truncate">admin@parksmart.com</p>
          </div>
        </div>

        {/* Navigation List */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Main Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition text-sm font-medium ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon size={18} className={isActive ? "text-slate-950" : "text-slate-400"} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition shrink-0 ${
                      isActive
                        ? "bg-slate-950/20 text-slate-950"
                        : item.badge === "Live" || item.badge === "Realtime"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse"
                        : "bg-slate-800 text-slate-300 border border-white/10"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer / Switch to User view */}
      <div className="pt-4 border-t border-white/10 space-y-2">
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition text-xs font-semibold"
        >
          <span>Open User App (5173)</span>
          <ExternalLink size={15} />
        </a>
      </div>
    </aside>
  );
};

export default AdminSidebar;
