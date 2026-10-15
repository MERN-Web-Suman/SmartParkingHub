import React from 'react';
import { Car, Zap, Bike, AlertTriangle, ShieldCheck, Wrench, Clock } from 'lucide-react';
import { SLOT_STATUS } from '../utils/constants';

export const SlotCard = ({ slot, onClick, onReassign }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const statusConfig = {
    [SLOT_STATUS.AVAILABLE]: {
      style: {
        background: 'linear-gradient(145deg, rgba(6, 78, 59, 0.28) 0%, rgba(4, 30, 24, 0.45) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.38)',
        boxShadow: isHovered
          ? '0 16px 36px -8px rgba(16, 185, 129, 0.32), inset 0 1px 0 rgba(16, 185, 129, 0.35)'
          : '0 8px 25px -6px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(16, 185, 129, 0.18)',
      },
      badgeStyle: {
        background: 'rgba(16, 185, 129, 0.16)',
        color: '#34d399',
        border: '1px solid rgba(16, 185, 129, 0.35)',
      },
      indicatorColor: '#10b981',
      label: 'AVAILABLE',
      icon: ShieldCheck
    },
    [SLOT_STATUS.OCCUPIED]: {
      style: {
        background: 'linear-gradient(145deg, rgba(136, 19, 55, 0.28) 0%, rgba(35, 8, 16, 0.45) 100%)',
        border: '1px solid rgba(244, 63, 94, 0.38)',
        boxShadow: isHovered
          ? '0 16px 36px -8px rgba(244, 63, 94, 0.32), inset 0 1px 0 rgba(244, 63, 94, 0.35)'
          : '0 8px 25px -6px rgba(244, 63, 94, 0.15), inset 0 1px 0 rgba(244, 63, 94, 0.18)',
      },
      badgeStyle: {
        background: 'rgba(244, 63, 94, 0.16)',
        color: '#fb7185',
        border: '1px solid rgba(244, 63, 94, 0.35)',
      },
      indicatorColor: '#f43f5e',
      label: 'OCCUPIED',
      icon: Car
    },
    [SLOT_STATUS.RESERVED]: {
      style: {
        background: 'linear-gradient(145deg, rgba(120, 53, 15, 0.28) 0%, rgba(45, 20, 5, 0.45) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.38)',
        boxShadow: isHovered
          ? '0 16px 36px -8px rgba(245, 158, 11, 0.32), inset 0 1px 0 rgba(245, 158, 11, 0.35)'
          : '0 8px 25px -6px rgba(245, 158, 11, 0.15), inset 0 1px 0 rgba(245, 158, 11, 0.18)',
      },
      badgeStyle: {
        background: 'rgba(245, 158, 11, 0.16)',
        color: '#fcd34d',
        border: '1px solid rgba(245, 158, 11, 0.35)',
      },
      indicatorColor: '#f59e0b',
      label: 'RESERVED',
      icon: Clock
    },
    [SLOT_STATUS.MAINTENANCE]: {
      style: {
        background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.45) 0%, rgba(15, 23, 42, 0.6) 100%)',
        border: '1px solid rgba(148, 163, 184, 0.3)',
        boxShadow: isHovered
          ? '0 16px 36px -8px rgba(148, 163, 184, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
          : '0 8px 25px -6px rgba(148, 163, 184, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      },
      badgeStyle: {
        background: 'rgba(100, 116, 139, 0.2)',
        color: '#cbd5e1',
        border: '1px solid rgba(148, 163, 184, 0.3)',
      },
      indicatorColor: '#94a3b8',
      label: 'MAINTENANCE',
      icon: Wrench
    }
  };

  const current = statusConfig[slot.status] || statusConfig[SLOT_STATUS.AVAILABLE];
  const StatusIcon = current.icon;
  const VehicleIcon = slot.vehicleType === 'EV Car' ? Zap : slot.vehicleType === 'Bike' ? Bike : Car;

  return (
    <div
      onClick={() => onClick && onClick(slot)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...current.style,
        borderRadius: '20px',
        padding: '16px',
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '148px',
      }}
    >
      {/* Slot ID & Status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: current.indicatorColor,
              boxShadow: `0 0 10px ${current.indicatorColor}`,
            }}
          />
          <span style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
            {slot.id}
          </span>
          {slot.isOverstay && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: '#e11d48',
                color: '#ffffff',
                fontSize: '9px',
                fontWeight: 900,
                padding: '2px 6px',
                borderRadius: '6px',
                boxShadow: '0 0 12px rgba(225, 29, 72, 0.6)',
              }}
            >
              <AlertTriangle style={{ width: '10px', height: '10px' }} />
              <span>OVERSTAY</span>
            </span>
          )}
        </div>
        <span
          style={{
            ...current.badgeStyle,
            fontSize: '10px',
            fontWeight: 800,
            padding: '3px 9px',
            borderRadius: '9999px',
            letterSpacing: '0.04em',
          }}
        >
          {current.label}
        </span>
      </div>

      {/* Vehicle / Info details */}
      {slot.status === SLOT_STATUS.OCCUPIED || slot.status === SLOT_STATUS.RESERVED ? (
        <div
          style={{
            paddingTop: '10px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(8, 14, 28, 0.7)',
              padding: '6px 10px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <span style={{ fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '0.05em' }}>
              {slot.vehicleNumber || 'Reserved'}
            </span>
            <VehicleIcon style={{ width: '15px', height: '15px', color: '#22d3ee' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {slot.owner || 'Pre-booked guest'}
            </span>
            {slot.entryTime && (
              <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                {slot.entryTime}
              </span>
            )}
          </div>
        </div>
      ) : slot.status === SLOT_STATUS.MAINTENANCE ? (
        <div style={{ paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {slot.reason || 'Under inspection'}
          </p>
        </div>
      ) : (
        <div
          style={{
            paddingTop: '10px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: '#34d399',
            fontWeight: 600,
          }}
        >
          <span>Ready for vehicle</span>
          <StatusIcon style={{ width: '16px', height: '16px' }} />
        </div>
      )}

      {/* Quick Action Button for Occupied */}
      {onReassign && slot.status === SLOT_STATUS.OCCUPIED && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReassign(slot);
          }}
          style={{
            marginTop: '10px',
            width: '100%',
            padding: '6px 0',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(10, 16, 30, 0.95) 100%)',
            color: '#cbd5e1',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            fontSize: '10px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#fbbf24';
            e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#cbd5e1';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(10, 16, 30, 0.95) 100%)';
          }}
        >
          Reassign Slot
        </button>
      )}
    </div>
  );
};
