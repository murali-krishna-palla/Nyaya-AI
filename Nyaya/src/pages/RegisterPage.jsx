import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, User, Mail, Lock, Globe, ArrowRight } from 'lucide-react';
import { authAPI } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    preferredLanguage: 'english',
  });

  const LANGUAGES = [
    { code: 'english', label: 'English' },
    { code: 'hindi', label: 'Hindi' },
    { code: 'telugu', label: 'Telugu' },
    { code: 'tamil', label: 'Tamil' },
  ];
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authAPI.register(form.name, form.email, form.password, form.preferredLanguage);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-theme-bg">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 hero-gradient items-center justify-center p-12">
        <div className="max-w-md">
          <div className="w-14 h-14 rounded-2xl btn-gradient flex items-center justify-center mb-8">
            <Scale className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
            {t('registerPage.heroTitle')}
          </h1>
          <p className="text-white/60 text-base leading-relaxed mb-10">
            {t('registerPage.heroDesc')}
          </p>
          <div className="space-y-4">
            {[
              t('registerPage.feature1'),
              t('registerPage.feature2'),
              t('registerPage.feature3'),
            ].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/40 shrink-0" />
                <span className="text-white/70 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-lg btn-gradient flex items-center justify-center">
              <Scale className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl text-theme-text">Nyaya AI</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-theme-text mb-1">{t('registerPage.createAccount')}</h2>
          <p className="text-sm text-theme-text-secondary mb-8">{t('registerPage.getStarted')}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-muted pointer-events-none" />
              <input
                type="text"
                placeholder={t('registerPage.namePlaceholder')}
                value={form.name}
                onChange={update('name')}
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-theme-input-bg border border-theme-border text-sm text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/10"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-muted pointer-events-none" />
              <input
                type="email"
                placeholder={t('registerPage.emailPlaceholder')}
                value={form.email}
                onChange={update('email')}
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-theme-input-bg border border-theme-border text-sm text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/10"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-muted pointer-events-none" />
              <input
                type="password"
                placeholder={t('registerPage.passwordPlaceholder')}
                value={form.password}
                onChange={update('password')}
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-theme-input-bg border border-theme-border text-sm text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/10"
              />
            </div>

            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-muted pointer-events-none" />
              <select
                value={form.preferredLanguage}
                onChange={update('preferredLanguage')}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-theme-input-bg border border-theme-border text-sm text-theme-text focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/10 appearance-none cursor-pointer"
              >
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl btn-gradient btn-text font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('registerPage.creating') : t('registerPage.createBtn')}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-sm text-theme-text-muted mt-6">
            {t('registerPage.haveAccount')}{' '}
            <Link to="/login" className="text-theme-accent font-semibold hover:underline no-underline">
              {t('registerPage.signIn')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
