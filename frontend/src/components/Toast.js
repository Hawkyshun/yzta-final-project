import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: 1000,
      maxWidth: '400px',
      minWidth: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      animation: 'slideIn 0.3s ease-out',
      fontFamily: 'inherit'
    };

    switch (type) {
      case 'success':
        return {
          ...baseStyles,
          backgroundColor: isDarkMode ? '#064e3b' : '#f0fdf4',
          border: '1px solid #22c55e',
          color: isDarkMode ? '#4ade80' : '#166534'
        };
      case 'error':
        return {
          ...baseStyles,
          backgroundColor: isDarkMode ? '#7f1d1d' : '#fef2f2',
          border: '1px solid #f87171',
          color: isDarkMode ? '#fca5a5' : '#dc2626'
        };
      case 'warning':
        return {
          ...baseStyles,
          backgroundColor: isDarkMode ? '#78350f' : '#fffbeb',
          border: '1px solid #fbbf24',
          color: isDarkMode ? '#fcd34d' : '#92400e'
        };
      case 'info':
      default:
        return {
          ...baseStyles,
          backgroundColor: isDarkMode ? '#1e3a8a' : '#eff6ff',
          border: '1px solid #60a5fa',
          color: isDarkMode ? '#93c5fd' : '#1e40af'
        };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <div style={getToastStyles()}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '1.2rem' }}>{getIcon()}</span>
        <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{message}</span>
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          fontSize: '1.2rem',
          padding: '0',
          marginLeft: '12px',
          opacity: '0.7',
          transition: 'opacity 0.2s'
        }}
        onMouseOver={(e) => e.target.style.opacity = '1'}
        onMouseOut={(e) => e.target.style.opacity = '0.7'}
        title="Kapat"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast; 