import React, { useState, useEffect } from 'react';
import { Download, Menu, X, User, Image as ImageIcon } from 'lucide-react';

export default function Navbar({ onDownloadClick, currentPath = '/', onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Text navigation links (tanpa duplikasi 'Unduh APK' karena sudah ada di tombol utama kanan)
  const navLinks = [
    { name: 'Solusi', href: '#solusi' },
    { name: 'Fitur', href: '#fitur' },
    { name: 'Hak Akses', href: '#roles' },
    { name: 'Perbandingan', href: '#perbandingan' },
    { name: 'Panduan', href: '#panduan' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (currentPath !== '/') {
      if (onNavigate) onNavigate('/');
      setTimeout(() => {
        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isCompressorActive = currentPath === '/tools/image-compressor';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200 py-2.5 shadow-xs'
          : 'bg-white/80 backdrop-blur-sm border-b border-zinc-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo with official brand mark */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <img
              src="/image/camprent_logo.jpg"
              alt="CampRent Logo"
              className="w-9 h-9 rounded-xl object-cover shadow-2xs border border-emerald-700/20 group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-zinc-950">
                  CampRent<span className="text-emerald-700 font-bold">POS</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                  v1.1
                </span>
              </div>
              <p className="text-[9px] text-zinc-500 tracking-wider uppercase font-semibold">
                Rental Outdoor POS
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-2.5 py-1.5 text-xs font-semibold text-zinc-600 hover:text-emerald-700 hover:bg-zinc-50 rounded-lg transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}

            <div className="h-4 w-px bg-zinc-200 mx-1" />

            {/* Tools: Image Compressor Link */}
            <a
              href="/tools/image-compressor"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('/tools/image-compressor');
              }}
              className={`text-xs font-bold transition-all flex items-center gap-1.5 px-3 py-1.5 rounded-full border whitespace-nowrap ${
                isCompressorActive
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                  : 'bg-emerald-50/80 text-emerald-800 hover:bg-emerald-100 border-emerald-200/80'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Image Compressor</span>
              <span
                className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase leading-none ${
                  isCompressorActive
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-700 text-white'
                }`}
              >
                Baru
              </span>
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <a
              href="https://faliq-portfolio.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-600 hover:text-emerald-800 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              <User className="w-3.5 h-3.5 stroke-[2] text-zinc-500" />
              <span>Kontak</span>
            </a>

            <button
              onClick={onDownloadClick}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-all active:scale-95 shadow-sm shadow-emerald-950/20 cursor-pointer"
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
            className="lg:hidden p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-950 focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.8]" /> : <Menu className="w-5 h-5 stroke-[1.8]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-zinc-200 px-4 pt-3 pb-6 space-y-3 mt-2.5 animate-fadeIn shadow-lg">
          <div className="flex flex-col space-y-1">
            {/* Tools Link in Mobile Drawer */}
            <a
              href="/tools/image-compressor"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (onNavigate) onNavigate('/tools/image-compressor');
              }}
              className={`px-3 py-2.5 text-sm font-bold rounded-xl transition-colors flex items-center justify-between ${
                isCompressorActive
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                Image Compressor (WebP 1:1)
              </span>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 bg-emerald-700 text-white rounded-full">
                Baru
              </span>
            </a>

            <div className="h-px bg-zinc-100 my-1" />

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleLinkClick(e, link.href);
                }}
                className="px-3 py-2 text-sm font-semibold text-zinc-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onDownloadClick();
              }}
              className="w-full py-2.5 px-4 text-center text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg flex items-center justify-center gap-2 shadow-xs cursor-pointer"
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
              <span>Kontak Pengembang</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
