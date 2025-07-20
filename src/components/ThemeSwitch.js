import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitch = ({ position = 'header' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const getSwitchStyles = () => {
    const baseStyles = {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      fontSize: '1.2rem'
    };

    if (position === 'header') {
      return {
        ...baseStyles,
        color: 'var(--text-primary)',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--border-color)'
      };
    }

    return {
      ...baseStyles,
      color: 'var(--text-primary)',
      background: 'var(--card-bg)',
      border: '1px solid var(--border-color)',
      boxShadow: `0 2px 8px var(--shadow-color)`
    };
  };

  return (
    <button
      onClick={toggleTheme}
      style={getSwitchStyles()}
      title={isDarkMode ? 'Açık moda geç' : 'Koyu moda geç'}
      onMouseOver={(e) => {
        e.target.style.transform = 'scale(1.1)';
        e.target.style.background = isDarkMode 
          ? 'rgba(255, 255, 255, 0.2)' 
          : 'rgba(0, 0, 0, 0.1)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.background = isDarkMode 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(255, 255, 255, 0.1)';
      }}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeSwitch; 