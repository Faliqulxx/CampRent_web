import React, { useState, useEffect } from 'react';
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
import ImageCompressorPage from './components/tools/image-compressor/ImageCompressorPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Status maintenance telah dibuka, download aktif
  const [isMaintenanceOpen, setIsMaintenanceOpen] = useState(false);

  const [modalState, setModalState] = useState({
    isOpen: false,
    imageSrc: '',
    title: '',
    subtitle: '',
  });

  const handleOpenModal = (imageSrc, title, subtitle) => {
    setModalState({
      isOpen: true,
      imageSrc,
      title,
      subtitle,
    });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleDownloadClick = () => {
    if (currentPath !== '/') {
      window.history.pushState({}, '', '/#download');
      setCurrentPath('/');
      setTimeout(() => {
        const downloadElement = document.getElementById('download');
        if (downloadElement) {
          downloadElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    // Arahkan langsung ke bagian Download APK
    const downloadElement = document.getElementById('download');
    if (downloadElement) {
      downloadElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFeedbackClick = () => {
    if (currentPath !== '/') {
      window.history.pushState({}, '', '/#faq');
      setCurrentPath('/');
      setTimeout(() => {
        const faqElement = document.getElementById('faq');
        if (faqElement) {
          faqElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    const faqElement = document.getElementById('faq');
    if (faqElement) {
      faqElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isCompressorRoute =
    currentPath === '/tools/image-compressor' ||
    currentPath.startsWith('/tools/image-compressor');

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      {/* Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onDownloadClick={handleDownloadClick}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {isCompressorRoute ? (
          <ImageCompressorPage
            onNavigateHome={() => navigateTo('/')}
            onDownloadClick={handleDownloadClick}
          />
        ) : (
          <>
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
          </>
        )}
      </main>

      {/* Footer */}
      <Footer currentPath={currentPath} onNavigate={navigateTo} />

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
