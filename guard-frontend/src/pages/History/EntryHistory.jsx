import React, { useState } from 'react';
import { History, QrCode, Search, Download, Calendar } from 'lucide-react';
import { formatDateTime } from '../../utils/formatDate';

const MOCK_ENTRY_LOGS = [
  { id: 'LOG-101', vehicleNumber: 'MH 12 AB 4321', time: new Date(Date.now() - 30 * 60000).toISOString(), slot: 'A-12', gate: 'Gate 1', type: 'QR Scan' },
  { id: 'LOG-102', vehicleNumber: 'DL 01 X 8877', time: new Date(Date.now() - 90 * 60000).toISOString(), slot: 'B-04', gate: 'Gate 1', type: 'QR Scan' },
  { id: 'LOG-103', vehicleNumber: 'KA 05 M 5678', time: new Date(Date.now() - 150 * 60000).toISOString(), slot: 'C-08', gate: 'Gate 2', type: 'Manual' },
  { id: 'LOG-104', vehicleNumber: 'MH 04 EV 8899', time: new Date(Date.now() - 210 * 60000).toISOString(), slot: 'B-01', gate: 'Gate 1', type: 'QR Scan' }
];

export const EntryHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = MOCK_ENTRY_LOGS.filter(
    (l) => l.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) || l.slot.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            Gate Audit Log
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2 flex items-center gap-2">
            <History className="w-6 h-6 text-emerald-400" /> Vehicle Entry History
          </h1>
          <p className="text-xs text-slate-400 mt-1">Chronological record of all vehicle authorizations today.</p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter entry logs..."
              className="pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
            />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px]">
            <tr>
              <th className="p-3.5">Log ID</th>
              <th className="p-3.5">Vehicle Reg</th>
              <th className="p-3.5">Allocated Slot</th>
              <th className="p-3.5">Entry Time</th>
              <th className="p-3.5">Auth Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filtered.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/40 transition">
                <td className="p-3.5 font-bold text-white">{log.id}</td>
                <td className="p-3.5 font-extrabold text-emerald-400">{log.vehicleNumber}</td>
                <td className="p-3.5">{log.slot}</td>
                <td className="p-3.5 text-slate-400">{formatDateTime(log.time)}</td>
                <td className="p-3.5">
                  <span className="bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-[10px] text-slate-300">
                    {log.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
