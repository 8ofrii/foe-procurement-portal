import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Scale, 
  Globe2, 
  Coins, 
  Workflow, 
  Truck, 
  Target, 
  Store, 
  Building, 
  Layers, 
  BarChart3, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import { DEPARTMENTS } from '../data/portalData';

// Specialized Extra Metadata: Taglines & Core Responsibilities per Department
const DEPT_EXTRAS = {
  gov_contracting: {
    tagline: {
      ar: 'المناقصات والممارسات السيادية',
      en: 'Sovereign Tenders & Framework Contracts',
      pl: 'Przetargi rządowe i umowy ramowe',
      uk: 'Урядові тендери та рамкові угоди'
    },
    responsibilities: [
      {
        ar: 'طرح وإدارة كراسات الشروط والمناقصات والممارسات السيادية لتأمين السلع الأساسية للدولة.',
        en: 'Drafting terms of reference and managing sovereign public bidding for essential commodities.',
        pl: 'Opracowywanie specyfikacji i zarządzanie przetargami na dostawy kluczowych surowców.',
        uk: 'Розробка тендерної документації та проведення відкритих торгів на стратегічні товари.'
      },
      {
        ar: 'حوكمة لجان فتح المظاريف الفنية والمالية وترسيخ مبادئ تكافؤ الفرص والشفافية التامة.',
        en: 'Supervising technical & financial bid-opening sessions ensuring competitive neutrality.',
        pl: 'Nadzór nad sesjami otwarcia ofert technicznych i finansowych z zachowaniem pełnej przejrzystości.',
        uk: 'Контроль засідань розкриття пропозицій з дотриманням рівних умов та прозорості.'
      },
      {
        ar: 'إبرام عقود التوريد الاستراتيجي واعتماد جداول الشحن والتسليم الدورية لضمان استدامة الإمدادات.',
        en: 'Awarding framework procurement agreements and approving delivery schedules.',
        pl: 'Zawieranie długoterminowych kontraktów na dostawy i harmonogramowanie wysyłek.',
        uk: 'Укладання довгострокових контрактів на постачання та затвердження графіків відвантаження.'
      }
    ]
  },
  legal_affairs: {
    tagline: {
      ar: 'الصياغات التعاقدية وحماية حقوق الدولة',
      en: 'Legal Soundness & State Rights Protection',
      pl: 'Zabezpieczenie prawne umów i arbitraż',
      uk: 'Правовий захист та експертиза угод'
    },
    responsibilities: [
      {
        ar: 'الصياغة والتدقيق القانوني لجميع عقود التوريد والمناقصات الدولية والمحلية وفق أعلى المعايير.',
        en: 'Legal vetting of all domestic and international commodity supply contracts.',
        pl: 'Weryfikacja prawna międzynarodowych i krajowych umów handlowych.',
        uk: 'Юридична перевірка всіх внутрішніх та міжнародних контрактів на постачання.'
      },
      {
        ar: 'التحقق من كفاءة الشروط الجزائية، خطابات الضمان، وحماية حقوق الدولة في التحكيم الدولي.',
        en: 'Enforcing penalty clauses, performance bonds, and international arbitration safeguards.',
        pl: 'Weryfikacja gwarancji bankowych, klauzul odszkodowawczych i procedur arbitrażowych.',
        uk: 'Перевірка банківських гарантій, штрафних санкцій та міжнародного арбітражу.'
      },
      {
        ar: 'المطابقة الدقيقة لقواعد المنظمات العالمية لتجارة الحبوب والزيوت (GAFTA / FOSFA).',
        en: 'Ensuring alignment with global grain & oilseeds standard contract forms (GAFTA/FOSFA).',
        pl: 'Zapewnienie zgodności ze standardami międzynarodowych federacji handlowych (GAFTA/FOSFA).',
        uk: 'Забезпечення відповідності правилам міжнародних торгових асоціацій (GAFTA/FOSFA).'
      }
    ]
  },
  foreign_commercial: {
    tagline: {
      ar: 'التفاوض الدولي ورصد البورصات السلعية',
      en: 'Global Trading & Exchange Forecasting',
      pl: 'Handel zagraniczny i monitoring giełd',
      uk: 'Зовнішня торгівля та моніторинг бірж'
    },
    responsibilities: [
      {
        ar: 'الرصد اللحظي لمؤشرات البورصات السلعية العالمية (CBOT / Euronext) واقتناص نوافذ الأسعار المثلى.',
        en: 'Real-time monitoring of global commodity exchanges to execute trades at optimal market dips.',
        pl: 'Bieżący monitoring giełd towarowych w celu zawierania transakcji w najkorzystniejszych momentach.',
        uk: 'Моніторинг світових товарних бірж у реальному часі для укладання угод за мінімальними цінами.'
      },
      {
        ar: 'التفاوض المباشر رفيع المستوى مع كبرى بيوت التجارة العالمية للحبوب والزيوت لتحقيق وفورات دولارية.',
        en: 'Direct high-level negotiations with international agribusiness giants generating FX savings.',
        pl: 'Bezpośrednie negocjacje z międzynarodowymi domami handlowymi generujące oszczędności walutowe.',
        uk: 'Прямі переговори з міжнародними агрохолдингами для досягнення валютної економії.'
      },
      {
        ar: 'توسيع وتنويع شبكة المناشئ المعتمدة (أكثر من 18 دولة ومورداً) لتحييد المخاطر الجيوسياسية.',
        en: 'Expanding approved origin networks (>18 countries) to eliminate single-source vulnerabilities.',
        pl: 'Dywersyfikacja źródeł dostaw (ponad 18 krajów) w celu eliminacji ryzyk geopolitycznych.',
        uk: 'Розширення географії імпорту (понад 18 країн) для нейтралізації геополітичних ризиків.'
      }
    ]
  },
  finance: {
    tagline: {
      ar: 'الاعتمادات المستندية وكفاءة التدفق النقدي',
      en: 'L/Cs, Sovereign Credit & Cash Flow',
      pl: 'Akredytywy i płynność finansowa',
      uk: 'Акредитиви та фінансова ліквідність'
    },
    responsibilities: [
      {
        ar: 'فتح وإدارة الاعتمادات المستندية البنكية (L/Cs) مع البنوك المركزية والدولية بكفاءة وسرعة فائقة.',
        en: 'Structuring and issuing letters of credit (L/Cs) with tier-1 international banks.',
        pl: 'Otwieranie i obsługa akredytyw bankowych (L/C) z wiodącymi instytucjami finansowymi.',
        uk: 'Відкриття та обслуговування банківських акредитивів (L/C) з міжнародними банками.'
      },
      {
        ar: 'تأمين خطوط الائتمان بالعملات الأجنبية وتنسيق التدفقات النقدية مع البنك المركزي المصري.',
        en: 'Securing foreign currency credit lines in seamless coordination with the Central Bank.',
        pl: 'Zabezpieczanie linii kredytowych w walutach obcych we współpracy z Bankiem Centralnym.',
        uk: 'Забезпечення валютних кредитних ліній у взаємодії з Центральним банком.'
      },
      {
        ar: 'التدقيق المالي والتحليلي للصفقات السلعية الضخمة لتعظيم وفورات الشراء المجمع للدولة.',
        en: 'Financial auditing and sovereign bulk procurement cost-optimization modeling.',
        pl: 'Audyt finansowy i optymalizacja kosztów skonsolidowanych zakupów państwowych.',
        uk: 'Фінансовий аудит та оптимізація витрат у рамках консолідованих закупівель держави.'
      }
    ]
  },
  supply_chain: {
    tagline: {
      ar: 'التدفقات القومية وتأمين رصيد 6-9 أشهر',
      en: 'National Flows & 6-9 Month Reserves',
      pl: 'Przepływy towarowe i 6-9 mies. rezerwy',
      uk: 'Товарні потоки та запаси на 6-9 місяців'
    },
    responsibilities: [
      {
        ar: 'الربط اللحظي بين حصاد المشروعات الزراعية العملاقة بالدلتا الجديدة وشبكة الصوامع القومية.',
        en: 'Direct link between New Delta mega-harvests and the national smart silos network.',
        pl: 'Bezpośrednia integracja zbiorów z Nowej Delty z państwową siecią nowoczesnych silosów.',
        uk: 'Інтеграція врожаїв Нової Дельти з державною мережею сучасних елеваторів.'
      },
      {
        ar: 'إدارة وتأمين الرصيد الاستراتيجي الآمن للدولة من الحبوب والزيوت والسكر ليتجاوز 7.8 أشهر.',
        en: 'Maintaining sovereign strategic reserve buffers (>7.8 months) across grains and oils.',
        pl: 'Utrzymywanie bezpiecznych rezerw strategicznych zbóż i olejów powyżej 7.8 miesięcy.',
        uk: 'Підтримка безпечного стратегічного резерву зерна та олій на рівні понад 7.8 місяців.'
      },
      {
        ar: 'تتبع مسار الشحنات الاستراتيجية إلكترونياً لتقليص زمن دورة الإمداد بنسبة 35%.',
        en: 'Digital cargo tracking across corridors cutting supply cycle duration by 35%.',
        pl: 'Cyfrowe śledzenie ładunków strategicznych skracające cykl dostaw o 35%.',
        uk: 'Цифровий трекінг стратегічних вантажів, що скорочує логістичний цикл на 35%.'
      }
    ]
  },
  logistics: {
    tagline: {
      ar: 'عمليات الموانئ والتفريغ الفوري والصوامع',
      en: 'Port Stevedoring, Zero Demurrage & Silos',
      pl: 'Operacje portowe i silosy zbożowe',
      uk: 'Портові операції та зернові елеватори'
    },
    responsibilities: [
      {
        ar: 'التفريغ الفوري للسفن في موانئ دمياط والإسكندرية بمعدل 45 ألف طن/يوم وتحقيق Zero Demurrage.',
        en: 'Rapid port vessel discharge (45K MT/day) at Damietta and Alexandria achieving Zero Demurrage.',
        pl: 'Błyskawiczny rozładunek statków w portach (45 tys. ton/dzień) eliminujący kary postojowe.',
        uk: 'Швидке розвантаження суден у портах (45 тис. тонн/день) із нульовим демереджем.'
      },
      {
        ar: 'تشغيل منظومة الصوامع الذكية والمستودعات الرقمية بسعة تخزين استراتيجية 5.5 مليون طن.',
        en: 'Operating digital smart silo complexes with 5.5 million MT automated storage capacity.',
        pl: 'Zarządzanie inteligentnymi silosami cyfrowymi o pojemności magazynowej 5.5 mln ton.',
        uk: 'Управління цифровими елеваторами зі стратегічною місткістю 5.5 млн тонн.'
      },
      {
        ar: 'إدارة أسطول النقل اللوجستي البري والمبرد وشبكة السكك الحديدية لضمان سرعة نقل الحصاد.',
        en: 'Mobilizing heavy trucking, refrigerated fleets, and rail networks for grain evacuation.',
        pl: 'Mobilizacja floty transportu ciężkiego, chłodniczego i kolejowego do ewakuacji ładunków.',
        uk: 'Координація автопарку великої вантажності, рефрижераторів та залізниці для вивезення зерна.'
      }
    ]
  },
  planning: {
    tagline: {
      ar: 'التنبؤ بالفجوة السلعية والخطط السنوية',
      en: 'Demand Forecasting & Annual Planning',
      pl: 'Prognozowanie popytu i plany roczne',
      uk: 'Прогнозування потреб та річні плани'
    },
    responsibilities: [
      {
        ar: 'إعداد الدراسات الاستشرافية والتنبؤ الاستباقي بحجم الفجوة السلعية واحتياجات الاستهلاك القومي.',
        en: 'Advanced econometric forecasting models for national commodity consumption and supply gaps.',
        pl: 'Modelowanie ekonometryczne krajowego zapotrzebowania i przewidywanie deficytów towarowych.',
        uk: 'Економетричне моделювання споживання та завчасне виявлення товарного дефіциту.'
      },
      {
        ar: 'وضع الخطط الزمنية والكمية المسبقة لجدولة التوريدات السلعية وتفادي أي اختناقات في المعروض.',
        en: 'Formulating quarterly and annual procurement schedules to preempt supply pinches.',
        pl: 'Tworzenie kwartalnych i rocznych harmonogramów zakupów zapobiegających zatorom podażowym.',
        uk: 'Складання графіків закупівель для запобігання перебоям у постачанні продукції.'
      },
      {
        ar: 'التنسيق التكاملي المستمر مع مزارع الدلتا الجديدة ومجمعات التصنيع الزراعي القومية.',
        en: 'Synchronizing procurement volumes with domestic New Delta harvest projections.',
        pl: 'Synchronizacja wielkości zakupów z prognozami zbiorów z Nowej Delty i przetwórstwa.',
        uk: 'Синхронізація імпортних закупівель із внутрішніми врожаями Нової Дельти.'
      }
    ]
  },
  domestic_trade: {
    tagline: {
      ar: 'ضبط الأسواق وتغطية الـ 27 محافظة',
      en: 'Market Equilibrium & 27 Governorates',
      pl: 'Stabilizacja rynku i 27 prowincji',
      uk: 'Стабілізація ринку та 27 регіонів'
    },
    responsibilities: [
      {
        ar: 'إدارة ضخ التدفقات السلعية في شبكات التوزيع والمجمعات الاستهلاكية على مستوى الـ 27 محافظة.',
        en: 'Orchestrating commodity allocation into state wholesale depots across all 27 governorates.',
        pl: 'Dystrybucja strategicznych produktów spożywczych do sieci państwowych w 27 prowincjach.',
        uk: 'Розподіл стратегічних продовольчих товарів через державні мережі у 27 регіонах.'
      },
      {
        ar: 'الرصد الميداني اليومي لحركة الأسواق ومنع الممارسات الاحتكارية لحماية المستهلكين.',
        en: 'Daily ground monitoring of commodity price movements to curb speculative hoarding.',
        pl: 'Codzienny monitoring cen rynkowych i zapobieganie praktykom monopolistycznym.',
        uk: 'Щоденний моніторинг ринкових цін та протидія монопольним і спекулятивним діям.'
      },
      {
        ar: 'التنسيق مع المبادرات السلعية القومية لطرح السلع الاستراتيجية بأسعار مخفضة ومستقرة.',
        en: 'Harmonizing distribution with national food security initiatives at controlled fair prices.',
        pl: 'Koordynacja z państwowymi inicjatywami stabilizacji cen żywności dla obywateli.',
        uk: 'Взаємодія з державними програмами продовольчої безпеки для збереження доступних цін.'
      }
    ]
  }
};

