import React, { useState } from 'react';
import { 
  Newspaper, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  X, 
  Eye, 
  Sparkles 
} from 'lucide-react';
import { NEWS_ARTICLES } from '../data/portalData';

export default function NewsSection({ lang, theme, onOpenInfographic }) {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section id="news" className={`py-20 relative border-t transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
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
              <Newspaper className="w-3.5 h-3.5" />
              <span>{isAr ? 'المركز الإعلامي والبيانات الرسمية' : 'Media Center & Press Releases'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {isAr ? 'أحدث أخبار ومستجدات الشراء الموحد' : 'Latest News & Strategic Updates'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {isAr ? (
                'متابعة رسمية لتحركات شحنات السلع الاستراتيجية بالموانئ، نتائج المناقصات، وبرامج تعزيز المخزون القومي.'
              ) : (
                'Official coverage of strategic bulk vessel operations, forward grain tenders, and national buffer enhancements.'
              )}
            </p>
          </div>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEWS_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-sm hover:shadow-xl group"
            >
              {article.image && (
                <div className="h-44 w-full overflow-hidden relative border-b border-slate-200 dark:border-slate-800">
                  <img 
                    src={article.image} 
                    alt={article.title[lang] || article.title.ar}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                  <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] shadow">
                    {article.category[lang] || article.category.ar}
                  </span>
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="flex items-center gap-1 font-mono text-slate-500 text-[11px]">
                      <Calendar className="w-3 h-3 text-amber-500" />
                      <span>{article.date}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug mb-3 line-clamp-2 group-hover:text-amber-500 transition-colors">
                    {article.title[lang] || article.title.ar}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {article.summary[lang] || article.summary.ar}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>{isAr ? 'قراءة البيان كاملاً' : 'Read Full Statement'}</span>
                    <ArrowIcon className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Read Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className={`border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto ${
            theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold">
                {selectedArticle.category[lang] || selectedArticle.category.ar}
              </span>
              <span className="text-xs text-slate-400 font-mono">{selectedArticle.date}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug mb-4">
              {selectedArticle.title[lang] || selectedArticle.title.ar}
            </h3>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 text-sm leading-relaxed space-y-4 whitespace-pre-line text-slate-700 dark:text-slate-200 font-normal">
              <p>
                {selectedArticle.details?.[lang] || selectedArticle.details?.ar || selectedArticle.summary[lang] || selectedArticle.summary.ar}
              </p>
              
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
                {isAr 
                  ? 'المكتب الإعلامي والتنسيق الحكومي — إدارة الشراء الموحد وتأمين السلع الاستراتيجية — جهاز مستقبل مصر للتنمية المستدامة.' 
                  : 'Media & Government Coordination Bureau — Unified Strategic Procurement Directorate — Future of Egypt Agency.'}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                {isAr ? 'إغلاق البيان' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
