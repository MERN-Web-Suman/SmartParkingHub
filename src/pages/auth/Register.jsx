import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarFront, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
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

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.password
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      login(data);
      toast.success("Account created successfully!");
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
            Create account
          </h2>

          <p className="text-slate-500 mt-2 text-sm">
            Start your smarter, hassle-free parking experience.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 mt-8"
          >
            {[
              ["name", "Full Name", "Suman Kumar"],
              ["email", "Email", "you@example.com"],
              ["phone", "Phone Number", "9876543210"],
              ["password", "Password", "••••••••"],
            ].map(([name, label, placeholder]) => (
              <div key={name}>
                <label className="text-sm text-slate-700 font-semibold block">
                  {label}
                </label>

                <input
                  type={
                    name === "password"
                      ? "password"
                      : name === "email"
                      ? "email"
                      : "text"
                  }
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition text-sm font-medium"
                />
              </div>
            ))}

            <Button
              type="submit"
              className="w-full flex justify-center items-center gap-2 mt-6 py-3.5 text-base font-bold shadow-md shadow-emerald-500/25"
            >
              {loading ? "Creating account..." : "Create Account"}
              <ArrowRight size={18} />
            </Button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-7">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 hover:underline font-bold"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
