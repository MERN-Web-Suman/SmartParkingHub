import React from 'react';
import { Car, Zap, Bike, Phone, User, Clock, CreditCard, ShieldCheck } from 'lucide-react';
import { formatDateTime } from '../utils/formatDate';

export const VehicleCard = ({ vehicle, onSelectAction }) => {
  const VehicleIcon = vehicle.vehicleType === 'EV Car' ? Zap : vehicle.vehicleType === 'Bike' ? Bike : Car;

  const isOverstay = vehicle.status === 'OVERSTAY';

  return (
    <div className={`glass-card p-5 rounded-2xl border ${isOverstay ? 'border-rose-500/50 bg-rose-950/20' : 'border-slate-800'} transition shadow-xl`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isOverstay ? 'bg-rose-500/20 text-rose-400' : 'bg-cyan-500/10 text-cyan-400'} border border-white/5`}>
            <VehicleIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="text-lg font-extrabold text-white font-mono tracking-wider">{vehicle.vehicleNumber}</h4>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${isOverstay ? 'bg-rose-500 text-white animate-pulse' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                {vehicle.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>{vehicle.ownerName}</span>
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-slate-400">Assigned Slot</span>
          <p className="text-lg font-extrabold text-emerald-400 font-mono">{vehicle.slotNumber}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800/80 text-xs">
        <div>
          <span className="text-slate-500 flex items-center gap-1 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> Entry Time
          </span>
          <p className="text-slate-200 font-mono font-medium mt-0.5">{formatDateTime(vehicle.entryTime)}</p>
        </div>
        <div>
          <span className="text-slate-500 flex items-center gap-1 text-[11px]">
            <CreditCard className="w-3.5 h-3.5 text-slate-400" /> Payment Status
          </span>
          <p className="text-slate-200 font-medium mt-0.5">{vehicle.paymentStatus || 'Prepaid'}</p>
        </div>
      </div>

      {onSelectAction && (
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => onSelectAction(vehicle, 'EXIT')}
            className="flex-1 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold uppercase shadow-lg shadow-emerald-950/40 transition"
          >
            Process Exit
          </button>
          <button
            onClick={() => onSelectAction(vehicle, 'REASSIGN')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
          >
            Reassign Slot
          </button>
        </div>
      )}
    </div>
  );
};
