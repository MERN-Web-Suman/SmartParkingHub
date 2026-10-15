import React, { useState } from 'react';
import { emergencyService } from '../../services/emergencyService';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Siren, CheckCircle, ArrowLeft } from 'lucide-react';

export const CreateEmergency = () => {
  const [type, setType] = useState('Barrier Gate Malfunction');
  const [severity, setSeverity] = useState('HIGH');
  const [location, setLocation] = useState('North Entry Gate 1');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emergencyService.triggerEmergency({
        type,
        severity,
        location,
        description
      });
      navigate('/emergency');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => navigate('/emergency')}
        className="flex items-center space-x-2 text-slate-400 hover:text-white text-xs font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Emergency Dispatch</span>
      </button>

      <div className="glass-card p-6 rounded-3xl border border-rose-500/50 bg-rose-950/20 text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border-2 border-rose-500 text-rose-400 flex items-center justify-center mx-auto shadow-xl shadow-rose-950/40">
          <Siren className="w-8 h-8 animate-pulse" />
        </div>
        <h1 className="text-xl font-extrabold text-white">Broadcast Emergency SOS Alert</h1>
        <p className="text-xs text-rose-300">
          This will trigger immediate sirens, command center notifications, and gate lockdown alerts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Emergency Incident Type *
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
          >
            <option value="Barrier Gate Malfunction">Barrier Gate Malfunction / Jammed</option>
            <option value="Fire Hazard Alert">Fire / Smoke Hazard Alert</option>
            <option value="Medical Emergency">Driver Medical Emergency</option>
            <option value="Unauthorized / Suspicious Vehicle">Unauthorized / Suspicious Vehicle</option>
            <option value="Security Altercation">Security Altercation / Vehicle Damage</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Severity Level</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-rose-400 font-bold focus:outline-none"
            >
              <option value="CRITICAL">CRITICAL RED (Lockdown)</option>
              <option value="HIGH">HIGH SEVERITY</option>
              <option value="MEDIUM">MEDIUM SEVERITY</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Gate / Area Zone</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Incident Notes / Observations</label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide brief situational context for security team..."
            className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-rose-950/50 flex items-center justify-center space-x-2 transition"
        >
          <ShieldAlert className="w-5 h-5" />
          <span>{loading ? 'Dispatching Broadcast...' : 'Broadcast Immediate SOS Alert'}</span>
        </button>
      </form>
    </div>
  );
};
