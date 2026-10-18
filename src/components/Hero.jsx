import React, { useState, useEffect } from 'react';
import {
  Download,
  BookOpen,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Zap,
  WifiOff,
  Printer,
  ShieldCheck,
  Layers,
  Sparkles,
} from 'lucide-react';
import MountainSilhouette from './MountainSilhouette';

// Urutan screenshot CampRent POS: 0.webp -> A1 s.d A6 -> K1 s.d K5
const APK_SCREENSHOTS = [
  {
    src: '/image/0.webp',
    tag: 'Login & Offline',
    title: 'CampRent POS Login & Offline-Ready',
    subtitle: 'Antarmuka Login Aman dengan dukungan SQLite Offline-First',
  },
  {
    src: '/image/A1.webp',
    tag: 'Owner Dashboard',
    title: 'Dashboard Utama Rental Outdoor',
    subtitle: 'Ringkasan Aktivitas Toko, Sewa Aktif & Kas Harian',
  },
  {
    src: '/image/A2.webp',
    tag: 'Monitoring Overdue',
    title: 'Laporan Keterlambatan & Piutang Sewa',
    subtitle: 'Deteksi Unit Terlambat Kembali & Hitungan Denda Otomatis',
  },
  {
    src: '/image/A3.webp',
    tag: 'Inventori Alat',
    title: 'Manajemen Inventori & Varian Alat Camping',
    subtitle: 'Pengaturan Stok, Tarif Harian & Kategori Sewa Toko',
  },
  {
    src: '/image/A4.webp',
    tag: 'Jaminan Fisik',
    title: 'Detail Transaksi & Monitoring Jaminan',
    subtitle: 'Pengawasan KTP, SIM & Deposit Tunai Pelanggan',
  },
  {
    src: '/image/A5.webp',
    tag: 'Laporan Finansial',
    title: 'Laporan Keuangan & Omzet Real-Time',
    subtitle: 'Rekap Pembayaran Tunai, Transfer Bank, QRIS & Denda',
  },
  {
    src: '/image/A6.webp',
    tag: 'Audit Shift',
    title: 'Pusat Audit Seluruh Shift Kasir',
    subtitle: 'Pemantauan Jam Buka-Tutup Kasir & Rekonsiliasi Laci',
  },
  {
    src: '/image/K1.webp',
    tag: 'Buka Shift Kasir',
    title: 'Proteksi Buka Shift Kasir (Shift Guard)',
    subtitle: 'Pencatatan Modal Receh Awal Laci & Kunci Transaksi',
  },
  {
    src: '/image/K2.webp',
    tag: 'Floating Cart',
    title: 'Katalog Kasir & Floating Cart Otomatis',
    subtitle: 'Kalkulator Pembayaran Cepat, DP Minimum & Kembalian',
  },
  {
    src: '/image/K3.webp',
    tag: 'Inspeksi Kembali',
    title: 'Modal Inspeksi Kondisi Alat Pengembalian',
    subtitle: 'Cek Alat Bersih, Denda Kotor, atau Servis Rusak/Hilang',
  },
  {
    src: '/image/K4.webp',
    tag: 'Tutup Shift',
    title: 'Rekonsiliasi Tutup Shift Kasir',
    subtitle: 'Validasi Uang Fisik di Laci vs Rekap Penjualan Sistem',
  },
  {
    src: '/image/K5.webp',
    tag: 'Struk Thermal',
    title: 'Riwayat Transaksi & Cetak Struk POS',
    subtitle: 'Dukungan Cetak Bukti Sewa ke Printer Bluetooth 58/80mm',
  },
];

