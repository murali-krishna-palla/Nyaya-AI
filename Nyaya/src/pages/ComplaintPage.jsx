import { useState } from 'react';
import { legalAPI } from '../services/api';
import { FileEdit, Copy, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ComplaintPage() {
  const { t } = useLanguage();
  const [issue, setIssue] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!issue.trim()) return;
    setError('');
    setResult('');
    setLoading(true);
    try {
      const data = await legalAPI.generateComplaint(issue);
      setResult(data.complaintDraft || data.response || JSON.stringify(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-theme-bg pt-16 md:pt-6 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto page-enter">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-theme-accent/10 flex items-center justify-center">
            <FileEdit className="w-7 h-7 text-theme-accent" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-theme-text mb-2">
            {t('complaintPage.title')}
          </h1>
          <p className="text-sm text-theme-text-secondary max-w-md mx-auto">
            {t('complaintPage.desc')}
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-theme-card border border-theme-border rounded-2xl p-6 sm:p-8 card-shadow">
          <label className="block text-sm font-semibold text-theme-text mb-3">
            {t('complaintPage.label')}
          </label>
          <textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            rows={6}
            placeholder={t('complaintPage.placeholder')}
            className="w-full px-4 py-3 rounded-xl bg-theme-input-bg border border-theme-border text-sm text-theme-text placeholder:text-theme-text-muted resize-y focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/10 leading-relaxed"
          />

          {error && (
            <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !issue.trim()}
            className="w-full mt-5 py-3 rounded-2xl btn-gradient btn-text font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('complaintPage.generating')}
              </>
            ) : (
              t('complaintPage.generate')
            )}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 bg-theme-card border border-theme-border rounded-2xl p-6 sm:p-8 card-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-base text-theme-text">{t('complaintPage.draftTitle')}</h3>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-theme-input-bg border border-theme-border text-xs font-medium text-theme-text-secondary hover:text-theme-text cursor-pointer transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    {t('complaintPage.copied')}
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    {t('complaintPage.copy')}
                  </>
                )}
              </button>
            </div>
            <div className="text-sm text-theme-text-secondary leading-relaxed whitespace-pre-wrap">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
