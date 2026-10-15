import { useState, useEffect } from "react";
import {
  MapPin, Plus, Grid, CheckCircle2, XCircle, Clock,
  Edit, Trash2, DollarSign, AlertCircle, Car, User,
  Phone, Calendar, ArrowLeft, X, Zap, Shield,
  Timer, CreditCard, Info, ChevronRight, Wrench
} from "lucide-react";
import toast from "react-hot-toast";

/* ─── Mock Data ────────────────────────────────────────────────── */
const initialAreas = [
  { id: 1, name: "City Mall Complex",    location: "Saheed Nagar, Main Market",    totalSlots: 12, freeSlots: 4,  occupied: 7,  reserved: 1, rate: 30, status: "Active" },
  { id: 2, name: "Airport Terminal 1",   location: "Biju Patnaik Airport Road",    totalSlots: 16, freeSlots: 5,  occupied: 9,  reserved: 2, rate: 50, status: "Active" },
  { id: 3, name: "Metro Station North",  location: "Master Canteen Square",        totalSlots: 10, freeSlots: 2,  occupied: 7,  reserved: 1, rate: 25, status: "Active" },
  { id: 4, name: "Central Market Hub",   location: "Unit 2 Market Complex",        totalSlots: 8,  freeSlots: 2,  occupied: 5,  reserved: 1, rate: 30, status: "Active" },
  { id: 5, name: "Tech Park Block B",    location: "Infocity IT Hub",              totalSlots: 10, freeSlots: 5,  occupied: 4,  reserved: 1, rate: 40, status: "Active" },
  { id: 6, name: "Railway Station East", location: "Station Plaza Avenue",         totalSlots: 8,  freeSlots: 3,  occupied: 3,  reserved: 0, rate: 20, status: "Maintenance" },
];

const VEHICLE_TYPES = ["Car", "Bike", "SUV", "Truck", "EV"];
const OWNER_NAMES   = ["Rahul Sharma", "Priya Patel", "Arun Kumar", "Sneha Roy", "Vikram Singh", "Meera Nair", "Deepak Joshi", "Anita Desai"];
const CONTACTS      = ["9876543210", "9123456780", "8765432109", "9345678901", "7654321098", "9012345678", "8901234567", "7890123456"];

const makeEntryTime = (hoursAgo) => {
  const d = new Date(Date.now() - hoursAgo * 3600000);
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
};
const makeExitTime = (hoursFromNow) => {
  const d = new Date(Date.now() + hoursFromNow * 3600000);
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
};
const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const generateSlotsForArea = (area) => {
  const total = area.totalSlots;
  const prefix = area.name.substring(0, 2).toUpperCase();
  return Array.from({ length: total }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    const id  = `${prefix}-${num}`;

    // Determine status by position
    let status;
    if (i < area.freeSlots)                              status = "available";
    else if (i < area.freeSlots + area.reserved)         status = "reserved";
    else if (i === total - 1 && area.status === "Maintenance") status = "maintenance";
    else                                                  status = "occupied";

    if (status === "available" || status === "maintenance") {
      return { id, slotNumber: num, status, vehicle: null };
    }

    const ri          = i % OWNER_NAMES.length;
    const hoursIn     = (i % 4) + 1;
    const hoursOut    = (i % 3) + 1;
    const ratePerHour = area.rate;
    const fee         = Math.round(hoursIn * ratePerHour);

    return {
      id,
      slotNumber: num,
      status,
      vehicle: {
        vehicleNumber: `OR-0${(i % 9) + 1}-X${1000 + i}`,
        vehicleType:   VEHICLE_TYPES[i % VEHICLE_TYPES.length],
        ownerName:     OWNER_NAMES[ri],
        contact:       CONTACTS[ri],
        entryTime:     makeEntryTime(hoursIn),
        entryDate:     today,
        expectedExit:  makeExitTime(hoursOut),
        bookingId:     `BK-${100000 + i}`,
        bookingType:   status === "reserved" ? "Pre-booked" : "Walk-in",
        duration:      `${hoursIn}h ${(i * 7) % 60}m`,
        fee:           `₹${fee}`,
        ratePerHour:   `₹${ratePerHour}/hr`,
      },
    };
  });
};

