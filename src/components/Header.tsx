'use client';

import Link from 'next/link';
import { Menu, X, Utensils } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useT } from '@/hooks/useTranslations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const t = useT();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/#about', label: t.nav.about },
        { href: '/#menu', label: t.nav.menu },
        { href: '/#gallery', label: t.nav.gallery },
        { href: '/#reviews', label: t.nav.reviews },
        { href: '/#contact', label: t.nav.contact },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#c9972c] to-[#a87a20] shadow-md group-hover:shadow-lg transition-shadow">
                        <Utensils size={18} className="text-white" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className={`font-display font-bold text-lg tracking-wide transition-colors ${scrolled ? 'text-[#0d1b2a]' : 'text-white'}`}>
                            Gerthela
                        </span>
                        <span className={`text-xs font-light tracking-widest uppercase transition-colors ${scrolled ? 'text-[#c9972c]' : 'text-[#f0c060]'}`}>
                            Taverna
                        </span>
                    </div>
                </Link>

                {/* Mobile: language switcher + hamburger */}
                <div className="sm:hidden flex items-center gap-2">
                    <LanguageSwitcher scrolled={scrolled} />
                    <button
                        className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-[#0d1b2a] hover:bg-gray-100' : 'text-white hover:bg-white/20'}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Desktop nav */}
                <nav className="hidden sm:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all ${scrolled
                                ? 'text-gray-700 hover:text-[#c9972c] hover:bg-[#c9972c]/5'
                                : 'text-white/90 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="ml-2">
                        <LanguageSwitcher scrolled={scrolled} />
                    </div>
                    <Link
                        href="/#contact"
                        className="ml-4 px-5 py-2 bg-[#c9972c] hover:bg-[#a87a20] text-white rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                    >
                        {t.nav.reserve}
                    </Link>
                </nav>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="sm:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-xl">
                    <nav className="flex flex-col px-4 py-4 gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-3 text-gray-700 hover:text-[#c9972c] hover:bg-[#c9972c]/5 rounded-lg font-medium transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/#contact"
                            className="mt-2 px-4 py-3 bg-[#c9972c] hover:bg-[#a87a20] text-white rounded-lg font-semibold text-center transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t.nav.reserve}
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
