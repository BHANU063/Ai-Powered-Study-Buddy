import React, { useState, useRef } from 'react';
import { Timer as TimerIcon, Play, Pause, ArrowCounterClockwise, Sparkle } from '@phosphor-icons/react';
import { useTheme } from '../context/ThemeContext';

const accent = '#FFA500';

function CircularTimer({ percent, time, dark }) {
  const size = 180;
  const stroke = 13;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} style={{ display: 'block', margin: '0 auto' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={dark ? '#333' : '#eee'}
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={accent}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s', filter: `drop-shadow(0 0 16px ${accent}99)` }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.35em"
        fontSize={44}
        fontWeight={800}
        fill={dark ? '#FFD59A' : accent}
        style={{ fontFamily: 'monospace', letterSpacing: 2 }}
      >
        {time}
      </text>
    </svg>
  );
}

const motivational = [
  "Great job! Take a short break.",
  "You crushed it! Ready for another round?",
  "Focus brings results. Well done!",
  "Every minute counts. Keep going!",
  "You're unstoppable!"
];

export default function Timer() {
  const { dark } = useTheme();
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [duration, setDuration] = useState(25); // default 25 min
  const [showDone, setShowDone] = useState(false);
  const intervalRef = useRef();
  const audioRef = useRef(); // For sound

  const total = duration * 60;
  const percent = total ? Math.round((seconds / total) * 100) : 0;
  const mins = String(Math.floor((total - seconds) / 60)).padStart(2, '0');
  const secs = String((total - seconds) % 60).padStart(2, '0');

  const start = () => {
    if (!running && duration > 0) {
      setRunning(true);
      setShowDone(false);
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s + 1 >= total) {
            clearInterval(intervalRef.current);
            setRunning(false);
            setShowDone(true);
            if (audioRef.current) audioRef.current.play(); // Play sound
            return total;
          }
          return s + 1;
        });
      }, 1000);
    }
  };
  const pause = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };
  const reset = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    setSeconds(0);
    setShowDone(false);
  };

  React.useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div style={{
      padding: 40,
      maxWidth: 500,
      margin: '0 auto',
      minHeight: 500,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: dark ? 'rgba(24,24,24,0.92)' : 'rgba(255,255,255,0.92)',
        borderRadius: 32,
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
        padding: 36,
        width: '100%',
        maxWidth: 420,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: `2.5px solid ${dark ? '#FFD59A55' : '#FFA50033'}`,
        position: 'relative',
        transition: 'border 0.3s, box-shadow 0.3s',
      }}>
        <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c82.mp3" preload="auto" />
        <h2 style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', color: dark ? '#FFD59A' : accent, fontWeight: 800, fontSize: 28, marginBottom: 18 }}><TimerIcon size={32} color={accent} /> Timer</h2>
        <div style={{ marginBottom: 18 }}>
          <CircularTimer percent={percent} time={`${mins}:${secs}`} dark={dark} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <input
            type="number"
            min={1}
            max={120}
            value={duration}
            onChange={e => setDuration(Math.max(1, Math.min(120, Number(e.target.value))))}
            disabled={running}
            style={{
              width: 70,
              borderRadius: 10,
              border: `1.5px solid ${accent}`,
              padding: 8,
              fontSize: 18,
              background: dark ? '#232323' : '#fff',
              color: dark ? '#fff' : '#222',
              textAlign: 'center',
              fontWeight: 700,
              marginRight: 8,
              transition: 'all 0.3s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
          />
          <span style={{ color: dark ? '#FFD59A' : accent, fontWeight: 700, fontSize: 18 }}>min</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginBottom: 10 }}>
          <button onClick={start} disabled={running || seconds >= total} style={{ background: accent, color: '#fff', border: 'none', borderRadius: 14, padding: '12px 32px', fontWeight: 700, fontSize: 18, cursor: running || seconds >= total ? 'not-allowed' : 'pointer', boxShadow: '0 2px 8px #FFD59A33', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: 8, opacity: running || seconds >= total ? 0.6 : 1 }}><Play size={22} /> Start</button>
          <button onClick={pause} disabled={!running} style={{ background: dark ? '#FFD59A' : '#fff', color: accent, border: `1.5px solid ${accent}`, borderRadius: 14, padding: '12px 32px', fontWeight: 700, fontSize: 18, cursor: running ? 'pointer' : 'not-allowed', boxShadow: '0 2px 8px #FFD59A33', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: 8, opacity: running ? 1 : 0.6 }}><Pause size={22} /> Pause</button>
          <button onClick={reset} style={{ background: dark ? '#232323' : '#fff', color: accent, border: `1.5px solid ${accent}`, borderRadius: 14, padding: '12px 32px', fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #FFD59A33', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}><ArrowCounterClockwise size={22} /> Reset</button>
        </div>
        {showDone && (
          <div style={{
            marginTop: 24,
            textAlign: 'center',
            color: dark ? '#FFD59A' : accent,
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: 0.2,
            animation: 'fadeIn 1s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10
          }}>
            <Sparkle size={32} color={accent} style={{ animation: 'pulse 2s infinite' }} />
            {motivational[Math.floor(Math.random() * motivational.length)]}
          </div>
        )}
      </div>
    </div>
  );
} 