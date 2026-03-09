import { Link, useLocation } from 'react-router-dom';
import { Scale, Menu, X, LogOut, Globe } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

const LANGUAGES = [
  { code: 'english', label: 'English' },
  { code: 'hindi', label: 'Hindi' },
  { code: 'telugu', label: 'Telugu' },
  { code: 'tamil', label: 'Tamil' },
];

/**
 * Navbar — Top navigation bar with logo, links, theme toggle, auth, and CTA.
 * Includes a mobile hamburger menu.
 */
export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const location = useLocation();
    const { token, user, logout, updateLanguage } = useAuth();

    const handleLangChange = async (code) => {
        try {
            await updateLanguage(code);
        } catch { /* ignore */ }
        setLangOpen(false);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Upload FIR', path: '/upload' },
        { name: 'Case Analysis', path: '/analysis' },
        { name: 'Legal Chat', path: '/chat' },
        { name: 'Complaint', path: '/complaint' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-theme-nav-bg glass-nav nav-shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 no-underline">
                        <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
                            <Scale className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-lg text-theme-text">Nyaya AI</span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors no-underline ${isActive(link.path)
                                    ? 'bg-theme-accent/10 text-theme-accent'
                                    : 'text-theme-text-secondary hover:text-theme-text hover:bg-theme-input-bg'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right — Theme Toggle + Auth */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        {token ? (
                            <div className="hidden sm:flex items-center gap-3">
                                {/* Language Selector */}
                                <div className="relative">
                                    <button
                                        onClick={() => setLangOpen(!langOpen)}
                                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-theme-input-bg border border-theme-border text-theme-text-secondary hover:text-theme-accent hover:border-theme-accent/30 transition-colors cursor-pointer"
                                    >
                                        <Globe className="w-3.5 h-3.5" />
                                        {LANGUAGES.find(l => l.code === (user?.preferredLanguage || 'english'))?.label || 'English'}
                                    </button>
                                    {langOpen && (
                                        <div className="absolute right-0 mt-2 w-36 rounded-xl bg-theme-card border border-theme-border shadow-lg overflow-hidden z-50">
                                            {LANGUAGES.map(l => (
                                                <button
                                                    key={l.code}
                                                    onClick={() => handleLangChange(l.code)}
                                                    className={`w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                                                        (user?.preferredLanguage || 'english') === l.code
                                                            ? 'bg-theme-accent/10 text-theme-accent font-semibold'
                                                            : 'text-theme-text-secondary hover:bg-theme-input-bg'
                                                    }`}
                                                >
                                                    {l.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <span className="text-xs text-theme-text-muted truncate max-w-20 sm:max-w-30">
                                    {user?.name || user?.email}
                                </span>
                                <button
                                    onClick={logout}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-theme-input-bg border border-theme-border text-theme-text-secondary hover:text-red-400 hover:border-red-500/30 transition-colors cursor-pointer"
                                >
                                    <LogOut className="w-3.5 h-3.5" />
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold btn-gradient btn-text hover:opacity-90 transition-opacity no-underline"
                            >
                                Sign In
                            </Link>
                        )}

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 rounded-xl text-theme-text-secondary hover:bg-theme-input-bg cursor-pointer"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-theme-border bg-theme-card px-4 pb-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-4 py-3 rounded-xl text-sm font-medium no-underline ${isActive(link.path)
                                ? 'bg-theme-accent/10 text-theme-accent'
                                : 'text-theme-text-secondary hover:bg-theme-input-bg'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {token && (
                        <div className="px-4 py-2 border-t border-theme-border mt-2">
                            <p className="text-xs text-theme-text-muted mb-2">Language</p>
                            <div className="flex flex-wrap gap-2">
                                {LANGUAGES.map(l => (
                                    <button
                                        key={l.code}
                                        onClick={() => { handleLangChange(l.code); setMobileMenuOpen(false); }}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                                            (user?.preferredLanguage || 'english') === l.code
                                                ? 'bg-theme-accent/10 text-theme-accent border border-theme-accent/30'
                                                : 'bg-theme-input-bg text-theme-text-secondary border border-theme-border'
                                        }`}
                                    >
                                        {l.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {token ? (
                        <button
                            onClick={() => { logout(); setMobileMenuOpen(false); }}
                            className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 cursor-pointer"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-3 rounded-xl text-sm font-semibold btn-gradient btn-text text-center no-underline mt-2"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
