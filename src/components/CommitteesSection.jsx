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

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
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
            : 'bg-gradient-to-r from-amber-50 via-white to-amber-50/80 border-amber-200 text-amber-950'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 flex-shrink-0 font-bold shadow-md shadow-amber-500/20">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold block sm:inline">
                {isAr ? 'مقر انعقاد اللجان المعتمد: ' : 'Official Sessions Hall: '}
              </span>
              <span className="opacity-90">{generalNotice[lang] || generalNotice.ar}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
              theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-amber-300 text-amber-900 shadow-sm'
            }`}>
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>{isAr ? 'مواعيد العمل الرسمية: من الأحد إلى الخميس (9:00 ص – 5:00 م)' : 'Official Hours: Sun – Thu (9:00 AM – 5:00 PM)'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400">
              <span>{isAr ? 'انعقاد اللجان: 02:00 PM' : 'Committees Kickoff: 02:00 PM'}</span>
            </span>
          </div>
        </div>

        {/* 3 Executive Committee Cards in a High-End Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {sessions.map((session) => {
            const isSunday = session.id === 'sunday-rice';
            const isTuesday = session.id === 'tuesday-cattle';
            const isMonday = session.id === 'monday-shrimp';

            // Distinct theme styling per card
            let ribbonColor = 'from-amber-500 via-yellow-400 to-amber-600';
            let calendarHeaderBg = 'bg-amber-500';
            let numberTextColor = 'text-amber-500 dark:text-amber-400';
            let borderColor = 'border-amber-300 dark:border-amber-500/40 hover:border-amber-500';
            let pillBg = 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30';

            if (isTuesday) {
              ribbonColor = 'from-rose-500 via-orange-400 to-amber-500';
              calendarHeaderBg = 'bg-rose-500';
              numberTextColor = 'text-rose-600 dark:text-rose-400';
              borderColor = 'border-rose-300 dark:border-rose-500/40 hover:border-rose-500';
              pillBg = 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30';
            } else if (isMonday) {
              ribbonColor = 'from-emerald-500 via-teal-400 to-sky-500';
              calendarHeaderBg = 'bg-emerald-500';
              numberTextColor = 'text-emerald-600 dark:text-emerald-400';
              borderColor = 'border-emerald-300 dark:border-emerald-500/40 hover:border-emerald-500';
              pillBg = 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30';
            }

            return (
              <div
                key={session.id}
                className={`rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-xl ${borderColor} ${
                  theme === 'dark'
                    ? 'bg-slate-900/95 shadow-black/60'
                    : 'bg-white shadow-slate-200'
                }`}
              >
                {/* Top metallic ribbon strip */}
                <div className={`h-2 bg-gradient-to-r ${ribbonColor}`}></div>

                <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                  
                  {/* Top Bar: Badge & Cycle */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${pillBg}`}>
                      {session.badge[lang] || session.badge.ar}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                      {session.dayCode}
                    </span>
                  </div>

                  {/* Calendar Ticket Block + Title Header */}
                  <div className="flex items-start gap-4">
                    
                    {/* EXECUTIVE CALENDAR BLOCK WITH DATE NUMBER */}
                    <div className={`w-20 rounded-2xl border flex-shrink-0 overflow-hidden text-center shadow-md ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      {/* Month Ribbon */}
                      <div className={`py-1 text-[11px] font-black uppercase tracking-wider text-slate-950 ${calendarHeaderBg}`}>
                        {session.monthName[lang] || session.monthName.ar}
                      </div>
                      {/* Big Day Number */}
                      <div className="py-2">
                        <span className={`font-mono text-3xl font-black leading-none ${numberTextColor}`}>
                          {session.dayNumber}
                        </span>
                      </div>
                      {/* Day Name */}
                      <div className="pb-1 pt-0.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
                        {session.dayName[lang] || session.dayName.ar}
                      </div>
                    </div>

                    {/* Commodity Title & Time */}
                    <div className="flex-1 space-y-1.5">
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {session.category[lang] || session.category.ar}
                      </div>

                      <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug">
                        {session.commodity[lang] || session.commodity.ar}
                      </h3>

                      <div className="inline-flex items-center gap-1.5 font-bold text-xs px-2.5 py-0.5 rounded-lg border bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span className="font-mono">{session.time[lang] || session.time.ar}</span>
                      </div>
                    </div>

                  </div>

                  {/* Priority / Schedule Details Box */}
                  <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
                    isSunday
                      ? (theme === 'dark' ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-950')
                      : isTuesday
                      ? (theme === 'dark' ? 'bg-rose-500/10 border-rose-500/30 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-950')
                      : (theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-950')
                  }`}>
                    <div className="font-black mb-1 flex items-center gap-1.5 text-[12px]">
                      {isSunday && <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />}
                      {isTuesday && <span className="text-sm">🐂</span>}
                      {isMonday && <span className="text-sm">🦐</span>}
                      <span>{session.priorityRule[lang] || session.priorityRule.ar}</span>
                    </div>
                    <p className="opacity-90">
                      {session.priorityDetails[lang] || session.priorityDetails.ar}
                    </p>
                  </div>

                  {/* Required Documents Rule (Only corporate docs & past supply record - NO samples) */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-start gap-1.5 font-bold text-slate-900 dark:text-white">
                      <FileCheck className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{isAr ? 'المستندات المطلوبة:' : 'Required Documentation:'}</span>
                    </div>
                    <div className="text-[11px] opacity-90 pl-5 pr-5">
                      {session.docsRule[lang] || session.docsRule.ar}
                    </div>
                  </div>

                </div>

                {/* Bottom Date & Timing Footer */}
                <div className="px-6 py-3.5 bg-slate-100/90 dark:bg-slate-950/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{isAr ? 'التاريخ المحدد:' : 'Target Date:'}</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{session.exactDate}</strong>
                  </div>

                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    02:00 PM
                  </span>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {attendanceRequirements.map((req, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
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
