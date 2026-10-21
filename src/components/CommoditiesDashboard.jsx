import React, { useState } from 'react';
import { 
  Wheat, 
  Droplets, 
  Boxes, 
  Sprout, 
  ShieldCheck, 
  TrendingUp, 
  Ship,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Download,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { STRATEGIC_COMMODITIES } from '../data/portalData';

export default function CommoditiesDashboard({ lang, theme }) {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState('poster'); // 'poster' or 'infographic'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const iconMap = {
    Wheat: Wheat,
    Droplets: Droplets,
    Boxes: Boxes,
    Sprout: Sprout
  };

  const currentImage = activeTab === 'poster' 
    ? '/assets/achievements-poster.png' 
    : '/assets/official-infographic.png';

  const currentTitle = activeTab === 'poster'
    ? (isAr ? 'ملصق أرقام وإنجازات جهاز مستقبل مصر' : 'Mostaqbal Misr Achievements Poster')
    : (isAr ? 'الإعلان الرسمي لإدارة الشراء الموحد' : 'Official Unified Procurement Notice');

  const handleOpenModal = (tab = activeTab) => {
    setActiveTab(tab);
    setZoomLevel(1);
    setIsModalOpen(true);
  };

  return (
    <section id="commodities" className={`py-20 relative border-t transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 space-y-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold border ${
            theme === 'dark'
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>{isAr ? 'مرصد السلع والمخزون الاستراتيجي' : 'Strategic Commodities & Reserves Observatory'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-[1.4] sm:leading-[1.45] pb-1">
            {isAr ? 'مؤشرات المخزون الاستراتيجي والسلع الأساسية' : 'Strategic Reserves & Commodity Indicators'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {isAr ? (
              'رصد دوري لمعدلات تغطية الاحتياطي الاستراتيجي لجهاز مستقبل مصر، ومعدلات الأمان السلعي، وتنوع مصادر التوريد الدولية.'
            ) : (
              'Real-time overview of strategic reserve coverage months, annual volumes, and diversified global supply origins.'
            )}
          </p>
        </div>

        {/* Strategic Reserves Grid & Achievement Visual Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Commodities List (7 cols on lg) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STRATEGIC_COMMODITIES.map((item) => {
              const Icon = iconMap[item.icon] || Wheat;
              const percentage = Math.min(Math.round((item.coverageMonths / item.targetCoverage) * 100), 100);

              return (
                <div 
                  key={item.id}
                  className="glass-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    {/* Status Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-amber-500" />
                        <span>{item.status[lang] || item.status.ar}</span>
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                        {item.annualVolume}
                      </span>
                    </div>

                    {/* Commodity Name & Icon */}
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className={`p-3 rounded-xl border ${
                        theme === 'dark' 
                          ? 'bg-slate-900 border-slate-800 text-amber-400' 
                          : 'bg-amber-50 border-amber-200 text-amber-700'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                          {item.name[lang] || item.name.ar}
                        </h3>
                        <div className="text-xs text-sky-600 dark:text-sky-400 font-medium">
                          {isAr ? 'سلعة استراتيجية أساسية' : 'Strategic Essential'}
                        </div>
                      </div>
                    </div>

                    {/* Coverage Progress Bar */}
                    <div className={`p-4 rounded-xl border mb-3 ${
                      theme === 'dark' ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-xs text-slate-500 font-medium">
                          {isAr ? 'معدل التغطية الحالي:' : 'Current Coverage:'}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
                            {item.coverageMonths}
                          </span>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {isAr ? 'أشهر' : 'Months'}
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-700"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Origins */}
                    <div className="text-xs text-slate-600 dark:text-slate-200 flex items-start gap-1.5 mt-2 font-medium">
                      <Ship className="w-3.5 h-3.5 text-sky-500 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item.origins[lang] || item.origins.ar}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Official Visual Achievement Poster (5 cols on lg) - Full Natural Aspect & Interactive */}
          <div className="lg:col-span-5 flex flex-col">
            <div className={`p-5 sm:p-6 rounded-3xl border shadow-xl flex flex-col justify-between h-full relative overflow-hidden ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              {/* Header with Switcher Tabs */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isAr ? 'المنشورات والبيانات الرسمية' : 'Official Publications'}</span>
                  </div>

                  {/* Tab Selector */}
                  <div className={`inline-flex p-1 rounded-xl border text-[11px] font-semibold ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <button
                      onClick={() => setActiveTab('poster')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        activeTab === 'poster'
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {isAr ? 'أرقام وإنجازات' : 'Milestones'}
                    </button>
                    <button
                      onClick={() => setActiveTab('infographic')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        activeTab === 'infographic'
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {isAr ? 'الركائز الست' : '6 Pillars'}
                    </button>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2">
                  {activeTab === 'poster' 
                    ? (isAr ? 'ملصق أرقام وإنجازات التنمية المستدامة' : 'Sustainable Milestones & Food Security Poster')
                    : (isAr ? 'إنفوجرافيك إدارة الشراء الموحد المعتمد' : 'Approved Unified Procurement Infographic')
                  }
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {activeTab === 'poster'
                    ? (isAr 
                        ? 'عرض توثيقي صادر عن الجهاز يبرز أرقام وطفرات التنمية المستدامة واستصلاح الدلتا الجديدة ومجمعات الصوامع.'
                        : 'Official agency publication showcasing sustainable achievements, New Delta expansion, and smart silos.')
                    : (isAr
                        ? 'الإعلان الرسمي الصادر عن إدارة الشراء الموحد موضحاً الركائز الاستراتيجية الست لضبط الأسواق.'
                        : 'Official announcement defining the six strategic pillars for national procurement.')
                  }
                </p>
              </div>

              {/* Achievements Poster Image - FULL PROPORTIONS, NO CROPPING */}
              <div 
                onClick={() => handleOpenModal(activeTab)}
                className={`relative rounded-2xl overflow-hidden border cursor-pointer group shadow-md transition-all hover:shadow-2xl hover:border-amber-500/50 flex items-center justify-center p-2 ${
                  theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-100/80 border-slate-200'
                }`}
              >
                <img 
                  src={currentImage} 
                  alt={currentTitle} 
                  className="w-full max-h-[380px] sm:max-h-[420px] object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-300" 
                />

                {/* Hover Overlay for desktop */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex flex-col items-center justify-center gap-2 text-white p-4 text-center rounded-2xl backdrop-blur-xs">
                  <div className="p-3 rounded-full bg-amber-500 text-slate-950 shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black">
                    {isAr ? 'اضغط لتكبير وعرض المنشور بدقة كاملة' : 'Click to inspect high-resolution poster'}
                  </span>
                </div>

                {/* Mobile Tap-to-Enlarge Pill */}
                <div className="absolute bottom-3 left-3 sm:hidden px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-amber-500/50 text-[10px] font-bold text-amber-400 flex items-center gap-1 shadow-lg pointer-events-none">
                  <Maximize2 className="w-3 h-3" />
                  <span>{isAr ? 'انقر للتكبير' : 'Tap to zoom'}</span>
                </div>
              </div>

              {/* Action Buttons & Key Indicators */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className={`p-2 rounded-xl border text-center ${
                    theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="text-[10px] text-slate-500 font-medium">{isAr ? 'استصلاح الدلتا' : 'Reclamation'}</div>
                    <div className="text-xs font-black font-mono text-amber-600 dark:text-amber-400">2.2M Feddans</div>
                  </div>
                  <div className={`p-2 rounded-xl border text-center ${
                    theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="text-[10px] text-slate-500 font-medium">{isAr ? 'الصوامع الذكية' : 'Smart Silos'}</div>
                    <div className="text-xs font-black font-mono text-amber-600 dark:text-amber-400">5.5M Tons</div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenModal(activeTab)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                  <span>{isAr ? 'عرض المنشور بالحجم الكامل والتحميل' : 'View Fullscreen & Download'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Poster Lightbox Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className={`border rounded-3xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl relative max-h-[95vh] flex flex-col ${
            theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-3 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 sm:p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-base font-black truncate max-w-[140px] xs:max-w-[220px] sm:max-w-none">
                    {currentTitle}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 hidden xs:block truncate">
                    {isAr ? 'جهاز مستقبل مصر للتنمية المستدامة' : 'Future of Egypt Agency for Sustainable Development'}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <div className={`flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 rounded-xl border ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}>
                  <button 
                    onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))} 
                    className="p-1 sm:p-1.5 rounded-lg opacity-70 hover:opacity-100 cursor-pointer"
                    title="تصغير"
                  >
                    <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button 
                    onClick={() => setZoomLevel(1)} 
                    className="px-1.5 sm:px-2 text-[10px] sm:text-xs font-mono"
                    title="إعادة ضبط"
                  >
                    {Math.round(zoomLevel * 100)}%
                  </button>
                  <button 
                    onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))} 
                    className="p-1 sm:p-1.5 rounded-lg opacity-70 hover:opacity-100 cursor-pointer"
                    title="تكبير"
                  >
                    <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>

                <a
                  href={currentImage}
                  download={activeTab === 'poster' ? 'Mostaqbal-Misr-Achievements.png' : 'Mostaqbal-Misr-Procurement.png'}
                  className="p-1.5 sm:p-2 rounded-xl border hover:text-amber-500 transition-colors"
                  title={isAr ? 'تحميل الصورة' : 'Download Image'}
                >
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 sm:p-2 rounded-xl border hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title={isAr ? 'إغلاق' : 'Close'}
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body with Zoomable Image */}
            <div className={`rounded-2xl border overflow-auto flex-1 flex items-center justify-center p-2 sm:p-3 min-h-[50vh] sm:min-h-[60vh] max-h-[68vh] sm:max-h-[75vh] ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <div 
                className="transition-transform duration-200 origin-center flex items-center justify-center max-w-full"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <img 
                  src={currentImage} 
                  alt={currentTitle} 
                  className="max-h-[60vh] sm:max-h-[70vh] object-contain rounded-xl shadow-2xl select-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => { setActiveTab('poster'); setZoomLevel(1); }}
                  className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-lg font-bold transition-all text-center cursor-pointer text-[11px] sm:text-xs ${
                    activeTab === 'poster'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'border text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isAr ? 'ملصق أرقام وإنجازات' : 'Achievements Poster'}
                </button>
                <button
                  onClick={() => { setActiveTab('infographic'); setZoomLevel(1); }}
                  className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-lg font-bold transition-all text-center cursor-pointer text-[11px] sm:text-xs ${
                    activeTab === 'infographic'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'border text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isAr ? 'إنفوجرافيك الشراء الموحد' : 'Procurement Notice'}
                </button>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-auto px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-bold text-center cursor-pointer transition-colors"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
