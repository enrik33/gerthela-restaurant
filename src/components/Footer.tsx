'use client';

import { MapPin, Phone, Clock, Github, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Gerthela Taverna</h3>
                        <p className="text-gray-300 text-sm">
                            Fresh seafood restaurant on Saranda's waterfront. Family-owned since many years, serving the finest local catch daily.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <Phone size={18} className="text-blue-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-300">+355 68 666 0000</p>
                                    <p className="text-sm text-gray-300">+355 69 621 5643 (WhatsApp)</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <MapPin size={18} className="text-blue-400 flex-shrink-0 mt-1" />
                                <p className="text-sm text-gray-300">Rruga Jonianet, Saranda 9701</p>
                            </div>
                        </div>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Hours</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                            <p>Mon-Sat: 1:00 PM - 11:00 PM</p>
                            <p>Sunday: 1:00 PM - 11:00 PM</p>
                            <p className="text-yellow-400">Closed Tuesdays</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Gerthela Taverna. All rights reserved.</p>
                        <a href="https://www.instagram.com/gerthela_/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                            Instagram
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
