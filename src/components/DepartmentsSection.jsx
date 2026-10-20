import React, { useState } from 'react';
import { 
  FileText, 
  Scale, 
  Globe2, 
  Coins, 
  Workflow, 
  Truck, 
  Target, 
  Store, 
  Building, 
  Layers, 
  BarChart3, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { DEPARTMENTS } from '../data/portalData';

export default function DepartmentsSection({ lang, theme }) {
  const isAr = lang === 'ar';
  const [selectedDeptId, setSelectedDeptId] = useState(DEPARTMENTS[0].id);

  const iconMap = {
    FileText: FileText,
    Scale: Scale,
    Globe2: Globe2,
    Coins: Coins,
    Workflow: Workflow,
    Truck: Truck,
    Target: Target,
    Store: Store
  };

  const activeDept = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];
  const ActiveIcon = iconMap[activeDept.icon] || Building;

  // Localized KPI values to prevent flipped numbers/text in RTL
  const formatKpiValue = (val) => {
    if (!val) return '';
    if (typeof val === 'object') return val[lang] || val.ar || '';
    if (isAr) {
      if (val === '72 Hours') return '72 ساعة';
      if (val === '24 Hours') return '24 ساعة';
      if (val === '0 (Zero)') return '0 (صفر نزاعات)';
      if (val === '380M+ USD') return '+380 مليون $';
      if (val === '18 Countries') return '18 دولة';
      if (val === '7.8+ Months') return '+7.8 أشهر';
      if (val === '0 USD (Zero)') return '0 $ (صفر غرامات)';
      if (val === '45,000 MT/Day') return '45 ألف طن/يوم';
      if (val === '5.5M Tons') return '5.5 مليون طن';
      if (val === 'Weekly') return 'أسبوعياً';
      if (val === '27 Governorates') return '27 محافظة';
      if (val === '8.5M+ MT') return '+8.5 مليون طن';
      if (val === '12 Hours') return '12 ساعة';
    }
    return val;
  };

  return (
    <section id="departments" className={`py-20 relative border-t transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
    }`}>
      {/* Background ambient accents */}
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold border ${
            theme === 'dark'
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              : 'bg-amber-100 border-amber-300 text-amber-800'
          }`}>
            <Layers className="w-3.5 h-3.5" />
            <span>{isAr ? 'الهيكل التنظيمي التخصصي' : 'Specialized Organizational Structure'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black leading-snug sm:leading-normal text-slate-900 dark:text-white">
            {isAr ? 'الإدارات والقطاعات التنفيذية للشراء الموحد' : 'Executive Directorates & Sectors'}
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {isAr ? (
              'منظومة مؤسسية متكاملة تتولى التعاقدات الدولية والمحلية، التخطيط الاستراتيجي، الإدارة اللوجستية للصوامع والموانئ، وتأمين سلاسل الإمداد الوطنية.'
            ) : (
              'An integrated ecosystem overseeing sovereign contracts, international trading, logistics, and national strategic reserves.'
            )}
          </p>
        </div>

        {/* Two-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Department List - 5 Columns */}
          <div className="lg:col-span-5 space-y-2">
            {DEPARTMENTS.map((dept) => {
              const Icon = iconMap[dept.icon] || Building;
              const isSelected = dept.id === selectedDeptId;

              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDeptId(dept.id)}
                  type="button"
                  className={`w-full p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 text-right cursor-pointer group ${
                    isSelected
                      ? (theme === 'dark'
                          ? 'bg-gradient-to-r from-amber-500/15 via-slate-800 to-amber-500/5 border-amber-500/70 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40 text-white'
                          : 'bg-gradient-to-r from-amber-100/90 via-amber-50 to-white border-amber-500 shadow-md ring-1 ring-amber-400 text-slate-950')
                      : (theme === 'dark'
                          ? 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700 text-slate-300'
                          : 'bg-white border-slate-200/90 hover:bg-slate-100 hover:border-slate-300 text-slate-700')
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Icon Container */}
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected
                        ? (theme === 'dark' ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'bg-amber-500 text-slate-950 border-amber-600')
                        : (theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400 group-hover:text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-600 group-hover:text-amber-600')
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Department Name (Numbers / Codes completely deleted) */}
                    <div className={isAr ? 'text-right' : 'text-left'}>
                      <div className={`text-sm sm:text-base font-bold transition-colors ${
                        isSelected 
                          ? 'text-slate-900 dark:text-white font-black' 
                          : 'text-slate-800 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white'
                      }`}>
                        {dept.name[lang] || dept.name.ar}
                      </div>
                    </div>
                  </div>

                  {/* Active selection indicator bar */}
                  {isSelected ? (
                    <div className="w-2 h-6 rounded-full bg-amber-500 flex-shrink-0 animate-pulse shadow-sm shadow-amber-500/50"></div>
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Department Detail Showcase - 7 Columns */}
          <div className="lg:col-span-7">
            <div className={`rounded-3xl border shadow-2xl relative overflow-hidden transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-slate-950/90 border-slate-800 shadow-black/60'
                : 'bg-white border-slate-200 shadow-slate-200'
            }`}>
              {/* Top luxury metallic accent ribbon */}
              <div className="h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600"></div>

              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Header (No department code numbers) */}
                <div className="flex items-start sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center flex-shrink-0 shadow-md ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-amber-500/20 via-slate-900 to-amber-500/5 border-amber-500/40 text-amber-400 shadow-amber-500/10'
                      : 'bg-gradient-to-br from-amber-500 to-amber-600 border-amber-400 text-slate-950 shadow-amber-500/20'
                  }`}>
                    <ActiveIcon className="w-7 h-7" />
                  </div>

                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400">
                      <Sparkles className="w-3 h-3" />
                      <span>{isAr ? 'قطاع تنفيذي معتمد' : 'Accredited Executive Sector'}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      {activeDept.name[lang] || activeDept.name.ar}
                    </h3>
                  </div>
                </div>

                {/* Mandate & Strategic Scope */}
                <div className={`p-5 rounded-2xl border ${
                  theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
                    <Target className="w-3.5 h-3.5" />
                    <span>{isAr ? 'المهام والاختصاص الاستراتيجي' : 'Strategic Mandate & Scope'}</span>
                  </h4>
                  <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
                    {activeDept.overview[lang] || activeDept.overview.ar}
                  </p>
                </div>

                {/* Key Performance Indicators (Properly localized, no flipped numbers) */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-2">
                    <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isAr ? 'مؤشرات الأداء والكفاءة التشغيلية' : 'Key Performance Indicators'}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {activeDept.kpis.map((kpi, idx) => (
                      <div 
                        key={idx} 
                        className={`p-4 rounded-2xl border text-center transition-all ${
                          theme === 'dark' 
                            ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40' 
                            : 'bg-white border-slate-200 hover:border-amber-400 shadow-sm'
                        }`}
                      >
                        <div className="text-lg sm:text-xl font-black font-mono text-amber-500 dark:text-amber-400">
                          {formatKpiValue(kpi.value)}
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-300 font-semibold mt-1 leading-snug">
                          {kpi.label[lang] || kpi.label.ar}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
