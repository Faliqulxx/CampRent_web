import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  ExternalLink, 
  Download, 
  CheckCircle2, 
  Clock, 
  Code2, 
  Layers, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PortfolioAdModal({ isOpen, onClose, onDownloadTrigger }) {
  const [timeLeft, setTimeLeft] = useState(20);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const timerRef = useRef(null);

  const PORTFOLIO_URL = 'https://faliq-portfolio.vercel.app/';

  // Reset and start countdown when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(20);
      setDownloadStarted(false);

      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleFinishCountdown();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen]);

  const handleFinishCountdown = () => {
    setDownloadStarted(true);
    if (onDownloadTrigger) {
      onDownloadTrigger();
    }
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }
  };

  const handleManualDownload = () => {
    if (onDownloadTrigger) {
      onDownloadTrigger();
    }
  };

  if (!isOpen) return null;

  const progressPercent = ((20 - timeLeft) / 20) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden">
        
        {/* Subtle glowing backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />

        {/* Header Bar */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-zinc-800/80">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-700/60 text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Developer Showcase • Portofolio Pengembang</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Tutup Popup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 20s Countdown Section */}
        <div className="relative z-10 py-5">
          {!downloadStarted ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Unduhan otomatis dimulai dalam:</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/70 border border-emerald-600/70 font-mono font-black text-emerald-300 text-sm">
                  {timeLeft} detik
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="bg-emerald-500 h-full transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-600/60 flex items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Unduhan Berhasil Dimulai!</strong> File APK sedang diunduh ke perangkat Anda.
                </span>
              </div>
              <button
                onClick={handleManualDownload}
                className="shrink-0 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow"
              >
                Unduh Ulang
              </button>
            </div>
          )}
        </div>

        {/* Main Ad Card Content */}
        <div className="relative z-10 p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 space-y-4">
          
          {/* Developer Profile Header */}
          <div className="flex items-start gap-4">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-zinc-950 font-black text-lg flex items-center justify-center shrink-0 shadow-lg shadow-emerald-950/50">
              FI
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  Faliqul Ishbah
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-emerald-400 border border-zinc-700">
                  Fullstack &amp; Mobile
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Pengembang perangkat lunak, aplikasi kasir (POS), dan platform digital modern.
              </p>
            </div>
          </div>

          {/* Ad Pitch */}
          <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-xs text-zinc-300 space-y-2">
            <p className="font-semibold text-white text-xs flex items-center gap-1.5">
              <span>🚀 Butuh Pembuatan Website / Aplikasi Serupa?</span>
            </p>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Kunjungi website portfolio saya untuk melihat showcase proyek, portofolio sistem kasir, aplikasi mobile Android, dan kolaborasi pembuatan software kustom untuk bisnis Anda.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Modern Web &amp; Mobile App</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Offline-First POS &amp; SaaS</span>
              </div>
            </div>
          </div>

          {/* Action CTA: Visit Portfolio */}
          <div className="pt-1">
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 active:scale-[0.99] group"
            >
              <span>Kunjungi Portfolio: faliq-portfolio.vercel.app</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>

        {/* Footer info */}
        <div className="relative z-10 pt-4 flex items-center justify-between text-[11px] text-zinc-500">
          <span>Tautan APK resmi CampRent POS</span>
          {downloadStarted && (
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors underline"
            >
              Tutup Jendela
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
