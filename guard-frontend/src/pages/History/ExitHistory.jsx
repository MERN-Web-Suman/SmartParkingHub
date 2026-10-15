import React, { useState } from 'react';
import { History, LogOut as ExitIcon, Search } from 'lucide-react';
import { formatDateTime } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';

const MOCK_EXIT_LOGS = [
  { id: 'EXT-99081', vehicleNumber: 'KA 03 MX 9090', time: new Date(Date.now() - 40 * 60000).toISOString(), amount: 80, paymentMode: 'Cash' },
  { id: 'EXT-99082', vehicleNumber: 'MH 02 CK 9988', time: new Date(Date.now() - 110 * 60000).toISOString(), amount: 248, paymentMode: 'UPI / QR' }
];

export const ExitHistory = () => {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-2">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
          Exit Logs
        </span>
        <h1 className="text-2xl font-extrabold text-white mt-2 flex items-center gap-2">
          <ExitIcon className="w-6 h-6 text-cyan-400" /> Vehicle Exit History
        </h1>
        <p className="text-xs text-slate-400">Completed parking sessions released at exit gate today.</p>
      </div>

      <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px]">
            <tr>
              <th className="p-3.5">Exit ID</th>
              <th className="p-3.5">Vehicle Reg</th>
              <th className="p-3.5">Exit Timestamp</th>
              <th className="p-3.5">Amount Billed</th>
              <th className="p-3.5">Payment Mode</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {MOCK_EXIT_LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/40 transition">
                <td className="p-3.5 font-bold text-white">{log.id}</td>
                <td className="p-3.5 font-extrabold text-cyan-400">{log.vehicleNumber}</td>
                <td className="p-3.5 text-slate-400">{formatDateTime(log.time)}</td>
                <td className="p-3.5 font-extrabold text-emerald-400">{formatCurrency(log.amount)}</td>
                <td className="p-3.5">{log.paymentMode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
