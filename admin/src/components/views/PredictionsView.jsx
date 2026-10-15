import { Sparkles, Zap, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mlForecast = [
  { time: "09:00 AM", forecast: 40, actual: 38 },
  { time: "11:00 AM", forecast: 75, actual: 72 },
  { time: "01:00 PM", forecast: 95, actual: 94 },
  { time: "03:00 PM", forecast: 88, actual: 85 },
  { time: "05:00 PM", forecast: 92, actual: 90 },
  { time: "07:00 PM", forecast: 65, actual: 60 },
];

const PredictionsView = () => {
  return (
    <div className="space-y-8">
      {/* ML Forecast Banner */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-blue-500/10 to-purple-500/15 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="text-emerald-400" size={24} />
            <h3 className="text-xl sm:text-2xl font-black text-white">AI Parking Availability & Demand Prediction Engine</h3>
          </div>
          <p className="text-xs text-slate-300">
            Powered by Deep Learning occupancy forecast models trained on 100,000+ historical parking sessions.
          </p>
        </div>

        <span className="text-xs font-black text-slate-950 bg-emerald-400 px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/20">
          Model Accuracy: 98.4%
        </span>
      </div>

      {/* Forecast Chart */}
      <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp size={20} className="text-emerald-400" />
              ML Forecast vs Actual Live Occupancy
            </h4>
            <p className="text-xs text-slate-400">Comparing ML model predicted demand against actual sensor feeds</p>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mlForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" unit="%" />
              <Tooltip contentStyle={{ backgroundColor: "#07111f", borderColor: "#ffffff20", borderRadius: "12px" }} />
              <Area type="monotone" dataKey="forecast" stroke="#10B981" fill="#10B98120" strokeWidth={3} name="AI Forecast %" />
              <Area type="monotone" dataKey="actual" stroke="#3B82F6" fill="#3B82F610" strokeWidth={2} name="Actual Sensors %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Recommendations Cards */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-[#0D1B2A] border border-emerald-500/30 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Optimal Arrival Time</span>
            <Zap size={18} className="text-amber-400" />
          </div>
          <h4 className="text-2xl font-black text-white">2:00 PM – 2:30 PM</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Traffic decongestion predicted near City Mall & Central Market with 45+ free slots available.
          </p>
        </div>

        <div className="bg-[#0D1B2A] border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">High Demand Warning</span>
            <Sparkles size={18} className="text-amber-400" />
          </div>
          <h4 className="text-2xl font-black text-white">5:00 PM – 7:00 PM</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Airport Terminal 1 expected to reach 96% capacity due to evening flight arrivals. Surge pricing recommended.
          </p>
        </div>

        <div className="bg-[#0D1B2A] border border-cyan-500/30 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">EV Charging Forecast</span>
            <CheckCircle2 size={18} className="text-cyan-400" />
          </div>
          <h4 className="text-2xl font-black text-white">8 EV Slots Open</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Fast chargers at Tech Park Block B are expected to remain unreserved for the next 2 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictionsView;
