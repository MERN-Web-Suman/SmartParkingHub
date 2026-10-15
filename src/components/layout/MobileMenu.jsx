import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  TrendingUp,
  Car,
  BookmarkCheck,
  X,
} from "lucide-react";

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/parking", label: "Find Parking", icon: MapPin },
    { to: "/prediction", label: "AI Prediction", icon: TrendingUp },
    { to: "/vehicles", label: "My Vehicles", icon: Car },
    { to: "/bookings", label: "My Bookings", icon: BookmarkCheck },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm lg:hidden flex justify-end">
      <div className="w-4/5 max-w-sm bg-white h-full border-l border-slate-200 p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
            <h2 className="text-xl font-bold text-slate-900">Navigation</h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer">
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-semibold ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                <link.icon size={18} />
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
