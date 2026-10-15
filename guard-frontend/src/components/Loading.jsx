import React from 'react';
import { Loader2, ParkingSquare } from 'lucide-react';

export const Loading = ({ fullScreen = false, label = 'Loading data...' }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center shadow-xl shadow-emerald-500/10">
          <ParkingSquare className="w-8 h-8 text-emerald-400 animate-pulse" />
        </div>
        <Loader2 className="w-16 h-16 text-cyan-400 animate-spin absolute -top-1 -left-1 opacity-75" />
      </div>
      <p className="text-sm font-semibold text-slate-300 font-mono tracking-wider">{label}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#090d16] flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};
