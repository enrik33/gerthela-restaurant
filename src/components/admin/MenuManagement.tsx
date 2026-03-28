'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import type { MenuItem } from '@/types';

// Dummy data for demo
const INITIAL_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Grilled Sea Bass',
    description: 'Fresh sea bass grilled to perfection with lemon and herbs',
    price: 1800,
    category: 'seafood',
    available: true,
  },
];

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'mains',
    available: true,
  });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'mains',
      available: true,
    });
  };

  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleSave = () => {
    if (!formData.name || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    if (editingId) {
      setMenuItems(menuItems.map(item =>
        item.id === editingId ? { ...item, ...formData } as MenuItem : item
      ));
    } else {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: formData.name!,
        description: formData.description!,
        price: formData.price!,
        category: formData.category as MenuItem['category'],
        available: formData.available!,
      };
      setMenuItems([...menuItems, newItem]);
    }

    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'mains',
      available: true,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure?')) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Menu Management</h2>

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
              className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {editingId ? 'Update Item' : 'Add Item'}
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    name: '',
                    description: '',
                    price: 0,
                    category: 'mains',
                    available: true,
                  });
                }}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${
                item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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
    </div>
  );
}
