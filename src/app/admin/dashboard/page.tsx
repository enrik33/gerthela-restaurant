'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Menu as MenuIcon, X } from 'lucide-react';
import MenuManagement from '@/components/admin/MenuManagement';
import RestaurantInfoManagement from '@/components/admin/RestaurantInfoManagement';
import AnnouncementManagement from '@/components/admin/AnnouncementManagement';
import { clearAdminPassword, getAdminPassword } from '@/lib/admin-session';
import { adminT, type AdminLang } from '@/lib/admin-i18n';

type Tab = 'menu' | 'info' | 'announcements';

const NAV_ITEMS = [
  { id: 'menu' as Tab, emoji: '🍽️', labelKey: 'navMenu' as const },
  { id: 'info' as Tab, emoji: 'ℹ️', labelKey: 'navInfo' as const },
  { id: 'announcements' as Tab, emoji: '📢', labelKey: 'navAnnouncements' as const },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('menu');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState<AdminLang>('en');
  const router = useRouter();
  const t = adminT[lang];

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    // If no token OR password cleared (page refreshed), send back to login
    if (!token || !getAdminPassword()) {
      localStorage.removeItem('admin_token');
      router.push('/admin');
      return;
    }
    const saved = localStorage.getItem('admin_lang') as AdminLang;
    if (saved === 'el') setLang('el');
  }, [router]);

  const handleLogout = () => {
    clearAdminPassword();
    localStorage.removeItem('admin_token');
    router.push('/admin');
  };

  const toggleLang = () => {
    const next: AdminLang = lang === 'en' ? 'el' : 'en';
    setLang(next);
    localStorage.setItem('admin_lang', next);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-[#0d1b2a] text-white sticky top-0 z-40 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
            <div className="flex items-center gap-3">
              <img src="/images/gerthela-logo.PNG" alt="Gerthela" className="h-9 w-auto hidden sm:block" />
              <div>
                <p className="font-bold text-lg leading-tight">Gerthela</p>
                <p className="text-white/50 text-xs">{t.dashboardTitle}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition text-sm font-semibold"
            >
              {lang === 'en' ? 'ΕΛ' : 'EN'}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/80 hover:bg-red-600 rounded-lg transition text-sm font-semibold"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">{t.logout}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30 top-[52px] lg:top-auto
          w-64 bg-[#0d1b2a] text-white flex-shrink-0
          transform transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <nav className="p-4 space-y-2 pt-6">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition text-left ${activeTab === item.id
                    ? 'bg-[#c9972c] text-white font-semibold shadow'
                    : 'hover:bg-white/10 text-white/80'
                  }`}
              >
                <span className="text-2xl leading-none">{item.emoji}</span>
                <span className="text-base">{t[item.labelKey]}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto min-w-0">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'menu' && <MenuManagement lang={lang} />}
            {activeTab === 'info' && <RestaurantInfoManagement lang={lang} />}
            {activeTab === 'announcements' && <AnnouncementManagement lang={lang} />}
          </div>
        </main>
      </div>
    </div>
  );
}

