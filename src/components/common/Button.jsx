const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/25 border border-emerald-400/30",
    secondary:
      "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs hover:border-slate-300",
    danger:
      "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white shadow-md shadow-rose-500/25",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
