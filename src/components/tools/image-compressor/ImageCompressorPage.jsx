import React, { useState, useEffect, useCallback } from 'react';
import {
  ShieldCheck,
  Check,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Download,
  ArrowRight,
  Sparkles,
  Camera,
  AlertTriangle,
  Zap,
  Layers,
  ArrowLeft,
  Smartphone,
} from 'lucide-react';
import Dropzone from './Dropzone';
import CropEditor from './CropEditor';
import SettingsPanel from './SettingsPanel';
import ResultCard from './ResultCard';
import BatchQueue from './BatchQueue';
import { loadSourceImage, sanitizeFileName } from './lib/image-utils';
import { compressCanvasUnderLimit, MAX_FILE_SIZE } from './lib/compress';
import { downloadZip } from './lib/download';

export default function ImageCompressorPage({ onNavigateHome, onDownloadClick }) {
  // Update Document title for SEO
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Image Compressor Foto Produk 1:1 (WebP ≤ 2 MB) — CampRent Tools';
    window.scrollTo(0, 0);
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // Files & Batch state
  const [batchItems, setBatchItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Active image editing state
  const [activeSource, setActiveSource] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [fitMode, setFitMode] = useState('cover'); // 'cover' or 'contain'
  const [cropRegion, setCropRegion] = useState(null);
  const [targetSide, setTargetSide] = useState(1080);

  // Compression state
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(null);
  const [isCompressingAll, setIsCompressingAll] = useState(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // FAQ open states
  const [openFaq, setOpenFaq] = useState(null);

  // Clean up source image object on unmount
  useEffect(() => {
    return () => {
      if (activeSource?.close) activeSource.close();
    };
  }, [activeSource]);

  // Handle files selected from Dropzone
  const handleFilesSelected = async (files) => {
    setErrorMessage(null);
    const newItems = files.map((file) => ({
      file,
      status: 'idle', // 'idle' | 'processing' | 'done' | 'error'
      result: null,
      source: null,
      rotation: 0,
      fitMode: 'cover',
    }));

    setBatchItems(newItems);
    setActiveIndex(0);
    await loadItemAtIndex(0, newItems[0].file);
  };

  // Load a single item into the editor
  const loadItemAtIndex = async (index, file) => {
    try {
      if (activeSource?.close) activeSource.close();
      const loaded = await loadSourceImage(file);
      setActiveSource(loaded);
      setActiveIndex(index);
      setRotation(0);
      setFitMode('cover');
      setCompressionProgress(null);
    } catch (err) {
      setErrorMessage(err.message || 'Gagal memuat gambar');
    }
  };

  const handleSelectIndex = async (index) => {
    if (index === activeIndex || !batchItems[index]) return;
    await loadItemAtIndex(index, batchItems[index].file);
  };

  // Run compression on the currently active image
  const handleCompressActive = async () => {
    if (!activeSource || !cropRegion) return;
    setIsCompressing(true);
    setErrorMessage(null);

    try {
      const activeItem = batchItems[activeIndex];
      const initialSide =
        targetSide === 'original'
          ? Math.min(activeSource.width, activeSource.height)
          : Number(targetSide);

      const result = await compressCanvasUnderLimit(
        activeSource,
        cropRegion,
        initialSide,
        rotation,
        fitMode,
        MAX_FILE_SIZE,
        (progress) => setCompressionProgress(progress)
      );

      // Update in batch items
      setBatchItems((prev) =>
        prev.map((item, idx) =>
          idx === activeIndex
            ? { ...item, status: 'done', result, targetSide: initialSide }
            : item
        )
      );
    } catch (err) {
      setErrorMessage(err.message || 'Gagal mengompres foto.');
    } finally {
      setIsCompressing(false);
      setCompressionProgress(null);
    }
  };

  // Run batch compression for all pending items
  const handleCompressAll = async () => {
    if (batchItems.length === 0) return;
    setIsCompressingAll(true);
    setErrorMessage(null);

    const updated = [...batchItems];

    for (let i = 0; i < updated.length; i++) {
      const item = updated[i];
      if (item.status === 'done' && item.result) continue;

      updated[i] = { ...updated[i], status: 'processing' };
      setBatchItems([...updated]);

      try {
        // eslint-disable-next-line no-await-in-loop
        const source = await loadSourceImage(item.file);
        const sideVal =
          targetSide === 'original'
            ? Math.min(source.width, source.height)
            : Number(targetSide);

        // Auto center crop
        const baseCrop = Math.min(source.width, source.height);
        const autoCrop = {
          x: Math.round((source.width - baseCrop) / 2),
          y: Math.round((source.height - baseCrop) / 2),
          width: baseCrop,
          height: baseCrop,
          size: baseCrop,
        };

        // eslint-disable-next-line no-await-in-loop
        const result = await compressCanvasUnderLimit(
          source,
          autoCrop,
          sideVal,
          0,
          'cover',
          MAX_FILE_SIZE
        );

        updated[i] = { ...updated[i], status: 'done', result };
        setBatchItems([...updated]);
        source.close?.();
      } catch (err) {
        updated[i] = { ...updated[i], status: 'error', error: err.message };
        setBatchItems([...updated]);
      }
    }

    setIsCompressingAll(false);
  };

  // Download all finished items as .zip
  const handleDownloadZip = async () => {
    const finishedItems = batchItems
      .filter((item) => item.status === 'done' && item.result)
      .map((item) => ({
        blob: item.result.blob,
        filename: sanitizeFileName(item.file.name, item.result.side, item.result.ext),
      }));

    if (finishedItems.length === 0) return;

    setIsDownloadingZip(true);
    try {
      await downloadZip(finishedItems, 'camprent-foto-produk-webp.zip');
    } catch {
      setErrorMessage('Gagal membuat file zip. Silakan unduh foto satu per satu.');
    } finally {
      setIsDownloadingZip(false);
    }
  };

  const handleResetAll = () => {
    if (activeSource?.close) activeSource.close();
    setActiveSource(null);
    setBatchItems([]);
    setActiveIndex(0);
    setRotation(0);
    setFitMode('cover');
    setCropRegion(null);
    setErrorMessage(null);
  };

  const activeItem = batchItems[activeIndex];
  const hasActiveResult = activeItem?.status === 'done' && activeItem?.result;

  const faqs = [
    {
      q: 'Apakah foto barang rental saya diunggah ke server CampRent?',
      a: 'Sama sekali tidak. Seluruh proses pembacaan foto, crop 1:1, dan kompresi WebP dilakukan langsung di dalam browser perangkat Anda menggunakan HTML5 Canvas API. Foto tidak pernah dikirim ke server mana pun.',
    },
    {
      q: 'Kenapa format harus WebP dan rasio persegi (1:1)?',
      a: 'Rasio persegi 1:1 memastikan tampilan katalog barang di aplikasi kasir CampRent POS seragam dan rapi (tidak ada gambar yang lonjong atau terpotong). Format WebP menghasilkan file jauh lebih ringan dibanding JPG/PNG dengan ketajaman warna yang tetap prima.',
    },
    {
      q: 'Berapa batas ukuran maksimal file hasil kompresi?',
      a: 'Batas maksimal adalah 2 MB per foto, sesuai standar spesifikasi sistem katalog CampRent POS agar aplikasi tetap ringan, responsif, dan hemat memori saat digunakan transaksi offline.',
    },
    {
      q: 'Apakah data lokasi GPS atau metadata kamera saya ikut tersimpan?',
      a: 'Tidak. Saat foto diproses ulang ke dalam kanvas, seluruh metadata EXIF dan koordinat GPS secara otomatis terhapus, sehingga privasi Anda sepenuhnya terlindungi sebelum foto dibagikan ke staf kasir.',
    },
    {
      q: 'Bagaimana jika saya menggunakan iPhone (format HEIC)?',
      a: 'Untuk foto dari iPhone, pastikan kamera diatur ke format "Most Compatible (JPG)" atau ubah format foto ke JPG/PNG sebelum diunggah ke alat ini.',
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Breadcrumb & Back Link */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda CampRent POS</span>
          </button>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            CampRent Tools v1.0
          </span>
        </div>

        {/* Page Hero Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Image Compressor untuk Foto Barang Rental
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Kecilkan foto barang rental (tenda, carrier, kompor) menjadi <strong>WebP persegi 1:1 maksimal 2 MB</strong>. Diproses langsung di browser tanpa diunggah ke server.
          </p>
        </div>

        {/* Trust Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-zinc-600 border-y border-zinc-100 py-3 bg-zinc-50/50 rounded-xl">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Client-Side di Browser</span>
          </div>
          <span className="hidden sm:inline text-zinc-300">•</span>
          <div className="flex items-center gap-1.5 font-medium">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Tanpa Unggah ke Server</span>
          </div>
          <span className="hidden sm:inline text-zinc-300">•</span>
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Gratis &amp; Bebas Iklan</span>
          </div>
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{errorMessage}</div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-amber-800 hover:text-amber-950 text-xs font-bold"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Main Workspace Area */}
        {!activeSource ? (
          /* Step 1: Upload Dropzone */
          <div className="max-w-2xl mx-auto space-y-4">
            <Dropzone
              onFilesSelected={handleFilesSelected}
              onError={(err) => setErrorMessage(err)}
            />
          </div>
        ) : (
          /* Step 2: Editor & Results Area */
          <div className="space-y-6">
            {/* Batch queue if more than 1 image */}
            {batchItems.length > 1 && (
              <BatchQueue
                batchItems={batchItems}
                activeIndex={activeIndex}
                onSelectIndex={handleSelectIndex}
                onCompressAll={handleCompressAll}
                isCompressingAll={isCompressingAll}
                onDownloadZip={handleDownloadZip}
                isDownloadingZip={isDownloadingZip}
              />
            )}

            {/* Two-Column Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: 1:1 Crop Editor */}
              <div className="lg:col-span-6 bg-zinc-50 border border-zinc-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-emerald-700" />
                    Atur Bingkai Persegi (1:1)
                  </span>
                  <span className="text-[11px] text-zinc-500 truncate max-w-[200px]">
                    {activeItem?.file?.name}
                  </span>
                </div>

                <CropEditor
                  sourceImage={activeSource}
                  rotation={rotation}
                  onRotationChange={setRotation}
                  fitMode={fitMode}
                  onFitModeChange={setFitMode}
                  onCropChange={setCropRegion}
                />
              </div>

              {/* Right Column: Settings Panel or Finished Result */}
              <div className="lg:col-span-6 space-y-4">
                {hasActiveResult ? (
                  <ResultCard
                    result={activeItem.result}
                    originalFile={activeItem.file}
                    onReset={handleResetAll}
                  />
                ) : (
                  <SettingsPanel
                    targetSide={targetSide}
                    onTargetSideChange={setTargetSide}
                    originalFile={activeItem?.file}
                    sourceDimensions={
                      activeSource
                        ? { width: activeSource.width, height: activeSource.height }
                        : null
                    }
                    isCompressing={isCompressing}
                    compressionProgress={compressionProgress}
                    onCompress={handleCompressActive}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4 Steps How to Use */}
        <div className="pt-8 border-t border-zinc-100">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
            <h3 className="text-lg font-bold text-zinc-900">
              Cara Pakai Cepat untuk Pemilik Rental
            </h3>
            <p className="text-xs text-zinc-500">
              Siapkan ratusan foto barang rental tanpa aplikasi editing yang rumit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '1',
                title: 'Unggah Foto',
                desc: 'Pilih foto tenda, carrier, atau kompor dari galeri HP atau drag & drop dari laptop.',
              },
              {
                step: '2',
                title: 'Atur Bingkai 1:1',
                desc: 'Geser posisi dan sesuaikan zoom agar barang berada di tengah bingkai persegi.',
              },
              {
                step: '3',
                title: 'Kompres Otomatis',
                desc: 'Sistem Canvas otomatis mengecilkan file ke format WebP ≤ 2 MB dengan kualitas terbaik.',
              },
              {
                step: '4',
                title: 'Unduh & Pasang',
                desc: 'Unduh hasilnya dan masukkan langsung ke katalog barang CampRent POS Anda.',
              },
            ].map((st) => (
              <div
                key={st.step}
                className="p-5 rounded-2xl bg-zinc-50/70 border border-zinc-200/80 space-y-2 relative"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                  {st.step}
                </div>
                <h4 className="text-sm font-bold text-zinc-900">{st.title}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="pt-8 border-t border-zinc-100 max-w-3xl mx-auto space-y-4">
          <div className="text-center space-y-1 mb-6">
            <h3 className="text-lg font-bold text-zinc-900 flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-700" />
              <span>Pertanyaan yang Sering Diajukan</span>
            </h3>
            <p className="text-xs text-zinc-500">
              Seputar privasi, format WebP, dan spesifikasi CampRent POS.
            </p>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="border border-zinc-200 rounded-xl overflow-hidden bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-zinc-50 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-zinc-800">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 bg-zinc-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* POS Promo CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-zinc-900 to-zinc-950 p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block">
              Aplikasi Kasir Rental Outdoor
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Gunakan Foto Produk Ringan di CampRent POS
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Kelola sewa tenda, jaminan identitas, deposit, denda telat otomatis, hingga laporan keuangan kasir dengan dukungan offline-first.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onDownloadClick}
                className="py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Unduh CampRent POS (APK)</span>
              </button>

              <button
                type="button"
                onClick={onNavigateHome}
                className="py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Lihat Seluruh Fitur</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
