import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  Check,
  ChevronDown
} from 'lucide-react';
import { PORTAL_INFO, NAV_LINKS } from '../data/portalData';

// Custom Animated Day & Night Capsule Switch (pixel-perfect matching user screenshots)
function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      dir="ltr"
      aria-label="Toggle Theme"
      className="relative w-[58px] h-[28px] rounded-full p-[2px] transition-all duration-300 focus:outline-none cursor-pointer flex-shrink-0 shadow-inner border overflow-hidden"
      style={{
        background: isDark
          ? 'linear-gradient(to right, #152238, #0d1524)'
          : 'linear-gradient(to right, #2998ec, #1e88e5)',
        borderColor: isDark ? 'rgba(51, 65, 85, 0.7)' : 'rgba(147, 197, 253, 0.6)'
      }}
    >
      {/* Background Decor: Stars on Left for Dark Mode, Cloud on Right for Light Mode */}
      {isDark ? (
        <div className="absolute left-2.5 top-0 bottom-0 flex items-center pointer-events-none">
          <div className="relative w-4 h-3.5">
            <span className="absolute top-0 left-0.5 w-1 h-1 rounded-full bg-white opacity-95 animate-pulse"></span>
            <span className="absolute bottom-0 left-2 w-0.5 h-0.5 rounded-full bg-amber-100 opacity-80"></span>
            <span className="absolute top-1.5 left-3 w-1 h-1 rounded-full bg-white opacity-90"></span>
            <span className="absolute bottom-0.5 right-0 w-0.5 h-0.5 rounded-full bg-amber-200 opacity-70"></span>
          </div>
        </div>
      ) : (
        <div className="absolute right-2 top-0 bottom-0 flex items-center pointer-events-none">
          <svg viewBox="0 0 24 16" className="w-4 h-3 fill-white opacity-95 drop-shadow-sm">
            <path d="M19.35 6.04C18.67 2.59 15.64 0 12 0 9.11 0 6.6 1.64 5.35 4.04 2.34 4.36 0 6.91 0 10c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
          </svg>
        </div>
      )}

      {/* Sliding Sphere (Golden Sun on Left in Light, Moon with craters on Right in Dark) */}
      <div
        className="absolute top-[2px] w-[24px] h-[24px] rounded-full transition-all duration-300 ease-in-out flex items-center justify-center shadow-md"
        style={{
          left: isDark ? '30px' : '2px'
        }}
      >
        {isDark ? (
          <div className="w-full h-full rounded-full bg-[#fdf8e2] border border-[#f5ebba] shadow-lg shadow-black/50 relative overflow-hidden">
            <span className="absolute top-1 left-1.5 w-1 h-1 rounded-full bg-[#d6caa4]/70"></span>
            <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#d6caa4]/60"></span>
            <span className="absolute top-2.5 right-1 w-0.5 h-0.5 rounded-full bg-[#d6caa4]/50"></span>
          </div>
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#ffd54f] via-[#ffb300] to-[#f57f17] border border-amber-200 shadow-md shadow-amber-500/60"></div>
        )}
      </div>
    </button>
  );
}

