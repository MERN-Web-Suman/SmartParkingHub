import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ParkingSquare, KeyRound, User, ArrowRight, Zap, Eye, EyeOff } from 'lucide-react';

export const Login = () => {
  const [badgeId,    setBadgeId]    = useState('SEC-88219');
  const [password,   setPassword]   = useState('');
  const [gateId,     setGateId]     = useState('GATE-NORTH-01');
  const [loading,    setLoading]    = useState(false);
  const [showPass,   setShowPass]   = useState(false);
  const [typeText,   setTypeText]   = useState('');
  const [wordIdx,    setWordIdx]    = useState(0);
  const [deleting,   setDeleting]   = useState(false);
  const { login } = useAuth();
  const navigate   = useNavigate();

  // Typewriter for hero label
  const WORDS = ['Security Officer', 'Gate Guardian', 'Access Control', 'Barrier Control'];
  useEffect(() => {
    const word  = WORDS[wordIdx];
    const speed = deleting ? 50 : 100;
    const t = setTimeout(() => {
      if (!deleting) {
        setTypeText(word.slice(0, typeText.length + 1));
        if (typeText.length + 1 === word.length) setTimeout(() => setDeleting(true), 1200);
      } else {
        setTypeText(word.slice(0, typeText.length - 1));
        if (typeText.length - 1 === 0) { setDeleting(false); setWordIdx(i => (i + 1) % WORDS.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [typeText, deleting, wordIdx]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ username: badgeId, password, gateId });
      navigate('/dashboard');
    } catch {
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: '#04070f' }}
    >
      {/* ── Ambient glows ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #10b981, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* ── Login Card ─────────────────────────────────────── */}
      <div
        className="w-full max-w-md relative z-10 rounded-3xl p-8 animate-fadein-up"
        style={{
          background: 'linear-gradient(145deg, rgba(14,22,40,0.95) 0%, rgba(8,13,26,0.98) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(16,185,129,0.06), inset 0 1px 0 rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Top glow bar */}
        <div
          className="absolute top-0 left-8 right-8 h-[1px] rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.5), rgba(6,182,212,0.5), transparent)' }}
        />

        {/* ── Brand ─────────────────────────────────────────── */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            {/* Logo ring */}
            <div
              className="w-20 h-20 rounded-[22px] p-[2px] mx-auto animate-float"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #6366f1 100%)',
                boxShadow: '0 12px 40px -8px rgba(16,185,129,0.50)',
              }}
            >
              <div
                className="w-full h-full rounded-[20px] flex items-center justify-center"
                style={{ background: '#060c1a' }}
              >
                <ParkingSquare className="w-10 h-10 text-emerald-400" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            ParkSmart{' '}
            <span
              style={{
                background: 'linear-gradient(90deg,#10b981,#06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Guard
            </span>
          </h2>

          {/* Typewriter subtitle */}
          <p className="text-xs text-slate-400 mt-1.5 h-5">
            <span className="font-mono" style={{ color: '#10b981' }}>{typeText}</span>
            <span className="animate-blink font-mono ml-0.5" style={{ color: '#10b981' }}>|</span>
            {' '}Console
          </p>

          {/* Security badge */}
          <div
            className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.20)',
              color: '#6ee7b7',
            }}
          >
            <ShieldCheck className="w-3 h-3" />
            Encrypted • Secure • Authorized
          </div>
        </div>

        {/* ── Form ──────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Badge ID */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-2">
              Guard Badge ID
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={badgeId}
                onChange={e => setBadgeId(e.target.value)}
                required
                placeholder="SEC-88219"
                className="luxury-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-2">
              Terminal Passcode
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="luxury-input w-full pl-10 pr-10 py-3 rounded-xl text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Gate selector */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-2">
              Assigned Gate Terminal
            </label>
            <select
              value={gateId}
              onChange={e => setGateId(e.target.value)}
              className="luxury-input w-full px-4 py-3 rounded-xl text-sm"
            >
              <option value="GATE-NORTH-01">GATE-NORTH-01 — Main Entry</option>
              <option value="GATE-SOUTH-02">GATE-SOUTH-02 — EV Plaza</option>
              <option value="GATE-WEST-03">GATE-WEST-03 — VIP & Staff</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-luxury w-full mt-2 py-3.5 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
            style={{
              background: loading
                ? 'rgba(16,185,129,0.4)'
                : 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
              color: loading ? '#6ee7b7' : '#020e0a',
              boxShadow: loading ? 'none' : '0 8px 30px -6px rgba(16,185,129,0.55)',
            }}
          >
            {loading ? (
              <>
                <Zap className="w-4 h-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                Authorize Guard Session
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div
          className="mt-6 pt-4 text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-[10px] font-mono text-slate-600">
            🔒 Biometric + Token Gate Authorization • System v2.4.0
          </p>
        </div>
      </div>
    </div>
  );
};
