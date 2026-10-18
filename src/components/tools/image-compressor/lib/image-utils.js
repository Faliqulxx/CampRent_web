/**
 * Utility functions for image reading, orientation, and formatting
 */

export function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function sanitizeFileName(originalName, side = 1080, ext = 'webp') {
  if (!originalName) return `camprent-foto-${side}.${ext}`;
  const dotIndex = originalName.lastIndexOf('.');
  const baseName = dotIndex !== -1 ? originalName.slice(0, dotIndex) : originalName;
  const cleanBase = baseName
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `${cleanBase || 'camprent-foto'}-${side}.${ext}`;
}

/**
 * Checks if browser supports canvas.toBlob with image/webp
 */
let cachedWebPSupport = null;
export async function checkWebPSupport() {
  if (cachedWebPSupport !== null) return cachedWebPSupport;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/webp', 0.8);
    });
    cachedWebPSupport = !!(blob && blob.type === 'image/webp');
  } catch {
    cachedWebPSupport = false;
  }
  return cachedWebPSupport;
}

/**
 * Load image file into an ImageBitmap or HTMLImageElement with EXIF orientation correction
 */
export async function loadSourceImage(file) {
  // First try createImageBitmap with imageOrientation 'from-image' (modern standard)
  if (typeof window.createImageBitmap === 'function') {
    try {
      const bitmap = await window.createImageBitmap(file, {
        imageOrientation: 'from-image',
      });
      return {
        drawable: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        isBitmap: true,
        close: () => {
          if (typeof bitmap.close === 'function') bitmap.close();
        },
      };
    } catch {
      // Fallback to HTMLImageElement if createImageBitmap fails on specific format
    }
  }

  // Fallback to HTMLImageElement via object URL
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({
        drawable: img,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        isBitmap: false,
        close: () => URL.revokeObjectURL(objectUrl),
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Foto tidak dapat dibuka atau file rusak.'));
    };
    img.src = objectUrl;
  });
}
