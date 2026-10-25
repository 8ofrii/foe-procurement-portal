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

  // FIX: Bidirectional match — query matches keyword OR keyword starts with query
  const COMMITTEE_KEYWORDS = [
    '\u0644\u062c\u0627\u0646', '\u0644\u062c\u0646\u0629', '\u0627\u0631\u0632', '\u0623\u0631\u0632', '\u0631\u0632',
    '\u062c\u0645\u0628\u0631\u064a', '\u0631\u0624\u0648\u0633', '\u0645\u0648\u0627\u0634\u064a',
    '\u0645\u0648\u0627\u0639\u064a\u062f', '\u062b\u0644\u0627\u062b\u0627\u0621',
    '\u0627\u062b\u0646\u064a\u0646', '\u0627\u0644\u0623\u062d\u062f',
    'committee', 'rice', 'shrimp', 'cattle', 'livestock'
  ];

  const committeeResults = cleanQuery && COMMITTEE_KEYWORDS.some(kw =>
    cleanQuery.includes(kw) || kw.includes(cleanQuery)
  ) ? [
    {
      id: 'sunday-rice',
      title: isAr ? '\u0644\u062c\u0646\u0629 \u0627\u0644\u0623\u0631\u0632 \u0627\u0644\u0623\u0633\u0628\u0648\u0639\u064a\u0629 (\u0643\u0644 \u0623\u062d\u062f 02:00 \u0638\u0647\u0631\u0627\u064b \u2014 \u0627\u0644\u0623\u0648\u0644\u0648\u064a\u0629 \u0628\u0623\u0633\u0628\u0642\u064a\u0629 \u0627\u0644\u062a\u0648\u0627\u062c\u062f)' : 'Weekly Rice Committee (Sundays 02:00 PM \u2014 Physical Attendance Priority)',
      badge: isAr ? '\u0623\u0633\u0628\u0648\u0639\u064a \u062b\u0627\u0628\u062a' : 'Fixed Weekly'
    },
    {
      id: 'tuesday-cattle',
      title: isAr ? '\u0644\u062c\u0646\u0629 \u0627\u0644\u0631\u0624\u0648\u0633 \u0627\u0644\u062d\u064a\u0629 (\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621 02:00 \u0638\u0647\u0631\u0627\u064b \u2014 \u062f\u0648\u0631\u064a\u0629 \u062a\u0628\u0627\u062f\u0644\u064a\u0629)' : 'Live Cattle Committee (Tuesday 02:00 PM \u2014 Bi-weekly)',
      badge: isAr ? '\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621' : 'Tuesday'
    },
    {
      id: 'monday-shrimp',
      title: isAr ? '\u0644\u062c\u0646\u0629 \u0627\u0644\u062c\u0645\u0628\u0631\u064a (\u0627\u0644\u0627\u062b\u0646\u064a\u0646 02:00 \u0638\u0647\u0631\u0627\u064b \u2014 \u062f\u0648\u0631\u064a\u0629 \u062a\u0628\u0627\u062f\u0644\u064a\u0629)' : 'Shrimp Committee (Monday 02:00 PM \u2014 Bi-weekly)',
      badge: isAr ? '\u0627\u0644\u0627\u062b\u0646\u064a\u0646' : 'Monday'
    }
  ] : [];

  const totalResults = newsResults.length + tenderResults.length + deptResults.length + commResults.length + committeeResults.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isAr ? '\u0627\u0644\u0628\u062d\u062b \u0641\u064a \u0627\u0644\u0628\u0648\u0627\u0628\u0629' : 'Portal Search'}
      className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 p-2.5 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
    >
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
            placeholder={isAr ? '\u0627\u0628\u062d\u062b \u0641\u064a \u0627\u0644\u0623\u062e\u0628\u0627\u0631\u060c \u0627\u0644\u0645\u0646\u0627\u0642\u0635\u0627\u062a\u060c \u0627\u0644\u0625\u062f\u0627\u0631\u0627\u062a\u060c \u0627\u0644\u0633\u0644\u0639 \u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629...' : 'Search news, tenders, departments, commodities...'}
            className={`w-full border rounded-2xl ${isAr ? 'pl-10 pr-12' : 'pr-10 pl-12'} py-3 sm:py-3.5 text-xs sm:text-base focus:outline-none focus:border-amber-500 ${
              theme === 'dark' ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />
          <Search className={`w-4 h-4 sm:w-5 sm:h-5 text-amber-500 absolute ${isAr ? 'right-4' : 'left-4'} top-3.5 sm:top-4`} />
          <button
            onClick={onClose}
            aria-label={isAr ? '\u0625\u063a\u0644\u0627\u0642' : 'Close'}
            className={`absolute ${isAr ? 'left-3' : 'right-3'} top-3 sm:top-3.5 p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 cursor-pointer`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto flex-1 space-y-4 pr-1">
          {!cleanQuery ? (
            <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
              {isAr ? '\u0627\u0643\u062a\u0628 \u0643\u0644\u0645\u0629 \u0644\u0644\u0628\u062d\u062b \u0627\u0644\u0641\u0648\u0631\u064a \u0639\u0628\u0631 \u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0628\u0648\u0627\u0628\u0629' : 'Type to search across the portal'}
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
              {isAr ? `\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c \u062a\u0637\u0627\u0628\u0642 "${query}".` : `No results matching "${query}".`}
            </div>
          ) : (
            <>
              {committeeResults.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5">
                    <Wheat className="w-3.5 h-3.5" />
                    <span>{isAr ? '\u062c\u062f\u0648\u0644 \u0644\u062c\u0627\u0646 \u0627\u0644\u0628\u062a \u0648\u0627\u0644\u062a\u0648\u0631\u064a\u062f' : 'Procurement Committees Schedule'}</span>
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
                    <span>{isAr ? '\u0627\u0644\u0645\u0646\u0627\u0642\u0635\u0627\u062a \u0648\u0627\u0644\u0645\u0645\u0627\u0631\u0633\u0627\u062a' : 'Tenders'}</span>
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
                    <span>{isAr ? '\u0627\u0644\u0623\u062e\u0628\u0627\u0631 \u0648\u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a' : 'News'}</span>
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
                    <span>{isAr ? '\u0627\u0644\u0625\u062f\u0627\u0631\u0627\u062a \u0627\u0644\u062a\u062e\u0635\u0635\u064a\u0629' : 'Departments'}</span>
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
                    <span>{isAr ? '\u0627\u0644\u0633\u0644\u0639 \u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629' : 'Commodities'}</span>
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
                        <div className="text-xs font-semibold">{c.name[lang] || c.name.ar} - {c.coverageMonths} {isAr ? '\u0623\u0634\u0647\u0631' : 'Months'}</div>
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
          <span>{isAr ? '\u0627\u0636\u063a\u0637 ESC \u0644\u0644\u0625\u063a\u0644\u0627\u0642' : 'Press ESC to close'}</span>
          <span>Mostaqbal Misr Agency</span>
        </div>
      </div>
    </div>
  );
}
