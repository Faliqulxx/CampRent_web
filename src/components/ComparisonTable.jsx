import React from 'react';
import { Check, X, Minus, Scale } from 'lucide-react';

export default function ComparisonTable() {
  const comparisonRows = [
    {
      feature: 'Hitung Durasi Sewa per Tanggal',
      description: 'Menghitung durasi harian berdasarkan tanggal ambil dan rencana pengembalian.',
      regularPOS: 'Hanya per unit jual putus retail (tanpa durasi)',
      regularStatus: 'cross',
      camprentPOS: 'Otomatis & Fleksibel',
      camprentDetail: 'Otomatis hitung kelipatan hari & jam pengembalian.',
      camprentStatus: 'check'
    },
    {
      feature: 'Catat Nomor KTP / SIM Jaminan',
      description: 'Pencatatan jaminan fisik identitas pelanggan penyewa.',
      regularPOS: 'Tidak ada kolom pencatatan identitas',
      regularStatus: 'cross',
      camprentPOS: 'Terintegrasi Rapi',
      camprentDetail: 'Data KTP/SIM/KTM tersimpan di nota transaksi.',
      camprentStatus: 'check'
    },
    {
      feature: 'Deposit Uang & Potong Otomatis',
      description: 'Penitipan uang deposit jaminan yang dipotong saat pelunasan/denda.',
      regularPOS: 'Harus hitung manual di kalkulator terpisah',
      regularStatus: 'cross',
      camprentPOS: 'Kalkulasi Otomatis',
      camprentDetail: 'Saldo deposit otomatis memotong kekurangan biaya.',
      camprentStatus: 'check'
    },
    {
      feature: 'Denda Cuci Tenda Kotor & Kerusakan',
      description: 'Standarisasi tarif denda saat pengembalian barang rusak atau kotor.',
      regularPOS: 'Tidak tersedia menu inspeksi fisik alat',
      regularStatus: 'cross',
      camprentPOS: 'Inspeksi per Unit',
      camprentDetail: 'Form inspeksi bersih, denda cuci, atau ganti unit.',
      camprentStatus: 'check'
    },
    {
      feature: 'Operasional Tetap Jalan Tanpa Internet',
      description: 'Kemampuan transaksi kasir saat jaringan GSM/WiFi padam di pegunungan.',
      regularPOS: 'Sering macet atau transaksi gagal tersimpan',
      regularStatus: 'alert',
      camprentPOS: 'Dukungan Offline-First',
      camprentDetail: 'Bekerja lancar dengan SQLite lokal + Cloud sync.',
      camprentStatus: 'check'
    },
    {
      feature: 'Varian Ukuran (Sepatu / Sandal / Jaket)',
      description: 'Pemilihan size ukuran outdoor secara cepat di meja kasir.',
      regularPOS: 'Terlalu rumit dengan ribuan SKU retail',
      regularStatus: 'alert',
      camprentPOS: 'Sederhana & Cepat',
      camprentDetail: 'Pilihan ukuran instan dengan kontrol sisa stok.',
      camprentStatus: 'check'
    },
    {
      feature: 'Audit Buka-Tutup Shift Kasir',
      description: 'Pencatatan modal kas awal laci dan rekonsiliasi kas saat tutup shift.',
      regularPOS: 'Terkunci di paket langganan mahal bulanan',
      regularStatus: 'alert',
      camprentPOS: 'Gratis & Transparan',
      camprentDetail: 'Sudah termasuk gratis di CampRent POS.',
      camprentStatus: 'check'
    }
  ];

  return (
    <section id="perbandingan" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-sm">
            <Scale className="w-3.5 h-3.5 stroke-[2] text-emerald-700" />
            <span>Matriks Perbandingan</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Kasir Toko Biasa vs <span className="text-emerald-700">CampRent POS</span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600">
            Perbandingan objektif operasional persewaan alat camping dan gunung.
          </p>
        </div>

        {/* Table Container */}
        <div className="mt-14 overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-100/80 text-xs">
                <th className="py-4 px-6 font-bold text-zinc-800 uppercase tracking-wider w-5/12">
                  Kebutuhan Spesifik Rental Outdoor
                </th>
                <th className="py-4 px-6 font-semibold text-zinc-600 uppercase tracking-wider w-3/12 border-l border-zinc-200">
                  Aplikasi Kasir Retail Biasa
                </th>
                <th className="py-4 px-6 font-extrabold text-emerald-950 uppercase tracking-wider w-4/12 border-l border-emerald-200 bg-emerald-50">
                  CampRent POS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-xs">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/70 transition-colors">
                  
                  {/* Feature Title */}
                  <td className="py-4 px-6 text-zinc-950 font-medium">
                    <div className="font-bold text-zinc-900">{row.feature}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{row.description}</div>
                  </td>

                  {/* Regular POS */}
                  <td className="py-4 px-6 text-zinc-600 border-l border-zinc-200">
                    <div className="flex items-start gap-2">
                      {row.regularStatus === 'cross' ? (
                        <X className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      ) : (
                        <Minus className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      )}
                      <span>{row.regularPOS}</span>
                    </div>
                  </td>

                  {/* CampRent POS */}
                  <td className="py-4 px-6 text-zinc-950 border-l border-emerald-100 bg-emerald-50/30">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5 stroke-[3]" />
                      <div>
                        <span className="font-bold text-emerald-950">{row.camprentPOS}</span>
                        <div className="text-[11px] text-zinc-600 mt-0.5 font-medium">
                          {row.camprentDetail}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-950">
          <div>
            Aplikasi kasir retail pada umumnya mengenakan biaya langganan bulanan tanpa fitur sewa harian. <strong>CampRent POS gratis digunakan tanpa biaya abonemen.</strong>
          </div>
          <a
            href="#download"
            className="px-4 py-2 rounded-lg bg-emerald-700 text-white font-bold text-xs shrink-0 hover:bg-emerald-800 transition-colors shadow-sm"
          >
            Unduh Sekarang
          </a>
        </div>

      </div>
    </section>
  );
}
