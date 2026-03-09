import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t, setLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authAPI.login(email, password);
      login(data.token, data.user);
      if (data.user?.preferredLanguage) setLanguage(data.user.preferredLanguage);
      navigate('/');
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
            {t('loginPage.heroTitle')}
          </h1>
          <p className="text-white/60 text-base leading-relaxed mb-10">
            {t('loginPage.heroDesc')}
          </p>
          <div className="space-y-4">
            {[
              t('loginPage.feature1'),
              t('loginPage.feature2'),
              t('loginPage.feature3'),
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

          <h2 className="text-2xl sm:text-3xl font-bold text-theme-text mb-1">{t('loginPage.welcome')}</h2>
          <p className="text-sm text-theme-text-secondary mb-8">{t('loginPage.signInDesc')}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-muted pointer-events-none" />
              <input
                type="email"
                placeholder={t('loginPage.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-theme-input-bg border border-theme-border text-sm text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/10"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-muted pointer-events-none" />
              <input
                type="password"
                placeholder={t('loginPage.passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-theme-input-bg border border-theme-border text-sm text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/10"
              />
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
              {loading ? t('loginPage.signingIn') : t('loginPage.signInBtn')}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-sm text-theme-text-muted mt-6">
            {t('loginPage.noAccount')}{' '}
            <Link to="/register" className="text-theme-accent font-semibold hover:underline no-underline">
              {t('loginPage.createOne')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
