# PRD — Image Compressor untuk Website CampRent

| | |
|---|---|
| **Nama Fitur** | CampRent Image Compressor |
| **Lokasi** | Website CampRent yang sudah ada (`camp-rent-web.vercel.app`) |
| **URL Halaman** | `/tools/image-compressor` |
| **Produk Induk** | CampRent POS (aplikasi kasir & manajemen rental outdoor) |
| **Pengguna** | Pemilik/staf rental outdoor |
| **Versi** | 1.0 |
| **Tanggal** | 18 Oktober 2026 |
| **Status** | Draft untuk Review |

---

## 1. Ringkasan

Menambahkan **halaman alat bantu (tool)** di website CampRent yang sudah ada, bukan proyek atau domain baru. Pemilik rental dapat **mengompres foto barang** (tenda, carrier, kompor, dll.) menjadi **WebP persegi 1:1 dengan ukuran maksimal 2 MB**, lalu mengunduh hasilnya untuk dipakai di CampRent POS.

Seluruh proses berjalan **langsung di browser** (Canvas API). **Gambar tidak diunggah ke server maupun Supabase.**

### Prinsip Utama

> **"Unggah, atur, unduh. Selesai dalam hitungan detik."**
> Alat ini harus bisa dipakai pemilik rental yang tidak terbiasa dengan aplikasi desain, langsung dari HP, tanpa belajar.

## 2. Latar Belakang & Masalah

- Foto dari kamera HP biasanya 3–10 MB dan berbentuk persegi panjang, sehingga membebani penyimpanan, memperlambat aplikasi, dan tampil tidak seragam di katalog POS.
- Pemilik rental harus mencari situs kompresi lain yang sering penuh iklan, memiliki batas pemakaian, atau mengunggah foto ke server pihak ketiga.
- Tidak ada langkah baku untuk menyiapkan foto produk sebelum dipakai di CampRent POS.

## 3. Keputusan Penempatan

Alat ini digabung ke website CampRent yang ada, dengan URL dan tampilan terpisah dari halaman download.

| Halaman | URL | Fungsi |
|---|---|---|
| Beranda | `/` | Penjelasan CampRent POS, fitur, keunggulan, tombol unduh APK |
| Download | `/download` | Versi terbaru, panduan instalasi, changelog |
| **Image Compressor** *(baru)* | `/tools/image-compressor` | Kompres foto produk ke WebP 1:1 ≤ 2 MB |

**Alasan:** brand satu pintu, tanpa domain/proyek baru, memakai deployment Vercel yang ada, dan siap menampung tool lain ke depan.

> **Catatan teknis awal:** struktur dan framework website saat ini belum terverifikasi (halaman utama belum menampilkan detail yang bisa dibaca otomatis). Langkah pertama pengerjaan adalah **audit proyek**: framework apa yang dipakai (HTML statis, Vite/React, Next.js, dll.), cara routing, dan gaya desain yang ada. Fitur ini harus **mengikuti stack yang sudah ada**, tidak membuat ulang website.

## 4. Tujuan & Target Keberhasilan

| Tujuan | Indikator | Target |
|---|---|---|
| Mempermudah persiapan foto | Waktu dari unggah sampai unduh | ≤ 30 detik per foto |
| Hasil sesuai syarat POS | Hasil ≤ 2 MB, WebP, rasio 1:1 | 100% |
| Dipakai pemilik rental | Jumlah gambar yang diproses/bulan | Dipantau (analytics) |
| Menguatkan brand | Pengunjung tools yang lanjut ke `/download` | Dipantau |
| Performa | Lighthouse mobile halaman tool | ≥ 90 |

## 5. Target Pengguna

1. **Pemilik rental outdoor** — memotret barang dengan HP, butuh foto ringan dan seragam.
2. **Staf/admin rental** — menyiapkan banyak foto produk sekaligus.
3. **Calon pengguna CampRent POS** — menemukan alat ini lewat Google, lalu mengenal aplikasinya.

> **Mobile-first:** mayoritas foto diambil dan diproses dari HP.

## 6. Ruang Lingkup

### Termasuk (In Scope)
- Halaman `/tools/image-compressor` dengan tautan di navigasi (menu **Tools**).
- Unggah foto (pilih file, drag & drop, kamera/galeri di HP).
- Crop persegi 1:1 interaktif (geser dan zoom).
- Kompresi ke WebP dengan batas maksimal 2 MB.
- Pratinjau hasil + informasi ukuran sebelum/sesudah.
- Unduh hasil (satu per satu; zip untuk banyak file, opsional).
- Seluruh proses di sisi klien.
- Panduan singkat + FAQ di halaman.

