import { checkWebPSupport } from './image-utils';

export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB limit for CampRent POS

/**
 * Draws image onto a square canvas taking crop parameters & rotation into account.
 * crop: { x, y, width, height } in original source coordinates
 * rotation: 0, 90, 180, 270
 * fitMode: 'cover' (default) or 'contain' (fit whole image with neutral background)
 */
export function renderToSquareCanvas(source, crop, targetSide, rotation = 0, fitMode = 'cover') {
  const canvas = document.createElement('canvas');
  canvas.width = targetSide;
  canvas.height = targetSide;
  const ctx = canvas.getContext('2d', { alpha: true });

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Clear canvas (default to white background for clean outdoor product look)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, targetSide, targetSide);

  ctx.save();

  // Move origin to center of square canvas for rotation
  ctx.translate(targetSide / 2, targetSide / 2);
  if (rotation !== 0) {
    ctx.rotate((rotation * Math.PI) / 180);
  }

  if (fitMode === 'contain') {
    // Fit whole image inside targetSide x targetSide
    const { width: sw, height: sh } = source;
    // Calculate aspect ratio after rotation
    const isSideways = rotation % 180 !== 0;
    const effectiveW = isSideways ? sh : sw;
    const effectiveH = isSideways ? sw : sh;
    const scale = Math.min(targetSide / effectiveW, targetSide / effectiveH);

    const drawW = sw * scale;
    const drawH = sh * scale;
    ctx.drawImage(source.drawable, -drawW / 2, -drawH / 2, drawW, drawH);
  } else {
    // Normal crop mode: draw selected crop region scaled to square
    // Center of crop region is placed at canvas center
    const destSize = targetSide;
    ctx.drawImage(
      source.drawable,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      -destSize / 2,
      -destSize / 2,
      destSize,
      destSize
    );
  }

  ctx.restore();
  return canvas;
}

/**
 * Compress canvas to WebP (or JPEG fallback) strictly under maxBytes (default 2 MB)
 * Uses binary search on quality. If still > 2 MB at min quality, automatically scales down canvas side.
 */
export async function compressCanvasUnderLimit(
  source,
  crop,
  initialSide = 1080,
  rotation = 0,
  fitMode = 'cover',
  maxBytes = MAX_FILE_SIZE,
  onProgress = null
) {
  const supportsWebP = await checkWebPSupport();
  const mimeType = supportsWebP ? 'image/webp' : 'image/jpeg';
  const fileExt = supportsWebP ? 'webp' : 'jpg';

  let currentSide = initialSide;
  let bestBlob = null;
  let bestQuality = 0.85;
  let attempts = 0;
  const MAX_RESIZE_ATTEMPTS = 5;

  while (attempts < MAX_RESIZE_ATTEMPTS) {
    attempts++;
    const canvas = renderToSquareCanvas(source, crop, currentSide, rotation, fitMode);

    const toBlob = (q) =>
      new Promise((resolve) => {
        canvas.toBlob(resolve, mimeType, q);
      });

    // Binary search quality between 0.50 and 0.95 (up to 7 iterations)
    let lo = 0.5;
    let hi = 0.95;
    let localBestBlob = null;
    let localBestQ = lo;

    for (let i = 0; i < 7; i++) {
      const q = (lo + hi) / 2;
      if (onProgress) {
        onProgress({
          step: 'compressing',
          iteration: i + 1,
          quality: q,
          side: currentSide,
        });
      }

      // eslint-disable-next-line no-await-in-loop
      const blob = await toBlob(q);
      if (blob && blob.size <= maxBytes) {
        localBestBlob = blob;
        localBestQ = q;
        lo = q; // try higher quality
      } else {
        hi = q; // reduce quality
      }
    }

    if (localBestBlob) {
      bestBlob = localBestBlob;
      bestQuality = localBestQ;
      break;
    }

    // Even at min quality (0.5), it exceeded maxBytes: try checking lowest quality (0.35) first
    // eslint-disable-next-line no-await-in-loop
    const lowQBlob = await toBlob(0.35);
    if (lowQBlob && lowQBlob.size <= maxBytes) {
      bestBlob = lowQBlob;
      bestQuality = 0.35;
      break;
    }

    // Still too large: downscale dimension by 85% and loop again
    currentSide = Math.round(currentSide * 0.85);
    if (currentSide < 400) {
      // Smallest acceptable dimension
      bestBlob = lowQBlob || (await toBlob(0.2));
      break;
    }
  }

  if (!bestBlob) {
    throw new Error('Gagal mengompres gambar di bawah batas 2 MB. Coba ukuran sisi yang lebih kecil.');
  }

  return {
    blob: bestBlob,
    side: currentSide,
    quality: Math.round(bestQuality * 100),
    mimeType: bestBlob.type || mimeType,
    ext: fileExt,
    bytes: bestBlob.size,
  };
}
