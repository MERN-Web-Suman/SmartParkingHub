import { useState } from "react";
import { Megaphone, Plus, Trash2, Send, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

const initialAnnouncements = [
  { id: 1, title: "Maintenance Alert: Airport T1 Slot B-Section", msg: "Slot B-01 to B-10 will undergo routine EV charger maintenance on Sunday from 2 AM to 6 AM.", target: "All Users", date: "2026-09-25", active: true },
  { id: 2, title: "Festive Parking Surge Discount", msg: "Enjoy 20% cashback on all reservations placed via SmartPark Wallet during Durga Puja!", target: "Active Drivers", date: "2026-09-20", active: true },
];

const AnnouncementsView = () => {
  const [items, setItems] = useState(initialAnnouncements);
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [target, setTarget] = useState("All Users");

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!title || !msg) {
      toast.error("Please enter both title and message");
      return;
    }
    const created = {
      id: Date.now(),
      title,
      msg,
      target,
      date: new Date().toISOString().split("T")[0],
      active: true,
    };
    setItems([created, ...items]);
    setTitle("");
    setMsg("");
    toast.success("Broadcast message published to all users successfully!");
  };

  return (
    <div className="space-y-8">
      {/* Create Announcement Form */}
      <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Megaphone size={22} className="text-emerald-400" />
            Create System Announcement Broadcast
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Send real-time banner notifications to user mobile apps & Web dashboards.
          </p>
        </div>

        <form onSubmit={handleBroadcast} className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">
                Announcement Title
              </label>
              <input
                type="text"
                placeholder="e.g. Traffic Decongestion & Free Slot Alert"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">
                Target Audience
              </label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500"
              >
                <option value="All Users">All Registered Users</option>
                <option value="Active Drivers">Active Drivers Currently Parked</option>
                <option value="EV Owners">EV Vehicle Owners</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">
              Broadcast Message Content
            </label>
            <textarea
              rows={3}
              placeholder="Write broadcast message details..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition flex items-center gap-2 text-sm shadow-lg shadow-emerald-500/20"
          >
            <Send size={16} />
            Publish Broadcast Announcement
          </button>
        </form>
      </div>

      {/* Active Broadcasts List */}
      <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <h4 className="text-lg font-bold text-white">Active System Announcements</h4>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="p-5 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h5 className="font-bold text-white text-base">{item.title}</h5>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                    {item.target}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.msg}</p>
                <span className="text-[10px] text-slate-500 mt-2 block">Published on {item.date}</span>
              </div>

              <button
                onClick={() => {
                  setItems(items.filter((i) => i.id !== item.id));
                  toast.error("Announcement deleted");
                }}
                className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition shrink-0"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsView;
