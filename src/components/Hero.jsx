import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Wheat, 
  Ship, 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  Sparkles,
  FileText
} from 'lucide-react';
import { PORTAL_INFO } from '../data/portalData';

export default function Hero({ lang, theme, onScrollTo }) {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const info = PORTAL_INFO[lang] || PORTAL_INFO.ar;

  const metrics = [
    {
      value: "7.4+",
      unit: { ar: "أشهر", en: "Months", pl: "Miesięcy", uk: "Місяців" },
      title: { ar: "تغطية المخزون الاستراتيجي للدولة", en: "Strategic Reserve Coverage Buffer", pl: "Poziom Rezerw Strategicznych", uk: "Покриття стратегічного резерву" },
      icon: Wheat
    },
    {
      value: "14.2",
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
    <section id="hero" className="relative pt-10 pb-20 overflow-hidden transition-colors duration-300">
      {/* Background Aerial & Glow Overlays */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <img 
          src="/assets/hero-aerial.jpg" 
          alt="Mostaqbal Misr Aerial" 
          className={`w-full h-full object-cover object-center filter ${
            theme === 'dark' ? 'opacity-15 brightness-75' : 'opacity-10 brightness-110'
          }`} 
        />
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950' 
            : 'bg-gradient-to-b from-slate-50/90 via-white/95 to-slate-50'
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
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
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur-md opacity-40 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-950 border-2 border-amber-400 p-1.5 shadow-2xl flex items-center justify-center">
                <img 
                  src="/assets/foe-badge-circle.png" 
                  alt="شعار جهاز مستقبل مصر للتنمية المستدامة FOE" 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight sm:leading-snug text-slate-900 dark:text-white">
            {isAr ? (
              <>
                منظومة <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600">الشراء الموحد</span>
              </>
            ) : (
              <>
                Unified National <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600">Procurement Directorate</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
            {isAr ? (
              <>
                الذراع التنفيذي السيادي لـ <strong className="font-bold text-slate-900 dark:text-white">جهاز مستقبل مصر للتنمية المستدامة (FOE)</strong>، المنوط به حماية الأمن الغذائي، وتأمين رصيد استراتيجي آمن يغطي من 6 إلى 9 أشهر من المحاصيل والسلع الأساسية، وتحقيق الوفر الدولاري عبر كفاءة سلاسل الإمداد ومجمعات الصوامع الرقمية بالدلتا الجديدة.
              </>
            ) : (
              <>
                The sovereign executive directorate of <strong className="font-bold text-slate-900 dark:text-white">Future of Egypt Agency for Sustainable Development (FOE)</strong>, safeguarding food security, building resilient 6-to-9 month strategic commodity reserves, and capturing foreign currency savings across the New Delta agricultural infrastructure.
              </>
            )}
          </p>

          {/* Action Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => onScrollTo('pillars')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <span>{isAr ? 'الركائز الاستراتيجية الست' : 'The Six Strategic Pillars'}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>

            <button
              onClick={() => onScrollTo('tenders')}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm border transition-all ${
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
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border transition-all ${
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

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div 
                key={idx}
                className="glass-card p-5 rounded-2xl flex items-center gap-4 transition-all"
              >
                <div className={`p-3 rounded-xl border flex-shrink-0 ${
                  theme === 'dark' 
                    ? 'bg-slate-900 border-slate-800 text-amber-400' 
                    : 'bg-amber-50 border-amber-200 text-amber-700'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
                      {metric.value}
                    </span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {metric.unit[lang] || metric.unit.ar}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5 leading-snug">
                    {metric.title[lang] || metric.title.ar}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
