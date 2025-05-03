import React, { useState, useRef, useEffect } from 'react';
import { ChatCircleDots, Sparkle, X, ArrowsOutSimple, ArrowsInSimple } from '@phosphor-icons/react';

const accent = '#FFA500';

export default function AIAgentFloatingButton() {
  const [open, setOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi! How can I help you today?" }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, maximized]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    // Placeholder for AI response (will be replaced with Gemini API)
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: "ai", text: "(AI response will appear here)" }]);
    }, 800);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
          background: `radial-gradient(circle at 60% 40%, ${accent} 0%, #FFD59A 100%)`,
          border: 'none',
          borderRadius: '50%',
          width: 70,
          height: 70,
          boxShadow: '0 0 24px 6px #FFA50088, 0 0 48px 12px #FFD59A66',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'box-shadow 0.2s',
          outline: 'none',
          animation: 'pulse 2s infinite',
        }}
        title="AI Agent"
      >
        <ChatCircleDots size={36} color="#fff" weight="fill" style={{ position: 'absolute', left: 17, top: 17 }} />
        <Sparkle size={22} color="#fffbe6" style={{ position: 'absolute', right: 12, top: 12, opacity: 0.7 }} />
        <span style={{ position: 'absolute', bottom: 10, right: 12, fontSize: 12, color: '#fffbe6', fontWeight: 700, opacity: 0.8 }}>AI</span>
      </button>
      {open && (
        <div style={{
          position: 'fixed',
          bottom: maximized ? 0 : 110,
          right: maximized ? 0 : 32,
          width: maximized ? '50vw' : 340,
          maxWidth: maximized ? '700px' : '90vw',
          height: maximized ? '60vh' : 420,
          minHeight: 320,
          background: '#fffbe6',
          borderRadius: maximized ? '24px 0 0 0' : 18,
          boxShadow: '0 8px 32px #FFD59A88',
          zIndex: 1100,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 0.3s',
          transition: 'all 0.3s',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px 10px 20px',
            borderBottom: `2px solid ${accent}33`,
            fontWeight: 800,
            fontSize: 18,
            color: accent,
            background: '#fff',
            borderTopLeftRadius: maximized ? 24 : 18,
            borderTopRightRadius: maximized ? 0 : 18,
          }}>
            <span>AI Agent</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setMaximized(m => !m)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} title={maximized ? "Minimize" : "Maximize"}>
                {maximized ? <ArrowsInSimple size={22} color={accent} /> : <ArrowsOutSimple size={22} color={accent} />}
              </button>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} title="Close"><X size={22} color={accent} /></button>
            </div>
          </div>
          <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, background: '#fffbe6' }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.from === 'user' ? accent : '#FFD59A',
                  color: msg.from === 'user' ? '#fff' : '#222',
                  borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  padding: '8px 14px',
                  maxWidth: '80%',
                  fontWeight: 500,
                  fontSize: 15,
                  boxShadow: msg.from === 'user' ? '0 2px 8px #FFD59A33' : '0 2px 8px #FFA50022',
                  marginBottom: 2,
                }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form style={{ display: 'flex', gap: 8, padding: 14, borderTop: `2px solid ${accent}22`, background: '#fff', borderBottomLeftRadius: maximized ? 24 : 18, borderBottomRightRadius: maximized ? 0 : 18 }} onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{ flex: 1, borderRadius: 10, border: `1.5px solid ${accent}`, padding: 10, fontSize: 15, background: '#fffbe6', color: '#222', fontWeight: 600 }}
              autoFocus
            />
            <button type="submit" style={{ background: accent, color: '#fff', border: 'none', borderRadius: 10, padding: '8px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer', opacity: input.trim() ? 1 : 0.7 }} disabled={!input.trim()}>Send</button>
          </form>
        </div>
      )}
    </>
  );
} 