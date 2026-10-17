import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

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

  return (
    <section id="faq" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 stroke-[2] text-emerald-700" />
            <span>Pusat Bantuan</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            FAQ — Pertanyaan yang Sering Diajukan
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600">
            Informasi lengkap seputar operasional dan sistem keamanan aplikasi.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-12 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-emerald-50/40 border-emerald-300 shadow-sm'
                    : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className={`text-xs sm:text-sm font-bold ${isOpen ? 'text-emerald-950' : 'text-zinc-800'}`}>
                    {faq.q}
                  </span>
                  <div className={`p-1 rounded-full shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-800 bg-emerald-100' : 'text-zinc-500'}`}>
                    <ChevronDown className="w-4 h-4 stroke-[2]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-zinc-600 leading-relaxed border-t border-emerald-100 animate-fadeIn font-normal">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
