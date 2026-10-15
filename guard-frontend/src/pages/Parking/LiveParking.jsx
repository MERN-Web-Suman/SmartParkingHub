import React, { useState, useEffect } from 'react';
import { parkingService } from '../../services/parkingService';
import { SlotCard } from '../../components/SlotCard';
import { useNavigate } from 'react-router-dom';
import {
  Grid, Filter, RefreshCw, Wrench, ShieldCheck, Car, Zap,
  Bike, Clock, AlertTriangle, CheckCircle, X, ArrowRight, User, Sparkles
} from 'lucide-react';

export const LiveParking = () => {
  const [slots, setSlots] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedSlotModal, setSelectedSlotModal] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const res = await parkingService.getLiveSlots();
      if (res.success) setSlots(res.slots);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const filteredSlots = slots.filter((s) => {
    const matchesLevel = selectedLevel === 'ALL' || s.level === selectedLevel;
    const matchesStatus = selectedStatus === 'ALL' || s.status === selectedStatus;
    return matchesLevel && matchesStatus;
  });

  const countByStatus = (st) => slots.filter((s) => s.status === st).length;

  // Helper for modal status styling
  const getModalStatusConfig = (status) => {
    switch (status) {
      case 'available':
        return {
          label: 'AVAILABLE',
          accent: '#10b981',
          gradient: 'linear-gradient(90deg, #10b981, #06b6d4)',
          badgeBg: 'rgba(16, 185, 129, 0.16)',
          badgeBorder: 'rgba(16, 185, 129, 0.35)',
          badgeText: '#34d399',
          icon: ShieldCheck,
          glow: 'rgba(16, 185, 129, 0.25)',
        };
      case 'occupied':
        return {
          label: 'OCCUPIED',
          accent: '#f43f5e',
          gradient: 'linear-gradient(90deg, #f43f5e, #fb7185)',
          badgeBg: 'rgba(244, 63, 94, 0.16)',
          badgeBorder: 'rgba(244, 63, 94, 0.35)',
          badgeText: '#fb7185',
          icon: Car,
          glow: 'rgba(244, 63, 94, 0.25)',
        };
      case 'reserved':
        return {
          label: 'RESERVED',
          accent: '#f59e0b',
          gradient: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
          badgeBg: 'rgba(245, 158, 11, 0.16)',
          badgeBorder: 'rgba(245, 158, 11, 0.35)',
          badgeText: '#fcd34d',
          icon: Clock,
          glow: 'rgba(245, 158, 11, 0.25)',
        };
      case 'maintenance':
      default:
        return {
          label: 'MAINTENANCE',
          accent: '#94a3b8',
          gradient: 'linear-gradient(90deg, #64748b, #94a3b8)',
          badgeBg: 'rgba(100, 116, 139, 0.2)',
          badgeBorder: 'rgba(148, 163, 184, 0.3)',
          badgeText: '#cbd5e1',
          icon: Wrench,
          glow: 'rgba(148, 163, 184, 0.15)',
        };
    }
  };

  const modalConfig = selectedSlotModal ? getModalStatusConfig(selectedSlotModal.status) : null;
  const ModalIcon = modalConfig ? modalConfig.icon : null;
  const VehicleTypeIcon = selectedSlotModal?.vehicleType === 'EV Car' ? Zap : selectedSlotModal?.vehicleType === 'Bike' ? Bike : Car;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ── Luxury Header ────────────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(14, 22, 40, 0.90) 0%, rgba(9, 14, 26, 0.95) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.09)',
          borderRadius: '24px',
          padding: '24px 28px',
          boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#34d399',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '4px 12px',
              borderRadius: '9999px',
            }}
          >
            <Sparkles style={{ width: '12px', height: '12px' }} />
            Real-Time Infrastructure Grid
          </span>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 900,
              color: '#ffffff',
              margin: '10px 0 4px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              letterSpacing: '-0.02em',
            }}
          >
            <Grid style={{ width: '26px', height: '26px', color: '#10b981' }} />
            Live Parking Slot Monitor
          </h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
            Visual status map of available, reserved, occupied, and maintenance slots.
          </p>
        </div>

        <button
          onClick={fetchSlots}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
            color: '#e2e8f0',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '10px 18px',
            borderRadius: '14px',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.5)';
            e.currentTarget.style.color = '#22d3ee';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.color = '#e2e8f0';
          }}
        >
          <RefreshCw
            style={{
              width: '15px',
              height: '15px',
              color: '#06b6d4',
              animation: loading ? 'spinSlow 1s linear infinite' : 'none',
            }}
          />
          <span>Refresh Grid</span>
        </button>
      </div>

      {/* ── Filter Tabs & Quick Summary ────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(12, 18, 34, 0.85) 0%, rgba(8, 12, 24, 0.90) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '16px 20px',
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
        }}
      >
        {/* Level Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter style={{ width: '15px', height: '15px', color: '#64748b' }} />
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Level:
          </span>
          {['ALL', 'Level 1', 'Level 2'].map((lvl) => {
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: isSelected ? 900 : 600,
                  cursor: 'pointer',
                  border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isSelected
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    : 'rgba(15, 23, 42, 0.65)',
                  color: isSelected ? '#04070f' : '#94a3b8',
                  boxShadow: isSelected ? '0 4px 15px rgba(16, 185, 129, 0.35)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {lvl}
              </button>
            );
          })}
        </div>

        {/* Status Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedStatus('ALL')}
            style={{
              padding: '6px 14px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              border: selectedStatus === 'ALL' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.06)',
              background: selectedStatus === 'ALL' ? 'rgba(51, 65, 85, 0.7)' : 'rgba(15, 23, 42, 0.7)',
              color: selectedStatus === 'ALL' ? '#ffffff' : '#94a3b8',
              transition: 'all 0.2s',
            }}
          >
            All ({slots.length})
          </button>
          <button
            onClick={() => setSelectedStatus('available')}
            style={{
              padding: '6px 14px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              background: selectedStatus === 'available' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.08)',
              color: '#34d399',
              boxShadow: selectedStatus === 'available' ? '0 0 15px rgba(16, 185, 129, 0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            Available ({countByStatus('available')})
          </button>
          <button
            onClick={() => setSelectedStatus('occupied')}
            style={{
              padding: '6px 14px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              border: '1px solid rgba(244, 63, 94, 0.35)',
              background: selectedStatus === 'occupied' ? 'rgba(244, 63, 94, 0.25)' : 'rgba(244, 63, 94, 0.08)',
              color: '#fb7185',
              boxShadow: selectedStatus === 'occupied' ? '0 0 15px rgba(244, 63, 94, 0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            Occupied ({countByStatus('occupied')})
          </button>
          <button
            onClick={() => setSelectedStatus('reserved')}
            style={{
              padding: '6px 14px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              background: selectedStatus === 'reserved' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.08)',
              color: '#fcd34d',
              boxShadow: selectedStatus === 'reserved' ? '0 0 15px rgba(245, 158, 11, 0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            Reserved ({countByStatus('reserved')})
          </button>
        </div>
      </div>

      {/* ── Grid of Slots ──────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {filteredSlots.map((slot) => (
          <SlotCard
            key={slot.id}
            slot={slot}
            onClick={(s) => setSelectedSlotModal(s)}
            onReassign={(s) => navigate('/parking/reassign', { state: { slot: s } })}
          />
        ))}
      </div>

      {/* ── Ultra-Luxury Slot Information Modal ─────────────────── */}
      {selectedSlotModal && (
        <div
          onClick={() => setSelectedSlotModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: 'rgba(2, 6, 23, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            animation: 'fadeIn 0.2s ease-out forwards',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '540px',
              background: 'linear-gradient(165deg, #0d1527 0%, #080d1a 100%)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '26px',
              boxShadow: `0 35px 90px -15px rgba(0, 0, 0, 0.95), 0 0 60px -10px ${modalConfig.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.14)`,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              animation: 'scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {/* Top Glowing Status Bar */}
            <div style={{ height: '4px', width: '100%', background: modalConfig.gradient }} />

            {/* Modal Header */}
            <div
              style={{
                padding: '22px 26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(15, 23, 42, 0.45)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: modalConfig.badgeBg,
                    border: `1px solid ${modalConfig.badgeBorder}`,
                    color: modalConfig.badgeText,
                    boxShadow: `0 0 20px ${modalConfig.glow}`,
                  }}
                >
                  <ModalIcon style={{ width: '24px', height: '24px' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: '20px',
                        fontWeight: 900,
                        color: '#ffffff',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      Slot {selectedSlotModal.id}
                    </h2>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontSize: '10px',
                        fontWeight: 800,
                        background: modalConfig.badgeBg,
                        border: `1px solid ${modalConfig.badgeBorder}`,
                        color: modalConfig.badgeText,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {modalConfig.label}
                    </span>
                  </div>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
                    {selectedSlotModal.zone} • {selectedSlotModal.level}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedSlotModal(null)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = '#94a3b8';
                }}
              >
                <X style={{ width: '18px', height: '18px' }} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Overstay Warning Banner (if applicable) */}
              {selectedSlotModal.isOverstay && (
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.2) 0%, rgba(136, 19, 55, 0.25) 100%)',
                    border: '1px solid rgba(244, 63, 94, 0.4)',
                    borderRadius: '16px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 0 25px rgba(244, 63, 94, 0.2)',
                  }}
                >
                  <AlertTriangle style={{ width: '22px', height: '22px', color: '#fb7185', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#ffffff' }}>
                      CRITICAL OVERSTAY DETECTED
                    </h4>
                    <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#fda4af' }}>
                      Vehicle has exceeded allotted parking booking time. Surcharge protocol active.
                    </p>
                  </div>
                </div>
              )}

              {/* Status & Zone Overview Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(9, 14, 28, 0.85) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '14px 16px',
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em' }}>
                    Occupancy Status
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: modalConfig.accent,
                        boxShadow: `0 0 10px ${modalConfig.accent}`,
                      }}
                    />
                    <span style={{ fontSize: '14px', fontWeight: 900, color: modalConfig.badgeText, fontFamily: 'var(--font-mono)' }}>
                      {modalConfig.label}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(9, 14, 28, 0.85) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '14px 16px',
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em' }}>
                    Bay Classification
                  </span>
                  <p style={{ margin: '6px 0 0 0', fontSize: '14px', fontWeight: 800, color: '#f1f5f9' }}>
                    {selectedSlotModal.zone.includes('EV') ? '⚡ EV Fast Charging' : selectedSlotModal.zone.includes('Two Wheeler') ? '🏍️ 2-Wheeler Deck' : '🚗 Standard Bay'}
                  </p>
                </div>
              </div>

              {/* Active Vehicle Details Card (if Occupied or Reserved) */}
              {(selectedSlotModal.status === 'occupied' || selectedSlotModal.status === 'reserved') && (
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(8, 13, 26, 0.95) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '18px',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                  }}
                >
                  {/* Digital High-Contrast License Plate */}
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em' }}>
                      Registered Vehicle Plate
                    </span>
                    <div
                      style={{
                        marginTop: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            background: '#1d4ed8',
                            color: '#ffffff',
                            fontWeight: 900,
                            fontSize: '9px',
                            padding: '3px 6px',
                            borderRadius: '4px',
                            letterSpacing: '0.05em',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            lineHeight: 1,
                          }}
                        >
                          <span>IND</span>
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '17px',
                            fontWeight: 900,
                            color: '#ffffff',
                            letterSpacing: '0.08em',
                          }}
                        >
                          {selectedSlotModal.vehicleNumber || 'RESERVED VEHICLE'}
                        </span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'rgba(6, 182, 212, 0.12)',
                          border: '1px solid rgba(6, 182, 212, 0.25)',
                          padding: '4px 8px',
                          borderRadius: '8px',
                          color: '#22d3ee',
                          fontSize: '11px',
                          fontWeight: 800,
                        }}
                      >
                        <VehicleTypeIcon style={{ width: '14px', height: '14px' }} />
                        <span>{selectedSlotModal.vehicleType || 'Car'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Occupant and Timing Info */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingTop: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#94a3b8',
                        }}
                      >
                        <User style={{ width: '16px', height: '16px' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                          Primary Driver
                        </span>
                        <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#f1f5f9' }}>
                          {selectedSlotModal.owner || 'Pre-booked Visitor'}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#94a3b8',
                        }}
                      >
                        <Clock style={{ width: '16px', height: '16px' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                          {selectedSlotModal.entryTime ? 'Entry Time' : 'Valid Until'}
                        </span>
                        <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>
                          {selectedSlotModal.entryTime || selectedSlotModal.reservedUntil || 'Active Session'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Vacant State Banner */}
              {selectedSlotModal.status === 'available' && (
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.25) 0%, rgba(4, 30, 24, 0.35) 100%)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    borderRadius: '18px',
                    padding: '18px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    boxShadow: '0 0 25px rgba(16, 185, 129, 0.15)',
                  }}
                >
                  <CheckCircle style={{ width: '22px', height: '22px', color: '#34d399', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: '#ffffff' }}>
                      Bay is Vacant & Ready for Allocation
                    </h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#a7f3d0', lineHeight: 1.5 }}>
                      Ultrasonic overhead sensor verifies clear obstacle radius. LED signal green. Ready for incoming gate entry.
                    </p>
                  </div>
                </div>
              )}

              {/* Maintenance State Banner */}
              {selectedSlotModal.status === 'maintenance' && (
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    borderRadius: '18px',
                    padding: '18px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                  }}
                >
                  <Wrench style={{ width: '22px', height: '22px', color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: '#ffffff' }}>
                      Diagnostic Service Active
                    </h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5 }}>
                      Issue: <span style={{ color: '#fbbf24', fontWeight: 700 }}>{selectedSlotModal.reason || 'Under inspection'}</span>.
                      Bay is software-locked to prevent entry allocation.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '18px 26px',
                background: 'rgba(6, 10, 20, 0.95)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '12px',
              }}
            >
              <button
                onClick={() => setSelectedSlotModal(null)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#94a3b8',
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(51, 65, 85, 0.8)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)';
                  e.currentTarget.style.color = '#94a3b8';
                }}
              >
                Close Window
              </button>

              {selectedSlotModal.status === 'occupied' ? (
                <button
                  onClick={() => {
                    const s = selectedSlotModal;
                    setSelectedSlotModal(null);
                    navigate('/parking/reassign', { state: { slot: s } });
                  }}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: '#090d16',
                    boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 25px rgba(245, 158, 11, 0.55)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(245, 158, 11, 0.4)';
                  }}
                >
                  <RefreshCw style={{ width: '15px', height: '15px' }} />
                  <span>Reassign Slot</span>
                </button>
              ) : selectedSlotModal.status === 'available' ? (
                <button
                  onClick={() => {
                    setSelectedSlotModal(null);
                    navigate('/entry/scan');
                  }}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#04070f',
                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 25px rgba(16, 185, 129, 0.55)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.4)';
                  }}
                >
                  <ArrowRight style={{ width: '15px', height: '15px' }} />
                  <span>Allocate Entry</span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
