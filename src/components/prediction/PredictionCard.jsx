import { BrainCircuit, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const PredictionCard = ({ location, date, time, occupancy, available, demand }) => {
  const getDemandColor = (level) => {
    switch (level) {
      case "HIGH":
        return "text-rose-700 bg-rose-50 border-rose-200";
      case "MEDIUM":
        return "text-amber-800 bg-amber-50 border-amber-200";
      default:
        return "text-emerald-800 bg-emerald-50 border-emerald-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs"
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center border border-purple-200 shadow-xs">
            <BrainCircuit size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">{location}</h3>
            <p className="text-xs text-slate-500">Prediction for {date} at {time}</p>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDemandColor(demand)}`}>
          {demand} DEMAND
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <p className="text-slate-500 text-xs font-semibold">Predicted Occupancy</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-slate-900">{occupancy}%</span>
            <TrendingUp size={16} className="text-rose-500" />
          </div>
        </div>

        <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-100">
          <p className="text-emerald-700 text-xs font-semibold">Estimated Available Slots</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-emerald-600">{available}</span>
            <span className="text-xs text-emerald-700 font-medium">slots</span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600 font-medium">
        {demand === "HIGH" ? (
          <>
            <AlertTriangle size={15} className="text-amber-500 shrink-0" />
            <span>High congestion expected. We recommend reserving your slot early!</span>
          </>
        ) : (
          <>
            <CheckCircle size={15} className="text-emerald-600 shrink-0" />
            <span>Favorable availability forecast for your selected time.</span>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PredictionCard;
