import { Search, MapPin } from "lucide-react";

const ParkingSearchBar = ({ searchTerm, setSearchTerm, vehicleType, setVehicleType, onSearch }) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center">
      <div className="flex-1 relative w-full">
        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by area, landmark or parking name..."
          className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl py-3 pl-11 pr-4 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition text-sm font-medium"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative w-full md:w-48">
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-emerald-500 transition text-sm cursor-pointer font-medium"
          >
            <option value="all">🚗 All Vehicles</option>
            <option value="car">🚘 Cars Only</option>
            <option value="bike">🏍️ Bikes Only</option>
          </select>
        </div>

        <button
          onClick={onSearch}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold transition flex items-center justify-center gap-2 whitespace-nowrap shadow-md shadow-emerald-500/25 cursor-pointer text-sm"
        >
          <MapPin size={18} />
          Find Parking
        </button>
      </div>
    </div>
  );
};

export default ParkingSearchBar;