export default function DepartmentsSection({ lang, theme }) {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ChevronLeft : ChevronRight;
  const [selectedDeptId, setSelectedDeptId] = useState(DEPARTMENTS[0].id);
  const detailRef = useRef(null);

  const iconMap = {
    FileText: FileText,
    Scale: Scale,
    Globe2: Globe2,
    Coins: Coins,
    Workflow: Workflow,
    Truck: Truck,
    Target: Target,
    Store: Store
  };

  const activeDept = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];
  const ActiveIcon = iconMap[activeDept.icon] || Building;
  const activeExtras = DEPT_EXTRAS[activeDept.id] || DEPT_EXTRAS.gov_contracting;

  // Localized KPI values to prevent flipped numbers/text in RTL
  const formatKpiValue = (val) => {
    if (!val) return '';
    if (typeof val === 'object') return val[lang] || val.ar || '';
    if (isAr) {
      if (val === '72 Hours') return '72 ساعة';
      if (val === '24 Hours') return '24 ساعة';
      if (val === '0 (Zero)') return '0 (صفر نزاعات)';
      if (val === '380M+ USD') return '+380 مليون $';
      if (val === '18 Countries') return '18 دولة';
      if (val === '7.8+ Months') return '+7.8 أشهر';
      if (val === '0 USD (Zero)') return '0 $ (صفر غرامات)';
      if (val === '45,000 MT/Day') return '45 ألف طن/يوم';
      if (val === '5.5M Tons') return '5.5 مليون طن';
      if (val === 'Weekly') return 'أسبوعياً';
      if (val === '27 Governorates') return '27 محافظة';
      if (val === '8.5M+ MT') return '+8.5 مليون طن';
      if (val === '12 Hours') return '12 ساعة';
    }
    return val;
  };

  return (
    <section id="departments" className={`py-20 relative border-t transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
    }`}>
      {/* Background ambient accents */}
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold border ${
            theme === 'dark'
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              : 'bg-amber-100 border-amber-300 text-amber-800'
          }`}>
            <Layers className="w-3.5 h-3.5" />
            <span>{isAr ? 'الهيكل التنظيمي التخصصي' : 'Specialized Organizational Structure'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black leading-snug sm:leading-normal text-slate-900 dark:text-white">
            {isAr ? 'الإدارات والقطاعات التنفيذية للشراء الموحد' : 'Executive Directorates & Sectors'}
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {isAr ? (
              'منظومة مؤسسية متكاملة تتولى التعاقدات الدولية والمحلية، التخطيط الاستراتيجي، الإدارة اللوجستية للصوامع والموانئ، وتأمين سلاسل الإمداد الوطنية.'
            ) : (
              'An integrated ecosystem overseeing sovereign contracts, international trading, logistics, and national strategic reserves.'
            )}
          </p>
        </div>

        {/* Two-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Department List - 5 Columns on Desktop */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {DEPARTMENTS.map((dept) => {
              const Icon = iconMap[dept.icon] || Building;
              const isSelected = dept.id === selectedDeptId;
              const extras = DEPT_EXTRAS[dept.id] || DEPT_EXTRAS.gov_contracting;

              return (
                <button
                  key={dept.id}
                  onClick={() => {
                    setSelectedDeptId(dept.id);
                    if (window.innerWidth < 1024) {
                      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                  }}
                  type="button"
                  className={`w-full p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 text-right cursor-pointer group ${
                    isSelected
                      ? (theme === 'dark'
                          ? 'bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50 text-white'
                          : 'bg-white border-2 border-amber-500 shadow-md shadow-amber-500/15 ring-1 ring-amber-400/50 text-slate-950')
                      : (theme === 'dark'
                          ? 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700 text-slate-300'
                          : 'bg-white border-slate-200/90 hover:bg-amber-50/30 hover:border-amber-300 text-slate-700')
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Icon Container */}
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected
                        ? (theme === 'dark' ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-sm shadow-amber-500/30' : 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm shadow-amber-500/20')
                        : (theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400 group-hover:text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-600 group-hover:text-amber-600 group-hover:bg-amber-50')
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Department Name & Tagline */}
                    <div className={`${isAr ? 'text-right' : 'text-left'} min-w-0`}>
                      <div className={`text-xs sm:text-sm font-bold transition-colors truncate ${
                        isSelected 
                          ? 'text-slate-950 dark:text-white font-black' 
                          : 'text-slate-800 dark:text-slate-200 group-hover:text-amber-700 dark:group-hover:text-amber-300'
                      }`}>
                        {dept.name[lang] || dept.name.ar}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                        {extras.tagline[lang] || extras.tagline.ar}
                      </div>
                    </div>
                  </div>

                  {/* Active selection indicator */}
                  <div className="flex-shrink-0">
                    {isSelected ? (
                      <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Department Detail Showcase - 7 Columns */}
          <div className="lg:col-span-7" ref={detailRef}>
            <div className={`rounded-3xl border shadow-2xl relative overflow-hidden transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-slate-950/95 border-slate-800 shadow-black/60'
                : 'bg-white border-slate-200 shadow-slate-200'
            }`}>
              {/* Top luxury metallic accent ribbon */}
              <div className="h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600"></div>

              <div className="p-6 sm:p-7 space-y-5">
                
                {/* Header with Department Code & Executive Sector Badge */}
                <div className="flex items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-13 h-13 rounded-2xl border flex items-center justify-center flex-shrink-0 shadow-md ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-amber-500/20 via-slate-900 to-amber-500/5 border-amber-500/40 text-amber-400 shadow-amber-500/10'
                        : 'bg-gradient-to-br from-amber-500 to-amber-600 border-amber-400 text-slate-950 shadow-amber-500/20'
                    }`}>
                      <ActiveIcon className="w-6 h-6" />
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md font-mono font-bold text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {activeDept.code}
                        </span>
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>{isAr ? 'قطاع تنفيذي معتمد' : 'Accredited Executive Sector'}</span>
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white leading-tight truncate">
                        {activeDept.name[lang] || activeDept.name.ar}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Mandate & Strategic Scope */}
                <div className={`p-4 rounded-2xl border ${
                  theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/90 border-slate-200'
                }`}>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1.5 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    <span>{isAr ? 'المهام والاختصاص الاستراتيجي' : 'Strategic Mandate & Scope'}</span>
                  </h4>
                  <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm leading-relaxed">
                    {activeDept.overview[lang] || activeDept.overview.ar}
                  </p>
                </div>

                {/* Core Operational Responsibilities (3 Key Pillars) */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isAr ? 'المسؤوليات التشغيلية الرئيسية' : 'Core Operational Responsibilities'}</span>
                  </h4>

                  <div className="space-y-2">
                    {activeExtras.responsibilities.map((resp, rIdx) => (
                      <div 
                        key={rIdx}
                        className={`p-2.5 sm:p-3 rounded-xl border flex items-start gap-2.5 transition-all text-xs ${
                          theme === 'dark'
                            ? 'bg-slate-900/40 border-slate-800/80 hover:border-amber-500/30 text-slate-300'
                            : 'bg-white border-slate-200 hover:border-amber-300 text-slate-700 shadow-2xs'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="leading-relaxed font-medium">
                          {resp[lang] || resp.ar}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Performance Indicators (Properly localized, no flipped numbers) */}
                <div className="pt-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isAr ? 'مؤشرات الأداء والكفاءة التشغيلية' : 'Key Performance Indicators'}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeDept.kpis.map((kpi, idx) => (
                      <div 
                        key={idx} 
                        className={`p-3 rounded-xl border text-center transition-all ${
                          theme === 'dark' 
                            ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40' 
                            : 'bg-slate-50 border-slate-200 hover:border-amber-400 shadow-2xs'
                        }`}
                      >
                        <div className="text-base sm:text-lg font-black font-mono text-amber-600 dark:text-amber-400">
                          {formatKpiValue(kpi.value)}
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-300 font-semibold mt-0.5 leading-snug">
                          {kpi.label[lang] || kpi.label.ar}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Sovereign Directorate Verification Bar */}
                <div className={`pt-3 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] ${
                  theme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
                }`}>
                  <div className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>{isAr ? 'إدارة الشراء الموحد — جهاز مستقبل مصر (FOE)' : 'Unified Procurement — Future of Egypt (FOE)'}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{isAr ? 'اعتماد تشغيلي ساري' : 'Active Operational Mandate'}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
