import React from 'react';
import { History, Calendar, FileSpreadsheet } from 'lucide-react';
import { formatDateTime } from '../../utils/formatDate';

export const ParkingHistory = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">
            Master Session Archive
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2 flex items-center gap-2">
            <History className="w-6 h-6 text-emerald-400" /> Facility Master History
          </h1>
          <p className="text-xs text-slate-400 mt-1">Full entry, exit, duration, and billing archives.</p>
        </div>

        <button
          onClick={() => alert('Exporting CSV log report...')}
          className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Export CSV Log</span>
        </button>
      </div>

      <div className="glass-card p-8 rounded-3xl border border-slate-800 text-center space-y-2 text-slate-400">
        <History className="w-10 h-10 text-emerald-400 mx-auto" />
        <h3 className="text-sm font-bold text-white">Full Historical Archive Active</h3>
        <p className="text-xs max-w-md mx-auto">Showing logs for shift period 26 Sep 2026. All entries synced to backend server database.</p>
      </div>
    </div>
  );
};
