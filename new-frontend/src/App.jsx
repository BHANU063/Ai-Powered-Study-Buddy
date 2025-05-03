import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import NameYourBuddy from './components/NameYourBuddy';
import ThemeSwitcher from './components/ThemeSwitcher';
import NotesUploader from './components/NotesUploader';
import ToDoList from './components/ToDoList';
import Flashcards from './components/Flashcards';
import Timer from './components/Timer';
import Summariser from './components/Summariser';
// import Quizzes from './components/Quizzes'; // Removed for troubleshooting
import CreateFlashcard from './components/CreateFlashcard';
import History from './components/History';
import Games from './components/Games';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ParticleBackground from './components/ParticleBackground';
import AIAgentFloatingButton from './components/AIAgentFloatingButton';
import './styles/animations.css';

// Context for global state (buddy name)
export const AppContext = createContext();

const bgLight = 'rgba(248, 248, 248, 0.9)';
const bgDark = 'rgba(35, 35, 35, 0.9)';

function AppContent() {
  const [buddyName, setBuddyName] = useState('Buddy');
  const { dark } = useTheme();

  return (
    <AppContext.Provider value={{ buddyName, setBuddyName }}>
      <Router>
        <div style={{ 
          minHeight: '100vh', 
          minWidth: '100vw', 
          background: dark ? '#181818' : '#222', 
          padding: 'max(2vw, 12px)', 
          transition: 'background 0.3s',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <ParticleBackground />
          <div style={{
            display: 'flex',
            borderRadius: 24,
            overflow: 'hidden',
            background: dark ? bgDark : bgLight,
            minHeight: '90vh',
            maxWidth: 1600,
            margin: '0 auto',
            boxShadow: '0 4px 32px rgba(0,0,0,0.1)',
            width: '100%',
            height: 'calc(100vh - max(4vw, 24px))',
            transition: 'background 0.3s',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            position: 'relative',
            zIndex: 1
          }}>
            <Sidebar />
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              minWidth: 0, 
              overflow: 'auto',
              position: 'relative'
            }}>
              <Topbar />
              <div style={{ 
                flex: 1, 
                minHeight: 0, 
                overflow: 'auto',
                position: 'relative'
              }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/buddy" element={<NameYourBuddy />} />
                  <Route path="/theme" element={<ThemeSwitcher />} />
                  <Route path="/notes" element={<NotesUploader />} />
                  <Route path="/todo" element={<ToDoList />} />
                  <Route path="/flashcards" element={<Flashcards />} />
                  <Route path="/summarise" element={<Summariser />} />
                  <Route path="/timer" element={<Timer />} />
                  {/* <Route path="/quizzes" element={<Quizzes />} /> */} {/* Removed for troubleshooting */}
                  <Route path="/create-flashcard" element={<CreateFlashcard />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
        <AIAgentFloatingButton />
      </Router>
    </AppContext.Provider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
