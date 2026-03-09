import { useState, useEffect, useRef } from 'react';
import { chatAPI } from '../services/api';
import { Send, MessageSquare, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ChatPage() {
  const { t } = useLanguage();

  const SUGGESTIONS = [
    { label: t('chatPage.sugRightsArrest'), msg: t('chatPage.msgRightsArrest') },
    { label: t('chatPage.sugFilingFIR'), msg: t('chatPage.msgFilingFIR') },
    { label: t('chatPage.sugBail'), msg: t('chatPage.msgBail') },
    { label: t('chatPage.sugTenantRights'), msg: t('chatPage.msgTenantRights') },
    { label: t('chatPage.sugConsumer'), msg: t('chatPage.msgConsumer') },
    { label: t('chatPage.sugCyberCrime'), msg: t('chatPage.msgCyberCrime') },
  ];

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const loadHistory = async () => {
    try {
      const data = await chatAPI.getHistory();
      const chats = Array.isArray(data) ? data : data.chats || [];
      const msgs = [];
      chats.forEach((c) => {
        msgs.push({ text: c.message, sender: 'user' });
        msgs.push({ text: c.response, sender: 'bot' });
      });
      setMessages(msgs);
    } catch {
      // history is optional
    } finally {
      setHistoryLoaded(true);
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = text.trim();
    setInput('');
    setMessages((prev) => [...prev, { text: userMsg, sender: 'user' }]);
    setLoading(true);

    try {
      const data = await chatAPI.sendMessage(userMsg);
      setMessages((prev) => [
        ...prev,
        { text: data.response || 'No response received.', sender: 'bot' },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: `Error: ${err.message}`, sender: 'bot', isError: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const isEmpty = historyLoaded && messages.length === 0;

  return (
    <div className="min-h-screen bg-theme-bg pt-20 pb-20 md:pb-8">
      <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-5rem)]">
        {/* Header */}
        <div className="px-4 sm:px-6 py-5 border-b border-theme-border bg-theme-card rounded-t-2xl mt-4 mx-4 sm:mx-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white [html[data-theme=dark]_&]:text-[#0C0E10]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-theme-text">{t('chatPage.title')}</h1>
                <p className="text-xs text-theme-text-muted">{t('chatPage.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-500 font-medium">{t('chatPage.online')}</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 bg-theme-bg mx-4 sm:mx-0 space-y-5">
          {isEmpty && (
            <div className="flex flex-col items-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-theme-accent/10 flex items-center justify-center mb-5 border-2 border-theme-accent/20">
                <Sparkles className="w-7 h-7 text-theme-accent" />
              </div>
              <h3 className="text-xl font-bold text-theme-text mb-2">{t('chatPage.emptyTitle')}</h3>
              <p className="text-sm text-theme-text-secondary max-w-md leading-relaxed">
                {t('chatPage.emptyDesc')}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-sm sm:max-w-lg">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => sendMessage(s.msg)}
                    className="px-3 py-2 rounded-full bg-theme-card border border-theme-border text-[11px] sm:text-xs font-medium text-theme-text-secondary hover:border-theme-accent hover:text-theme-accent cursor-pointer transition-all hover:-translate-y-0.5"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : ''}`}>
              {m.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full btn-gradient flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-white [html[data-theme=dark]_&]:text-[#0C0E10]" />
                </div>
              )}
              <div
                className={`max-w-[85%] sm:max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap wrap-break-word ${
                  m.sender === 'user'
                    ? 'bg-theme-accent text-white [html[data-theme=dark]_&]:text-[#0C0E10] rounded-tr-sm'
                    : m.isError
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20 rounded-tl-sm'
                      : 'bg-theme-card border border-theme-border text-theme-text rounded-tl-sm'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-theme-accent/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-xs font-bold text-theme-accent">{t('chatPage.you')}</span>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full btn-gradient flex items-center justify-center shrink-0 mt-1">
                <Sparkles className="w-4 h-4 text-white [html[data-theme=dark]_&]:text-[#0C0E10]" />
              </div>
              <div className="bg-theme-card border border-theme-border rounded-2xl rounded-tl-sm px-5 py-3.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-theme-accent animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-theme-accent animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-theme-accent animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="px-4 sm:px-6 py-4 border-t border-theme-border bg-theme-card rounded-b-2xl mx-4 sm:mx-0 mb-4 flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chatPage.inputPlaceholder')}
            disabled={loading}
            autoFocus
            className="flex-1 px-4 py-3 rounded-xl bg-theme-input-bg border border-theme-border text-sm text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/10"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-11 h-11 rounded-xl btn-gradient flex items-center justify-center shrink-0 cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 text-white [html[data-theme=dark]_&]:text-[#0C0E10]" />
          </button>
        </form>
      </div>
    </div>
  );
}
