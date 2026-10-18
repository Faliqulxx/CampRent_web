import React, { useState } from 'react';
import { Download, CheckCircle, ArrowRight, RefreshCw, FileText, Sparkles, Image as ImageIcon } from 'lucide-react';
import { formatBytes, sanitizeFileName } from './lib/image-utils';
import { downloadBlob } from './lib/download';

export default function ResultCard({
  result,
  originalFile,
  onReset,
}) {
  const [customName, setCustomName] = useState(() =>
    sanitizeFileName(originalFile?.name, result?.side, result?.ext)
  );

  if (!result || !result.blob) return null;

  const originalBytes = originalFile?.size || 0;
  const compressedBytes = result.bytes;
  const savingsPercent =
    originalBytes > 0
      ? Math.max(0, Math.round(((originalBytes - compressedBytes) / originalBytes) * 100))
      : 0;

  const previewUrl = URL.createObjectURL(result.blob);

  const handleDownload = () => {
    const finalFilename = customName.trim() || `camprent-${result.side}.${result.ext}`;
    downloadBlob(result.blob, finalFilename);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6 animate-fadeIn">
      {/* Header status */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2 text-emerald-700">
          <CheckCircle className="w-5 h-5 fill-emerald-100 stroke-emerald-700" />
          <h4 className="text-sm sm:text-base font-bold text-zinc-900">
            Foto Berhasil Dikompres!
          </h4>
        </div>
        <span className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-lg">
          Hemat {savingsPercent}%
        </span>
      </div>

      {/* Main Preview + Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        {/* Preview image */}
        <div className="sm:col-span-5 flex justify-center">
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 aspect-square rounded-2xl overflow-hidden border border-zinc-200 shadow-md bg-zinc-100 group">
            <img
              src={previewUrl}
              alt="Compressed WebP Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-[11px] font-semibold text-white px-2 py-1 rounded bg-black/60 backdrop-blur-xs">
                Pratinjau WebP 1:1
              </span>
            </div>
            <span className="absolute bottom-2 left-2 px-1.5 py-0.5 text-[10px] font-bold bg-black/70 text-white rounded">
              {result.side} × {result.side} px
            </span>
          </div>
        </div>

        {/* Stats Column */}
        <div className="sm:col-span-7 space-y-4">
          {/* Comparison Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80">
              <span className="text-[11px] text-zinc-500 block">Ukuran Awal</span>
              <span className="text-sm font-bold text-zinc-700 line-through">
                {formatBytes(originalBytes)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] text-emerald-800 font-semibold block">
                Ukuran Baru
              </span>
              <span className="text-base font-extrabold text-emerald-950">
                {formatBytes(compressedBytes)}
              </span>
            </div>
          </div>

          {/* Details badges */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 font-semibold text-zinc-700">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
              Format: {result.ext.toUpperCase()}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 font-semibold text-zinc-700">
              Rasio: 1:1 Persegi
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 font-semibold text-zinc-700">
              Kualitas: {result.quality}%
            </span>
          </div>

          {/* Filename editor */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-zinc-400" />
              <span>Nama File Unduhan:</span>
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full text-xs font-mono py-2 px-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
              placeholder="nama-file.webp"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={handleDownload}
          className="w-full sm:flex-1 py-3 px-5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>Unduh Foto ({formatBytes(compressedBytes)})</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto py-3 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-zinc-500" />
          <span>Foto Lain / Mulai Lagi</span>
        </button>
      </div>

      {/* POS Ready Callout */}
      <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-[11px] text-zinc-600 flex items-center justify-between">
        <span>Foto ini sudah siap dimasukkan ke katalog barang <strong>CampRent POS</strong>.</span>
        <a
          href="/#download"
          className="text-emerald-700 hover:underline font-bold flex items-center gap-1 shrink-0 ml-2"
        >
          <span>Unduh APK</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
