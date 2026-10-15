import { useState } from "react";
import { FileText, Download, Calendar, CheckCircle, FileSpreadsheet } from "lucide-react";
import toast from "react-hot-toast";

const reports = [
  { id: "REP-01", title: "Revenue & Earnings Report", desc: "Detailed breakdown of payments, refunds, and daily surge earnings", format: "CSV / PDF" },
  { id: "REP-02", title: "Occupancy & Peak Hour Analysis", desc: "Hourly slot utilization across all 6 parking locations", format: "CSV / PDF" },
  { id: "REP-03", title: "User Directory & Vehicle Registration", desc: "List of all registered drivers, contact info, and vehicle plates", format: "CSV" },
  { id: "REP-04", title: "Reservation Audit Log", desc: "Historical audit trail of all bookings, cancellations, and gate entry times", format: "PDF" },
];

const ReportsView = () => {
  const [startDate, setStartDate] = useState("2026-09-01");
  const [endDate, setEndDate] = useState("2026-09-26");

  const downloadReport = (title) => {
    toast.success(`Exporting ${title} (${startDate} to ${endDate})`);
  };

  return (
    <div className="space-y-8">
      {/* Date Filter Bar */}
      <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <FileText size={22} className="text-emerald-400" />
            Report Export Center & Data Audits
          </h3>
          <p className="text-xs text-slate-400 mt-1">Select date range and export instant CSV or PDF reports.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white">
            <Calendar size={14} className="text-emerald-400" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent outline-none text-white"
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent outline-none text-white"
            />
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {reports.map((rep) => (
          <div key={rep.id} className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold text-emerald-400">{rep.id}</span>
                <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-slate-300 font-bold">
                  {rep.format}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white mt-2">{rep.title}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{rep.desc}</p>
            </div>

            <div className="pt-4 border-t border-white/10 flex gap-3">
              <button
                onClick={() => downloadReport(`${rep.title} (CSV)`)}
                className="w-1/2 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Download size={14} />
                Export CSV
              </button>
              <button
                onClick={() => downloadReport(`${rep.title} (PDF)`)}
                className="w-1/2 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Download size={14} />
                Export PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsView;
