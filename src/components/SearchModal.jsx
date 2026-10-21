import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Newspaper, 
  FileSpreadsheet, 
  Building2, 
  Wheat, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react';
import { NEWS_ARTICLES, TENDERS, DEPARTMENTS, STRATEGIC_COMMODITIES } from '../data/portalData';

export default function SearchModal({ isOpen, onClose, lang, theme, onSelectResult }) {
  if (!isOpen) return null;
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const cleanQuery = query.trim().toLowerCase();

  const newsResults = cleanQuery 
    ? NEWS_ARTICLES.filter(n => (n.title[lang] || n.title.ar).toLowerCase().includes(cleanQuery))
    : [];

  const tenderResults = cleanQuery
    ? TENDERS.filter(t => (t.title[lang] || t.title.ar).toLowerCase().includes(cleanQuery) || t.id.toLowerCase().includes(cleanQuery))
    : [];

  const deptResults = cleanQuery
    ? DEPARTMENTS.filter(d => (d.name[lang] || d.name.ar).toLowerCase().includes(cleanQuery))
    : [];

  const commResults = cleanQuery
    ? STRATEGIC_COMMODITIES.filter(c => (c.name[lang] || c.name.ar).toLowerCase().includes(cleanQuery))
    : [];

  const committeeResults = cleanQuery && (
    'لجان'.includes(cleanQuery) ||
    'لجنة'.includes(cleanQuery) ||
    'ارز'.includes(cleanQuery) ||
    'أرز'.includes(cleanQuery) ||
    'رز'.includes(cleanQuery) ||
    'جمبري'.includes(cleanQuery) ||
    'رؤوس حية'.includes(cleanQuery) ||
    'رؤوس'.includes(cleanQuery) ||
    'مواشي'.includes(cleanQuery) ||
    'مواعيد'.includes(cleanQuery) ||
    'ثلاثاء'.includes(cleanQuery) ||
    'اثنين'.includes(cleanQuery) ||
    'الأحد'.includes(cleanQuery) ||
    'committee'.includes(cleanQuery) ||
    'rice'.includes(cleanQuery) ||
    'shrimp'.includes(cleanQuery) ||
    'cattle'.includes(cleanQuery)
  ) ? [
    {
      id: 'sunday-rice',
      title: isAr ? 'لجنة الأرز الأسبوعية (كل أحد 2:00 ظهراً — 25/10/2026 — الأولوية بالتواجد)' : 'Weekly Rice Committee (Sundays 02:00 PM — 25/10/2026)',
      badge: isAr ? 'أسبوعي ثابت' : 'Fixed Weekly'
    },
    {
      id: 'tuesday-cattle',
      title: isAr ? 'لجنة الرؤوس الحية (الثلاثاء 27/10/2026 — 2:00 ظهراً — أسبوع وأسبوع 🐂)' : 'Live Cattle Committee (Tuesday 27/10/2026 — Bi-weekly 🐂)',
      badge: isAr ? 'الثلاثاء 27/10' : 'Tue 27/10'
    },
    {
      id: 'monday-shrimp',
      title: isAr ? 'لجنة الجمبري (الاثنين 2:00 ظهراً — انعقدت 19/10 والقادمة: 02/11/2026 🦐)' : 'Shrimp Committee (Mondays — Held 19/10, Next: 02/11 🦐)',
      badge: isAr ? 'الاثنين 02/11' : 'Mon 02/11'
    }
  ] : [];

  const totalResults = newsResults.length + tenderResults.length + deptResults.length + commResults.length + committeeResults.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 p-2.5 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className={`border rounded-3xl max-w-2xl w-full p-3.5 sm:p-6 shadow-2xl relative max-h-[88vh] sm:max-h-[80vh] flex flex-col ${
        theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Search Input Bar */}
        <div className="relative mb-3 sm:mb-4">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isAr ? 'ابحث في الأخبار، المناقصات، الإدارات، السلع الاستراتيجية...' : 'Search news, tenders, departments, commodities...'}
            className={`w-full border rounded-2xl ${isAr ? 'pl-10 pr-12' : 'pr-10 pl-12'} py-3 sm:py-3.5 text-xs sm:text-base focus:outline-none focus:border-amber-500 ${
              theme === 'dark' ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />
          <Search className={`w-4 h-4 sm:w-5 sm:h-5 text-amber-500 absolute ${isAr ? 'right-4' : 'left-4'} top-3.5 sm:top-4`} />
          <button
            onClick={onClose}
            className={`absolute ${isAr ? 'left-3' : 'right-3'} top-3 sm:top-3.5 p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 cursor-pointer`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto flex-1 space-y-4 pr-1">
          {!cleanQuery ? (
            <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
              {isAr ? 'اكتب كلمة للبحث الفوري عبر أقسام البوابة' : 'Type to search across the portal'}
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
              {isAr ? `لا توجد نتائج تطابق "${query}".` : `No results matching "${query}".`}
            </div>
          ) : (
            <>
              {committeeResults.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5">
                    <Wheat className="w-3.5 h-3.5" />
                    <span>{isAr ? 'جدول لجان البت والتوريد' : 'Procurement Committees Schedule'}</span>
                  </div>
                  <div className="space-y-1.5">
                    {committeeResults.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          onClose();
                          onSelectResult('committees');
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-colors flex items-center justify-between ${
                          theme === 'dark' ? 'bg-slate-950 hover:bg-slate-800 border-amber-500/30' : 'bg-amber-50/70 hover:bg-amber-100/80 border-amber-200'
                        }`}
                      >
                        <div>
                          <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold ml-2">[{c.badge}]</span>
                          <span className="text-xs font-semibold">{c.title}</span>
                        </div>
                        <ArrowIcon className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tenderResults.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-sky-500 mb-2 flex items-center gap-1.5">
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>{isAr ? 'المناقصات والممارسات' : 'Tenders'}</span>
                  </div>
                  <div className="space-y-1.5">
                    {tenderResults.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          onClose();
                          onSelectResult('tenders');
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-colors flex items-center justify-between ${
                          theme === 'dark' ? 'bg-slate-950 hover:bg-slate-800 border-slate-800' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        <div>
                          <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold ml-2">{t.id}</span>
                          <span className="text-xs font-semibold">{t.title[lang] || t.title.ar}</span>
                        </div>
                        <ArrowIcon className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {newsResults.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5" />
                    <span>{isAr ? 'الأخبار والبيانات' : 'News'}</span>
                  </div>
                  <div className="space-y-1.5">
                    {newsResults.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          onClose();
                          onSelectResult('news');
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-colors flex items-center justify-between ${
                          theme === 'dark' ? 'bg-slate-950 hover:bg-slate-800 border-slate-800' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        <div className="text-xs font-semibold line-clamp-1">{n.title[lang] || n.title.ar}</div>
                        <ArrowIcon className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {deptResults.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-500 mb-2 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{isAr ? 'الإدارات التخصصية' : 'Departments'}</span>
                  </div>
                  <div className="space-y-1.5">
                    {deptResults.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => {
                          onClose();
                          onSelectResult('departments');
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-colors flex items-center justify-between ${
                          theme === 'dark' ? 'bg-slate-950 hover:bg-slate-800 border-slate-800' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        <div className="text-xs font-semibold">{d.name[lang] || d.name.ar}</div>
                        <ArrowIcon className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {commResults.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-yellow-500 mb-2 flex items-center gap-1.5">
                    <Wheat className="w-3.5 h-3.5" />
                    <span>{isAr ? 'السلع الاستراتيجية' : 'Commodities'}</span>
                  </div>
                  <div className="space-y-1.5">
                    {commResults.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          onClose();
                          onSelectResult('commodities');
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-colors flex items-center justify-between ${
                          theme === 'dark' ? 'bg-slate-950 hover:bg-slate-800 border-slate-800' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        <div className="text-xs font-semibold">{c.name[lang] || c.name.ar} - {c.coverageMonths} {isAr ? 'أشهر' : 'Months'}</div>
                        <ArrowIcon className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 mt-3 flex items-center justify-between text-[11px] text-slate-400">
          <span>{isAr ? 'اضغط ESC للإغلاق' : 'Press ESC to close'}</span>
          <span>Mostaqbal Misr Agency</span>
        </div>
      </div>
    </div>
  );
}
