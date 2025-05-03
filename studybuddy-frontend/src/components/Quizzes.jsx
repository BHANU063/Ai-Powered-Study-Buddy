import React, { useState } from 'react';
import { Question, CheckCircle, XCircle, ArrowRight, Plus } from '@phosphor-icons/react';
import { useTheme } from '../context/ThemeContext';

const accent = '#FFA500';

const sampleQuizzes = [
  {
    id: 1,
    title: 'General Knowledge',
    questions: [
      {
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correct: 2
      },
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correct: 1
      },
      {
        question: 'What is the largest mammal in the world?',
        options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correct: 1
      }
    ]
  },
  {
    id: 2,
    title: 'Science Quiz',
    questions: [
      {
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'O2', 'N2'],
        correct: 0
      },
      {
        question: 'Which gas do plants absorb from the atmosphere?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        correct: 2
      }
    ]
  }
];

export default function Quizzes() {
  const { dark } = useTheme();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelected(null);
  };

  const checkAnswer = (selectedIdx) => {
    setSelected(selectedIdx);
    const correct = selectedIdx === currentQuiz.questions[currentQuestion].correct;
    if (correct) setScore(prev => prev + 1);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowResult(false);
      setSelected(null);
    }
  };

  const finishQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelected(null);
  };

  return (
    <div style={{ 
      padding: 40, 
      maxWidth: 900, 
      margin: '0 auto', 
      minHeight: '100vh',
      background: dark ? '#121212' : '#f5f5f5'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: 32 
      }}>
        <h2 style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          color: dark ? '#FFD59A' : accent,
          fontWeight: 800,
          fontSize: 28
        }}>
          <Question size={28} color={dark ? '#FFD59A' : accent} /> Quizzes
        </h2>
      </div>

      {!currentQuiz ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24
        }}>
          {sampleQuizzes.map(quiz => (
            <div
              key={quiz.id}
              onClick={() => startQuiz(quiz)}
              style={{
                background: dark ? 'rgba(24,24,24,0.92)' : 'rgba(255,255,255,0.92)',
                borderRadius: 20,
                padding: 24,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: `2px solid ${accent}22`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                ':hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 24px ${accent}22`
                }
              }}
            >
              <h3 style={{
                color: dark ? '#FFD59A' : accent,
                fontWeight: 700,
                fontSize: 20,
                marginBottom: 12
              }}>
                {quiz.title}
              </h3>
              <p style={{
                color: dark ? '#aaa' : '#666',
                fontSize: 14,
                marginBottom: 16
              }}>
                {quiz.questions.length} questions
              </p>
              <div style={{
                color: dark ? '#FFD59A' : accent,
                fontWeight: 600,
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                Start Quiz <ArrowRight size={20} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          background: dark ? 'rgba(24,24,24,0.92)' : 'rgba(255,255,255,0.92)',
          borderRadius: 24,
          padding: 32,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 24
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: dark ? 'rgba(255,213,154,0.1)' : 'rgba(255,165,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: dark ? '#FFD59A' : accent,
              fontWeight: 700,
              fontSize: 16
            }}>
              {currentQuestion + 1}/{currentQuiz.questions.length}
            </div>
            <div style={{
              color: dark ? '#FFD59A' : accent,
              fontWeight: 700,
              fontSize: 18
            }}>
              {currentQuiz.title}
            </div>
          </div>

          <div style={{
            fontSize: 24,
            fontWeight: 700,
            color: dark ? '#FFD59A' : accent,
            marginBottom: 32,
            lineHeight: 1.4
          }}>
            {currentQuiz.questions[currentQuestion].question}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            marginBottom: 32
          }}>
            {currentQuiz.questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !showResult && checkAnswer(idx)}
                style={{
                  background: selected === idx && showResult
                    ? (idx === currentQuiz.questions[currentQuestion].correct ? 'rgba(76,175,80,0.15)' : 'rgba(244,67,54,0.15)')
                    : (dark ? 'rgba(255,213,154,0.1)' : 'rgba(255,165,0,0.1)'),
                  border: `1.5px solid ${accent}22`,
                  borderRadius: 16,
                  padding: 16,
                  color: dark ? '#FFD59A' : accent,
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: showResult ? 'default' : 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  outline: selected === idx ? `2px solid ${accent}` : 'none',
                  boxShadow: selected === idx ? `0 0 0 2px ${accent}33` : 'none'
                }}
              >
                {option}
                {showResult && (
                  <div style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: idx === currentQuiz.questions[currentQuestion].correct 
                      ? '#4CAF50' 
                      : '#f44336'
                  }}>
                    {idx === currentQuiz.questions[currentQuestion].correct 
                      ? <CheckCircle size={20} weight="fill" />
                      : <XCircle size={20} weight="fill" />
                    }
                  </div>
                )}
              </button>
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={finishQuiz}
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
              Exit Quiz
            </button>
            {showResult && currentQuestion < currentQuiz.questions.length - 1 && (
              <button
                onClick={nextQuestion}
                style={{
                  background: accent,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '10px 20px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                Next Question <ArrowRight size={20} />
              </button>
            )}
            {showResult && currentQuestion >= currentQuiz.questions.length - 1 && (
              <div style={{
                color: dark ? '#FFD59A' : accent,
                fontWeight: 700,
                fontSize: 20
              }}>
                Score: {score}/{currentQuiz.questions.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 