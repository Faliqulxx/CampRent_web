# CampRent POS — Landing Page Resmi & Download APK

Website Landing Page modern, simpel, dan elegan untuk promosi dan unduh aplikasi **CampRent POS** (Sistem Kasir & Rental Perlengkapan Outdoor).

Dibangun menggunakan:
- ⚛️ **React 18** + **Vite 6**
- 🎨 **Tailwind CSS** dengan desain **Dominan Putih Bersih** dan aksen **Hitam & Abu-Abu Minimalis**
- 🖼️ **Logo Resmi**: `public/image/camprent_logo.jpg`
- 🔲 **Flat Vector Icons** (Lucide Icons murni, bebas emoji)
- 📱 Desain responsif di Smartphone, Tablet, & Desktop
- 🚀 Siap dideploy ke **Vercel**

---

## 🚀 Menjalankan Secara Lokal

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Jalankan Mode Pengembangan (Development)**:
   ```bash
   npm run dev
   ```
   Buka di peramban: `http://localhost:3000`.

3. **Build untuk Produksi**:
   ```bash
   npm run build
   ```

4. **Preview Hasil Build Produksi**:
   ```bash
   npm run preview
   ```

---

## 🌐 Deploy ke Vercel

### Metode 1: Hubungkan ke GitHub (Rekomendasi)
1. Push repository ini ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: CampRent POS White Minimalist Landing Page"
   git branch -M main
   git remote add origin <URL_REPOSITORY_ANDA>
   git push -u origin main
   ```
2. Buka dashboard [Vercel](https://vercel.com/) dan pilih **Add New Project**.
3. Import repository GitHub Anda.
4. Pengaturan otomatis terdeteksi:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Klik **Deploy**!

### Metode 2: Deploy Cepat via Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

Konfigurasi routing SPA sudah otomatis ditangani oleh `vercel.json`.
