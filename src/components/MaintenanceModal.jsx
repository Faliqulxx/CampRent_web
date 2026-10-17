import React, { useEffect } from 'react';
import { 
  AlertTriangle, 
  Wrench, 
  Sparkles, 
  Ban, 
  X, 
  ArrowRight, 
  MessageSquarePlus, 
  ExternalLink,
  ShieldAlert,
  Clock
} from 'lucide-react';

export default function MaintenanceModal({ isOpen, onClose, onFeedbackClick }) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="maintenance-title"
    >
      {/* Backdrop click dismiss */}
      <div 
        className="fixed inset-0 -z-10" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Card Container */}
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-[0_0_60px_rgba(245,158,11,0.15)] my-auto overflow-hidden">
        
        {/* Subtle Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors z-20 group"
          aria-label="Tutup pemberitahuan"
        >
          <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        <div className="space-y-6 relative z-10">
          
          {/* Header Badge & Title */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>PEMBARUAN SELESAI • RILIS RESMI</span>
            </div>

            <div className="space-y-1">
              <h2 id="maintenance-title" className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
                CampRent POS <span className="text-emerald-400">Versi 1.1</span> Resmi Dirilis!
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Status: Unduhan Dibuka Kembali (Berkas v1.1 &amp; v1.0.0 Siap)</span>
              </p>
            </div>
          </div>

          {/* Main Notice Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-emerald-500/25 space-y-2.5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5 border border-emerald-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                <p>
                  Kabar gembira! Proses pemeliharaan sistem telah selesai. Kami telah merilis pembaruan <strong className="text-emerald-300">CampRent POS v1.1</strong> dengan stabilitas database offline SQLite yang jauh lebih handal.
                </p>
                <p className="text-zinc-400 text-xs">
                  Anda kini dapat mengunduh langsung berkas installer <strong className="text-white">camprent_V1.1.apk</strong> atau tetap menggunakan berkas versi sebelumnya <strong className="text-zinc-300">camprent_V1.0.0.apk</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* 3 Detail Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Wrench className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs font-bold text-white">Database Lebih Kuat</h4>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Peningkatan kestabilan transaksi offline SQLite saat sinyal minim.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs font-bold text-white">Versi v1.1 Terbaru</h4>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Respon kalkulasi denda sewa dan cetak struk thermal lebih cepat.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs font-bold text-white">2 Pilihan Versi</h4>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Disediakan berkas v1.1 (rekomendasi) dan v1.0.0 (arsip).
              </p>
            </div>
          </div>

          {/* Actions & Links */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-800">
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <a
                href="/apk/camprent_V1.1.apk"
                download="camprent_V1.1.apk"
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 active:scale-[0.98]"
              >
                <span>Unduh CampRent v1.1</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Tutup &amp; Jelajahi</span>
              </button>
            </div>

            <a
              href="https://faliq-portfolio.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 py-1"
            >
              <span>Kontak Pengembang</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
