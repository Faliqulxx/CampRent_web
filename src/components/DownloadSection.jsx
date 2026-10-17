import React, { useState, useEffect } from 'react';
import { 
  Download, 
  HardDrive, 
  Cpu, 
  Tablet, 
  ShieldCheck, 
  Check, 
  Copy, 
  Sparkles, 
  FileCheck2, 
  CheckCircle2,
  ExternalLink,
  Smartphone,
  Layers,
  History
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import MountainSilhouette from './MountainSilhouette';
import PortfolioAdModal from './PortfolioAdModal';

export default function DownloadSection({ onOpenChangelog }) {
  const PRODUCTION_DOMAIN = 'https://camp-rent-web.vercel.app';
  const [showAdModal, setShowAdModal] = useState(false);

  const VERSIONS = [
    {
      id: 'v1.1',
      versionNumber: 'v1.1',
      releaseTag: 'Terbaru (Rekomendasi)',
      isLatest: true,
      file: '/apk/camprent_V1.1.apk',
      filename: 'camprent_V1.1.apk',
      size: '~28.9 MB',
      releaseDate: 'Pembaruan Terbaru',
      minAndroid: 'Android 6.0 – 15',
      description: 'Versi terbaru dengan peningkatan performa, optimalisasi database offline SQLite, dan stabilitas modul kasir.',
      highlights: [
        'Penyempurnaan kestabilan database lokal SQLite',
        'Optimasi respon pencatatan transaksi sewa & denda',
        'Peningkatan kompatibilitas printer thermal kasir',
        'Perbaikan performa scanner barcode perlengkapan'
      ]
    },
    {
      id: 'v1.0.0',
      versionNumber: 'v1.0.0',
      releaseTag: 'Versi Sebelumnya',
      isLatest: false,
      file: '/apk/camprent_V1.0.0.apk',
      filename: 'camprent_V1.0.0.apk',
      size: '~28.9 MB',
      releaseDate: 'Rilis Perdana',
      minAndroid: 'Android 6.0 – 15',
      description: 'Versi stabil awal sistem POS rental outdoor dengan fitur offline-first dan manajemen jaminan identitas.',
      highlights: [
        'Rilis perdana sistem kasir & rental outdoor',
        'Fitur offline-first bawaan dengan SQLite',
        'Manajemen role terpisah Owner dan Kasir',
        'Dukungan cetak nota thermal 58mm & 80mm'
      ]
    }
  ];

  const [selectedVersion, setSelectedVersion] = useState(VERSIONS[0]);
  const [copied, setCopied] = useState(false);
  const [originUrl, setOriginUrl] = useState(PRODUCTION_DOMAIN);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const base = isLocal ? PRODUCTION_DOMAIN : window.location.origin;
      setOriginUrl(base);
    }
  }, []);

  const fullDownloadUrl = `${originUrl}${selectedVersion.file}`;

  const triggerFileDownload = () => {
    const link = document.createElement('a');
    link.href = selectedVersion.file;
    link.download = selectedVersion.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    setShowAdModal(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullDownloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2] text-emerald-700" />
            <span>Status: Berkas Siap Diunduh (Maintenance Selesai)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Download <span className="text-emerald-700">CampRent POS</span> untuk Android
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600">
            Pilih versi aplikasi yang sesuai untuk smartphone atau tablet kasir rental outdoor Anda.
          </p>
        </div>

        {/* Version Switcher Tabs */}
        <div className="mt-8 max-w-2xl mx-auto flex items-center justify-center p-1.5 rounded-2xl bg-zinc-100 border border-zinc-200 shadow-inner">
          {VERSIONS.map((v) => {
            const isCurrent = selectedVersion.id === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedVersion(v)}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  isCurrent
                    ? 'bg-white text-zinc-950 shadow-sm border border-zinc-200/80 scale-[1.01]'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/50'
                }`}
              >
                <span>CampRent {v.versionNumber}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    v.isLatest
                      ? isCurrent
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-emerald-50 text-emerald-700'
                      : isCurrent
                        ? 'bg-zinc-200 text-zinc-800'
                        : 'bg-zinc-200/60 text-zinc-600'
                  }`}
                >
                  {v.releaseTag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Download Card Container */}
        <div className="mt-6 max-w-4xl mx-auto bg-zinc-950 rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-2xl relative text-white">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Specs & Download Button */}
            <div className="md:col-span-7 space-y-5">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {selectedVersion.isLatest ? 'Rilis Terbaru & Teruji' : 'Versi Arsip Stabil'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white flex flex-wrap items-center gap-2.5">
                  <span>CampRent POS {selectedVersion.versionNumber}</span>
                  <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                    {selectedVersion.filename}
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {selectedVersion.description}
                </p>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1.5 mb-1">
                    <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                    Ukuran Berkas
                  </span>
                  <p className="font-extrabold text-white">{selectedVersion.size}</p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1.5 mb-1">
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                    Kompatibilitas
                  </span>
                  <p className="font-extrabold text-white">{selectedVersion.minAndroid}</p>
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

              {/* Version Changelog / Feature Highlights */}
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                    Fitur &amp; Catatan Versi {selectedVersion.versionNumber}
                  </span>
                </div>
                <ul className="space-y-1 text-xs text-zinc-300">
                  {selectedVersion.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-[11px]">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Active Download Buttons */}
              <div className="space-y-3 pt-1">
                <button
                  onClick={handleDownload}
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm transition-all flex flex-col items-center justify-center gap-1 shadow-lg shadow-emerald-950/50 active:scale-[0.99] group cursor-pointer text-center"
                >
                  <div className="flex items-center gap-2 text-white">
                    <Download className="w-4 h-4 stroke-[2.5] group-hover:translate-y-0.5 transition-transform" />
                    <span className="text-base sm:text-lg">Unduh Berkas {selectedVersion.filename}</span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-100 group-hover:text-white transition-colors">
                    Format .APK • Bebas Iklan &amp; Siap Pasang di Android
                  </span>
                </button>

                {/* Secondary Actions: Copy Link & Alternative */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors py-1 px-2 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Tautan Berhasil Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Link Unduhan Langsung</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Signed Release • 100% Aman</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: QR Code for Direct Mobile Scan */}
            <div className="md:col-span-5 flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-900 border border-zinc-800 relative overflow-hidden">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5" />
                Scan QR untuk Unduh Langsung
              </span>
              <p className="text-xs text-zinc-400 mb-4">
                Arahkan kamera smartphone Android untuk mendownload berkas <strong>{selectedVersion.filename}</strong>
              </p>

              {/* QR Code Container */}
              <div className="p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center relative border-2 border-emerald-500/30">
                <QRCodeSVG
                  value={fullDownloadUrl}
                  size={152}
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

              {/* Active Version Tag */}
              <div className="mt-4 px-3 py-1.5 rounded-xl bg-zinc-800/80 border border-zinc-700/80 text-center space-y-0.5">
                <p className="text-[11px] font-bold text-white flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Target: {selectedVersion.filename}
                </p>
                <p className="text-[10px] text-zinc-400">
                  Ukuran: {selectedVersion.size} • Siap Install
                </p>
              </div>

              {/* Direct Alternative Version Quick Switch */}
              <div className="mt-3 text-[11px] text-zinc-400">
                <span>Atau unduh versi lain: </span>
                {VERSIONS.filter(v => v.id !== selectedVersion.id).map(alt => (
                  <button
                    key={alt.id}
                    onClick={() => setSelectedVersion(alt)}
                    className="text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-2 ml-1"
                  >
                    CampRent {alt.versionNumber}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Portfolio Showcase Ad Video Modal Sebelum APK Terunduh */}
      <PortfolioAdModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        onDownloadTrigger={() => {
          triggerFileDownload();
        }}
      />
    </section>
  );
}

