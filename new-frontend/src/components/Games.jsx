import React, { useState } from 'react';
import { GameController, Star } from '@phosphor-icons/react';

export default function Games() {
  const [score, setScore] = useState(0);
  return (
    <div style={{ padding: 40, maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}><GameController size={28} color="#FFA500" /> Mini Game</h2>
      <div style={{ fontSize: 20, marginBottom: 24 }}>Click the star as many times as you can!</div>
      <button
        onClick={() => setScore(s => s + 1)}
        style={{ background: '#FFD59A', border: 'none', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', cursor: 'pointer', marginBottom: 24 }}
      >
        <Star size={48} color="#FFA500" weight="fill" />
      </button>
      <div style={{ fontWeight: 700, fontSize: 24, color: '#FFA500' }}>Score: {score}</div>
    </div>
  );
} 