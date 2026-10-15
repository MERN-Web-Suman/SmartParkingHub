import { useState } from "react";
import {
  CheckCircle,
  Car,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Calculator,
  CalendarCheck,
  Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import StatCard from "../../components/dashboard/StatCard";
import RecentActivity from "../../components/dashboard/RecentActivity";
import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const userName = user?.name?.split(" ")[0] || "Suman";

  // Parking Fee Calculator state
  const [entryTime, setEntryTime] = useState("14:00");
  const [exitTime, setExitTime] = useState("17:00");
  const hourlyRate = 30;

  const calculateHours = () => {
    const [entryH] = entryTime.split(":").map(Number);
    const [exitH] = exitTime.split(":").map(Number);
    let diff = exitH - entryH;
    if (diff <= 0) diff += 24;
    return diff;
  };

  const calculatedHours = calculateHours();
  const estimatedFee = calculatedHours * hourlyRate;

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <div className="pt-20 flex">
        <Sidebar />

        <main className="flex-1 p-6 md:p-10 max-w-7xl">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Welcome back, {userName} 👋
            </h1>

            <p className="text-slate-500 text-sm mt-1">
              Find, reserve, and manage your parking spaces with real-time AI accuracy.
            </p>
          </div>

          {/* Stat Cards Row: Available (124), Occupied (86), Reservations (3) */}
          <div className="grid sm:grid-cols-3 gap-5">
            <StatCard
              title="Available Slots"
              value="124"
              subtitle="Vacant spots in your city"
              icon={CheckCircle}
              iconClass="text-emerald-700 bg-emerald-50 border-emerald-200"
            />

            <StatCard
              title="Occupied Slots"
              value="86"
              subtitle="Vehicles currently parked"
              icon={Car}
              iconClass="text-amber-700 bg-amber-50 border-amber-200"
            />

            <StatCard
              title="My Reservations"
              value="3"
              subtitle="Active & upcoming passes"
              icon={CalendarCheck}
              iconClass="text-sky-700 bg-sky-50 border-sky-200"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {/* 📍 Nearby Parking Card */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="text-emerald-600" size={22} />
                    Nearby Parking
                  </h2>
                  <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Live Sensor Feed
                  </span>
                </div>

                <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">City Center Parking</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Saheed Nagar, Main Market Avenue</p>
                    </div>
                    <span className="text-emerald-700 font-black text-base bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-xl">
                      ₹30 / hour
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-slate-500 text-xs font-semibold">Available Slots</p>
                      <p className="text-3xl font-black text-emerald-600">45 Slots</p>
                    </div>

                    <button
                      onClick={() => navigate("/parking/2")}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold transition shadow-md shadow-emerald-500/25 text-sm flex items-center gap-2 cursor-pointer"
                    >
                      Reserve Now
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 🤖 AI Parking Prediction Card */}
            <div className="bg-gradient-to-br from-emerald-50/80 via-teal-50/50 to-sky-50/70 border border-emerald-200/80 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="text-emerald-600" size={22} />
                    AI Parking Prediction
                  </h2>
                  <span className="text-xs text-purple-800 font-bold bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                    ML Forecast
                  </span>
                </div>

                <div className="space-y-3 bg-white/90 border border-emerald-100 p-5 rounded-2xl shadow-xs">
                  <p className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Zap size={18} className="text-amber-500" />
                    High availability expected at 2:00 PM
                  </p>
                  <p className="text-sm text-emerald-700 font-extrabold">
                    Recommended arrival time: 2:00 PM (45 mins from now)
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    ML models predict traffic decongestion near City Center Parking at 2:00 PM with optimal slot allocation.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-200/60 flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-500">Model Accuracy: 98.4%</span>
                <Link
                  to="/prediction"
                  className="text-emerald-700 hover:text-emerald-900 text-xs font-bold flex items-center gap-1.5"
                >
                  View Full Graph Forecast <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          {/* Parking Fee Estimator Widget */}
          <div className="mt-8 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Calculator className="text-emerald-600" size={20} />
              Instant Parking Fee Estimator
            </h3>

            <div className="grid sm:grid-cols-4 gap-4 items-center">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  Entry Time
                </label>
                <input
                  type="time"
                  value={entryTime}
                  onChange={(e) => setEntryTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 outline-none focus:bg-white focus:border-emerald-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  Expected Exit Time
                </label>
                <input
                  type="time"
                  value={exitTime}
                  onChange={(e) => setExitTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 outline-none focus:bg-white focus:border-emerald-500 text-sm font-semibold"
                />
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
                <span className="text-slate-500 text-xs font-semibold block">Duration</span>
                <span className="text-xl font-black text-slate-900">{calculatedHours} Hours</span>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-center">
                <span className="text-emerald-700 text-xs font-bold block">Estimated Fee</span>
                <span className="text-2xl font-black text-emerald-600">₹{estimatedFee}</span>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="mt-8">
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
