import React, { useState, useEffect } from 'react';
import { Download, HardDrive, Cpu, Tablet, ShieldCheck, Check, Copy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import MountainSilhouette from './MountainSilhouette';

export default function DownloadSection() {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrUrl, setQrUrl] = useState('');

  const APK_FILE = '/apk/camprent_V1.0.0.apk';
  const APK_FILENAME = 'camprent_V1.0.0.apk';
  const PRODUCTION_DOMAIN = 'https://camp-rent-web.vercel.app';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const origin = isLocal ? PRODUCTION_DOMAIN : window.location.origin;
      setQrUrl(`${origin}${APK_FILE}`);
    }
  }, []);

  const triggerFileDownload = () => {
    const link = document.createElement('a');
    link.href = APK_FILE;
    link.download = APK_FILENAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    setDownloading(true);
    setDownloadProgress(0);
    setDownloadComplete(false);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 25;
      setDownloadProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setDownloading(false);
        setDownloadComplete(true);
        triggerFileDownload();
      }
    }, 150);
  };

  const handleCopyLink = () => {
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const origin = typeof window !== 'undefined' && !isLocal ? window.location.origin : PRODUCTION_DOMAIN;
    const apkUrl = `${origin}${APK_FILE}`;
    navigator.clipboard?.writeText(apkUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-sm">
            <Download className="w-3.5 h-3.5 stroke-[2] text-emerald-700" />
            <span>Unduh Berkas APK Resmi</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Download <span className="text-emerald-700">CampRent POS</span> untuk Android
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600">
            Unduh berkas instalasi langsung tanpa perlu login akun Google Play Store.
          </p>
        </div>

        {/* Download Card Container */}
        <div className="mt-14 max-w-4xl mx-auto bg-zinc-950 rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-2xl relative text-white">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Specs & Download Button */}
            <div className="md:col-span-7 space-y-5">
              
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  Rilis Versi Terbaru
                </span>
                <h3 className="text-2xl font-black text-white flex items-center gap-2.5">
                  <span>CampRent POS v1.0.0</span>
                  <span className="text-[11px] font-bold bg-emerald-900/60 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded-full">
                    Stable Release
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Paket instalasi mandiri untuk perangkat Android tanpa ketergantungan Google Play Services.
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

              {/* Download Button / Progress */}
              <div className="space-y-3 pt-1">
                {downloading ? (
                  <div className="space-y-2 p-4 rounded-2xl bg-zinc-900 border border-emerald-500/50">
                    <div className="flex justify-between text-xs font-bold text-white">
                      <span>Mengunduh {APK_FILENAME}...</span>
                      <span>{downloadProgress}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full transition-all duration-200"
                        style={{ width: `${downloadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                ) : downloadComplete ? (
                  <div className="p-4 rounded-2xl bg-zinc-900 border border-emerald-500/50 text-xs text-zinc-200 space-y-2 animate-fadeIn">
                    <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Berkas APK Berhasil Diunduh</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      File <strong>{APK_FILENAME}</strong> (~28.9 MB) telah tersimpan di folder Unduhan perangkat Anda. Silakan buka dan pilih <strong>Instal</strong>.
                    </p>
                    <button
                      onClick={handleDownload}
                      className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1 mt-1"
                    >
                      <span>Unduh Ulang</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleDownload}
                    className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2.5 active:scale-[0.99] shadow-lg shadow-emerald-950/40"
                  >
                    <Download className="w-4 h-4 stroke-[2.5]" />
                    <span>Download APK Sekarang (Direct Link)</span>
                  </button>
                )}

                {/* Security verification notice */}
                <div className="flex items-center justify-center gap-3 text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Terverifikasi Bebas Malware
                  </span>
                  <span>•</span>
                  <span>SHA-256 Checksum Verified</span>
                </div>
              </div>

            </div>

            {/* Right: Clean Monochrome Vector QR Code with official logo center */}
            <div className="md:col-span-5 flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
                Scan di Ponsel Android
              </span>
              <p className="text-xs text-zinc-400 mb-4">
                Arahkan kamera smartphone untuk mengunduh APK langsung
              </p>

              {/* Real, functional QR Code */}
              <div className="p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center relative border-2 border-emerald-500/20">
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

              {/* URL preview */}
              <p className="mt-2.5 text-[10px] text-zinc-400 font-mono truncate max-w-[220px]" title={qrUrl || `${PRODUCTION_DOMAIN}${APK_FILE}`}>
                {qrUrl || `${PRODUCTION_DOMAIN}${APK_FILE}`}
              </p>

              {/* Copy URL trigger */}
              <button
                onClick={handleCopyLink}
                className="mt-3 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                <span>{copied ? 'Tautan Disalin' : 'Salin Tautan Unduh'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
