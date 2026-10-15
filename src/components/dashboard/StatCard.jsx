import { motion } from "framer-motion";

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass = "text-emerald-600 bg-emerald-50 border-emerald-100",
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
            {title}
          </p>

          <h3 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            {value}
          </h3>

          {subtitle && (
            <p className="text-xs text-slate-500 mt-1.5 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-xs ${iconClass}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
