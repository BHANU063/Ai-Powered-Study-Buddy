import React from 'react';
import { ChatCircleDots, Sparkle } from '@phosphor-icons/react';

const accent = '#FFA500';

export default function AIAgentFloatingButton() {
  return (
    <button
      onClick={() => alert('Hi! I am your AI Agent. How can I help you?')}
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
  );
} 