import React, { useRef, useState, useEffect, useCallback } from 'react';
import { RotateCw, RotateCcw, ZoomIn, ZoomOut, Maximize2, Grid, RefreshCw } from 'lucide-react';

export default function CropEditor({
  sourceImage,
  rotation,
  onRotationChange,
  fitMode,
  onFitModeChange,
  onCropChange,
}) {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const lastTouchDistanceRef = useRef(null);

  // Reset pan and zoom when a new image is loaded or fitMode changes
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [sourceImage, fitMode]);

  // Compute crop region in source image coordinates whenever zoom, pan, or rotation changes
  const updateCropRegion = useCallback(() => {
    if (!sourceImage) return;
    const { width: sw, height: sh } = sourceImage;
    const isSideways = rotation % 180 !== 0;
    const effW = isSideways ? sh : sw;
    const effH = isSideways ? sw : sh;

    // Minimum side covers the 1:1 box
    const baseCropSize = Math.min(effW, effH);
    const actualCropSize = baseCropSize / zoom;

    // Pan bounds
    const maxPanX = (effW - actualCropSize) / 2;
    const maxPanY = (effH - actualCropSize) / 2;

    const clampedPanX = Math.max(-maxPanX, Math.min(maxPanX, pan.x));
    const clampedPanY = Math.max(-maxPanY, Math.min(maxPanY, pan.y));

    // Center coordinates
    const centerX = effW / 2 - clampedPanX;
    const centerY = effH / 2 - clampedPanY;

    const cropX = Math.max(0, Math.min(effW - actualCropSize, centerX - actualCropSize / 2));
    const cropY = Math.max(0, Math.min(effH - actualCropSize, centerY - actualCropSize / 2));

    onCropChange({
      x: Math.round(cropX),
      y: Math.round(cropY),
      width: Math.round(actualCropSize),
      height: Math.round(actualCropSize),
      size: Math.round(actualCropSize),
      zoom,
      pan: { x: clampedPanX, y: clampedPanY },
    });
  }, [sourceImage, zoom, pan, rotation, onCropChange]);

  useEffect(() => {
    updateCropRegion();
  }, [updateCropRegion]);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (fitMode === 'contain') return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || fitMode === 'contain') return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: dragStartRef.current.panX + dx * (2 / zoom),
      y: dragStartRef.current.panY + dy * (2 / zoom),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile pan & pinch-zoom
  const handleTouchStart = (e) => {
    if (fitMode === 'contain') return;
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        panX: pan.x,
        panY: pan.y,
      };
      lastTouchDistanceRef.current = null;
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      lastTouchDistanceRef.current = dist;
    }
  };

  const handleTouchMove = (e) => {
    if (fitMode === 'contain') return;
    if (e.touches.length === 1 && isDragging) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      setPan({
        x: dragStartRef.current.panX + dx * (2 / zoom),
        y: dragStartRef.current.panY + dy * (2 / zoom),
      });
    } else if (e.touches.length === 2 && lastTouchDistanceRef.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / lastTouchDistanceRef.current;
      setZoom((prev) => Math.min(3, Math.max(1, prev * factor)));
      lastTouchDistanceRef.current = dist;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    lastTouchDistanceRef.current = null;
  };

  const handleWheel = (e) => {
    if (fitMode === 'contain') return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom((prev) => Math.min(3, Math.max(1, prev + delta)));
  };

  const rotateBy = (deg) => {
    onRotationChange((prev) => (prev + deg + 360) % 360);
  };

  const resetCrop = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    onRotationChange(0);
  };

  if (!sourceImage) return null;

  return (
    <div className="flex flex-col space-y-3">
      {/* 1:1 Crop Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        className="relative w-full aspect-square max-w-[480px] mx-auto bg-zinc-950 rounded-2xl overflow-hidden shadow-md select-none touch-none cursor-grab active:cursor-grabbing border border-zinc-200"
      >
        {/* Rendered source image with transform */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-75"
          style={{
            transform: `translate(${pan.x * 0.5}px, ${pan.y * 0.5}px) scale(${zoom}) rotate(${rotation}deg)`,
            transformOrigin: 'center center',
          }}
        >
          <img
            src={sourceImage.drawable.src || (sourceImage.isBitmap ? URL.createObjectURL(new Blob()) : '')}
            ref={(imgRef) => {
              // If it's an ImageBitmap without a direct src, we can render via a canvas in the DOM
              if (imgRef && sourceImage.isBitmap) {
                // If bitmap, we draw to a temporary hidden canvas or render directly
                const canvas = document.createElement('canvas');
                canvas.width = sourceImage.width;
                canvas.height = sourceImage.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(sourceImage.drawable, 0, 0);
                imgRef.src = canvas.toDataURL();
              }
            }}
            alt="Source item"
            className={`max-w-none pointer-events-none ${
              fitMode === 'contain'
                ? 'max-h-full max-w-full object-contain'
                : 'min-w-full min-h-full object-cover'
            }`}
            draggable={false}
          />
        </div>

        {/* 1:1 Circular or Square Focus Outline */}
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/30 rounded-2xl">
          {/* Rule of Thirds Grid */}
          {showGrid && (
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
              <div className="border-r border-b border-white/60" />
              <div className="border-r border-b border-white/60" />
              <div className="border-b border-white/60" />
              <div className="border-r border-b border-white/60" />
              <div className="border-r border-b border-white/60" />
              <div className="border-b border-white/60" />
              <div className="border-r border-white/60" />
              <div className="border-r border-white/60" />
              <div />
            </div>
          )}
        </div>

        {/* Floating Top Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 text-[11px] font-bold bg-black/60 text-white backdrop-blur-md rounded-md border border-white/10 shadow-sm">
            Rasio 1:1 Persegi
          </span>
          {rotation !== 0 && (
            <span className="px-2 py-1 text-[10px] font-semibold bg-emerald-700/80 text-white backdrop-blur-md rounded-md border border-emerald-500/30">
              Putar {rotation}°
            </span>
          )}
        </div>

        {/* Floating Grid Toggle */}
        <button
          type="button"
          onClick={() => setShowGrid(!showGrid)}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md border transition-all ${
            showGrid
              ? 'bg-emerald-600 text-white border-emerald-400'
              : 'bg-black/50 text-white/70 border-white/10 hover:text-white'
          }`}
          title="Tampilkan garis bantu 3x3"
          aria-label="Toggle Grid"
        >
          <Grid className="w-4 h-4" />
        </button>

        {/* Helper text overlay when dragging */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white/80 text-[10px] rounded-full backdrop-blur-md pointer-events-none font-medium whitespace-nowrap">
          {fitMode === 'contain'
            ? 'Mode Muat Seluruh Foto'
            : 'Geser foto untuk memposisikan • Pinch / Scroll untuk zoom'}
        </div>
      </div>

      {/* Editor Controls Bar */}
      <div className="max-w-[480px] mx-auto w-full space-y-3">
        {/* Zoom Slider */}
        {fitMode !== 'contain' && (
          <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 px-3.5 py-2 rounded-xl">
            <button
              type="button"
              onClick={() => setZoom((prev) => Math.max(1, prev - 0.2))}
              className="p-1 text-zinc-500 hover:text-zinc-900 rounded-md transition-colors"
              title="Perkecil"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 accent-emerald-700 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
            />
            <button
              type="button"
              onClick={() => setZoom((prev) => Math.min(3, prev + 0.2))}
              className="p-1 text-zinc-500 hover:text-zinc-900 rounded-md transition-colors"
              title="Perbesar"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-zinc-600 min-w-[36px] text-right">
              {Math.round(zoom * 100)}%
            </span>
          </div>
        )}

        {/* Action Buttons: Rotate, Fit Mode, Reset */}
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => rotateBy(-90)}
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-semibold transition-colors"
            title="Putar kiri 90°"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
            <span>-90°</span>
          </button>

          <button
            type="button"
            onClick={() => rotateBy(90)}
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-semibold transition-colors"
            title="Putar kanan 90°"
          >
            <RotateCw className="w-3.5 h-3.5 text-zinc-500" />
            <span>+90°</span>
          </button>

          <button
            type="button"
            onClick={() => onFitModeChange(fitMode === 'cover' ? 'contain' : 'cover')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border text-xs font-semibold transition-colors ${
              fitMode === 'contain'
                ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700'
            }`}
            title="Muat seluruh gambar tanpa terpotong"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{fitMode === 'contain' ? 'Penuh' : 'Muat'}</span>
          </button>

          <button
            type="button"
            onClick={resetCrop}
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-semibold transition-colors"
            title="Kembalikan posisi awal"
          >
            <RefreshCw className="w-3.5 h-3.5 text-zinc-500" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
