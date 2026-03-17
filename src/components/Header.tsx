'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        G
                    </div>
                    <span className="hidden sm:inline text-xl font-bold text-gray-900">Gerthela</span>
                </Link>

                {/* Mobile menu button */}
                <button
                    className="sm:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop nav */}
                <nav className="hidden sm:flex gap-6">
                    <Link href="/#about" className="text-gray-700 hover:text-blue-600 transition">
                        About
                    </Link>
                    <Link href="/#menu" className="text-gray-700 hover:text-blue-600 transition">
                        Menu
                    </Link>
                    <Link href="/#gallery" className="text-gray-700 hover:text-blue-600 transition">
                        Gallery
                    </Link>
                    <Link href="/#reviews" className="text-gray-700 hover:text-blue-600 transition">
                        Reviews
                    </Link>
                    <Link href="/#contact" className="text-gray-700 hover:text-blue-600 transition">
                        Contact
                    </Link>
                    <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition">
                        Admin
                    </Link>
                </nav>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="sm:hidden bg-white border-t">
                    <nav className="flex flex-col gap-4 px-4 py-4">
                        <Link href="/#about" className="text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                            About
                        </Link>
                        <Link href="/#menu" className="text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                            Menu
                        </Link>
                        <Link href="/#gallery" className="text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                            Gallery
                        </Link>
                        <Link href="/#reviews" className="text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                            Reviews
                        </Link>
                        <Link href="/#contact" className="text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                            Contact
                        </Link>
                        <Link href="/admin" className="text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                            Admin
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
