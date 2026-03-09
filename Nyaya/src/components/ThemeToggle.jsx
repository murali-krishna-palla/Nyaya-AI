import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

/**
 * ThemeToggle — Animated toggle switch for dark ↔ light mode.
 * Shows Sun icon for light mode, Moon icon for dark mode.
 */
export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`relative flex items-center w-14 h-7 rounded-full border cursor-pointer focus:outline-none transition-colors duration-300 ${theme === 'dark'
                    ? 'border-[#2a2c30]'
                    : 'bg-theme-input-bg border-theme-border'
                }`}
            style={theme === 'dark' ? { backgroundColor: '#0C0E10' } : undefined}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {/* Sliding knob */}
            <span
                className={`absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${theme === 'dark'
                        ? 'left-0.5'
                        : 'left-[calc(100%-1.625rem)] bg-theme-accent'
                    }`}
                style={theme === 'dark' ? { backgroundColor: '#D3BCA2' } : undefined}
            >
                {theme === 'dark' ? (
                    <Moon className="w-3.5 h-3.5" style={{ color: '#0C0E10' }} />
                ) : (
                    <Sun className="w-3.5 h-3.5 text-white" />
                )}
            </span>
        </button>
    );
}
