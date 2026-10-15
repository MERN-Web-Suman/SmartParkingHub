import { History as HistoryIcon, MapPin, Calendar, Clock, Car, CheckCircle } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

const historyItems = [
  {
    id: "HIS-9011",
    location: "Smart Parking A",
    slot: "Slot A-24",
    date: "25 Sep 2026",
    duration: "2 hours",
    vehicle: "OD02AB1234",
    amount: "₹40",
    status: "Completed",
  },
  {
    id: "HIS-8922",
    location: "City Parking Hub",
    slot: "Slot B-12",
    date: "24 Sep 2026",
    duration: "3 hours",
    vehicle: "OD02CD5678",
    amount: "₹60",
    status: "Completed",
  },
  {
    id: "HIS-7731",
    location: "Central Parking",
    slot: "Slot C-05",
    date: "20 Sep 2026",
    duration: "2 hours",
    vehicle: "OD02XY9999",
    amount: "₹40",
    status: "Completed",
  },
  {
    id: "HIS-6610",
    location: "Esplanade Mall Parking",
    slot: "Slot D-08",
    date: "15 Sep 2026",
    duration: "4 hours",
    vehicle: "OD02AB1234",
    amount: "₹80",
    status: "Completed",
  },
];

const History = () => {
  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <div className="pt-20 flex">
        <Sidebar />

        <main className="flex-1 p-6 md:p-10 max-w-7xl">
          <div className="mb-8">
            <p className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
              PARKING HISTORY
            </p>
            <h1 className="text-4xl font-black text-slate-900 mt-2 tracking-tight">
              Parking Activity Logs
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Comprehensive log of your past parking sessions and completed digital payments.
            </p>
          </div>

          <div className="space-y-4">
            {historyItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-emerald-300 hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-100 to-teal-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0 shadow-xs">
                    <HistoryIcon size={22} />
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-slate-900">{item.location}</h3>
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.slot}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 mt-2">
                      <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        <Calendar size={13} className="text-emerald-600" /> {item.date}
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        <Clock size={13} className="text-emerald-600" /> {item.duration}
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        <Car size={13} className="text-emerald-600" /> {item.vehicle}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                  <span className="text-2xl font-black text-emerald-600">{item.amount}</span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-1">
                    <CheckCircle size={14} className="text-emerald-600" /> Paid & Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default History;
