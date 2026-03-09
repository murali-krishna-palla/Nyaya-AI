import { Link, useLocation } from 'react-router-dom';
import { Scale, Home, Upload, FileSearch, MessageSquare, FileEdit, LogOut, Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const LANGUAGES = [
  { code: 'english', label: 'English' },
  { code: 'hindi', label: 'हिंदी' },
  { code: 'telugu', label: 'తెలుగు' },
  { code: 'tamil', label: 'தமிழ்' },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const { token, user, logout, updateLanguage } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const handleLangChange = async (code) => {
    setLanguage(code);
    if (token) {
      try { await updateLanguage(code); } catch { /* ignore */ }
    }
    setLangOpen(false);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/', icon: Home },
    { name: t('nav.upload'), path: '/upload', icon: Upload },
    { name: t('nav.analysis'), path: '/analysis', icon: FileSearch },
    { name: t('nav.chat'), path: '/chat', icon: MessageSquare },
    { name: t('nav.complaint'), path: '/complaint', icon: FileEdit },
  ];

  const isActive = (path) => location.pathname === path;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 pt-6 pb-4">
        <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center">
            <Scale className="w-4.5 h-4.5 text-white [html[data-theme=dark]_&]:text-[#0C0E10]" />
          </div>
          <span className="font-bold text-lg text-theme-text">Nyaya AI</span>
        </Link>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-theme-border" />

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all no-underline ${
                isActive(link.path)
                  ? 'bg-theme-accent/10 text-theme-accent'
                  : 'text-theme-text-secondary hover:text-theme-text hover:bg-theme-input-bg'
              }`}
            >
              <Icon className="w-[18px] h-[18px]" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section — Settings & Profile */}
      <div className="mt-auto border-t border-theme-border px-3 pt-4 pb-20 md:pb-5 space-y-3">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-xs font-medium text-theme-text-secondary">{t('sidebar.darkMode')}</span>
          <ThemeToggle />
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-theme-text-secondary hover:text-theme-text hover:bg-theme-input-bg transition-colors cursor-pointer"
          >
            <Globe className="w-[18px] h-[18px]" />
            <span className="flex-1 text-left">{LANGUAGES.find(l => l.code === language)?.label || 'English'}</span>
          </button>
          {langOpen && (
            <div className="absolute bottom-full left-0 mb-1 w-full rounded-xl bg-theme-card border border-theme-border shadow-lg overflow-hidden z-50">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => handleLangChange(l.code)}
                  className={`w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                    language === l.code
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

        {/* Divider */}
        <div className="mx-1 border-t border-theme-border" />

        {/* Profile Section */}
        {token && user ? (
          <div className="px-3 py-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-theme-accent/15 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-theme-accent">
                  {(user.name || user.email || '?')[0].toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-theme-text truncate">{user.name || 'User'}</p>
                <p className="text-[11px] text-theme-text-muted truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); setMobileOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-[18px] h-[18px]" />
              {t('nav.signOut')}
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 mx-2 py-2.5 rounded-xl text-sm font-semibold btn-gradient btn-text hover:opacity-90 transition-opacity no-underline"
          >
            {t('nav.signIn')}
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-60 bg-theme-card border-r border-theme-border z-40 flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-theme-nav-bg glass-nav nav-shadow border-b border-theme-border/50 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
            <Scale className="w-4 h-4 text-white [html[data-theme=dark]_&]:text-[#0C0E10]" />
          </div>
          <span className="font-bold text-lg text-theme-text">Nyaya AI</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl text-theme-text-secondary hover:bg-theme-input-bg cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute top-0 left-0 bottom-0 w-72 bg-theme-card shadow-2xl animate-slide-in-left">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
