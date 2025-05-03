import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Smiley, FileText, CheckSquare, Cards, MagicWand, Timer, Question, PlusSquare, ClockCounterClockwise, GameController } from '@phosphor-icons/react';
import { useTheme } from '../context/ThemeContext';

const accent = '#FFA500';
const border = '#E5E5E5';

const icons = [
  { icon: <Smiley size={28} />, label: 'AI Buddy', short: 'Buddy', route: '/buddy' },
  { icon: <FileText size={28} />, label: 'Notes', short: 'Notes', route: '/notes' },
  { icon: <CheckSquare size={28} />, label: 'To-Do', short: 'To-Do', route: '/todo' },
  { icon: <Cards size={28} />, label: 'Flashcards', short: 'Cards', route: '/flashcards' },
  { icon: <MagicWand size={28} />, label: 'Summarise', short: 'Summary', route: '/summarise' },
  { icon: <Timer size={28} />, label: 'Timer', short: 'Timer', route: '/timer' },
  { icon: <Question size={28} />, label: 'Quizzes', short: 'Quiz', route: '/quizzes' },
  { icon: <PlusSquare size={28} />, label: 'Create Flashcard', short: 'Add Card', route: '/create-flashcard' },
  { icon: <ClockCounterClockwise size={28} />, label: 'History', short: 'History', route: '/history' },
  { icon: <GameController size={28} />, label: 'Games', short: 'Games', route: '/games' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState(null);
  const { dark } = useTheme();
  return (
    <aside style={{
      width: '90px',
      background: dark
        ? 'rgba(24, 24, 24, 0.85)'
        : 'rgba(255, 255, 255, 0.85)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px 0',
      borderRight: `1.5px solid ${dark ? 'rgba(255,255,255,0.08)' : border}`,
      boxShadow: dark
        ? '0 4px 32px rgba(0,0,0,0.25)'
        : '0 4px 32px rgba(255,165,0,0.07)',
      backdropFilter: 'blur(12px)',
      transition: 'background 0.3s, box-shadow 0.3s',
      minHeight: '100vh',
      zIndex: 2,
    }}>
      <div style={{ marginBottom: 32 }}>
        {icons.map((item, idx) => {
          const isActive = location.pathname === item.route;
          return (
            <div key={item.label} style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: 18 }}>
              <button
                title={item.label}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  background: isActive
                    ? `linear-gradient(135deg, ${accent} 60%, #FFD59A 100%)`
                    : dark
                    ? 'rgba(40,40,40,0.7)'
                    : 'rgba(238,238,238,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: isActive ? `2.5px solid ${accent}` : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s, box-shadow 0.2s, border 0.2s',
                  outline: 'none',
                  fontSize: 0,
                  boxShadow: isActive
                    ? `0 2px 16px 0 ${accent}33, 0 0 0 4px ${accent}22`
                    : '0 2px 8px rgba(0,0,0,0.04)',
                  transform: isActive ? 'scale(1.08)' : 'scale(1)',
                  animation: isActive ? 'glow 1.5s infinite alternate' : 'none',
                }}
                tabIndex={0}
                onClick={() => navigate(item.route)}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <span style={{ color: isActive ? '#fff' : accent, transition: 'color 0.2s' }}>{item.icon}</span>
              </button>
              {(hovered === idx || isActive) && (
                <span style={{
                  position: 'absolute',
                  left: 60,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: dark ? '#232323' : '#fff',
                  color: accent,
                  fontWeight: 700,
                  fontSize: 15,
                  borderRadius: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                  padding: '4px 14px',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                  pointerEvents: 'none',
                  border: `1.5px solid ${accent}`
                }}>{item.short}</span>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ flexGrow: 1 }} />
      {/* Profile avatar placeholder */}
      <div style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${accent} 60%, #FFD59A 100%)`,
        marginBottom: 8,
        boxShadow: '0 2px 12px rgba(255,165,0,0.15)',
        border: `2.5px solid ${accent}`
      }} />
    </aside>
  );
} 