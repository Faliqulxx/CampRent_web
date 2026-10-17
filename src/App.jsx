import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StoreShowcase from './components/StoreShowcase';
import ProblemSolution from './components/ProblemSolution';
import GeneralFeatures from './components/GeneralFeatures';
import RoleShowcase from './components/RoleShowcase';
import ComparisonTable from './components/ComparisonTable';
import DownloadSection from './components/DownloadSection';
import InstallGuide from './components/InstallGuide';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ScreenshotModal from './components/ScreenshotModal';
import MaintenanceModal from './components/MaintenanceModal';

export default function App() {
  // Status maintenance telah dibuka, download aktif
  const [isMaintenanceOpen, setIsMaintenanceOpen] = useState(false);

  const [modalState, setModalState] = useState({
    isOpen: false,
    imageSrc: '',
    title: '',
    subtitle: ''
  });

  const handleOpenModal = (imageSrc, title, subtitle) => {
    setModalState({
      isOpen: true,
      imageSrc,
      title,
      subtitle
    });
  };

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleDownloadClick = () => {
    // Arahkan langsung ke bagian Download APK
    const downloadElement = document.getElementById('download');
    if (downloadElement) {
      downloadElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFeedbackClick = () => {
    const faqElement = document.getElementById('faq');
    if (faqElement) {
      faqElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      {/* Navigation */}
      <Navbar onDownloadClick={handleDownloadClick} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Mountain Silhouette */}
        <Hero
          onDownloadClick={handleDownloadClick}
          onOpenModal={handleOpenModal}
        />

        {/* 2. Real Outdoor Gear Store Showcase */}
        <StoreShowcase onOpenModal={handleOpenModal} />

        {/* 3. Masalah Rental Outdoor vs Solusi CampRent */}
        <ProblemSolution />

        {/* 4. 5 Fitur Utama All-in-One POS Rental */}
        <GeneralFeatures onOpenModal={handleOpenModal} />

        {/* 5. Role Showcase: Owner vs Kasir */}
        <RoleShowcase onOpenModal={handleOpenModal} />

        {/* 6. Tabel Perbandingan Retail Biasa vs CampRent */}
        <ComparisonTable />

        {/* 7. Download APK & Spesifikasi (v1.1 & v1.0.0 Aktif) */}
        <DownloadSection onOpenChangelog={() => setIsMaintenanceOpen(true)} />

        {/* 8. Panduan 3 Langkah Instalasi */}
        <InstallGuide />

        {/* 9. FAQ & Kotak Masukan Rental */}
        <FAQ onDownloadClick={handleDownloadClick} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Full-size Screenshot Preview Lightbox Modal */}
      <ScreenshotModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        imageSrc={modalState.imageSrc}
        title={modalState.title}
        subtitle={modalState.subtitle}
      />

      {/* Popup Besar Saat Web Dibuka: Info APK Sedang Dalam Perbaikan & Penambahan Fitur */}
      <MaintenanceModal
        isOpen={isMaintenanceOpen}
        onClose={() => setIsMaintenanceOpen(false)}
        onFeedbackClick={handleFeedbackClick}
      />
    </div>
  );
}
