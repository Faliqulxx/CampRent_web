import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, AlertCircle, Camera, Sparkles } from 'lucide-react';
import { formatBytes } from './lib/image-utils';

const MAX_INPUT_SIZE = 25 * 1024 * 1024; // 25 MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function Dropzone({ onFilesSelected, onError }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const processFiles = (fileList) => {
    if (!fileList || fileList.length === 0) return;
    const validFiles = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      // Type check
      if (!ACCEPTED_TYPES.includes(file.type)) {
        onError(`Format "${file.name}" tidak didukung. Gunakan JPG, PNG, atau WebP.`);
        return;
      }
      // Size check
      if (file.size > MAX_INPUT_SIZE) {
        onError(`File "${file.name}" (${formatBytes(file.size)}) melebihi batas 25 MB.`);
        return;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 20) {
      onError('Maksimal 20 foto sekaligus dalam mode batch. 20 foto pertama dipilih.');
      onFilesSelected(validFiles.slice(0, 20));
    } else {
      onFilesSelected(validFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    // Reset so same file can be selected again
    e.target.value = '';
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 group ${
        isDragOver
          ? 'border-emerald-600 bg-emerald-50/70 scale-[0.99] shadow-inner'
          : 'border-zinc-300 hover:border-emerald-600 bg-zinc-50/60 hover:bg-emerald-50/30'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
          <UploadCloud className="w-8 h-8 stroke-[2]" />
        </div>

        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors">
            Tarik &amp; lepas foto barang rental di sini
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500">
            atau klik untuk membuka galeri / kamera HP
          </p>
        </div>

        {/* Buttons / Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 shadow-2xs">
            <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
            JPG, PNG, WebP
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 shadow-2xs">
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            Maks. 25 MB/file
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Bisa Banyak File (Batch)
          </span>
        </div>

        <p className="text-[11px] text-zinc-400 pt-2">
          Foto diproses 100% di browser Anda. Tidak ada data yang dikirim ke server.
        </p>
      </div>
    </div>
  );
}
