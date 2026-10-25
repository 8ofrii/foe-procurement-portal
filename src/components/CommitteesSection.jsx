import React, { useState } from 'react';
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
  Check,
  ChevronDown,
  CalendarDays,
  ListFilter,
  ExternalLink
} from 'lucide-react';
import { COMMITTEES_DATA } from '../data/portalData';

export default function CommitteesSection({ lang, theme }) {
  const isAr = lang === 'ar';
  const { header, generalNotice, sessions, calendarDates = [], attendanceRequirements } = COMMITTEES_DATA;

  // View mode: 'cards' or 'calendar'
  const [activeTab, setActiveTab] = useState('cards');
  // Committee filter for calendar view: 'all' | 'sunday-rice' | 'tuesday-cattle' | 'monday-shrimp'
  const [selectedFilter, setSelectedFilter] = useState('all');
  // Open dates accordion per card
  const [expandedDates, setExpandedDates] = useState({
    'sunday-rice': true,
    'tuesday-cattle': true,
    'monday-shrimp': true
  });

  const toggleDates = (id) => {
    setExpandedDates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filtered calendar dates
  const filteredDates = calendarDates.filter(item => {
    if (selectedFilter === 'all') return true;
    return item.committeeId === selectedFilter;
  });

  return (
    <section id="committees" className={`py-20 relative border-t transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100/80 border-slate-200'
    }`}>
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
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
        <div className={`mb-8 p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-sm ${
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
              href="https://www.google.com/maps/place/Tucano+Commercial+Complex/@30.0608796,31.3200135,17z/data=!3m1!4b1!4m6!3m5!1s0x14583f5f7da2e537:0x71310f58dac3832f!8m2!3d30.060875!4d31.3225884!16s%2Fg%2F11ry5fvchh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm flex-shrink-0 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{isAr ? 'خرائط Google ↗' : 'Google Maps ↗'}</span>
            </a>
          </div>
        </div>

        {/* View Mode Switcher: Cards View vs Dates Calendar View */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8 bg-slate-200/60 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('cards')}
              type="button"
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'cards'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{isAr ? 'بطاقات اللجان والضوابط' : 'Committees Overview Cards'}</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              type="button"
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/60'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>{isAr ? 'خيار جدول التواريخ المعتمدة (نوفمبر - ديسمبر)' : 'Upcoming Dates Schedule (Nov – Dec)'}</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold px-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{isAr ? 'مواعيد وتواريخ الجلسات معتمدة ومحدثة' : 'Verified Official Sessions Schedule'}</span>
          </div>
        </div>

        {/* TAB 1: 3 Executive Committee Cards with Specific Next Date & Dates Options */}
        {activeTab === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {sessions.map((session) => {
              const isSunday = session.id === 'sunday-rice';
              const isTuesday = session.id === 'tuesday-cattle';
              const isMonday = session.id === 'monday-shrimp';

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

              const isDatesOpen = expandedDates[session.id];

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

                  <div className="p-4 sm:p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                    
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

                    {/* Day & Kickoff Time Bar */}
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

                    {/* NEW: Explicit Next Session Date Highlight Box */}
                    {session.nextDate && (
                      <div className={`p-3 rounded-xl border flex items-center justify-between gap-2.5 ${
                        isSunday
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                          : isTuesday
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                      }`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-current animate-pulse flex-shrink-0"></span>
                          <span className="text-[11px] font-bold opacity-80 uppercase tracking-wider whitespace-nowrap">
                            {isAr ? 'تاريخ الجلسة القادمة:' : 'Next Session Date:'}
                          </span>
                        </div>
                        <span className="text-xs font-black font-mono px-2 py-0.5 rounded-md bg-white/70 dark:bg-slate-950/70 border border-current/25 whitespace-nowrap">
                          {session.nextDate[lang] || session.nextDate.ar}
                        </span>
                      </div>
                    )}

                    {/* Commodity Title & Specification Scope */}
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-normal">
                        {session.commodity[lang] || session.commodity.ar}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                        {session.commoditySpecs?.[lang] || session.commoditySpecs?.ar || session.category[lang]}
                      </p>
                    </div>

                    {/* NEW: Option of Dates Drawer (Upcoming Confirmed Dates List) */}
                    {session.upcomingDates && session.upcomingDates.length > 0 && (
                      <div className="pt-1">
                        <button
                          onClick={() => toggleDates(session.id)}
                          type="button"
                          className="w-full py-1.5 px-2.5 rounded-xl text-[11px] font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 hover:border-amber-500/40 text-slate-700 dark:text-slate-300 flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-1.5">
                            <CalendarDays className="w-3.5 h-3.5 text-amber-500" />
                            <span>{isAr ? 'خيار تواريخ الجلسات القادمة (محدث)' : 'Upcoming Scheduled Dates'}</span>
                          </div>
                          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isDatesOpen ? 'rotate-180 text-amber-500' : ''}`} />
                        </button>

                        {isDatesOpen && (
                          <div className="mt-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/40 space-y-1.5 animate-fadeIn">
                            {session.upcomingDates.map((d, dIdx) => (
                              <div
                                key={dIdx}
                                className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs flex items-center justify-between gap-2"
                              >
                                <div className="flex items-center gap-2">
                                  <span className={`w-1.5 h-1.5 rounded-full ${dIdx === 0 ? 'bg-amber-500' : 'bg-slate-400'}`}></span>
                                  <span className="font-bold text-slate-900 dark:text-white text-[11px]">
                                    {d[lang] || d.ar}
                                  </span>
                                </div>
                                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                  dIdx === 0 
                                    ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold' 
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                }`}>
                                  {dIdx === 0 ? (isAr ? 'الجلسة الأقرب' : 'Immediate') : (d.status || (isAr ? 'مؤكدة' : 'Confirmed'))}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Priority / Session Specific Rule Box */}
                    <div className={`p-3 rounded-xl border text-xs leading-relaxed ${themeBg}`}>
                      <div className="font-bold mb-1 flex items-center gap-1.5 text-xs">
                        {isSunday && <Wheat className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />}
                        {isTuesday && <Award className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />}
                        {isMonday && <Fish className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}
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
        )}

        {/* TAB 2: Comprehensive Calendar Dates Schedule View (Option of Dates) */}
        {activeTab === 'calendar' && (
          <div className={`mb-12 rounded-3xl border p-4 sm:p-6 shadow-xl ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {/* Calendar Controls & Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-amber-500" />
                  <span>{isAr ? 'جدول المواعيد والتواريخ المعتمدة لانعقاد اللجان' : 'Official Committee Sessions Dates Schedule'}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isAr ? 'استعراض التواريخ المجدولة لشهر نوفمبر وديسمبر 2026 بقاعة اللجان المركزية بتوكانو مول' : 'Upcoming confirmed dates for November & December 2026'}
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-400 font-medium px-1 flex items-center gap-1">
                  <ListFilter className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تصفية:' : 'Filter:'}</span>
                </span>
                {[
                  { id: 'all', label: { ar: 'كافة اللجان', en: 'All Committees' } },
                  { id: 'sunday-rice', label: { ar: 'الأرز', en: 'Rice' } },
                  { id: 'tuesday-cattle', label: { ar: 'الرؤوس الحية', en: 'Live Cattle' } },
                  { id: 'monday-shrimp', label: { ar: 'الجمبري', en: 'Shrimp' } }
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setSelectedFilter(btn.id)}
                    type="button"
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      selectedFilter === btn.id
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                    }`}
                  >
                    {btn.label[lang] || btn.label.ar}
                  </button>
                ))}
              </div>
            </div>

            {/* Chronological Dates Table / List */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-right">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px] uppercase">
                    <th className="pb-3 px-3 font-bold">{isAr ? 'التاريخ المحدد' : 'Date'}</th>
                    <th className="pb-3 px-3 font-bold">{isAr ? 'اليوم والتوقيت' : 'Day & Time'}</th>
                    <th className="pb-3 px-3 font-bold">{isAr ? 'اللجنة المعنية' : 'Committee'}</th>
                    <th className="pb-3 px-3 font-bold">{isAr ? 'الدورية' : 'Cadence'}</th>
                    <th className="pb-3 px-3 font-bold">{isAr ? 'المقر والقاعة' : 'Venue'}</th>
                    <th className="pb-3 px-3 font-bold text-center">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredDates.map((item, idx) => {
                    const isRice = item.committeeId === 'sunday-rice';
                    const isCattle = item.committeeId === 'tuesday-cattle';
                    const isShrimp = item.committeeId === 'monday-shrimp';

                    return (
                      <tr key={idx} className="hover:bg-amber-500/5 transition-colors">
                        {/* Specific Date */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${
                              isRice ? 'bg-amber-500' : isCattle ? 'bg-rose-500' : 'bg-emerald-500'
                            }`}></span>
                            <span className="font-bold font-mono text-slate-900 dark:text-white">
                              {item.dateStr[lang] || item.dateStr.ar}
                            </span>
                          </div>
                        </td>

                        {/* Day & Time */}
                        <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold">{item.dayName[lang] || item.dayName.ar}</span>
                            <span className="text-slate-400">—</span>
                            <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{item.time[lang] || item.time.ar}</span>
                          </div>
                        </td>

                        {/* Committee & Commodity */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            {isRice && <Wheat className="w-4 h-4 text-amber-500 flex-shrink-0" />}
                            {isCattle && <Award className="w-4 h-4 text-rose-500 flex-shrink-0" />}
                            {isShrimp && <Fish className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                            <span className="font-bold text-slate-900 dark:text-white">
                              {item.commodity[lang] || item.commodity.ar}
                            </span>
                          </div>
                        </td>

                        {/* Cadence */}
                        <td className="py-3 px-3 text-slate-600 dark:text-slate-400 text-xs">
                          {item.cadence[lang] || item.cadence.ar}
                        </td>

                        {/* Venue */}
                        <td className="py-3 px-3 text-slate-600 dark:text-slate-400 text-xs">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-500 flex-shrink-0" />
                            <span>{isAr ? 'توكانو مول — الدور 3' : 'Tucano Mall — Floor 3'}</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-3 text-center">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                            <Check className="w-2.5 h-2.5" />
                            <span>{item.status[lang] || item.status.ar}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Quick Actions Bar below calendar table */}
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 dark:text-slate-400">
                {isAr ? 'ملاحظة: تبدأ جميع الجلسات في تمام الساعة 02:00 ظهراً، ويُرجى الحضور قبل الموعد لإتمام إجراءات القيد.' : 'Note: All sessions start at 02:00 PM in the Central Hall.'}
              </span>

              <a
                href="https://www.google.com/maps/place/Tucano+Commercial+Complex/@30.0608796,31.3200135,17z/data=!3m1!4b1!4m6!3m5!1s0x14583f5f7da2e537:0x71310f58dac3832f!8m2!3d30.060875!4d31.3225884!16s%2Fg%2F11ry5fvchh"
                target="_blank"
                rel="noreferrer"
                className="py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{isAr ? 'موقع قاعة اللجان على الخريطة ↗' : 'Session Hall Map ↗'}</span>
              </a>
            </div>
          </div>
        )}

        {/* Attendance & Official Document Verification Standards */}
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
