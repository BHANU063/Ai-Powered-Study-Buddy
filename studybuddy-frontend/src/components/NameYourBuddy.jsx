import React, { useState } from 'react';
import { Smiley } from '@phosphor-icons/react';

export default function NameYourBuddy() {
  const [name, setName] = useState('Buddy');
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
      <Smiley size={32} color="#FFA500" />
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          fontSize: 20,
          fontWeight: 700,
          border: 'none',
          borderBottom: '2px solid #FFA500',
          background: 'transparent',
          outline: 'none',
          width: 120
        }}
        maxLength={16}
      />
      <span style={{ color: '#888', fontSize: 16 }}>your AI Study Buddy</span>
    </div>
  );
} 