export default function Navbar({ 
  lang, 
  setLang, 
  theme, 
  setTheme, 
  onOpenSearch, 
  activeSection, 
  setActiveSection 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langDropdownRef = useRef(null);

  const isAr = lang === 'ar';
  const info = PORTAL_INFO[lang] || PORTAL_INFO.ar;
  const navItems = NAV_LINKS[lang] || NAV_LINKS.ar;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'ar', name: 'العربية', country: 'EG', code2: 'AR' },
    { code: 'en', name: 'English', country: 'GB', code2: 'EN' },
    { code: 'pl', name: 'Polski', country: 'PL', code2: 'PL' },
    { code: 'uk', name: 'Українська', country: 'UA', code2: 'UA' },
  ];

  const currentLangObj = languages.find(l => l.code === lang) || languages[0];

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? (theme === 'dark' 
            ? 'bg-slate-950/95 border-b border-amber-500/20 shadow-lg shadow-black/40 backdrop-blur-md py-1.5' 
            : 'bg-white/95 border-b border-amber-500/20 shadow-md backdrop-blur-md py-1.5')
        : (theme === 'dark' 
            ? 'bg-slate-950/90 border-b border-slate-800 backdrop-blur-sm py-2' 
            : 'bg-white/90 border-b border-slate-200 backdrop-blur-sm py-2')
    }`}>
      {/* Edge-to-edge container: Logo at far side, controls at opposite far side, nav centered */}
      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand & Official Logo - Anchored to start edge (Far Right in Arabic, Far Left in English) */}
        <div 
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none group flex-shrink-0 min-w-0"
        >
          <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-md group-hover:scale-105 transition-transform flex-shrink-0 border border-amber-400/80 bg-slate-950 p-0.5">
            <img 
              src="/assets/foe-badge-circle.png" 
              alt="شعار جهاز مستقبل مصر" 
              className="w-full h-full object-cover rounded-full" 
            />
          </div>

          <div className="flex flex-col justify-center min-w-0">
            <span className="text-sm xs:text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight tracking-tight truncate">
              {info.deptName}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
              <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold text-amber-600 dark:text-amber-400 leading-tight truncate">
                {info.orgName}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-black font-mono bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/35 leading-none flex-shrink-0">
                FOE
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links - Centered in middle */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-2 text-xs font-semibold">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? (theme === 'dark' 
                        ? 'text-amber-400 bg-amber-500/15 font-bold shadow-sm' 
                        : 'text-amber-800 bg-amber-100 font-bold shadow-sm')
                    : (theme === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Controls: [ ⌄ AR EG ] Pill, Custom Sun/Moon Capsule Switch, Search */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          
          {/* Language Selector matching user screenshot */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              type="button"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-700/80 text-white hover:border-amber-400/80 hover:bg-slate-800'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-amber-500 hover:bg-slate-50'
              }`}
            >
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              <span className="font-mono font-bold tracking-wider">{currentLangObj.code2}</span>
              <span className="font-mono text-[10px] text-slate-400 font-semibold">{currentLangObj.country}</span>
            </button>

            {/* Dropdown Menu - Exactly matching user reference screenshot */}
            {langMenuOpen && (
              <div 
                className={`absolute top-full mt-2 w-48 rounded-2xl border shadow-2xl p-1.5 z-50 animate-fadeIn ${
                  theme === 'dark'
                    ? 'bg-[#0f172a] border-slate-700/80 text-white shadow-black/80'
                    : 'bg-white border-slate-200 text-slate-900 shadow-xl'
                }`}
                style={{
                  [isAr ? 'left' : 'right']: 0
                }}
              >
                <div className="flex flex-col gap-1">
                  {languages.map((l) => {
                    const isCurrent = l.code === lang;
                    return (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full py-2 px-3 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                          isCurrent
                            ? (theme === 'dark'
                                ? 'bg-[#2a2215] text-amber-400 font-bold border border-amber-500/30'
                                : 'bg-amber-100/80 text-amber-900 font-bold')
                            : (theme === 'dark'
                                ? 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
                                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950')
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-3.5 flex items-center justify-center">
                            {isCurrent && <Check className="w-3.5 h-3.5 text-amber-400" />}
                          </span>
                          <span className="font-medium">{l.name}</span>
                        </div>
                        <span className={`font-mono text-[11px] font-bold ${
                          isCurrent ? 'text-amber-400' : 'text-slate-400'
                        }`}>
                          {l.country}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Custom Capsule Day/Night Slider matching user screenshots */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          {/* Search Trigger Button */}
          <button
            onClick={onOpenSearch}
            className={`w-8 h-8 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-400'
                : 'bg-white border-slate-300 text-slate-700 hover:text-amber-600 hover:border-amber-400'
            }`}
            title="بحث فوري (Ctrl+K)"
            aria-label="Search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`w-8 h-8 rounded-lg lg:hidden border cursor-pointer flex items-center justify-center transition-colors ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t px-3.5 sm:px-6 py-3 space-y-1 mt-1.5 animate-fadeIn shadow-2xl ${
          theme === 'dark' ? 'bg-slate-950/98 border-slate-800' : 'bg-white/98 border-slate-200'
        }`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full ${isAr ? 'text-right' : 'text-left'} py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer min-h-[44px] ${
                activeSection === item.id
                  ? (theme === 'dark' ? 'bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30' : 'bg-amber-50 text-amber-800 font-bold border border-amber-200')
                  : (theme === 'dark' ? 'text-slate-200 hover:bg-slate-900' : 'text-slate-700 hover:bg-slate-100')
              }`}
            >
              <span>{item.label}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${activeSection === item.id ? 'bg-amber-500' : 'bg-transparent'}`}></span>
            </button>
          ))}

          {/* Quick Actions in Mobile Drawer */}
          <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSearch(); }}
              className={`flex-1 py-2 px-3 rounded-xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-colors ${
                theme === 'dark' ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-50 border-slate-200 text-amber-800'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isAr ? 'بحث سريع' : 'Search'}</span>
            </button>
            <a
              href={`tel:${(info.hotline || '19842').replace(/\s+/g, '')}`}
              className="py-2 px-3 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>{info.hotline || '19842'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
