import React from 'react';
import { Sliders, Sparkles, ShieldCheck, Zap, Loader2 } from 'lucide-react';
import { formatBytes } from './lib/image-utils';

export const SIDE_OPTIONS = [
  { value: 800, label: '800 px', desc: 'Katalog Ringan' },
  { value: 1080, label: '1080 px', desc: 'Standar POS', isDefault: true },
  { value: 1440, label: '1440 px', desc: 'Resolusi Tinggi' },
  { value: 'original', label: 'Asli', desc: 'Sisi Maksimal' },
];

export default function SettingsPanel({
  targetSide,
  onTargetSideChange,
  originalFile,
  sourceDimensions,
  isCompressing,
  compressionProgress,
  onCompress,
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-700" />
          <h4 className="text-sm font-bold text-zinc-900">Pengaturan Hasil WebP</h4>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          Maks. 2 MB
        </span>
      </div>

      {/* Target Side Resolution Selector */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-zinc-800">
            Ukuran Sisi Persegi (1:1)
          </label>
          {sourceDimensions && (
            <span className="text-[11px] text-zinc-500">
              Asli: {sourceDimensions.width} × {sourceDimensions.height} px
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SIDE_OPTIONS.map((opt) => {
            const isSelected = targetSide === opt.value;
            return (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => onTargetSideChange(opt.value)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-bold shadow-2xs'
                    : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700'
                }`}
              >
                {opt.isDefault && (
                  <span className="absolute -top-2 right-2 text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-emerald-700 text-white rounded">
                    Saran
                  </span>
                )}
                <span className="text-xs font-bold">{opt.label}</span>
                <span className="text-[10px] text-zinc-500 font-normal">{opt.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-1">
          <div className="text-[11px] text-zinc-500">Ukuran Asli</div>
          <div className="text-xs font-bold text-zinc-900 truncate">
            {originalFile ? formatBytes(originalFile.size) : '-'}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
          <div className="text-[11px] text-emerald-800 font-medium">Batas Maksimal</div>
          <div className="text-xs font-bold text-emerald-950">
            ≤ 2.0 MB (WebP 1:1)
          </div>
        </div>
      </div>

      {/* Trust & Spec Notice */}
      <div className="flex items-start gap-2.5 text-[11px] text-zinc-500 bg-zinc-50 p-3 rounded-xl border border-zinc-200/60 leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <span>
          Otomatis mencari kualitas tertinggi di bawah 2 MB dan menghapus metadata GPS / EXIF agar aman &amp; seragam di katalog POS.
        </span>
      </div>

      {/* Big Action Button */}
      <button
        type="button"
        disabled={isCompressing}
        onClick={onCompress}
        className="w-full py-3.5 px-5 bg-emerald-700 hover:bg-emerald-600 active:scale-[0.99] disabled:opacity-75 disabled:pointer-events-none text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 group cursor-pointer"
      >
        {isCompressing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>
              {compressionProgress
                ? `Mengoptimalkan (${compressionProgress.iteration}/7)...`
                : 'Memproses kompresi WebP...'}
            </span>
          </>
        ) : (
          <>
            <Zap className="w-4 h-4 fill-white stroke-[2] group-hover:scale-110 transition-transform" />
            <span>Kompres Foto Sekarang</span>
          </>
        )}
      </button>
    </div>
  );
}
