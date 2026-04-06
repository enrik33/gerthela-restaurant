'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import type { MenuItem } from '@/types';
import { adminHeaders } from '@/lib/admin-fetch';

const BLANK_FORM: Partial<MenuItem> = {
  name: '',
  description: '',
  price: 0,
  category: 'mains',
  available: true,
};

export default function MenuManagement() {
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
      .catch(() => { setError('Failed to load menu items'); setLoading(false); });
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    setFormData(BLANK_FORM);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.description) {
      alert('Please fill in all fields');
      return;
    }
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
      setError(e.message || 'Failed to save item');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/admin/menu?id=${id}`, {
        method: 'DELETE',
        headers: adminHeaders(),
      });
      if (!res.ok) throw new Error('Delete failed');
      setMenuItems(menuItems.filter(item => item.id !== id));
    } catch (e: any) {
      setError(e.message || 'Failed to delete item');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Menu Management</h2>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                placeholder="e.g., Grilled Sea Bass"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (ALL)
              </label>
              <input
                type="number"
                value={formData.price || 0}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                placeholder="1800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category || 'mains'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as MenuItem['category'] })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              >
                <option value="starters">Starters</option>
                <option value="mains">Mains</option>
                <option value="seafood">Seafood</option>
                <option value="fish">Fish</option>
                <option value="drinks">Drinks</option>
                <option value="wines">Wines</option>
                <option value="desserts">Desserts</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available
              </label>
              <select
                value={formData.available ? 'yes' : 'no'}
                onChange={(e) => setFormData({ ...formData, available: e.target.value === 'yes' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 resize-none"
                placeholder="Describe this dish..."
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {saving ? 'Saving…' : editingId ? 'Update Item' : 'Add Item'}
            </button>
            {editingId && (
              <button
                onClick={() => { setEditingId(null); setFormData(BLANK_FORM); }}
                className="flex-1 bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {!editingId && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold mb-6"
          >
            <Plus size={20} />
            New Menu Item
          </button>
        )}
      </div>

      {/* Items List */}
      {loading ? (
        <p className="text-center text-gray-500 py-12">Loading menu items…</p>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                {item.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            <p className="text-xl font-bold text-blue-600 mb-4">{item.price} ALL</p>
            <p className="text-xs text-gray-500 mb-4">Category: {item.category}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
