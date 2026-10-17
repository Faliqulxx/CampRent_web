import React from 'react';
import { Lightbulb, ArrowUpRight, MessageSquarePlus } from 'lucide-react';

export default function FeedbackBanner() {
  return (
    <section className="py-16 md:py-20 bg-zinc-50/70 border-t border-zinc-200/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-zinc-200 shadow-xl relative overflow-hidden">
          
          {/* Subtle emerald decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-sm">
                <Lightbulb className="w-3.5 h-3.5 stroke-[2] text-emerald-700" />
                <span>Masukan &amp; Pengembangan Komunitas</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 tracking-tight">
                Punya Saran, Masukan, atau Ingin Penambahan Fitur?
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                CampRent POS terus disempurnakan berdasarkan pengalaman nyata pemilik rental outdoor di Indonesia. Jika toko Anda membutuhkan alur kerja khusus, aturan denda baru, atau integrasi perangkat tambahan, kami sangat terbuka untuk mendengar saran Anda.
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <a
                href="https://faliq-portfolio.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition-all active:scale-[0.98] shadow-md shadow-emerald-950/20 group"
              >
                <MessageSquarePlus className="w-4 h-4 stroke-[2]" />
                <span>Kirim Saran &amp; Request Fitur</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
