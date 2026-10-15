import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  CarFront,
  Bell,
  Menu,
  UserRound,
  LogOut,
  X,
  LayoutDashboard,
  MapPin,
  TrendingUp,
  Car,
  BookmarkCheck,
  QrCode,
  User,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/");
  };

  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/parking", label: "Find Parking", icon: MapPin },
    { path: "/bookings", label: "Reservations", icon: BookmarkCheck },
    { path: "/prediction", label: "AI Prediction", icon: TrendingUp },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-2xl border-b border-slate-200/90 shadow-[0_8px_30px_-6px_rgba(15,23,42,0.08)]"
          : "bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand: SmartPark */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/25 ring-2 ring-emerald-500/20 group-hover:scale-105 group-hover:shadow-emerald-500/35 transition-all">
              <CarFront className="text-white" size={22} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-slate-900 font-black text-xl tracking-tight leading-tight">
                  Smart<span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">Park</span>
                </h1>
                <span className="hidden xl:inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">
                Smart Parking System
              </p>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/60">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? "bg-white text-emerald-700 shadow-sm shadow-slate-200/80 border border-slate-200/50"
                      : "text-slate-600 hover:text-emerald-600 hover:bg-white/60"
                  }`}
                >
                  <link.icon size={15} className={active ? "text-emerald-600" : "text-slate-400"} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Icons & Profile 👤 */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {user ? (
              <>
                {/* Notification Bell */}
                <Link
                  to="/notifications"
                  className="relative w-10 h-10 rounded-2xl bg-slate-100/80 hover:bg-emerald-50/80 text-slate-600 hover:text-emerald-600 flex items-center justify-center border border-slate-200/80 hover:border-emerald-500/30 transition shadow-xs"
                  title="Notifications"
                >
                  <Bell size={18} />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
                </Link>

                {/* Profile Pill Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 bg-white/90 border border-slate-200/90 rounded-2xl px-3 sm:px-3.5 py-1.5 sm:py-2 hover:border-emerald-500/50 hover:shadow-sm transition cursor-pointer"
                    title="Profile Menu"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-emerald-100 to-teal-100 text-emerald-800 flex items-center justify-center font-black text-xs border border-emerald-200/60">
                      <UserRound size={16} />
                    </div>
                    <span className="hidden sm:block text-xs sm:text-sm font-bold text-slate-800 max-w-[100px] truncate">
                      {user.name?.split(" ")[0] || "User"}
                    </span>
                    <ChevronDown
                      size={15}
                      className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180 text-emerald-600" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {open && (
                    <div className="absolute right-0 top-14 w-60 rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-200 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2.5 border-b border-slate-100 mb-1.5 bg-slate-50/60 rounded-xl">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <p className="text-xs font-black text-slate-900 truncate">
                            {user.name || "User"}
                          </p>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {user.email || ""}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-emerald-50/70 text-slate-700 hover:text-emerald-700 transition text-xs sm:text-sm font-semibold"
                      >
                        <User size={16} className="text-slate-400" />
                        Guard Profile
                      </Link>

                      <Link
                        to="/bookings"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-emerald-50/70 text-slate-700 hover:text-emerald-700 transition text-xs sm:text-sm font-semibold"
                      >
                        <BookmarkCheck size={16} className="text-slate-400" />
                        My Bookings
                      </Link>

                      <Link
                        to="/qr-entry"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-emerald-50/70 text-slate-700 hover:text-emerald-700 transition text-xs sm:text-sm font-semibold"
                      >
                        <QrCode size={16} className="text-slate-400" />
                        QR Entry Pass
                      </Link>

                      <Link
                        to="/vehicles"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-emerald-50/70 text-slate-700 hover:text-emerald-700 transition text-xs sm:text-sm font-semibold"
                      >
                        <Car size={16} className="text-slate-400" />
                        My Vehicles
                      </Link>

                      <div className="my-1 border-t border-slate-100" />

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 flex items-center gap-2.5 transition text-xs sm:text-sm font-bold cursor-pointer"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-2xl font-black text-xs sm:text-sm shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-2xl bg-slate-100/80 hover:bg-slate-200/80 flex items-center justify-center text-slate-700 hover:text-slate-900 border border-slate-200/80 cursor-pointer transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-2xl p-4 space-y-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition ${
              isActive("/dashboard") ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-100/70"
            }`}
          >
            <LayoutDashboard size={18} className="text-emerald-600" />
            Dashboard
          </Link>
          <Link
            to="/parking"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition ${
              isActive("/parking") ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-100/70"
            }`}
          >
            <MapPin size={18} className="text-emerald-600" />
            Find Parking
          </Link>
          <Link
            to="/bookings"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition ${
              isActive("/bookings") ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-100/70"
            }`}
          >
            <BookmarkCheck size={18} className="text-emerald-600" />
            Reservations
          </Link>
          <Link
            to="/prediction"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition ${
              isActive("/prediction") ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-100/70"
            }`}
          >
            <TrendingUp size={18} className="text-emerald-600" />
            AI Prediction
          </Link>
          <Link
            to="/qr-entry"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition ${
              isActive("/qr-entry") ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-100/70"
            }`}
          >
            <QrCode size={18} className="text-emerald-600" />
            QR Entry Pass
          </Link>
          <Link
            to="/vehicles"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition ${
              isActive("/vehicles") ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-100/70"
            }`}
          >
            <Car size={18} className="text-emerald-600" />
            My Vehicles
          </Link>
          <Link
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition ${
              isActive("/profile") ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-100/70"
            }`}
          >
            <User size={18} className="text-emerald-600" />
            Profile
          </Link>

          {user && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-rose-50 text-rose-600 font-bold text-sm transition cursor-pointer pt-2 border-t border-slate-100 mt-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
