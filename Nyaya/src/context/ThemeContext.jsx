import { createContext, useContext, useState, useEffect } from 'react';

/**
 * ThemeContext — Provides dark/light mode theming across the app.
 * - Persists preference in localStorage
 * - Respects system preference on first load
 */
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // Check localStorage first
        const stored = localStorage.getItem('nyaya-theme');
        if (stored) return stored;
        // Respect system preference
        if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
        return 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('nyaya-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
}
