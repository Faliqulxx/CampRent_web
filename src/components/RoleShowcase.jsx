import React, { useState } from 'react';
import { UserCheck, Store, TrendingUp, AlertCircle, Users, Settings, Lock, ShoppingBag, Search, Scale, CheckCircle2 } from 'lucide-react';

export default function RoleShowcase({ onOpenModal }) {
  const [activeRole, setActiveRole] = useState('owner');
  const [activeItem, setActiveItem] = useState(0);

  const ownerFeatures = [
    {
      id: 0,
      icon: TrendingUp,
      title: 'A. Dashboard Finansial & Omzet Real-Time',
      badge: 'Kendali Finansial',
      description: 'Pantau total omzet masuk secara harian, mingguan, maupun bulanan tanpa perlu menunggu laporan manual kasir.',
      highlights: [
        'Rincian penerimaan berdasarkan metode pembayaran: Tunai (Cash), Transfer Bank, dan QRIS.',
        'Analisis perolehan dari Uang Muka (DP), Pelunasan Sewa, hingga Pendapatan Denda.',
        'Total omzet bersih dan transparansi kas masuk langsung dari genggaman.'
      ],
      screenshot: '/image/A5.webp',
      caption: 'Laporan Keuangan & Omzet Owner'
    },
    {
      id: 1,
      icon: AlertCircle,
      title: 'B. Laporan Keterlambatan & Analisis Piutang',
      badge: 'Fitur Terbuka',
      description: 'Tahu persis berapa unit alat yang belum dikembalikan melewati tanggal jatuh tempo serta total piutang yang masih tertahan.',
      highlights: [
        'Deteksi unit overdue (terlambat) dengan hitungan denda per hari.',
        'Total piutang sewa yang masih belum dilunasi pelanggan.',
        'Akses kontak nomor WhatsApp pelanggan yang bermasalah hanya dengan 1 sentuhan.'
      ],
      screenshot: '/image/A2.webp',
      caption: 'Monitoring Transaksi & Status Terlambat'
    },
    {
      id: 2,
      icon: Users,
      title: 'C. Dashboard Audit Seluruh Shift Kasir',
      badge: 'Audit & Rekonsiliasi',
      description: 'Owner dapat memantau kapan kasir membuka shift, berapa modal awal laci, dan catatan rekonsiliasi kas saat kasir tutup shift.',
      highlights: [
        'Melihat status shift kasir aktif, belum buka, atau sudah tutup.',
        'Log rekonsiliasi kas fisik vs data penjualan untuk mencegah manipulasi uang.',
        'Transparansi penuh menjaga kejujuran tim operasional toko.'
      ],
      screenshot: '/image/A6.webp',
      caption: 'Pusat Audit Shift & Pengaturan Sistem'
    },
    {
      id: 3,
      icon: Settings,
      title: 'D. Manajemen Inventori & Aturan Toko (CRUD Penuh)',
      badge: 'Pengaturan Global',
      description: 'Kontrol penuh katalog alat camping, tarif sewa, varian ukuran, dan pengaturan kebijakan sewa toko.',
      highlights: [
        'Tambah, edit, dan hapus alat camping serta kategori sewa secara fleksibel.',
        'Atur kebijakan DP minimum (misal: 30% atau 50%) dan standar deposit tunai.',
        'Atur besaran denda telat per hari, masa tenggang (grace period), dan kelola akun kasir.'
      ],
      screenshot: '/image/A3.webp',
      caption: 'Manajemen Inventori Stok Alat & Varian'
    }
  ];

  const cashierFeatures = [
    {
      id: 0,
      icon: Lock,
      title: 'A. Proteksi Buka Shift Kasir (Shift Guard)',
      badge: 'Proteksi Pembukuan',
      description: 'Kasir diwajibkan menghitung modal receh awal laci sebelum memulai shift. Sistem mengunci transaksi jika belum buka shift.',
      highlights: [
        'Memasukkan modal awal kas fisik secara teliti dengan chip cepat (Rp 100k, 200k, 300k, 500k).',
        'Mencegah kasir lupa mencatat saldo awal laci.',
        'Menjadi acuan dasar saat audit tutup shift nanti sore/malam.'
      ],
      screenshot: '/image/K1.webp',
      caption: 'Form Proteksi Buka Shift Kasir'
    },
    {
      id: 1,
      icon: ShoppingBag,
      title: 'B. Floating Cart & Kalkulator Pembayaran Otomatis',
      badge: 'Cepat & Akurat',
      description: 'Bottom sheet keranjang sewa mengapung menampilkan jumlah alat, durasi hari, dan subtotal secara real-time.',
      highlights: [
        'Kalkulator Kembalian Tunai otomatis saat memasukkan nominal pembayaran pelanggan.',
        'Tombol chip uang pas (+Rp 50.000, +Rp 100.000) mempercepat transaksi di jam sibuk.',
        'Tombol simpan terkunci otomatis jika uang pembayaran kurang dari nominal DP minimum.'
      ],
      screenshot: '/image/K2.webp',
      caption: 'Katalog Kasir & Floating Cart Aktif'
    },
    {
      id: 2,
      icon: Search,
      title: 'C. Modal Inspeksi Kondisi Alat Saat Pengembalian',
      badge: 'SOP Pengembalian',
      description: 'Saat pelanggan mengembalikan alat, kasir cukup membuka form inspeksi kondisi barang dengan pilihan terstruktur.',
      highlights: [
        'Unit Bersih & Baik: langsung lolos verifikasi.',
        'Unit Kotor: masukkan denda cuci alat secara otomatis.',
        'Unit Rusak / Hilang: masukkan biaya servis atau ganti unit, otomatis potong dari deposit uang jaminan.'
      ],
      screenshot: '/image/K3.webp',
      caption: 'Daftar Transaksi & Tombol Cek Pengembalian'
    },
    {
      id: 3,
      icon: Scale,
      title: 'D. Rekonsiliasi Tutup Shift Kasir',
      badge: 'Rekonsiliasi Kasir',
      description: 'Di akhir jam kerja, kasir menghitung fisik uang tunai di laci dan sistem langsung memvalidasi kecocokan pembukuan.',
      highlights: [
        'Kas Sesuai: Selisih Rp 0.',
        'Kas Lebih: Uang fisik di laci lebih banyak dari pencatatan.',
        'Kas Kurang: Uang fisik kurang (kasir wajib memasukkan keterangan alasan).',
        'Dapat langsung dicetak ke printer thermal sebagai tanda terima resmi serah terima shift.'
      ],
      screenshot: '/image/K4.webp',
      caption: 'Mode Kasir Read-Only & Riwayat Shift'
    }
  ];

  const currentFeatures = activeRole === 'owner' ? ownerFeatures : cashierFeatures;
  const currentItem = currentFeatures[activeItem] || currentFeatures[0];

  return (
    <section id="roles" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-sm">
            <span>Hak Akses Terpisah</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Dirancang untuk <span className="text-emerald-700">Pemilik Usaha &amp; Kasir</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-zinc-600">
            Hak akses terpisah melindungi data sensitif toko dan memungkinkan kasir bertransaksi cepat tanpa resiko selisih uang.
          </p>

          {/* Role Switcher Tabs */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm">
              <button
                onClick={() => {
                  setActiveRole('owner');
                  setActiveItem(0);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeRole === 'owner'
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'text-zinc-600 hover:text-emerald-800'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 stroke-[2]" />
                <span>Mode Owner (Pemilik Toko)</span>
              </button>

              <button
                onClick={() => {
                  setActiveRole('cashier');
                  setActiveItem(0);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeRole === 'cashier'
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'text-zinc-600 hover:text-emerald-800'
                }`}
              >
                <Store className="w-3.5 h-3.5 stroke-[2]" />
                <span>Mode Kasir (Staff Toko)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Feature & Screenshot Showcase Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Sub-features */}
          <div className="lg:col-span-6 space-y-2.5">
            <div className="mb-1">
              <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-800">
                {activeRole === 'owner' ? 'Hak Akses Pemilik Toko:' : 'Alur Operasional Kasir:'}
              </span>
            </div>

            {currentFeatures.map((feat, idx) => {
              const IconComponent = feat.icon;
              const isSelected = activeItem === idx;
              return (
                <div
                  key={feat.id}
                  onClick={() => setActiveItem(idx)}
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-white border-emerald-700 shadow-md ring-1 ring-emerald-700'
                      : 'bg-zinc-50/70 hover:bg-white border-zinc-200 text-zinc-600 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-xl shrink-0 ${
                      isSelected ? 'bg-emerald-800 text-white shadow-sm' : 'bg-zinc-200 text-zinc-800'
                    }`}>
                      <IconComponent className="w-4 h-4 stroke-[2]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-sm sm:text-base font-bold ${isSelected ? 'text-zinc-950' : 'text-zinc-800'}`}>
                          {feat.title}
                        </h4>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          isSelected
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-zinc-200/60 text-zinc-600'
                        }`}>
                          {feat.badge}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-600 mt-1 line-clamp-2">
                        {feat.description}
                      </p>

                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-emerald-100 space-y-2 animate-fadeIn">
                          {feat.highlights.map((hl, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-zinc-800 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5 stroke-[2.5]" />
                              <span className="leading-tight">{hl}</span>
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

          {/* Right Column: Tablet Mockup */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-md bg-white p-5 rounded-3xl border border-zinc-200 shadow-xl">
              
              <div className="flex items-center justify-between px-1 pb-3 mb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <span className="text-xs font-bold text-zinc-900 truncate max-w-[240px]">
                    {currentItem.caption}
                  </span>
                </div>
                <button
                  onClick={() => onOpenModal(currentItem.screenshot, currentItem.title, currentItem.caption)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-semibold text-emerald-800 transition-colors"
                >
                  Perbesar
                </button>
              </div>

              {/* Tablet screen container */}
              <div
                onClick={() => onOpenModal(currentItem.screenshot, currentItem.title, currentItem.caption)}
                className="relative rounded-2xl overflow-hidden border border-zinc-300 cursor-pointer group aspect-[3/4.1] bg-black shadow-inner"
              >
                <img
                  src={currentItem.screenshot}
                  alt={currentItem.title}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-102"
                />

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-lg bg-white text-zinc-950 text-xs font-bold shadow-md">
                    Lihat Gambar Penuh
                  </span>
                </div>
              </div>

              <div className="mt-3 text-center">
                <p className="text-[11px] text-zinc-500 font-medium">
                  Antarmuka nyata CampRent POS pada tablet Android
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