### Tidak Termasuk (Versi 1)
- Unggah ke server/Supabase atau penyimpanan cloud.
- Akun/login.
- Editing lanjutan (filter, hapus latar, teks).
- Integrasi langsung "kirim ke CampRent POS".
- Format keluaran selain WebP (opsional JPEG sebagai cadangan, lihat 9.3).

---

## 7. Alur Pengguna

```
Buka website CampRent
   → Menu "Tools" → "Image Compressor"
   → Unggah foto barang rental
   → Atur crop persegi (geser/zoom)
   → Tekan "Kompres"
   → Lihat pratinjau + ukuran (mis. 4,8 MB → 380 KB)
   → Unduh hasil
   → Pakai di CampRent POS
```

**Alur batch (beberapa foto):** unggah banyak foto → tiap foto di-crop (otomatis tengah, bisa diatur manual) → kompres semua → unduh satu per satu atau sebagai zip.

---

## 8. Spesifikasi Halaman & UI

### 8.1 Struktur Halaman

1. **Header** — judul "Image Compressor" + satu kalimat manfaat ("Kecilkan foto barang rental jadi WebP persegi, langsung di browser. Foto tidak diunggah ke server.").
2. **Area kerja (inti)** — dibagi dua langkah yang jelas:
   - **Langkah 1: Unggah.** Zona drag & drop besar + tombol "Pilih Foto".
   - **Langkah 2: Atur & Kompres.** Editor crop + panel pengaturan + hasil.
3. **Lencana kepercayaan** — "Diproses di perangkat Anda • Tanpa unggah ke server • Gratis".
4. **Cara pakai** — 3–4 langkah singkat.
5. **FAQ** — pertanyaan umum.
6. **CTA ke CampRent POS** — ajakan menuju `/download` (halus, tidak mengganggu alat).

### 8.2 Tata Letak Area Kerja

**Desktop:** dua kolom. Kiri: kanvas crop (rasio persegi). Kanan: panel pengaturan, informasi ukuran, tombol aksi.
**HP:** satu kolom bertumpuk: kanvas crop → pengaturan → tombol (tombol aksi menempel di bawah layar agar mudah dijangkau ibu jari).

### 8.3 Status Antarmuka

| Status | Tampilan |
|---|---|
| Kosong | Zona unggah dengan petunjuk format & batas |
| Memuat gambar | Indikator singkat |
| Siap crop | Kanvas crop + pengaturan aktif |
| Memproses | Tombol berubah "Memproses…" + progres |
| Hasil | Pratinjau, ukuran sebelum/sesudah, persentase hemat, tombol Unduh |
| Gagal | Pesan jelas + solusi (lihat bagian 10) |

### 8.3 Arahan Desain
- **Ikuti gaya website CampRent yang ada**: warna, font, dan komponen yang sama agar terasa satu produk. Jika belum ada panduan, tentukan token (warna, radius, font) dari halaman beranda lebih dulu.
- Bersih dan fungsional: alat harus terasa **ringan, jelas, dan terpercaya**, bukan penuh hiasan.
- Satu aksi utama berwarna jelas (mis. "Kompres & Unduh").
- Animasi halus dan hemat (transisi hasil muncul, progres); hormati `prefers-reduced-motion`.
- Target sentuh ≥ 44px, teks ≥ 16px, kontras memenuhi WCAG AA.
- Bahasa Indonesia yang singkat dan ramah.

---

## 9. Kebutuhan Fungsional

### 9.1 Unggah Gambar

| ID | Kebutuhan | Prioritas |
|---|---|---|
| U1 | Pilih file lewat tombol (di HP membuka galeri/kamera) | **Wajib** |
| U2 | Drag & drop di desktop | **Wajib** |
| U3 | Format masukan: JPG, PNG, WebP | **Wajib** |
| U4 | Batas ukuran file masukan (disarankan 25 MB) dengan pesan jelas jika terlewati | **Wajib** |
| U5 | Unggah beberapa file sekaligus (batch, disarankan maks. 20) | Tinggi |
| U6 | Koreksi orientasi otomatis dari data EXIF (foto HP tidak miring/terbalik) | **Wajib** |
| U7 | Dukungan HEIC/HEIF dari iPhone | Rendah (lihat Risiko) |

### 9.2 Crop 1:1

