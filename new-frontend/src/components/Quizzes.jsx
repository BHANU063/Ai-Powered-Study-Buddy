import React, { useState } from 'react';
import { Question, CheckCircle, XCircle, ArrowRight, Plus, Trash } from '@phosphor-icons/react';
import { useTheme } from '../context/ThemeContext';

const accent = '#FFA500';

export default function Quizzes() {
  const { dark } = useTheme();
  const [quizzes, setQuizzes] = useState(() => {
    const saved = localStorage.getItem('quizzes');
    return saved ? JSON.parse(saved) : [];
  });
  const [showCreate, setShowCreate] = useState(false);
  const [newQuiz, setNewQuiz] = useState({ title: '', questions: [] });
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correct, setCorrect] = useState(0);

  // Save quizzes to local storage
  const saveQuizzes = (q) => {
    setQuizzes(q);
    localStorage.setItem('quizzes', JSON.stringify(q));
  };

  // Add a new question to the quiz being created
  const addQuestion = () => {
    if (!questionText.trim() || options.some(opt => !opt.trim())) return;
    setNewQuiz(qz => ({
      ...qz,
      questions: [
        ...qz.questions,
        { question: questionText, options: [...options], correct }
      ]
    }));
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrect(0);
  };

  // Save the new quiz
  const saveNewQuiz = () => {
    if (!newQuiz.title.trim() || newQuiz.questions.length === 0) return;
    const updated = [...quizzes, { ...newQuiz, id: Date.now() }];
    saveQuizzes(updated);
    setShowCreate(false);
    setNewQuiz({ title: '', questions: [] });
  };

  // Delete a quiz
  const deleteQuiz = (id) => {
    const updated = quizzes.filter(q => q.id !== id);
    saveQuizzes(updated);
  };

  // Start taking a quiz
  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  // Check answer
  const checkAnswer = (idx) => {
    setSelected(idx);
    if (idx === currentQuiz.questions[currentQuestion].correct) {
      setScore(s => s + 1);
    }
    setShowResult(true);
  };

  // Next question
  const nextQuestion = () => {
    setCurrentQuestion(q => q + 1);
    setSelected(null);
    setShowResult(false);
  };

  // Finish quiz
  const finishQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: '40px auto 0 auto', minHeight: '100vh', background: dark ? '#121212' : '#f5f5f5', borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: 10, color: dark ? '#FFD59A' : accent, fontWeight: 800, fontSize: 28 }}>
          <Question size={28} color={dark ? '#FFD59A' : accent} /> Quizzes
        </h2>
        <button
          onClick={() => setShowCreate(true)}
          style={{ background: accent, color: '#fff', border: 'none', borderRadius: 12, padding: '10px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #FFD59A33', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <Plus size={20} /> Create Quiz
        </button>
      </div>

      {/* Quiz creation modal */}
      {showCreate && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.55)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: dark ? '#232323' : '#fff',
            borderRadius: 32,
            padding: 40,
            boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
            maxWidth: 600,
            width: '90vw',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <button
              onClick={() => setShowCreate(false)}
              style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', cursor: 'pointer', fontSize: 0, zIndex: 10 }}
              title="Close"
            >
              <XCircle size={32} color={accent} weight="fill" />
            </button>
            <h3 style={{ color: accent, fontWeight: 800, fontSize: 24, marginBottom: 24 }}>Create a New Quiz</h3>
            <input
              value={newQuiz.title}
              onChange={e => setNewQuiz(qz => ({ ...qz, title: e.target.value }))}
              placeholder="Quiz Title"
              style={{ width: '100%', borderRadius: 8, border: `1.5px solid ${accent}`, padding: 10, fontSize: 18, marginBottom: 18 }}
            />
            <div style={{ width: '100%', marginBottom: 18 }}>
              <input
                value={questionText}
                onChange={e => setQuestionText(e.target.value)}
                placeholder="Question"
                style={{ width: '100%', borderRadius: 8, border: `1.5px solid ${accent}`, padding: 10, fontSize: 16, marginBottom: 10 }}
              />
              {options.map((opt, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <input
                    value={opt}
                    onChange={e => setOptions(arr => arr.map((o, i) => i === idx ? e.target.value : o))}
                    placeholder={`Option ${idx + 1}`}
                    style={{ flex: 1, borderRadius: 8, border: `1.5px solid ${accent}`, padding: 8, fontSize: 15 }}
                  />
                  <input
                    type="radio"
                    checked={correct === idx}
                    onChange={() => setCorrect(idx)}
                    name="correct"
                    style={{ accentColor: accent }}
                  />
                  <span style={{ color: accent, fontWeight: 600, fontSize: 14 }}>Correct</span>
                </div>
              ))}
              <button
                onClick={addQuestion}
                style={{ background: accent, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginTop: 8 }}
                disabled={!questionText.trim() || options.some(opt => !opt.trim())}
              >Add Question</button>
            </div>
            <div style={{ width: '100%', marginBottom: 18 }}>
              <h4 style={{ color: accent, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Questions:</h4>
              {newQuiz.questions.length === 0 && <div style={{ color: '#888', fontSize: 15 }}>No questions added yet.</div>}
              {newQuiz.questions.map((q, idx) => (
                <div key={idx} style={{ background: '#FFD59A22', borderRadius: 8, padding: 10, marginBottom: 8 }}>
                  <div style={{ fontWeight: 600 }}>{q.question}</div>
                  <div style={{ fontSize: 14, color: '#888' }}>Options: {q.options.join(', ')}</div>
                  <div style={{ fontSize: 14, color: accent }}>Correct: {q.options[q.correct]}</div>
                </div>
              ))}
            </div>
            <button
              onClick={saveNewQuiz}
              style={{ background: accent, color: '#fff', border: 'none', borderRadius: 10, padding: '12px 32px', fontWeight: 800, fontSize: 18, cursor: 'pointer', marginTop: 8 }}
              disabled={!newQuiz.title.trim() || newQuiz.questions.length === 0}
            >Save Quiz</button>
          </div>
        </div>
      )}

      {/* Quiz taking UI */}
      {currentQuiz ? (
        <div style={{ background: dark ? '#232323' : '#fff', borderRadius: 24, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <button
            onClick={finishQuiz}
            style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', cursor: 'pointer', fontSize: 0, zIndex: 10 }}
            title="Exit Quiz"
          >
            <XCircle size={28} color={accent} weight="fill" />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: dark ? 'rgba(255,213,154,0.1)' : 'rgba(255,165,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: dark ? '#FFD59A' : accent, fontWeight: 700, fontSize: 16 }}>
              {currentQuestion + 1}/{currentQuiz.questions.length}
            </div>
            <div style={{ color: dark ? '#FFD59A' : accent, fontWeight: 700, fontSize: 18 }}>
              {currentQuiz.title}
            </div>
          </div>
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18, color: dark ? '#fff' : '#222' }}>
            {currentQuiz.questions[currentQuestion].question}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
            {currentQuiz.questions[currentQuestion].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => !showResult && checkAnswer(idx)}
                style={{
                  background: selected === idx ? (idx === currentQuiz.questions[currentQuestion].correct ? '#B6F5D9' : '#FFD6C6') : dark ? '#232323' : '#fff',
                  color: dark ? '#FFD59A' : accent,
                  border: `2px solid ${accent}55`,
                  borderRadius: 12,
                  padding: '12px 18px',
                  fontWeight: 700,
                  fontSize: 17,
                  cursor: showResult ? 'default' : 'pointer',
                  boxShadow: '0 2px 8px #FFD59A33',
                  transition: 'background 0.2s',
                  outline: selected === idx ? `2px solid ${accent}` : 'none',
                  opacity: showResult && selected !== idx ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                disabled={showResult}
              >
                {opt}
                {showResult && idx === currentQuiz.questions[currentQuestion].correct && <CheckCircle size={20} color="#4CAF50" />}
                {showResult && selected === idx && idx !== currentQuiz.questions[currentQuestion].correct && <XCircle size={20} color="#FF5252" />}
              </button>
            ))}
          </div>
          {showResult && (
            <div style={{ marginBottom: 18, color: selected === currentQuiz.questions[currentQuestion].correct ? '#4CAF50' : '#FF5252', fontWeight: 700, fontSize: 18 }}>
              {selected === currentQuiz.questions[currentQuestion].correct ? 'Correct!' : `Wrong! Correct answer: ${currentQuiz.questions[currentQuestion].options[currentQuiz.questions[currentQuestion].correct]}`}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            {currentQuestion < currentQuiz.questions.length - 1 ? (
              <button
                onClick={nextQuestion}
                style={{ background: accent, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
                disabled={!showResult}
              >Next</button>
            ) : (
              <button
                onClick={finishQuiz}
                style={{ background: accent, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
                disabled={!showResult}
              >Finish</button>
            )}
          </div>
          <div style={{ marginTop: 24, color: accent, fontWeight: 700, fontSize: 18 }}>
            Score: {score} / {currentQuiz.questions.length}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {quizzes.length === 0 && <div style={{ color: '#888', fontSize: 18, gridColumn: '1/-1' }}>No quizzes yet. Click "Create Quiz" to get started!</div>}
          {quizzes.map(quiz => (
            <div key={quiz.id} style={{ background: dark ? 'rgba(24,24,24,0.92)' : 'rgba(255,255,255,0.92)', borderRadius: 20, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', position: 'relative', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={() => deleteQuiz(quiz.id)}
                style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', fontSize: 0 }}
                title="Delete Quiz"
              >
                <Trash size={22} color="#FF5252" />
              </button>
              <h3 style={{ color: dark ? '#FFD59A' : accent, fontWeight: 700, fontSize: 22, marginBottom: 8 }}>{quiz.title}</h3>
              <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>{quiz.questions.length} questions</div>
              <button
                onClick={() => startQuiz(quiz)}
                style={{ background: accent, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginTop: 8 }}
              >Take Quiz <ArrowRight size={18} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 