import React, { useState } from 'react';
import { ClubDataProvider } from './context/ClubDataContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { NextMatchSection } from './components/NextMatchSection';
import { RecentResultsSection } from './components/RecentResultsSection';
import { TeamsSection } from './components/TeamsSection';
import { FixtureSection } from './components/FixtureSection';
import { NewsSection } from './components/NewsSection';
import { ClubHistorySection } from './components/ClubHistorySection';
import { AsociateSection } from './components/AsociateSection';
import { JoinBasketballSection } from './components/JoinBasketballSection';
import { ContactSection } from './components/ContactSection';
import { AdminPanel } from './components/AdminPanel';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ClubDataProvider>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
        {/* Main Header */}
        <Header
          activeSection={activeSection}
          onNavigate={scrollToSection}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Cover with quick access */}
          <HeroSection onNavigate={scrollToSection} />

          {/* Próximo Partido */}
          <NextMatchSection onViewFixture={() => scrollToSection('fixture')} />

          {/* Últimos Resultados */}
          <RecentResultsSection
            onOpenCategory={() => scrollToSection('equipos')}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />

          {/* Nuestros Equipos & Categorías */}
          <TeamsSection />

          {/* Fixture Completo */}
          <FixtureSection />

          {/* Noticias del Club */}
          <NewsSection />

          {/* El Club (Historia, Instalaciones, Presidentes) */}
          <ClubHistorySection />

          {/* IMPORTANTE: Solapa para Asociarse al Club */}
          <AsociateSection />

          {/* Sumate al Club: ¿Querés jugar al básquet con nosotros? */}
          <JoinBasketballSection />

          {/* Contacto & Ubicación */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer
          onNavigate={scrollToSection}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Floating WhatsApp Action */}
        <FloatingWhatsApp />

        {/* Private Administration Modal */}
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
      </div>
    </ClubDataProvider>
  );
}
