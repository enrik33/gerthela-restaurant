'use client';

import { MapPin, Phone, Clock, Utensils } from 'lucide-react';
import Link from 'next/link';
import { useT } from '@/hooks/useTranslations';

export default function Footer() {
    const t = useT();
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
                            {t.footer.tagline}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-5">
                            <a
                                href="https://www.instagram.com/gerthela_/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 h-9 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] border border-white/10 transition-all text-sm text-gray-300 hover:text-white"
                                aria-label="Instagram"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                                Instagram
                            </a>
                            <a
                                href="https://wa.me/+355686660000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 h-9 rounded-lg bg-white/5 hover:bg-[#25d366] border border-white/10 transition-colors text-sm text-gray-300 hover:text-white"
                                aria-label="WhatsApp"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp
                            </a>
                            <a
                                href="https://www.tripadvisor.com/Restaurant_Review-g303165-d4926971-Reviews-Gerthela-Saranda_Vlore_County.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 h-9 rounded-lg bg-white/5 hover:bg-[#34e0a1] border border-white/10 transition-colors text-sm text-gray-300 hover:text-white"
                                aria-label="TripAdvisor"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                                    <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 1.919 9.378A5.993 5.993 0 0 0 9.993 17.4a5.985 5.985 0 0 0 3.97-1.508l1.077 1.17 1.078-1.17a5.985 5.985 0 0 0 3.969 1.508 6 6 0 0 0 5.99-6.012 5.997 5.997 0 0 0-1.92-4.406L24 4.648h-4.36c-2.307-1.57-4.976-2.353-7.634-2.353zM9.993 7.747a4.258 4.258 0 1 1 0 8.516 4.258 4.258 0 0 1 0-8.516zm8.025 0a4.258 4.258 0 1 1 0 8.516 4.258 4.258 0 0 1 0-8.516zm-8.025 1.486a2.772 2.772 0 1 0 0 5.545 2.772 2.772 0 0 0 0-5.545zm8.025 0a2.772 2.772 0 1 0 0 5.545 2.772 2.772 0 0 0 0-5.545zm-8.025 1.286a1.486 1.486 0 1 1 0 2.973 1.486 1.486 0 0 1 0-2.973zm8.025 0a1.486 1.486 0 1 1 0 2.973 1.486 1.486 0 0 1 0-2.973z" />
                                </svg>
                                Tripadvisor
                            </a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs text-[#c9972c]">{t.footer.contact}</h4>
                        <div className="space-y-3">
                            <div className="flex gap-2 items-start">
                                <Phone size={15} className="text-gray-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-300">+355 68 666 0000</p>
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
                        <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs text-[#c9972c]">{t.footer.hours}</h4>
                        <div className="space-y-2">
                            <div className="flex gap-2 items-start">
                                <Clock size={15} className="text-gray-500 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-gray-300 space-y-1">
                                    <p>{t.footer.everyDay}</p>
                                    <p className="text-white">1:00 PM – 12:00 AM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Gerthela Taverna. {t.footer.copyright}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <Link href="/admin" className="hover:text-gray-300 transition-colors">{t.footer.admin}</Link>
                        <span>·</span>
                        <span>Saranda, Albania</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
