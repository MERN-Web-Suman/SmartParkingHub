import {
  Users,
  Car,
  MapPin,
  Grid,
  CheckCircle2,
  XCircle,
  DollarSign,
  Clock,
  ArrowUpRight,
  TrendingUp,
  MoreVertical,
  Filter
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";

const occupancyData = [
  { day: "Mon", occupancy: 65, revenue: 18500 },
  { day: "Tue", occupancy: 72, revenue: 21000 },
  { day: "Wed", occupancy: 85, revenue: 24500 },
  { day: "Thu", occupancy: 78, revenue: 22800 },
  { day: "Fri", occupancy: 92, revenue: 28900 },
  { day: "Sat", occupancy: 96, revenue: 32000 },
  { day: "Sun", occupancy: 88, revenue: 26400 },
];

const recentReservations = [
  { id: "RES-901", user: "Suman Kumar", area: "City Mall Complex", slot: "A-12", status: "Active", time: "14:30 PM", fee: "₹90" },
  { id: "RES-902", user: "Rahul Sharma", area: "Airport Terminal 1", slot: "B-08", status: "Confirmed", time: "15:00 PM", fee: "₹150" },
  { id: "RES-903", user: "Priya Patel", area: "Metro Station North", slot: "C-04", status: "Completed", time: "11:15 AM", fee: "₹60" },
  { id: "RES-904", user: "Amit Verma", area: "Central Market Hub", slot: "A-01", status: "Cancelled", time: "09:40 AM", fee: "₹0" },
  { id: "RES-905", user: "Sneha Reddy", area: "Tech Park Block B", slot: "D-19", status: "Active", time: "13:10 PM", fee: "₹120" },
];

const OverviewView = () => {
  return (
    <div className="space-y-8">
      {/* 8 Metric Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { title: "Total Users", val: "500", icon: Users, change: "+12% this week", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
          { title: "Total Vehicles", val: "412", icon: Car, change: "+8% new added", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
          { title: "Parking Areas", val: "6", icon: MapPin, change: "All active", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
          { title: "Total Slots", val: "500", icon: Grid, change: "100% mapped", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
          { title: "Available Slots", val: "172", icon: CheckCircle2, change: "34% free now", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
          { title: "Occupied Slots", val: "328", icon: XCircle, change: "66% occupied", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
          { title: "Today's Revenue", val: "₹24,500", icon: DollarSign, change: "+18% vs yesterday", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
          { title: "Active Sessions", val: "42", icon: Clock, change: "Live tracking", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-[#0D1B2A] border border-white/10 rounded-2xl p-5 shadow-xl hover:border-white/20 transition group"
            >
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl border ${card.color}`}>
                  <Icon size={20} />
                </div>
                <span className="text-[10px] text-slate-400 font-semibold bg-white/5 px-2 py-1 rounded-md border border-white/5 flex items-center gap-0.5">
                  <ArrowUpRight size={12} className="text-emerald-400" />
                  {card.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{card.title}</p>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 group-hover:text-emerald-400 transition">
                  {card.val}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Occupancy Trend Line Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp size={20} className="text-emerald-400" />
                Occupancy Overview (%)
              </h3>
              <p className="text-xs text-slate-400">Weekly peak occupancy percentage across all parking hubs</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Average 79%
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={occupancyData}>
                <defs>
                  <linearGradient id="occupancyGradientAdmin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#07111f", borderColor: "#ffffff20", borderRadius: "12px" }}
                  itemStyle={{ color: "#10B981", fontWeight: "bold" }}
                />
                <Area type="monotone" dataKey="occupancy" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#occupancyGradientAdmin)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Breakdown Bar Chart (1 Col) */}
        <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <DollarSign size={20} className="text-emerald-400" />
                Daily Revenue
              </h3>
              <span className="text-xs text-slate-400">This Week</span>
            </div>
            <p className="text-3xl font-black text-emerald-400">₹1,64,100</p>
            <p className="text-xs text-slate-400 mt-1">Total revenue generated from parking sessions & reservations</p>
          </div>

          <div className="h-56 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyData}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#07111f", borderColor: "#ffffff20", borderRadius: "12px" }}
                  formatter={(val) => [`₹${val}`, "Revenue"]}
                />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                  {occupancyData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? "#10B981" : "#0284C7"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Reservations Table */}
      <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Recent Reservations</h3>
            <p className="text-xs text-slate-400">Live feed of latest user parking bookings</p>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-white/5 border border-white/10 px-3 py-2 rounded-xl hover:bg-white/10 transition">
            <Filter size={14} />
            Filter Status
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">User Name</th>
                <th className="py-3 px-4">Parking Area</th>
                <th className="py-3 px-4">Slot</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Fee</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-medium text-slate-200">
              {recentReservations.map((row) => (
                <tr key={row.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{row.id}</td>
                  <td className="py-3.5 px-4 font-bold text-white">{row.user}</td>
                  <td className="py-3.5 px-4 text-slate-300">{row.area}</td>
                  <td className="py-3.5 px-4 font-black text-amber-400">{row.slot}</td>
                  <td className="py-3.5 px-4 text-slate-400">{row.time}</td>
                  <td className="py-3.5 px-4 font-bold text-white">{row.fee}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                        row.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : row.status === "Confirmed"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          : row.status === "Completed"
                          ? "bg-slate-800 text-slate-400 border-white/10"
                          : "bg-red-500/10 text-red-400 border-red-500/30"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverviewView;
