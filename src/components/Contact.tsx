'use client';

import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useT } from '@/hooks/useTranslations';

const today = new Date().toISOString().split('T')[0];

export default function Contact() {
  const t = useT();

  const CONTACT_INFO = [
    {
      icon: Phone,
      title: t.contact.phone,
      lines: ['+355 68 666 0000', '+355 68 666 0000 (WhatsApp)'],
      action: { label: t.contact.callNow, href: 'tel:+355686660000' },
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: MapPin,
      title: t.contact.location,
      lines: ['Rruga Jonianet', 'Saranda 9701, Albania'],
      action: { label: t.contact.getDirections, href: 'https://maps.app.goo.gl/6a7XSdJsT6XFVtL88' },
      color: 'bg-[#c9972c]/10 text-[#c9972c]',
    },
    {
      icon: Clock,
      title: t.contact.hours,
      lines: [t.contact.hoursLine],
      color: 'bg-teal-50 text-teal-600',
    },
    {
      icon: MessageCircle,
      title: t.contact.whatsapp,
      lines: [t.contact.whatsappLine1, t.contact.whatsappLine2],
      action: { label: t.contact.messageUs, href: 'https://wa.me/+355686660000' },
      color: 'bg-green-50 text-green-600',
    },
  ];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  });
  const [timeError, setTimeError] = useState('');
  const [dateError, setDateError] = useState('');

  const validateDate = (value: string) => {
    if (!value) return '';
    const selected = new Date(value + 'T00:00:00');
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    if (selected < todayDate) return t.contact.errorPastDate;
    return '';
  };

  const validateTime = (value: string) => {
    if (!value) return '';
    const [h] = value.split(':').map(Number);
    if (h < 13) return t.contact.errorTooEarly;
    if (h >= 23) return t.contact.errorTooLate;
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timeErr = validateTime(formData.time);
    const dateErr = validateDate(formData.date);
    if (timeErr) { setTimeError(timeErr); return; }
    if (dateErr) { setDateError(dateErr); return; }

    const formatTime = (t: string) => {
      if (!t) return '';
      const [h, m] = t.split(':').map(Number);
      const suffix = h >= 12 ? 'PM' : 'AM';
      const hour = h % 12 || 12;
      return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
    };

    const text = [
      `📋 *New Reservation Request*`,
      ``,
      `👤 *Name:* ${formData.name}`,
      formData.phone ? `📞 *Phone:* ${formData.phone}` : null,
      formData.email ? `📧 *Email:* ${formData.email}` : null,
      formData.date ? `📅 *Date:* ${formData.date}` : null,
      formData.time ? `🕐 *Time:* ${formatTime(formData.time)}` : null,
      formData.message ? `💬 *Message:* ${formData.message}` : null,
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/+355686660000?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'time') setTimeError(validateTime(value));
    if (name === 'date') setDateError(validateDate(value));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputClass = "w-full px-4 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c9972c] focus:border-transparent text-sm transition";

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-[#c9972c] font-semibold tracking-widest uppercase text-sm mb-3">
            {t.contact.sectionLabel}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#e6edf3] mb-4">
            {t.contact.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTACT_INFO.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.title}
                  className="bg-[#161b22] rounded-2xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${info.color}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold text-[#e6edf3] mb-2">{info.title}</h3>
                  {info.lines.map((line, i) => (
                    <p key={i} className={`text-sm ${i === 1 && info.title === 'Hours' ? 'text-red-400 font-medium' : 'text-gray-400'}`}>
                      {line}
                    </p>
                  ))}
                  {info.action && (
                    <a
                      href={info.action.href}
                      target={info.action.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-block mt-3 text-sm font-semibold text-[#c9972c] hover:text-[#a87a20] transition-colors"
                    >
                      {info.action.label} →
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="bg-[#0d1b2a] rounded-2xl p-8">
            <h3 className="font-display text-2xl font-bold text-white mb-2">{t.contact.formTitle}</h3>
            <p className="text-gray-400 text-sm mb-6">{t.contact.formSubtitle}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder={t.contact.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                    {t.contact.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder={t.contact.phonePlaceholder}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                  {t.contact.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder={t.contact.emailPlaceholder}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                    {t.contact.dateLabel}
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    required
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                  {dateError && (
                    <p className="text-red-400 text-xs mt-1">{dateError}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="time" className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                    {t.contact.timeLabel}
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    min="13:00"
                    max="23:00"
                    required
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                  {timeError && (
                    <p className="text-red-400 text-xs mt-1">{timeError}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                  {t.contact.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder={t.contact.messagePlaceholder}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#c9972c] hover:bg-[#a87a20] text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                {t.contact.send}
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden shadow-xl h-80 md:h-96 border border-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.7845831243567!2d20.005048!3d39.873105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135294e7fc9b5b4f%3A0x4c7a1f1a1a1a1a1a!2sGerthela!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
