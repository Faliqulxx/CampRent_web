import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PortfolioAdModal({ isOpen, onClose, onDownloadTrigger }) {
  const [duration, setDuration] = useState(30);
  const [currentTime, setCurrentTime] = useState(0);
  const [needsUserClick, setNeedsUserClick] = useState(false);

  const videoRef = useRef(null);
  const VIDEO_SRC = '/faliq-ishbah-ad-share.mp4';

  useEffect(() => {
    if (isOpen) {
      setCurrentTime(0);
      setNeedsUserClick(false);

      const playVideo = async () => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = 0;
        // Suara nyala tidak bisa dimatikan
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;

        try {
          await videoRef.current.play();
        } catch (err) {
          console.warn('Autoplay unmuted blocked by browser policy:', err);
          // Jika browser menahan autoplay unmuted, tampilkan overlay klik sekali
          setNeedsUserClick(true);
        }
      };

      // Berikan sedikit delay mikro agar elemen DOM video terpasang
      const timer = setTimeout(playVideo, 50);
      return () => clearTimeout(timer);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  const handleStartManualPlay = async () => {
    if (!videoRef.current) return;
    try {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      await videoRef.current.play();
      setNeedsUserClick(false);
    } catch (e) {
      console.error('Play error:', e);
    }
  };

  const handleVideoEnded = () => {
    // 1. File otomatis terunduh ketika video iklan berakhir
    if (onDownloadTrigger) {
      onDownloadTrigger();
    }

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    // 2. Iklan otomatis tertutup
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 400);
  };

  const handleTimeUpdate = (e) => {
    const curr = e.currentTarget.currentTime;
    setCurrentTime(curr);

    // Safeguard jika onEnded terlewat di milidetik terakhir
    if (duration > 0 && curr >= duration - 0.2) {
      handleVideoEnded();
    }
  };

  if (!isOpen) return null;

  const timeLeft = Math.max(0, Math.ceil(duration - currentTime));
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      
      {/* Video Container (Hanya Video Saja) */}
      <div className="relative w-full max-w-2xl bg-black rounded-3xl overflow-hidden border border-emerald-500/30 shadow-[0_0_60px_rgba(16,185,129,0.15)] select-none">
        
        {/* Subtle top glow */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />

        {/* Top Floating Badge Bar */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-20">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-semibold text-white shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold">Iklan</span>
            <span className="text-zinc-400">•</span>
            <span className="text-zinc-200 hidden sm:inline">File otomatis terunduh setelah video berakhir</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Countdown Badge */}
            <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 font-mono text-xs font-bold text-zinc-200 shadow-lg">
              {timeLeft}s
            </div>
          </div>
        </div>

        {/* Video Element */}
        <div className="relative aspect-video w-full flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            playsInline
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 30)}
            onEnded={handleVideoEnded}
            onVolumeChange={(e) => {
              // Menjaga agar suara tetap nyala dan tidak bisa dimatikan
              if (e.currentTarget.muted) {
                e.currentTarget.muted = false;
              }
              if (e.currentTarget.volume < 0.5) {
                e.currentTarget.volume = 1.0;
              }
            }}
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-full object-contain"
          />

          {/* User Gesture Play Overlay (Jika browser memblokir unmuted autoplay awal) */}
          {needsUserClick && (
            <div 
              onClick={handleStartManualPlay}
              className="absolute inset-0 z-30 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center gap-3 cursor-pointer p-4 text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 fill-zinc-950 translate-x-0.5" />
              </div>
              <div className="space-y-1">
                <p className="font-black text-white text-base sm:text-lg">
                  Klik untuk Memutar Iklan &amp; Mengunduh
                </p>
                <p className="text-xs text-zinc-400">
                  Iklan akan diputar dengan suara penuh dan unduhan otomatis berjalan setelahnya.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Progress Bar (Menunjukkan sisa durasi iklan sebelum otomatis terunduh) */}
        <div className="w-full bg-zinc-900 h-1.5 relative overflow-hidden">
          <div 
            className="bg-emerald-500 h-full transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

      </div>

    </div>
  );
}
