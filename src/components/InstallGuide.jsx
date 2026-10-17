import React from 'react';
import { Download, ToggleRight, CheckCircle2, ShieldAlert, Smartphone } from 'lucide-react';

export default function InstallGuide() {
  const steps = [
    {
      step: '01',
      title: 'Langkah 1 — Unduh File APK',
      subtitle: 'Melalui Browser Android',
      description: 'Klik tombol "Download APK" di atas menggunakan Google Chrome atau browser bawaan perangkat Android Anda.',
      detail: 'File instalasi bernama "camprent_V1.1.apk" (atau v1.0.0) berukuran ~28.9 MB akan diunduh ke folder Downloads ponsel.',
      icon: Download,
      badge: 'Proses Cepat'
    },
    {
      step: '02',
      title: 'Langkah 2 — Izinkan Sumber Tak Dikenal',
      subtitle: 'Prosedur Standar Android',
      description: 'Jika muncul dialog keamanan sistem "File ini mungkin berbahaya" atau sumber tidak dikenal:',
      detail: 'Pilih "Tetap Unduh" -> "Buka Pengaturan" -> Aktifkan toggle switch "Izinkan dari sumber ini" untuk peramban Anda.',
      icon: ToggleRight,
      badge: 'Verifikasi Sistem'
    },
    {
      step: '03',
      title: 'Langkah 3 — Pasang & Buka Aplikasi',
      subtitle: 'Siap Bertransaksi',
      description: 'Ketuk berkas pada notifikasi unduhan atau buka file manager perangkat Anda, lalu tekan tombol "Instal".',
      detail: 'Setelah proses pemasangan selesai, buka aplikasi CampRent POS dan toko rental Anda langsung siap beroperasi.',
      icon: CheckCircle2,
      badge: 'Selesai'
    }
  ];

  return (
    <section id="panduan" className="py-20 md:py-28 bg-zinc-50/70 border-y border-zinc-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-sm">
            <Smartphone className="w-3.5 h-3.5 stroke-[2] text-emerald-700" />
            <span>Petunjuk Pemasangan</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Panduan 3 Langkah Instalasi di <span className="text-emerald-700">Android</span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600">
            Cara memasang file instalasi APK CampRent POS pada perangkat smartphone atau tablet toko Anda.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((st, idx) => {
            const IconComp = st.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200 hover:border-emerald-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Top Step Number & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-extrabold text-emerald-900/20 font-mono">
                      {st.step}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {st.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mb-4">
                    <IconComp className="w-5 h-5 stroke-[1.8]" />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-base font-bold text-zinc-950">
                    {st.title}
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold mb-3">
                    {st.subtitle}
                  </p>

                  <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                    {st.description}
                  </p>

                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-[11px] text-zinc-700 leading-relaxed font-medium">
                    {st.detail}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center text-xs font-bold text-emerald-700">
                  <span>Tahap {st.step} Selesai</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Alert Note Explanation */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5 stroke-[2]" />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-zinc-900 text-sm">
              Mengenai Notifikasi Keamanan Android
            </h4>
            <p className="text-zinc-600 leading-relaxed">
              Peringatan tersebut adalah mekanisme perlindungan standar pada Android setiap kali memasang file installer (.APK) di luar Google Play Store. Berkas CampRent POS telah ditandatangani secara resmi (*signed release*), bebas iklan berbahaya, dan tidak mengakses data privat perangkat Anda.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
