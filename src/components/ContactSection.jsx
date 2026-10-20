import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  HelpCircle, 
  ChevronDown, 
  Building, 
  ShieldCheck,
  Clock
} from 'lucide-react';
import { PORTAL_INFO, FAQ_LIST } from '../data/portalData';

export default function ContactSection({ lang, theme }) {
  const isAr = lang === 'ar';
  const info = PORTAL_INFO[lang] || PORTAL_INFO.ar;
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="contact" className={`py-20 relative border-t transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold border ${
            theme === 'dark'
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              : 'bg-amber-100 border-amber-300 text-amber-800'
          }`}>
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{isAr ? 'المقرات الرسمية وقنوات الاتصال' : 'Headquarters & Official Directory'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {isAr ? 'المقر الرئيسي والأسئلة الشائعة' : 'Main Headquarters & FAQ'}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {isAr ? (
              'المقر الرئيسي لإدارة الشراء الموحد بجهاز مستقبل مصر للتنمية المستدامة، وقنوات المراسلات الرسمية للجهات والمؤسسات الدولية.'
            ) : (
              'Official headquarters of Mostaqbal Misr Unified Strategic Procurement Directorate, and institutional communication channels.'
            )}
          </p>
        </div>

        {/* Official Locations & Working Hours Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {/* Main HQ: Tucano Mall */}
          <div className="glass-card p-6 rounded-2xl flex items-start gap-4 border-amber-500/30">
            <div className={`p-3 rounded-xl border flex-shrink-0 ${
              theme === 'dark' ? 'bg-amber-500/15 border-amber-500/40 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-800'
            }`}>
              <MapPin className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                {isAr ? 'المقر الرئيسي للإدارة' : 'Main Headquarters'}
              </div>
              <div className="text-sm font-black text-slate-900 dark:text-white mt-1 leading-snug">
                {info.hqAddress}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {isAr ? 'مدينة نصر - محافظة القاهرة' : 'Nasr City - Cairo Governorate'}
              </div>
            </div>
          </div>

          {/* Official Working Hours */}
          <div className="glass-card p-6 rounded-2xl flex items-start gap-4 border-amber-500/30">
            <div className={`p-3 rounded-xl border flex-shrink-0 ${
              theme === 'dark' ? 'bg-amber-500/15 border-amber-500/40 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-800'
            }`}>
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                {isAr ? 'مواعيد العمل الرسمية' : 'Official Working Hours'}
              </div>
              <div className="text-sm font-black text-slate-900 dark:text-white mt-1 leading-snug">
                {info.workingHours || (isAr ? 'الأحد – الخميس: 9 ص – 5 م' : 'Sun – Thu: 9 AM – 5 PM')}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {isAr ? 'العطلة الرسمية: الجمعة والسبت' : 'Official Weekend: Friday & Saturday'}
              </div>
            </div>
          </div>

          {/* Executive Bureau */}
          <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
            <div className={`p-3 rounded-xl border flex-shrink-0 ${
              theme === 'dark' ? 'bg-sky-500/15 border-sky-500/40 text-sky-400' : 'bg-sky-100 border-sky-300 text-sky-800'
            }`}>
              <Building className="w-6 h-6 text-sky-500" />
            </div>
            <div>
              <div className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                {isAr ? 'المكتب التنفيذي والتعاقدات' : 'Executive Contracts Bureau'}
              </div>
              <div className="text-sm font-black text-slate-900 dark:text-white mt-1 leading-snug">
                {info.cairoOffice}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {isAr ? 'لجان البت والتنسيق الحكومي' : 'Tender Evaluation Bureau'}
              </div>
            </div>
          </div>

          {/* Hotline & Email */}
          <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
            <div className={`p-3 rounded-xl border flex-shrink-0 ${
              theme === 'dark' ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' : 'bg-emerald-100 border-emerald-300 text-emerald-800'
            }`}>
              <PhoneCall className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                {isAr ? 'الخط الساخن والبريد الرسمي' : 'Hotline & Corporate Email'}
              </div>
              <div className="text-xl font-black font-mono text-slate-900 dark:text-white mt-1">
                {info.hotline}
              </div>
              <div className="text-xs text-amber-600 dark:text-amber-400 font-mono mt-0.5">
                {info.email}
              </div>
              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                <a 
                  href={info.facebookUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-2 py-0.5 rounded text-[10px] font-bold border border-slate-300 dark:border-slate-700 hover:border-blue-500 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
                >
                  Facebook
                </a>
                <a 
                  href={info.linkedinUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-2 py-0.5 rounded text-[10px] font-bold border border-slate-300 dark:border-slate-700 hover:border-sky-500 text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href={info.twitterUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-2 py-0.5 rounded text-[10px] font-bold border border-slate-300 dark:border-slate-700 hover:border-amber-500 text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div id="faq" className="max-w-3xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <span>{isAr ? 'الأسئلة الشائعة والإطار التنظيمي' : 'Frequently Asked Questions & Legal Basis'}</span>
          </h3>

          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen 
                    ? (theme === 'dark' ? 'bg-slate-900 border-amber-500/40 shadow-lg' : 'bg-white border-amber-400 shadow-md')
                    : (theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white/80 border-slate-200')
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-right p-5 flex items-center justify-between gap-3"
                >
                  <span className={`text-sm sm:text-base font-bold leading-snug ${
                    isAr ? 'text-right' : 'text-left'
                  } ${isOpen ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
                    {faq.q[lang] || faq.q.ar}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-amber-500 flex-shrink-0 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {isOpen && (
                  <div className={`px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed border-t ${
                    theme === 'dark' ? 'border-slate-800 text-slate-200' : 'border-slate-100 text-slate-700'
                  }`}>
                    {faq.a[lang] || faq.a.ar}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
