import React from 'react';
import { Layers, CheckCircle2, Clock, Loader2, Download, Archive } from 'lucide-react';
import { formatBytes } from './lib/image-utils';

export default function BatchQueue({
  batchItems,
  activeIndex,
  onSelectIndex,
  onCompressAll,
  isCompressingAll,
  onDownloadZip,
  isDownloadingZip,
}) {
  if (!batchItems || batchItems.length <= 1) return null;

  const completedCount = batchItems.filter((item) => item.status === 'done').length;
  const isAllDone = completedCount === batchItems.length;

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-700" />
          <h4 className="text-sm font-bold text-zinc-900">
            Antrean Batch ({batchItems.length} Foto)
          </h4>
          <span className="text-[11px] font-semibold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-full">
            {completedCount}/{batchItems.length} Selesai
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isAllDone && (
            <button
              type="button"
              disabled={isCompressingAll}
              onClick={onCompressAll}
              className="py-1.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isCompressingAll ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Memproses Semua...</span>
                </>
              ) : (
                <span>Kompres Semua Otomatis</span>
              )}
            </button>
          )}

          {completedCount > 1 && (
            <button
              type="button"
              disabled={isDownloadingZip}
              onClick={onDownloadZip}
              className="py-1.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isDownloadingZip ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Archive className="w-3.5 h-3.5" />
              )}
              <span>Unduh Semua (.zip)</span>
            </button>
          )}
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-48 overflow-y-auto pr-1">
        {batchItems.map((item, idx) => {
          const isActive = idx === activeIndex;
          const isDone = item.status === 'done';
          const isProcessing = item.status === 'processing';

          return (
            <button
              key={`${item.file.name}-${idx}`}
              type="button"
              onClick={() => onSelectIndex(idx)}
              className={`relative flex flex-col p-2 rounded-xl border text-left transition-all ${
                isActive
                  ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                  : 'border-zinc-200 bg-zinc-50/50 hover:bg-zinc-100'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-1">
                <span className="font-bold text-zinc-700">#{idx + 1}</span>
                {isDone && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                )}
                {isProcessing && (
                  <Loader2 className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                )}
                {!isDone && !isProcessing && (
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                )}
              </div>

              <div className="text-[11px] font-semibold text-zinc-900 truncate w-full">
                {item.file.name}
              </div>

              <div className="text-[10px] text-zinc-500 mt-0.5">
                {isDone && item.result
                  ? `${formatBytes(item.result.bytes)}`
                  : formatBytes(item.file.size)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
