import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  BookmarkCheck,
  QrCode,
  Car,
  TrendingUp,
  Bell,
  User,
  LogOut,
  CarFront,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/parking", label: "Find Parking", icon: MapPin },
    { to: "/bookings", label: "Reservations", icon: BookmarkCheck },
    { to: "/qr-entry", label: "QR Entry", icon: QrCode },
    { to: "/vehicles", label: "Vehicles", icon: Car },
    { to: "/prediction", label: "Prediction", icon: TrendingUp },
    { to: "/notifications", label: "Notifications", icon: Bell },
    { to: "/profile", label: "Profile", icon: User },
  ];

  return (
    <aside className="w-64 bg-white/85 backdrop-blur-xl border-r border-slate-200/80 hidden lg:flex flex-col justify-between p-5 sticky top-20 self-start h-[calc(100vh-5rem)] overflow-y-auto shadow-xs">
      <div className="space-y-5">
        {/* User Card */}
        <div className="flex items-center gap-3 px-3.5 py-3 bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-sky-50/80 rounded-2xl border border-emerald-100/90 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
            <User size={18} />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-800 truncate">{user?.name || "Suman Kumar"}</p>
            <p className="text-[11px] text-slate-500 truncate">{user?.email || "suman@example.com"}</p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {links.map((link) =>
            link.isExternal ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition text-sm font-semibold text-emerald-700 hover:bg-emerald-50 border border-emerald-200"
              >
                <link.icon size={18} />
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl transition text-sm font-medium ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`
                }
              >
                <link.icon size={18} />
                {link.label}
              </NavLink>
            )
          )}
        </nav>
      </div>

      {/* Logout Action */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition text-sm font-bold w-full cursor-pointer"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