| ID | Kebutuhan | Prioritas |
|---|---|---|
| C1 | Area crop persegi dengan rasio terkunci 1:1 | **Wajib** |
| C2 | Geser gambar dan zoom (pinch di HP, scroll/slider di desktop) | **Wajib** |
| C3 | Posisi awal otomatis di tengah dan menutupi area terbaik | **Wajib** |
| C4 | Tombol reset dan putar 90° | Tinggi |
| C5 | Opsi "Muat seluruh gambar" (tambah latar putih/transparan agar tidak terpotong) | Sedang |
| C6 | Garis bantu (grid 3×3) | Rendah |

### 9.3 Kompresi

| ID | Kebutuhan | Prioritas |
|---|---|---|
| K1 | Keluaran **WebP** | **Wajib** |
| K2 | **Batas maksimal 2 MB** (hasil tidak boleh melebihi) | **Wajib** |
| K3 | Pilihan ukuran sisi (piksel): 800 · 1080 (default) · 1440 · Asli | Tinggi |
| K4 | Penyesuaian kualitas otomatis: mulai dari kualitas tinggi lalu turun bertahap sampai ≤ batas | **Wajib** |
| K5 | Slider kualitas manual (opsional, mode lanjutan) | Sedang |
| K6 | Tampilkan ukuran sebelum, sesudah, dan persentase penghematan | **Wajib** |
| K7 | Jika tetap > 2 MB pada kualitas minimum, kecilkan dimensi otomatis lalu coba lagi | **Wajib** |
| K8 | Pratinjau hasil (perbandingan sebelum/sesudah, opsional) | Sedang |
| K9 | Cadangan format JPEG jika browser tidak mendukung penyandian WebP | Tinggi |

### 9.4 Unduh

| ID | Kebutuhan | Prioritas |
|---|---|---|
| D1 | Unduh satu file dengan nama otomatis (mis. `nama-asli-1080.webp`) | **Wajib** |
| D2 | Unduh semua sebagai `.zip` untuk batch | Sedang |
| D3 | Opsi mengubah nama file sebelum unduh | Sedang |
| D4 | Tombol "Mulai lagi / Foto lain" | **Wajib** |

### 9.5 Privasi & Keamanan
- Semua pemrosesan di browser; **tidak ada permintaan jaringan yang membawa data gambar**.
- Tampilkan pernyataan privasi di halaman.
- Lepaskan memori (`URL.revokeObjectURL`) setelah selesai.
- Metadata (lokasi GPS/EXIF) **hilang otomatis** karena gambar digambar ulang di kanvas. Sebutkan ini sebagai nilai tambah.

---

## 10. Penanganan Kesalahan

| Situasi | Pesan / Perilaku |
|---|---|
| Format tidak didukung | "Format file tidak didukung. Gunakan JPG, PNG, atau WebP." |
| File terlalu besar | "File melebihi batas 25 MB. Coba foto yang lebih kecil." |
| Gambar gagal dibaca/rusak | "Foto tidak bisa dibuka. Coba foto lain." |
| Hasil masih > 2 MB | Otomatis kecilkan dimensi; jika tetap gagal, tampilkan saran memperkecil ukuran sisi |
| Memori browser habis (HP lama) | "Foto terlalu besar untuk perangkat ini. Pilih ukuran sisi lebih kecil." |
| Browser tidak mendukung WebP | Tawarkan keluaran JPEG dengan keterangan |

---

## 11. Spesifikasi Teknis

### 11.1 Pendekatan Utama
Pemrosesan **sepenuhnya di sisi klien** memakai Canvas API. Tidak ada backend baru.

### 11.2 Alur Pemrosesan

```
1. Baca file → createImageBitmap(file, { imageOrientation: "from-image" })
2. Tentukan area crop persegi (x, y, ukuran) dari posisi & zoom pengguna
3. Gambar area crop ke <canvas> persegi (sisi = ukuran target, mis. 1080)
4. canvas.toBlob(callback, "image/webp", quality)
5. Jika blob.size > 2 * 1024 * 1024:
      turunkan quality bertahap (mis. 0.9 → 0.8 → ... → 0.5)
      jika masih besar: perkecil sisi (mis. ×0.85) lalu ulangi
6. Tampilkan hasil + ukuran → sediakan unduhan (Blob URL)
```

**Pencarian kualitas:** disarankan *binary search* pada nilai kualitas (0.5–0.95) agar mendapat kualitas setinggi mungkin yang masih ≤ 2 MB, dengan maksimal ±6–7 iterasi.

### 11.3 Contoh Kerangka Kode (Acuan)

