import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Printer, ArrowRight, ParkingSquare, QrCode, ShieldCheck } from 'lucide-react';
import { formatDateTime } from '../../utils/formatDate';

export const EntrySuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pass = location.state?.pass || {
    ticketId: 'TCK-409112',
    entryTime: new Date().toISOString(),
    vehicleNumber: 'MH 12 AB 4321',
    slotNumber: 'A-12',
    gate: 'GATE-NORTH-01'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Top Banner */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
          <CheckCircle className="w-10 h-10 animate-bounce" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">Entry Authorized!</h1>
        <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
          Barrier Gate Opened • Security Clear
        </p>
      </div>

      {/* Printable Digital Gate Pass Receipt */}
      <div className="glass-card p-6 rounded-3xl border border-slate-700 space-y-5 bg-slate-900/90 relative overflow-hidden shadow-2xl">
        <div className="border-b border-dashed border-slate-700 pb-4 text-center space-y-1">
          <div className="flex items-center justify-center space-x-2 text-emerald-400 font-bold">
            <ParkingSquare className="w-5 h-5" />
            <span className="text-sm tracking-wider">PARKSMART DIGITAL ENTRY PASS</span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">Pass Ticket #{pass.ticketId}</p>
        </div>

        <div className="text-center py-2 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
          <span className="text-[10px] font-bold text-slate-400 uppercase">PARKING SLOT ASSIGNED</span>
          <h2 className="text-4xl font-extrabold text-emerald-400 font-mono tracking-tight mt-0.5">
            {pass.slotNumber}
          </h2>
        </div>

        <div className="space-y-3 text-xs divide-y divide-slate-800">
          <div className="pt-2 flex justify-between">
            <span className="text-slate-400">Vehicle Number</span>
            <span className="font-extrabold text-white font-mono">{pass.vehicleNumber}</span>
          </div>
          <div className="pt-2 flex justify-between">
            <span className="text-slate-400">Entry Timestamp</span>
            <span className="font-mono text-slate-200">{formatDateTime(pass.entryTime)}</span>
          </div>
          <div className="pt-2 flex justify-between">
            <span className="text-slate-400">Authorized Gate</span>
            <span className="font-mono text-slate-200">{pass.gate}</span>
          </div>
        </div>

        {/* Fake Barcode / QR */}
        <div className="pt-4 border-t border-slate-800 text-center">
          <div className="bg-white p-2.5 rounded-xl w-32 h-32 mx-auto flex items-center justify-center shadow-md">
            <QrCode className="w-full h-full text-slate-950" />
          </div>
          <p className="text-[10px] text-slate-500 font-mono mt-2">Scan at Exit Gate for Billing</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={handlePrint}
          className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-700 flex items-center justify-center space-x-2 transition"
        >
          <Printer className="w-4 h-4" />
          <span>Print Gate Slip</span>
        </button>
        <button
          onClick={() => navigate('/entry/scan')}
          className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition"
        >
          <span>Scan Next Vehicle</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
