'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Menu as MenuIcon } from 'lucide-react';
import MenuManagement from '@/components/admin/MenuManagement';
import RestaurantInfoManagement from '@/components/admin/RestaurantInfoManagement';
import AnnouncementManagement from '@/components/admin/AnnouncementManagement';

type Tab = 'menu' | 'info' | 'announcements';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('menu');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <MenuIcon size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Gerthela Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } bg-gray-900 text-white transition-all duration-300 overflow-hidden lg:w-64`}
        >
          <nav className="p-6 space-y-4">
            <button
              onClick={() => setActiveTab('menu')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                activeTab === 'menu'
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-800'
              }`}
            >
              Menu Management
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                activeTab === 'info'
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-800'
              }`}
            >
              Restaurant Info
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                activeTab === 'announcements'
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-800'
              }`}
            >
              Announcements
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'menu' && <MenuManagement />}
            {activeTab === 'info' && <RestaurantInfoManagement />}
            {activeTab === 'announcements' && <AnnouncementManagement />}
          </div>
        </main>
      </div>
    </div>
  );
}
