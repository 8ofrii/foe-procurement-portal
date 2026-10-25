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
import { NAV_OFFSET, SECTIONS } from './constants';

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

  // Automatic ScrollSpy: dynamically updates active navbar link based on visible section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        ticking = false;

        // 1. If near the top of the page, activate 'hero'
        if (window.scrollY < 80) {
          setActiveSection('hero');
          return;
        }

        // 2. If reached near the bottom of the page, activate the last section ('contact')
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        if (window.scrollY + clientHeight >= scrollHeight - 60) {
          setActiveSection(SECTIONS[SECTIONS.length - 1]);
          return;
        }

        // 3. Scan sections: A section is active if its top is near or past the header line
        // Navbar height is ~64px. Detection threshold at 130px gives instant, natural feedback
        // as soon as a section enters view under the header.
        const DETECTION_LINE = 130;

        for (let i = 0; i < SECTIONS.length; i++) {
          const sectionId = SECTIONS[i];
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= DETECTION_LINE && rect.bottom > DETECTION_LINE) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
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
        onScrollTo={handleScrollTo}
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
