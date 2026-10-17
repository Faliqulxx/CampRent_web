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
  AlertTriangle 
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

  // Initial community comments
  const defaultComments = [
    {
      id: 1,
      name: 'Rian Pratama',
      storeName: 'Bromo Trek Outdoor (Malang)',
      category: 'Fitur Baru',
      comment: 'Saran untuk update versi depan, tolong tambahkan opsi cetak label barcode stiker untuk ditempel langsung di tiang tenda & carrier.',
      date: '2 jam yang lalu'
    },
    {
      id: 2,
      name: 'Aris Setiawan',
      storeName: 'Puncak Raya Camping (Bogor)',
      category: 'Saran Umum',
      comment: 'Fitur offline dan shift kasirnya sangat membantu toko kami saat sinyal gunung lemot. Sangat ditunggu rilis fitur sinkron multi-cabangnya!',
      date: '1 hari yang lalu'
    },
    {
      id: 3,
      name: 'Dimas Kurnia',
      storeName: 'Sindoro Gear Rental (Wonosobo)',
      category: 'Aturan Rental',
      comment: 'Bagus sekali ada denda cuci alat otomatis saat inspeksi alat kotor. Kasir jadi nggak perlu debat manual sama penyewa.',
      date: '3 hari yang lalu'
    }
  ];

  const [commentList, setCommentList] = useState(defaultComments);

  // Load saved comments from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('camprent_feedbacks');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCommentList([...parsed, ...defaultComments]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const faqs = [
    {
      q: 'Apakah aplikasi ini benar-benar gratis?',
      a: 'Ya, aplikasi ini gratis digunakan. Anda dapat mengunduh dan menggunakannya untuk toko persewaan Anda tanpa biaya langganan bulanan, serta tanpa iklan pada antarmuka kasir.'
    },
    {
      q: 'Apakah data toko saya bisa dilihat oleh pemilik toko rental lain?',
      a: 'Tidak. CampRent POS menerapkan arsitektur isolasi data setara standar Row Level Security (RLS). Seluruh catatan transaksi, data identitas jaminan pelanggan, dan laporan kas toko Anda terisolasi penuh dan tidak dapat diakses pihak lain.'
    },
    {
      q: 'Apakah kasir bisa menghapus data produk atau melihat keuntungan toko?',
      a: 'Tidak bisa. Hak akses akun kasir dan akun Owner dipisahkan secara ketat. Akun kasir hanya memiliki wewenang operasional transaksi, cek stok, dan inspeksi pengembalian. Pengaturan toko, manipulasi harga/produk, dan laporan laba hanya dapat dibuka oleh akun Owner.'
    },
    {
      q: 'Bagaimana jika koneksi internet di toko rental saya mati mendadak?',
      a: 'CampRent POS bekerja dengan arsitektur Offline-First menggunakan database lokal SQLite di perangkat Android. Anda tetap dapat memproses booking sewa dan pengembalian saat offline. Begitu internet aktif kembali, sinkronisasi cloud berjalan otomatis.'
    },
    {
      q: 'Printer kasir apa saja yang didukung oleh CampRent POS?',
      a: 'Mendukung printer thermal kasir standar ukuran kertas 58mm dan 80mm dengan konektivitas Bluetooth, USB, maupun jaringan via protokol ESC/POS (termasuk printer saku portable Bluetooth serta mesin POS terintegrasi).'
    },
    {
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
        date: 'Baru saja'
      };

      const updated = [newEntry, ...commentList];
      setCommentList(updated);

      try {
        const stored = JSON.parse(localStorage.getItem('camprent_feedbacks') || '[]');
        localStorage.setItem('camprent_feedbacks', JSON.stringify([newEntry, ...stored]));
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 stroke-[2] text-emerald-700" />
            <span>Pusat Bantuan &amp; Diskusi Komunitas</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            FAQ &amp; Kotak Masukan Rental
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600">
            Pelajari pertanyaan umum seputar sistem atau sampaikan kebutuhan khusus toko rental outdoor Anda langsung kepada kami.
          </p>
        </div>

        {/* 2-Column Grid: Left FAQ, Right Feedback/Comment Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: FAQ Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-700" />
                <span>Pertanyaan yang Sering Diajukan</span>
              </h3>
              <span className="text-[11px] text-zinc-500 font-medium">
                {faqs.length} Topik Terjawab
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isOpen
                        ? 'bg-emerald-50/40 border-emerald-300 shadow-sm ring-1 ring-emerald-200/50'
                        : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className={`text-xs sm:text-sm font-bold ${isOpen ? 'text-emerald-950' : 'text-zinc-800'}`}>
                        {faq.q}
                      </span>
                      <div className={`p-1 rounded-full shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-800 bg-emerald-100' : 'text-zinc-500'}`}>
                        <ChevronDown className="w-4 h-4 stroke-[2]" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-zinc-600 leading-relaxed border-t border-emerald-100/80 animate-fadeIn font-normal">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CampRent Logo Brand Card filling the empty space */}
            <div className="mt-5 rounded-3xl bg-gradient-to-br from-emerald-950 via-zinc-950 to-zinc-900 text-white p-6 sm:p-7 border border-emerald-900/50 shadow-xl relative overflow-hidden">
              
              {/* Subtle mountain background */}
              <div className="absolute -bottom-2 left-0 right-0 pointer-events-none z-0">
                <MountainSilhouette opacity="0.08" className="w-full text-emerald-400" />
              </div>

              {/* Decorative radial glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                {/* Official Logo with glowing border */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-xl shadow-emerald-950/60 bg-zinc-900 flex items-center justify-center p-1 bg-white/5">
                    <img
                      src="/image/camprent_logo.jpg"
                      alt="CampRent Official Logo"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-zinc-950 font-black text-[9px] uppercase tracking-wider shadow">
                    Official
                  </div>
                </div>

                {/* Brand description & pills */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-base sm:text-lg font-black text-white tracking-tight">
                      CampRent <span className="text-emerald-400 font-extrabold">POS</span>
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded-full">
                      v1.0.0 Stable
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    Aplikasi kasir &amp; manajemen persewaan tenda serta perlengkapan outdoor terlengkap. Siap bekerja tanpa koneksi internet di basecamp maupun toko kota.
                  </p>

                  <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 pt-1 text-[11px]">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300">
                      🏕️ Khusus Rental Outdoor
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300">
                      📶 Offline-First SQLite
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300">
                      🏷️ Bebas Biaya Bulanan
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom quick CTA link */}
              <div className="relative z-10 pt-4 mt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-zinc-400 text-[11px]">
                  Siap beralih dari pencatatan manual?
                </span>
                <button
                  onClick={onDownloadClick ? onDownloadClick : () => {
                    const downloadEl = document.getElementById('download');
                    if (downloadEl) downloadEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 border border-amber-500/40 hover:bg-zinc-800 text-amber-300 font-bold text-xs transition-all shadow-md active:scale-[0.98]"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Status APK (Sedang Perbaikan)</span>
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT: Comment / Feedback Form & Community Feed (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Form Card */}
            <div className="bg-zinc-50/80 rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/60 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8" />

              <div className="relative z-10 space-y-4">
                
                {/* Form Header */}
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 text-[11px] font-bold">
                    <MessageSquarePlus className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Kotak Masukan &amp; Ide</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-zinc-950">
                    Beri Saran / Request Fitur
                  </h3>
                  <p className="text-xs text-zinc-600">
                    Punya ide aturan sewa baru, format struk, atau kendala di toko Anda? Tuliskan di sini:
                  </p>
                </div>

                {submitted ? (
                  /* Success Feedback Card */
                  <div className="p-5 rounded-2xl bg-white border border-emerald-300 shadow-sm space-y-3.5 text-center animate-fadeIn">
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
                  /* Interactive Feedback Form */
                  <form onSubmit={handleSubmitComment} className="space-y-3.5">
                    
                    {/* Category Selection Pills */}
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                        Kategori Masukan:
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { label: 'Fitur Baru', icon: '💡' },
                          { label: 'Lapor Bug', icon: '🛠️' },
                          { label: 'Saran Umum', icon: '💬' }
                        ].map((cat) => (
                          <button
                            key={cat.label}
                            type="button"
                            onClick={() => setCategory(cat.label)}
                            className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all flex items-center justify-center gap-1 ${
                              category === cat.label
                                ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                                : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
                            }`}
                          >
                            <span>{cat.icon}</span>
                            <span>{cat.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Store Input */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                          Nama Anda <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Contoh: Rian"
                            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white border border-zinc-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-all"
                          />
                          <User className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                          Nama Toko Rental
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            placeholder="Contoh: Bromo Camp"
                            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white border border-zinc-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-all"
                          />
                          <Store className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp / Email Optional */}
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                        No. WhatsApp / Email <span className="text-zinc-400 font-normal">(opsional, untuk dihubungi)</span>
                      </label>
                      <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Contoh: 0812-xxxx-xxxx"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-zinc-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-all"
                      />
                    </div>

                    {/* Comment Textarea */}
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                        Saran / Masukan Toko Anda <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tuliskan saran penambahan fitur, kendala nota struk, atau aturan persewaan alat outdoor..."
                        className="w-full p-3 text-xs rounded-xl bg-white border border-zinc-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-zinc-400 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99] shadow-md shadow-emerald-950/20"
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
            </div>

            {/* Recent Community Feedback Feed */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Saran dari Pemilik Rental Lain</span>
                </span>
                <span className="text-[10px] text-zinc-400 font-semibold">
                  Komunitas Aktif
                </span>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {commentList.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-emerald-200 transition-colors text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-bold text-zinc-900 truncate">
                        {item.name}
                        {item.storeName && (
                          <span className="ml-1 text-[11px] font-normal text-emerald-700">
                            • {item.storeName}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100/70 text-emerald-800 font-semibold shrink-0">
                        {item.category}
                      </span>
                    </div>

                    <p className="text-zinc-600 text-[11px] leading-relaxed">
                      "{item.comment}"
                    </p>

                    <div className="flex items-center gap-1 text-[10px] text-zinc-400">
                      <Clock className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
