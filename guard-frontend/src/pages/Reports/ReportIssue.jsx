import React, { useState } from 'react';
import { Wrench, CheckCircle, AlertTriangle } from 'lucide-react';

export const ReportIssue = () => {
  const [category, setCategory] = useState('Damaged Parking Sensor');
  const [slotOrGate, setSlotOrGate] = useState('Slot C-05');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-2">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          Hardware & Maintenance Ticketing
        </span>
        <h1 className="text-2xl font-extrabold text-white mt-2 flex items-center gap-2">
          <Wrench className="w-6 h-6 text-amber-400" /> Maintenance & Issue Report
        </h1>
        <p className="text-xs text-slate-400">Report broken hardware, camera fault, or vehicle damage to engineering team.</p>
      </div>

      {submitted ? (
        <div className="glass-card p-8 rounded-3xl border border-emerald-500/40 text-center space-y-3">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
          <h2 className="text-xl font-extrabold text-white">Maintenance Ticket Submitted</h2>
          <p className="text-xs text-slate-300">Ticket #MNT-9081 logged. Maintenance team dispatched.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
          >
            Report Another Issue
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Issue Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
            >
              <option value="Damaged Parking Sensor">Damaged Parking Slot Sensor</option>
              <option value="QR Scanner Camera Glitch">QR Scanner Camera Glitch</option>
              <option value="Barrier Gate Mechanical Fault">Barrier Gate Mechanical Fault</option>
              <option value="Vehicle Scratch / Damage Incident">Vehicle Scratch / Damage Incident</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Location / Slot ID *</label>
            <input
              type="text"
              value={slotOrGate}
              onChange={(e) => setSlotOrGate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Detailed Description *</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what happened or nature of malfunction..."
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition"
          >
            Submit Maintenance Ticket
          </button>
        </form>
      )}
    </div>
  );
};
