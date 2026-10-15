import { CarFront } from "lucide-react";

const SlotCard = ({ slot, selected, onSelect }) => {
  const statusStyle = {
    available: "border-emerald-300 bg-emerald-50/80 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-500 shadow-xs",
    occupied: "border-rose-200 bg-rose-50 text-rose-600",
    reserved: "border-amber-200 bg-amber-50 text-amber-700",
    maintenance: "border-slate-200 bg-slate-100 text-slate-400",
  };

  const badgeStyle = {
    available: "bg-emerald-100 text-emerald-800",
    occupied: "bg-rose-100 text-rose-700",
    reserved: "bg-amber-100 text-amber-800",
    maintenance: "bg-slate-200 text-slate-600",
  };

  const disabled = slot.status !== "available";

  return (
    <button
      disabled={disabled}
      onClick={() => onSelect(slot)}
      className={`
        relative aspect-square rounded-2xl border-2 p-2
        flex flex-col items-center justify-center
        transition-all duration-200
        ${statusStyle[slot.status]}
        ${selected ? "ring-3 ring-emerald-500 ring-offset-2 scale-105 shadow-md bg-emerald-100 border-emerald-500 text-emerald-900" : ""}
        ${disabled ? "cursor-not-allowed opacity-70" : "hover:scale-105 cursor-pointer"}
      `}
    >
      <CarFront size={25} />

      <span className="font-extrabold mt-2 text-sm tracking-tight">
        {slot.number}
      </span>

      <span className={`text-[10px] capitalize mt-1 font-bold px-2 py-0.5 rounded-full ${badgeStyle[slot.status]}`}>
        {slot.status}
      </span>
    </button>
  );
};

export default SlotCard;
