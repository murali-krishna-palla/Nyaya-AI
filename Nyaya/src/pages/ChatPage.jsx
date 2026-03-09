import { useState, useEffect, useRef } from 'react';
import { chatAPI } from '../services/api';
import { Send, MessageSquare, Sparkles, Paperclip, X, FileText, Image } from 'lucide-react';
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
  const [selectedFile, setSelectedFile] = useState(null);
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);

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
        msgs.push({ text: c.message, sender: 'user', fileName: c.fileName, fileType: c.fileType });
        msgs.push({ text: c.response, sender: 'bot' });
      });
      setMessages(msgs);
    } catch {
      // history is optional
    } finally {
      setHistoryLoaded(true);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
    e.target.value = '';
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const sendMessage = async (text) => {
    const userMsg = (text || '').trim();
    const file = selectedFile;

    if ((!userMsg && !file) || loading) return;

    setInput('');
    setSelectedFile(null);
    setMessages((prev) => [
      ...prev,
      { text: userMsg || (file ? file.name : ''), sender: 'user', fileName: file?.name, fileType: file?.type },
    ]);
    setLoading(true);

    try {
      let data;
      if (file) {
        data = await chatAPI.sendMessageWithFile(userMsg, file);
      } else {
        data = await chatAPI.sendMessage(userMsg);
      }
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
    <div className="min-h-screen bg-theme-bg pt-16 md:pt-2 pb-20 md:pb-4">
      <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-5rem)] page-enter">
        {/* Header */}
        <div className="px-4 sm:px-6 py-5 border-b border-theme-border bg-theme-card card-shadow rounded-t-2xl mt-4 mx-4 sm:mx-0">
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
                {m.sender === 'user' && m.fileName && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/20 [html[data-theme=dark]_&]:border-[#0C0E10]/20">
                    {m.fileType?.startsWith('image/') ? (
                      <Image className="w-4 h-4 shrink-0" />
                    ) : (
                      <FileText className="w-4 h-4 shrink-0" />
                    )}
                    <span className="text-xs font-medium truncate">{m.fileName}</span>
                  </div>
                )}
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
        <div className="px-4 sm:px-6 py-4 border-t border-theme-border bg-theme-card card-shadow rounded-b-2xl mx-4 sm:mx-0 mb-4">
          {/* File preview */}
          {selectedFile && (
            <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-theme-accent/10 border border-theme-accent/20">
              {selectedFile.type?.startsWith('image/') ? (
                <Image className="w-4 h-4 text-theme-accent shrink-0" />
              ) : (
                <FileText className="w-4 h-4 text-theme-accent shrink-0" />
              )}
              <span className="text-xs text-theme-text truncate flex-1">{selectedFile.name}</span>
              <button
                type="button"
                onClick={removeFile}
                className="w-5 h-5 rounded-full bg-theme-text-muted/20 flex items-center justify-center hover:bg-red-500/20 transition-colors cursor-pointer"
              >
                <X className="w-3 h-3 text-theme-text-muted hover:text-red-400" />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf,.txt"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="w-11 h-11 rounded-xl bg-theme-input-bg border border-theme-border flex items-center justify-center shrink-0 cursor-pointer hover:border-theme-accent hover:text-theme-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-theme-text-muted"
              title={t('chatPage.attachFile')}
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={selectedFile ? t('chatPage.fileMessagePlaceholder') : t('chatPage.inputPlaceholder')}
              disabled={loading}
              autoFocus
              className="flex-1 px-4 py-3 rounded-xl bg-theme-input-bg border border-theme-border text-sm text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/10"
            />
            <button
              type="submit"
              disabled={loading || (!input.trim() && !selectedFile)}
              className="w-11 h-11 rounded-xl btn-gradient flex items-center justify-center shrink-0 cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 text-white [html[data-theme=dark]_&]:text-[#0C0E10]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
