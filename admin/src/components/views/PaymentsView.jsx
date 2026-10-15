import { useState } from "react";
import { CreditCard, Search, CheckCircle, XCircle, Clock, Download, DollarSign } from "lucide-react";
import toast from "react-hot-toast";

const initialPayments = [
  { id: "TXN-9081", user: "Suman Kumar", method: "UPI (Google Pay)", amount: "₹90", status: "Successful", date: "2026-09-26 14:32" },
  { id: "TXN-9082", user: "Rahul Sharma", method: "Credit Card", amount: "₹200", status: "Successful", date: "2026-09-26 13:10" },
  { id: "TXN-9083", user: "Priya Patel", method: "Wallet", amount: "₹50", status: "Successful", date: "2026-09-26 11:15" },
  { id: "TXN-9084", user: "Amit Verma", method: "Net Banking", amount: "₹60", status: "Failed", date: "2026-09-26 09:40" },
  { id: "TXN-9085", user: "Sneha Reddy", method: "UPI (PhonePe)", amount: "₹120", status: "Pending", date: "2026-09-26 14:50" },
];

const PaymentsView = () => {
  const [payments] = useState(initialPayments);
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = payments.filter((p) => {
    const matchTab = tab === "All" || p.status === tab;
    const matchSearch =
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.user.toLowerCase().includes(search.toLowerCase()) ||
      p.method.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Revenue Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#0D1B2A] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-slate-400 font-semibold uppercase">Total Revenue</p>
          <h3 className="text-3xl font-black text-emerald-400 mt-2">₹1,64,100</h3>
        </div>
        <div className="bg-[#0D1B2A] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-emerald-400 font-semibold uppercase">Successful Txns</p>
          <h3 className="text-3xl font-black text-white mt-2">1,240</h3>
        </div>
        <div className="bg-[#0D1B2A] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-rose-400 font-semibold uppercase">Failed Txns</p>
          <h3 className="text-3xl font-black text-rose-400 mt-2">14</h3>
        </div>
        <div className="bg-[#0D1B2A] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-amber-400 font-semibold uppercase">Pending Txns</p>
          <h3 className="text-3xl font-black text-amber-400 mt-2">6</h3>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CreditCard size={22} className="text-emerald-400" />
              Transactions & Revenue Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Track user payments, inspect transaction statuses, and download receipts.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search transaction ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Tab Badges */}
        <div className="flex flex-wrap gap-2">
          {["All", "Successful", "Pending", "Failed"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                tab === t
                  ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-md"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Transaction ID</th>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-medium text-slate-200">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-mono font-bold text-emerald-400">{p.id}</td>
                  <td className="py-4 px-4 font-bold text-white">{p.user}</td>
                  <td className="py-4 px-4 text-xs font-bold text-slate-300">{p.method}</td>
                  <td className="py-4 px-4 text-xs font-mono text-slate-400">{p.date}</td>
                  <td className="py-4 px-4 font-black text-white text-base">{p.amount}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                        p.status === "Successful"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : p.status === "Pending"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => toast.success(`Receipt downloaded for ${p.id}`)}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold border border-white/10 flex items-center gap-1.5 ml-auto"
                    >
                      <Download size={14} />
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsView;
