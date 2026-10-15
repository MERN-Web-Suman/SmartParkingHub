import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, QrCode, LogOut as ExitIcon, Car, Grid,
  RefreshCw, ClockAlert, CreditCard, History, ShieldAlert,
  Bell, Wrench, UserCheck, Search, ParkingSquare, Sparkles,
  Zap, ChevronRight
} from 'lucide-react';

export const Sidebar = () => {
  const menuSections = [
    {
      title: 'Core Operations',
      items: [
        { path: '/dashboard',     label: 'Dashboard',       icon: LayoutDashboard },
        { path: '/entry/scan',    label: 'Entry Scanner',   icon: QrCode,    highlight: true },
        { path: '/exit/scan',     label: 'Exit Scanner',    icon: ExitIcon },
        { path: '/vehicles/active', label: 'Active Vehicles', icon: Car },
      ]
    },
    {
      title: 'Slot & Traffic',
      items: [
        { path: '/parking/live',     label: 'Live Slots',        icon: Grid },
        { path: '/parking/reassign', label: 'Slot Reassignment', icon: RefreshCw },
        { path: '/overstay',         label: 'Overstay Alert',    icon: ClockAlert, badge: '2' },
      ]
    },
    {
      title: 'Billing & Verify',
      items: [
        { path: '/vehicles/search', label: 'Vehicle Search',  icon: Search },
        { path: '/billing',         label: 'Billing & Cash',  icon: CreditCard },
        { path: '/history',         label: 'Entry/Exit Logs', icon: History },
      ]
    },
    {
      title: 'Security & Support',
      items: [
        { path: '/emergency',     label: 'Emergency SOS', icon: ShieldAlert, alert: true },
        { path: '/notifications', label: 'Notifications', icon: Bell },
        { path: '/reports',       label: 'Report Issue',  icon: Wrench },
        { path: '/profile',       label: 'Guard Profile', icon: UserCheck },
      ]
    }
  ];

  return (
    <aside
      style={{
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #060b18 0%, #080e1d 60%, #060b18 100%)',
        borderRight: '1px solid rgba(255,255,255,0.055)',
      }}
    >
      {/* ── Brand Header ─────────────────────────────────────── */}
      <div
        className="p-5 flex items-center space-x-3 relative overflow-hidden"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* background shimmer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 120% 100% at 20% 0%, rgba(16,185,129,0.10) 0%, transparent 70%)',
          }}
        />

        {/* Logo icon */}
        <div
          className="relative w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg animate-float"
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #6366f1 100%)',
            boxShadow: '0 8px 24px -4px rgba(16,185,129,0.45), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          <ParkingSquare className="w-6 h-6 text-white drop-shadow" />
        </div>

        <div className="relative">
          <h1 className="text-base font-black text-white tracking-wide flex items-center gap-1.5">
            ParkSmart
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#10b981' }} />
          </h1>
          <p
            className="text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{
              background: 'linear-gradient(90deg, #10b981, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Guard Console
          </p>
        </div>
      </div>

      {/* ── Navigation ───────────────────────────────────────── */}
      <nav className="flex-1 p-3 space-y-5 mt-1">
        {menuSections.map((section, idx) => (
          <div key={idx} className="space-y-0.5">
            {/* Section label */}
            <p
              className="px-3 mb-2 text-[9px] font-black uppercase tracking-[0.22em]"
              style={{ color: 'rgba(148,163,184,0.5)' }}
            >
              {section.title}
            </p>

            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                      isActive
                        ? 'nav-active text-emerald-300'
                        : 'border-transparent text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-br from-emerald-500/25 to-cyan-500/15 shadow-sm'
                              : 'bg-white/[0.04] group-hover:bg-white/[0.07]'
                          }`}
                        >
                          <Icon
                            className={`w-3.5 h-3.5 transition-colors ${
                              isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'
                            } ${item.alert ? 'text-rose-400' : ''}`}
                          />
                        </div>
                        <span>{item.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span className="badge-amber text-[9px] px-1.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        {item.alert && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                        )}
                        {item.highlight && !item.badge && (
                          <span className="badge-emerald text-[9px] px-1.5 py-0.5 rounded-full flex items-center gap-1">
                            <Zap className="w-2.5 h-2.5" /> LIVE
                          </span>
                        )}
                        {isActive && !item.badge && !item.alert && (
                          <ChevronRight className="w-3 h-3 text-emerald-400/60" />
                        )}
                      </div>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── Footer Duty Status ───────────────────────────────── */}
      <div className="p-3 m-3 rounded-2xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(6,182,212,0.05) 100%)',
          border: '1px solid rgba(16,185,129,0.18)',
        }}
      >
        {/* shimmer layer */}
        <div className="absolute inset-0 animate-shimmer rounded-2xl pointer-events-none" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-semibold">Duty Status</p>
            <p className="text-[9px] text-slate-500 font-mono mt-0.5">GATE-NORTH-01</p>
          </div>
          <span
            className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full animate-ring-pulse"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.12))',
              border: '1px solid rgba(16,185,129,0.4)',
              color: '#6ee7b7',
            }}
          >
            ON SHIFT
          </span>
        </div>
      </div>
    </aside>
  );
};
