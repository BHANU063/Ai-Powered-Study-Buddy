import React, { useState, useEffect } from 'react';
import { Smiley, Sparkle, Lightning, Lightbulb, ChatCircleDots, Trophy, NotePencil, Cards, Question, CheckCircle } from '@phosphor-icons/react';

const accent = '#FFA500';
const motivationalQuotes = [
  "The expert in anything was once a beginner.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The only way to do great work is to love what you do.",
  "Don't watch the clock; do what it does. Keep going.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "You are unstoppable!"
];
const randomTips = [
  "Take regular breaks for better focus!",
  "Review your notes after each study session.",
  "Try teaching a concept to someone else.",
  "Stay hydrated and get enough sleep!",
  "Use flashcards for quick revision."
];

export default function NameYourBuddy() {
  const [name, setName] = useState('Buddy');
  const [quote, setQuote] = useState(motivationalQuotes[0]);
  const [tip, setTip] = useState(randomTips[0]);
  const [aiChat, setAiChat] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [streak, setStreak] = useState(3); // Example streak
  const [completed, setCompleted] = useState(12); // Example completed tasks
  const [quizzes, setQuizzes] = useState(() => {
    const saved = localStorage.getItem('quizzes');
    return saved ? JSON.parse(saved) : [];
  });
  const [flashcards, setFlashcards] = useState(() => {
    const saved = localStorage.getItem('flashcards');
    return saved ? JSON.parse(saved) : [];
  });
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickAction = (action) => {
    if (action === 'ai') setAiResponse("I'm here to help! Ask me anything about your studies.");
    if (action === 'plan') setAiResponse("Here's a quick study plan: 1. Review notes 2. Practice flashcards 3. Take a quiz 4. Summarise what you learned!");
    if (action === 'motivate') setAiResponse(quote);
    if (action === 'tip') setAiResponse(randomTips[Math.floor(Math.random() * randomTips.length)]);
  };
  const handleAiChat = (e) => {
    e.preventDefault();
    setAiResponse("(AI says): That's a great question! Keep up the good work, " + name + "!");
    setAiChat('');
  };

  return (
    <div style={{
      maxWidth: 900,
      margin: '0 auto',
      padding: 40,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 32,
      background: 'radial-gradient(circle at 50% 0%, #fffbe6 0%, #fff0 70%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle floating shapes for depth */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        <div style={{ position: 'absolute', top: 60, left: 40, width: 80, height: 80, borderRadius: '50%', background: '#FFD59A33', filter: 'blur(18px)' }} />
        <div style={{ position: 'absolute', bottom: 80, right: 60, width: 120, height: 120, borderRadius: '50%', background: '#FFA50022', filter: 'blur(24px)' }} />
        <div style={{ position: 'absolute', top: 200, right: 120, width: 60, height: 60, borderRadius: '50%', background: '#B6F5D955', filter: 'blur(12px)' }} />
      </div>
      {/* Avatar & Greeting */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 1 }}>
        <div style={{
          background: `radial-gradient(circle at center, ${accent} 0%, #FFD59A 100%)`,
          borderRadius: '50%',
          width: 120,
          height: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
          boxShadow: '0 0 40px 12px #FFA500, 0 0 80px 30px #FFD59A',
          animation: 'pulse 2s infinite, float 3s ease-in-out infinite',
          position: 'relative',
          overflow: 'hidden',
          filter: 'drop-shadow(0 0 30px #FFA50088) drop-shadow(0 0 60px #FFD59A66)',
        }}>
          <Smiley size={70} color="#fff" weight="fill" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              fontSize: 36,
              fontWeight: 900,
              border: 'none',
              borderBottom: `4px solid ${accent}`,
              background: 'transparent',
              outline: 'none',
              width: 180,
              textAlign: 'center',
              color: '#FFA500',
              marginRight: 8,
              letterSpacing: 1.2,
              borderRadius: 0,
              boxShadow: '0 2px 0 #FFD59A',
              transition: 'border-bottom 0.2s',
            }}
            maxLength={16}
          />
          <span style={{ color: '#888', fontSize: 22, fontWeight: 700, letterSpacing: 0.5 }}>your AI Study Buddy</span>
        </div>
      </div>
      {/* Motivational Quote */}
      <div style={{
        fontSize: 24,
        color: accent,
        fontWeight: 800,
        marginBottom: 8,
        textAlign: 'center',
        background: '#fffbe6',
        borderRadius: 14,
        padding: '14px 32px',
        boxShadow: '0 2px 12px #FFD59A33',
        display: 'inline-block',
        zIndex: 1,
        border: `2px solid ${accent}33`,
        letterSpacing: 0.5,
      }}>
        <Sparkle size={26} color={accent} style={{ marginRight: 10, verticalAlign: 'middle' }} />
        {quote}
      </div>
      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: 18, margin: '18px 0', flexWrap: 'wrap', justifyContent: 'center', zIndex: 1 }}>
        <button onClick={() => handleQuickAction('ai')} style={{ background: accent, color: '#fff', border: 'none', borderRadius: 14, padding: '12px 28px', fontWeight: 800, fontSize: 17, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 12px #FFD59A33', letterSpacing: 0.5, transition: 'background 0.2s' }}><ChatCircleDots size={22} /> Ask AI</button>
        <button onClick={() => handleQuickAction('plan')} style={{ background: accent, color: '#fff', border: 'none', borderRadius: 14, padding: '12px 28px', fontWeight: 800, fontSize: 17, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 12px #FFD59A33', letterSpacing: 0.5, transition: 'background 0.2s' }}><Lightbulb size={22} /> Suggest Study Plan</button>
        <button onClick={() => handleQuickAction('motivate')} style={{ background: accent, color: '#fff', border: 'none', borderRadius: 14, padding: '12px 28px', fontWeight: 800, fontSize: 17, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 12px #FFD59A33', letterSpacing: 0.5, transition: 'background 0.2s' }}><Lightning size={22} /> Motivate Me</button>
        <button onClick={() => handleQuickAction('tip')} style={{ background: accent, color: '#fff', border: 'none', borderRadius: 14, padding: '12px 28px', fontWeight: 800, fontSize: 17, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 12px #FFD59A33', letterSpacing: 0.5, transition: 'background 0.2s' }}><Sparkle size={22} /> Random Tip</button>
      </div>
      {/* AI Response Box */}
      {aiResponse && (
        <div style={{ background: '#fffbe6', borderRadius: 12, padding: 20, margin: '8px 0', border: `2px solid #FFD59A`, color: '#222', fontWeight: 700, fontSize: 18, maxWidth: 520, textAlign: 'center', boxShadow: '0 2px 12px #FFD59A33', zIndex: 1 }}>{aiResponse}</div>
      )}
      {/* Recent Activity */}
      <div style={{ width: '100%', margin: '24px 0', display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
        <div style={{ background: '#FFD59A22', borderRadius: 18, padding: 18, minWidth: 180, flex: 1, maxWidth: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <NotePencil size={32} color={accent} />
          <div style={{ fontWeight: 700, fontSize: 20 }}>{notes.length}</div>
          <div style={{ color: '#888', fontWeight: 600 }}>Notes</div>
        </div>
        <div style={{ background: '#B6F5D9', borderRadius: 18, padding: 18, minWidth: 180, flex: 1, maxWidth: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Cards size={32} color={accent} />
          <div style={{ fontWeight: 700, fontSize: 20 }}>{flashcards.length}</div>
          <div style={{ color: '#888', fontWeight: 600 }}>Flashcards</div>
        </div>
        <div style={{ background: '#FFD59A', borderRadius: 18, padding: 18, minWidth: 180, flex: 1, maxWidth: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Question size={32} color={accent} />
          <div style={{ fontWeight: 700, fontSize: 20 }}>{quizzes.length}</div>
          <div style={{ color: '#888', fontWeight: 600 }}>Quizzes</div>
        </div>
      </div>
      {/* Progress Tracker */}
      <div style={{ width: '100%', maxWidth: 500, margin: '0 auto', marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: accent, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}><Trophy size={22} color={accent} /> Progress Tracker</div>
        <div style={{ background: '#FFD59A22', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CheckCircle size={20} color={accent} /> Study Streak: <span style={{ fontWeight: 700 }}>{streak} days</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CheckCircle size={20} color={accent} /> Completed Tasks: <span style={{ fontWeight: 700 }}>{completed}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CheckCircle size={20} color={accent} /> Quizzes Taken: <span style={{ fontWeight: 700 }}>{quizzes.length}</span>
          </div>
        </div>
      </div>
      {/* AI Chat/Help Box */}
      <form onSubmit={handleAiChat} style={{ width: '100%', maxWidth: 500, margin: '0 auto', marginBottom: 24, display: 'flex', gap: 10 }}>
        <input
          value={aiChat}
          onChange={e => setAiChat(e.target.value)}
          placeholder="Ask your AI Buddy anything..."
          style={{ flex: 1, borderRadius: 10, border: `1.5px solid ${accent}`, padding: 12, fontSize: 16, background: '#fff', color: '#222', fontWeight: 600 }}
        />
        <button type="submit" style={{ background: accent, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 22px', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #FFD59A33' }}>Send</button>
      </form>
    </div>
  );
} 