import { TrendingUp, BarChart2, Clock, Car, ShieldAlert } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const hourlyData = [
  { time: "08:00", occupancy: 35 },
  { time: "10:00", occupancy: 70 },
  { time: "12:00", occupancy: 92 },
  { time: "14:00", occupancy: 98 },
  { time: "16:00", occupancy: 85 },
  { time: "18:00", occupancy: 90 },
  { time: "20:00", occupancy: 60 },
  { time: "22:00", occupancy: 25 },
];

const vehiclePie = [
  { name: "Sedans & Hatchbacks", value: 45, color: "#10B981" },
  { name: "SUVs & Compact", value: 30, color: "#0284C7" },
  { name: "EV Vehicles", value: 15, color: "#06B6D4" },
  { name: "Two Wheelers", value: 10, color: "#A855F7" },
];

const AnalyticsView = () => {
  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <TrendingUp size={22} className="text-emerald-400" />
            Parking System Analytics & Peak Hour Intelligence
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Deep insights into hourly occupancy trends, vehicle distribution, and system performance.
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl">
          Live Analytical Feed
        </span>
      </div>

      {/* Grid of Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Peak Hours Hourly Bar Chart */}
        <div className="lg:col-span-2 bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock size={18} className="text-amber-400" />
                Hourly Peak Occupancy (%)
              </h4>
              <p className="text-xs text-slate-400">Peak hours observed between 12:00 PM and 4:00 PM</p>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
              Peak: 2:00 PM (98%)
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#07111f", borderColor: "#ffffff20", borderRadius: "12px" }}
                  formatter={(val) => [`${val}%`, "Occupancy"]}
                />
                <Bar dataKey="occupancy" radius={[6, 6, 0, 0]}>
                  {hourlyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.occupancy > 90 ? "#F43F5E" : entry.occupancy > 75 ? "#F59E0B" : "#10B981"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vehicle Distribution Pie Chart */}
        <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <Car size={18} className="text-cyan-400" />
              Vehicle Type Distribution
            </h4>
            <p className="text-xs text-slate-400">Percentage share by vehicle class in parking lots</p>
          </div>

          <div className="h-52 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={vehiclePie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {vehiclePie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#07111f", borderRadius: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
            {vehiclePie.map((v) => (
              <div key={v.name} className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: v.color }} />
                  {v.name}
                </span>
                <span className="font-bold text-white">{v.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
