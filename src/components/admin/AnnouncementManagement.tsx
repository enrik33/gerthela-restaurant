'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import type { Announcement } from '@/types';
import { adminHeaders } from '@/lib/admin-fetch';

const BLANK_FORM: Partial<Announcement> = { title: '', content: '', published: true };

export default function AnnouncementManagement() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Announcement>>(BLANK_FORM);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/admin/announcements', { headers: adminHeaders() })
            .then(r => r.json())
            .then(data => { setAnnouncements(Array.isArray(data) ? data : []); setLoading(false); })
            .catch(() => { setError('Failed to load announcements'); setLoading(false); });
    }, []);

    const handleAdd = () => {
        setEditingId(null);
        setFormData(BLANK_FORM);
    };

    const handleEdit = (announcement: Announcement) => {
        setEditingId(announcement.id);
        setFormData(announcement);
    };

    const handleSave = async () => {
        if (!formData.title || !formData.content) {
            alert('Please fill in all fields');
            return;
        }
        setSaving(true);
        setError('');

        try {
            if (editingId) {
                const res = await fetch('/api/admin/announcements', {
                    method: 'PUT',
                    headers: adminHeaders(),
                    body: JSON.stringify({ id: editingId, ...formData }),
                });
                const updated = await res.json();
                if (!res.ok) throw new Error(updated.error);
                setAnnouncements(announcements.map(a => a.id === editingId ? updated : a));
            } else {
                const res = await fetch('/api/admin/announcements', {
                    method: 'POST',
                    headers: adminHeaders(),
                    body: JSON.stringify(formData),
                });
                const created = await res.json();
                if (!res.ok) throw new Error(created.error);
                setAnnouncements([created, ...announcements]);
            }
            setEditingId(null);
            setFormData(BLANK_FORM);
        } catch (e: any) {
            setError(e.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            const res = await fetch(`/api/admin/announcements?id=${id}`, {
                method: 'DELETE',
                headers: adminHeaders(),
            });
            if (!res.ok) throw new Error('Delete failed');
            setAnnouncements(announcements.filter(a => a.id !== id));
        } catch (e: any) {
            setError(e.message || 'Failed to delete');
        }
    };

    const handleTogglePublish = async (announcement: Announcement) => {
        try {
            const res = await fetch('/api/admin/announcements', {
                method: 'PUT',
                headers: adminHeaders(),
                body: JSON.stringify({ id: announcement.id, published: !announcement.published }),
            });
            const updated = await res.json();
            if (!res.ok) throw new Error(updated.error);
            setAnnouncements(announcements.map(a => a.id === announcement.id ? updated : a));
        } catch (e: any) {
            setError(e.message || 'Failed to update');
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Announcements</h2>
                <p className="text-gray-600 mb-6">Create news and event announcements for your guests</p>

                {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                {/* Form */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                value={formData.title || ''}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                placeholder="e.g., Special Fresh Catch Today"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Content
                            </label>
                            <textarea
                                value={formData.content || ''}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 resize-none"
                                placeholder="Write your announcement here..."
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="published"
                                checked={formData.published || false}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <label htmlFor="published" className="text-sm font-medium text-gray-700">
                                Publish immediately
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {saving ? 'Saving…' : editingId ? 'Update' : 'Create'} Announcement
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

                {!editingId && announcements.length > 0 && (
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold mb-6"
                    >
                        <Plus size={20} />
                        New Announcement
                    </button>
                )}
            </div>

            {/* Announcements List */}
            {loading ? (
                <p className="text-center text-gray-500 py-12">Loading…</p>
            ) : announcements.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-600 mb-4">No announcements yet</p>
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        <Plus size={20} />
                        Create Your First Announcement
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                                    <p className="text-sm text-gray-500">
                                        {announcement.created_at && new Date(announcement.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${announcement.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {announcement.published ? 'Published' : 'Draft'}
                                </span>
                            </div>

                            <p className="text-gray-700 mb-4">{announcement.content}</p>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleTogglePublish(announcement)}
                                    className="flex-1 px-3 py-2 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200 transition text-sm font-semibold"
                                >
                                    {announcement.published ? 'Unpublish' : 'Publish'}
                                </button>
                                <button
                                    onClick={() => handleEdit(announcement)}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                                >
                                    <Edit2 size={16} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(announcement.id)}
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
