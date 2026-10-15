import React, { useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { StatCard } from '../components/StatCard';
import { useNavigate } from 'react-router-dom';
import {
  QrCode, LogOut as ExitIcon, Car, Grid, ClockAlert,
  ShieldCheck, Zap, ArrowUpRight, Activity, Unlock, Lock,
  TrendingUp, Wifi
} from 'lucide-react';

export const Dashboard = () => {
  const { liveStats, recentEvents, addEvent } = useSocket();
  const navigate = useNavigate();
  const [barrierState, setBarrierState] = useState('CLOSED');

  const handleBarrierToggle = (state) => {
    setBarrierState(state);
    addEvent({ type: 'GATE_CONTROL', text: `Gate Barrier manually set to ${state}` });
  };

  const occupancyRate = Math.round(((60 - liveStats.availableSlots) / 60) * 100);

  return (
    <div className="space-y-6 p-1">

      {/* ── Hero Header Banner ─────────────────────────────── */}
      <div
        className="relative rounded-3xl p-6 overflow-hidden animate-fadein-up"
        style={{
          background: 'linear-gradient(135deg, rgba(14,22,40,0.95) 0%, rgba(8,13,26,0.90) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 8px 32px -8px rgba(0,0,0,0.5)',
        }}
      >
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #10b981, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full blur-[60px] pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }} />

        {/* Top glow line */}
        <div className="absolute top-0 left-12 right-12 h-[1px]"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(16,185,129,0.4),rgba(6,182,212,0.4),transparent)' }} />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em] mb-3"
              style={{
                background: 'linear-gradient(135deg,rgba(16,185,129,0.15),rgba(6,182,212,0.08))',
                border: '1px solid rgba(16,185,129,0.25)',
                color: '#6ee7b7',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Gate Overview
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              North Gate Security{' '}
              <span style={{
                background: 'linear-gradient(90deg,#10b981,#06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Control Center
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1.5 max-w-lg">
              Real-time monitoring of vehicle entry, exit, live slots, and gate barriers.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/entry/scan')}
              className="btn-luxury flex items-center gap-2 text-[11px] font-black uppercase tracking-widest px-5 py-3 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg,#10b981,#059669)',
                color: '#022c22',
                boxShadow: '0 6px 24px -6px rgba(16,185,129,0.55)',
              }}
            >
              <QrCode className="w-4 h-4" />
              Scan Entry
            </button>
            <button
              onClick={() => navigate('/exit/scan')}
              className="btn-luxury flex items-center gap-2 text-[11px] font-black uppercase tracking-widest px-5 py-3 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg,#06b6d4,#2563eb)',
                color: '#fff',
                boxShadow: '0 6px 24px -6px rgba(6,182,212,0.45)',
              }}
            >
              <ExitIcon className="w-4 h-4" />
              Process Exit
            </button>
          </div>
        </div>
      </div>

      {/* ── Overstay Warning ───────────────────────────────── */}
      {liveStats.overstayCount > 0 && (
        <div
          onClick={() => navigate('/overstay')}
          className="cursor-pointer flex items-center justify-between p-4 rounded-2xl transition-all group animate-fadein-up"
          style={{
            background: 'linear-gradient(135deg,rgba(244,63,94,0.12) 0%,rgba(239,68,68,0.06) 100%)',
            border: '1px solid rgba(244,63,94,0.30)',
            boxShadow: '0 0 30px -8px rgba(244,63,94,0.20)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(244,63,94,0.15)' }}
            >
              <ClockAlert className="w-5 h-5 text-rose-400 animate-bounce" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                ⚠ Overstay Alert —{' '}
                <span className="text-rose-400">{liveStats.overstayCount} Vehicles</span>{' '}
                Exceeded Booking Time
              </h4>
              <p className="text-xs text-rose-300/70 mt-0.5">
                Click to inspect overstay vehicles and calculate pending penalty fines.
              </p>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-rose-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition shrink-0" />
        </div>
      )}

      {/* ── Stat Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Entries"  value={liveStats.todayEntries}    subtext="Processed at Gate North"  trend="+12%" icon={QrCode}    color="emerald" />
        <StatCard title="Today's Exits"    value={liveStats.todayExits}      subtext="Billed and released"      trend="+8%"  icon={ExitIcon}  color="cyan"    />
        <StatCard title="Active Parked"    value={liveStats.activeVehicles}  subtext="Currently inside facility"             icon={Car}       color="amber"   />
        <StatCard title="Available Slots"  value={liveStats.availableSlots}  subtext="Out of 60 total slots"                 icon={Grid}      color="rose"    />
      </div>

      {/* ── Main Grid ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left 2 cols */}
        <div className="lg:col-span-2 space-y-6">

          {/* Occupancy Gauge */}
          <div
            className="rounded-3xl p-6 space-y-5"
            style={{
              background: 'linear-gradient(135deg,rgba(14,22,40,0.95) 0%,rgba(8,13,26,0.90) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  Live Parking Capacity
                </p>
                <h3 className="text-lg font-black text-white mt-0.5">Total Lot Utilization</h3>
              </div>
              <span
                className="text-2xl font-black font-mono"
                style={{
                  background: occupancyRate > 80
                    ? 'linear-gradient(135deg,#f43f5e,#ef4444)'
                    : occupancyRate > 50
                    ? 'linear-gradient(135deg,#f59e0b,#fbbf24)'
                    : 'linear-gradient(135deg,#10b981,#06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {occupancyRate}%
              </span>
            </div>

            {/* Progress bar */}
            <div
              className="w-full h-3 rounded-full overflow-hidden p-0.5"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${occupancyRate}%`,
                  background: 'linear-gradient(90deg,#10b981,#06b6d4,#f59e0b)',
                  boxShadow: '0 0 12px rgba(16,185,129,0.4)',
                }}
              />
            </div>

            {/* 3 mini stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Occupied',    value: 60 - liveStats.availableSlots, color: '#fda4af' },
                { label: 'Available',   value: liveStats.availableSlots,       color: '#6ee7b7' },
                { label: 'EV Slots',    value: 4,                              color: '#67e8f9' },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="p-3 rounded-xl text-center"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</p>
                  <p className="text-xl font-black font-mono mt-1" style={{ color }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gate Barrier Controls */}
          <div
            className="rounded-3xl p-6 space-y-4"
            style={{
              background: 'linear-gradient(135deg,rgba(14,22,40,0.95) 0%,rgba(8,13,26,0.90) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,rgba(6,182,212,0.20),rgba(14,165,233,0.10))' }}
                >
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    Boom Barrier Gate Controls
                  </h3>
                  <p className="text-xs text-slate-400">Gate North Barrier #1</p>
                </div>
              </div>

              <span
                className="text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider font-mono"
                style={
                  barrierState === 'OPEN'
                    ? { background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.30)', color: '#6ee7b7' }
                    : { background: 'rgba(244,63,94,0.12)',  border: '1px solid rgba(244,63,94,0.30)',  color: '#fda4af' }
                }
              >
                ● BARRIER {barrierState}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleBarrierToggle('OPEN')}
                className="btn-luxury py-3.5 px-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                style={{
                  background: barrierState === 'OPEN'
                    ? 'linear-gradient(135deg,rgba(16,185,129,0.30),rgba(6,182,212,0.15))'
                    : 'rgba(16,185,129,0.08)',
                  border: '1px solid rgba(16,185,129,0.30)',
                  color: '#6ee7b7',
                }}
              >
                <Unlock className="w-4 h-4" />
                Open Barrier Gate
              </button>
              <button
                onClick={() => handleBarrierToggle('CLOSED')}
                className="btn-luxury py-3.5 px-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                style={{
                  background: barrierState === 'CLOSED'
                    ? 'linear-gradient(135deg,rgba(244,63,94,0.25),rgba(239,68,68,0.12))'
                    : 'rgba(244,63,94,0.07)',
                  border: '1px solid rgba(244,63,94,0.30)',
                  color: '#fda4af',
                }}
              >
                <Lock className="w-4 h-4" />
                Lower / Lock Barrier
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Activity Feed */}
        <div
          className="rounded-3xl p-6 flex flex-col"
          style={{
            background: 'linear-gradient(135deg,rgba(14,22,40,0.95) 0%,rgba(8,13,26,0.90) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              Live Logs
            </h3>
            <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-400">
              <Wifi className="w-3 h-3" />
              Live Sync
            </div>
          </div>

          <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[380px] pr-1">
            {recentEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded-xl text-xs space-y-1.5 transition-all"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[9px] font-black px-2 py-0.5 rounded-full"
                    style={
                      evt.type === 'ENTRY'
                        ? { background: 'rgba(16,185,129,0.15)',  color: '#6ee7b7',  border: '1px solid rgba(16,185,129,0.25)' }
                        : evt.type === 'EXIT'
                        ? { background: 'rgba(6,182,212,0.15)',   color: '#67e8f9',  border: '1px solid rgba(6,182,212,0.25)' }
                        : { background: 'rgba(245,158,11,0.15)',  color: '#fcd34d',  border: '1px solid rgba(245,158,11,0.25)' }
                    }
                  >
                    {evt.type}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{evt.time}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{evt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
