import { useState } from "react";
import { QrCode, Scan, CheckCircle2, AlertCircle, ShieldCheck, Car, Clock, MapPin } from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import Button from "../../components/common/Button";

const QREntry = () => {
  const [gateStatus, setGateStatus] = useState("closed"); // "closed", "scanning", "open"
  const [activePass, setActivePass] = useState({
    id: "QR-PARK-88219",
    parkingName: "City Center Parking",
    slot: "Slot A-24",
    vehicle: "OD02AB1234",
    entryWindow: "01:30 PM - 03:30 PM",
    feeRate: "₹30/hour",
  });

  const handleSimulateScan = () => {
    setGateStatus("scanning");
    toast.loading("Scanning QR Code at Entry Barrier...", { id: "qrScan" });

    setTimeout(() => {
      setGateStatus("open");
      toast.success("Gate Opened! Welcome to City Center Parking", { id: "qrScan" });
    }, 2000);
  };

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <div className="pt-20 flex">
        <Sidebar />

        <main className="flex-1 p-6 md:p-10 max-w-7xl">
          <div className="mb-8">
            <p className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
              SMART BARRIER GATE ACCESS
            </p>
            <h1 className="text-4xl font-black text-slate-900 mt-2 tracking-tight">
              QR Parking Entry & Exit Pass
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Hold your digital QR pass in front of the automatic optical barrier gate reader for contactless entry.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Digital Pass Card */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs relative">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {activePass.id}
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-2">{activePass.parkingName}</h2>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Assigned Slot</span>
                  <p className="text-2xl font-black text-emerald-600">{activePass.slot}</p>
                </div>
              </div>

              {/* Display QR Code */}
              <div className="text-center py-4">
                <div className="bg-emerald-50/50 p-6 rounded-3xl inline-block shadow-inner border-2 border-emerald-200 relative group">
                  <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-100">
                    <QrCode size={180} className="text-slate-900" />
                  </div>
                  <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition rounded-3xl flex items-center justify-center">
                    <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      Live Gate Code
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-semibold mt-4">Hold near the optical sensor at the entrance barrier</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100 text-xs">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5">
                  <span className="text-slate-400 font-semibold uppercase block">Vehicle Reg.</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block flex items-center gap-1">
                    <Car size={14} className="text-emerald-600" /> {activePass.vehicle}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5">
                  <span className="text-slate-400 font-semibold uppercase block">Entry Window</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block flex items-center gap-1">
                    <Clock size={14} className="text-emerald-600" /> {activePass.entryWindow}
                  </span>
                </div>
              </div>
            </div>

            {/* Gate Simulation Control */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Scan size={22} className="text-emerald-600" /> Entrance Gate Scanner Test
              </h3>

              <div className={`p-6 rounded-2xl border text-center transition-all ${
                gateStatus === "open"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                  : gateStatus === "scanning"
                  ? "bg-amber-50 border-amber-300 text-amber-800"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}>
                {gateStatus === "open" ? (
                  <div className="space-y-2">
                    <CheckCircle2 size={48} className="mx-auto text-emerald-600" />
                    <h4 className="text-2xl font-black text-slate-900">BARRIER GATE OPEN</h4>
                    <p className="text-xs text-emerald-700 font-bold">Welcome! Drive forward to Slot A-24</p>
                  </div>
                ) : gateStatus === "scanning" ? (
                  <div className="space-y-2 animate-pulse">
                    <Scan size={48} className="mx-auto text-amber-600" />
                    <h4 className="text-xl font-bold text-amber-900">Verifying License & QR Code...</h4>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <AlertCircle size={48} className="mx-auto text-slate-400" />
                    <h4 className="text-xl font-bold text-slate-800">Gate Closed</h4>
                    <p className="text-xs text-slate-500">Click below to simulate optical scanner verification</p>
                  </div>
                )}
              </div>

              <Button
                onClick={handleSimulateScan}
                className="w-full py-4 flex items-center justify-center gap-2 text-base font-extrabold shadow-md shadow-emerald-500/25"
              >
                <Scan size={20} />
                Simulate QR Scanner Entry
              </Button>

              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-xs text-slate-600 space-y-2">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-600" /> Automatic ANPR Camera Integration
                </p>
                <p className="leading-relaxed">
                  High-speed ANPR camera at the boom barrier verifies plate {activePass.vehicle} alongside this QR pass.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QREntry;
