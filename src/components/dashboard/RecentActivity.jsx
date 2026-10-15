import { Clock, MapPin, CheckCircle2, AlertCircle } from "lucide-react";

const RecentActivity = ({ activities }) => {
  const defaultActivities = [
    {
      id: 1,
      location: "Smart Parking A",
      slot: "Slot A-24",
      time: "Today, 06:00 PM",
      status: "Active",
      price: "₹40",
    },
    {
      id: 2,
      location: "City Parking Hub",
      slot: "Slot B-12",
      time: "Yesterday, 02:30 PM",
      status: "Completed",
      price: "₹60",
    },
    {
      id: 3,
      location: "Central Parking",
      slot: "Slot C-05",
      time: "24 Sep 2026, 11:00 AM",
      status: "Completed",
      price: "₹40",
    },
  ];

  const items = activities || defaultActivities;

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs">
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between">
        <span>Recent Parking Activity</span>
        <span className="text-xs text-slate-400 font-medium bg-slate-100 px-3 py-1 rounded-full">Last 30 days</span>
      </h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-slate-50/70 hover:bg-emerald-50/40 rounded-2xl border border-slate-200/60 hover:border-emerald-200 transition duration-200"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs ${
                  item.status === "Active"
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : "bg-sky-100 text-sky-700 border border-sky-200"
                }`}
              >
                {item.status === "Active" ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <Clock size={18} />
                )}
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  {item.location} <span className="text-emerald-600 font-semibold">({item.slot})</span>
                </h4>
                <div className="flex items-center gap-2 text-slate-500 text-xs mt-1">
                  <MapPin size={12} className="text-slate-400" />
                  <span>{item.time}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-extrabold text-emerald-600 text-sm">{item.price}</p>
              <span
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold inline-block mt-1 border ${
                  item.status === "Active"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
