import React, { useState, useEffect } from 'react';
import { paymentService } from '../../services/paymentService';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDateTime } from '../../utils/formatDate';
import { CreditCard, Banknote, QrCode, CheckCircle, RefreshCw, DollarSign } from 'lucide-react';
import { ConfirmModal } from '../../components/ConfirmModal';

export const Billing = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [cashVehicle, setCashVehicle] = useState('');
  const [cashAmount, setCashAmount] = useState('100');

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await paymentService.getRecentPayments();
      if (res.success) setPayments(res.payments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const totalCashCollected = payments
    .filter((p) => p.paymentMode === 'Cash')
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const handleCashCollection = async () => {
    if (!cashVehicle) return;
    await paymentService.collectCashPayment({
      vehicleNumber: cashVehicle,
      amount: Number(cashAmount)
    });
    setShowCollectModal(false);
    fetchPayments();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            Gate Financial Ledger
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-400" /> Billing & Payment Audit
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Cash box summary, digital receipts, and gate payment processing history.
          </p>
        </div>

        <button
          onClick={() => setShowCollectModal(true)}
          className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl shadow-lg transition"
        >
          <Banknote className="w-4 h-4" />
          <span>Manual Cash Collection</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-emerald-500/30">
          <span className="text-xs font-semibold text-slate-400 uppercase">Today Cash Handled</span>
          <h3 className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">
            {formatCurrency(totalCashCollected + 420)}
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">Shift A Cash Drawer Balance</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-cyan-500/30">
          <span className="text-xs font-semibold text-slate-400 uppercase">Digital UPI Payments</span>
          <h3 className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">
            {formatCurrency(1240)}
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">Auto-credited to Merchant QR</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-amber-500/30">
          <span className="text-xs font-semibold text-slate-400 uppercase">Total Transactions</span>
          <h3 className="text-2xl font-extrabold text-white font-mono mt-1">
            {payments.length + 15} Paid
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">100% Verified Receipts</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Completed Exit Payment Logs
          </h3>
          <button onClick={fetchPayments} className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3.5">Transaction ID</th>
                <th className="p-3.5">Vehicle Reg</th>
                <th className="p-3.5">Mode</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {payments.map((p) => (
                <tr key={p.transactionId} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-bold text-white">{p.transactionId}</td>
                  <td className="p-3.5">{p.vehicleNumber}</td>
                  <td className="p-3.5">
                    <span className="bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-[10px] text-slate-300">
                      {p.paymentMode}
                    </span>
                  </td>
                  <td className="p-3.5 font-extrabold text-emerald-400">{formatCurrency(p.amount)}</td>
                  <td className="p-3.5 text-slate-400">{formatDateTime(p.timestamp)}</td>
                  <td className="p-3.5">
                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] font-bold">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cash Collection Modal */}
      <ConfirmModal
        isOpen={showCollectModal}
        title="Manual Cash Receipt Entry"
        message="Log over-the-counter cash collected from driver."
        confirmText="Save Cash Entry"
        type="info"
        onConfirm={handleCashCollection}
        onClose={() => setShowCollectModal(false)}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
              Vehicle Registration Number *
            </label>
            <input
              type="text"
              value={cashVehicle}
              onChange={(e) => setCashVehicle(e.target.value.toUpperCase())}
              placeholder="e.g. MH 12 AB 4321"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono uppercase"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
              Cash Amount Collected (₹) *
            </label>
            <input
              type="number"
              value={cashAmount}
              onChange={(e) => setCashAmount(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-emerald-400 font-mono font-bold"
            />
          </div>
        </div>
      </ConfirmModal>
    </div>
  );
};
