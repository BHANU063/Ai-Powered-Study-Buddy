import React, { useState } from 'react';
import { MagicWand } from '@phosphor-icons/react';

export default function Summariser() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarise = () => {
    setLoading(true);
    setTimeout(() => {
      setSummary('This is a mock summary of your text. (AI integration coming soon!)');
      setLoading(false);
    }, 1200);
  };

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: '0 auto' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}><MagicWand size={28} color="#FFA500" /> Summariser</h2>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        rows={6}
        style={{ width: '100%', borderRadius: 10, border: '1.5px solid #FFA500', padding: 12, fontSize: 16, resize: 'vertical', marginBottom: 12 }}
      />
      <button
        onClick={handleSummarise}
        style={{ background: '#FFA500', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginBottom: 16 }}
        disabled={loading || !text.trim()}
      >{loading ? 'Summarising...' : 'Summarise'}</button>
      {summary && (
        <div style={{ background: '#fffbe6', borderRadius: 10, padding: 16, marginTop: 8, border: '1.5px solid #FFD59A' }}>
          <strong>Summary:</strong>
          <div style={{ marginTop: 6 }}>{summary}</div>
        </div>
      )}
    </div>
  );
} 