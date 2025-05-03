import React from 'react';
import { ClockCounterClockwise } from '@phosphor-icons/react';

const mockHistory = [
  { type: 'Note', desc: 'Uploaded notes on React', time: '2 min ago' },
  { type: 'Flashcard', desc: 'Created 3 flashcards', time: '10 min ago' },
  { type: 'Quiz', desc: 'Scored 4/5 on JavaScript quiz', time: '30 min ago' },
  { type: 'Timer', desc: 'Completed 25 min session', time: '1 hr ago' },
];

export default function History() {
  return (
    <div style={{ padding: 40, maxWidth: 500, margin: '0 auto' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}><ClockCounterClockwise size={28} color="#FFA500" /> History</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {mockHistory.map((item, idx) => (
          <li key={idx} style={{ background: '#fff', borderRadius: 10, padding: 16, marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ fontWeight: 700, color: '#FFA500' }}>{item.type}</div>
            <div>{item.desc}</div>
            <div style={{ color: '#888', fontSize: 14 }}>{item.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
} 