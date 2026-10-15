import React, { useState, useEffect } from 'react';
import { emergencyService } from '../../services/emergencyService';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Plus, CheckCircle, AlertTriangle, Phone, Flame, Wrench, Siren } from 'lucide-react';
import { formatDateTime } from '../../utils/formatDate';
import { ConfirmModal } from '../../components/ConfirmModal';

export const Emergency = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResolveId, setSelectedResolveId] = useState(null);
  const navigate = useNavigate();

  const fetchEmergencies = async () => {
    setLoading(true);
    try {
      const res = await emergencyService.getEmergencies();
      if (res.success) setEmergencies(res.emergencies);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergencies();
  }, []);

  const handleConfirmResolve = async () => {
    if (!selectedResolveId) return;
    await emergencyService.resolveEmergency(selectedResolveId);
    setSelectedResolveId(null);
    fetchEmergencies();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-rose-500/50 bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-950">
        <div>
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full">
            Security Control & Safety Protocol
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2 flex items-center gap-2">
            <Siren className="w-7 h-7 text-rose-500 animate-pulse" /> Emergency SOS Dispatch
          </h1>
          <p className="text-xs text-rose-200/80 mt-1">
            Broadcast emergency alerts directly to Facility Command Center and Security Officers.
          </p>
        </div>

        <button
          onClick={() => navigate('/emergency/create')}
          className="flex items-center space-x-2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-xs uppercase px-5 py-3 rounded-2xl shadow-xl shadow-rose-950/50 border border-rose-400/40 transition transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Trigger SOS Emergency Alert</span>
        </button>
      </div>

      {/* Emergency List */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Active Security Alerts & Incidents
        </h3>

        {emergencies.map((emg) => (
          <div
            key={emg.id}
            className={`glass-card p-6 rounded-3xl border ${
              emg.status === 'ACTIVE'
                ? 'border-rose-500/60 bg-rose-950/30 shadow-2xl shadow-rose-950/20'
                : 'border-slate-800 bg-slate-900/40 opacity-75'
            } flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  emg.status === 'ACTIVE' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <ShieldAlert className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-lg font-extrabold text-white">{emg.type}</h4>
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded font-mono ${
                      emg.status === 'ACTIVE'
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {emg.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Location: <span className="font-bold text-amber-400">{emg.location}</span> • Reported By: {emg.reportedBy}
                </p>
                <p className="text-xs text-slate-400 italic">"{emg.notes}"</p>
                <p className="text-[10px] text-slate-500 font-mono">Timestamp: {formatDateTime(emg.timestamp)}</p>
              </div>
            </div>

            {emg.status === 'ACTIVE' && (
              <button
                onClick={() => setSelectedResolveId(emg.id)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase rounded-xl transition shadow-lg shrink-0"
              >
                Mark Resolved
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={!!selectedResolveId}
        title="Resolve Emergency Alert"
        message="Are you sure the incident has been cleared and security restored?"
        confirmText="Confirm Incident Clearance"
        type="warning"
        onConfirm={handleConfirmResolve}
        onClose={() => setSelectedResolveId(null)}
      />
    </div>
  );
};
