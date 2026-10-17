import React, { useState, useEffect } from 'react';
import { 
  Download, 
  HardDrive, 
  Cpu, 
  Tablet, 
  ShieldCheck, 
  Check, 
  Copy, 
  AlertTriangle, 
  Wrench, 
  Ban, 
  Lock,
  Sparkles,
  Info
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import MountainSilhouette from './MountainSilhouette';

export default function DownloadSection({ onOpenMaintenance }) {
  const [copied, setCopied] = useState(false);
  const [qrUrl, setQrUrl] = useState('');

  const APK_FILE = '/apk/camprent_V1.0.0.apk';
  const PRODUCTION_DOMAIN = 'https://camp-rent-web.vercel.app';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const origin = isLocal ? PRODUCTION_DOMAIN : window.location.origin;
      setQrUrl(`${origin}${APK_FILE}`);
    }
  }, []);

  const handleDownloadAttempt = () => {
    if (onOpenMaintenance) {
      onOpenMaintenance();
    }
  };

  return (
    <section id="download" className="py-20 md:py-28 bg-white relative overflow-hidden">
      
      {/* Mountain silhouette background */}
      <div className="absolute -bottom-2 left-0 right-0 z-0">
        <MountainSilhouette opacity="0.05" className="w-full text-emerald-950" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5 stroke-[2] text-amber-700" />
            <span>Status: Pemeliharaan &amp; Penambahan Fitur</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Download <span className="text-emerald-700">CampRent POS</span> untuk Android
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600">
            Aplikasi saat ini sedang dalam proses pembaharuan dan perbaikan performa menyeluruh.
          </p>
        </div>

        {/* Maintenance Alert Callout */}
        <div className="mt-8 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-2">
                <span>Unduhan Berkas APK Sementara Ditutup</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-extrabold uppercase">
                  Dalam Perbaikan
                </span>
              </h4>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                Pengembang sedang menambahkan fitur-fitur baru dan optimasi database. Agar tidak terjadi error versi, berkas instalasi APK dinonaktifkan sementara.
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadAttempt}
            className="shrink-0 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Lihat Detail Perbaikan</span>
          </button>
        </div>

        {/* Download Card Container */}
        <div className="mt-6 max-w-4xl mx-auto bg-zinc-950 rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-2xl relative text-white">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Specs & Download Button */}
            <div className="md:col-span-7 space-y-5">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <Wrench className="w-3 h-3" />
                    Sedang Dalam Pengembangan
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white flex items-center gap-2.5">
                  <span>CampRent POS (Next Version)</span>
                  <span className="text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                    Maintenance Mode
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Peningkatan fitur rental, kestabilan SQLite offline-first, dan manajemen reservasi lanjutan.
                </p>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1.5 mb-1">
                    <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                    Ukuran File
                  </span>
                  <p className="font-extrabold text-white">~28.9 MB</p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1.5 mb-1">
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                    Sistem Operasi
                  </span>
                  <p className="font-extrabold text-white">Android 6.0 – 15</p>
                </div>

                <div className="col-span-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1.5 mb-1">
                    <Tablet className="w-3.5 h-3.5 text-emerald-400" />
                    Dukungan Perangkat
                  </span>
                  <p className="font-medium text-zinc-300 text-[11px]">
                    Smartphone Android, Tablet 7"–12", Terminal Sunmi (V2/D2) &amp; iMin (D1/Swan)
                  </p>
                </div>
              </div>

              {/* Disabled Download Button with Maintenance State */}
              <div className="space-y-3 pt-1">
                <button
                  onClick={handleDownloadAttempt}
                  className="w-full py-4 px-6 rounded-2xl bg-zinc-900 hover:bg-zinc-850 border border-amber-500/40 text-amber-300 font-extrabold text-xs sm:text-sm transition-all flex flex-col items-center justify-center gap-1 shadow-lg shadow-amber-950/20 active:scale-[0.99] group cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-white">
                    <Ban className="w-4 h-4 text-amber-400 stroke-[2.5]" />
                    <span className="text-amber-200">Unduhan Dinonaktifkan Sementara</span>
                  </div>
                  <span className="text-[11px] font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    Sedang perbaikan sistem &amp; penambahan fitur baru • Klik untuk info
                  </span>
                </button>

                {/* Status Notice */}
                <div className="flex items-center justify-center gap-3 text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1 text-amber-400 font-medium">
                    <Lock className="w-3.5 h-3.5" />
                    Akses APK Dikunci Sementara
                  </span>
                  <span>•</span>
                  <span>Rilis Pembaruan Segera Hadir</span>
                </div>
              </div>

            </div>

            {/* Right: QR Code with Maintenance Overlay */}
            <div className="md:col-span-5 flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-900 border border-zinc-800 relative overflow-hidden">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5" />
                Scan QR Dinonaktifkan
              </span>
              <p className="text-xs text-zinc-400 mb-4">
                Tautan unduhan via barcode ditangguhkan selama masa perbaikan
              </p>

              {/* QR Code Container with subtle locked overlay */}
              <div className="p-3 bg-white/90 rounded-2xl shadow-xl flex items-center justify-center relative border-2 border-amber-500/30">
                <div className="opacity-40 grayscale blur-[1px]">
                  <QRCodeSVG
                    value={qrUrl || `https://camp-rent-web.vercel.app${APK_FILE}`}
                    size={144}
                    bgColor="#ffffff"
                    fgColor="#022c22"
                    level="H"
                    marginSize={1}
                    imageSettings={{
                      src: "/image/camprent_logo.jpg",
                      height: 32,
                      width: 32,
                      excavate: true,
                    }}
                  />
                </div>

                {/* Overlay Badge */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] rounded-xl flex flex-col items-center justify-center p-2 text-center">
                  <Lock className="w-7 h-7 text-amber-400 mb-1" />
                  <span className="text-[11px] font-extrabold text-white leading-tight">
                    Under Maintenance
                  </span>
                  <span className="text-[9px] text-amber-300 font-medium">
                    Unduh Tutup
                  </span>
                </div>
              </div>

              {/* Notice button */}
              <button
                onClick={handleDownloadAttempt}
                className="mt-4 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors font-medium border border-zinc-700"
              >
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span>Pelajari Detail Perbaikan</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

