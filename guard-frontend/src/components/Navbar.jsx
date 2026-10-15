import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../hooks/useSocket';
import { useNavigate, Link } from 'react-router-dom';
import {
  Bell, ShieldAlert, Clock, LogOut, Radio, User,
  CheckCircle, AlertTriangle, Zap, MapPin, Navigation
} from 'lucide-react';
import { formatTime } from '../utils/formatDate';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { isConnected } = useSocket();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime]       = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount]       = useState(2);
  const [locationInfo, setLocationInfo]     = useState({
    loading: true,
    text: 'Acquiring GPS...',
    coords: null,
    error: null,
  });

  const fetchLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationInfo({
        loading: false,
        text: 'GPS Unsupported',
        coords: null,
        error: 'Geolocation is not supported by this browser',
      });
      return;
    }

    setLocationInfo((prev) => ({ ...prev, loading: true, text: 'Detecting Location...' }));

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const coordsStr = `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (res.ok) {
            const data = await res.json();
            const locality = data.locality || data.city || data.principalSubdivision;
            const region = data.principalSubdivision || data.countryName;
            const placeName = [locality, region].filter(Boolean).join(', ');
            setLocationInfo({
              loading: false,
              text: placeName || coordsStr,
              coords: coordsStr,
              error: null,
            });
            return;
          }
        } catch (err) {
          console.warn('Reverse geocoding error:', err);
        }

        setLocationInfo({
          loading: false,
          text: coordsStr,
          coords: coordsStr,
          error: null,
        });
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
        setLocationInfo({
          loading: false,
          text: err.code === 1 ? 'Location Disabled' : 'GPS Signal Weak',
          coords: null,
          error: err.message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  useEffect(() => {
    fetchLiveLocation();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 px-5 py-3"
      style={{
        background: 'rgba(4,7,15,0.85)',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        borderBottom: '1px solid rgba(255,255,255,0.055)',
        boxShadow: '0 1px 0 rgba(16,185,129,0.05)',
      }}
    >
      <div className="flex items-center justify-between gap-4">

        {/* ── Left: Gate Status ─────────────────────────────── */}
        <div className="flex items-center space-x-3">
          {/* Online pill */}
          <div
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full"
            style={{
              background: isConnected
                ? 'linear-gradient(135deg,rgba(16,185,129,0.14),rgba(6,182,212,0.08))'
                : 'rgba(244,63,94,0.10)',
              border: `1px solid ${isConnected ? 'rgba(16,185,129,0.30)' : 'rgba(244,63,94,0.30)'}`,
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: isConnected ? '#10b981' : '#f43f5e' }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: isConnected ? '#10b981' : '#f43f5e' }}
              />
            </span>
            <span
              className="text-[11px] font-bold uppercase tracking-wider"
              style={{ color: isConnected ? '#6ee7b7' : '#fda4af' }}
            >
              {isConnected ? 'System Online' : 'Offline'}
            </span>
          </div>

          {/* Live Geolocation Tag (replaced Gate: North Main Tower) */}
          <div
            onClick={fetchLiveLocation}
            title={
              locationInfo.coords
                ? `Live GPS: ${locationInfo.coords} (Click to refresh)`
                : locationInfo.error || 'Click to detect live location'
            }
            className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg cursor-pointer transition select-none"
            style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(16, 185, 129, 0.06) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.22)',
              boxShadow: '0 2px 10px rgba(6, 182, 212, 0.08)',
            }}
          >
            <MapPin
              className={`w-3.5 h-3.5 ${locationInfo.loading ? 'animate-bounce text-amber-400' : 'text-cyan-400 animate-pulse'}`}
            />
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                Live Loc:
              </span>
              <span className="text-xs text-slate-200 font-semibold max-w-[210px] truncate">
                {locationInfo.text}
              </span>
            </div>
            {locationInfo.coords && (
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 8px #10b981',
                }}
              />
            )}
          </div>
        </div>

        {/* ── Center: Clock + SOS ───────────────────────────── */}
        <div className="flex items-center space-x-4">
          {/* Live clock */}
          <div
            className="hidden lg:flex items-center space-x-2 px-4 py-1.5 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <Clock className="w-3.5 h-3.5" style={{ color: '#10b981' }} />
            <span className="font-mono text-sm font-bold text-slate-200 tracking-wider tabular-nums">
              {formatTime(currentTime)}
            </span>
          </div>

          {/* SOS button */}
          <button
            onClick={() => navigate('/emergency')}
            className="btn-luxury flex items-center space-x-2 text-white font-black text-[11px] uppercase tracking-widest px-4 py-2 rounded-xl transition"
            style={{
              background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
              boxShadow: '0 4px 20px -4px rgba(244,63,94,0.55), 0 0 0 1px rgba(244,63,94,0.25)',
            }}
          >
            <ShieldAlert className="w-3.5 h-3.5 animate-bounce" />
            <span>Emergency SOS</span>
          </button>
        </div>

        {/* ── Right: Notifications + Profile ───────────────── */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <Bell className="w-4.5 h-4.5 text-slate-300" />
              {unreadCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black"
                  style={{
                    background: 'linear-gradient(135deg,#f59e0b,#d97706)',
                    color: '#0a0f1e',
                    boxShadow: '0 0 10px rgba(245,158,11,0.5)',
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div
                className="absolute right-0 mt-3 w-80 rounded-2xl shadow-2xl overflow-hidden z-50"
                style={{
                  background: 'rgba(8,13,26,0.97)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  boxShadow: '0 30px 80px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(16,185,129,0.08)',
                }}
              >
                <div
                  className="px-4 py-3 flex justify-between items-center"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Bell className="w-3.5 h-3.5" style={{ color: '#10b981' }} />
                    System Alerts
                  </h4>
                  <button
                    onClick={() => { setUnreadCount(0); navigate('/notifications'); setShowNotifications(false); }}
                    className="text-[11px] font-bold"
                    style={{ color: '#06b6d4' }}
                  >
                    View All
                  </button>
                </div>

                <div className="max-h-64 overflow-y-auto">
                  {[
                    {
                      Icon: AlertTriangle,
                      color: '#f59e0b',
                      bg: 'rgba(245,158,11,0.06)',
                      title: 'Overstay Alert — Slot B-02',
                      sub: 'MH 02 CK 9988 exceeded booked limit by 45 mins.',
                      time: '10m ago',
                    },
                    {
                      Icon: CheckCircle,
                      color: '#10b981',
                      bg: 'transparent',
                      title: 'Pre-Booked VIP Entry',
                      sub: 'Delegate vehicle expected at Gate 1 at 3:00 PM.',
                      time: '35m ago',
                    },
                  ].map((n, i) => (
                    <div
                      key={i}
                      className="p-3 flex gap-3 cursor-pointer transition-colors hover:bg-white/[0.03]"
                      style={{ background: n.bg, borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <n.Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: n.color }} />
                      <div>
                        <p className="text-xs font-semibold text-slate-200">{n.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{n.sub}</p>
                        <span className="text-[10px] text-slate-500 font-mono">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile card */}
          <Link
            to="/profile"
            className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl transition-all hover:bg-white/[0.04]"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div
              className="w-8 h-8 rounded-xl p-[2px]"
              style={{ background: 'linear-gradient(135deg,#10b981,#06b6d4)' }}
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt="Guard"
                className="w-full h-full object-cover rounded-[9px]"
              />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-100 leading-tight">{user?.name || 'Security Officer'}</p>
              <p className="text-[9px] font-mono" style={{ color: '#10b981' }}>{user?.badgeNumber || 'SEC-88219'}</p>
            </div>
          </Link>

          {/* Logout */}
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="p-2.5 rounded-xl transition-all hover:bg-rose-950/40"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 text-slate-400 hover:text-rose-400 transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
};
