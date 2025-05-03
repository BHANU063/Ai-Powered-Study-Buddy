import { Sun, Moon } from '@phosphor-icons/react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const { dark, toggleTheme } = useTheme();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
      <Sun size={24} color={dark ? '#888' : '#FFA500'} />
      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={dark}
          onChange={toggleTheme}
          style={{ display: 'none' }}
        />
        <span style={{
          width: 40,
          height: 22,
          background: dark ? '#222' : '#FFA500',
          borderRadius: 12,
          position: 'relative',
          display: 'inline-block',
          margin: '0 8px',
          transition: 'background 0.2s'
        }}>
          <span style={{
            position: 'absolute',
            left: dark ? 22 : 2,
            top: 2,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#fff',
            transition: 'left 0.2s'
          }} />
        </span>
      </label>
      <Moon size={24} color={dark ? '#FFA500' : '#888'} />
    </div>
  );
} 