```js
async function compressToWebp(bitmap, crop, side, maxBytes = 2 * 1024 * 1024) {
  const canvas = document.createElement("canvas");
  canvas.width = side;
  canvas.height = side;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, crop.x, crop.y, crop.size, crop.size, 0, 0, side, side);

  const toBlob = (q) =>
    new Promise((res) => canvas.toBlob(res, "image/webp", q));

  let lo = 0.5, hi = 0.95, best = null;
  for (let i = 0; i < 7; i++) {
    const q = (lo + hi) / 2;
    const blob = await toBlob(q);
    if (blob && blob.size <= maxBytes) { best = blob; lo = q; } else { hi = q; }
  }
  return best; // null → perkecil `side` lalu ulangi
}
```

> Kode di atas hanya kerangka acuan; implementasi final mengikuti framework yang dipakai website.

### 11.4 Catatan Kompatibilitas
- **Penyandian WebP lewat `canvas.toBlob`** tidak sama di semua browser (terutama Safari/iOS versi lama bisa mengembalikan PNG). Wajib **mengecek `blob.type`**; jika bukan `image/webp`, jalankan cadangan JPEG atau beri peringatan.
- **EXIF orientation:** gunakan `imageOrientation: "from-image"` pada `createImageBitmap` atau penanganan setara.
- **Memori di HP:** foto 12–48 MP bisa sangat berat. Perkecil lebih dulu (downscale) sebelum menggambar ke kanvas besar; pertimbangkan `OffscreenCanvas` + Web Worker agar UI tidak membeku.
- **Zip batch:** gunakan pustaka ringan (mis. `fflate` atau JSZip), dimuat hanya saat dibutuhkan (lazy-load).
- **Crop UI:** boleh memakai pustaka (mis. `react-easy-crop` jika React) atau implementasi sendiri; pilih yang sesuai stack dan ringan.

### 11.5 Routing & Deployment (Vercel)
- Tambahkan rute `/tools/image-compressor` sesuai framework yang ada.
- Jika website berupa SPA (Vite/React), pastikan ada *rewrite* di `vercel.json` agar akses langsung ke URL tidak menghasilkan 404.
- Jika HTML statis, buat folder/berkas `tools/image-compressor` yang setara.
- Tambahkan menu **Tools** pada navigasi dan tautan di footer; sertakan di `sitemap.xml`.
- Tidak perlu fungsi server/serverless: tetap hemat kuota Vercel.

### 11.6 Struktur Berkas yang Disarankan (menyesuaikan stack)

```
tools/image-compressor/
├── ImageCompressorPage     # halaman + SEO + FAQ
├── Dropzone                # area unggah
├── CropEditor              # crop 1:1, zoom, putar
├── SettingsPanel           # ukuran sisi, kualitas
├── ResultCard              # hasil, ukuran, unduh
└── lib/
    ├── compress.js         # logika kanvas + batas 2 MB
    ├── image-utils.js      # EXIF, downscale, format
    └── download.js         # unduh blob / zip
```

---

## 12. Kebutuhan Non-Fungsional

- **Performa:** halaman dimuat < 2,5 detik di 4G; pustaka berat (crop, zip) di-*lazy-load*; kompresi satu foto 12 MP selesai ≲ 3 detik di HP kelas menengah.
- **Responsif:** nyaman dari 360px sampai desktop.
- **Aksesibilitas:** bisa dioperasikan keyboard, label jelas, area sentuh besar, pesan galat dibaca screen reader (`aria-live`).
- **SEO:** title/meta khusus ("Kompres Foto ke WebP 1:1 untuk Rental — CampRent"), heading terstruktur, FAQ, Open Graph.
- **Privasi:** tanpa unggah gambar; tanpa pelacakan isi gambar.
- **Browser:** Chrome, Safari (iOS/macOS), Firefox, Edge versi terbaru.
- **Analytics (opsional):** catat event ringan (mis. "kompres_selesai", "unduh") **tanpa data gambar**.

## 13. Konten Halaman (Draf Teks)

**Judul:** Image Compressor untuk Foto Barang Rental
**Sub-judul:** Kecilkan foto jadi WebP persegi, maksimal 2 MB. Diproses langsung di perangkat Anda, tanpa unggah ke server.

**Cara pakai:**
1. Pilih foto barang rental.
2. Atur bingkai persegi (geser dan zoom).
3. Tekan **Kompres**.
4. Unduh hasilnya dan pakai di CampRent POS.

**FAQ yang disarankan:**
- Apakah foto saya diunggah ke server? *(Tidak, semua diproses di browser Anda.)*
- Kenapa harus persegi (1:1)? *(Agar tampil seragam di katalog CampRent POS.)*
- Kenapa WebP? *(Ukuran lebih kecil dengan kualitas tetap baik.)*
- Berapa ukuran maksimal hasil? *(2 MB.)*
- Apakah data lokasi foto ikut terbawa? *(Tidak, metadata hilang saat diproses.)*
- Foto dari iPhone tidak bisa dibuka? *(Ubah dulu ke JPG atau atur kamera ke "Paling Kompatibel".)*

