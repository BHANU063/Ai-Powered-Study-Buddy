import React, { useRef, useState } from 'react';
import { FileText, Trash, UploadSimple, NotePencil } from '@phosphor-icons/react';
import { useTheme } from '../context/ThemeContext';

const accent = '#FFA500';

export default function NotesUploader() {
  const { dark } = useTheme();
  const fileInput = useRef();
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [dragActive, setDragActive] = useState(false);

  const addNote = () => {
    if (note.trim()) {
      setNotes(prev => {
        const updated = [...prev, { text: note, date: new Date().toISOString() }];
        localStorage.setItem('notes', JSON.stringify(updated));
        return updated;
      });
      setNote('');
    }
  };

  const deleteNote = idx => {
    setNotes(prev => {
      const updated = prev.filter((_, i) => i !== idx);
      localStorage.setItem('notes', JSON.stringify(updated));
      return updated;
    });
  };

  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setNotes(prev => {
        const updated = [...prev, { text: ev.target.result, date: new Date().toISOString(), file: file.name }];
        localStorage.setItem('notes', JSON.stringify(updated));
        return updated;
      });
    };
    reader.readAsText(file);
  };

  const handleDrop = e => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      fileInput.current.files = e.dataTransfer.files;
      handleFile({ target: { files: e.dataTransfer.files } });
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: '0 auto', minHeight: 500 }}>
      {/* Upload/Type area */}
      <div
        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
        onDrop={handleDrop}
        style={{
          background: dark ? 'rgba(24,24,24,0.85)' : 'rgba(255,255,255,0.85)',
          border: dragActive ? `2.5px dashed ${accent}` : `2.5px solid ${dark ? '#FFD59A55' : '#FFA50033'}`,
          borderRadius: 24,
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          padding: 32,
          marginBottom: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          position: 'relative',
          transition: 'border 0.3s, box-shadow 0.3s',
          cursor: 'pointer',
        }}
        onClick={() => fileInput.current.click()}
      >
        <UploadSimple size={44} color={accent} weight="fill" style={{ marginBottom: 8, animation: dragActive ? 'bounce 1s infinite' : 'float 3s infinite' }} />
        <div style={{ fontWeight: 700, fontSize: 22, color: dark ? '#FFD59A' : accent, marginBottom: 4 }}>
          Drag & drop or click to upload notes
        </div>
        <input
          type="file"
          accept=".txt,.pdf,.doc,.docx"
          ref={fileInput}
          style={{ display: 'none' }}
          onChange={handleFile}
        />
        <div style={{ color: dark ? '#aaa' : '#888', fontSize: 15, marginBottom: 8 }}>
          or type your notes below
        </div>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Type your notes here..."
          rows={4}
          style={{
            width: '100%',
            maxWidth: 600,
            borderRadius: 14,
            border: `1.5px solid ${accent}`,
            padding: 14,
            fontSize: 17,
            background: dark ? '#232323' : '#fff',
            color: dark ? '#fff' : '#222',
            marginBottom: 10,
            transition: 'all 0.3s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
        />
        <button
          onClick={e => { e.stopPropagation(); addNote(); }}
          style={{
            background: accent,
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '10px 28px',
            fontWeight: 700,
            fontSize: 17,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #FFD59A33',
            marginTop: 4,
            transition: 'background 0.2s',
          }}
        >
          <NotePencil size={22} style={{ marginRight: 8, verticalAlign: -3 }} /> Add Note
        </button>
      </div>

      {/* Notes list */}
      {notes.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: 60,
          color: dark ? '#FFD59A' : accent,
          opacity: 0.85,
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 24,
          background: dark ? 'rgba(24,24,24,0.7)' : 'rgba(255,255,255,0.7)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          marginTop: 32,
          marginBottom: 32,
          position: 'relative',
        }}>
          <FileText size={48} color={accent} style={{ marginBottom: 18, animation: 'pulse 2s infinite' }} />
          <div>No notes yet!</div>
          <div style={{ color: dark ? '#aaa' : '#888', fontWeight: 500, fontSize: 16, marginTop: 8 }}>
            Start by uploading or typing your first note.<br />Your notes will appear here, beautifully organized.
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 28,
          marginTop: 18,
        }}>
          {notes.map((n, idx) => (
            <div key={idx} style={{
              background: dark ? 'rgba(24,24,24,0.92)' : 'rgba(255,255,255,0.92)',
              borderRadius: 20,
              boxShadow: '0 4px 18px rgba(0,0,0,0.10)',
              padding: '28px 22px 22px 22px',
              position: 'relative',
              minHeight: 120,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              border: `2px solid ${accent}22`,
              transition: 'box-shadow 0.2s, border 0.2s',
              overflow: 'hidden',
              animation: 'fadeIn 0.7s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <FileText size={22} color={accent} />
                <span style={{ fontWeight: 700, fontSize: 17, color: dark ? '#FFD59A' : accent }}>
                  {n.file ? n.file : 'Typed Note'}
                </span>
                <button
                  onClick={() => deleteNote(idx)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: accent,
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginLeft: 'auto',
                    fontSize: 18,
                    transition: 'color 0.2s',
                  }}
                  title="Delete note"
                >
                  <Trash size={18} />
                </button>
              </div>
              <div style={{
                color: dark ? '#fff' : '#222',
                fontSize: 15,
                fontWeight: 500,
                opacity: 0.95,
                marginBottom: 4,
                whiteSpace: 'pre-line',
                maxHeight: 80,
                overflow: 'auto',
              }}>{n.text.length > 180 ? n.text.slice(0, 180) + '...' : n.text}</div>
              <div style={{ color: dark ? '#FFD59A' : accent, fontSize: 13, fontWeight: 600, marginTop: 'auto', opacity: 0.7 }}>
                {new Date(n.date).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 