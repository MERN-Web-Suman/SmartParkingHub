import { useState } from "react";
import {
  BrainCircuit,
  CalendarDays,
  Clock,
  Lightbulb,
  MapPin,
  Sparkles,
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import Button from "../../components/common/Button";
import PredictionChart from "../../components/prediction/PredictionChart";
import PredictionCard from "../../components/prediction/PredictionCard";

const parkingLocations = [
  { id: 1, name: "Smart Parking A (Unit 4)" },
  { id: 2, name: "City Parking Hub (Saheed Nagar)" },
  { id: 3, name: "Central Parking (Master Canteen)" },
  { id: 4, name: "Airport Executive Parking" },
];

const Prediction = () => {
  const [selectedLocation, setSelectedLocation] = useState(parkingLocations[0].name);
  const [selectedDate, setSelectedDate] = useState("2026-09-26");
  const [selectedTime, setSelectedTime] = useState("18:00");
  const [predictionResult, setPredictionResult] = useState({
    occupancy: 86,
    available: 14,
    demand: "HIGH",
  });

  const handlePredict = (e) => {
    e?.preventDefault();

    // Calculate dynamic prediction based on selected time
    const hour = parseInt(selectedTime.split(":")[0]);
    let occupancy = 45;
    let demand = "LOW";

    if (hour >= 17 && hour <= 20) {
      occupancy = 88;
      demand = "HIGH";
    } else if (hour >= 11 && hour <= 16) {
      occupancy = 68;
      demand = "MEDIUM";
    } else if (hour >= 8 && hour <= 10) {
      occupancy = 52;
      demand = "MEDIUM";
    } else {
      occupancy = 25;
      demand = "LOW";
    }

    setPredictionResult({
      occupancy,
      available: Math.round(100 - occupancy),
      demand,
    });
  };

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <div className="pt-20 flex">
        <Sidebar />

        <main className="flex-1 p-6 md:p-10 max-w-7xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold mb-3 shadow-xs">
              <Sparkles size={14} className="text-purple-600" />
              AI PARKING PREDICTION ENGINE
            </div>

            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Predict Parking Availability
            </h1>

            <p className="text-slate-500 text-sm mt-1">
              Forecast peak hours and slot availability using historical machine learning occupancy models.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Controls */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs h-fit">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BrainCircuit className="text-purple-600" size={22} />
                Prediction Model Parameters
              </h2>

              <form onSubmit={handlePredict} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                    Select Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 pl-10 pr-4 outline-none focus:bg-white focus:border-purple-500 text-sm font-semibold cursor-pointer"
                    >
                      {parkingLocations.map((loc) => (
                        <option key={loc.id} value={loc.name}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                    Target Date
                  </label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 pl-10 pr-4 outline-none focus:bg-white focus:border-purple-500 text-sm font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                    Expected Arrival Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 pl-10 pr-4 outline-none focus:bg-white focus:border-purple-500 text-sm font-semibold"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full py-3.5 mt-2 flex items-center justify-center gap-2 text-sm font-bold shadow-md shadow-emerald-500/25">
                  <BrainCircuit size={18} />
                  Run AI Prediction
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500 flex items-start gap-2.5 font-medium leading-relaxed">
                <Lightbulb size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <p>
                  Predictions utilize traffic density, time-of-day trends, and local event schedules for maximum accuracy.
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2 space-y-6">
              {predictionResult && (
                <PredictionCard
                  location={selectedLocation}
                  date={selectedDate}
                  time={selectedTime}
                  occupancy={predictionResult.occupancy}
                  available={predictionResult.available}
                  demand={predictionResult.demand}
                />
              )}

              <PredictionChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Prediction;
