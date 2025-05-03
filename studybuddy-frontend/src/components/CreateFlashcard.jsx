import React, { useState } from 'react';
import { PlusSquare } from '@phosphor-icons/react';

export default function CreateFlashcard() {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [created, setCreated] = useState(false);

  const handleCreate = () => {
    if (front.trim() && back.trim()) {
      setCreated(true);
      setFront('');
      setBack('');
      setTimeout(() => setCreated(false), 1500);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 400, margin: '0 auto' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}><PlusSquare size={28} color="#FFA500" /> Create Flashcard</h2>
      <input
        value={front}
        onChange={e => setFront(e.target.value)}
        placeholder="Front"
        style={{ width: '100%', borderRadius: 8, border: '1.5px solid #FFA500', padding: 8, fontSize: 16, marginBottom: 12 }}
      />
      <input
        value={back}
        onChange={e => setBack(e.target.value)}
        placeholder="Back"
        style={{ width: '100%', borderRadius: 8, border: '1.5px solid #FFA500', padding: 8, fontSize: 16, marginBottom: 12 }}
      />
      <button
        onClick={handleCreate}
        style={{ background: '#FFA500', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginBottom: 16 }}
        disabled={!front.trim() || !back.trim()}
      >Create</button>
      {created && <div style={{ color: '#FFA500', fontWeight: 700 }}>Flashcard created!</div>}
    </div>
  );
} 