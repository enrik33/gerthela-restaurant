'use client';

import { useState, useEffect } from 'react';
import type { RestaurantInfo } from '@/types';
import { adminHeaders } from '@/lib/admin-fetch';

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

export default function RestaurantInfoManagement() {
    const [info, setInfo] = useState<RestaurantInfo>(FALLBACK_INFO);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/admin/restaurant', { headers: adminHeaders() })
            .then(r => r.json())
            .then(data => { if (data && !data.error) setInfo(data); setLoading(false); })
            .catch(() => { setError('Failed to load restaurant info'); setLoading(false); });
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
        } catch (e: any) {
            setError(e.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Restaurant Information</h2>

                {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                {saved && (
                    <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        Changes saved successfully!
                    </div>
                )}

                {loading ? (
                    <p className="text-center text-gray-500 py-12">Loading…</p>
                ) : (
                <div className="bg-white rounded-lg shadow p-6 space-y-6">
                    {/* Basic Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Restaurant Name
                                </label>
                                <input
                                    type="text"
                                    value={info.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={info.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={info.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    WhatsApp
                                </label>
                                <input
                                    type="tel"
                                    value={info.whatsapp}
                                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={info.email || ''}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Instagram
                                </label>
                                <input
                                    type="url"
                                    value={info.instagram || ''}
                                    onChange={(e) => handleChange('instagram', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    value={info.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Latitude
                                </label>
                                <input
                                    type="number"
                                    step="0.0001"
                                    value={info.latitude}
                                    onChange={(e) => handleChange('latitude', parseFloat(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Longitude
                                </label>
                                <input
                                    type="number"
                                    step="0.0001"
                                    value={info.longitude}
                                    onChange={(e) => handleChange('longitude', parseFloat(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Hours */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Opening Hours</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                                <div key={day}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                        {day}
                                    </label>
                                    <input
                                        type="text"
                                        value={info[day as keyof RestaurantInfo]}
                                        onChange={(e) => handleChange(day as keyof RestaurantInfo, e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                        placeholder="e.g., 1:00 PM - 11:00 PM"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {saving ? 'Saving…' : 'Save Changes'}
                    </button>
                </div>
                )}
            </div>
        </div>
    );
}
