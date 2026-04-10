'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useT } from '@/hooks/useTranslations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const t = useT();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (pathname.startsWith('/admin')) return null;

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
                ? 'bg-[#0d1117]/95 backdrop-blur-md shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <Image
                        src="/images/gerthela-logo.PNG"
                        alt="Gerthela Taverna"
                        width={160}
                        height={48}
                        className="h-12 w-auto object-contain transition-opacity group-hover:opacity-80"
                        priority
                    />
                </Link>

                {/* Mobile: language switcher + hamburger */}
                <div className="sm:hidden flex items-center gap-2">
                    <LanguageSwitcher scrolled={scrolled} />
                    <button
                        className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-[#e6edf3] hover:bg-gray-700' : 'text-white hover:bg-white/20'}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={mobileMenuOpen}
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
                                ? 'text-gray-300 hover:text-[#c9972c] hover:bg-[#c9972c]/5'
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
                <div className="sm:hidden bg-[#0d1117]/95 backdrop-blur-md border-t border-gray-700 shadow-xl">
                    <nav className="flex flex-col px-4 py-4 gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-3 text-gray-300 hover:text-[#c9972c] hover:bg-[#c9972c]/5 rounded-lg font-medium transition-colors"
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
