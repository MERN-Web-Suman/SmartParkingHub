import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { exitService } from '../../services/exitService';
import { paymentService } from '../../services/paymentService';
import { formatCurrency } from '../../utils/formatCurrency';
import { CreditCard, QrCode, Banknote, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const BillDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const session = location.state?.session || {
    sessionId: 'SES-8801',
    vehicleNumber: 'MH 02 CK 9988',
    slotNumber: 'B-02',
    ownerName: 'Sanjay Dutt'
  };

  const bill = location.state?.bill || {
    durationMinutes: 210,
    durationHours: 4,
    baseAmount: 160,
    overstayMinutes: 30,
    overstayCharge: 50,
    gst: 38,
    totalAmount: 248
  };

  const [paymentMode, setPaymentMode] = useState('Cash');
  const [cashGiven, setCashGiven] = useState(bill.totalAmount);
  const [loading, setLoading] = useState(false);

  const changeReturn = Math.max(0, Number(cashGiven) - bill.totalAmount);

  const handleConfirmExit = async () => {
    setLoading(true);
    try {
      if (paymentMode === 'Cash') {
        await paymentService.collectCashPayment({
          sessionId: session.sessionId,
          amount: bill.totalAmount,
          vehicleNumber: session.vehicleNumber
        });
      }

      const res = await exitService.processExit({
        sessionId: session.sessionId,
        amount: bill.totalAmount,
        paymentMode: paymentMode
      });

      navigate('/exit/success', { state: { res, session, bill, paymentMode } });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
          <CreditCard className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-extrabold text-white">
          Payment Collection & Exit Pass
        </h1>
        <p className="text-xs text-slate-400">
          Vehicle: <span className="font-mono text-white font-bold">{session.vehicleNumber}</span> • Slot: <span className="font-mono text-emerald-400 font-bold">{session.slotNumber}</span>
        </p>
      </div>

      {/* Bill Itemization Breakdown */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Tax Invoice Breakdown
        </h3>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between text-slate-300">
            <span>Base Parking Fee ({bill.durationHours} Hours @ ₹40/hr)</span>
            <span className="font-mono font-bold">₹{bill.baseAmount}</span>
          </div>

          {bill.overstayCharge > 0 && (
            <div className="flex justify-between text-rose-400">
              <span>Overstay Penalty Fine ({bill.overstayMinutes} mins)</span>
              <span className="font-mono font-bold">+₹{bill.overstayCharge}</span>
            </div>
          )}

          <div className="flex justify-between text-slate-400">
            <span>GST (18%)</span>
            <span className="font-mono">₹{bill.gst}</span>
          </div>

          <div className="pt-3 border-t border-slate-700 flex justify-between items-center text-sm font-extrabold text-white">
            <span>TOTAL BILLABLE AMOUNT</span>
            <span className="text-2xl text-emerald-400 font-mono">{formatCurrency(bill.totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Payment Mode Selector */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Select Payment Method
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {[
            { mode: 'Cash', icon: Banknote },
            { mode: 'UPI / QR', icon: QrCode },
            { mode: 'Card', icon: CreditCard }
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = paymentMode === item.mode;
            return (
              <button
                key={item.mode}
                type="button"
                onClick={() => setPaymentMode(item.mode)}
                className={`p-4 rounded-2xl border text-center transition flex flex-col items-center justify-center space-y-2 ${
                  isSelected
                    ? 'bg-gradient-to-tr from-cyan-600/30 to-emerald-600/30 border-cyan-500 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-6 h-6 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="text-xs font-bold">{item.mode}</span>
              </button>
            );
          })}
        </div>

        {/* Cash Tendered Calculator */}
        {paymentMode === 'Cash' && (
          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">Cash Received from Driver (₹)</label>
              <input
                type="number"
                value={cashGiven}
                onChange={(e) => setCashGiven(e.target.value)}
                className="w-32 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-right font-mono text-sm text-emerald-400 font-bold focus:outline-none"
              />
            </div>
            <div className="flex justify-between items-center text-xs font-bold pt-2 border-t border-slate-800">
              <span className="text-slate-400">Change Return to Driver:</span>
              <span className="text-amber-400 font-mono text-sm">₹{changeReturn}</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={handleConfirmExit}
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-emerald-950/40 flex items-center justify-center space-x-2 transition"
      >
        <CheckCircle className="w-5 h-5" />
        <span>{loading ? 'Processing Payment...' : 'Confirm Payment & Open Exit Barrier'}</span>
      </button>
    </div>
  );
};
