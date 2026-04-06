'use client';

import { useState, useEffect } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { MenuItem } from '@/types';
import { adminHeaders } from '@/lib/admin-fetch';
import { adminT, type AdminLang } from '@/lib/admin-i18n';

const BLANK_FORM: Partial<MenuItem> = {
  name: '',
  description: '',
  price: 0,
  category: 'mains',
  available: true,
};

export default function MenuManagement({ lang }: { lang: AdminLang }) {
  const t = adminT[lang];
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>(BLANK_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/menu', { headers: adminHeaders() })
      .then(r => r.json())
      .then(data => { setMenuItems(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setError(t.errorLoad); setLoading(false); });
  }, []);

  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setFormData(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.description) return;
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        const res = await fetch('/api/admin/menu', {
          method: 'PUT',
          headers: adminHeaders(),
          body: JSON.stringify({ id: editingId, ...formData }),
        });
        const updated = await res.json();
        if (!res.ok) throw new Error(updated.error);
        setMenuItems(menuItems.map(item => item.id === editingId ? updated : item));
      } else {
        const res = await fetch('/api/admin/menu', {
          method: 'POST',
          headers: adminHeaders(),
          body: JSON.stringify(formData),
        });
        const created = await res.json();
        if (!res.ok) throw new Error(created.error);
        setMenuItems([...menuItems, created]);
      }
      setEditingId(null);
      setFormData(BLANK_FORM);
    } catch (e: any) {
      setError(t.errorSave);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    try {
      const res = await fetch(`/api/admin/menu?id=${id}`, {
        method: 'DELETE',
        headers: adminHeaders(),
      });
      if (!res.ok) throw new Error();
      setMenuItems(menuItems.filter(item => item.id !== id));
    } catch {
      setError(t.errorDelete);
    }
  };

  const field = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c9972c] focus:border-transparent transition text-gray-800';
  const label = 'block text-sm font-semibold text-gray-600 mb-1.5';

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t.menuTitle}</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>
      )}

      {/* Form card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-700 mb-5 text-lg">
          {editingId ? t.updateItem : t.addItem}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={label}>{t.itemName}</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={field}
              placeholder="e.g., Grilled Sea Bass"
            />
          </div>

          <div>
            <label className={label}>{t.itemPrice}</label>
            <input
              type="number"
              value={formData.price || 0}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
              className={field}
              min={0}
            />
          </div>

          <div>
            <label className={label}>{t.itemCategory}</label>
            <select
              value={formData.category || 'mains'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as MenuItem['category'] })}
              className={field}
            >
              {(Object.entries(t.categories) as [string, string][]).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={label}>{t.itemAvailable}</label>
            <select
              value={formData.available ? 'yes' : 'no'}
              onChange={(e) => setFormData({ ...formData, available: e.target.value === 'yes' })}
              className={field}
            >
              <option value="yes">{t.yes}</option>
              <option value="no">{t.no}</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={label}>{t.itemDescription}</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className={`${field} resize-none`}
              placeholder="Describe this dish…"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={handleSave}
            disabled={saving || !formData.name || !formData.description}
            className="flex-1 bg-[#c9972c] hover:bg-[#b8871f] text-white font-bold py-3 rounded-xl transition disabled:opacity-40"
          >
            {saving ? t.saving : editingId ? t.updateItem : t.saveItem}
          </button>
          {editingId && (
            <button
              onClick={() => { setEditingId(null); setFormData(BLANK_FORM); }}
              className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition"
            >
              {t.cancel}
            </button>
          )}
        </div>
      </div>

      {/* Items list */}
      {loading ? (
        <p className="text-center text-gray-400 py-12">{t.loading}</p>
      ) : menuItems.length === 0 ? (
        <p className="text-center text-gray-400 py-12">{t.addItem}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 text-lg leading-snug">{item.name}</h3>
                <span className={`ml-2 shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${
                  item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {item.available ? t.available : t.unavailable}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description}</p>
              <p className="text-[#c9972c] font-bold text-xl mb-1">{item.price} ALL</p>
              <p className="text-xs text-gray-400 mb-4 capitalize">{t.categories[item.category as keyof typeof t.categories] ?? item.category}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition font-semibold text-sm"
                >
                  <Edit2 size={15} /> {t.edit}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition font-semibold text-sm"
                >
                  <Trash2 size={15} /> {t.delete}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
