import React from 'react';
import { AlertCircle, X, Check } from 'lucide-react';

export const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning', // warning | danger | info
  onConfirm,
  onClose,
  children
}) => {
  if (!isOpen) return null;

  const headerStyles = {
    warning: {
      bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)',
      color: '#fbbf24',
      border: '1px solid rgba(245, 158, 11, 0.25)'
    },
    danger: {
      bg: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(225, 29, 72, 0.05) 100%)',
      color: '#fb7185',
      border: '1px solid rgba(244, 63, 94, 0.25)'
    },
    info: {
      bg: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%)',
      color: '#22d3ee',
      border: '1px solid rgba(6, 182, 212, 0.25)'
    },
    success: {
      bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)',
      color: '#34d399',
      border: '1px solid rgba(16, 185, 129, 0.25)'
    }
  };

  const btnStyles = {
    warning: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: '#090d16',
      boxShadow: '0 4px 20px rgba(245, 158, 11, 0.35)'
    },
    danger: {
      background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
      color: '#ffffff',
      boxShadow: '0 4px 20px rgba(244, 63, 94, 0.35)'
    },
    info: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: '#04070f',
      boxShadow: '0 4px 20px rgba(16, 185, 129, 0.35)'
    },
    success: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: '#04070f',
      boxShadow: '0 4px 20px rgba(16, 185, 129, 0.35)'
    }
  };

  const hStyle = headerStyles[type] || headerStyles.info;
  const bStyle = btnStyles[type] || btnStyles.info;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '500px',
          background: 'linear-gradient(165deg, #0e172a 0%, #080d1a 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.95), 0 0 50px -10px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: hStyle.bg,
            borderBottom: hStyle.border,
            color: hStyle.color,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle style={{ width: '20px', height: '20px', flexShrink: 0 }} />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, letterSpacing: '0.02em', color: '#ffffff' }}>
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '10px',
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
            <X style={{ width: '16px', height: '16px' }} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {message && (
            <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6' }}>
              {message}
            </p>
          )}
          {children}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 24px',
            background: 'rgba(6, 10, 20, 0.92)',
            borderTop: '1px solid rgba(255, 255, 255, 0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#94a3b8',
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(51, 65, 85, 0.7)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
              e.currentTarget.style.color = '#94a3b8';
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '10px 22px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              transition: 'transform 0.15s, box-shadow 0.2s',
              ...bStyle,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Check style={{ width: '16px', height: '16px' }} />
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
