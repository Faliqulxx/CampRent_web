import React, { useState, useEffect } from 'react';
import { Download, Menu, X, ExternalLink, User } from 'lucide-react';

export default function Navbar({ onDownloadClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solusi', href: '#solusi' },
    { name: 'Fitur', href: '#fitur' },
    { name: 'Hak Akses', href: '#roles' },
    { name: 'Perbandingan', href: '#perbandingan' },
    { name: 'Unduh APK', href: '#download' },
    { name: 'Panduan', href: '#panduan' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200 py-3 shadow-sm'
          : 'bg-white/70 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with official image */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/image/camprent_logo.jpg"
              alt="CampRent Logo"
              className="w-10 h-10 rounded-xl object-cover shadow-sm border border-emerald-700/20 group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-zinc-950">
                  CampRent<span className="text-emerald-700 font-bold">POS</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                  v1.1
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 tracking-wider uppercase font-medium">
                Rental Outdoor POS
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-zinc-600 hover:text-emerald-700 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://faliq-portfolio.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200"
            >
              <span>Portfolio</span>
              <ExternalLink className="w-3 h-3 text-emerald-700" />
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://faliq-portfolio.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-zinc-700 hover:text-emerald-800 bg-zinc-100 hover:bg-emerald-50 border border-zinc-200 rounded-lg transition-colors"
            >
              <User className="w-3.5 h-3.5 stroke-[2] text-zinc-600" />
              <span>Kontak</span>
            </a>

            <button
              onClick={onDownloadClick}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-all active:scale-95 shadow-sm shadow-emerald-950/20"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Unduh APK</span>
              <span className="text-[9px] font-bold uppercase bg-white/20 text-white px-1.5 py-0.5 rounded">
                v1.1
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-950 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.8]" /> : <Menu className="w-5 h-5 stroke-[1.8]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-zinc-200 px-4 pt-3 pb-6 space-y-3 mt-3 animate-fadeIn shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-zinc-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://faliq-portfolio.vercel.app/"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors flex items-center justify-between"
            >
              <span>Portfolio Pengembang</span>
              <ExternalLink className="w-4 h-4 text-emerald-700" />
            </a>
          </div>
          <div className="pt-3 border-t border-zinc-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onDownloadClick();
              }}
              className="w-full py-2.5 px-4 text-center text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Unduh APK (v1.1 &amp; v1.0.0 Siap)</span>
            </button>
            <a
              href="https://faliq-portfolio.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-4 text-center text-xs font-semibold text-zinc-700 hover:text-emerald-800 bg-zinc-100 border border-zinc-200 rounded-lg flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 stroke-[1.8] text-zinc-600" />
              Kontak (Portfolio Pengembang)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
