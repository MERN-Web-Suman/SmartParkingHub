import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserCheck, ShieldCheck, MapPin, Clock, Phone, Award, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="glass-card p-6 rounded-3xl border border-slate-800 text-center space-y-4">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-indigo-600 p-1 mx-auto shadow-2xl shadow-emerald-950/40">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt="Guard Avatar"
            className="w-full h-full object-cover rounded-[20px]"
          />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-white">{user?.name || 'Rajesh Sharma'}</h1>
          <p className="text-xs text-emerald-400 font-mono font-bold mt-0.5">{user?.role || 'Senior Security Officer'}</p>
          <span className="inline-block text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full font-mono mt-2">
            Badge #{user?.badgeNumber || 'SEC-88219'}
          </span>
        </div>
      </div>

      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Duty & Shift Telemetry</h3>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] font-bold uppercase flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Gate Location
            </span>
            <p className="text-white font-bold font-mono">GATE-NORTH-01</p>
            <p className="text-slate-400">Tech Park Main Terminal</p>
          </div>

          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] font-bold uppercase flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> Active Shift
            </span>
            <p className="text-white font-bold font-mono">Day Shift A</p>
            <p className="text-slate-400">08:00 AM - 04:00 PM</p>
          </div>
        </div>

        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 font-bold uppercase text-[10px]">Today Security Audits</span>
            <p className="text-emerald-400 font-extrabold text-lg font-mono">142 Vehicles Cleared</p>
          </div>
          <Award className="w-8 h-8 text-amber-400" />
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full py-3.5 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/60 text-rose-300 font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>End Guard Shift & Handover</span>
        </button>
      </div>
    </div>
  );
};
