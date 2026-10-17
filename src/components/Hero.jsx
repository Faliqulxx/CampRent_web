import React from 'react';
import { Download, BookOpen, ExternalLink, ChevronRight, Zap, WifiOff, Printer, ShieldCheck, Layers } from 'lucide-react';
import MountainSilhouette from './MountainSilhouette';

export default function Hero({ onDownloadClick, onOpenModal }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-white bg-grid-pattern border-b border-zinc-200/70">
      
      {/* Mountain silhouette background with subtle emerald/zinc transparency */}
      <div className="absolute -bottom-1 left-0 right-0 z-0">
        <MountainSilhouette opacity="0.06" className="w-full text-emerald-950" />
      </div>

      {/* Subtle soft green & grey ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Pill Badge with Official Logo */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold shadow-sm">
              <img
                src="/image/camprent_logo.jpg"
                alt="Logo"
                className="w-4 h-4 rounded-full object-cover shadow-xs"
              />
              <span>Sistem Kasir &amp; Rental Perlengkapan Outdoor • Dukungan Offline-First</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-zinc-950 leading-[1.15]">
              Aplikasi Kasir &amp; Manajemen Rental Outdoor{' '}
              <span className="text-emerald-700">Praktis &amp; Terintegrasi.</span>
            </h1>

            {/* Sub-headline from web.md */}
            <p className="text-base sm:text-lg text-zinc-800 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Kelola sewa tenda, jaminan identitas, denda keterlambatan, hingga shift kasir tanpa ribet.
            </p>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <strong className="text-zinc-900 font-semibold">CampRent POS</strong> dirancang khusus untuk toko persewaan perlengkapan camping dan alam bebas. Dukungan perhitungan durasi sewa harian otomatis, pengawasan deposit/jaminan fisik, deteksi keterlambatan, hingga rekonsiliasi kas kasir. <span className="text-emerald-800 font-semibold">Mendukung transaksi offline &amp; sinkronisasi cloud saat terhubung internet.</span>
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onDownloadClick}
                className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-900 border border-amber-500/40 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.98] shadow-md shadow-zinc-900/10 group"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <Download className="w-4 h-4 stroke-[2]" />
                <span>Unduh APK (Sedang Maintenance)</span>
              </button>

              <a
                href="https://faliq-portfolio.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 text-xs font-semibold text-zinc-800 hover:text-emerald-900 bg-zinc-100 hover:bg-emerald-50 border border-zinc-200 hover:border-emerald-200 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5 stroke-[2] text-emerald-700" />
                <span>Portfolio Pengembang</span>
              </a>

              <a
                href="#panduan"
                className="w-full sm:w-auto px-4 py-3.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 stroke-[1.8]" />
                <span>Panduan Instalasi</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[1.8]" />
              </a>
            </div>

            {/* Trust Badges - 4 Flat Cards from web.md */}
            <div className="pt-8 border-t border-zinc-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 hover:bg-emerald-50/40 border border-zinc-200/80 hover:border-emerald-200 transition-colors shadow-sm">
                <div className="p-1 rounded-md bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                  <Zap className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-950">Gratis Digunakan</h4>
                  <p className="text-[11px] text-zinc-500">Tanpa biaya abonemen</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 hover:bg-emerald-50/40 border border-zinc-200/80 hover:border-emerald-200 transition-colors shadow-sm">
                <div className="p-1 rounded-md bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                  <WifiOff className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-950">Offline-First</h4>
                  <p className="text-[11px] text-zinc-500">Siap di pegunungan</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 hover:bg-emerald-50/40 border border-zinc-200/80 hover:border-emerald-200 transition-colors shadow-sm">
                <div className="p-1 rounded-md bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                  <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-950">Thermal 58/80mm</h4>
                  <p className="text-[11px] text-zinc-500">Bluetooth &amp; USB POS</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 hover:bg-emerald-50/40 border border-zinc-200/80 hover:border-emerald-200 transition-colors shadow-sm">
                <div className="p-1 rounded-md bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-950">Data Terisolasi</h4>
                  <p className="text-[11px] text-zinc-500">Cloud Multi-Tenant</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sleek Tablet Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <div
              onClick={() => onOpenModal('/image/0.webp', 'CampRent POS Login & Offline-Ready', 'Antarmuka Login Aman dengan dukungan SQLite Offline-First')}
              className="relative cursor-pointer group max-w-[340px] sm:max-w-[380px] w-full"
            >
              {/* Device outer frame with crisp dark bezel creating contrast */}
              <div className="relative rounded-[32px] p-2 bg-zinc-900 border border-zinc-700 shadow-2xl transition-all duration-300 group-hover:shadow-emerald-900/20">
                
                {/* Speaker pill */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-14 h-1 bg-zinc-700 rounded-full z-20"></div>

                {/* Tablet Screen */}
                <div className="relative rounded-[26px] overflow-hidden bg-black border border-zinc-800 aspect-[3/4.2]">
                  <img
                    src="/image/0.webp"
                    alt="CampRent POS Tablet Interface"
                    className="w-full h-full object-cover object-top"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 text-xs font-semibold text-zinc-950 bg-white rounded-full shadow-lg">
                      Klik untuk Perbesar
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Card 1: Rental Transaction */}
              <div className="absolute -top-3 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md border border-zinc-200 p-3 rounded-xl shadow-xl flex items-center gap-3 max-w-[210px]">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                  <Layers className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">Durasi 3 Hari</p>
                  <p className="text-xs font-bold text-zinc-900 leading-tight">Tenda Dome 4P + Kompor</p>
                  <p className="text-[10px] text-zinc-600 font-medium">DP Rp 75.000 (Lunas)</p>
                </div>
              </div>

              {/* Floating Card 2: Offline-First Status */}
              <div className="absolute -bottom-4 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md border border-zinc-200 p-3 rounded-xl shadow-xl flex items-center gap-3 max-w-[210px]">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                  <WifiOff className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">Mode Offline</p>
                  <p className="text-xs font-bold text-zinc-900 leading-tight">Siap Bertransaksi</p>
                  <p className="text-[10px] text-zinc-600 font-medium">Auto-Sync Saat Online</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
