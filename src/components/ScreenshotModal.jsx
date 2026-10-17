import React, { useEffect } from 'react';
import { X, ZoomIn, ExternalLink } from 'lucide-react';

export default function ScreenshotModal({ isOpen, onClose, imageSrc, title, subtitle }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-white border border-zinc-300 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-white">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-zinc-950 flex items-center gap-2">
              <ZoomIn className="w-4 h-4 text-zinc-700" />
              {title}
            </h3>
            {subtitle && <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 transition-colors"
            title="Tutup (Esc)"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Image preview body */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-zinc-950">
          <img
            src={imageSrc}
            alt={title}
            className="max-h-[75vh] w-auto rounded-2xl shadow-xl object-contain border border-zinc-800"
          />
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between text-xs text-zinc-600">
          <span className="font-medium">Tangkapan Layar Tablet Android CampRent POS</span>
          <a
            href={imageSrc}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-900 hover:underline flex items-center gap-1 font-bold"
          >
            Buka Penuh <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
