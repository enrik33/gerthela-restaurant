'use client';

import { useState, useEffect, type ComponentProps } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { setAdminPassword } from '@/lib/admin-session';
import { adminT, type AdminLang } from '@/lib/admin-i18n';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<AdminLang>('en');
  const router = useRouter();
  const t = adminT[lang];

  useEffect(() => {
    // Clear any leftover token so the form is always fresh
    localStorage.removeItem('admin_token');
    const saved = localStorage.getItem('admin_lang') as AdminLang;
    if (saved === 'el') setLang('el');
  }, []);

  const toggleLang = () => {
    const next: AdminLang = lang === 'en' ? 'el' : 'en';
    setLang(next);
    localStorage.setItem('admin_lang', next);
  };

  const submitLogin = async (
    e: Parameters<NonNullable<ComponentProps<'form'>['onSubmit']>>[0]
  ) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAdminPassword(password);
        localStorage.setItem('admin_token', 'authenticated');
        router.push('/admin/dashboard');
      } else {
        setError(t.loginError);
        setPassword('');
      }
    } catch {
      setError(t.loginNetworkError);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit: NonNullable<ComponentProps<'form'>['onSubmit']> = (e) => {
    void submitLogin(e);
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] flex flex-col items-center justify-center p-6">
      {/* Language toggle */}
      <button
        onClick={toggleLang}
        className="absolute top-6 right-6 px-4 py-2 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition text-sm font-medium"
      >
        {lang === 'en' ? '🇬🇷 Ελληνικά' : '🇬🇧 English'}
      </button>

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/images/gerthela-logo.PNG"
            alt="Gerthela"
            className="h-24 w-auto object-contain"
          />
        </div>

        <h1 className="text-2xl font-bold text-center text-white mb-1">{t.loginTitle}</h1>
        <p className="text-center text-[#c9972c] font-medium mb-10">{t.loginSubtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              {t.passwordLabel}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                autoComplete="off"
                required
                disabled={loading}
                className="w-full px-4 py-4 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#c9972c] focus:ring-2 focus:ring-[#c9972c]/20 transition text-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400/40 text-red-200 px-4 py-3 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#c9972c] hover:bg-[#b8871f] text-white font-bold py-4 rounded-xl transition text-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? t.loginLoading : t.loginButton}
          </button>
        </form>
      </div>
    </div>
  );
}

