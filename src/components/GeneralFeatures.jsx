import React, { useState } from 'react';
import { WifiOff, LayoutGrid, Layers, ShieldCheck, Printer, Check, Smartphone, ArrowUpRight } from 'lucide-react';

export default function GeneralFeatures({ onOpenModal }) {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 0,
      icon: WifiOff,
      title: 'Arsitektur Offline-First yang Tangguh',
      badge: 'Bekerja Tanpa Internet',
      summary: 'Toko rental di area pegunungan sering tanpa sinyal. CampRent POS tetap dapat melayani transaksi.',
      description: 'Lakukan transaksi sewa, catat barang keluar, hingga penerimaan pengembalian alat saat internet padam. Begitu perangkat terhubung kembali ke jaringan, seluruh data otomatis tersinkronisasi ke Cloud PostgreSQL tanpa resiko data ganda atau hilang.',
      points: [
        'Database lokal SQLite tertanam cepat di perangkat Android',
        'Tanpa loading lambat saat melayani antrean ramai akhir pekan',
        'Auto-sync background aman & transparan dengan deteksi konflik'
      ],
      previewImg: '/image/0.webp',
      previewCaption: 'Login Offline-Ready CampRent POS'
    },
    {
      id: 1,
      icon: LayoutGrid,
      title: 'Katalog Produk 2 Kolom Ramah Layar Ponsel',
      badge: 'Antarmuka Ergonomis',
      summary: 'Grid responsif yang dioptimalkan untuk sentuhan cepat kasir di tablet dan smartphone.',
      description: 'Kasir tidak perlu menggulir menu panjang yang rumit. Tampilan 2 kolom memudahkan pemilihan tenda camping, nesting, kompor portable, sleeping bag, hingga jaket gunung dalam hitungan detik.',
      points: [
        'Filter instan berdasarkan kategori perlengkapan sewa',
        'Pencarian nama alat & ketersediaan stok live',
        'Tombol "+ Tambah" cepat ke keranjang sewa mengapung'
      ],
      previewImg: '/image/A1.webp',
      previewCaption: 'Katalog Kasir CampRent POS (Grid 2 Kolom)'
    },
    {
      id: 2,
      icon: Layers,
      title: 'Dukungan Varian Ukuran (Size Variants)',
      badge: 'Kontrol Stok Varian',
      summary: 'Manajemen ukuran sepatu hiking, sandal gunung, dan jaket tanpa kerumitan SKU retail.',
      description: 'Perlengkapan outdoor memiliki spesifikasi ukuran penting (seperti Sepatu Hiking Size 39-44 atau Jaket Windproof S-XXL). Sistem CampRent POS menyediakan pemilihan ukuran instan langsung dengan kontrol sisa stok per ukuran.',
      points: [
        'Pilih ukuran sepatu atau pakaian dalam 1 sentuhan pop-up',
        'Pantau stok unit tersedia vs unit yang sedang disewa per size',
        'Mencegah kasir menyewakan ukuran yang stoknya sedang kosong'
      ],
      previewImg: '/image/A3.webp',
      previewCaption: 'Manajemen Inventori & Varian Ukuran Alat'
    },
    {
      id: 3,
      icon: ShieldCheck,
      title: 'Manajemen Jaminan Fisik & Deposit Tunai',
      badge: 'Keamanan Aset',
      summary: 'Amankan aset toko bernilai jutaan rupiah dengan pengawasan jaminan transparan.',
      description: 'Toko rental beresiko kehilangan alat jika jaminan tidak tercatat rapi. CampRent POS mencatat jenis dokumen jaminan (KTP, SIM, KTM, atau Paspor) beserta uang titipan deposit yang aman di laci kasir.',
      points: [
        'Status dokumen jaminan yang dipegang kasir tersimpan di nota',
        'Deposit uang tunai otomatis memotong tagihan denda/pelunasan',
        'Pengingat bagi kasir untuk mengembalikan jaminan saat alat beres'
      ],
      previewImg: '/image/A2.webp',
      previewCaption: 'Monitoring Transaksi, Jaminan KTP & Deposit'
    },
    {
      id: 4,
      icon: Printer,
      title: 'Cetak Struk Thermal Kasir & Berbagi PDF',
      badge: 'Dukungan 58mm & 80mm',
      summary: 'Dukungan printer kasir thermal Bluetooth/USB serta nota digital WhatsApp.',
      description: 'Cetak bukti booking sewa dengan rincian alat dan tanggal kembali untuk dibawa pelanggan. Saat alat kembali, cetak struk pelunasan atau langsung bagikan nota resmi format PDF ke nomor WhatsApp pelanggan dalam satu klik.',
      points: [
        'Kompatibel dengan printer Bluetooth 58mm & standar 80mm',
        'Format struk rapi dengan info toko, jaminan, dan aturan sewa',
        'Fitur salinan struk (Copy Receipt) dan export PDF langsung'
      ],
      previewImg: '/image/A5.webp',
      previewCaption: 'Laporan Finansial & Bukti Struk Transaksi'
    }
  ];

  return (
    <section id="fitur" className="py-20 md:py-28 bg-zinc-50/70 border-y border-zinc-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-sm">
            <Smartphone className="w-3.5 h-3.5 stroke-[2] text-emerald-700" />
            <span>Fondasi Sistem</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            5 Fitur Utama <span className="text-emerald-700">All-in-One POS Rental</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-zinc-600">
            Fondasi kehandalan operasional yang dirancang khusus untuk memenuhi standar toko sewa tenda dan perlengkapan outdoor.
          </p>
        </div>

        {/* Interactive Feature Display */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Selector Cards */}
          <div className="lg:col-span-6 space-y-2.5">
            {features.map((item, index) => {
              const IconComp = item.icon;
              const isActive = activeFeature === index;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveFeature(index)}
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all border ${
                    isActive
                      ? 'bg-white border-emerald-700 shadow-md ring-1 ring-emerald-700'
                      : 'bg-white/80 hover:bg-white border-zinc-200 shadow-sm text-zinc-600'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                      isActive ? 'bg-emerald-700 text-white shadow-sm' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      <IconComp className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className={`text-sm sm:text-base font-bold ${isActive ? 'text-zinc-950' : 'text-zinc-800'}`}>
                          {item.title}
                        </h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-zinc-50 text-zinc-600 border-zinc-200'
                        }`}>
                          {item.badge}
                        </span>
                      </div>
                      
                      <p className="text-xs text-zinc-600 mt-1 line-clamp-2">
                        {item.summary}
                      </p>

                      {isActive && (
                        <div className="mt-3 pt-3 border-t border-emerald-100 space-y-1.5 animate-fadeIn">
                          {item.points.map((pt, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-zinc-800 font-medium">
                              <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 stroke-[2.5]" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Mockup Preview Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md bg-white p-5 rounded-3xl border border-zinc-200 shadow-xl">
              
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-zinc-200">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Live Interface
                  </span>
                  <h4 className="text-xs font-bold text-zinc-900 mt-1">
                    {features[activeFeature].previewCaption}
                  </h4>
                </div>
                <button
                  onClick={() => onOpenModal(
                    features[activeFeature].previewImg,
                    features[activeFeature].title,
                    features[activeFeature].previewCaption
                  )}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-1 font-semibold transition-colors"
                >
                  <span>Perbesar</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tablet screen viewport */}
              <div 
                onClick={() => onOpenModal(
                  features[activeFeature].previewImg,
                  features[activeFeature].title,
                  features[activeFeature].previewCaption
                )}
                className="relative rounded-2xl overflow-hidden border border-zinc-300 cursor-pointer group bg-black aspect-[3/4.1] shadow-inner"
              >
                <img
                  src={features[activeFeature].previewImg}
                  alt={features[activeFeature].title}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-102"
                />
                
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-lg bg-white text-zinc-950 text-xs font-bold shadow-md">
                    Klik untuk Melihat Detail Layar
                  </span>
                </div>
              </div>

              {/* Feature note box */}
              <div className="mt-3.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600">
                <p className="font-bold text-zinc-900 mb-0.5">Penjelasan Operasional:</p>
                <p className="text-[11px] leading-relaxed text-zinc-600">
                  {features[activeFeature].description}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
