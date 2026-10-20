import React from 'react';
import { 
  FileSpreadsheet, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { TENDERS } from '../data/portalData';

export default function TendersSection({ lang, theme }) {
  const isAr = lang === 'ar';

  return (
    <section id="tenders" className={`py-20 relative border-t transition-colors duration-300 ${
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
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>{isAr ? 'فرص التوريد والاحتياجات السلعية للجهاز' : 'Strategic Supply & Procurement Opportunities'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {isAr ? 'إعلانات التوريد والاحتياجات السلعية القائمة' : 'Active Strategic Commodity Requirements'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {isAr ? (
                'إعلانات تأمين الحبوب والزيوت والمعدات التكنولوجية المتطورة لدعم المخزون الاستراتيجي ومجمعات صوامع جهاز مستقبل مصر بالدلتا الجديدة.'
              ) : (
                'Strategic procurement opportunities for grains, edible oils, and silo equipment supporting Mostaqbal Misr Agency reserves.'
              )}
            </p>
          </div>
        </div>


        {/* Tenders Cards Grid */}
        <div className="space-y-4">
          {TENDERS.map((tender) => (
            <div
              key={tender.id}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-300 dark:border-amber-500/20">
                      {tender.id}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${tender.statusColor}`}>
                      {tender.status[lang] || tender.status.ar}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {tender.commodity[lang] || tender.commodity.ar}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {tender.title[lang] || tender.title.ar}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                    {tender.specs[lang] || tender.specs.ar}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300 pt-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isAr ? 'آخر موعد لتلقي العروض الفنية:' : 'Technical Submission Deadline:'}</span>
                    <strong className="font-mono text-slate-900 dark:text-white">{tender.deadline}</strong>
                  </div>
                </div>

                <div className="flex-shrink-0 flex items-center justify-end">
                  <div className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                    theme === 'dark' 
                      ? 'bg-slate-900/90 border-amber-500/30 text-amber-400' 
                      : 'bg-amber-50/90 border-amber-300 text-amber-900'
                  }`}>
                    <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>{isAr ? 'مواصفات قياسية معتمدة' : 'Official Specifications'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer Notice */}
        <div className={`mt-8 p-4 rounded-xl border text-xs flex items-start gap-3 ${
          theme === 'dark' ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
        }`}>
          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {isAr ? (
              'تنبيه رسمي: هذه العمليات والإعلانات خاصة بمنظومة الشراء الموحد بجهاز مستقبل مصر للتنمية المستدامة. يتم تقديم واستلام العروض الفنية بالمقر الرئيسي للإدارة: توكانو مول - الدور الثالث - شارع يوسف عباس - مدينة نصر - القاهرة، وفق المواعيد المقررة.'
            ) : (
              'Official Notice: These procurement announcements are managed by the Unified Procurement Directorate of Future of Egypt Agency for Sustainable Development. Technical proposals are received at the Main Headquarters: Tucano Mall - Floor 3 - Yousef Abbas St. - Nasr City - Cairo.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
