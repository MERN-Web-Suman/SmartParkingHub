import { CreditCard, Wallet, Plus, ArrowUpRight, ArrowDownLeft, ShieldCheck } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import Button from "../../components/common/Button";

const Payments = () => {
  const transactions = [
    { id: "TXN-9081", title: "Smart Parking A Slot A-24", amount: "-₹40.00", date: "25 Sep 2026", type: "debit" },
    { id: "TXN-9040", title: "ParkSmart Wallet Topup", amount: "+₹500.00", date: "22 Sep 2026", type: "credit" },
    { id: "TXN-8812", title: "City Parking Hub Slot B-12", amount: "-₹60.00", date: "20 Sep 2026", type: "debit" },
  ];

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <div className="pt-20 flex">
        <Sidebar />

        <main className="flex-1 p-6 md:p-10 max-w-7xl">
          <div className="mb-8">
            <p className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
              WALLET & PAYMENTS
            </p>
            <h1 className="text-4xl font-black text-slate-900 mt-2 tracking-tight">
              Payment Methods & Balance
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage your ParkSmart wallet, saved UPI handles, debit cards, and review recent transaction receipts.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            {/* Wallet Balance Card */}
            <div className="bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 rounded-3xl p-6 sm:p-7 shadow-lg shadow-emerald-500/25 relative overflow-hidden flex flex-col justify-between text-white">
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">
                    ParkSmart Wallet
                  </span>
                  <Wallet size={24} className="text-emerald-200" />
                </div>
                <h2 className="text-4xl font-black text-white mt-4 tracking-tight">₹420.00</h2>
                <p className="text-xs text-emerald-100 mt-1 flex items-center gap-1 font-semibold">
                  <ShieldCheck size={14} /> Auto-debit active for express gate pass
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/20 flex gap-3">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-bold text-xs shadow-sm transition cursor-pointer">
                  <Plus size={16} /> Add Money to Wallet
                </button>
              </div>
            </div>

            {/* Saved Payment Cards */}
            <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CreditCard className="text-emerald-600" size={20} /> Saved Payment Methods
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50/80 border border-slate-200/80 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-medium">UPI Handle</p>
                      <p className="font-bold text-slate-900 mt-0.5">suman@upi</p>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-block mt-1">Default UPI</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs border border-purple-200 shadow-xs">
                      UPI
                    </div>
                  </div>

                  <div className="bg-slate-50/80 border border-slate-200/80 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-medium">HDFC Debit Card</p>
                      <p className="font-bold text-slate-900 mt-0.5">•••• 4821</p>
                      <span className="text-[10px] text-slate-500 font-medium">Expires 09/28</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs border border-sky-200 shadow-xs">
                      CARD
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Transactions</h3>

            <div className="space-y-3">
              {transactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between p-4 bg-slate-50/60 hover:bg-slate-50 rounded-2xl border border-slate-200/60 transition"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs ${
                        txn.type === "credit"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-rose-100 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {txn.type === "credit" ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                    </div>

                    <div>
                      <p className="font-bold text-slate-900 text-sm">{txn.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{txn.id} • {txn.date}</p>
                    </div>
                  </div>

                  <span
                    className={`font-black text-base ${
                      txn.type === "credit" ? "text-emerald-600" : "text-slate-900"
                    }`}
                  >
                    {txn.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payments;
