import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, ArrowLeft, Printer } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

export const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto space-y-6">
      <button
        onClick={() => navigate('/billing')}
        className="flex items-center space-x-2 text-slate-400 hover:text-white text-xs font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Billing Ledger</span>
      </button>

      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-5 text-center">
        <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
        <h1 className="text-xl font-extrabold text-white">Payment Receipt Audit</h1>
        <p className="text-xs text-slate-400 font-mono">Ref ID: {id || 'TXN-90112'}</p>

        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 uppercase font-bold">Total Settled</span>
          <h2 className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">₹140</h2>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase rounded-xl border border-slate-700 flex items-center justify-center space-x-2"
        >
          <Printer className="w-4 h-4" />
          <span>Print Duplicate Receipt</span>
        </button>
      </div>
    </div>
  );
};
