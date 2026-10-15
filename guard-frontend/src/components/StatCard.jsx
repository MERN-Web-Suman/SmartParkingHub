import React from 'react';

const colorMap = {
  emerald: {
    gradient: 'linear-gradient(135deg,rgba(16,185,129,0.18) 0%,rgba(6,182,212,0.10) 100%)',
    border:   'rgba(16,185,129,0.28)',
    icon:     'linear-gradient(135deg,#10b981,#06b6d4)',
    glow:     'rgba(16,185,129,0.20)',
    value:    '#6ee7b7',
    trend:    '#34d399',
  },
  cyan: {
    gradient: 'linear-gradient(135deg,rgba(6,182,212,0.18) 0%,rgba(14,165,233,0.10) 100%)',
    border:   'rgba(6,182,212,0.28)',
    icon:     'linear-gradient(135deg,#06b6d4,#3b82f6)',
    glow:     'rgba(6,182,212,0.18)',
    value:    '#67e8f9',
    trend:    '#22d3ee',
  },
  amber: {
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.16) 0%,rgba(251,191,36,0.08) 100%)',
    border:   'rgba(245,158,11,0.28)',
    icon:     'linear-gradient(135deg,#f59e0b,#fbbf24)',
    glow:     'rgba(245,158,11,0.18)',
    value:    '#fcd34d',
    trend:    '#fbbf24',
  },
  rose: {
    gradient: 'linear-gradient(135deg,rgba(244,63,94,0.16) 0%,rgba(239,68,68,0.08) 100%)',
    border:   'rgba(244,63,94,0.28)',
    icon:     'linear-gradient(135deg,#f43f5e,#ef4444)',
    glow:     'rgba(244,63,94,0.18)',
    value:    '#fda4af',
    trend:    '#fb7185',
  },
  violet: {
    gradient: 'linear-gradient(135deg,rgba(139,92,246,0.16) 0%,rgba(99,102,241,0.08) 100%)',
    border:   'rgba(139,92,246,0.28)',
    icon:     'linear-gradient(135deg,#8b5cf6,#6366f1)',
    glow:     'rgba(139,92,246,0.18)',
    value:    '#c4b5fd',
    trend:    '#a78bfa',
  },
};

export const StatCard = ({ title, value, subtext, icon: Icon, trend, color = 'emerald' }) => {
  const s = colorMap[color] || colorMap.emerald;

  return (
    <div
      className="group relative rounded-2xl p-5 overflow-hidden transition-all duration-300 cursor-default"
      style={{
        background: s.gradient,
        border: `1px solid ${s.border}`,
        boxShadow: `0 4px 20px -6px ${s.glow}`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 12px 40px -8px ${s.glow}, 0 0 0 1px ${s.border}`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = `0 4px 20px -6px ${s.glow}`;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* shimmer */}
      <div className="absolute inset-0 animate-shimmer pointer-events-none rounded-2xl" />

      {/* Top glow bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${s.border}, transparent)` }}
      />

      <div className="relative flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-1">
            {title}
          </p>
          <h3
            className="text-3xl font-black font-mono tracking-tight leading-none"
            style={{ color: s.value }}
          >
            {value}
          </h3>

          {subtext && (
            <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
              {trend && (
                <span
                  className="text-[10px] font-black px-1.5 py-0.5 rounded-full"
                  style={{
                    color: s.trend,
                    background: `${s.glow.replace('0.18', '0.12').replace('0.20', '0.10')}`,
                  }}
                >
                  {trend}
                </span>
              )}
              <span className="truncate">{subtext}</span>
            </p>
          )}
        </div>

        {Icon && (
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ml-3 shadow-lg"
            style={{
              background: s.icon,
              boxShadow: `0 6px 20px -4px ${s.glow}`,
            }}
          >
            <Icon className="w-6 h-6 text-white drop-shadow" />
          </div>
        )}
      </div>
    </div>
  );
};
