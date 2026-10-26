import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wheat, 
  Scale, 
  BadgeCheck, 
  Ship, 
  BadgeDollarSign, 
  Eye, 
  Sparkles,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { PILLARS } from '../data/portalData';

export default function PillarsSection({ lang, theme, onOpenInfographic }) {
  const isAr = lang === 'ar';
  const [selectedPillar, setSelectedPillar] = useState(1);

  const iconMap = {
    ShieldCheck: ShieldCheck,
    Wheat: Wheat,
    Scale: Scale,
    BadgeCheck: BadgeCheck,
    Ship: Ship,
    BadgeDollarSign: BadgeDollarSign
  };

  // Distinct semantic color theme per pillar reflecting its functional purpose
  const pillarThemes = {
    1: {
      // Sovereign Security & Certified Quality (Royal Blue)
      borderSelected: 'border-blue-500 ring-2 ring-blue-500/20 shadow-xl shadow-blue-500/10',
      iconBox: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25',
      badge: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/25',
      accentText: 'text-blue-600 dark:text-blue-400',
      bannerBadge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
    },
    2: {
      // Agriculture, Grains & National Reserves (Golden Amber)
      borderSelected: 'border-amber-500 ring-2 ring-amber-500/20 shadow-xl shadow-amber-500/10',
      iconBox: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
      badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25',
      accentText: 'text-amber-600 dark:text-amber-400',
      bannerBadge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
    },
    3: {
      // Market Balance & Price Stability (Teal / Fair Trade)
      borderSelected: 'border-teal-500 ring-2 ring-teal-500/20 shadow-xl shadow-teal-500/10',
      iconBox: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/25',
      badge: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/25',
      accentText: 'text-teal-600 dark:text-teal-400',
      bannerBadge: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30'
    },
    4: {
      // Food Safety & Health Compliance (Emerald Green)
      borderSelected: 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-xl shadow-emerald-500/10',
      iconBox: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
      badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25',
      accentText: 'text-emerald-600 dark:text-emerald-400',
      bannerBadge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
    },
    5: {
      // Maritime Supply Chains & Global Ports (Deep Indigo)
      borderSelected: 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-xl shadow-indigo-500/10',
      iconBox: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/25',
      badge: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/25',
      accentText: 'text-indigo-600 dark:text-indigo-400',
      bannerBadge: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
    },
    6: {
      // Fiscal Efficiency & FX Treasury Savings (Purple / Economics)
      borderSelected: 'border-purple-500 ring-2 ring-purple-500/20 shadow-xl shadow-purple-500/10',
      iconBox: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25',
      badge: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/25',
      accentText: 'text-purple-600 dark:text-purple-400',
      bannerBadge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
    }
  };

  const activePillar = PILLARS.find(p => p.id === selectedPillar) || PILLARS[0];
  const ActiveIcon = iconMap[activePillar.icon] || ShieldCheck;
  const activeTheme = pillarThemes[activePillar.id] || pillarThemes[1];

  return (
    <section id="pillars" className={`py-20 relative border-t transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold mb-3 border ${
              theme === 'dark' 
                ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                : 'bg-amber-100 border-amber-300 text-amber-800'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'الركائز الاستراتيجية للشراء الموحد' : 'Strategic Pillars of Unified Procurement'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black leading-snug sm:leading-normal text-slate-900 dark:text-white">
              {isAr ? 'الركائز الاستراتيجية المعتمدة لجهاز مستقبل مصر' : 'Core Strategic Mandates & Pillars'}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {isAr ? (
                'الركائز المعتمدة بتوجيهات القيادة السياسية لتأمين الأمن السلعي، تعزيز الاحتياطي، وحماية الاقتصاد الوطني عبر كفاءة سلاسل الإمداد والتوريد.'
              ) : (
                'Approved strategic pillars safeguarding commodity buffers, market price stability, supply diversification, and fiscal efficiency.'
              )}
            </p>
          </div>

          {/* Quick Action to view official poster */}
          <button
            onClick={onOpenInfographic}
            className={`self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all shadow-sm ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-700 text-slate-200 hover:border-amber-500/50 hover:text-amber-300'
                : 'bg-white border-slate-300 text-slate-800 hover:border-amber-500 hover:text-amber-700'
            }`}
          >
            <Eye className="w-4 h-4 text-amber-500" />
            <span>{isAr ? 'مطالعة الإعلان الأصلي المعتمد' : 'View Official Notice'}</span>
          </button>
        </div>

        {/* Strategic Pillars Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PILLARS.map((pillar) => {
            const Icon = iconMap[pillar.icon] || ShieldCheck;
            const isSelected = selectedPillar === pillar.id;
            const t = pillarThemes[pillar.id] || pillarThemes[1];

            return (
              <div
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                className={`p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 border group flex flex-col justify-between ${
                  isSelected 
                    ? (theme === 'dark'
                        ? `bg-slate-900 ${t.borderSelected} scale-[1.02]`
                        : `bg-white ${t.borderSelected} scale-[1.02]`)
                    : (theme === 'dark'
                        ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md')
                }`}
              >
                <div>
                  {/* Top Header: Simple Semantic Icon on one side, Pill Badge & Number on other side */}
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 shadow-xs ${t.iconBox}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${t.badge}`}>
                        {pillar.badge[lang] || pillar.badge.ar}
                      </span>
                      <span className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center border ${
                        theme === 'dark' ? 'bg-slate-800/80 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'
                      }`}>
                        0{pillar.id}
                      </span>
                    </div>
                  </div>

                  {/* Title (Harmonious font size & natural line-height) */}
                  <h3 className="text-sm sm:text-base font-bold leading-normal text-slate-900 dark:text-white mb-2">
                    {pillar.title[lang] || pillar.title.ar}
                  </h3>

                  {/* Description (Optimal line spacing and comfortable reading flow) */}
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {pillar.desc[lang] || pillar.desc.ar}
                  </p>
                </div>

                {/* Active indicator */}
                {isSelected && (
                  <div className={`mt-4 pt-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold ${t.accentText}`}>
                    <span>{isAr ? 'الركيزة المحددة' : 'Selected Pillar'}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Pillar Detailed Banner */}
        <div className={`mt-8 sm:mt-10 p-5 sm:p-7 rounded-3xl border shadow-xl relative overflow-hidden transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-slate-900/90 border-slate-700 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg border ${activeTheme.bannerBadge}`}>
                  {isAr ? `الركيزة رقم 0${activePillar.id}` : `Pillar #0${activePillar.id}`}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {isAr ? 'آليات التنفيذ والمتابعة المعتمدة' : 'Operational Implementation Protocols'}
                </span>
              </div>

              <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-normal">
                {activePillar.title[lang] || activePillar.title.ar}
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {activePillar.desc[lang] || activePillar.desc.ar}
              </p>
            </div>

            <div className={`flex-shrink-0 flex flex-col items-center justify-center p-5 rounded-2xl border text-center w-full lg:w-64 transition-all ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-2.5 shadow-sm ${activeTheme.iconBox}`}>
                <ActiveIcon className="w-6 h-6" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {isAr ? 'جهاز مستقبل مصر للتنمية المستدامة' : 'Mostaqbal Misr Agency'}
              </div>
              <div className={`text-xs sm:text-sm font-bold mt-0.5 ${activeTheme.accentText}`}>
                {isAr ? 'إدارة الشراء الموحد' : 'Unified Procurement'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
