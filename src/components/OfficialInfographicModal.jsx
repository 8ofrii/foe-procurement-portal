import React, { useState } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { PILLARS } from '../data/portalData';

export default function OfficialInfographicModal({ isOpen, onClose, lang, theme }) {
  if (!isOpen) return null;
  const isAr = lang === 'ar';
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className={`border rounded-3xl max-w-5xl w-full p-4 sm:p-6 shadow-2xl relative max-h-[95vh] flex flex-col ${
        theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${
              theme === 'dark' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-700'
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black">
                {isAr ? 'الإعلان الرسمي المعتمد: إدارة الشراء الموحد' : 'Official Approved Procurement Notice'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'جهاز مستقبل مصر للتنمية المستدامة - رئاسة الجمهورية' : 'Future of Egypt Agency for Sustainable Development'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`hidden sm:flex items-center gap-1 p-1 rounded-xl border ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button onClick={handleZoomOut} className="p-1.5 rounded-lg opacity-70 hover:opacity-100">
                <ZoomOut className="w-4 h-4" />
              </button>
              <button onClick={handleResetZoom} className="px-2 text-xs font-mono">
                {Math.round(zoomLevel * 100)}%
              </button>
              <button onClick={handleZoomIn} className="p-1.5 rounded-lg opacity-70 hover:opacity-100">
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <a
              href="/assets/official-infographic.png"
              download="Mostaqbal-Misr-Notice.png"
              className="p-2 rounded-xl border hover:text-amber-500 transition-colors"
              title="تحميل الصورة"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl border hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto flex-1 p-2">
          {/* Image */}
          <div className={`lg:col-span-7 rounded-2xl border overflow-hidden flex items-center justify-center p-3 ${
            theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <div 
              className="transition-transform duration-200 origin-center max-h-[70vh] flex items-center justify-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img 
                src="/assets/official-infographic.png" 
                alt="إدارة الشراء الموحد بجهاز مستقبل مصر" 
                className="max-h-[68vh] object-contain rounded-xl shadow-2xl"
              />
            </div>
          </div>

          {/* Pillars List */}
          <div className="lg:col-span-5 space-y-3">
            <div className={`p-4 rounded-xl border ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500" />
                <span>{isAr ? 'المرتكزات الست المستخرجة من الإعلان:' : 'Six Core Mandates from Notice:'}</span>
              </h4>

              <div className="space-y-2">
                {PILLARS.map((p) => (
                  <div 
                    key={p.id} 
                    className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                      {p.id}
                    </span>
                    <div>
                      <div className="font-bold">{p.title[lang] || p.title.ar}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{p.desc[lang] || p.desc.ar}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <span>{isAr ? 'المصدر: الصفحة الرسمية foe.eg' : 'Official Source: foe.eg'}</span>
              <a
                href="https://www.facebook.com/foe.eg"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sky-500 hover:underline"
              >
                <span>{isAr ? 'زيارة صفحة فيسبوك' : 'Visit Facebook'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
