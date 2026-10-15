import React, { useState } from 'react';
import { QrCode, Flashlight, Camera, Keyboard, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { useQRScanner } from '../hooks/useQRScanner';

export const QRScanner = ({ onScanResult, mode = 'ENTRY' }) => {
  const [manualCode, setManualCode] = useState('');
  const [isManualInput, setIsManualInput] = useState(false);

  const { torchOn, toggleTorch, simulateScan } = useQRScanner((code) => {
    if (onScanResult) onScanResult(code);
  });

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.trim()) {
      simulateScan(manualCode.trim().toUpperCase());
      setManualCode('');
    }
  };

  const sampleCodes = mode === 'ENTRY' 
    ? ['BK-2026-9901', 'BK-2026-9902', 'MH 12 AB 4321', 'DL 01 X 8877']
    : ['SES-8801', 'SES-8802', 'TCK-409112', 'MH 02 CK 9988'];

  return (
    <div className="glass-card rounded-3xl border border-slate-800 p-6 shadow-2xl relative overflow-hidden">
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <QrCode className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {mode} Gate Optical Scanner
            </h3>
            <p className="text-[11px] text-slate-400">Align QR code inside target box</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTorch}
            className={`p-2.5 rounded-xl border transition ${
              torchOn
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-lg shadow-amber-950/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Toggle Flashlight"
          >
            <Flashlight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsManualInput(!isManualInput)}
            className={`p-2.5 rounded-xl border transition ${
              isManualInput
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Manual Entry Mode"
          >
            <Keyboard className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scanner Viewport */}
      {!isManualInput ? (
        <div className="relative w-full aspect-video sm:aspect-[4/3] bg-slate-950 rounded-2xl border-2 border-slate-800/80 overflow-hidden flex items-center justify-center group shadow-inner">
          {/* Simulated Camera Feed Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-slate-950/80 to-slate-950 opacity-90"></div>

          {/* Flashlight Overlay */}
          {torchOn && (
            <div className="absolute inset-0 bg-amber-400/10 backdrop-brightness-125 pointer-events-none transition"></div>
          )}

          {/* Target Reticle */}
          <div className="relative z-10 w-56 h-56 border-2 border-dashed border-emerald-400/60 rounded-2xl flex items-center justify-center p-2 shadow-2xl">
            {/* Corner Markers */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg"></div>

            {/* Laser Scanning Line */}
            <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-scan"></div>

            {/* Center Grid Icon */}
            <QrCode className="w-20 h-20 text-slate-700/50" />
          </div>

          {/* Live Watermark / Camera Status */}
          <div className="absolute bottom-3 left-3 z-20 flex items-center space-x-2 bg-slate-900/80 backdrop-blur-sm border border-slate-800 px-3 py-1 rounded-lg">
            <Camera className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-slate-300">HD GATE CAM 01 • 1080P</span>
          </div>
        </div>
      ) : (
        /* Manual Code Input Form */
        <div className="w-full aspect-video sm:aspect-[4/3] bg-slate-950 rounded-2xl border-2 border-slate-800/80 p-6 flex flex-col justify-center">
          <form onSubmit={handleManualSubmit} className="space-y-4 max-w-sm mx-auto w-full">
            <div className="text-center space-y-1">
              <h4 className="text-sm font-bold text-white">Manual Pass / Booking ID Entry</h4>
              <p className="text-xs text-slate-400">Type Vehicle Reg. No. or Booking Reference Code</p>
            </div>

            <div className="relative">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="e.g. BK-2026-9901 or MH 12 AB 4321"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-mono text-center uppercase tracking-wider focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-950/40 transition"
            >
              Verify Code
            </button>
          </form>
        </div>
      )}

      {/* Quick Interactive Mock Triggers for Demo */}
      <div className="mt-5 pt-4 border-t border-slate-800">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
          Tap Quick Demo Pass Codes:
        </p>
        <div className="flex flex-wrap gap-2">
          {sampleCodes.map((code) => (
            <button
              key={code}
              onClick={() => simulateScan(code)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-emerald-950/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 rounded-xl text-xs font-mono transition flex items-center space-x-1.5"
            >
              <CheckCircle className="w-3 h-3 text-emerald-500" />
              <span>{code}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
