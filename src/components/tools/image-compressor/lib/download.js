import { zip } from 'fflate';

/**
 * Trigger download of a single blob
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1500);
}

/**
 * Packages multiple blobs into a single .zip file using fflate and triggers download
 * items: Array of { blob: Blob, filename: string }
 */
export async function downloadZip(items, zipFilename = 'camprent-compressed-images.zip') {
  if (!items || items.length === 0) return;

  const zipData = {};

  for (const item of items) {
    // eslint-disable-next-line no-await-in-loop
    const buffer = await item.blob.arrayBuffer();
    zipData[item.filename] = new Uint8Array(buffer);
  }

  return new Promise((resolve, reject) => {
    zip(zipData, { level: 6 }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const zipBlob = new Blob([data], { type: 'application/zip' });
      downloadBlob(zipBlob, zipFilename);
      resolve(zipBlob);
    });
  });
}
