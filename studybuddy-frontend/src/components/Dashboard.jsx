import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import { useTheme } from '../context/ThemeContext';
import { Smiley, Cards, FileText, CheckSquare, MagicWand, Timer, Question, GameController } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

const accent = '#FFA500';

const dashboardCards = [
  {
    icon: <Cards size={40} weight="fill" />, label: 'Flashcards', route: '/flashcards', color: '#B6F5D9', stat: '12 decks',
    desc: 'Master your subjects with interactive flashcards.'
  },
  {
    icon: <FileText size={40} weight="fill" />, label: 'Notes', route: '/notes', color: '#FFD59A', stat: '7 notes',
    desc: 'Upload, type, and organize your study notes.'
  },
  {
    icon: <CheckSquare size={40} weight="fill" />, label: 'To-Do', route: '/todo', color: '#D6C6FF', stat: '3 tasks',
    desc: 'Stay productive with your daily study tasks.'
  },
  {
    icon: <MagicWand size={40} weight="fill" />, label: 'Summarise', route: '/summarise', color: '#FFD6C6', stat: 'AI Power',
    desc: 'Let AI summarise your notes and readings.'
  },
  {
    icon: <Timer size={40} weight="fill" />, label: 'Timer', route: '/timer', color: '#B6F5D9', stat: '00:00',
    desc: 'Focus with a smart study timer.'
  },
  {
    icon: <Question size={40} weight="fill" />, label: 'Quizzes', route: '/quizzes', color: '#FFD59A', stat: '4 quizzes',
    desc: 'Test your knowledge with custom quizzes.'
  },
];

const motivationalQuotes = [
  "The expert in anything was once a beginner.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The only way to do great work is to love what you do.",
  "Don't watch the clock; do what it does. Keep going.",
  "The future belongs to those who believe in the beauty of their dreams.",
];

export default function Dashboard() {
  const { buddyName } = useContext(AppContext);
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState(0);
  const [cardAnim, setCardAnim] = useState(false);

  useEffect(() => {
    setTimeout(() => setCardAnim(true), 200);
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <main style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: '100%',
      padding: 'max(3vw, 40px)',
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Greeting and quote */}
      <section style={{
        width: '100%',
        maxWidth: 900,
        textAlign: 'center',
        marginBottom: 36,
        marginTop: 10,
        zIndex: 2,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}>
          <div style={{
            background: `radial-gradient(circle at center, ${accent} 0%, ${dark ? '#FFD59A' : '#FFD59A'} 100%)`,
            borderRadius: '50%',
            width: 90,
            height: 90,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
            boxShadow: '0 0 30px rgba(255,165,0,0.3)',
            animation: 'pulse 2s infinite, float 3s ease-in-out infinite',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <Smiley size={44} color="#fff" weight="fill" />
          </div>
          <h1 style={{
            fontSize: 40,
            fontWeight: 800,
            margin: 0,
            color: dark ? '#fff' : '#222',
            lineHeight: 1.1,
            textShadow: dark ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
            background: `linear-gradient(45deg, ${accent}, ${dark ? '#FFD59A' : '#FFD59A'})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Welcome, {buddyName}!
          </h1>
          <div style={{
            fontSize: 20,
            color: dark ? '#FFD59A' : accent,
            marginBottom: 8,
            animation: 'fadeIn 1s ease-in',
            textShadow: dark ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
          }}>
            "{motivationalQuotes[currentQuote]}"
          </div>
        </div>
      </section>

      {/* 2x3 Card Grid */}
      <section style={{
        width: '100%',
        maxWidth: 1200,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: 36,
        margin: '0 auto',
        zIndex: 2,
        minHeight: 420,
      }}>
        {dashboardCards.map((card, i) => (
          <div
            key={card.label}
            onClick={() => navigate(card.route)}
            style={{
              background: `linear-gradient(135deg, ${card.color} 60%, ${dark ? '#232323' : '#fff'} 100%)`,
              borderRadius: 28,
              boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
              padding: '38px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              minHeight: 180,
              border: `2.5px solid ${accent}22`,
              transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s',
              transform: cardAnim ? 'scale(1)' : 'scale(0.85)',
              opacity: cardAnim ? 1 : 0,
              animation: cardAnim ? `fadeIn 0.7s ${i * 0.08 + 0.2}s both` : 'none',
              overflow: 'hidden',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.045)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${accent} 60%, #FFD59A 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 18,
              boxShadow: '0 2px 12px #FFD59A33',
              animation: 'pulse 2s infinite',
            }}>{card.icon}</div>
            <div style={{
              fontWeight: 800,
              fontSize: 26,
              color: dark ? '#fff' : '#222',
              marginBottom: 6,
              letterSpacing: 0.5,
              textAlign: 'center',
            }}>{card.label}</div>
            <div style={{
              fontWeight: 600,
              fontSize: 18,
              color: accent,
              marginBottom: 8,
              textAlign: 'center',
              letterSpacing: 0.2,
            }}>{card.stat}</div>
            <div style={{
              fontSize: 15,
              color: dark ? '#FFD59A' : '#888',
              textAlign: 'center',
              marginBottom: 0,
              fontWeight: 500,
              opacity: 0.92,
            }}>{card.desc}</div>
            {/* Glow effect */}
            <div style={{
              position: 'absolute',
              top: -30,
              left: -30,
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: `${accent}22`,
              filter: 'blur(18px)',
              zIndex: 0,
              pointerEvents: 'none',
            }} />
          </div>
        ))}
      </section>

      {/* Fill space with a subtle animated background (already handled by ParticleBackground) */}
    </main>
  );
} 