> Sesuaikan semua teks dengan kenyataan setelah fitur selesai dan diuji.

---

## 14. Rencana Pengerjaan

| Fase | Pekerjaan | Estimasi |
|---|---|---|
| 1 | Audit proyek: framework, routing, gaya desain, navigasi | 0,5 hari |
| 2 | Desain halaman (mengikuti gaya CampRent) + teks | 1 hari |
| 3 | Rute, halaman, dan menu Tools | 0,5 hari |
| 4 | Dropzone + pemuatan gambar + EXIF | 1 hari |
| 5 | Crop 1:1 (geser, zoom, putar) | 1–1,5 hari |
| 6 | Mesin kompresi WebP + batas 2 MB + cadangan JPEG | 1 hari |
| 7 | Hasil, unduh, batch/zip, penanganan galat | 1 hari |
| 8 | Uji di HP (Android & iPhone) dan desktop, perbaikan | 1 hari |
| 9 | SEO, FAQ, analytics, deploy | 0,5 hari |
| | **Total** | **± 1 minggu** |

## 15. Kriteria Selesai (Acceptance Criteria)

- [ ] Halaman dapat diakses di `/tools/image-compressor`, termasuk saat dibuka langsung/di-refresh.
- [ ] Menu **Tools** tersedia di navigasi dan tidak mengganggu halaman Beranda/Download.
- [ ] Foto JPG/PNG/WebP dapat diunggah lewat tombol dan drag & drop.
- [ ] Foto dari kamera HP tidak miring atau terbalik.
- [ ] Crop 1:1 dapat digeser dan di-zoom dengan mulus di HP maupun desktop.
- [ ] Hasil selalu **WebP, persegi, dan ≤ 2 MB** (diuji dengan foto 10 MB+).
- [ ] Ukuran sebelum/sesudah dan persentase hemat ditampilkan.
- [ ] Hasil dapat diunduh dengan nama file yang jelas.
- [ ] Tidak ada permintaan jaringan yang membawa data gambar (diverifikasi di DevTools → Network).
- [ ] Pesan galat jelas untuk format salah, file terlalu besar, dan gambar rusak.
- [ ] Berfungsi di Chrome Android, Safari iPhone, Chrome/Edge/Firefox desktop; ada cadangan jika WebP tidak didukung.
- [ ] Tampilan konsisten dengan gaya website CampRent.
- [ ] Lighthouse mobile ≥ 90 pada halaman tool.

## 16. Risiko & Solusi

| Risiko | Solusi |
|---|---|
| Safari/iOS lama tidak menyandikan WebP via canvas | Cek `blob.type`; sediakan keluaran JPEG cadangan dan beri tahu pengguna |
| Foto resolusi sangat tinggi membuat HP lemah/membeku | Downscale awal, batasi dimensi, gunakan Web Worker/OffscreenCanvas |
| Format HEIC dari iPhone tidak terbaca browser | Versi 1: beri petunjuk konversi; versi lanjut: pustaka konversi HEIC (lazy-load) |
| Hasil di bawah 2 MB tetapi kualitas jelek | Pakai binary search kualitas tertinggi yang masih memenuhi batas; default 1080px |
| Website saat ini tidak mendukung rute baru | Audit di fase 1; tambahkan *rewrite* Vercel atau struktur halaman setara |
| Crop sulit dipakai di layar kecil | Uji pinch-zoom di HP nyata; sediakan slider zoom dan tombol reset |
| Pengguna ragu soal privasi | Tampilkan lencana "diproses di perangkat" dan jelaskan di FAQ |
| Kuota Vercel | Tidak ada beban server karena proses di klien; pantau ukuran bundle |

## 17. Pengembangan Selanjutnya

- Dukungan HEIC/HEIF dan format keluaran tambahan (AVIF)
- Pemrosesan batch lebih besar dengan antrean dan zip
- Hapus latar belakang untuk foto produk
- Tombol "Salin ke CampRent POS" / integrasi langsung
- Tools lain untuk pemilik rental (mis. pembuat label harga, kalkulator denda)
- Halaman panduan dan blog (SEO) seputar bisnis rental outdoor
- Mode gelap

---

*Dokumen ini adalah panduan awal dan dapat disesuaikan setelah audit proyek CampRent yang ada.*