import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  Wheat, 
  Fish, 
  ShieldCheck, 
  FileCheck, 
  Award,
  Layers,
  Sparkles,
  Check
} from 'lucide-react';
import { COMMITTEES_DATA } from '../data/portalData';

export default function CommitteesSection({ lang, theme }) {
  const isAr = lang === 'ar';
  const { header, generalNotice, sessions, attendanceRequirements } = COMMITTEES_DATA;

  // Visual icon mapping
  const iconMap = {
    'sunday-rice': Wheat,
    'tuesday-cattle': Award,
    'monday-shrimp': Fish
  };

  return (
    <section id="committees" className={`py-20 relative border-t transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100/80 border-slate-200'
    }`}>
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold border ${
            theme === 'dark'
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              : 'bg-amber-100 border-amber-300 text-amber-800'
          }`}>
            <Calendar className="w-3.5 h-3.5" />
            <span>{header.badge[lang] || header.badge.ar}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black leading-snug sm:leading-normal text-slate-900 dark:text-white">
            {header.title[lang] || header.title.ar}
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {header.subtitle[lang] || header.subtitle.ar}
          </p>
        </div>

        {/* Central Official Venue & Working Hours Bar */}
        <div className={`mb-10 p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-sm ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/5 border-amber-500/30 text-amber-200'
            : 'bg-gradient-to-r from-amber-50/80 via-white to-amber-50/60 border-amber-200 text-amber-950'
        }`}>
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 flex-shrink-0 font-bold shadow-md shadow-amber-500/20">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {isAr ? 'مقر انعقاد اللجان المعتمد' : 'Official Committee Venue'}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25">
                  {isAr ? 'قاعة اللجان المركزية' : 'Central Sessions Hall'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {generalNotice[lang] || generalNotice.ar}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full lg:w-auto flex-shrink-0">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
              theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}>
              <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span>{isAr ? 'الأحد – الخميس (9 ص – 5 م)' : 'Sun – Thu (9 AM – 5 PM)'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300">
              <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span>{isAr ? 'بدء الجلسات: 02:00 ظهراً' : 'Kickoff: 02:00 PM'}</span>
            </span>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Tucano+Commercial+Complex,+Youssef+Abbas,+Nasr+City,+Cairo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm flex-shrink-0"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{isAr ? 'خرائط Google ↗' : 'Google Maps ↗'}</span>
            </a>
          </div>
        </div>

        {/* 3 Executive Committee Cards in a High-End Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          
          {sessions.map((session) => {
            const isSunday = session.id === 'sunday-rice';
            const isTuesday = session.id === 'tuesday-cattle';
            const isMonday = session.id === 'monday-shrimp';

            // Distinct theme styling per card
            let ribbonColor = 'from-amber-500 via-yellow-400 to-amber-600';
            let themeBg = 'bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-200';
            let borderColor = 'border-amber-300 dark:border-amber-500/40 hover:border-amber-500';
            let badgeStyle = 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30';
            let timeBadge = 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25';
            let clockColor = 'text-amber-500';

            if (isTuesday) {
              ribbonColor = 'from-rose-500 via-orange-400 to-amber-500';
              themeBg = 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-200';
              borderColor = 'border-rose-300 dark:border-rose-500/40 hover:border-rose-500';
              badgeStyle = 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30';
              timeBadge = 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/25';
              clockColor = 'text-rose-500';
            } else if (isMonday) {
              ribbonColor = 'from-emerald-500 via-teal-400 to-sky-500';
              themeBg = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200';
              borderColor = 'border-emerald-300 dark:border-emerald-500/40 hover:border-emerald-500';
              badgeStyle = 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30';
              timeBadge = 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/25';
              clockColor = 'text-emerald-500';
            }

            return (
              <div
                key={session.id}
                className={`rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-xl md:last:col-span-2 lg:last:col-span-1 md:last:max-w-md md:last:mx-auto lg:last:max-w-none w-full ${borderColor} ${
                  theme === 'dark'
                    ? 'bg-slate-900/95 shadow-black/60'
                    : 'bg-white shadow-slate-200'
                }`}
              >
                {/* Top metallic ribbon strip */}
                <div className={`h-1.5 bg-gradient-to-r ${ribbonColor}`}></div>

                <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                  
                  {/* Top Bar: Cadence & Category */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeStyle}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                      <span>{session.badge[lang] || session.badge.ar}</span>
                    </span>

                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {session.category[lang] || session.category.ar}
                    </span>
                  </div>

                  {/* Refined Date & Clock Pass */}
                  <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                    theme === 'dark' ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50/90 border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${badgeStyle}`}>
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                          {session.dayName[lang] || session.dayName.ar}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                          {session.cadence?.[lang] || session.cadence?.ar}
                        </div>
                      </div>
                    </div>

                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold flex-shrink-0 whitespace-nowrap ${timeBadge}`}>
                      <Clock className={`w-3.5 h-3.5 flex-shrink-0 ${clockColor}`} />
                      <span>{session.time[lang] || session.time.ar}</span>
                    </div>
                  </div>

                  {/* Commodity Title & Specification Scope */}
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {session.commodity[lang] || session.commodity.ar}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                      {session.commoditySpecs?.[lang] || session.commoditySpecs?.ar || session.category[lang]}
                    </p>
                  </div>

                  {/* Priority / Session Specific Rule Box (Compact & Balanced) */}
                  <div className={`p-3 rounded-xl border text-xs leading-relaxed ${themeBg}`}>
                    <div className="font-bold mb-1 flex items-center gap-1.5 text-xs">
                      {isSunday && <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />}
                      {isTuesday && <span className="text-sm flex-shrink-0">🐂</span>}
                      {isMonday && <span className="text-sm flex-shrink-0">🦐</span>}
                      <span>{session.priorityRule[lang] || session.priorityRule.ar}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs opacity-90 leading-relaxed font-normal">
                      {session.priorityDetails[lang] || session.priorityDetails.ar}
                    </p>
                  </div>

                </div>

                {/* Bottom Verification & Venue Footer */}
                <div className={`px-4 py-2.5 border-t flex items-center justify-between text-[11px] font-medium ${
                  theme === 'dark' 
                    ? 'bg-slate-950 border-slate-800' 
                    : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>{isAr ? 'قاعة اللجان المركزية' : 'Central Sessions Hall'}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{isAr ? 'جلسة رسمية معتمدة' : 'Official Session'}</span>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

        {/* Attendance & Official Document Verification Standards (Zero mentions of samples) */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
          theme === 'dark' ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-2.5 mb-6">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isAr ? 'ضوابط حضور لجان البت والتوريد والترسية' : 'Procurement Committees Attendance & Documentation Rules'}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {attendanceRequirements.map((req, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-2xl border transition-all sm:last:col-span-2 lg:last:col-span-1 sm:last:max-w-md sm:last:mx-auto lg:last:max-w-none w-full ${
                  theme === 'dark' ? 'bg-slate-950/80 border-slate-800 hover:border-amber-500/50' : 'bg-slate-50 border-slate-200 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 dark:text-white text-sm">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center text-xs font-mono font-black">
                    {idx + 1}
                  </div>
                  <span>{req.title[lang] || req.title.ar}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {req.desc[lang] || req.desc.ar}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
