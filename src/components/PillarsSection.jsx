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

  const activePillar = PILLARS.find(p => p.id === selectedPillar) || PILLARS[0];
  const ActiveIcon = iconMap[activePillar.icon] || ShieldCheck;

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
              <span>{isAr ? 'المرتكزات الست للشراء الموحد' : 'The Six Strategic Pillars'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
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

        {/* 6 Pillars Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PILLARS.map((pillar) => {
            const Icon = iconMap[pillar.icon] || ShieldCheck;
            const isSelected = selectedPillar === pillar.id;

            return (
              <div
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isSelected 
                    ? (theme === 'dark'
                        ? 'bg-slate-900 border-amber-500/70 shadow-xl shadow-amber-500/10 scale-[1.02]'
                        : 'bg-white border-amber-500 shadow-xl shadow-amber-500/10 scale-[1.02] ring-1 ring-amber-500')
                    : (theme === 'dark'
                        ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                        : 'bg-white/80 border-slate-200 hover:border-slate-300')
                }`}
              >
                {/* Number & Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`w-8 h-8 rounded-lg text-xs font-mono font-bold flex items-center justify-center border ${
                    theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    0{pillar.id}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    theme === 'dark' ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}>
                    {pillar.badge[lang] || pillar.badge.ar}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="flex items-start gap-3.5 mb-3">
                  <div className={`p-3 rounded-xl border flex-shrink-0 ${
                    theme === 'dark' 
                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                      : 'bg-amber-50 border-amber-200 text-amber-700'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold leading-snug text-slate-900 dark:text-white">
                    {pillar.title[lang] || pillar.title.ar}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                  {pillar.desc[lang] || pillar.desc.ar}
                </p>

                {/* Active indicator */}
                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-semibold">
                    <span>{isAr ? 'الركيزة المحددة' : 'Selected Pillar'}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Pillar Detailed Banner */}
        <div className={`mt-10 p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-slate-900/90 border-slate-700 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30">
                  {isAr ? `الركيزة رقم 0${activePillar.id}` : `Pillar #0${activePillar.id}`}
                </span>
                <span className="text-xs text-slate-500">
                  {isAr ? 'آليات التنفيذ والمتابعة المعتمدة' : 'Operational Implementation Protocols'}
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {activePillar.title[lang] || activePillar.title.ar}
              </h4>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {activePillar.desc[lang] || activePillar.desc.ar}
              </p>
            </div>

            <div className={`flex-shrink-0 flex flex-col items-center justify-center p-6 rounded-2xl border text-center w-full lg:w-72 ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <ActiveIcon className="w-12 h-12 text-amber-500 mb-2" />
              <div className="text-xs text-slate-500 font-medium">
                {isAr ? 'جهاز مستقبل مصر للتنمية المستدامة' : 'Mostaqbal Misr Agency'}
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {isAr ? 'إدارة الشراء الموحد' : 'Unified Procurement'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
