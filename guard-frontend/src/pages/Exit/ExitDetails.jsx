import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { exitService } from '../../services/exitService';
import { formatDateTime, formatDuration } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';
import { Clock, AlertTriangle, ArrowRight, Car, User, Phone, MapPin } from 'lucide-react';

export const ExitDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const session = location.state?.session || {
    sessionId: 'SES-8801',
    ticketId: 'TCK-409112',
    vehicleNumber: 'MH 02 CK 9988',
    ownerName: 'Sanjay Dutt',
    ownerPhone: '+91 98111 22334',
    vehicleType: 'Car',
    slotNumber: 'B-02',
    entryTime: new Date(Date.now() - 210 * 60000).toISOString(),
    bookedUntil: new Date(Date.now() - 30 * 60000).toISOString(),
    ratePerHour: 40,
    isOverstay: true,
    overstayMinutes: 30
  };

  const bill = exitService.calculateBill(session);

  const handleProceedToPayment = () => {
    navigate('/exit/bill', { state: { session, bill } });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Exit Verification
          </span>
          <h1 className="text-xl font-extrabold text-white mt-2">
            Parking Session Summary
          </h1>
          <p className="text-xs text-slate-400 font-mono">Session ID: {session.sessionId}</p>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-slate-400">Total Billed Amount</span>
          <h2 className="text-3xl font-extrabold text-emerald-400 font-mono mt-0.5">
            {formatCurrency(bill.totalAmount)}
          </h2>
        </div>
      </div>

      {/* Overstay Warning Banner */}
      {session.isOverstay && (
        <div className="bg-rose-950/60 border border-rose-500/50 p-4 rounded-2xl flex items-center space-x-3 text-rose-300">
          <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
          <div className="text-xs">
            <p className="font-extrabold text-white uppercase tracking-wider">
              Overstay Fine Applied (+{session.overstayMinutes} mins)
            </p>
            <p className="text-rose-200 mt-0.5">
              Vehicle exceeded scheduled booking window. Overstay surcharge of ₹{bill.overstayCharge} added.
            </p>
          </div>
        </div>
      )}

      {/* Session Details */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-5">
        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Vehicle Reg No.</span>
            <p className="text-lg font-extrabold text-white font-mono mt-0.5">{session.vehicleNumber}</p>
            <span className="text-xs text-cyan-400 font-medium">{session.vehicleType}</span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Slot Occupied</span>
            <p className="text-lg font-extrabold text-emerald-400 font-mono mt-0.5">{session.slotNumber}</p>
            <span className="text-xs text-slate-400 font-medium">{session.ownerName}</span>
          </div>
        </div>

        {/* Timings */}
        <div className="space-y-3 text-xs divide-y divide-slate-800">
          <div className="pt-2 flex justify-between">
            <span className="text-slate-400 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-cyan-400" /> Entry Time</span>
            <span className="font-mono text-slate-200">{formatDateTime(session.entryTime)}</span>
          </div>
          <div className="pt-2 flex justify-between">
            <span className="text-slate-400 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-emerald-400" /> Current Time</span>
            <span className="font-mono text-slate-200">{formatDateTime(new Date().toISOString())}</span>
          </div>
          <div className="pt-2 flex justify-between font-bold">
            <span className="text-slate-400">Total Duration Billed</span>
            <span className="font-mono text-emerald-400">{formatDuration(bill.durationMinutes)}</span>
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceedToPayment}
          className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-cyan-950/40 flex items-center justify-center space-x-2 transition"
        >
          <span>Collect Payment & Generate Bill</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
