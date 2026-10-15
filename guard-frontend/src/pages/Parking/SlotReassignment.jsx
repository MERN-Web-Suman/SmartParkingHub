import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { parkingService } from '../../services/parkingService';
import { RefreshCw, CheckCircle, Car, AlertTriangle, ArrowRight } from 'lucide-react';

export const SlotReassignment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const originalSlot = location.state?.slot || {
    id: 'A-12',
    vehicleNumber: 'MH 12 AB 4321',
    owner: 'Vikramaditya Roy',
    zone: 'Zone A'
  };

  const [newSlot, setNewSlot] = useState('A-15');
  const [reason, setReason] = useState('Original Slot Occupied by Unauthorized Vehicle');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleReassign = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await parkingService.reassignSlot({
        oldSlot: originalSlot.id,
        newSlot: newSlot,
        vehicleNumber: originalSlot.vehicleNumber,
        reason: reason
      });
      if (res.success) {
        setSuccessMsg(res.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
          <RefreshCw className="w-6 h-6 animate-spin" />
        </div>
        <h1 className="text-xl font-extrabold text-white">
          Slot Reassignment Portal
        </h1>
        <p className="text-xs text-slate-400">
          Reassign vehicle from slot <span className="font-mono text-amber-400 font-bold">{originalSlot.id}</span> to an alternative vacant slot.
        </p>
      </div>

      {successMsg ? (
        <div className="glass-card p-8 rounded-3xl border border-emerald-500/40 text-center space-y-4">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
          <h2 className="text-xl font-extrabold text-white">Slot Successfully Reassigned!</h2>
          <p className="text-xs text-emerald-300 font-mono">{successMsg}</p>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
            <p>Vehicle Reg: <span className="font-mono font-bold text-white">{originalSlot.vehicleNumber}</span></p>
            <p>New Slot: <span className="font-mono font-bold text-emerald-400">{newSlot}</span></p>
          </div>
          <button
            onClick={() => navigate('/parking/live')}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition"
          >
            Return to Live Parking Grid
          </button>
        </div>
      ) : (
        <form onSubmit={handleReassign} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-5">
          {/* Current Vehicle */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Target Vehicle</span>
              <p className="text-lg font-extrabold text-white font-mono mt-0.5">{originalSlot.vehicleNumber || 'MH 12 AB 4321'}</p>
              <p className="text-xs text-slate-400">Occupant: {originalSlot.owner || 'Driver'}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-rose-400 uppercase">Current Faulty Slot</span>
              <p className="text-xl font-extrabold text-rose-400 font-mono mt-0.5">{originalSlot.id}</p>
            </div>
          </div>

          {/* New Slot Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select New Alternative Slot *
            </label>
            <select
              value={newSlot}
              onChange={(e) => setNewSlot(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white font-mono font-bold focus:outline-none focus:border-amber-500"
            >
              <option value="A-15">A-15 (Level 1 • Vacant)</option>
              <option value="A-18">A-18 (Level 1 • Vacant)</option>
              <option value="B-03">B-03 (Level 1 EV • Vacant)</option>
              <option value="C-02">C-02 (Level 2 Deck • Vacant)</option>
            </select>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Reassignment Reason *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
            >
              <option value="Original Slot Occupied by Unauthorized Vehicle">Original Slot Occupied by Unauthorized Vehicle</option>
              <option value="IoT Sensor Calibration Fault">IoT Sensor Calibration Fault</option>
              <option value="EV Charger Malfunction at Slot">EV Charger Malfunction at Slot</option>
              <option value="Driver Requested Level Change">Driver Requested Level Change</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-xl flex items-center justify-center space-x-2 transition"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{loading ? 'Reassigning Slot...' : 'Confirm & Authorize Reassignment'}</span>
          </button>
        </form>
      )}
    </div>
  );
};
