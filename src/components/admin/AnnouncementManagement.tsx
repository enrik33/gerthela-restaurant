'use client';

import { useState, useEffect } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { Announcement } from '@/types';
import { adminHeaders } from '@/lib/admin-fetch';
import { adminT, type AdminLang } from '@/lib/admin-i18n';

const BLANK_FORM: Partial<Announcement> = { title: '', content: '', published: true };

export default function AnnouncementManagement({ lang }: { lang: AdminLang }) {
    const t = adminT[lang];
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
            .catch(() => { setError(t.errorLoad); setLoading(false); });
    }, []);

    const handleAdd = () => { setEditingId(null); setFormData(BLANK_FORM); };

    const handleEdit = (announcement: Announcement) => {
        setEditingId(announcement.id);
        setFormData(announcement);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSave = async () => {
        if (!formData.title || !formData.content) return;
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
        } catch {
            setError(t.errorSave);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(t.confirmDelete)) return;
        try {
            const res = await fetch(`/api/admin/announcements?id=${id}`, { method: 'DELETE', headers: adminHeaders() });
            if (!res.ok) throw new Error();
            setAnnouncements(announcements.filter(a => a.id !== id));
        } catch {
            setError(t.errorDelete);
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
        } catch {
            setError(t.errorSave);
        }
    };

    const field = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c9972c] focus:border-transparent transition text-gray-800';
    const lbl = 'block text-sm font-semibold text-gray-600 mb-1.5';

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">{t.announcementsTitle}</h2>
                <p className="text-gray-500 text-sm mt-1">{t.announcementsSubtitle}</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>
            )}

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                <h3 className="font-semibold text-gray-700 text-lg">
                    {editingId ? t.updateAnnouncement : t.createAnnouncement}
                </h3>
                <div>
                    <label className={lbl}>{t.annTitle}</label>
                    <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={field}
                        placeholder="e.g., Special Fresh Catch Today"
                    />
                </div>
                <div>
                    <label className={lbl}>{t.content}</label>
                    <textarea
                        value={formData.content || ''}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={4}
                        className={`${field} resize-none`}
                        placeholder="Write your announcement here…"
                    />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.published || false}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        className="w-5 h-5 accent-[#c9972c]"
                    />
                    <span className="text-sm font-semibold text-gray-600">{t.publishNow}</span>
                </label>

                <div className="flex gap-3 pt-1">
                    <button
                        onClick={handleSave}
                        disabled={saving || !formData.title || !formData.content}
                        className="flex-1 bg-[#c9972c] hover:bg-[#b8871f] text-white font-bold py-3 rounded-xl transition disabled:opacity-40"
                    >
                        {saving ? t.saving : editingId ? t.updateAnnouncement : t.createAnnouncement}
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

            {!editingId && announcements.length > 0 && (
                <button
                    onClick={handleAdd}
                    className="px-5 py-2.5 bg-[#0d1b2a] text-white rounded-xl hover:bg-[#1a2d42] transition font-semibold text-sm"
                >
                    {t.newAnnouncement}
                </button>
            )}

            {/* List */}
            {loading ? (
                <p className="text-center text-gray-400 py-12">{t.loading}</p>
            ) : announcements.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                    <p className="text-4xl mb-3">📢</p>
                    <p className="text-gray-500 mb-4">{t.noAnnouncements}</p>
                    <button onClick={handleAdd} className="px-5 py-2.5 bg-[#c9972c] text-white rounded-xl font-semibold hover:bg-[#b8871f] transition">
                        {t.createFirst}
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {announcements.map((ann) => (
                        <div key={ann.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{ann.title}</h3>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {ann.created_at && new Date(ann.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ml-2 shrink-0 ${
                                    ann.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                }`}>
                                    {ann.published ? t.published : t.draft}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{ann.content}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleTogglePublish(ann)}
                                    className="flex-1 py-2.5 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition text-sm font-semibold"
                                >
                                    {ann.published ? t.unpublish : t.publish}
                                </button>
                                <button
                                    onClick={() => handleEdit(ann)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition text-sm font-semibold"
                                >
                                    <Edit2 size={15} /> {t.edit}
                                </button>
                                <button
                                    onClick={() => handleDelete(ann.id)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition text-sm font-semibold"
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
