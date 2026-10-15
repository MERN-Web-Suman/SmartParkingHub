import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Printer, ArrowRight, ParkingSquare, LogOut as ExitIcon } from 'lucide-react';
import { formatDateTime } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';

export const ExitSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const res = location.state?.res || { exitId: 'EXT-99081', exitTime: new Date().toISOString() };
  const session = location.state?.session || { vehicleNumber: 'MH 02 CK 9988', slotNumber: 'B-02' };
  const bill = location.state?.bill || { totalAmount: 248 };
  const paymentMode = location.state?.paymentMode || 'Cash';

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Top Banner */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
          <CheckCircle className="w-10 h-10 animate-bounce" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">Exit Completed & Barrier Raised!</h1>
        <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
          Slot {session.slotNumber} Freed & Marked Available
        </p>
      </div>

      {/* Tax Invoice Receipt */}
      <div className="glass-card p-6 rounded-3xl border border-slate-700 space-y-5 bg-slate-900/90 relative overflow-hidden shadow-2xl">
        <div className="border-b border-dashed border-slate-700 pb-4 text-center space-y-1">
          <div className="flex items-center justify-center space-x-2 text-cyan-400 font-bold">
            <ParkingSquare className="w-5 h-5" />
            <span className="text-sm tracking-wider">PARKSMART OFFICIAL RECEIPT</span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">Exit Ticket #{res.exitId}</p>
        </div>

        <div className="text-center py-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
          <span className="text-[10px] font-bold text-slate-400 uppercase">AMOUNT PAID</span>
          <h2 className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight mt-0.5">
            {formatCurrency(bill.totalAmount)}
          </h2>
          <span className="text-[10px] font-extrabold text-cyan-400 bg-slate-950 px-2.5 py-0.5 rounded-full inline-block mt-1 font-mono">
            {paymentMode} Payment Confirmed
          </span>
        </div>

        <div className="space-y-3 text-xs divide-y divide-slate-800">
          <div className="pt-2 flex justify-between">
            <span className="text-slate-400">Vehicle Number</span>
            <span className="font-extrabold text-white font-mono">{session.vehicleNumber}</span>
          </div>
          <div className="pt-2 flex justify-between">
            <span className="text-slate-400">Exit Timestamp</span>
            <span className="font-mono text-slate-200">{formatDateTime(res.exitTime)}</span>
          </div>
          <div className="pt-2 flex justify-between">
            <span className="text-slate-400">Gate & Guard</span>
            <span className="font-mono text-slate-200">Gate North • Officer Rajesh</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => window.print()}
          className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-700 flex items-center justify-center space-x-2 transition"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipt</span>
        </button>
        <button
          onClick={() => navigate('/exit/scan')}
          className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition"
        >
          <span>Next Exit Vehicle</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
