import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PredictionChart = ({ data }) => {
  const chartData = data || [
    { time: "08:00 AM", occupancy: 25 },
    { time: "10:00 AM", occupancy: 42 },
    { time: "12:00 PM", occupancy: 65 },
    { time: "02:00 PM", occupancy: 58 },
    { time: "04:00 PM", occupancy: 78 },
    { time: "06:00 PM", occupancy: 88 },
    { time: "08:00 PM", occupancy: 70 },
    { time: "10:00 PM", occupancy: 35 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xl">
          <p className="text-xs font-semibold text-slate-500">{label}</p>
          <p className="text-sm font-bold text-emerald-600 mt-1">
            Occupancy: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Occupancy Forecast</h3>
          <p className="text-xs text-slate-500 mt-1">
            Predicted occupancy percentage throughout the day
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          AI ML Forecast Model
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="occupancy"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#occupancyGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PredictionChart;
