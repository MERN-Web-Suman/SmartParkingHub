import React, { useState, useEffect } from 'react';
import { notificationService } from '../../services/notificationService';
import { Bell, CheckCircle, AlertTriangle, Info, ShieldCheck } from 'lucide-react';
import { formatDateTime } from '../../utils/formatDate';

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifs = async () => {
    setLoading(true);
    try {
      const res = await notificationService.getNotifications();
      if (res.success) setNotifications(res.notifications);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  const handleMarkRead = async (id) => {
    await notificationService.markAsRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const handleMarkAll = async () => {
    await notificationService.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            Security Broadcast Center
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2 flex items-center gap-2">
            <Bell className="w-6 h-6 text-cyan-400" /> System & Operational Notifications
          </h1>
          <p className="text-xs text-slate-400 mt-1">Live alerts regarding overstay, shift updates, and gate sensors.</p>
        </div>

        <button
          onClick={handleMarkAll}
          className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition"
        >
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Mark All Read</span>
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => handleMarkRead(item.id)}
            className={`glass-card p-5 rounded-2xl border transition cursor-pointer flex items-start space-x-4 ${
              !item.isRead ? 'border-cyan-500/40 bg-cyan-950/20' : 'border-slate-800 opacity-80'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
              {item.type === 'warning' ? (
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              ) : item.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              ) : (
                <Info className="w-5 h-5 text-cyan-400" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <span className="text-[10px] text-slate-500 font-mono">{formatDateTime(item.timestamp)}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
