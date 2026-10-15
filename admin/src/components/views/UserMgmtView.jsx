import { useState } from "react";
import {
  Users,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserX,
  Car,
  Phone,
  Mail,
  MoreVertical,
  Filter
} from "lucide-react";
import toast from "react-hot-toast";

const initialUsers = [
  { id: "USR-001", name: "Suman Kumar", email: "suman@example.com", phone: "9876543210", role: "user", status: "Active", vehicles: 2, wallet: "₹420" },
  { id: "USR-002", name: "Rahul Sharma", email: "rahul@example.com", phone: "9988776655", role: "user", status: "Active", vehicles: 1, wallet: "₹180" },
  { id: "USR-003", name: "Priya Patel", email: "priya@example.com", phone: "9123456780", role: "user", status: "Active", vehicles: 3, wallet: "₹750" },
  { id: "USR-004", name: "Amit Verma", email: "amit@example.com", phone: "9811223344", role: "user", status: "Blocked", vehicles: 1, wallet: "₹0" },
  { id: "USR-005", name: "System Administrator", email: "admin@parksmart.com", phone: "9000000000", role: "admin", status: "Active", vehicles: 0, wallet: "₹5000" },
];

const UserMgmtView = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const toggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === "Active" ? "Blocked" : "Active";
          toast.success(`User ${u.name} is now ${nextStatus}`);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search);
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#0D1B2A] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-slate-400 font-semibold uppercase">Total Users</p>
          <h3 className="text-2xl font-black text-white mt-1">500</h3>
        </div>
        <div className="bg-[#0D1B2A] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-emerald-400 font-semibold uppercase">Active Users</p>
          <h3 className="text-2xl font-black text-emerald-400 mt-1">488</h3>
        </div>
        <div className="bg-[#0D1B2A] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-rose-400 font-semibold uppercase">Blocked Users</p>
          <h3 className="text-2xl font-black text-rose-400 mt-1">12</h3>
        </div>
        <div className="bg-[#0D1B2A] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-purple-400 font-semibold uppercase">Admin Staff</p>
          <h3 className="text-2xl font-black text-purple-400 mt-1">4</h3>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-[#0D1B2A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Users size={22} className="text-emerald-400" />
              User Accounts Directory
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Search, inspect registered vehicles, and toggle account access status.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search user name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            {/* Filter Dropdown */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
            >
              <option value="all">All Roles</option>
              <option value="user">User Only</option>
              <option value="admin">Admin Only</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">User ID</th>
                <th className="py-3.5 px-4">Full Name</th>
                <th className="py-3.5 px-4">Contact Details</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Vehicles</th>
                <th className="py-3.5 px-4">Wallet</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Block/Unblock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-medium text-slate-200">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-mono font-bold text-emerald-400">{u.id}</td>
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                      {u.name[0]}
                    </div>
                    {u.name}
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-300">
                    <p className="flex items-center gap-1.5"><Mail size={12} className="text-slate-400" /> {u.email}</p>
                    <p className="flex items-center gap-1.5 mt-0.5"><Phone size={12} className="text-slate-400" /> {u.phone}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                        u.role === "admin" ? "bg-purple-500/10 text-purple-400 border border-purple-500/30" : "bg-slate-800 text-slate-300 border border-white/10"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-white">
                    <span className="flex items-center gap-1.5 text-xs">
                      <Car size={14} className="text-emerald-400" /> {u.vehicles} Registered
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-emerald-400">{u.wallet}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                        u.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition border flex items-center gap-1.5 ml-auto ${
                        u.status === "Active"
                          ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30"
                          : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      }`}
                    >
                      {u.status === "Active" ? <UserX size={14} /> : <UserCheck size={14} />}
                      {u.status === "Active" ? "Block" : "Unblock"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserMgmtView;
