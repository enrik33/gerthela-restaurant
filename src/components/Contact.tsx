'use client';

import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const CONTACT_INFO = [
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+355 68 666 0000', '+355 68 666 0000 (WhatsApp)'],
    action: { label: 'Call Now', href: 'tel:+355686660000' },
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: MapPin,
    title: 'Location',
    lines: ['Rruga Jonianet', 'Saranda 9701, Albania'],
    action: { label: 'Get Directions', href: 'https://maps.app.goo.gl/6a7XSdJsT6XFVtL88' },
    color: 'bg-[#c9972c]/10 text-[#c9972c]',
  },
  {
    icon: Clock,
    title: 'Hours',
    lines: ['Every day: 1:00 PM – 12:00 AM'],
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    lines: ['Chat with us for quick response', 'Reservations & inquiries'],
    action: { label: 'Message Us', href: 'https://wa.me/+355686660000' },
    color: 'bg-green-50 text-green-600',
  },
];

const today = new Date().toISOString().split('T')[0];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  });
  const [timeError, setTimeError] = useState('');

  const validateTime = (value: string) => {
    if (!value) return '';
    const [h] = value.split(':').map(Number);
    if (h < 13) return 'Opening time is 1:00 PM. Please select a later time.';
    if (h >= 23) return 'Last reservation is at 11:00 PM. Please select an earlier time.';
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateTime(formData.time);
    if (error) { setTimeError(error); return; }

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputClass = "w-full px-4 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c9972c] focus:border-transparent text-sm transition";

  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-[#c9972c] font-semibold tracking-widest uppercase text-sm mb-3">
            Find Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0d1b2a] mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Visit us on Saranda&apos;s waterfront or contact us for reservations
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
                  className="bg-[#f8f4ed] rounded-2xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${info.color}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold text-[#0d1b2a] mb-2">{info.title}</h3>
                  {info.lines.map((line, i) => (
                    <p key={i} className={`text-sm ${i === 1 && info.title === 'Hours' ? 'text-red-500 font-medium' : 'text-gray-600'}`}>
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
            <h3 className="font-display text-2xl font-bold text-white mb-2">Make a Reservation</h3>
            <p className="text-gray-400 text-sm mb-6">We&apos;ll get back to you as soon as possible.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="+355 xxx xxx"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                    Date
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
                </div>
                <div>
                  <label htmlFor="time" className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                    Time
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
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about your visit or reservation..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#c9972c] hover:bg-[#a87a20] text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                Send Message
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
