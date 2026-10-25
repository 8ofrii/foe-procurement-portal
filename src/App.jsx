import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PillarsSection from './components/PillarsSection';
import DepartmentsSection from './components/DepartmentsSection';
import CommoditiesDashboard from './components/CommoditiesDashboard';
import NewsSection from './components/NewsSection';
import TendersSection from './components/TendersSection';
import CommitteesSection from './components/CommitteesSection';
import AccreditationStandardsSection from './components/AccreditationStandardsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import OfficialInfographicModal from './components/OfficialInfographicModal';
import SearchModal from './components/SearchModal';

export default function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('foe_lang') || 'ar';
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('foe_theme') || 'dark';
  });

  // Display size / zoom level: Default is '0.9' (90% Main Level) across all languages
  const [zoomScale, setZoomScale] = useState(() => {
    return localStorage.getItem('foe_zoom') || '0.9';
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInfographicOpen, setIsInfographicOpen] = useState(false);

  // Sync lang, dir, and data-lang to root document
  useEffect(() => {
    localStorage.setItem('foe_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('data-lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('foe_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Enforce selected display size (Default 90% Main Level) identically across all languages
  useEffect(() => {
    localStorage.setItem('foe_zoom', zoomScale);
    const applyZoom = () => {
      document.documentElement.style.zoom = zoomScale;
    };
    applyZoom();
    window.addEventListener('resize', applyZoom);
    return () => window.removeEventListener('resize', applyZoom);
  }, [zoomScale, lang]);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Automatic ScrollSpy: update active navbar section when scrolling up or down
  useEffect(() => {
    const sections = ['hero', 'pillars', 'departments', 'commodities', 'news', 'tenders', 'committees', 'standards', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 65;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col font-sans ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Sleek, De-cluttered Navigation Bar with Unified Size & Language Options */}
      <Navbar
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        zoomScale={zoomScale}
        setZoomScale={setZoomScale}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Sovereign Hero with Real Aerial Background & Official Logo */}
        <Hero
          lang={lang}
          theme={theme}
          onScrollTo={handleScrollTo}
        />

        {/* The 6 Core Strategic Pillars */}
        <PillarsSection
          lang={lang}
          theme={theme}
          onOpenInfographic={() => setIsInfographicOpen(true)}
        />

        {/* Specialized Executive Directorates */}
        <DepartmentsSection
          lang={lang}
          theme={theme}
        />

        {/* Strategic Reserves & Commodities Monitor with Achievements Visual */}
        <CommoditiesDashboard
          lang={lang}
          theme={theme}
        />

        {/* Media Center & News Releases */}
        <NewsSection
          lang={lang}
          theme={theme}
          onOpenInfographic={() => setIsInfographicOpen(true)}
        />

        {/* Public Tenders & Procurement Notices */}
        <TendersSection
          lang={lang}
          theme={theme}
        />

        {/* Weekly Sourcing & Evaluation Committees Schedule */}
        <CommitteesSection
          lang={lang}
          theme={theme}
        />

        {/* International Accreditation Standards (View Only - No Data Saving) */}
        <AccreditationStandardsSection
          lang={lang}
          theme={theme}
        />

        {/* Contact, Locations & Legal FAQ */}
        <ContactSection
          lang={lang}
          theme={theme}
        />
      </main>

      {/* Sovereign Footer */}
      <Footer
        lang={lang}
        theme={theme}
        onScrollTo={handleScrollTo}
      />

      {/* Multilingual AI Assistant Bot (AR, EN, PL, UK) */}
      <ChatBot
        lang={lang}
        theme={theme}
      />

      {/* Modals & Overlays */}
      <OfficialInfographicModal
        isOpen={isInfographicOpen}
        onClose={() => setIsInfographicOpen(false)}
        lang={lang}
        theme={theme}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lang={lang}
        theme={theme}
        onSelectResult={handleScrollTo}
      />
    </div>
  );
}
