'use client';

import { useChat } from 'ai/react';
import { useState, useEffect, useRef } from 'react';
import { X, Send, ChefHat, MessageCircle, RotateCcw } from 'lucide-react';

const WHATSAPP_NUMBER = '355686660000'; // +355 68 666 0000
const WHATSAPP_TAG = '[WHATSAPP_READY]';

function buildWhatsAppUrl(recommendation: string): string {
  const clean = recommendation.replace(WHATSAPP_TAG, '').trim();
  const text = `Hello Gerthela Taverna! 🦐\n\nI got a personalised recommendation from your AI assistant and I'd love to order:\n\n${clean}\n\nCan you help me with a reservation?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
    onFinish: () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    },
  });

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send greeting when chat opens for the first time
  useEffect(() => {
    if (isOpen && !hasGreeted && messages.length === 0) {
      setHasGreeted(true);
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content:
            "Welcome to Gerthela Taverna! 🦐 I'm your personal dining assistant. I'd love to help you find the perfect meal today.\n\nFirst things first — how many people are dining with us today?",
        },
      ]);
    }
  }, [isOpen, hasGreeted, messages.length, setMessages]);

  function handleReset() {
    setMessages([]);
    setHasGreeted(false);
    setTimeout(() => {
      setMessages([
        {
          id: 'welcome-reset',
          role: 'assistant',
          content:
            "Welcome back! 🦐 Let's start fresh. How many people are dining with us today?",
        },
      ]);
    }, 100);
  }

  return (
    <>
      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 flex flex-col transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
        style={{ width: 'min(380px, calc(100vw - 2rem))', height: 'min(580px, calc(100vh - 8rem))' }}
      >
        <div
          className="flex flex-col h-full rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: '#0d1b2a', border: '1px solid rgba(201,151,44,0.3)' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ background: 'linear-gradient(135deg, #1a2d42 0%, #0d1b2a 100%)', borderBottom: '1px solid rgba(201,151,44,0.25)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #c9972c, #f0c060)' }}
              >
                <ChefHat size={18} color="#0d1b2a" />
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight" style={{ color: '#f0c060', fontFamily: "'Playfair Display', serif" }}>
                  Gerthela Assistant
                </p>
                <p className="text-xs leading-tight" style={{ color: 'rgba(230,237,243,0.5)' }}>
                  Personalised meal recommendations
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Start over"
                className="p-2 rounded-lg transition-colors hover:bg-white/10"
                style={{ color: 'rgba(230,237,243,0.5)' }}
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg transition-colors hover:bg-white/10"
                style={{ color: 'rgba(230,237,243,0.5)' }}
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: 'thin', scrollbarColor: '#c9972c transparent' }}>
            {messages.map((m) => {
              const hasWhatsApp = m.role === 'assistant' && m.content.includes(WHATSAPP_TAG);
              const displayContent = hasWhatsApp
                ? m.content.replace(WHATSAPP_TAG, '').trim()
                : m.content;

              return (
                <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className="max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-wrap"
                    style={
                      m.role === 'user'
                        ? {
                          background: 'linear-gradient(135deg, #c9972c, #f0c060)',
                          color: '#0d1b2a',
                          fontWeight: 500,
                          borderRadius: '16px 16px 4px 16px',
                        }
                        : {
                          background: 'rgba(255,255,255,0.07)',
                          color: '#e6edf3',
                          border: '1px solid rgba(201,151,44,0.15)',
                          borderRadius: '16px 16px 16px 4px',
                        }
                    }
                  >
                    {displayContent}
                  </div>

                  {/* WhatsApp CTA — shown only on the final recommendation */}
                  {hasWhatsApp && (
                    <a
                      href={buildWhatsAppUrl(displayContent)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 max-w-[85%] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-transform active:scale-95 hover:scale-[1.02]"
                      style={{
                        background: 'linear-gradient(135deg, #25D366, #128C7E)',
                        color: '#fff',
                        textDecoration: 'none',
                        boxShadow: '0 4px 14px rgba(37,211,102,0.35)',
                      }}
                    >
                      {/* WhatsApp SVG icon */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Send this order via WhatsApp
                    </a>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(201,151,44,0.15)',
                    borderRadius: '16px 16px 16px 4px',
                  }}
                >
                  <div className="flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="block w-2 h-2 rounded-full"
                        style={{
                          background: '#c9972c',
                          animation: `chatBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-3 shrink-0"
            style={{ borderTop: '1px solid rgba(201,151,44,0.2)', background: 'rgba(0,0,0,0.2)' }}
          >
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your answer…"
              disabled={isLoading}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/30 disabled:opacity-50"
              style={{ color: '#e6edf3' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                }
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-opacity disabled:opacity-30"
              style={{ background: 'linear-gradient(135deg, #c9972c, #f0c060)' }}
            >
              <Send size={14} color="#0d1b2a" />
            </button>
          </form>
        </div>
      </div>

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #c9972c, #f0c060)' }}
        aria-label="Open dining assistant"
      >
        {isOpen ? (
          <X size={22} color="#0d1b2a" />
        ) : (
          <MessageCircle size={22} color="#0d1b2a" />
        )}
        {/* Pulse ring when closed */}
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-full"
            style={{ animation: 'chatPulse 2.5s ease-out infinite', background: 'rgba(201,151,44,0.35)' }}
          />
        )}
      </button>

      {/* Keyframe animations injected via style tag */}
      <style>{`
        @keyframes chatBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes chatPulse {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </>
  );
}
