import React from 'react';
import { Store, ShieldCheck, Check, Layers, HardDrive, Smartphone, Sparkles } from 'lucide-react';
import MountainSilhouette from './MountainSilhouette';

export default function StoreShowcase({ onOpenModal }) {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden border-b border-zinc-200/80">
      
      {/* Mountain silhouette background */}
      <div className="absolute -bottom-2 left-0 right-0 z-0">
        <MountainSilhouette opacity="0.04" className="w-full text-zinc-950" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-semibold shadow-sm">
            <Store className="w-3.5 h-3.5 stroke-[2] text-zinc-700" />
            <span>Operasional Nyata Toko Outdoor</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Dirancang dari Kebutuhan Nyata <span className="text-zinc-500 font-light">Toko Rental Alat Pendakian</span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            Dari persewaan tenda di lereng gunung hingga basecamp petualangan, CampRent POS memastikan setiap unit carrier, sleeping bag, kompor, dan jaminan KTP tercatat tanpa selisih.
          </p>
        </div>

        {/* Big Store Showcase Image with Callouts */}
        <div className="mt-12 relative max-w-5xl mx-auto">
          
          {/* Main Photo Frame */}
          <div 
            onClick={() => onOpenModal('/image/outdoor_rental_store.jpg', 'Toko Rental Perlengkapan Camping & Pendakian', 'Interior toko rental outdoor modern dengan display tenda, carrier, dan meja kasir POS')}
            className="relative rounded-3xl overflow-hidden border border-zinc-200 shadow-xl cursor-pointer group bg-zinc-100 aspect-[16/9]"
          >
            <img
              src="/image/outdoor_rental_store.jpg"
              alt="Toko Rental Alat Pendakian Outdoor"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

            {/* Hover preview pill */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-zinc-900 border border-zinc-200 shadow-md flex items-center gap-1.5">
              <span>Klik untuk Perbesar Foto Toko</span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-700">
                  Simulasi Suasana Operasional
                </span>
                <h3 className="text-lg sm:text-2xl font-bold mt-1 text-white">
                  Kenyamanan Kasir &amp; Kepuasan Pendaki
                </h3>
                <p className="text-xs text-zinc-200/90 max-w-xl mt-0.5 hidden sm:block">
                  Antarmuka kasir cepat mengurangi waktu tunggu pelanggan saat ramai di akhir pekan.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30 text-white">
                  Dukungan Offline-Ready
                </span>
              </div>
            </div>

          </div>

          {/* 3 Value Pillars Below Image */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-950 text-white flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-950">Rak Tenda &amp; Carrier</h4>
                <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                  Stok barang fisik di rak langsung sinkron dengan katalog 2-kolom layar tablet kasir.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-950 text-white flex items-center justify-center shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-950">Meja Kasir &amp; POS Tablet</h4>
                <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                  Transaksi tetap berjalan normal meskipun listrik mati atau tanpa jangkauan sinyal internet.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-950 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-950">Brankas KTP &amp; Deposit</h4>
                <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                  Identitas penyewa dan deposit uang tunai terkunci aman dalam pencatatan sistem hingga alat kembali.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
