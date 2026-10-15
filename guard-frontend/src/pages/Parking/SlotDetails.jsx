import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { parkingService } from '../../services/parkingService';
import { Grid, Car, ShieldCheck, Wrench, RefreshCw, ArrowLeft, Clock } from 'lucide-react';

export const SlotDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [slot, setSlot] = useState(location.state?.slot || null);
  const [loading, setLoading] = useState(!slot);

  useEffect(() => {
    if (!slot) {
      parkingService.getSlotDetails(id || 'A-01').then((res) => {
        if (res.success) setSlot(res.slot);
        setLoading(false);
      });
    }
  }, [id, slot]);

  if (loading || !slot) {
    return (
      <div className="text-center p-12 text-slate-400">Loading slot telemetry...</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => navigate('/parking/live')}
        className="flex items-center space-x-2 text-slate-400 hover:text-white text-xs font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Live Parking Grid</span>
      </button>

      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase">
              {slot.level} • {slot.zone}
            </span>
            <h1 className="text-3xl font-extrabold text-white font-mono mt-2">Slot {slot.id}</h1>
          </div>
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
            {slot.status}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Occupant Vehicle</span>
            <p className="text-lg font-extrabold text-white font-mono mt-1">{slot.vehicleNumber || 'No Active Vehicle'}</p>
            <p className="text-slate-400 mt-0.5">{slot.owner || 'N/A'}</p>
          </div>

          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">IoT Sensor Status</span>
            <p className="text-emerald-400 font-bold mt-1">Active Ultrasonic Sensor OK</p>
            <p className="text-slate-500 text-[10px] font-mono mt-0.5">Last Sync: 10 seconds ago</p>
          </div>
        </div>

        {/* Action Button */}
        {slot.status === 'occupied' && (
          <button
            onClick={() => navigate('/parking/reassign', { state: { slot } })}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center space-x-2 transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Initiate Slot Reassignment</span>
          </button>
        )}
      </div>
    </div>
  );
};
