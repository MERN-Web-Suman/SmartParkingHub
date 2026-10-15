import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { entryService } from '../../services/entryService';
import { ShieldCheck, Car, User, Phone, MapPin, Calendar, Clock, RefreshCw, CheckCircle } from 'lucide-react';
import { formatDateTime } from '../../utils/formatDate';

export const EntryDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking || {
    bookingId: 'BK-2026-9901',
    vehicleNumber: 'MH 12 AB 4321',
    ownerName: 'Vikramaditya Roy',
    ownerPhone: '+91 98234 11223',
    vehicleType: 'Car',
    bookedSlot: 'A-12',
    zone: 'Floor 1 - Zone A',
    bookedFrom: new Date().toISOString(),
    bookedUntil: new Date(Date.now() + 180 * 60000).toISOString(),
    paymentStatus: 'Paid Prepaid',
    amount: 120
  };

  const [assignedSlot, setAssignedSlot] = useState(booking.bookedSlot);
  const [isReassigned, setIsReassigned] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirmEntry = async () => {
    setLoading(true);
    try {
      const res = await entryService.confirmEntry({
        bookingId: booking.bookingId,
        vehicleNumber: booking.vehicleNumber,
        assignedSlot: assignedSlot
      });
      navigate('/entry/success', { state: { pass: res, booking } });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Verification Card Header */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
          <ShieldCheck className="w-8 h-8 animate-pulse" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Booking Verified Valid
          </span>
          <h1 className="text-xl font-extrabold text-white mt-2">
            Vehicle Verification & Entry Authorization
          </h1>
          <p className="text-xs text-slate-400 font-mono">Ref ID: {booking.bookingId}</p>
        </div>
      </div>

      {/* Main Details Box */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-5 shadow-2xl">
        {/* Vehicle & Owner Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Vehicle Reg No.</span>
            <p className="text-xl font-extrabold text-white font-mono mt-0.5">{booking.vehicleNumber}</p>
            <span className="text-xs text-cyan-400 font-medium inline-block mt-1">{booking.vehicleType}</span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Vehicle Owner</span>
            <p className="text-sm font-bold text-slate-100 mt-0.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" /> {booking.ownerName}
            </p>
            <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" /> {booking.ownerPhone}
            </p>
          </div>
        </div>

        {/* Slot Assignment Preview & Override */}
        <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Allocated Parking Slot</span>
            <p className="text-2xl font-extrabold text-white font-mono mt-0.5">{assignedSlot}</p>
            <p className="text-xs text-slate-400">{booking.zone}</p>
          </div>

          {/* Quick Override Button */}
          <div className="text-right">
            <button
              onClick={() => {
                const altSlot = assignedSlot === 'A-12' ? 'A-15' : 'A-12';
                setAssignedSlot(altSlot);
                setIsReassigned(true);
              }}
              className="px-3 py-2 bg-slate-900 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 border border-slate-700 hover:border-amber-500/40 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Change Slot</span>
            </button>
            {isReassigned && (
              <span className="text-[10px] text-amber-400 font-bold block mt-1">Slot Reassigned</span>
            )}
          </div>
        </div>

        {/* Duration & Payment */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Booked Schedule</span>
            <p className="text-slate-200 font-mono">{formatDateTime(booking.bookedFrom)}</p>
            <p className="text-slate-400 font-mono">Until {formatDateTime(booking.bookedUntil)}</p>
          </div>

          <div className="space-y-1 text-right">
            <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Payment Status</span>
            <p className="text-emerald-400 font-extrabold uppercase">{booking.paymentStatus}</p>
            <p className="text-slate-300 font-mono">Amount Paid: ₹{booking.amount}</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleConfirmEntry}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-emerald-950/40 flex items-center justify-center space-x-2 transition"
        >
          <CheckCircle className="w-5 h-5" />
          <span>{loading ? 'Authorizing Gate...' : 'Authorize Gate & Print Entry Pass'}</span>
        </button>
      </div>
    </div>
  );
};
