import React, { useState, useEffect } from 'react';
import { parkingService } from '../../services/parkingService';
import { useNavigate } from 'react-router-dom';
import { ClockAlert, Phone, AlertTriangle, ArrowRight, ShieldAlert, RefreshCw } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDateTime } from '../../utils/formatDate';

export const OverstayVehicles = () => {
  const [overstayList, setOverstayList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOverstay = async () => {
    setLoading(true);
    try {
      const res = await parkingService.getOverstayVehicles();
      if (res.success) setOverstayList(res.overstayVehicles);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverstay();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-rose-500/40 bg-rose-950/20">
        <div>
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full">
            Time Breach Violation Monitor
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2 flex items-center gap-2">
            <ClockAlert className="w-6 h-6 text-rose-400 animate-bounce" /> Overstay Management Console
          </h1>
          <p className="text-xs text-rose-300/80 mt-1">
            Vehicles that have exceeded their pre-booked time allocation window.
          </p>
        </div>

        <button
          onClick={fetchOverstay}
          className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition"
        >
          <RefreshCw className={`w-4 h-4 text-rose-400 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Overstay List</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {overstayList.map((item) => (
          <div
            key={item.sessionId}
            className="glass-card p-6 rounded-3xl border border-rose-500/40 bg-rose-950/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-extrabold text-white font-mono">{item.vehicleNumber}</h3>
                  <span className="bg-rose-500 text-white font-black text-[9px] px-2 py-0.5 rounded uppercase font-mono animate-pulse">
                    +{item.overstayMinutes} MINS OVERSTAY
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Owner: <span className="font-bold text-white">{item.ownerName}</span> ({item.ownerPhone})
                </p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Slot: <span className="text-emerald-400 font-bold">{item.slotNumber}</span> • Scheduled End: {formatDateTime(item.bookedUntil)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="text-right pr-4 border-r border-slate-800 hidden sm:block">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Penalty Fine Surcharge</span>
                <p className="text-xl font-extrabold text-rose-400 font-mono">{formatCurrency(item.penaltyAmount)}</p>
              </div>

              <a
                href={`tel:${item.ownerPhone}`}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call Driver</span>
              </a>

              <button
                onClick={() => navigate('/exit/scan', { state: { query: item.vehicleNumber } })}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-rose-950/40 flex items-center space-x-1.5 transition"
              >
                <span>Process Force Exit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
