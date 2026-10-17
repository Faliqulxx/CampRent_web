import React from 'react';
import { ArrowUp, User, ShieldCheck, ExternalLink, MessageSquarePlus } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-xs py-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-zinc-900">
          
          {/* Brand Column with official logo */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/image/camprent_logo.jpg"
                alt="CampRent Logo"
                className="w-10 h-10 rounded-xl object-cover shadow-sm border border-emerald-900/40"
              />
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight">
                  CampRent<span className="text-emerald-400 font-bold">POS</span>
                </span>
                <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold bg-emerald-950/80 text-emerald-300 rounded border border-emerald-800">
                  APK Android
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Sistem kasir dan manajemen sewa perlengkapan outdoor dengan dukungan penuh transaksi offline untuk toko sewa tenda dan pendakian gunung.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400/90 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Multi-Tenant Cloud • Bebas Iklan &amp; Biaya Langganan</span>
            </div>
          </div>

          {/* Nav Links Column 1 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#solusi" className="hover:text-emerald-400 transition-colors">Masalah &amp; Solusi Rental</a>
              </li>
              <li>
                <a href="#fitur" className="hover:text-emerald-400 transition-colors">5 Fitur Utama All-in-One</a>
              </li>
              <li>
                <a href="#roles" className="hover:text-emerald-400 transition-colors">Hak Akses Owner &amp; Kasir</a>
              </li>
              <li>
                <a href="#perbandingan" className="hover:text-emerald-400 transition-colors">Tabel Perbandingan</a>
              </li>
              <li>
                <a href="#download" className="hover:text-emerald-400 transition-colors">Download File APK</a>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 2 */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Pengembang &amp; Masukan
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://faliq-portfolio.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saran &amp; Request Fitur Baru</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400/70" />
                </a>
              </li>
              <li>
                <a
                  href="https://faliq-portfolio.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Portfolio Pengembang &amp; Kontak</span>
                </a>
              </li>
              <li>
                <a href="#panduan" className="hover:text-emerald-400 transition-colors">
                  Panduan Pemasangan di Android
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  Tanya Jawab Populer (FAQ)
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} CampRent POS. Saran &amp; Masukan: <a href="https://faliq-portfolio.vercel.app/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">faliq-portfolio.vercel.app</a>.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-zinc-400 hover:text-emerald-400 transition-colors font-medium"
            >
              <span>Ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
