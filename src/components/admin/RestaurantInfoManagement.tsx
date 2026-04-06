'use client';

import { useState, useEffect } from 'react';
import type { RestaurantInfo } from '@/types';
import { adminHeaders } from '@/lib/admin-fetch';
import { adminT, type AdminLang } from '@/lib/admin-i18n';

const FALLBACK_INFO: RestaurantInfo = {
    id: 'main',
    name: 'Gerthela Taverna',
    description: 'Fresh seafood restaurant on Saranda waterfront',
    address: 'Rruga Jonianet, Saranda 9701',
    phone: '+355 68 666 0000',
    whatsapp: '+355 68 666 0000',
    email: 'info@gerthela.al',
    website: 'https://gerthela.al',
    instagram: 'https://www.instagram.com/gerthela_/',
    latitude: 39.8731,
    longitude: 20.00504,
    monday: '1:00 PM - 12:00 AM',
    tuesday: '1:00 PM - 12:00 AM',
    wednesday: '1:00 PM - 12:00 AM',
    thursday: '1:00 PM - 12:00 AM',
    friday: '1:00 PM - 12:00 AM',
    saturday: '1:00 PM - 12:00 AM',
    sunday: '1:00 PM - 12:00 AM',
};

export default function RestaurantInfoManagement({ lang }: { lang: AdminLang }) {
    const t = adminT[lang];
    const [info, setInfo] = useState<RestaurantInfo>(FALLBACK_INFO);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/admin/restaurant', { headers: adminHeaders() })
            .then(r => r.json())
            .then(data => { if (data && !data.error) setInfo(data); setLoading(false); })
            .catch(() => { setError(t.errorLoad); setLoading(false); });
    }, []);

    const handleChange = (field: keyof RestaurantInfo, value: any) => {
        setInfo(prev => ({ ...prev, [field]: value }));
        setSaved(false);
    };

    const handleSave = async () => {
        setSaving(true);
        setError('');
        setSaved(false);
        try {
            const res = await fetch('/api/admin/restaurant', {
                method: 'PUT',
                headers: adminHeaders(),
                body: JSON.stringify(info),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setInfo(data);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch {
            setError(t.errorSave);
        } finally {
            setSaving(false);
        }
    };

    const field = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c9972c] focus:border-transparent transition text-gray-800';
    const lbl = 'block text-sm font-semibold text-gray-600 mb-1.5';
    const section = 'bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4';

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">{t.infoTitle}</h2>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>
            )}
            {saved && (
                <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-xl text-sm font-semibold">{t.savedSuccess}</div>
            )}

            {loading ? (
                <p className="text-center text-gray-400 py-12">{t.loading}</p>
            ) : (
            <>
                {/* Basic Info */}
                <div className={section}>
                    <h3 className="text-base font-bold text-gray-700 mb-2">{t.basicInfo}</h3>
                    <div>
                        <label className={lbl}>{t.restaurantName}</label>
                        <input type="text" value={info.name} onChange={(e) => handleChange('name', e.target.value)} className={field} />
                    </div>
                    <div>
                        <label className={lbl}>{t.description}</label>
                        <textarea value={info.description} onChange={(e) => handleChange('description', e.target.value)} rows={3} className={`${field} resize-none`} />
                    </div>
                </div>

                {/* Contact */}
                <div className={section}>
                    <h3 className="text-base font-bold text-gray-700 mb-2">{t.contactInfo}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className={lbl}>{t.phone}</label><input type="tel" value={info.phone} onChange={(e) => handleChange('phone', e.target.value)} className={field} /></div>
                        <div><label className={lbl}>{t.whatsapp}</label><input type="tel" value={info.whatsapp} onChange={(e) => handleChange('whatsapp', e.target.value)} className={field} /></div>
                        <div><label className={lbl}>{t.email}</label><input type="email" value={info.email || ''} onChange={(e) => handleChange('email', e.target.value)} className={field} /></div>
                        <div><label className={lbl}>{t.instagram}</label><input type="url" value={info.instagram || ''} onChange={(e) => handleChange('instagram', e.target.value)} className={field} /></div>
                    </div>
                </div>

                {/* Location */}
                <div className={section}>
                    <h3 className="text-base font-bold text-gray-700 mb-2">{t.location}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-3"><label className={lbl}>{t.address}</label><input type="text" value={info.address} onChange={(e) => handleChange('address', e.target.value)} className={field} /></div>
                        <div><label className={lbl}>{t.latitude}</label><input type="number" step="0.0001" value={info.latitude} onChange={(e) => handleChange('latitude', parseFloat(e.target.value))} className={field} /></div>
                        <div><label className={lbl}>{t.longitude}</label><input type="number" step="0.0001" value={info.longitude} onChange={(e) => handleChange('longitude', parseFloat(e.target.value))} className={field} /></div>
                    </div>
                </div>

                {/* Hours */}
                <div className={section}>
                    <h3 className="text-base font-bold text-gray-700 mb-2">{t.openingHours}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(['monday','tuesday','wednesday','thursday','friday','saturday','sunday'] as const).map((day) => (
                            <div key={day}>
                                <label className={lbl}>{t.days[day]}</label>
                                <input
                                    type="text"
                                    value={String(info[day as keyof RestaurantInfo] ?? '')}
                                    onChange={(e) => handleChange(day as keyof RestaurantInfo, e.target.value)}
                                    className={field}
                                    placeholder="e.g., 1:00 PM – 11:00 PM"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-[#c9972c] hover:bg-[#b8871f] text-white font-bold py-4 rounded-xl transition disabled:opacity-40 text-lg"
                >
                    {saving ? t.saving : t.saveChanges}
                </button>
            </>
            )}
        </div>
    );
}
