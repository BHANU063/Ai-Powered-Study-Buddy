import React, { useContext } from 'react';
import { AppContext } from '../App';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from '@phosphor-icons/react';

const accent = '#FFA500';
const border = '#E5E5E5';

export default function Topbar() {
  const { buddyName } = useContext(AppContext);
  const { dark, toggleTheme } = useTheme();
  return (
    <header style={{
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      borderBottom: `1px solid ${border}`,
      background: dark ? 'rgba(35,35,35,0.95)' : 'rgba(255,255,255,0.95)',
      color: dark ? '#fff' : '#222',
      transition: 'background 0.3s, color 0.3s',
      backdropFilter: 'blur(10px)',
      zIndex: 10
    }}>
      {/* Logo */}
      <div style={{ fontWeight: 700, fontSize: 28, color: dark ? '#fff' : '#222' }}>
        {/* Removed Study.Com branding */}
      </div>
      {/* Nav links */}
      <nav style={{ display: 'flex', gap: 40, fontSize: 18 }}>
        <span style={{ fontWeight: 700, borderBottom: `3px solid ${accent}` }}>Home</span>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: dark ? '#fff' : '#222' }}>Youtube</a>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: dark ? '#fff' : '#222' }}>Google</a>
        <span>About Us</span>
      </nav>
      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            marginRight: 8,
            transition: 'transform 0.2s',
            fontSize: 0
          }}
        >
          <span style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: dark ? 'rgba(35,35,35,0.7)' : 'rgba(255,213,154,0.7)',
            boxShadow: dark ? '0 2px 8px #0002' : '0 2px 8px #FFD59A33',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s',
            position: 'relative',
            overflow: 'hidden',
            border: `2px solid ${accent}`
          }}>
            <span style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              transition: 'opacity 0.3s',
              opacity: dark ? 0 : 1
            }}>
              <Sun size={26} color={accent} weight="fill" style={{ transition: 'transform 0.5s', transform: dark ? 'scale(0.7) rotate(-30deg)' : 'scale(1) rotate(0deg)' }} />
            </span>
            <span style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              transition: 'opacity 0.3s',
              opacity: dark ? 1 : 0
            }}>
              <Moon size={24} color={accent} weight="fill" style={{ transition: 'transform 0.5s', transform: dark ? 'scale(1) rotate(0deg)' : 'scale(0.7) rotate(30deg)' }} />
            </span>
          </span>
        </button>
        <div style={{ fontWeight: 700, fontSize: 18, color: accent }}>Hi, {buddyName}!</div>
        <button style={{ background: accent, color: '#fff', border: 'none', borderRadius: 12, padding: '10px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #FFD59A33' }}>Sign Up</button>
      </div>
    </header>
  );
} 