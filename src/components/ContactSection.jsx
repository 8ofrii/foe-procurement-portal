import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  HelpCircle, 
  ChevronDown, 
  Building, 
  ShieldCheck,
  Clock,
  ExternalLink
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
          <h2 className="text-2xl sm:text-4xl font-black leading-snug sm:leading-normal text-slate-900 dark:text-white">
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

        {/* Official Locations & Working Hours Cards (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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
                {isAr ? 'الدور الثالث — مدينة نصر — القاهرة' : 'Floor 3 — Nasr City — Cairo'}
              </div>
              <a
                href={info.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mt-2 pt-1 border-t border-slate-200 dark:border-slate-800"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{isAr ? 'الاتجاهات عبر خرائط Google ↗' : 'Directions on Google Maps ↗'}</span>
              </a>
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

          {/* Hotline & Email */}
          <div className="glass-card p-6 rounded-2xl flex items-start gap-4 border-amber-500/30">
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

        {/* Interactive Google Maps Card for Tucano Mall Floor 3 */}
        <div className={`mb-16 rounded-3xl border overflow-hidden shadow-2xl relative transition-all ${
          theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {/* Header Bar */}
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20 flex-shrink-0 mt-0.5 sm:mt-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-black text-slate-900 dark:text-white">
                  {isAr ? 'موقع المقر وقاعة اللجان: توكانو مول — الدور الثالث' : 'Headquarters & Committees Hall: Tucano Mall — Floor 3'}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                  {isAr 
                    ? 'شارع يوسف عباس — مدينة نصر — القاهرة (بالقرب من مستشفى دار الفؤاد وجامعة الأزهر)'
                    : 'Yousef Abbas St., Nasr City, Cairo (near Dar Al Fouad Hospital & Al-Azhar University)'}
                </p>
              </div>
            </div>

            <a
              href={info.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20 flex-shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isAr ? 'فتح في خرائط Google (Google Maps) ↗' : 'Open in Google Maps ↗'}</span>
            </a>
          </div>

          {/* Map Embed Container */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 bg-slate-950">
            <iframe
              title="Tucano Mall Google Maps Location"
              src="https://maps.google.com/maps?q=Tucano+Commercial+Complex,+Youssef+Abbas,+Nasr+City,+Cairo&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Floating Info Overlay Pill */}
            <div className="absolute bottom-4 right-4 max-w-sm p-4 rounded-2xl border backdrop-blur-md shadow-xl bg-slate-950/90 border-amber-500/40 text-white text-xs space-y-1 hidden sm:block">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5" />
                <span>{isAr ? 'توكانو مول — الدور الثالث' : 'Tucano Mall — Floor 3'}</span>
              </div>
              <p className="text-[11px] text-slate-300">
                {isAr 
                  ? 'قاعة اللجان المركزية وإدارة الشراء الموحد — جهاز مستقبل مصر' 
                  : 'Central Committees Hall & Unified Procurement Directorate — FOE'}
              </p>
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
                  className={`w-full ${isAr ? 'text-right' : 'text-left'} p-3.5 sm:p-5 flex items-center justify-between gap-3 cursor-pointer`}
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