/* ─── Status Config ────────────────────────────────────────────── */
const STATUS_CFG = {
  available:   { color: "text-emerald-400", bg: "bg-emerald-500/10",  border: "border-emerald-500/40",  label: "Available",   dot: "bg-emerald-500",  icon: CheckCircle2 },
  occupied:    { color: "text-rose-400",    bg: "bg-rose-500/10",     border: "border-rose-500/40",     label: "Occupied",    dot: "bg-rose-500",     icon: XCircle      },
  reserved:    { color: "text-amber-400",   bg: "bg-amber-500/10",    border: "border-amber-500/40",    label: "Reserved",    dot: "bg-amber-500",    icon: Clock        },
  maintenance: { color: "text-slate-400",   bg: "bg-slate-500/10",    border: "border-slate-500/40",    label: "Maintenance", dot: "bg-slate-500",    icon: Wrench       },
};

/* ═══════════════════════════════════════════════════════════════ */
const ParkingMgmtView = () => {
  const [areas, setAreas]               = useState(initialAreas);
  const [selectedArea, setSelectedArea] = useState(null);   // null = show area grid
  const [areaSlots, setAreaSlots]       = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);   // null = no modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newArea, setNewArea]           = useState({ name: "", location: "", totalSlots: 10, rate: 30 });

  // Generate slots whenever selected area changes
  useEffect(() => {
    if (selectedArea) setAreaSlots(generateSlotsForArea(selectedArea));
  }, [selectedArea]);

  const handleSelectArea = (area) => {
    setSelectedArea(area);
    setSelectedSlot(null);
  };

  const handleBackToAreas = () => {
    setSelectedArea(null);
    setSelectedSlot(null);
  };

  const handleAddArea = (e) => {
    e.preventDefault();
    if (!newArea.name || !newArea.location) { toast.error("Please fill all required fields"); return; }
    const total = Number(newArea.totalSlots);
    const created = {
      id: Date.now(), name: newArea.name, location: newArea.location,
      totalSlots: total, freeSlots: total, occupied: 0, reserved: 0,
      rate: Number(newArea.rate), status: "Active",
    };
    setAreas([...areas, created]);
    setShowAddModal(false);
    toast.success(`Parking Area '${newArea.name}' added!`);
    setNewArea({ name: "", location: "", totalSlots: 10, rate: 30 });
  };

  /* ── Stat bar for area cards ── */
  const occPct = (a) => Math.round((a.occupied / a.totalSlots) * 100);

  return (
    <div className="space-y-8">

      {/* ═══════ VIEW 1 — Parking Areas Grid ═══════ */}
      {!selectedArea && (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 shadow-xl">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <MapPin className="text-emerald-400" size={22} />
                Parking Areas Management
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Click on any parking area to view and manage its individual slots.
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition flex items-center gap-2 text-xs shadow-lg shadow-emerald-500/20"
            >
              <Plus size={16} /> Add Parking Area
            </button>
          </div>

          {/* Area Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area) => {
              const pct = occPct(area);
              return (
                <div
                  key={area.id}
                  onClick={() => handleSelectArea(area)}
                  className="group bg-[#0D1B2A] border border-white/10 hover:border-emerald-500/50 rounded-3xl p-6 cursor-pointer transition-all shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Top glow on hover */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/40 transition-all duration-500" />

                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-base font-black text-white group-hover:text-emerald-300 transition">{area.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <MapPin size={10} /> {area.location}
                      </p>
                    </div>
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${
                      area.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    }`}>
                      {area.status}
                    </span>
                  </div>

                  {/* Slot counts */}
                  <div className="grid grid-cols-4 gap-1 bg-white/5 border border-white/5 p-3 rounded-2xl mb-4 text-center">
                    {[
                      { label: "Total",    val: area.totalSlots, cls: "text-white" },
                      { label: "Free",     val: area.freeSlots,  cls: "text-emerald-400" },
                      { label: "Occupied", val: area.occupied,   cls: "text-rose-400" },
                      { label: "Reserved", val: area.reserved,   cls: "text-amber-400" },
                    ].map(({ label, val, cls }) => (
                      <div key={label}>
                        <span className="text-[9px] text-slate-400 block uppercase tracking-wider">{label}</span>
                        <span className={`text-base font-extrabold ${cls}`}>{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Occupancy bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1.5">
                      <span>Occupancy</span>
                      <span className={pct > 80 ? "text-rose-400 font-bold" : pct > 50 ? "text-amber-400 font-bold" : "text-emerald-400 font-bold"}>{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          background: pct > 80 ? "linear-gradient(90deg,#f43f5e,#ef4444)" : pct > 50 ? "linear-gradient(90deg,#f59e0b,#fbbf24)" : "linear-gradient(90deg,#10b981,#06b6d4)"
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-white/10 text-xs">
                    <span className="text-slate-400">Rate: <strong className="text-white">₹{area.rate}/hr</strong></span>
                    <div className="flex items-center gap-2">
                      <button onClick={e => { e.stopPropagation(); toast.success(`Editing ${area.name}`); }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10">
                        <Edit size={13} />
                      </button>
                      <button onClick={e => { e.stopPropagation(); setAreas(areas.filter(a => a.id !== area.id)); toast.error(`Removed ${area.name}`); }}
                        className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10">
                        <Trash2 size={13} />
                      </button>
                      <span className="flex items-center gap-1 text-emerald-400 font-bold text-[10px] group-hover:gap-2 transition-all">
                        View Slots <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ═══════ VIEW 2 — Slot Grid for Selected Area ═══════ */}
      {selectedArea && (
        <div className="space-y-6">
          {/* Breadcrumb / Back */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToAreas}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span className="hover:text-emerald-400 cursor-pointer" onClick={handleBackToAreas}>All Areas</span>
                  <ChevronRight size={12} />
                  <span className="text-white font-bold">{selectedArea.name}</span>
                </div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Grid size={20} className="text-emerald-400" />
                  Slot Layout — {selectedArea.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedArea.location} • ₹{selectedArea.rate}/hr</p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 text-xs font-bold">
              {Object.entries(STATUS_CFG).map(([key, cfg]) => (
                <span key={key} className={`flex items-center gap-1.5 ${cfg.color}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </span>
              ))}
            </div>
          </div>

          {/* Summary mini-stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Slots",  val: selectedArea.totalSlots, color: "text-white",         icon: Grid },
              { label: "Available",   val: selectedArea.freeSlots,  color: "text-emerald-400",    icon: CheckCircle2 },
              { label: "Occupied",    val: selectedArea.occupied,   color: "text-rose-400",       icon: XCircle },
              { label: "Reserved",    val: selectedArea.reserved,   color: "text-amber-400",      icon: Clock },
            ].map(({ label, val, color, icon: Icon }) => (
              <div key={label} className="bg-[#0D1B2A] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                <Icon size={20} className={color} />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{label}</p>
                  <p className={`text-2xl font-black font-mono ${color}`}>{val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Slot Grid — click for details */}
          <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <p className="text-xs text-slate-400 mb-5 flex items-center gap-1.5">
              <Info size={13} className="text-emerald-400" />
              Click on any slot to view complete vehicle & booking details.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-3">
              {areaSlots.map((slot) => {
                const cfg = STATUS_CFG[slot.status];
                const Icon = cfg.icon;
                return (
                  <button
                    key={slot.id}
                    onClick={() => slot.status !== "available" && setSelectedSlot(slot)}
                    className={`relative p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all duration-200 ${cfg.bg} ${cfg.border} ${cfg.color} ${
                      slot.status === "available" || slot.status === "maintenance"
                        ? "cursor-default opacity-60"
                        : "hover:scale-105 hover:shadow-lg cursor-pointer hover:brightness-125"
                    }`}
                  >
                    <Icon size={16} className="mb-0.5" />
                    <span className="font-mono font-black text-sm">{slot.id}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">{cfg.label}</span>
                    {slot.vehicle && (
                      <span className="text-[8px] font-mono opacity-60 mt-0.5 truncate max-w-full px-1">
                        {slot.vehicle.vehicleNumber}
                      </span>
                    )}
                    {/* occupied/reserved — small dot indicator */}
                    {(slot.status === "occupied" || slot.status === "reserved") && (
                      <span className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══════ MODAL — Slot / Vehicle Detail ═══════ */}
      {selectedSlot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={() => setSelectedSlot(null)}
        >
          <div
            className="bg-[#0B1525] border border-white/10 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
            style={{ boxShadow: "0 30px 80px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(16,185,129,0.08)" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative px-6 pt-6 pb-4 border-b border-white/10 overflow-hidden">
              <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${STATUS_CFG[selectedSlot.status].bg} border ${STATUS_CFG[selectedSlot.status].border}`}>
                    {(() => { const I = STATUS_CFG[selectedSlot.status].icon; return <I size={20} className={STATUS_CFG[selectedSlot.status].color} />; })()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-white">Slot {selectedSlot.id}</h3>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider border ${STATUS_CFG[selectedSlot.status].bg} ${STATUS_CFG[selectedSlot.status].color} ${STATUS_CFG[selectedSlot.status].border}`}>
                        {STATUS_CFG[selectedSlot.status].label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{selectedArea.name} · {selectedArea.location}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedSlot(null)} className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Vehicle Details */}
            {selectedSlot.vehicle ? (
              <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">

                {/* Vehicle Identity */}
                <Section title="Vehicle Information" icon={Car} color="text-emerald-400">
                  <Row icon={Car}    label="Vehicle Number" value={selectedSlot.vehicle.vehicleNumber} mono highlight />
                  <Row icon={Zap}    label="Vehicle Type"   value={selectedSlot.vehicle.vehicleType} />
                  <Row icon={User}   label="Owner Name"     value={selectedSlot.vehicle.ownerName} />
                  <Row icon={Phone}  label="Contact"        value={selectedSlot.vehicle.contact} mono />
                </Section>

                {/* Booking Info */}
                <Section title="Booking Details" icon={CreditCard} color="text-sky-400">
                  <Row icon={Shield}   label="Booking ID"   value={selectedSlot.vehicle.bookingId} mono />
                  <Row icon={Info}     label="Booking Type" value={selectedSlot.vehicle.bookingType} />
                  <Row icon={Calendar} label="Entry Date"   value={selectedSlot.vehicle.entryDate} />
                  <Row icon={Clock}    label="Entry Time"   value={selectedSlot.vehicle.entryTime} mono />
                  <Row icon={Timer}    label="Expected Exit" value={selectedSlot.vehicle.expectedExit} mono />
                  <Row icon={Clock}    label="Duration So Far" value={selectedSlot.vehicle.duration} highlight />
                </Section>

                {/* Fees */}
                <Section title="Parking Fee" icon={DollarSign} color="text-amber-400">
                  <Row icon={DollarSign} label="Rate"        value={selectedSlot.vehicle.ratePerHour} />
                  <Row icon={DollarSign} label="Current Fee" value={selectedSlot.vehicle.fee} highlight mono />
                </Section>

                {/* Admin Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => { toast.success(`Slot ${selectedSlot.id} marked for maintenance`); setSelectedSlot(null); }}
                    className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <Wrench size={13} /> Maintenance
                  </button>
                  <button
                    onClick={() => { toast.success(`Session ended for ${selectedSlot.vehicle.vehicleNumber}`); setSelectedSlot(null); }}
                    className="flex-1 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-400 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <XCircle size={13} /> End Session
                  </button>
                  <button
                    onClick={() => { toast.success(`Receipt for ${selectedSlot.vehicle.bookingId} exported`); }}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <CreditCard size={13} /> Receipt
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-6 py-10 text-center text-slate-400">
                <CheckCircle2 size={40} className="mx-auto mb-3 text-emerald-400 opacity-50" />
                <p className="font-bold text-white">Slot is {STATUS_CFG[selectedSlot.status].label}</p>
                <p className="text-xs mt-1">No vehicle is currently parked in this slot.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════ MODAL — Add Parking Area ═══════ */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><Plus size={18} className="text-emerald-400" /> Add New Parking Area</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition"><X size={16} /></button>
            </div>
            <form onSubmit={handleAddArea} className="space-y-4">
              {[
                { label: "Area Name",       key: "name",       placeholder: "e.g. Forum Galleria Mall", type: "text" },
                { label: "Location Address",key: "location",   placeholder: "e.g. Janpath Road, Unit 3", type: "text" },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">{label}</label>
                  <input type={type} placeholder={placeholder} value={newArea[key]}
                    onChange={e => setNewArea({ ...newArea, [key]: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500 transition" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Total Slots", key: "totalSlots" },
                  { label: "Hourly Rate (₹)", key: "rate" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">{label}</label>
                    <input type="number" value={newArea[key]}
                      onChange={e => setNewArea({ ...newArea, [key]: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500 transition" />
                  </div>
                ))}
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-3 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-sm font-bold transition">Cancel</button>
                <button type="submit"
                  className="w-1/2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition shadow-lg shadow-emerald-500/20">Create Area</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Helper Components ─────────────────────────────────────────── */
const Section = ({ title, icon: Icon, color, children }) => (
  <div>
    <h4 className={`text-xs font-black uppercase tracking-widest ${color} flex items-center gap-1.5 mb-3`}>
      <Icon size={13} /> {title}
    </h4>
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl divide-y divide-white/[0.06] overflow-hidden">
      {children}
    </div>
  </div>
);

const Row = ({ icon: Icon, label, value, mono, highlight }) => (
  <div className="flex items-center justify-between px-4 py-2.5 gap-4">
    <span className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
      <Icon size={12} className="text-slate-500" /> {label}
    </span>
    <span className={`text-xs font-bold text-right truncate ${mono ? "font-mono" : ""} ${highlight ? "text-emerald-300" : "text-white"}`}>
      {value}
    </span>
  </div>
);

export default ParkingMgmtView;
