import React, { useState, useEffect } from 'react';
import { Cards, Trash, Plus, ArrowLeft, ArrowRight, Sparkle } from '@phosphor-icons/react';
import { useTheme } from '../context/ThemeContext';

const accent = '#FFA500';

export default function Flashcards() {
  const { dark } = useTheme();
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('flashcards');
    return saved ? JSON.parse(saved) : [];
  });
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [flipped, setFlipped] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(cards));
    setAnim(true);
    const t = setTimeout(() => setAnim(false), 500);
    return () => clearTimeout(t);
  }, [cards, currentIndex]);

  const addCard = () => {
    if (front.trim() && back.trim()) {
      setCards([...cards, { front, back }]);
      setFront('');
      setBack('');
      setIsAdding(false);
      setCurrentIndex(cards.length);
      setFlipped(null);
    }
  };

  const deleteCard = idx => {
    setCards(cards.filter((_, i) => i !== idx));
    if (currentIndex >= cards.length - 1) {
      setCurrentIndex(Math.max(0, cards.length - 2));
    }
    setFlipped(null);
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setFlipped(null);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setFlipped(null);
  };

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: '0 auto', minHeight: 500 }}>
      <h2 style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        color: dark ? '#FFD59A' : accent,
        marginBottom: 32,
        fontWeight: 800,
        fontSize: 28
      }}>
        <Cards size={28} color={dark ? '#FFD59A' : accent} /> Flashcards
      </h2>

      {/* Add new card form */}
      {isAdding ? (
        <div style={{
          background: dark ? 'rgba(24,24,24,0.92)' : 'rgba(255,255,255,0.92)',
          borderRadius: 20,
          padding: 28,
          marginBottom: 32,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          animation: 'fadeIn 0.5s ease-out',
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
            <input
              value={front}
              onChange={e => setFront(e.target.value)}
              placeholder="Front of card"
              style={{
                flex: 1,
                borderRadius: 12,
                border: `1.5px solid ${accent}`,
                padding: 12,
                fontSize: 16,
                background: dark ? '#232323' : '#fff',
                color: dark ? '#fff' : '#222',
                transition: 'all 0.3s ease'
              }}
            />
            <input
              value={back}
              onChange={e => setBack(e.target.value)}
              placeholder="Back of card"
              style={{
                flex: 1,
                borderRadius: 12,
                border: `1.5px solid ${accent}`,
                padding: 12,
                fontSize: 16,
                background: dark ? '#232323' : '#fff',
                color: dark ? '#fff' : '#222',
                transition: 'all 0.3s ease'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button
              onClick={() => setIsAdding(false)}
              style={{
                background: 'transparent',
                color: dark ? '#FFD59A' : accent,
                border: `1.5px solid ${accent}`,
                borderRadius: 12,
                padding: '10px 20px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Cancel
            </button>
            <button
              onClick={addCard}
              style={{
                background: accent,
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '10px 20px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px #FFD59A33'
              }}
            >
              Add Card
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          style={{
            background: accent,
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '12px 24px',
            fontWeight: 700,
            cursor: 'pointer',
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px #FFD59A33'
          }}
        >
          <Plus size={20} /> Add New Card
        </button>
      )}

      {/* Flashcard display */}
      {cards.length > 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: 600,
            perspective: 1200,
            marginBottom: 12
          }}>
            <div
              style={{
                width: '100%',
                height: 320,
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.7s cubic-bezier(.4,2,.6,1)',
                transform: flipped === currentIndex ? 'rotateY(180deg)' : 'rotateY(0)',
                cursor: 'pointer',
                boxShadow: anim ? `0 0 32px ${accent}44` : '0 4px 20px rgba(0,0,0,0.1)',
                borderRadius: 28,
                background: dark ? 'rgba(24,24,24,0.98)' : 'rgba(255,255,255,0.98)',
                border: `2.5px solid ${accent}22`,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                fontWeight: 700,
                color: dark ? '#FFD59A' : accent,
                padding: '0 36px',
                textAlign: 'center',
                letterSpacing: 0.5,
                userSelect: 'none',
              }}
              onClick={() => setFlipped(flipped === currentIndex ? null : currentIndex)}
            >
              {/* Front Side */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                fontWeight: 700,
                color: dark ? '#FFD59A' : accent,
                padding: '0 36px',
                textAlign: 'center',
                letterSpacing: 0.5,
              }}>
                {cards[currentIndex].front}
              </div>
              {/* Back Side */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
                fontWeight: 600,
                color: dark ? '#FFD59A' : accent,
                padding: '0 36px',
                textAlign: 'center',
                letterSpacing: 0.5,
              }}>
                {cards[currentIndex].back}
              </div>
              {/* Glow effect */}
              <div style={{
                position: 'absolute',
                top: -30,
                left: -30,
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `${accent}22`,
                filter: 'blur(18px)',
                zIndex: 0,
                pointerEvents: 'none',
              }} />
              {/* Delete button */}
              <button
                onClick={e => { e.stopPropagation(); deleteCard(currentIndex); }}
                style={{
                  position: 'absolute',
                  top: 18,
                  right: 18,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 8,
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  zIndex: 3
                }}
                title="Delete"
              >
                <Trash size={24} color={dark ? '#FFD59A' : accent} />
              </button>
            </div>
          </div>
          {/* Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            marginTop: 8
          }}>
            <button
              onClick={prevCard}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 14,
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px #FFD59A33'
              }}
            >
              <ArrowLeft size={28} color={dark ? '#FFD59A' : accent} />
            </button>
            <span style={{
              color: dark ? '#FFD59A' : accent,
              fontWeight: 700,
              fontSize: 20
            }}>
              {currentIndex + 1} / {cards.length}
            </span>
            <button
              onClick={nextCard}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 14,
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px #FFD59A33'
              }}
            >
              <ArrowRight size={28} color={dark ? '#FFD59A' : accent} />
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: 60,
          background: dark ? 'rgba(24,24,24,0.92)' : 'rgba(255,255,255,0.92)',
          borderRadius: 24,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginTop: 32,
          marginBottom: 32,
          position: 'relative',
        }}>
          <Cards size={48} color={dark ? '#FFD59A' : accent} style={{ marginBottom: 18, animation: 'pulse 2s infinite' }} />
          <h3 style={{
            color: dark ? '#FFD59A' : accent,
            marginBottom: 8,
            fontWeight: 800,
            fontSize: 22
          }}>
            No flashcards yet
          </h3>
          <div style={{ color: dark ? '#aaa' : '#888', fontWeight: 500, fontSize: 16, marginTop: 8 }}>
            Create your first flashcard to get started!
          </div>
          <button
            onClick={() => setIsAdding(true)}
            style={{
              background: accent,
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 24px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              margin: '24px auto 0 auto',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px #FFD59A33'
            }}
          >
            <Plus size={20} /> Create First Card
          </button>
        </div>
      )}
    </div>
  );
} 