import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  MessageSquarePlus, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  User, 
  Store, 
  Clock, 
  ExternalLink, 
  Download, 
  AlertTriangle, 
  CornerDownRight, 
  Reply, 
  ShieldCheck, 
  MessageSquare, 
  X, 
  Search, 
  Filter,
  Gift,
  Database,
  Wifi,
  Printer,
  Smartphone,
  Star,
  Bug,
  Phone
} from 'lucide-react';
import MountainSilhouette from './MountainSilhouette';

export default function FAQ({ onDownloadClick }) {
  const [openIndex, setOpenIndex] = useState(0);

  // Form State
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [category, setCategory] = useState('Fitur Baru');
  const [comment, setComment] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Filter & Search State for Community Feed
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Reply State
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyAuthor, setReplyAuthor] = useState('CampRent Developer (Official)');
  const [replyText, setReplyText] = useState('');

  // 14 Komentar / Reviewer Alami dari Pemilik Rental Outdoor se-Indonesia
  const defaultComments = [
    {
      id: 1,
      name: 'Bambang Triyono',
      storeName: 'Merbabu Adventure (Solo)',
      category: 'Fitur Baru',
      comment: 'Min, request penting banget: tolong adain fitur foto / gambar produk di katalog kasir! Kasir saya anak baru sering ketuker antara Tenda Dome 4P yang merek Quechua sama yang Great Outdoor kalau gak ada fotonya.',
      date: '1 jam yang lalu',
      replies: [
        {
          id: 101,
          author: 'CampRent Developer (Official)',
          isOfficial: true,
          text: 'Halo Pak Bambang! Usulan yang sangat tepat. Fitur upload foto produk via kamera & galeri sudah masuk agenda rilis v1.2 mendatang agar kasir lebih mudah mencocokkan visual barang.',
          date: '45 menit yang lalu'
        }
      ]
    },
    {
      id: 2,
      name: 'Hendra Kusuma',
      storeName: 'Rinjani Camp Gear (Lombok)',
      category: 'Lapor Bug',
      comment: 'Di HP Redmi 9 saya pas cetak struk via bluetooth printer thermal 58mm, baris total denda kadang kepotong 2 karakter di sisi kanan. Tolong dicek ya min.',
      date: '3 jam yang lalu',
      replies: [
        {
          id: 102,
          author: 'CampRent Developer (Official)',
          isOfficial: true,
          text: 'Halo Mas Hendra! Terima kasih laporannya. Format lebar margin 32-kolom printer 58mm sudah kami perbaiki pada rilis v1.1. Silakan unduh pembaruannya.',
          date: '2 jam yang lalu'
        }
      ]
    },
    {
      id: 3,
      name: 'Rian Pratama',
      storeName: 'Bromo Trek Outdoor (Malang)',
      category: 'Fitur Baru',
      comment: 'Saran untuk update versi depan, tolong tambahkan opsi cetak label barcode stiker untuk ditempel langsung di tiang tenda & carrier.',
      date: '4 jam yang lalu',
      replies: [
        {
          id: 103,
          author: 'CampRent Developer (Official)',
          isOfficial: true,
          text: 'Siap Mas Rian! Generator stiker barcode label unit fisik sedang masuk tahap perancangan template cetak.',
          date: '3 jam yang lalu'
        }
      ]
    },
    {
      id: 4,
      name: 'Siti Rahmawati',
      storeName: 'Gede Pangrango Outdoor (Cianjur)',
      category: 'Fitur Baru',
      comment: 'Bisa gak ditambahkan fitur foto kondisi alat saat serah-terima ke penyewa? Jadi pas barang dibalikin dalam kondisi sobek/kotor ada bukti foto perbandingannya.',
      date: '1 hari yang lalu',
      replies: []
    },
    {
      id: 5,
      name: 'Aris Setiawan',
      storeName: 'Puncak Raya Camping (Bogor)',
      category: 'Saran Umum',
      comment: 'Fitur offline dan shift kasirnya sangat membantu toko kami saat sinyal gunung lemot. Sangat ditunggu rilis fitur sinkron multi-cabangnya!',
      date: '1 hari yang lalu',
      replies: []
    },
    {
      id: 6,
      name: 'Faisal Akbar',
      storeName: 'Ciremai Base Rental (Kuningan)',
      category: 'Kendala Teknis',
      comment: 'Aplikasi kadang agak lemot kalau daftar barang sewa sudah di atas 150 item di tablet Advan jadul saya. Mohon optimasi penggunaan memorinya min.',
      date: '2 hari yang lalu',
      replies: []
    },
    {
      id: 7,
      name: 'Dimas Kurnia',
      storeName: 'Sindoro Gear Rental (Wonosobo)',
      category: 'Aturan Rental',
      comment: 'Bagus sekali ada denda cuci alat otomatis saat inspeksi alat kotor. Kasir jadi nggak perlu debat manual lagi sama penyewa.',
      date: '2 hari yang lalu',
      replies: []
    },
    {
      id: 8,
      name: 'Doni Saputra',
      storeName: 'Bukit Barisan Camping (Bukittinggi)',
      category: 'Fitur Baru',
      comment: 'Request kolom thumbnail foto produk di daftar transaksi sewa dong min. Biar kasir tinggal lirik gambar tenda atau carrier langsung tahu tanpa harus hafal kode SKU.',
      date: '3 hari yang lalu',
      replies: []
    },
    {
      id: 9,
      name: 'Eko Prasetyo',
      storeName: 'Semeru Camp Outfitters (Lumajang)',
      category: 'Saran Umum',
      comment: 'Tampilan antarmukanya bersih dan gampang dipahami kasir baru. Tapi tombol "Batal Transaksi" tolong diberi dialog konfirmasi ganda biar tidak kepencet tidak sengaja saat kasir terburu-buru.',
      date: '3 hari yang lalu',
      replies: []
    },
    {
      id: 10,
      name: 'Yusuf Maulana',
      storeName: 'Salak Adventure Rent (Sukabumi)',
      category: 'Fitur Baru',
      comment: 'Perlu banget ada fitur ekspor data penyewa dan rekap keuangan harian ke format Excel (.xlsx) atau CSV buat diserahkan ke pemilik toko tiap akhir bulan.',
      date: '4 hari yang lalu',
      replies: []
    },
    {
      id: 11,
      name: 'Indah Permata',
      storeName: 'Prau Station Gear (Dieng)',
      category: 'Aturan Rental',
      comment: 'Format hitungan sewa per 24 jam sudah mantap, tapi kalau bisa tambahkan opsi toleransi keterlambatan (grace period) misal 1–2 jam gratis sebelum sistem otomatis hitung denda hari berikutnya.',
      date: '4 hari yang lalu',
      replies: []
    },
    {
      id: 12,
      name: 'Bayu Pratama',
      storeName: 'Lawu Outdoor Store (Karanganyar)',
      category: 'Lapor Bug',
      comment: 'Kemarin sempat kagok pas keyboard virtual Android nutupin tombol konfirmasi bayar di kasir pada layar HP kecil, harus pencet tombol back dulu baru keliatan.',
      date: '5 hari yang lalu',
      replies: []
    },
    {
      id: 13,
      name: 'Wahyu Hidayat',
      storeName: 'Ijen Basecamp Rental (Banyuwangi)',
      category: 'Saran Umum',
      comment: 'Aplikasinya gratis dan tanpa iklan yang mengganggu transaksi kasir, sangat membantu UMKM persewaan kecil di daerah seperti kami. Terus dikembangkan ya!',
      date: '6 hari yang lalu',
      replies: []
    },
    {
      id: 14,
      name: 'Maya Agustina',
      storeName: 'Merapi Trek Rental (Sleman)',
      category: 'Kendala Teknis',
      comment: 'Fitur barcode kamera bawaan kadang susah fokus kalau pencahayaan toko rental lagi temaram di malam hari. Saran saya tambahkan tombol toggle lampu flash kamera saat scan.',
      date: '1 minggu yang lalu',
      replies: []
    }
  ];

  const [commentList, setCommentList] = useState(defaultComments);

  // Load saved comments from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('camprent_feedbacks_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCommentList(parsed);
          return;
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleReplySubmit = (commentId) => {
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      author: replyAuthor.trim() || 'CampRent Developer (Official)',
      isOfficial: true,
      text: replyText.trim(),
      date: 'Baru saja'
    };

    const updated = commentList.map(item => {
      if (item.id === commentId) {
        return {
          ...item,
          replies: [...(item.replies || []), newReply]
        };
      }
      return item;
    });

    setCommentList(updated);
    try {
      localStorage.setItem('camprent_feedbacks_v3', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setReplyText('');
    setActiveReplyId(null);
  };  const faqs = [
    {
      icon: Gift,
      q: 'Apakah aplikasi ini benar-benar gratis?',
      a: 'Ya, aplikasi ini gratis digunakan. Anda dapat mengunduh dan menggunakannya untuk toko persewaan Anda tanpa biaya langganan dan bulanan, serta tanpa iklan pada antarmuka kasir.'
    },
    {
      icon: Database,
      q: 'Apakah data toko saya bisa dilihat oleh pemilik toko rental lain?',
      a: 'Tidak. CampRent POS menerapkan arsitektur isolasi data setara standar Row Level Security (RLS). Seluruh catatan transaksi, data identitas jaminan pelanggan, dan laporan kas toko Anda terisolasi penuh dan tidak dapat diakses pihak lain.'
    },
    {
      icon: ShieldCheck,
      q: 'Apakah kasir bisa menghapus data produk atau melihat keuntungan toko?',
      a: 'Tidak bisa. Hak akses akun kasir dan akun Owner dipisahkan secara ketat. Akun kasir hanya memiliki wewenang operasional transaksi, cek stok, dan inspeksi pengembalian. Pengaturan toko, manipulasi harga/produk, dan laporan laba hanya dapat dibuka oleh akun Owner.'
    },
    {
      icon: Wifi,
      q: 'Bagaimana jika koneksi internet di toko rental saya mati mendadak?',
      a: 'CampRent POS bekerja dengan arsitektur Offline-First menggunakan database lokal SQLite di perangkat Android. Anda tetap dapat memproses booking sewa dan pengembalian saat offline. Begitu internet aktif kembali, sinkronisasi cloud berjalan otomatis.'
    },
    {
      icon: Printer,
      q: 'Printer kasir apa saja yang didukung oleh CampRent POS?',
      a: 'Mendukung printer thermal kasir standar ukuran kertas 58mm dan 80mm dengan konektivitas Bluetooth, USB, maupun jaringan via protokol ESC/POS (termasuk printer saku portable Bluetooth serta mesin POS terintegrasi).'
    },
    {
      icon: Smartphone,
      q: 'Apakah CampRent POS dapat berjalan di perangkat POS Android Sunmi / iMin?',
      a: 'Ya, CampRent POS dapat dijalankan dengan lancar pada terminal POS Android seperti Sunmi V2, Sunmi D2, iMin D1, iMin Swan, serta semua tablet Android mulai dari Android 6.0 hingga versi 15 terbaru.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setSubmitting(true);

    setTimeout(() => {
      const newEntry = {
        id: Date.now(),
        name: name.trim(),
        storeName: storeName.trim() ? storeName.trim() : 'Toko Rental Outdoor',
        category,
        comment: comment.trim(),
        date: 'Baru saja',
        replies: []
      };

      const updated = [newEntry, ...commentList];
      setCommentList(updated);

      try {
        localStorage.setItem('camprent_feedbacks_v3', JSON.stringify(updated));
      } catch {
        // ignore
      }

      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    setName('');
    setStoreName('');
    setContact('');
    setComment('');
    setCategory('Fitur Baru');
    setSubmitted(false);
  };

  // Pre-fill WhatsApp message for direct developer contact
  const waMessage = encodeURIComponent(
    `Halo Pengembang CampRent POS,\n\nNama: ${name || 'Pengguna'}\nToko: ${storeName || '-'}\nKategori: ${category}\n\nSaran/Masukan:\n"${comment}"\n\n(Dikirim via website camp-rent-web.vercel.app)`
  );

  return (
    <section id="faq" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 md:space-y-12">
        
        {/* 1. TOP SECTION: PERTANYAAN YANG SERING DIAJUKAN (FULL WIDTH) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200/60 shadow-xs">
                <MessageSquare className="w-5 h-5 text-emerald-800" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black tracking-wider uppercase text-zinc-950">
                  Pertanyaan yang Sering Diajukan
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                  Temukan jawaban untuk pertanyaan yang paling sering ditanyakan seputar CampRent POS.
                </p>
              </div>
            </div>

            <div className="self-start sm:self-auto shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 text-zinc-700 text-xs font-bold shadow-xs">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>6 Topik Terjawab</span>
              </span>
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const IconComp = faq.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'bg-emerald-50/25 border-emerald-300 shadow-xs'
                      : 'bg-white border-zinc-200/90 hover:border-zinc-300 shadow-xs'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <IconComp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-zinc-950">
                        {faq.q}
                      </span>
                    </div>
                    <div className={`p-1.5 rounded-full shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-800' : 'text-zinc-400'}`}>
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 pl-16 sm:pl-18 text-xs sm:text-sm text-zinc-600 leading-relaxed animate-fadeIn">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. MIDDLE BANNER: CAMPRENT POS BRAND CARD (FULL WIDTH) */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-zinc-950 to-emerald-950 text-white p-6 sm:p-7 border border-emerald-900/60 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Subtle mountain background */}
          <div className="absolute -bottom-2 left-0 right-0 pointer-events-none z-0">
            <MountainSilhouette opacity="0.08" className="w-full text-emerald-400" />
          </div>
          <div className="absolute top-0 right-1/4 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Brand Details */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left flex-1">
            {/* App Icon Box */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-900 border-2 border-emerald-500/40 p-1 flex items-center justify-center shrink-0 shadow-xl">
              <img
                src="/image/camprent_logo.jpg"
                alt="CampRent Logo"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  CampRent POS
                </h3>
                <span className="text-[10px] font-bold bg-emerald-900/90 text-emerald-300 border border-emerald-700/60 px-2.5 py-0.5 rounded-full">
                  v1.1.5-stable
                </span>
              </div>

              <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed font-normal">
                Aplikasi kasir &amp; manajemen persewaan tenda serta perlengkapan outdoor terlengkap. Siap bekerja tanpa koneksi internet di basecamp maupun toko kota.
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1 text-[11px]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300">
                  <span>🏕️</span>
                  <span>Khusus Rental Outdoor</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300">
                  <span>📶</span>
                  <span>Offline-First SQLite</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300">
                  <span>⭐</span>
                  <span>Bebas Biaya Bulanan</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM SECTION: 2-COLUMN GRID (FEEDBACK FORM & COMMUNITY REVIEWS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Beri Saran / Request Fitur (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-sm space-y-4">
            
            {/* Form Header */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <MessageSquarePlus className="w-3.5 h-3.5 text-emerald-700" />
                <span>Kotak Masukan &amp; Ide</span>
              </div>
              <h3 className="text-xl font-extrabold text-zinc-950 tracking-tight">
                Beri Saran / Request Fitur
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Punya ide aturan sewa baru, format struk, atau kendala di toko Anda? Tuliskan di sini:
              </p>
            </div>

            {submitted ? (
              /* Success Feedback Card */
              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-300 shadow-xs space-y-3.5 text-center animate-fadeIn">
                <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-zinc-950">Masukan Berhasil Dikirim!</h4>
                  <p className="text-xs text-zinc-600">
                    Terima kasih, <strong>{name}</strong>. Saran Anda sangat berarti untuk rilis pembaruan CampRent POS berikutnya.
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/?text=${waMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Kirim Salinan via WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="w-full py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold text-xs transition-colors"
                  >
                    Tulis Masukan Lain
                  </button>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmitComment} className="space-y-4">
                
                {/* Category Selection Pills */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider">
                    Kategori Masukan:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Fitur Baru', icon: Star },
                      { label: 'Lapor Bug', icon: Bug },
                      { label: 'Saran Umum', icon: MessageSquare }
                    ].map((cat) => {
                      const IconCat = cat.icon;
                      const isSelected = category === cat.label;
                      return (
                        <button
                          key={cat.label}
                          type="button"
                          onClick={() => setCategory(cat.label)}
                          className={`py-2 px-2 rounded-full text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                              : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
                          }`}
                        >
                          <IconCat className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-zinc-500'}`} />
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Store Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1">
                      Nama Anda <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Rian"
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white border border-zinc-200 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none transition-all"
                      />
                      <User className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1">
                      Nama Toko Rental
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="Contoh: Bromo Camp"
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white border border-zinc-200 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none transition-all"
                      />
                      <Store className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
                    </div>
                  </div>
                </div>

                {/* WhatsApp / Email Optional */}
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    No. WhatsApp / Email <span className="text-zinc-400 font-normal">(opsional, untuk dihubungi)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="Contoh: 0812-xxxx-xxxx"
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white border border-zinc-200 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none transition-all"
                    />
                    <Phone className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                {/* Comment Textarea */}
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    Saran / Masukan Toko Anda <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tuliskan saran penambahan fitur, kendala nota struk, atau aturan persewaan alat outdoor..."
                    className="w-full p-3 text-xs rounded-xl bg-white border border-zinc-200 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-900 hover:bg-emerald-800 disabled:bg-zinc-400 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99] shadow-md shadow-emerald-950/20 cursor-pointer"
                >
                  {submitting ? (
                    <span>Mengirim Masukan...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim Saran &amp; Masukan</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

          {/* RIGHT: Diskusi & Masukan Rental (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-sm space-y-4">
            
            {/* Header Feed */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100/90 text-emerald-800 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4.5 h-4.5 text-emerald-800" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-zinc-950">
                    Diskusi &amp; Masukan Rental
                  </h4>
                  <p className="text-[11px] text-zinc-500">
                    Pengalaman, kendala &amp; ide pengembangan dari pemilik toko.
                  </p>
                </div>
              </div>

              <div className="self-start sm:self-auto shrink-0">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{commentList.length} komentar Aktif</span>
                </span>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari saran, nama, atau toko rental..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-zinc-50 border border-zinc-200 focus:border-emerald-700 focus:bg-white focus:ring-1 focus:ring-emerald-700 outline-none transition-all"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills (Horizontal Scroll) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
              {[
                { label: 'Semua', count: commentList.length },
                { label: 'Fitur Baru', count: commentList.filter(c => c.category === 'Fitur Baru').length },
                { label: 'Lapor Bug', count: commentList.filter(c => c.category === 'Lapor Bug').length },
                { label: 'Aturan Rental', count: commentList.filter(c => c.category === 'Aturan Rental').length },
                { label: 'Kendala', count: commentList.filter(c => c.category.includes('Kendala')).length },
                { label: 'Saran Umum', count: commentList.filter(c => c.category === 'Saran Umum').length }
              ].map((cat) => {
                const isActive = (selectedCategoryFilter === 'Semua' && cat.label === 'Semua') ||
                  (cat.label === 'Kendala' && selectedCategoryFilter === 'Kendala Teknis') ||
                  selectedCategoryFilter === cat.label;

                return (
                  <button
                    key={cat.label}
                    onClick={() => {
                      if (cat.label === 'Kendala') {
                        setSelectedCategoryFilter('Kendala Teknis');
                      } else {
                        setSelectedCategoryFilter(cat.label);
                      }
                    }}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-900 text-white shadow-xs'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 border border-zinc-200/60'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-700'}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Comments List */}
            <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1">
              {(() => {
                const filtered = commentList.filter(item => {
                  let matchCategory = false;
                  if (selectedCategoryFilter === 'Semua') {
                    matchCategory = true;
                  } else if (selectedCategoryFilter === 'Kendala Teknis') {
                    matchCategory = item.category.includes('Kendala');
                  } else {
                    matchCategory = item.category === selectedCategoryFilter;
                  }

                  const matchSearch = !searchQuery.trim() || 
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (item.storeName && item.storeName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    item.comment.toLowerCase().includes(searchQuery.toLowerCase());
                  return matchCategory && matchSearch;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="py-8 text-center space-y-2">
                      <MessageSquare className="w-8 h-8 text-zinc-300 mx-auto" />
                      <p className="text-xs text-zinc-500 font-medium">
                        Tidak ada komentar yang cocok dengan filter atau pencarian.
                      </p>
                      <button
                        onClick={() => { setSelectedCategoryFilter('Semua'); setSearchQuery(''); }}
                        className="text-xs text-emerald-700 font-bold hover:underline"
                      >
                        Reset Filter
                      </button>
                    </div>
                  );
                }

                return filtered.map((item) => {
                  const isReplying = activeReplyId === item.id;
                  const replies = item.replies || [];
                  const initials = item.name
                    ? item.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
                    : 'U';

                  const getCategoryStyle = (cat) => {
                    if (cat === 'Fitur Baru') {
                      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
                    }
                    if (cat === 'Lapor Bug') {
                      return 'bg-rose-50 text-rose-800 border-rose-200';
                    }
                    if (cat === 'Aturan Rental') {
                      return 'bg-purple-50 text-purple-800 border-purple-200';
                    }
                    if (cat.includes('Kendala')) {
                      return 'bg-sky-50 text-sky-800 border-sky-200';
                    }
                    return 'bg-amber-50 text-amber-800 border-amber-200';
                  };

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all text-xs space-y-2.5 shadow-xs"
                    >
                      {/* Comment Header: Avatar, Name, Category Badge, Time */}
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 font-extrabold flex items-center justify-center text-xs shrink-0">
                          {initials}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className="font-extrabold text-zinc-950 text-sm leading-tight">
                                {item.name}
                              </h5>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getCategoryStyle(item.category)}`}>
                                {item.category}
                              </span>
                            </div>

                            <span className="text-[11px] text-zinc-400 shrink-0">
                              {item.date}
                            </span>
                          </div>

                          <p className="text-[11px] text-emerald-800 font-medium flex items-center gap-1 mt-0.5">
                            <Store className="w-3 h-3 text-emerald-700 shrink-0" />
                            <span className="truncate">{item.storeName}</span>
                          </p>
                        </div>
                      </div>

                      {/* Comment Body */}
                      <p className="text-zinc-700 text-xs leading-relaxed pl-12">
                        {item.comment}
                      </p>

                      {/* Threaded Replies */}
                      {replies.length > 0 && (
                        <div className="pl-12 space-y-2">
                          {replies.map((rep) => (
                            <div
                              key={rep.id}
                              className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-200/90 text-xs space-y-1.5"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5 font-extrabold text-emerald-950 text-xs">
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                                  <span>{rep.author}</span>
                                  <span className="text-[9px] bg-emerald-200 text-emerald-950 px-1.5 py-0.2 rounded font-black uppercase tracking-wider">
                                    Resmi
                                  </span>
                                </div>
                                <span className="text-[10px] text-zinc-400">{rep.date}</span>
                              </div>
                              <p className="text-zinc-800 text-xs leading-relaxed">
                                {rep.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Bar (Right-aligned Tanggapi button) */}
                      <div className="flex items-center justify-end pt-1">
                        <button
                          onClick={() => {
                            if (isReplying) {
                              setActiveReplyId(null);
                            } else {
                              setActiveReplyId(item.id);
                              setReplyText('');
                            }
                          }}
                          className="inline-flex items-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-950 text-xs py-1 px-2.5 rounded-lg hover:bg-emerald-50 transition-colors"
                        >
                          <Reply className="w-3.5 h-3.5" />
                          <span>{isReplying ? 'Tutup Balasan' : 'Tanggapi'}</span>
                          {replies.length > 0 && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-900 px-1.5 py-0.2 rounded-full font-extrabold">
                              {replies.length}
                            </span>
                          )}
                        </button>
                      </div>

                      {/* Inline Reply Form */}
                      {isReplying && (
                        <div className="p-3 sm:p-4 rounded-2xl bg-zinc-50 border-2 border-emerald-300 shadow-sm space-y-2.5 animate-fadeIn">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-zinc-900 flex items-center gap-1.5">
                              <CornerDownRight className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Tulis Tanggapan untuk <strong>{item.name}</strong></span>
                            </span>
                            <button
                              onClick={() => setActiveReplyId(null)}
                              className="text-zinc-400 hover:text-zinc-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-zinc-600 mb-0.5">
                              Menanggapi Sebagai:
                            </label>
                            <input
                              type="text"
                              value={replyAuthor}
                              onChange={(e) => setReplyAuthor(e.target.value)}
                              placeholder="Contoh: CampRent Developer (Official) / Admin Toko"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-zinc-200 focus:border-emerald-700 outline-none font-semibold text-zinc-800"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-zinc-600 mb-0.5">
                              Pesan Tanggapan / Solusi:
                            </label>
                            <textarea
                              rows={2}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder={`Halo ${item.name}, terima kasih masukannya...`}
                              className="w-full p-2.5 text-xs rounded-xl bg-white border border-zinc-200 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none resize-none transition-all"
                            />
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-0.5">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveReplyId(null);
                                setReplyText('');
                              }}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 hover:bg-zinc-200 transition-colors"
                            >
                              Batal
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReplySubmit(item.id)}
                              disabled={!replyText.trim()}
                              className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 disabled:bg-zinc-300 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
                            >
                              <Send className="w-3 h-3" />
                              <span>Kirim Tanggapan</span>
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                });
              })()}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
