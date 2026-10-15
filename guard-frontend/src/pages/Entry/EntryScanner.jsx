import React, { useState } from 'react';
import { QRScanner } from '../../components/QRScanner';
import { entryService } from '../../services/entryService';
import { useNavigate } from 'react-router-dom';
import { QrCode, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { ConfirmModal } from '../../components/ConfirmModal';

export const EntryScanner = () => {
  const [loading, setLoading] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualVehicleNum, setManualVehicleNum] = useState('');
  const [manualOwnerName, setManualOwnerName] = useState('');
  const [manualVehicleType, setManualVehicleType] = useState('Car');
  const [manualSlot, setManualSlot] = useState('A-14');

  const navigate = useNavigate();

  const handleScanResult = async (code) => {
    setLoading(true);
    try {
      const res = await entryService.verifyQR(code);
      if (res.success) {
        navigate('/entry/details', { state: { booking: res.booking } });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualConfirm = async () => {
    if (!manualVehicleNum) return;
    const res = await entryService.manualEntry({
      vehicleNumber: manualVehicleNum,
      ownerName: manualOwnerName || 'Walk-in Guest',
      vehicleType: manualVehicleType,
      assignedSlot: manualSlot,
      reason: 'Manual Guard Override'
    });
    setShowManualModal(false);
    navigate('/entry/success', { state: { pass: res } });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            Vehicle Entry Gate
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2 flex items-center gap-2">
            <QrCode className="w-6 h-6 text-emerald-400" /> Booking Pass QR Scanner
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Scan driver's mobile QR booking pass or enter manual authorization.
          </p>
        </div>

        <button
          onClick={() => setShowManualModal(true)}
          className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition"
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Manual Entry Form</span>
        </button>
      </div>

      {/* Main Scanner Component */}
      <QRScanner onScanResult={handleScanResult} mode="ENTRY" />

      {/* Manual Entry Modal */}
      <ConfirmModal
        isOpen={showManualModal}
        title="Manual Guard Vehicle Entry"
        message="Use this for walk-in drivers or damaged QR codes. Assign slot manually."
        confirmText="Confirm & Authorize Entry"
        type="info"
        onConfirm={handleManualConfirm}
        onClose={() => setShowManualModal(false)}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
              Vehicle Registration Number *
            </label>
            <input
              type="text"
              value={manualVehicleNum}
              onChange={(e) => setManualVehicleNum(e.target.value.toUpperCase())}
              placeholder="e.g. MH 12 AB 9988"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono uppercase"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                Owner / Driver Name
              </label>
              <input
                type="text"
                value={manualOwnerName}
                onChange={(e) => setManualOwnerName(e.target.value)}
                placeholder="Walk-in Guest"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                Vehicle Category
              </label>
              <select
                value={manualVehicleType}
                onChange={(e) => setManualVehicleType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              >
                <option value="Car">Car</option>
                <option value="EV Car">EV Car</option>
                <option value="Bike">Bike</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
              Assign Parking Slot
            </label>
            <select
              value={manualSlot}
              onChange={(e) => setManualSlot(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono"
            >
              <option value="A-14">A-14 (Level 1)</option>
              <option value="A-15">A-15 (Level 1)</option>
              <option value="B-03">B-03 (EV Deck)</option>
              <option value="C-02">C-02 (Two Wheeler)</option>
            </select>
          </div>
        </div>
      </ConfirmModal>
    </div>
  );
};
