import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  CarFront,
  Clock3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../../components/layout/Navbar";
import ParkingCard from "../../components/parking/ParkingCard";

const parkingData = [
  {
    id: 1,
    name: "Smart Parking A",
    location: "Unit 4, Bhubaneswar",
    total: 100,
    available: 42,
    carSlots: 25,
    bikeSlots: 17,
  },
  {
    id: 2,
    name: "City Parking Hub",
    location: "Saheed Nagar",
    total: 80,
    available: 31,
    carSlots: 18,
    bikeSlots: 13,
  },
  {
    id: 3,
    name: "Central Parking",
    location: "Master Canteen",
    total: 120,
    available: 68,
    carSlots: 40,
    bikeSlots: 28,
  },
];

const SLIDE_ITEMS = [
  { label: "LIVE PARKING GRID",  title: "Smart Parking A",    sub: "Unit 4, Bhubaneswar" },
  { label: "REAL-TIME AVAILABILITY", title: "City Parking Hub",   sub: "Saheed Nagar" },
  { label: "AI-POWERED INSIGHTS", title: "Central Parking",     sub: "Master Canteen" },
  { label: "BOOK IN SECONDS",     title: "Reserve Your Spot",  sub: "Instant Confirmation" },
  { label: "ZERO WAIT PARKING",   title: "Find & Park Fast",   sub: "Powered by SmartPark" },
];

const TYPE_WORDS = ["Reserve.", "Discover.", "Book Now.", "Park Easy.", "Go Smart."];

