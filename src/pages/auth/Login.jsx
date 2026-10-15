import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarFront, Eye, EyeOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      login(data);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Server error. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="flex justify-center items-center gap-2.5 mb-8 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
            <CarFront className="text-white" size={26} />
          </div>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Smart<span className="text-emerald-600">Park</span>
          </h1>
        </Link>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-7 sm:p-9 shadow-xl shadow-slate-200/50">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome back
          </h2>

          <p className="text-slate-500 mt-2 text-sm">
            Login to manage your reservations and vehicles.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 mt-8"
          >
            <div>
              <label className="text-sm text-slate-700 font-semibold block">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition text-sm font-medium"
              />
            </div>

            <div>
              <label className="text-sm text-slate-700 font-semibold block">
                Password
              </label>

              <div className="relative mt-2">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pr-12 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition text-sm font-medium"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-emerald-600 hover:underline font-semibold cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full flex justify-center items-center gap-2 mt-6 py-3.5 text-base font-bold shadow-md shadow-emerald-500/25"
            >
              {loading ? "Signing in..." : "Login"}
              <ArrowRight size={18} />
            </Button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-7">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-600 hover:underline font-bold"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
