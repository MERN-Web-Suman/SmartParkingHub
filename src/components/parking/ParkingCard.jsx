import { Link } from "react-router-dom";
import {
  MapPin,
  Car,
  Bike,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const ParkingCard = ({ parking }) => {
  const availablePercentage =
    (parking.available / parking.total) * 100;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
    >
      <div className="h-40 bg-gradient-to-br from-emerald-100/80 via-teal-50/60 to-sky-100/80 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-white/90 backdrop-blur-xs border border-emerald-200 shadow-md flex items-center justify-center">
            <Car size={38} className="text-emerald-600" />
          </div>
        </div>

        <div className="absolute top-4 right-4 bg-emerald-600 text-white shadow-sm px-3.5 py-1 rounded-full text-xs font-bold">
          {parking.available} Available
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            {parking.name}
          </h3>

          <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-1.5">
            <MapPin size={15} className="text-slate-400 shrink-0" />
            <span className="truncate">{parking.location}</span>
          </div>

          <div className="flex gap-4 mt-5">
            <div className="flex items-center gap-2 text-slate-700 text-sm font-semibold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
              <Car size={16} className="text-emerald-600" />
              {parking.carSlots} Cars
            </div>

            <div className="flex items-center gap-2 text-slate-700 text-sm font-semibold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
              <Bike size={16} className="text-sky-600" />
              {parking.bikeSlots} Bikes
            </div>
          </div>

          <div className="mt-5">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-500 font-medium">
                Live Capacity
              </span>

              <span className="text-emerald-600 font-bold">
                {Math.round(availablePercentage)}% Free
              </span>
            </div>

            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                style={{
                  width: `${availablePercentage}%`,
                }}
              />
            </div>
          </div>
        </div>

        <Link
          to={`/parking/${parking.id}`}
          className="mt-6 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-500 hover:to-teal-600 text-emerald-800 hover:text-white border border-emerald-200 hover:border-emerald-500 rounded-xl py-3 font-bold transition-all duration-200 shadow-xs"
        >
          View Slots & Reserve
          <ArrowRight size={17} />
        </Link>
      </div>
    </motion.div>
  );
};

export default ParkingCard;
