import { useState } from "react";
import { User, Mail, Phone, Car, Shield, Save, KeyRound } from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user, login } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "Suman Kumar",
    email: user?.email || "suman@example.com",
    phone: user?.phone || "+91 9876543210",
    defaultVehicle: "OD02AB1234",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });
    toast.success("Profile details updated successfully!");
  };

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <div className="pt-20 flex">
        <Sidebar />

        <main className="flex-1 p-6 md:p-10 max-w-7xl">
          <div className="mb-8">
            <p className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
              USER PROFILE & ACCOUNT
            </p>
            <h1 className="text-4xl font-black text-slate-900 mt-2 tracking-tight">
              Account Settings
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage your personal details, preferred default vehicle, and security preferences.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* User Profile Card */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-sky-500 p-1 mx-auto shadow-md">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-emerald-600">
                  <User size={42} />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900">{formData.name}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{formData.email}</p>
                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black shadow-xs">
                  VERIFIED DRIVER
                </span>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-3 text-left text-xs text-slate-600">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 font-medium">Default Vehicle:</span>
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">{formData.defaultVehicle}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 font-medium">Phone:</span>
                  <span className="font-bold text-slate-900">{formData.phone}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 font-medium">Wallet Auto-Pay:</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Edit Profile Form */}
            <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Shield className="text-emerald-600" size={20} /> Personal Information
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 pl-10 pr-4 outline-none focus:bg-white focus:border-emerald-500 text-sm font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 pl-10 pr-4 outline-none focus:bg-white focus:border-emerald-500 text-sm font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 pl-10 pr-4 outline-none focus:bg-white focus:border-emerald-500 text-sm font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                      Default Vehicle Reg.
                    </label>
                    <div className="relative">
                      <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        name="defaultVehicle"
                        value={formData.defaultVehicle}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 pl-10 pr-4 outline-none focus:bg-white focus:border-emerald-500 text-sm font-bold uppercase"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button type="submit" className="px-6 py-3 flex items-center gap-2 font-bold shadow-md shadow-emerald-500/25">
                    <Save size={18} /> Save Profile Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
