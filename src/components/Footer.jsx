import React from 'react';
import { 
  ExternalLink, 
  ArrowUp,
  PhoneCall,
  ShieldCheck,
  Clock,
  Share2,
  MapPin
} from 'lucide-react';
import { PORTAL_INFO, NAV_LINKS } from '../data/portalData';

export default function Footer({ lang, theme, onScrollTo }) {
  const isAr = lang === 'ar';
  const info = PORTAL_INFO[lang] || PORTAL_INFO.ar;
  const navItems = NAV_LINKS[lang] || NAV_LINKS.ar;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t text-xs transition-colors duration-300 relative ${
      theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
    }`}>
      {/* Top Gold Strip */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500"></div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Official Logo & Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg border border-amber-400/80 bg-slate-950 p-1 flex-shrink-0">
                <img 
                  src="/assets/foe-badge-circle.png" 
                  alt="شعار جهاز مستقبل مصر للتنمية المستدامة FOE" 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <div>
                <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {info.deptName}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-bold mt-0.5">
                  <span>{info.orgName}</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-black font-mono bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    FOE
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs leading-relaxed max-w-md text-slate-600 dark:text-slate-400">
              {isAr ? (
                'إدارة الشراء الموحد بجهاز مستقبل مصر للتنمية المستدامة (FOE)، المعنية بتأمين احتياجات السلع والمحاصيل الأساسية وبناء احتياطي استراتيجي آمن بالربط مع مشروعات الدلتا الجديدة ومجمعات الصوامع الذكية.'
              ) : (
                'Unified Procurement Directorate of Future of Egypt Agency (FOE), securing essential commodities and strategic reserves in synergy with the New Delta agricultural infrastructure.'
              )}
            </p>

            <div className="pt-1 space-y-3">
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
                theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>FOE • {info.entity} • {info.motto}</span>
              </span>

            </div>
          </div>

          {/* Col 2: Official Social Media Channels */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Share2 className="w-3.5 h-3.5 text-amber-500" />
              <span>{isAr ? 'منصات التواصل الاجتماعي الرسمية' : 'Official Social Media Channels'}</span>
            </h4>
            
            <div className="space-y-2.5">
              {/* Facebook */}
              <a 
                href={info.facebookUrl} 
                target="_blank" 
                rel="noreferrer"
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 group ${
                  theme === 'dark' 
                    ? 'bg-slate-900/50 border-slate-800 hover:border-blue-500/60 hover:bg-blue-600/10' 
                    : 'bg-slate-50 border-slate-200 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-sm flex-shrink-0">
                    f
                  </div>
                  <div className={isAr ? 'text-right' : 'text-left'}>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                      {isAr ? 'الصفحة الرسمية على فيسبوك' : 'Official Facebook Page'}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      @foe.eg
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
              </a>

              {/* LinkedIn */}
              <a 
                href={info.linkedinUrl} 
                target="_blank" 
                rel="noreferrer"
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 group ${
                  theme === 'dark' 
                    ? 'bg-slate-900/50 border-slate-800 hover:border-sky-500/60 hover:bg-sky-600/10' 
                    : 'bg-slate-50 border-slate-200 hover:border-sky-500 hover:bg-sky-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center font-black text-xs shadow-sm flex-shrink-0">
                    in
                  </div>
                  <div className={isAr ? 'text-right' : 'text-left'}>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                      {isAr ? 'المنصة الرسمية على لينكد إن' : 'Official LinkedIn Profile'}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      Future of Egypt Agency
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors flex-shrink-0" />
              </a>

              {/* Twitter / X */}
              <a 
                href={info.twitterUrl} 
                target="_blank" 
                rel="noreferrer"
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 group ${
                  theme === 'dark' 
                    ? 'bg-slate-900/50 border-slate-800 hover:border-slate-600 hover:bg-slate-800/40' 
                    : 'bg-slate-50 border-slate-200 hover:border-slate-400 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-black text-xs shadow-sm flex-shrink-0">
                    𝕏
                  </div>
                  <div className={isAr ? 'text-right' : 'text-left'}>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                      {isAr ? 'الحساب الرسمي على منصة X' : 'Official X (Twitter) Account'}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      @futureofegypt_
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors flex-shrink-0" />
              </a>
            </div>
          </div>

          {/* Col 3: Support & Back to Top (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {isAr ? 'الخط الساخن والبريد' : 'Hotline & Contact'}
            </h4>
            <div className="space-y-1">
              <div className="text-amber-600 dark:text-amber-400 font-mono font-bold text-sm">{info.hotline}</div>
              <div className="font-mono text-xs text-slate-500">{info.email}</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 pt-1.5 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>{info.workingHours}</span>
              </div>
              <a 
                href={info.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-amber-600 dark:text-amber-400 pt-1 flex items-center gap-1.5 font-bold hover:underline"
              >
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{isAr ? 'توكانو مول - الدور الثالث (خرائط Google) ↗' : 'Tucano Mall - Floor 3 (Google Maps) ↗'}</span>
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className={`w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                theme === 'dark' 
                  ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-950'
              }`}
            >
              <ArrowUp className="w-3.5 h-3.5 text-amber-500" />
              <span>{isAr ? 'العودة للأعلى' : 'Back to Top'}</span>
            </button>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] text-slate-500 text-center sm:text-start">
          <div>
            © {new Date().getFullYear()} {info.orgName} — {info.entity}
          </div>
          <div className="text-amber-600 dark:text-amber-400/90 font-medium">
            {isAr ? 'إدارة الشراء الموحد — جهاز مستقبل مصر للتنمية المستدامة (FOE) • بوابة للاطلاع العام' : 'Unified Procurement Directorate — Future of Egypt Agency for Sustainable Development (FOE) • Official Public Portal'}
          </div>
        </div>
      </div>
    </footer>
  );
}
