import React, { useState } from 'react';
import { QRScanner } from '../../components/QRScanner';
import { exitService } from '../../services/exitService';
import { useNavigate } from 'react-router-dom';
import { LogOut as ExitIcon, Search } from 'lucide-react';

export const ExitScanner = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleScanResult = async (code) => {
    setLoading(true);
    try {
      const res = await exitService.verifyExitSession(code);
      if (res.success) {
        navigate('/exit/details', { state: { session: res.session } });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleScanResult(searchQuery.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
          Vehicle Exit Gate
        </span>
        <h1 className="text-2xl font-extrabold text-white mt-2 flex items-center gap-2">
          <ExitIcon className="w-6 h-6 text-cyan-400" /> Exit Scanner & Billing Terminal
        </h1>
        <p className="text-xs text-slate-400">
          Scan exit barcode or search active session by vehicle registration number.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative pt-2">
          <div className="absolute inset-y-0 left-0 pl-3.5 pt-2 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Quick Exit Search by Vehicle Registration Number (e.g. MH 02 CK 9988)"
            className="w-full pl-10 pr-24 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-3.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase rounded-xl transition"
          >
            Find Session
          </button>
        </form>
      </div>

      {/* Camera / QR Scanner View */}
      <QRScanner onScanResult={handleScanResult} mode="EXIT" />
    </div>
  );
};