export default function Hero({ onDownloadClick, onOpenModal }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Preload seluruh screenshot agar transisi instan tanpa jeda/flicker
  useEffect(() => {
    APK_SCREENSHOTS.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  // Auto-cycle gambar setiap 3.5 detik (pause saat kursor di atas tablet)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % APK_SCREENSHOTS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + APK_SCREENSHOTS.length) % APK_SCREENSHOTS.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % APK_SCREENSHOTS.length);
  };

  const activeImage = APK_SCREENSHOTS[currentIdx];

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
                className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.98] shadow-lg shadow-emerald-950/20 group cursor-pointer"
              >
                <Download className="w-4 h-4 stroke-[2.5] group-hover:translate-y-0.5 transition-transform" />
                <span>Unduh APK (v1.1 Terbaru)</span>
                <span className="text-[10px] bg-white/20 text-white font-extrabold px-1.5 py-0.5 rounded">
                  Gratis
                </span>
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

          {/* Right Column: Sleek Tablet Mockup with Auto-Cycling Screenshots */}
          <div className="lg:col-span-5 relative flex justify-center py-6 sm:py-8">
            
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onClick={() => onOpenModal(activeImage.src, activeImage.title, activeImage.subtitle)}
              className="relative cursor-pointer group max-w-[340px] sm:max-w-[380px] w-full select-none"
            >
              {/* Device outer frame with crisp dark bezel creating contrast */}
              <div className="relative rounded-[32px] p-2 bg-zinc-900 border border-zinc-700 shadow-2xl transition-all duration-300 group-hover:shadow-emerald-900/30">
                
                {/* Speaker pill */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-14 h-1 bg-zinc-700 rounded-full z-20" />

                {/* Tablet Screen */}
                <div className="relative rounded-[26px] overflow-hidden bg-black border border-zinc-800 aspect-[3/4.2]">
                  
                  {/* Layered crossfade images */}
                  {APK_SCREENSHOTS.map((item, idx) => (
                    <img
                      key={item.src}
                      src={item.src}
                      alt={item.title}
                      className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out ${
                        idx === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    />
                  ))}
                  
                  {/* Floating active badge on top of screen */}
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/75 text-emerald-300 border border-emerald-500/30 backdrop-blur-md shadow-xs">
                      {activeImage.tag}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold bg-black/60 text-white/80 backdrop-blur-md">
                      {currentIdx + 1}/{APK_SCREENSHOTS.length}
                    </span>
                  </div>

                  {/* Manual Arrow Controls (appear on hover) */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Screenshot Sebelumnya"
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs cursor-pointer border border-white/20"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Screenshot Selanjutnya"
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs cursor-pointer border border-white/20"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Mini Slide Dots at bottom inside tablet */}
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md">
                    {APK_SCREENSHOTS.map((item, idx) => (
                      <button
                        key={item.src}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentIdx(idx);
                        }}
                        aria-label={`Ke slide ${idx + 1}`}
                        className={`transition-all rounded-full cursor-pointer ${
                          idx === currentIdx
                            ? 'w-4 h-1.5 bg-emerald-400'
                            : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Hover overlay with 'Klik untuk Perbesar' */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-15 pointer-events-none">
                    <span className="px-3 py-1.5 text-xs font-semibold text-zinc-950 bg-white/95 rounded-full shadow-lg backdrop-blur-xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Klik untuk Perbesar Layar
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Card 1: Rental Transaction (Ditempatkan di luar batas atas-kiri frame agar layar bebas terhalang) */}
              <div className="absolute -top-6 -left-3 sm:-left-12 lg:-left-16 bg-white/95 backdrop-blur-md border border-zinc-200/90 py-2 px-3 sm:py-2.5 sm:px-3.5 rounded-xl shadow-lg flex items-center gap-2.5 max-w-[190px] sm:max-w-[210px] z-30 transition-all duration-300 group-hover:opacity-20 pointer-events-none">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                </div>
                <div>
                  <p className="text-[9px] text-emerald-700 font-bold uppercase tracking-wider">Durasi 3 Hari</p>
                  <p className="text-[11px] sm:text-xs font-bold text-zinc-900 leading-tight">Tenda Dome 4P + Kompor</p>
                  <p className="text-[9px] sm:text-[10px] text-zinc-500 font-medium">DP Rp 75.000 (Lunas)</p>
                </div>
              </div>

              {/* Floating Card 2: Offline-First Status (Ditempatkan di luar batas bawah-kanan frame agar layar bebas terhalang) */}
              <div className="absolute -bottom-6 -right-3 sm:-right-10 lg:-right-14 bg-white/95 backdrop-blur-md border border-zinc-200/90 py-2 px-3 sm:py-2.5 sm:px-3.5 rounded-xl shadow-lg flex items-center gap-2.5 max-w-[190px] sm:max-w-[210px] z-30 transition-all duration-300 group-hover:opacity-20 pointer-events-none">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                  <WifiOff className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                </div>
                <div>
                  <p className="text-[9px] text-emerald-700 font-bold uppercase tracking-wider">Mode Offline</p>
                  <p className="text-[11px] sm:text-xs font-bold text-zinc-900 leading-tight">Siap Bertransaksi</p>
                  <p className="text-[9px] sm:text-[10px] text-zinc-500 font-medium">Auto-Sync Saat Online</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
