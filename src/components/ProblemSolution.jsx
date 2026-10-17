import React, { useState } from 'react';
import { Calendar, IdCard, Sparkles, MessageCircle, Clock, Wallet, CheckCircle2, XCircle, ArrowRight, ShieldAlert } from 'lucide-react';

export default function ProblemSolution() {
  const [activeTab, setActiveTab] = useState('all');

  const comparisonData = [
    {
      id: 1,
      title: 'Perhitungan Durasi Sewa',
      problem: 'Hanya menghitung barang keluar-masuk (jual putus) seperti retail biasa.',
      problemDetail: 'Kasir minimarket tidak memiliki pemahaman tanggal sewa vs tanggal pengembalian.',
      solution: 'Menghitung durasi sewa harian otomatis berdasarkan tanggal ambil & kembali.',
      solutionDetail: 'Kalkulasi otomatis hitungan 2 hari, 3 hari, atau seminggu tanpa kesalahan manual.',
      icon: Calendar,
      tag: 'Kalkulasi Otomatis'
    },
    {
      id: 2,
      title: 'Pencatatan Jaminan Fisik & Deposit',
      problem: 'Tidak ada kolom pencatatan identitas jaminan dan deposit tunai.',
      problemDetail: 'Staff rentan lupa mencatat KTP yang disimpan atau berapa nominal deposit di laci.',
      solution: 'Fitur rekam Jaminan Fisik (KTP/SIM/KTM/Paspor) & Deposit Tunai terintegrasi.',
      solutionDetail: 'Status dokumen jaminan yang dipegang toko terpantau jelas di sistem hingga barang kembali.',
      icon: IdCard,
      tag: 'Kontrol Jaminan'
    },
    {
      id: 3,
      title: 'Inspeksi Barang Kotor / Rusak',
      problem: 'Kebingungan saat barang kembali berlumuran lumpur atau ada bagian sobek.',
      problemDetail: 'Kasir ragu menagih denda karena tidak ada standar tarif cuci atau penggantian unit.',
      solution: 'Modal Inspeksi Pengembalian Fisik: Denda cuci, servis, & ganti unit otomatis.',
      solutionDetail: 'Otomatis memotong uang deposit yang dipegang kasir secara objektif dan transparan.',
      icon: Sparkles,
      tag: 'Inspeksi & Denda'
    },
    {
      id: 4,
      title: 'Penagihan Pelanggan Telat (Overdue)',
      problem: 'Sulit melacak siapa saja pelanggan yang melewati tenggat sewa.',
      problemDetail: 'Harus membongkar buku manual untuk mencari kontak telepon satu per satu.',
      solution: 'Indikator visual Overdue terdeteksi otomatis dengan tombol WhatsApp langsung.',
      solutionDetail: 'Sistem memformat template pengingat dengan nomor nota dan rincian denda hari.',
      icon: Clock,
      tag: 'WhatsApp Langsung'
    },
    {
      id: 5,
      title: 'Audit Kasir & Rekonsiliasi Kas',
      problem: 'Kasir sering selisih uang tunai di laci saat pergantian jam kerja.',
      problemDetail: 'Tidak ada pencatatan modal awal dan tidak jelas uang tunai terpakai untuk pos apa.',
      solution: 'Sistem Shift Kasir: Wajib modal awal & audit rekonsiliasi tutup shift.',
      solutionDetail: 'Sistem memvalidasi kecocokan kas fisik vs sistem (Kas Sesuai, Lebih, atau Kurang).',
      icon: Wallet,
      tag: 'Audit Kasir'
    },
  ];

  return (
    <section id="solusi" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-sm">
            <ShieldAlert className="w-3.5 h-3.5 stroke-[2] text-emerald-700" />
            <span>Tantangan Bisnis Rental</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Kasir Retail Biasa vs Solusi <span className="text-emerald-700">CampRent POS</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Bisnis sewa outdoor memiliki alur unik: barang keluar untuk kembali, perhitungan hari, jaminan identitas, deposit, denda cuci, hingga resiko keterlambatan.
          </p>

          {/* Filter Pills */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'all'
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-600 border border-zinc-200 hover:text-zinc-950'
              }`}
            >
              Semua Perbandingan
            </button>
            <button
              onClick={() => setActiveTab('problems')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'problems'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-600 border border-zinc-200 hover:text-zinc-950'
              }`}
            >
              Kelemahan Kasir Biasa
            </button>
            <button
              onClick={() => setActiveTab('solutions')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'solutions'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-600 border border-zinc-200 hover:text-emerald-800'
              }`}
            >
              Solusi CampRent POS
            </button>
          </div>
        </div>

        {/* Comparison Cards Grid */}
        <div className="mt-14 space-y-3.5">
          {comparisonData.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="rounded-2xl p-5 md:p-6 bg-white border border-zinc-200 hover:border-emerald-300 transition-all shadow-sm hover:shadow-md"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  
                  {/* Category Title & Icon */}
                  <div className="lg:col-span-3 flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                      <IconComponent className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                        {item.tag}
                      </span>
                      <h3 className="text-sm font-bold text-zinc-900">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Problem Column */}
                  {(activeTab === 'all' || activeTab === 'problems') && (
                    <div className={`${activeTab === 'all' ? 'lg:col-span-4' : 'lg:col-span-9'} p-4 rounded-xl bg-zinc-50 border border-zinc-200`}>
                      <div className="flex items-center gap-1.5 text-zinc-600 text-xs font-semibold mb-1">
                        <XCircle className="w-4 h-4 text-zinc-500 shrink-0" />
                        <span>Kelemahan Kasir Retail Biasa</span>
                      </div>
                      <p className="text-xs text-zinc-800 font-semibold">
                        {item.problem}
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-1">
                        {item.problemDetail}
                      </p>
                    </div>
                  )}

                  {/* Arrow for desktop */}
                  {activeTab === 'all' && (
                    <div className="hidden lg:flex lg:col-span-1 justify-center text-zinc-400">
                      <ArrowRight className="w-4 h-4 stroke-[2]" />
                    </div>
                  )}

                  {/* Solution Column */}
                  {(activeTab === 'all' || activeTab === 'solutions') && (
                    <div className={`${activeTab === 'all' ? 'lg:col-span-4' : 'lg:col-span-9'} p-4 rounded-xl bg-zinc-950 text-white border border-zinc-800 shadow-sm`}>
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Solusi CampRent POS</span>
                      </div>
                      <p className="text-xs text-white font-semibold">
                        {item.solution}
                      </p>
                      <p className="text-[11px] text-zinc-300 mt-1">
                        {item.solutionDetail}
                      </p>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
