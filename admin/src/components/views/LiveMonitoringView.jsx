import { useState, useEffect } from "react";
import {
  Activity, MapPin, Grid, RefreshCw, Zap, ShieldCheck,
  Car, Clock, Radio, CheckCircle2, XCircle, AlertTriangle,
  Search, Eye, Filter, ArrowUpRight, Wifi, Sparkles, Cpu,
  Maximize2, X, ChevronRight, Gauge
} from "lucide-react";
import toast from "react-hot-toast";

/* ─── Initial Parking Areas with All Slots & Sensor Data ─────── */
const ALL_AREAS = [
  {
    id: "cm",
    name: "City Mall Complex",
    location: "Saheed Nagar, Main Market",
    rate: 30,
    status: "Active",
    sensorHub: "HUB-CM-01 (Online)",
    signal: "99%",
    slots: [
      { id: "CM-01", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-CM-101", signalDbm: -41 },
      { id: "CM-02", status: "occupied", type: "standard", plate: "OR-02-B7821", inTime: "01:15 PM", duration: "2h 30m", sensorId: "US-CM-102", signalDbm: -39 },
      { id: "CM-03", status: "occupied", type: "standard", plate: "OD-05-AX992", inTime: "02:40 PM", duration: "1h 05m", sensorId: "US-CM-103", signalDbm: -44 },
      { id: "CM-04", status: "reserved", type: "standard", plate: "OD-33-K4410", inTime: "03:30 PM (Exp)", duration: "Reserved", sensorId: "US-CM-104", signalDbm: -40 },
      { id: "CM-05", status: "ev", type: "ev", plate: "OR-01-EV900", inTime: "11:20 AM", duration: "4h 25m", sensorId: "EV-CM-105", signalDbm: -38 },
      { id: "CM-06", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-CM-106", signalDbm: -42 },
      { id: "CM-07", status: "occupied", type: "standard", plate: "DL-01-CA1234", inTime: "03:00 PM", duration: "45m", sensorId: "US-CM-107", signalDbm: -45 },
      { id: "CM-08", status: "occupied", type: "standard", plate: "WB-02-PQ881", inTime: "12:50 PM", duration: "2h 55m", sensorId: "US-CM-108", signalDbm: -41 },
      { id: "CM-09", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-CM-109", signalDbm: -39 },
      { id: "CM-10", status: "occupied", type: "standard", plate: "OR-14-Y2319", inTime: "01:45 PM", duration: "2h 00m", sensorId: "US-CM-110", signalDbm: -43 },
      { id: "CM-11", status: "occupied", type: "standard", plate: "OD-02-M7711", inTime: "02:10 PM", duration: "1h 35m", sensorId: "US-CM-111", signalDbm: -40 },
      { id: "CM-12", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-CM-112", signalDbm: -42 },
    ],
  },
  {
    id: "at",
    name: "Airport Terminal 1",
    location: "Biju Patnaik Airport Road",
    rate: 50,
    status: "Active",
    sensorHub: "HUB-AT-02 (Online)",
    signal: "100%",
    slots: [
      { id: "AT-01", status: "occupied", type: "standard", plate: "OR-02-AA111", inTime: "08:30 AM", duration: "7h 15m", sensorId: "US-AT-201", signalDbm: -35 },
      { id: "AT-02", status: "occupied", type: "standard", plate: "MH-01-BT998", inTime: "09:10 AM", duration: "6h 35m", sensorId: "US-AT-202", signalDbm: -36 },
      { id: "AT-03", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-AT-203", signalDbm: -38 },
      { id: "AT-04", status: "reserved", type: "standard", plate: "KA-03-MR452", inTime: "04:00 PM (Exp)", duration: "Reserved", sensorId: "US-AT-204", signalDbm: -37 },
      { id: "AT-05", status: "ev", type: "ev", plate: "OR-02-EV101", inTime: "01:00 PM", duration: "2h 45m", sensorId: "EV-AT-205", signalDbm: -34 },
      { id: "AT-06", status: "occupied", type: "standard", plate: "TN-07-ZZ889", inTime: "10:15 AM", duration: "5h 30m", sensorId: "US-AT-206", signalDbm: -39 },
      { id: "AT-07", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-AT-207", signalDbm: -36 },
      { id: "AT-08", status: "occupied", type: "standard", plate: "OD-05-CC431", inTime: "11:45 AM", duration: "4h 00m", sensorId: "US-AT-208", signalDbm: -38 },
      { id: "AT-09", status: "occupied", type: "standard", plate: "TS-09-EF321", inTime: "12:15 PM", duration: "3h 30m", sensorId: "US-AT-209", signalDbm: -41 },
      { id: "AT-10", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-AT-210", signalDbm: -37 },
      { id: "AT-11", status: "reserved", type: "standard", plate: "OR-02-KK789", inTime: "04:15 PM (Exp)", duration: "Reserved", sensorId: "US-AT-211", signalDbm: -35 },
      { id: "AT-12", status: "occupied", type: "standard", plate: "HR-26-DG600", inTime: "02:00 PM", duration: "1h 45m", sensorId: "US-AT-212", signalDbm: -40 },
      { id: "AT-13", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-AT-213", signalDbm: -39 },
      { id: "AT-14", status: "occupied", type: "standard", plate: "OD-33-MM129", inTime: "02:30 PM", duration: "1h 15m", sensorId: "US-AT-214", signalDbm: -38 },
      { id: "AT-15", status: "occupied", type: "standard", plate: "WB-12-JJ982", inTime: "03:10 PM", duration: "35m", sensorId: "US-AT-215", signalDbm: -36 },
      { id: "AT-16", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-AT-216", signalDbm: -37 },
    ],
  },
  {
    id: "mn",
    name: "Metro Station North",
    location: "Master Canteen Square",
    rate: 25,
    status: "Active",
    sensorHub: "HUB-MN-03 (Online)",
    signal: "98%",
    slots: [
      { id: "MN-01", status: "occupied", type: "standard", plate: "OD-02-RR341", inTime: "09:00 AM", duration: "6h 45m", sensorId: "US-MN-301", signalDbm: -42 },
      { id: "MN-02", status: "occupied", type: "standard", plate: "OR-02-TT552", inTime: "09:40 AM", duration: "6h 05m", sensorId: "US-MN-302", signalDbm: -40 },
      { id: "MN-03", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-MN-303", signalDbm: -43 },
      { id: "MN-04", status: "occupied", type: "standard", plate: "OD-05-FF901", inTime: "10:30 AM", duration: "5h 15m", sensorId: "US-MN-304", signalDbm: -41 },
      { id: "MN-05", status: "occupied", type: "standard", plate: "OR-14-GH781", inTime: "11:15 AM", duration: "4h 30m", sensorId: "US-MN-305", signalDbm: -39 },
      { id: "MN-06", status: "reserved", type: "standard", plate: "OD-02-ZZ112", inTime: "04:30 PM (Exp)", duration: "Reserved", sensorId: "US-MN-306", signalDbm: -44 },
      { id: "MN-07", status: "occupied", type: "standard", plate: "WB-06-KK442", inTime: "01:20 PM", duration: "2h 25m", sensorId: "US-MN-307", signalDbm: -42 },
      { id: "MN-08", status: "occupied", type: "standard", plate: "OR-01-PP300", inTime: "02:00 PM", duration: "1h 45m", sensorId: "US-MN-308", signalDbm: -40 },
      { id: "MN-09", status: "occupied", type: "standard", plate: "OD-33-WW551", inTime: "02:45 PM", duration: "1h 00m", sensorId: "US-MN-309", signalDbm: -45 },
      { id: "MN-10", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-MN-310", signalDbm: -41 },
    ],
  },
  {
    id: "cmh",
    name: "Central Market Hub",
    location: "Unit 2 Market Complex",
    rate: 30,
    status: "Active",
    sensorHub: "HUB-CH-04 (Online)",
    signal: "97%",
    slots: [
      { id: "CH-01", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-CH-401", signalDbm: -45 },
      { id: "CH-02", status: "occupied", type: "standard", plate: "OD-02-XX901", inTime: "01:30 PM", duration: "2h 15m", sensorId: "US-CH-402", signalDbm: -43 },
      { id: "CH-03", status: "occupied", type: "standard", plate: "OR-02-BB210", inTime: "02:00 PM", duration: "1h 45m", sensorId: "US-CH-403", signalDbm: -44 },
      { id: "CH-04", status: "reserved", type: "standard", plate: "OR-14-VV512", inTime: "03:45 PM (Exp)", duration: "Reserved", sensorId: "US-CH-404", signalDbm: -41 },
      { id: "CH-05", status: "occupied", type: "standard", plate: "OD-05-LL888", inTime: "12:10 PM", duration: "3h 35m", sensorId: "US-CH-405", signalDbm: -46 },
      { id: "CH-06", status: "occupied", type: "standard", plate: "DL-08-CC321", inTime: "02:50 PM", duration: "55m", sensorId: "US-CH-406", signalDbm: -42 },
      { id: "CH-07", status: "occupied", type: "standard", plate: "WB-02-YY777", inTime: "03:15 PM", duration: "30m", sensorId: "US-CH-407", signalDbm: -44 },
      { id: "CH-08", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-CH-408", signalDbm: -43 },
    ],
  },
  {
    id: "tp",
    name: "Tech Park Block B",
    location: "Infocity IT Hub",
    rate: 40,
    status: "Active",
    sensorHub: "HUB-TP-05 (Online)",
    signal: "100%",
    slots: [
      { id: "TP-01", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-TP-501", signalDbm: -36 },
      { id: "TP-02", status: "occupied", type: "standard", plate: "KA-01-EE992", inTime: "09:30 AM", duration: "6h 15m", sensorId: "US-TP-502", signalDbm: -38 },
      { id: "TP-03", status: "occupied", type: "standard", plate: "OD-02-GG441", inTime: "10:00 AM", duration: "5h 45m", sensorId: "US-TP-503", signalDbm: -37 },
      { id: "TP-04", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-TP-504", signalDbm: -39 },
      { id: "TP-05", status: "ev", type: "ev", plate: "MH-12-EV777", inTime: "11:45 AM", duration: "4h 00m", sensorId: "EV-TP-505", signalDbm: -35 },
      { id: "TP-06", status: "occupied", type: "standard", plate: "OR-02-KK123", inTime: "01:10 PM", duration: "2h 35m", sensorId: "US-TP-506", signalDbm: -40 },
      { id: "TP-07", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-TP-507", signalDbm: -38 },
      { id: "TP-08", status: "reserved", type: "standard", plate: "TS-07-QQ555", inTime: "04:30 PM (Exp)", duration: "Reserved", sensorId: "US-TP-508", signalDbm: -37 },
      { id: "TP-09", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-TP-509", signalDbm: -36 },
      { id: "TP-10", status: "occupied", type: "standard", plate: "OD-33-AA901", inTime: "02:15 PM", duration: "1h 30m", sensorId: "US-TP-510", signalDbm: -39 },
    ],
  },
  {
    id: "rs",
    name: "Railway Station East",
    location: "Station Plaza Avenue",
    rate: 20,
    status: "Maintenance",
    sensorHub: "HUB-RS-06 (Restricted)",
    signal: "92%",
    slots: [
      { id: "RS-01", status: "occupied", type: "standard", plate: "OR-02-NN331", inTime: "11:00 AM", duration: "4h 45m", sensorId: "US-RS-601", signalDbm: -48 },
      { id: "RS-02", status: "occupied", type: "standard", plate: "OD-05-PP109", inTime: "12:30 PM", duration: "3h 15m", sensorId: "US-RS-602", signalDbm: -46 },
      { id: "RS-03", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-RS-603", signalDbm: -47 },
      { id: "RS-04", status: "occupied", type: "standard", plate: "WB-04-QQ892", inTime: "01:50 PM", duration: "1h 55m", sensorId: "US-RS-604", signalDbm: -49 },
      { id: "RS-05", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-RS-605", signalDbm: -46 },
      { id: "RS-06", status: "free", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-RS-606", signalDbm: -48 },
      { id: "RS-07", status: "maintenance", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-RS-607", signalDbm: -99 },
      { id: "RS-08", status: "maintenance", type: "standard", plate: null, inTime: null, duration: null, sensorId: "US-RS-608", signalDbm: -99 },
    ],
  },
];

/* ─── Recent Telemetry Activity Events ────────────────────────── */
const INITIAL_LOGS = [
  { id: 1, time: "Just now", area: "Airport Terminal 1", slot: "AT-08", type: "occupied", text: "Vehicle OR-02-AA111 detected by Ultrasonic Sensor" },
  { id: 2, time: "1 min ago", area: "City Mall Complex", slot: "CM-09", type: "free", text: "Vehicle departed. Slot CM-09 status changed to READY" },
  { id: 3, time: "3 mins ago", area: "Tech Park Block B", slot: "TP-05", type: "ev", text: "EV Vehicle MH-12-EV777 plugged in at fast charging bay" },
  { id: 4, time: "5 mins ago", area: "Metro Station North", slot: "MN-06", type: "reserved", text: "Reservation confirmed for OD-02-ZZ112 via Mobile App" },
  { id: 5, time: "8 mins ago", area: "Central Market Hub", slot: "CH-03", type: "occupied", text: "Barrier gate entry: OR-02-BB210 routed to slot CH-03" },
];

/* ─── Status Visual Styles ────────────────────────────────────── */
const STATUS_THEMES = {
  free: {
    bg: "bg-emerald-500/10 hover:bg-emerald-500/20",
    border: "border-emerald-500/40",
    text: "text-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    label: "AVAILABLE",
    dot: "bg-emerald-400",
    ring: "ring-emerald-500/40",
  },
  occupied: {
    bg: "bg-rose-500/10 hover:bg-rose-500/20",
    border: "border-rose-500/40",
    text: "text-rose-400",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    label: "OCCUPIED",
    dot: "bg-rose-500",
    ring: "ring-rose-500/40",
  },
  reserved: {
    bg: "bg-amber-500/10 hover:bg-amber-500/20",
    border: "border-amber-500/40",
    text: "text-amber-400",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    label: "RESERVED",
    dot: "bg-amber-400",
    ring: "ring-amber-500/40",
  },
  ev: {
    bg: "bg-cyan-500/10 hover:bg-cyan-500/20",
    border: "border-cyan-500/40",
    text: "text-cyan-400",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    label: "EV CHARGING",
    dot: "bg-cyan-400",
    ring: "ring-cyan-500/40",
  },
  maintenance: {
    bg: "bg-slate-500/10 hover:bg-slate-500/20",
    border: "border-slate-500/30",
    text: "text-slate-400",
    badge: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    label: "OFFLINE",
    dot: "bg-slate-500",
    ring: "ring-slate-500/30",
  },
};

const LiveMonitoringView = () => {
  const [areas, setAreas] = useState(ALL_AREAS);
  const [selectedAreaFilter, setSelectedAreaFilter] = useState("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSlotData, setSelectedSlotData] = useState(null);
  const [telemetryLogs, setTelemetryLogs] = useState(INITIAL_LOGS);
  const [lastSyncedTime, setLastSyncedTime] = useState(new Date().toLocaleTimeString());
  const [isSimulating, setIsSimulating] = useState(false);

  // Compute System-Wide Totals across ALL areas
  const allSlotsFlat = areas.flatMap((a) => a.slots);
  const totalSlotsCount = allSlotsFlat.length;
  const totalFree = allSlotsFlat.filter((s) => s.status === "free").length;
  const totalOccupied = allSlotsFlat.filter((s) => s.status === "occupied").length;
  const totalReserved = allSlotsFlat.filter((s) => s.status === "reserved").length;
  const totalEV = allSlotsFlat.filter((s) => s.status === "ev").length;
  const totalMaintenance = allSlotsFlat.filter((s) => s.status === "maintenance").length;
  const overallOccupancyPct = Math.round(((totalOccupied + totalReserved + totalEV) / (totalSlotsCount - totalMaintenance)) * 100);

  // Toggle or Simulate Slot State
  const toggleSlot = (areaId, slotId) => {
    setAreas((prev) =>
      prev.map((area) => {
        if (area.id !== areaId) return area;
        return {
          ...area,
          slots: area.slots.map((s) => {
            if (s.id !== slotId) return s;
            let nextStatus = "free";
            let newPlate = null;
            let newTime = null;
            let newDur = null;

            if (s.status === "free") {
              nextStatus = "occupied";
              newPlate = `OD-02-X${Math.floor(1000 + Math.random() * 8999)}`;
              newTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
              newDur = "Just parked";
            } else if (s.status === "occupied") {
              nextStatus = "reserved";
              newPlate = s.plate || `OR-01-BK${Math.floor(100 + Math.random() * 899)}`;
              newTime = "Upcoming (30m)";
              newDur = "Reserved";
            } else if (s.status === "reserved") {
              nextStatus = "ev";
              newPlate = `MH-02-EV${Math.floor(100 + Math.random() * 899)}`;
              newTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
              newDur = "Charging";
            } else {
              nextStatus = "free";
            }

            const updatedSlot = {
              ...s,
              status: nextStatus,
              plate: newPlate,
              inTime: newTime,
              duration: newDur,
            };

            // If modal is open for this slot, update it too
            if (selectedSlotData && selectedSlotData.slot.id === slotId) {
              setSelectedSlotData({ area, slot: updatedSlot });
            }

            // Push to telemetry log
            setTelemetryLogs((logs) => [
              {
                id: Date.now(),
                time: "Just now",
                area: area.name,
                slot: slotId,
                type: nextStatus,
                text: `Sensor trigger: Slot ${slotId} state shifted to ${nextStatus.toUpperCase()} ${newPlate ? `(${newPlate})` : ""}`,
              },
              ...logs.slice(0, 7),
            ]);

            toast.success(`Sensor Update: ${area.name} [${slotId}] is now ${nextStatus.toUpperCase()}`, {
              style: { background: "#0D1B2A", color: "#38bdf8", border: "1px solid rgba(56, 189, 248, 0.3)" },
            });

            return updatedSlot;
          }),
        };
      })
    );
    setLastSyncedTime(new Date().toLocaleTimeString());
  };

  // Simulate Instant IoT Network Refresh
  const handleSimulatePulse = () => {
    setIsSimulating(true);
    setLastSyncedTime(new Date().toLocaleTimeString());
    // Pick a random area and slot to toggle
    const randomArea = areas[Math.floor(Math.random() * areas.length)];
    const validSlots = randomArea.slots.filter((s) => s.status !== "maintenance");
    const randomSlot = validSlots[Math.floor(Math.random() * validSlots.length)];

    setTimeout(() => {
      toggleSlot(randomArea.id, randomSlot.id);
      setIsSimulating(false);
      toast.success("IoT Mesh network synced across all parking areas", { icon: "📡" });
    }, 400);
  };

  // Filter Areas
  const displayedAreas = areas
    .filter((area) => (selectedAreaFilter === "all" ? true : area.id === selectedAreaFilter))
    .filter((area) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        area.name.toLowerCase().includes(q) ||
        area.location.toLowerCase().includes(q) ||
        area.slots.some((s) => s.id.toLowerCase().includes(q) || (s.plate && s.plate.toLowerCase().includes(q)))
      );
    });

  return (
    <div className="space-y-8 pb-12">
      {/* ─── Top Luxury Header ───────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0D1B2A] via-[#10233a] to-[#0A1624] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Glow Ambient Blobs */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/15 border border-emerald-500/40 text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                LIVE REAL-TIME TELEMETRY
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/5 border border-white/10 text-slate-300">
                <Radio size={13} className="text-cyan-400 animate-pulse" />
                6 Parking Facilities Connected
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Synced: {lastSyncedTime}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <Activity className="text-emerald-400" size={30} />
              All Parking Areas Live Monitoring
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Centralized ultrasonic IoT sensor grid & camera telemetry monitoring all parking lots in real-time.
              Click any slot to inspect live vehicle, sensor telemetry, and simulate instant occupancy updates.
            </p>
          </div>

          {/* Action Button & Live Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSimulatePulse}
              disabled={isSimulating}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={15} className={isSimulating ? "animate-spin" : ""} />
              Simulate IoT Feed
            </button>
          </div>
        </div>
      </div>

      {/* ─── Global System HUD Overview (All Areas Combined) ───── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Areas */}
        <div className="bg-[#0D1B2A]/90 border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-cyan-500/30 transition-all shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Areas</span>
            <MapPin size={18} className="text-cyan-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-white">{areas.length}</div>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              5 Active • 1 Maint.
            </span>
          </div>
        </div>

        {/* Total Slots */}
        <div className="bg-[#0D1B2A]/90 border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-500/30 transition-all shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Slots</span>
            <Grid size={18} className="text-slate-300" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-white">{totalSlotsCount}</div>
            <span className="text-[10px] text-slate-400 font-semibold mt-1 block">Across all facilities</span>
          </div>
        </div>

        {/* Free / Available */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-2xl flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-lg">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Available</span>
            <CheckCircle2 size={18} className="text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-emerald-400">{totalFree}</div>
            <span className="text-[10px] text-emerald-300 font-semibold mt-1 block">Ready for entry</span>
          </div>
        </div>

        {/* Occupied */}
        <div className="bg-rose-500/10 border border-rose-500/30 p-5 rounded-2xl flex flex-col justify-between hover:border-rose-500/50 transition-all shadow-lg">
          <div className="flex items-center justify-between text-rose-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Occupied</span>
            <Car size={18} className="text-rose-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-rose-400">{totalOccupied}</div>
            <span className="text-[10px] text-rose-300 font-semibold mt-1 block">Active parking sessions</span>
          </div>
        </div>

        {/* Reserved */}
        <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl flex flex-col justify-between hover:border-amber-500/50 transition-all shadow-lg">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Reserved</span>
            <Clock size={18} className="text-amber-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-amber-400">{totalReserved}</div>
            <span className="text-[10px] text-amber-300 font-semibold mt-1 block">Pre-booked arriving</span>
          </div>
        </div>

        {/* System Occupancy */}
        <div className="bg-gradient-to-br from-indigo-500/15 to-purple-500/15 border border-indigo-500/30 p-5 rounded-2xl flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-lg">
          <div className="flex items-center justify-between text-indigo-300">
            <span className="text-[11px] font-bold uppercase tracking-wider">Occupancy Rate</span>
            <Gauge size={18} className="text-indigo-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-indigo-200">{overallOccupancyPct}%</div>
            <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallOccupancyPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Control Bar: Area Filter Tabs & Search ──────────────── */}
      <div className="bg-[#0D1B2A] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        {/* Area Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1.5">
            <Filter size={13} />
            Filter Areas:
          </span>
          <button
            onClick={() => setSelectedAreaFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedAreaFilter === "all"
                ? "bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20"
                : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            All Areas ({areas.length})
          </button>
          {areas.map((area) => (
            <button
              key={area.id}
              onClick={() => setSelectedAreaFilter(area.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedAreaFilter === area.id
                  ? "bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              {area.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search slot (e.g. AT-04, CM-02) or plate..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
          />
        </div>
      </div>

      {/* ─── ALL PARKING AREAS LIVE GRID DISPLAY ─────────────────── */}
      <div className="space-y-8">
        {displayedAreas.map((area) => {
          const areaFree = area.slots.filter((s) => s.status === "free").length;
          const areaOccupied = area.slots.filter((s) => s.status === "occupied").length;
          const areaReserved = area.slots.filter((s) => s.status === "reserved").length;
          const areaEV = area.slots.filter((s) => s.status === "ev").length;
          const areaMaint = area.slots.filter((s) => s.status === "maintenance").length;
          const occPct = Math.round(((areaOccupied + areaReserved + areaEV) / (area.slots.length - areaMaint || 1)) * 100);

          return (
            <div
              key={area.id}
              className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden transition-all hover:border-white/20"
            >
              {/* Subtle Area Ambient Glow */}
              <div className="absolute top-0 right-0 w-80 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Area Header Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                      <MapPin size={22} className="text-emerald-400" />
                      {area.name}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        area.status === "Active"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                          : "bg-amber-500/20 text-amber-400 border-amber-500/40"
                      }`}
                    >
                      {area.status}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full font-mono">
                      <Wifi size={11} /> {area.sensorHub}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <span>{area.location}</span>
                    <span>•</span>
                    <span className="text-slate-300 font-bold">₹{area.rate}/hr</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">Signal: {area.signal}</span>
                  </p>
                </div>

                {/* Area Quick Stats & Live Bar */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Occupancy Indicator */}
                  <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl min-w-[140px]">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase mb-1">
                      <span>Occupancy</span>
                      <span className="text-white font-mono">{occPct}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          occPct > 85 ? "bg-rose-500" : occPct > 60 ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${occPct}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 text-right">
                      {areaOccupied + areaReserved + areaEV} / {area.slots.length} Slots
                    </div>
                  </div>

                  {/* Stat Badges */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      {areaFree} Free
                    </span>
                    <span className="px-2.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      {areaOccupied} Occ
                    </span>
                    <span className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      {areaReserved} Res
                    </span>
                    {areaEV > 0 && (
                      <span className="px-2.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold flex items-center gap-1.5">
                        <Zap size={12} className="text-cyan-400" />
                        {areaEV} EV
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* ─── Real-Time 2D Slots Grid for this Area ────── */}
              <div className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Grid size={14} className="text-slate-400" />
                    Live Floor Slots Telemetry ({area.slots.length} Sensor Nodes)
                  </span>
                  <span className="text-[11px] text-slate-500 italic">Click any slot to inspect / toggle</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
                  {area.slots.map((slot) => {
                    const theme = STATUS_THEMES[slot.status] || STATUS_THEMES.free;

                    return (
                      <div
                        key={slot.id}
                        onClick={() => setSelectedSlotData({ area, slot })}
                        className={`group relative p-3 sm:p-4 rounded-2xl border ${theme.bg} ${theme.border} transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col justify-between min-h-[120px]`}
                      >
                        {/* Slot Header: ID & Live Radar Dot */}
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-black font-mono text-white tracking-wider flex items-center gap-1.5">
                            {slot.id}
                            {slot.type === "ev" && <Zap size={13} className="text-cyan-400 fill-cyan-400" />}
                          </span>
                          <span className="relative flex h-2 w-2">
                            {slot.status === "occupied" && (
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                            )}
                            {slot.status === "free" && (
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                            )}
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.dot}`} />
                          </span>
                        </div>

                        {/* Status Label */}
                        <div className="my-2">
                          <span className={`text-[10px] font-black uppercase tracking-wider block ${theme.text}`}>
                            {theme.label}
                          </span>
                          {slot.duration && (
                            <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <Clock size={10} />
                              {slot.duration}
                            </span>
                          )}
                        </div>

                        {/* License Plate or Ready State */}
                        <div className="w-full pt-1 border-t border-white/5">
                          {slot.plate ? (
                            <div className="bg-slate-950/80 px-2 py-1 rounded text-[10px] font-mono font-bold text-slate-200 border border-white/10 truncate text-center flex items-center justify-center gap-1">
                              <Car size={10} className="text-slate-400 shrink-0" />
                              <span className="truncate">{slot.plate}</span>
                            </div>
                          ) : slot.status === "maintenance" ? (
                            <div className="text-[10px] font-bold text-slate-500 text-center uppercase">Offline</div>
                          ) : (
                            <div className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-[10px] font-bold text-center border border-emerald-500/30">
                              READY
                            </div>
                          )}
                        </div>

                        {/* Quick Hover Inspect Overlay */}
                        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSlotData({ area, slot });
                            }}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                            title="Inspect Telemetry"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSlot(area.id, slot.id);
                            }}
                            className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold"
                            title="Toggle Status"
                          >
                            <RefreshCw size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Real-Time IoT Sensor Telemetry Stream (Bottom Live Log) ─ */}
      <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu size={20} className="text-cyan-400 animate-pulse" />
              Live Sensor Event Stream (All Parking Facilities)
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Continuous WebSocket event triggers from edge gateways across all areas.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            IoT Broker: Connected (MQTT: 1883)
          </span>
        </div>

        <div className="mt-4 space-y-2.5">
          {telemetryLogs.map((log) => (
            <div
              key={log.id}
              className="bg-white/5 border border-white/5 hover:border-white/15 p-3 sm:p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded text-[11px]">
                  {log.time}
                </span>
                <span className="font-bold text-white">{log.area}</span>
                <span className="font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {log.slot}
                </span>
                <span className="text-slate-300">{log.text}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono shrink-0">Latency: 14ms</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── LIVE SLOT DETAIL TELEMETRY MODAL ───────────────────────── */}
      {selectedSlotData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0D1B2A] border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSlotData(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  {selectedSlotData.area.name}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-[11px] font-mono text-slate-400">
                  {selectedSlotData.area.location}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white flex items-center gap-3">
                Slot {selectedSlotData.slot.id}
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                    STATUS_THEMES[selectedSlotData.slot.status]?.badge || ""
                  }`}
                >
                  {selectedSlotData.slot.status}
                </span>
              </h3>
            </div>

            {/* Telemetry Card */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <span className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Sensor Node</span>
                <span className="font-mono text-white font-bold">{selectedSlotData.slot.sensorId}</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <span className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Signal Strength</span>
                <span className="font-mono text-emerald-400 font-bold">{selectedSlotData.slot.signalDbm} dBm (Optimal)</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <span className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Slot Category</span>
                <span className="font-bold text-white uppercase">{selectedSlotData.slot.type}</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <span className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Hourly Parking Fee</span>
                <span className="font-bold text-white">₹{selectedSlotData.area.rate}/hr</span>
              </div>
            </div>

            {/* Vehicle Details if Occupied/Reserved */}
            {selectedSlotData.slot.plate ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Car size={15} className="text-emerald-400" />
                  Vehicle & Session Information
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">License Plate</span>
                    <span className="font-mono font-bold text-white text-sm bg-slate-950 px-2 py-0.5 rounded inline-block mt-0.5">
                      {selectedSlotData.slot.plate}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Entry Time</span>
                    <span className="font-bold text-slate-200">{selectedSlotData.slot.inTime || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Duration Active</span>
                    <span className="font-bold text-slate-200">{selectedSlotData.slot.duration || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Current Accrued Fee</span>
                    <span className="font-bold text-emerald-400">
                      ₹{Math.max(selectedSlotData.area.rate, selectedSlotData.area.rate * 2)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center">
                <CheckCircle2 size={24} className="text-emerald-400 mx-auto mb-1" />
                <div className="text-sm font-bold text-emerald-300">Slot is Free & Ready</div>
                <p className="text-xs text-emerald-400/80 mt-0.5">
                  Ultrasonic sensor confirms no obstruction detected in slot.
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => toggleSlot(selectedSlotData.area.id, selectedSlotData.slot.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition cursor-pointer"
              >
                <RefreshCw size={14} />
                Toggle / Simulate State
              </button>

              <button
                onClick={() => setSelectedSlotData(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer"
              >
                Close Telemetry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveMonitoringView;
