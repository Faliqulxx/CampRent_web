# CampRent POS — Website Resmi & Tools

Website resmi, portal unduh APK, dan pusat alat bantu (*tools*) untuk **CampRent POS** (Sistem Kasir & Manajemen Rental Perlengkapan Outdoor).

🔗 **Live Website**: [camp-rent-web.vercel.app](https://camp-rent-web.vercel.app/)  
🛠️ **Image Compressor Tool**: [camp-rent-web.vercel.app/tools/image-compressor](https://camp-rent-web.vercel.app/tools/image-compressor)

---

## ✨ Fitur Utama Website

### 1. Landing Page CampRent POS
- **Hero Section Dinamis**:
  - Mockup tablet interaktif dengan **auto-cycling screenshot** (berganti otomatis secara urut dari `0.webp`, seri Owner `A1–A6`, hingga seri Kasir `K1–K5`).
  - Efek *smooth crossfade*, *pause on hover*, navigasi manual panah/titik, dan *lightbox modal* resolusi penuh.
  - Kartu mengambang status transaksi & mode offline yang rapi tanpa menutupi layar.
- **Showcase Toko Rental**: Pratinjau display toko sewa alat alam bebas & perlengkapan pendakian gunung.
- **Masalah vs Solusi Rental**: Perbandingan operasional manual vs otomatisasi CampRent POS.
- **5 Fitur All-in-One POS**: Offline-first SQLite, integrasi printer thermal Bluetooth/USB, deposit jaminan KTP/SIM, denda keterlambatan per hari, dan multi-tenant cloud sync.
- **Hak Akses Terpisah**: Showcase peran Owner (dashboard finansial, audit shift, laporan denda) vs Kasir (shift guard laci, floating cart, inspeksi pengembalian).
- **Tabel Komparasi**: Perbandingan kasir retail biasa vs kasir khusus persewaan outdoor.
- **Download APK Resmi**: Versi v1.1 dan v1.0.0 siap unduh, modal changelog, dan panduan instalasi 3 langkah di Android.
- **FAQ Interaktif**: Akordion tanya jawab lengkap seputar alur rental, keamanan data, dan perangkat pendukung.

### 2. CampRent Image Compressor (`/tools/image-compressor`)
Alat bantu khusus pemilik rental untuk menyiapkan foto katalog barang (tenda, carrier, kompor, dll.):
- **100% Client-Side di Browser**: Memakai HTML5 Canvas API; foto tidak pernah diunggah ke server maupun penyimpanan pihak ketiga.
- **Crop Persegi 1:1 Terkunci**: Drag pan sentuhan/mouse, pinch-zoom mobile, slider zoom, rotasi 90°, opsi *fit whole image* (latar bersih), dan garis bantu 3×3.
- **Standar Katalog POS (WebP ≤ 2 MB)**: *Binary search* kualitas otomatis (0.50–0.95) dengan mekanisme *auto-downscale* jika foto resolusi sangat tinggi masih melebihi batas.
- **Dukungan Batch Upload**: Mampu memproses hingga 20 foto sekaligus dengan fitur *Kompres Semua Otomatis* dan *Unduh Semua (.zip)* via pustaka ringan `fflate`.
- **Privasi & EXIF**: Otomatis menghapus metadata GPS / EXIF kamera HP agar aman sebelum dibagikan ke staf kasir.
- **SEO & Routing Friendly**: Terintegrasi rewrite SPA Vercel, `sitemap.xml`, dan `robots.txt`.

---

## 🛠️ Teknologi yang Digunakan

- **Core**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) (Palet Emerald, Zinc, White Minimalist)
- **Ikon**: [Lucide React](https://lucide.dev/)
- **Kompresi Zip Client-Side**: [fflate](https://github.com/101arrowz/fflate)
- **Animasi & Efek**: [Framer Motion](https://www.framer.com/motion/) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Menjalankan Secara Lokal

1. **Clone repository**:
   ```bash
   git clone https://github.com/Faliqulxx/CampRent_web.git
   cd CampRent_web
   ```

2. **Pasang dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`.

4. **Build untuk produksi**:
   ```bash
   npm run build
   ```

5. **Preview hasil build produksi**:
   ```bash
   npm run preview
   ```

---

## 📁 Struktur Direktori

```
CampRent_web/
├── public/
│   ├── apk/                 # Berkas APK CampRent POS
│   ├── image/               # Screenshot aplikasi (0.webp, A1-A6, K1-K5) & logo
│   ├── robots.txt           # Petunjuk web crawler
│   └── sitemap.xml          # Peta situs (/, /tools/image-compressor)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Header navigasi & link Tools
│   │   ├── Hero.jsx         # Hero section & auto-cycling mockup tablet
│   │   ├── tools/
│   │   │   └── image-compressor/
│   │   │       ├── ImageCompressorPage.jsx  # Halaman utama tool
│   │   │       ├── Dropzone.jsx             # Drag & drop / kamera input
│   │   │       ├── CropEditor.jsx           # Kanvas crop 1:1 & zoom
│   │   │       ├── SettingsPanel.jsx        # Pengaturan resolusi & batas 2 MB
│   │   │       ├── ResultCard.jsx           # Pratinjau hasil, stat komparasi, unduh
│   │   │       ├── BatchQueue.jsx           # Antrean batch & unduh .zip
│   │   │       └── lib/
│   │   │           ├── compress.js          # Mesin kompresi WebP Canvas
│   │   │           ├── image-utils.js       # Pembaca gambar, EXIF, format bytes
│   │   │           └── download.js          # Download blob & zip fflate
│   │   ├── DownloadSection.jsx
│   │   ├── RoleShowcase.jsx
│   │   ├── ProblemSolution.jsx
│   │   ├── GeneralFeatures.jsx
│   │   ├── ComparisonTable.jsx
│   │   ├── StoreShowcase.jsx
│   │   ├── InstallGuide.jsx
│   │   ├── FAQ.jsx
│   │   └── Footer.jsx
│   ├── App.jsx              # Komponen utama & client-side router
│   ├── index.css            # Setup Tailwind & scrollbar styling
│   └── main.jsx
├── prd.md                   # Spesifikasi PRD Image Compressor
├── tailwind.config.js
├── vercel.json              # Rewrite rules SPA untuk Vercel
└── vite.config.js
```

---

## 📄 Lisensi & Hak Cipta

© 2026 CampRent POS. Seluruh hak cipta dilindungi.  
Dikembangkan oleh [Faliqul Ishbah](https://faliq-portfolio.vercel.app/).
