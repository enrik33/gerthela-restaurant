'use client';

import { MapPin, Phone, Clock, Utensils } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#0d1b2a] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9972c] to-[#a87a20] flex items-center justify-center">
                                <Utensils size={18} className="text-white" />
                            </div>
                            <div>
                                <span className="font-display font-bold text-xl text-white">Gerthela</span>
                                <span className="block text-xs tracking-widest text-[#c9972c] uppercase">Taverna</span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Fresh seafood restaurant on Saranda&apos;s waterfront. Family-owned, serving the finest local catch daily since generations.
                        </p>
                        <div className="flex gap-3 mt-5">
                            <a
                                href="https://www.instagram.com/gerthela_/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#c9972c] border border-white/10 flex items-center justify-center transition-colors text-sm"
                                aria-label="Instagram"
                            >
                                📸
                            </a>
                            <a
                                href="https://wa.me/+355696215643"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#25d366] border border-white/10 flex items-center justify-center transition-colors text-sm"
                                aria-label="WhatsApp"
                            >
                                💬
                            </a>
                            <a
                                href="https://www.tripadvisor.com/Restaurant_Review-g303165-d4926971-Reviews-Gerthela-Saranda_Vlore_County.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#34e0a1] border border-white/10 flex items-center justify-center transition-colors text-sm"
                                aria-label="TripAdvisor"
                            >
                                🦉
                            </a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs text-[#c9972c]">Contact</h4>
                        <div className="space-y-3">
                            <div className="flex gap-2 items-start">
                                <Phone size={15} className="text-gray-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-300">+355 68 666 0000</p>
                                    <p className="text-sm text-gray-300">+355 69 621 5643</p>
                                </div>
                            </div>
                            <div className="flex gap-2 items-start">
                                <MapPin size={15} className="text-gray-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-gray-300">Rruga Jonianet, Saranda 9701, Albania</p>
                            </div>
                        </div>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs text-[#c9972c]">Hours</h4>
                        <div className="space-y-2">
                            <div className="flex gap-2 items-start">
                                <Clock size={15} className="text-gray-500 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-gray-300 space-y-1">
                                    <p>Mon, Wed–Sun</p>
                                    <p className="text-white">1:00 PM – 11:00 PM</p>
                                    <p className="text-red-400 font-medium mt-2">Tuesday: Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Gerthela Taverna. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <Link href="/admin" className="hover:text-gray-300 transition-colors">Admin</Link>
                        <span>·</span>
                        <span>Saranda, Albania</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
