import React, { useState } from 'react';
import { CheckSquare, Trash, PlusCircle } from '@phosphor-icons/react';
import { useTheme } from '../context/ThemeContext';

const accent = '#FFA500';

function ProgressRing({ percent, size = 60, stroke = 7 }) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#eee"
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
        style={{ transition: 'stroke-dashoffset 0.5s' }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.35em"
        fontSize={18}
        fontWeight={700}
        fill={accent}
      >
        {percent}%
      </text>
    </svg>
  );
}

export default function ToDoList() {
  const { dark } = useTheme();
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks(prev => {
        const updated = [...prev, { text: input, done: false }];
        localStorage.setItem('tasks', JSON.stringify(updated));
        return updated;
      });
      setInput('');
    }
  };
  const toggleTask = idx => setTasks(prev => {
    const updated = prev.map((t, i) => i === idx ? { ...t, done: !t.done } : t);
    localStorage.setItem('tasks', JSON.stringify(updated));
    return updated;
  });
  const removeTask = idx => setTasks(prev => {
    const updated = prev.filter((_, i) => i !== idx);
    localStorage.setItem('tasks', JSON.stringify(updated));
    return updated;
  });

  const percent = tasks.length ? Math.round((tasks.filter(t => t.done).length / tasks.length) * 100) : 0;

  return (
    <div style={{ padding: 40, maxWidth: 700, margin: '0 auto', minHeight: 500 }}>
      {/* Input area and progress */}
      <div style={{
        background: dark ? 'rgba(24,24,24,0.85)' : 'rgba(255,255,255,0.85)',
        borderRadius: 24,
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        padding: 32,
        marginBottom: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 18,
        position: 'relative',
        border: `2.5px solid ${dark ? '#FFD59A55' : '#FFA50033'}`,
        transition: 'border 0.3s, box-shadow 0.3s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <CheckSquare size={32} color={accent} />
          <span style={{ fontWeight: 800, fontSize: 22, color: dark ? '#FFD59A' : accent }}>To-Do List</span>
        </div>
        <div style={{ display: 'flex', gap: 10, width: '100%', maxWidth: 420, marginBottom: 8 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add a task..."
            style={{
              flex: 1,
              borderRadius: 12,
              border: `1.5px solid ${accent}`,
              padding: 12,
              fontSize: 16,
              background: dark ? '#232323' : '#fff',
              color: dark ? '#fff' : '#222',
              transition: 'all 0.3s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
            onKeyDown={e => e.key === 'Enter' && addTask()}
          />
          <button
            onClick={addTask}
            style={{
              background: accent,
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '10px 18px',
              fontWeight: 700,
              fontSize: 17,
              cursor: 'pointer',
              boxShadow: '0 2px 8px #FFD59A33',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <PlusCircle size={20} /> Add
          </button>
        </div>
        <div style={{ marginTop: 10 }}>
          <ProgressRing percent={percent} />
        </div>
      </div>

      {/* Tasks list */}
      {tasks.length === 0 ? (
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
          <CheckSquare size={48} color={accent} style={{ marginBottom: 18, animation: 'pulse 2s infinite' }} />
          <div>No tasks yet!</div>
          <div style={{ color: dark ? '#aaa' : '#888', fontWeight: 500, fontSize: 16, marginTop: 8 }}>
            Add your first task and start crushing your goals!
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 18,
          marginTop: 18,
        }}>
          {tasks.map((task, idx) => (
            <div key={idx} style={{
              background: dark ? 'rgba(24,24,24,0.92)' : 'rgba(255,255,255,0.92)',
              borderRadius: 18,
              boxShadow: '0 4px 18px rgba(0,0,0,0.10)',
              padding: '18px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              border: `2px solid ${accent}22`,
              transition: 'box-shadow 0.2s, border 0.2s',
              animation: 'fadeIn 0.7s',
              position: 'relative',
            }}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(idx)}
                style={{ width: 22, height: 22, accentColor: accent, marginRight: 8, cursor: 'pointer' }}
              />
              <span style={{
                textDecoration: task.done ? 'line-through' : 'none',
                flex: 1,
                color: dark ? (task.done ? '#FFD59A99' : '#fff') : (task.done ? '#FFD59A99' : '#222'),
                fontWeight: 600,
                fontSize: 17,
                letterSpacing: 0.1,
                transition: 'color 0.2s',
              }}>{task.text}</span>
              <button
                onClick={() => removeTask(idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: accent,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: 20,
                  marginLeft: 8,
                  transition: 'color 0.2s',
                }}
                title="Delete task"
              >
                <Trash size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 