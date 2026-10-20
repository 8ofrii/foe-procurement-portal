import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  FileCheck2, 
  Globe2, 
  Scale, 
  Building2, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { ACCREDITATION_STANDARDS, PORTAL_INFO } from '../data/portalData';

export default function AccreditationStandardsSection({ lang, theme }) {
  const isAr = lang === 'ar';
  const info = PORTAL_INFO[lang] || PORTAL_INFO.ar;

  const icons = [Scale, Globe2, Award, FileCheck2];

  return (
    <section id="standards" className={`py-20 relative border-t transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold border ${
            theme === 'dark'
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              : 'bg-amber-100 border-amber-300 text-amber-800'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isAr ? 'الشفافية والحوكمة التعاقدية' : 'Governance & Trade Standards'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black leading-snug sm:leading-normal text-slate-900 dark:text-white">
            {ACCREDITATION_STANDARDS.title[lang] || ACCREDITATION_STANDARDS.title.ar}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {ACCREDITATION_STANDARDS.subtitle[lang] || ACCREDITATION_STANDARDS.subtitle.ar}
          </p>
        </div>

        {/* 4 Core Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {ACCREDITATION_STANDARDS.criteria.map((item, idx) => {
            const Icon = icons[idx] || ShieldCheck;
            return (
              <div 
                key={item.code}
                className="glass-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded border text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20">
                      {item.code}
                    </span>
                    <span className="text-xs text-slate-400">
                      {isAr ? 'معيار إلزامي معتمد' : 'Mandatory Standard'}
                    </span>
                  </div>

                  <div className="flex items-start gap-3.5 mb-3">
                    <div className={`p-3 rounded-xl border flex-shrink-0 ${
                      theme === 'dark' 
                        ? 'bg-slate-900 border-slate-800 text-amber-400' 
                        : 'bg-amber-50 border-amber-200 text-amber-700'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {item.title[lang] || item.title.ar}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                    {item.desc[lang] || item.desc.ar}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* View-Only Sovereign Reference Banner */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 ${
          theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="space-y-2">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-500" />
              <span>{isAr ? 'قنوات التنسيق الرسمي لبيوت التجارة الدولية' : 'Official Trade Liaison Channels'}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {isAr ? (
                'تتولى إدارة علاقات الموردين والتعاقدات الدولية مراجعة ملفات الجدارة الائتمانية عبر المراسلات الرسمية بالمقر الرئيسي للإدارة: توكانو مول - شارع يوسف عباس - مدينة نصر - القاهرة.'
              ) : (
                'Creditworthiness and trade accreditation files are evaluated via official corporate correspondence at the Main Headquarters: Tucano Mall - Yousef Abbas St. - Nasr City - Cairo.'
              )}
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href={`mailto:${info.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all font-mono"
            >
              <span>{info.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