const Home = () => {
  const [slideIdx, setSlideIdx] = useState(0);
  const [visible, setVisible]   = useState(true);

  // ── Typewriter state ────────────────────────────────────────────
  const [typeWordIdx, setTypeWordIdx] = useState(0);
  const [typeText,    setTypeText]    = useState("");
  const [isDeleting,  setIsDeleting]  = useState(false);

  useEffect(() => {
    const word    = TYPE_WORDS[typeWordIdx];
    const speed   = isDeleting ? 55 : 110;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypeText(word.slice(0, typeText.length + 1));
        if (typeText.length + 1 === word.length) {
          setTimeout(() => setIsDeleting(true), 1400);
        }
      } else {
        setTypeText(word.slice(0, typeText.length - 1));
        if (typeText.length - 1 === 0) {
          setIsDeleting(false);
          setTypeWordIdx((i) => (i + 1) % TYPE_WORDS.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [typeText, isDeleting, typeWordIdx]);
  // ────────────────────────────────────────────────────────────────

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setSlideIdx((i) => (i + 1) % SLIDE_ITEMS.length);
        setVisible(true);
      }, 450);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const current = SLIDE_ITEMS[slideIdx];
  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      {/* ── Luxury Marquee Ticker (below Navbar) ─────────────────────── */}
      <div className="fixed top-20 left-0 right-0 z-40 overflow-hidden py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 shadow-md">
        {/* Gradient fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-emerald-600 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-sky-600 to-transparent" />

        {/* Scrolling track */}
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(3)].map((_, gi) => (
            <div key={gi} className="flex items-center shrink-0">
              {[
                "🅿 PARKING",
                "✦ RESERVE YOUR SPOT",
                "⚡ SMART PARKING",
                "🚘 FIND A SLOT",
                "🏆 LUXURY EXPERIENCE",
                "✦ 24/7 AVAILABILITY",
                "🎯 AI PREDICTION",
                "🅿 PARKING",
                "✦ RESERVE YOUR SPOT",
                "⚡ SMART PARKING",
                "🚘 FIND A SLOT",
                "🏆 LUXURY EXPERIENCE",
                "✦ 24/7 AVAILABILITY",
                "🎯 AI PREDICTION",
              ].map((text, i) => (
                <span
                  key={i}
                  className="inline-flex items-center mx-6 text-white font-black tracking-[0.15em] text-xs uppercase select-none"
                >
                  {text}
                  <span className="ml-6 w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* ── End Marquee ───────────────────────────────────────────────── */}

      <main>
        <section className="pt-40 pb-20 px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm mb-6 font-bold shadow-xs">
                <Sparkles size={16} className="text-emerald-600" />
                AI-Powered Parking Availability Prediction
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-slate-900">
                Find.
                <br />
                {/* ── Luxury typewriter word ── */}
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 inline-block"
                >
                  {typeText}
                  {/* blinking cursor */}
                  <span
                    className="inline-block w-[3px] h-[0.85em] ml-1 rounded-sm align-middle animate-blink"
                    style={{ background: "linear-gradient(180deg,#10b981,#0ea5e9)" }}
                  />
                </span>
              </h1>

              <p className="text-slate-600 text-lg mt-6 max-w-xl leading-8">
                Discover vacant parking spots near you, reserve your
                slot in seconds, and park without traffic stress.
                Predict slot availability using machine learning before you travel.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/login"
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-bold hover:from-emerald-600 hover:to-teal-700 transition shadow-lg shadow-emerald-500/25 flex items-center gap-2"
                >
                  Find Parking
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/login"
                  className="px-7 py-3.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-800 transition font-bold shadow-xs"
                >
                  View AI Prediction
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-5 mt-12 max-w-lg">
                <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-xs">
                  <p className="text-3xl font-black text-emerald-600">
                    500+
                  </p>
                  <p className="text-slate-500 text-xs font-semibold mt-1">
                    Parking Slots
                  </p>
                </div>

                <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-xs">
                  <p className="text-3xl font-black text-slate-900">
                    24/7
                  </p>
                  <p className="text-slate-500 text-xs font-semibold mt-1">
                    Live Tracking
                  </p>
                </div>

                <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-xs">
                  <p className="text-3xl font-black text-sky-600">
                    98%
                  </p>
                  <p className="text-slate-500 text-xs font-semibold mt-1">
                    AI Accuracy
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200/40 via-teal-200/20 to-sky-200/40 blur-3xl rounded-full" />

              <div className="relative bg-white border border-slate-200/80 rounded-[2.5rem] p-7 shadow-xl shadow-slate-200/60">
                <div className="flex justify-between items-start mb-6">
                  {/* ── Luxury animated text slider ── */}
                  <div className="overflow-hidden relative" style={{ minWidth: 0, minHeight: "72px" }}>
                    <AnimatePresence mode="wait">
                      {visible && (
                        <motion.div
                          key={slideIdx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                          {/* Label with gradient underline */}
                          <p
                            className="text-xs font-black tracking-[0.18em] uppercase"
                            style={{
                              background: "linear-gradient(90deg,#10b981,#0ea5e9)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            {current.label}
                          </p>

                          {/* Main title */}
                          <h3 className="text-xl font-black text-slate-900 mt-1 leading-tight">
                            {current.title}
                          </h3>

                          {/* Subtitle */}
                          <p className="text-[11px] text-slate-400 font-semibold mt-0.5 tracking-wide">
                            {current.sub}
                          </p>

                          {/* Dot indicator row */}
                          <div className="flex gap-1.5 mt-2">
                            {SLIDE_ITEMS.map((_, di) => (
                              <span
                                key={di}
                                className="transition-all duration-300 rounded-full"
                                style={{
                                  width:  di === slideIdx ? "18px" : "6px",
                                  height: "6px",
                                  background: di === slideIdx
                                    ? "linear-gradient(90deg,#10b981,#0ea5e9)"
                                    : "#cbd5e1",
                                }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

                <div className="grid grid-cols-5 gap-3">
                  {Array.from({ length: 25 }).map(
                    (_, index) => {
                      const occupied =
                        [1, 4, 7, 8, 12, 15, 18, 20, 23]
                          .includes(index);

                      return (
                        <div
                          key={index}
                          className={`aspect-square rounded-xl flex items-center justify-center border transition-all duration-300 ${
                            occupied
                              ? "bg-rose-50 border-rose-200 text-rose-500"
                              : "bg-emerald-50/80 border-emerald-200 text-emerald-600 hover:scale-105 hover:bg-emerald-100 hover:border-emerald-400 cursor-pointer shadow-xs"
                          }`}
                        >
                          <CarFront size={18} />
                        </div>
                      );
                    }
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-4 border-y border-slate-200/70 bg-gradient-to-b from-white via-slate-50/60 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-emerald-700 font-bold text-xs tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
                WHY PARKSMART
              </p>

              <h2 className="text-4xl font-black mt-3 text-slate-900 tracking-tight">
                Smart parking made simple and fast.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: CarFront,
                  title: "Live Availability",
                  color: "bg-emerald-100 text-emerald-700 border-emerald-200",
                  text: "See available and occupied slots in real-time with instant visual grid updates.",
                },
                {
                  icon: Clock3,
                  title: "Save Your Time",
                  color: "bg-sky-100 text-sky-700 border-sky-200",
                  text: "Reserve your spot in advance before leaving home or office to avoid circling.",
                },
                {
                  icon: ShieldCheck,
                  title: "AI Demand Forecast",
                  color: "bg-purple-100 text-purple-700 border-purple-200",
                  text: "Machine learning algorithms forecast peak hours and recommend arrival windows.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-slate-200/80 rounded-3xl p-7 hover:border-emerald-300 hover:shadow-xl transition duration-300 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs ${item.color}`}>
                      <item.icon size={23} />
                    </div>

                    <h3 className="text-xl font-bold mt-5 text-slate-900">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 mt-3 leading-7 text-sm">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <p className="text-emerald-700 font-bold text-xs tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
                  NEARBY PARKING LOCATIONS
                </p>

                <h2 className="text-4xl font-black mt-3 text-slate-900 tracking-tight">
                  Find your nearest parking spot
                </h2>
              </div>

              <Link
                to="/login"
                className="hidden sm:flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-bold text-sm bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-4 py-2 rounded-xl transition"
              >
                View all spots
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parkingData.map((parking) => (
                <ParkingCard
                  key={parking.id}
                  parking={parking}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
