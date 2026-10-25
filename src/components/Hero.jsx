import React, { useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Wheat, 
  Ship, 
  Building2, 
  ShieldCheck, 
  FileText,
  MapPin
} from 'lucide-react';
import { PORTAL_INFO } from '../data/portalData';

export default function Hero({ lang, theme, onScrollTo }) {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const info = PORTAL_INFO[lang] || PORTAL_INFO.ar;
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  // Guarantee browser autoplay without any captions or sound
  useEffect(() => {
    if (videoRef.current) {
      const v = videoRef.current;
      v.defaultMuted = true;
      v.muted = true;
      
      const disableCaptions = () => {
        try {
          if (v.textTracks) {
            for (let i = 0; i < v.textTracks.length; i++) {
              v.textTracks[i].mode = 'disabled';
            }
          }
        } catch (e) {}
      };

      disableCaptions();
      if (v.textTracks) {
        v.textTracks.onchange = disableCaptions;
      }

      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay was prevented by browser:", err);
        });
      }
    }
  }, []);

  // Pause background video when hero is scrolled out of viewport to preserve resources
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!videoRef.current) return;
      if (!entry.isIntersecting) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }, { threshold: 0.1 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const metrics = [
    {
      value: "7.8+",
      unit: { ar: "أشهر", en: "Months", pl: "Miesięcy", uk: "Місяців" },
      title: { ar: "تغطية المخزون الاستراتيجي للدولة", en: "Strategic Reserve Coverage Buffer", pl: "Poziom Rezerw Strategicznych", uk: "Покриття стратегічного резерву" },
      icon: Wheat
    },
    {
      value: "14.5",
      unit: { ar: "مليون طن", en: "Million MT", pl: "Mln Ton", uk: "Млн Тонн" },
      title: { ar: "إجمالي السلع المدارة والموردة سنوياً", en: "Annual Managed Strategic Commodities", pl: "Roczne Dostawy Surowców", uk: "Обсяг стратегічних поставок" },
      icon: Ship
    },
    {
      value: "5.5",
      unit: { ar: "مليون طن", en: "Million MT", pl: "Mln Ton", uk: "Млн Тонн" },
      title: { ar: "طاقة مجمعات الصوامع الرقمية الذكية", en: "Smart Digital Silos Storage Capacity", pl: "Pojemność Inteligentnych Silosów", uk: "Місткість розумних елеваторів" },
      icon: Building2
    },
    {
      value: "0",
      unit: { ar: "دولار غرامات", en: "Demurrage", pl: "Opłat Demurrage", uk: "Штрафів демередж" },
      title: { ar: "تفريغ فوري وسلس لكافة الشحنات بالموانئ", en: "Rapid Port Cargo Unloading Performance", pl: "Sprawny Rozładunek w Portach", uk: "Швидке розвантаження в портах" },
      icon: ShieldCheck
    }
  ];

  return (
    <section id="hero" ref={sectionRef} className="relative isolate pt-8 pb-20 overflow-hidden transition-colors duration-300">
      {/* Background Cinematic Video Loop & Overlays (Isolated Stacking Context) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
          tabIndex="-1"
          aria-hidden="true"
          crossOrigin="anonymous"
          src="/assets/hero-bg.mp4"
          poster="/assets/hero-aerial.jpg"
          className={`w-full h-full object-cover object-center transition-opacity duration-700 pointer-events-none select-none ${
            theme === 'dark' ? 'opacity-70 brightness-90 contrast-105' : 'opacity-45 brightness-95 contrast-100'
          }`}
        >
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Soft luxury vignettes and gradient protection for crystal clear text */}
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-slate-950' 
            : 'bg-gradient-to-b from-white/90 via-white/60 to-white/95'
        }`}></div>
        {/* Ambient gold glow core */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Sovereign Mandate Ribbon */}
        <div className="flex justify-center mb-6">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm border ${
            theme === 'dark'
              ? 'bg-slate-900/90 border-amber-500/30 text-amber-300'
              : 'bg-amber-50/90 border-amber-300 text-amber-900'
          }`}>
            <span className="px-1.5 py-0.2 rounded font-black font-mono text-[10px] bg-amber-500 text-slate-950">
              FOE
            </span>
            <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>
              {isAr 
                ? 'إدارة الشراء الموحد — جهاز مستقبل مصر' 
                : 'Unified Procurement Directorate — Future of Egypt Agency'}
            </span>
          </div>
        </div>

        {/* Hero Title & Subheading */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center mb-3">
            <div className="relative group cursor-pointer">
              {/* Animated pulsating radar waves */}
              <div className="absolute -inset-4 rounded-full bg-amber-500/20 blur-md animate-ping opacity-25 pointer-events-none"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-full blur-md opacity-50 group-hover:opacity-85 transition duration-500 animate-pulse"></div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-950 border-2 border-amber-400 p-1.5 shadow-2xl flex items-center justify-center">
                <img 
                  src="/assets/foe-badge-circle.png" 
                  alt="شعار جهاز مستقبل مصر للتنمية المستدامة FOE" 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
            </div>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black leading-tight sm:leading-snug text-slate-900 dark:text-white drop-shadow-sm">
            {isAr ? (
              <>
                إدارة <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600">الشراء الموحد</span>
              </>
            ) : (
              <>
                Unified <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600">Procurement Directorate</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-slate-900 dark:text-slate-100 leading-relaxed font-semibold max-w-3xl mx-auto px-1 sm:px-0 drop-shadow-xs">
            {isAr ? (
              <>
                الذراع التنفيذي السيادي لـ <strong className="font-black text-slate-950 dark:text-white">جهاز مستقبل مصر للتنمية المستدامة (FOE)</strong>، المنوط به حماية الأمن الغذائي، وتأمين رصيد استراتيجي آمن يغطي من 6 إلى 9 أشهر من المحاصيل والسلع الأساسية، وتحقيق الوفر الدولاري عبر كفاءة سلاسل الإمداد ومجمعات الصوامع الرقمية بالدلتا الجديدة.
              </>
            ) : (
              <>
                The sovereign executive directorate of <strong className="font-black text-slate-950 dark:text-white">Future of Egypt Agency for Sustainable Development (FOE)</strong>, safeguarding food security, building resilient 6-to-9 month strategic commodity reserves, and capturing foreign currency savings across the New Delta agricultural infrastructure.
              </>
            )}
          </p>

          {/* Action Navigation Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-4 w-full max-w-md sm:max-w-none mx-auto">
            <button
              onClick={() => onScrollTo('pillars')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>{isAr ? 'الركائز الاستراتيجية الست' : 'The Six Strategic Pillars'}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>

            <button
              onClick={() => onScrollTo('tenders')}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900/90 border-slate-700 text-white hover:border-amber-500/50'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-amber-500'
              }`}
            >
              <Ship className="w-4 h-4 text-sky-500" />
              <span>{isAr ? 'المناقصات المطروحة' : 'Procurement Notices'}</span>
            </button>

            <button
              onClick={() => onScrollTo('standards')}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900/90 border-slate-700 text-slate-300 hover:text-white'
                  : 'bg-white border-slate-300 text-slate-700 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-500" />
              <span>{isAr ? 'معايير التأهيل الدولي' : 'Accreditation Standards'}</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid - 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mt-12 sm:mt-16">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div 
                key={idx}
                className="glass-card p-3 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 transition-all"
              >
                <div className={`p-2 sm:p-3 rounded-xl border flex-shrink-0 ${
                  theme === 'dark' 
                    ? 'bg-slate-900 border-slate-800 text-amber-400' 
                    : 'bg-amber-50 border-amber-200 text-amber-700'
                }`}>
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
                    <span className="text-lg xs:text-xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
                      {metric.value}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-amber-600 dark:text-amber-400">
                      {metric.unit[lang] || metric.unit.ar}
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5 leading-snug line-clamp-2">
                    {metric.title[lang] || metric.title.ar}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Sovereign Operational Ticker Strip */}
        <div className={`mt-8 sm:mt-10 rounded-2xl border p-2.5 sm:p-3 flex items-center gap-3 overflow-hidden shadow-lg backdrop-blur-md transition-all ${
          theme === 'dark' 
            ? 'bg-slate-900/80 border-amber-500/30 shadow-black/50 text-slate-200' 
            : 'bg-white/90 border-amber-300 shadow-amber-500/10 text-slate-800'
        }`}>
          {/* Static Live Badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-500 text-slate-950 text-xs font-black flex-shrink-0 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
            <span className="whitespace-nowrap">{isAr ? 'مؤشرات حية' : 'Live Radar'}</span>
          </div>

          {/* Marquee Content */}
          <div className="overflow-hidden flex-1 relative">
            <div className="animate-ticker text-xs font-bold flex items-center gap-8 text-slate-700 dark:text-slate-300">
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <Wheat className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>{isAr ? 'رصيد القمح الاستراتيجي للدولة: 7.8+ أشهر آمنة' : 'Sovereign Wheat Buffer: 7.8+ Months Secured'}</span>
              </span>
              <span className="text-amber-500/50">•</span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <Ship className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                <span>{isAr ? 'تفريغ موانئ دمياط والإسكندرية: 0 غرامات تأخير (Zero Demurrage)' : 'Port Discharge: Zero Demurrage at Damietta & Alex'}</span>
              </span>
              <span className="text-amber-500/50">•</span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <Building2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>{isAr ? 'الصوامع الذكية بالدلتا الجديدة: طاقة استيعابية 5.5 مليون طن' : 'Smart Digital Silos: 5.5M MT Storage Capacity'}</span>
              </span>
              <span className="text-amber-500/50">•</span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                <span>{isAr ? 'مقر اللجان المركزية: توكانو مول — الدور الثالث — شارع يوسف عباس' : 'Sessions Hall: Tucano Mall — Floor 3 — Nasr City'}</span>
              </span>
              <span className="text-amber-500/50">•</span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>{isAr ? 'رقابة الجودة: مطابقة لمعايير سلامة الغذاء (NFSA) و GAFTA و FOSFA' : 'Quality: ES, CODEX, GAFTA & FOSFA Certified'}</span>
              </span>
              <span className="text-amber-500/50">•</span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <Wheat className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>{isAr ? 'رصيد القمح الاستراتيجي للدولة: 7.8+ أشهر آمنة' : 'Sovereign Wheat Buffer: 7.8+ Months Secured'}</span>
              </span>
              <span className="text-amber-500/50">•</span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <Ship className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                <span>{isAr ? 'تفريغ موانئ دمياط والإسكندرية: 0 غرامات تأخير (Zero Demurrage)' : 'Port Discharge: Zero Demurrage at Damietta & Alex'}</span>
              </span>
              <span className="text-amber-500/50">•</span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <Building2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>{isAr ? 'الصوامع الذكية بالدلتا الجديدة: طاقة استيعابية 5.5 مليون طن' : 'Smart Digital Silos: 5.5M MT Storage Capacity'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
