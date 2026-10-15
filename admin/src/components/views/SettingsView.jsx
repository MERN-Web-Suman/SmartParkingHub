import { useState } from "react";
import { Settings, Shield, DollarSign, Bell, Save, Lock } from "lucide-react";
import toast from "react-hot-toast";

const SettingsView = () => {
  const [profile, setProfile] = useState({
    name: "System Administrator",
    email: "admin@parksmart.com",
    phone: "9000000000",
  });

  const [pricing, setPricing] = useState({
    baseRate: 30,
    peakSurge: 1.5,
    evRate: 50,
  });

  const [toggles, setToggles] = useState({
    autoGateOpen: true,
    emailAlerts: true,
    aiPredictionAutoSurge: false,
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Admin system settings updated successfully!");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings size={22} className="text-emerald-400" />
          Admin Configuration & System Settings
        </h3>
        <p className="text-xs text-slate-400 mt-1">Configure pricing rules, system automation, and security credentials.</p>
      </div>

      <form onSubmit={handleSave} className="grid lg:grid-cols-2 gap-8">
        {/* Admin Profile Details */}
        <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield size={18} className="text-emerald-400" />
            Admin Account Credentials
          </h4>

          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">
              Admin Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">
              Admin Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Dynamic Parking Pricing Matrix */}
        <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <DollarSign size={18} className="text-emerald-400" />
            Parking Pricing Engine & Rules
          </h4>

          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">
              Standard Hourly Rate (₹ / hr)
            </label>
            <input
              type="number"
              value={pricing.baseRate}
              onChange={(e) => setPricing({ ...pricing, baseRate: Number(e.target.value) })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">
              Peak Surge Multiplier (e.g. 1.5x)
            </label>
            <input
              type="number"
              step="0.1"
              value={pricing.peakSurge}
              onChange={(e) => setPricing({ ...pricing, peakSurge: Number(e.target.value) })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">
              EV Fast Charger Hourly Rate (₹ / hr)
            </label>
            <input
              type="number"
              value={pricing.evRate}
              onChange={(e) => setPricing({ ...pricing, evRate: Number(e.target.value) })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* System Automation Toggles */}
        <div className="lg:col-span-2 bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          <h4 className="text-lg font-bold text-white">System Automation & Controls</h4>

          <div className="space-y-4 pt-2">
            {[
              { key: "autoGateOpen", label: "Automated QR Barrier Gate Opening", desc: "Instantly open entry/exit barrier when QR scan matches active booking" },
              { key: "emailAlerts", label: "Real-time Email Alerts for Admin", desc: "Receive instant email when parking occupancy crosses 90%" },
              { key: "aiPredictionAutoSurge", label: "AI Dynamic Surge Pricing Auto-Adjustment", desc: "Allow ML models to adjust hourly rates based on live demand" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div>
                  <h5 className="text-sm font-bold text-white">{item.label}</h5>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setToggles({ ...toggles, [item.key]: !toggles[item.key] })}
                  className={`w-12 h-6 rounded-full transition p-1 flex items-center ${
                    toggles[item.key] ? "bg-emerald-500 justify-end" : "bg-slate-800 justify-start"
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-md" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition flex items-center gap-2 text-sm shadow-lg shadow-emerald-500/20"
            >
              <Save size={18} />
              Save All Settings
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsView;
