import React, { useState, useRef, useEffect } from 'react';
import { 
  X,
  Copy,
  Check, 
  Send, 
  Sparkles, 
  MapPin,
  Bot,
  ExternalLink,
  Calendar,
  Wheat,
  Fish,
  ShieldCheck,
  Share2,
  RotateCcw,
  HelpCircle,
  Clock,
  PhoneCall,
  Building2,
  Maximize2,
  Minimize2,
  Award
} from 'lucide-react';
import { PORTAL_INFO, getNextSessionDisplay } from '../data/portalData';
import { FacebookIcon, LinkedInIcon, XTwitterIcon } from './SocialIcons';

export default function ChatBot({ lang, theme }) {
  const isAr = lang === 'ar';
  const info = PORTAL_INFO[lang] || PORTAL_INFO.ar;
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Close or collapse on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isExpanded) {
          setIsExpanded(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, isOpen]);

  const getWelcomeText = (l) => {
    const welcomeMessages = {
      ar: 'مرحباً بك! أنا المساعد الذكي لإدارة الشراء الموحد بجهاز مستقبل مصر (FOE).\nيسعدني إفادتك بمواعيد لجان البت والتوريد، أرصدة السلع والمخزون، أو الروابط والقنوات الرسمية.',
      en: 'Welcome! I am the AI Assistant of Mostaqbal Misr Unified Procurement Directorate (FOE).\nI can assist you regarding committees schedule, strategic commodity reserves, or official channels.',
      pl: 'Witamy! Jestem Asystentem AI ds. Zakupów Strategicznych Agencji Przyszłość Egiptu (FOE).\nW czym mogę pomóc w kwestii harmonogramu komisji, surowców lub oficjalnych kanałów?',
      uk: 'Вітаємо! Я інтелектуальний помічник Директорату єдиних закупівель Агентства Майбутнє Єгипту (FOE).\nЧим можу допомогти щодо графіка комісій, стратегічних запасів чи контактів?'
    };
    return welcomeMessages[l] || welcomeMessages.ar;
  };

  // Initial welcome message per language
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: getWelcomeText(lang),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [lang]);

  // Restart/Refresh Chat conversation
  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: getWelcomeText(lang),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputValue('');
    setIsTyping(false);
  };

  const quickPrompts = {
    ar: [
      'ما هي مواعيد وساعات العمل الرسمية؟',
      'ما هي مواعيد اللجان (الأرز، الرؤوس الحية، والجمبري)؟',
      'ما هو رقم الخط الساخن وقنوات التواصل؟',
      'أين يقع المقر الرئيسي للإدارة؟',
      'كم يغطي المخزون الاستراتيجي للدولة؟',
      'كيفية التسجيل في سجل الموردين والمناقصات؟',
      'ما هي رؤية وأهداف إدارة الشراء الموحد؟',
      'ما هي الإدارات التخصصية الثمانية؟'
    ],
    en: [
      'What are the official working hours?',
      'What is the weekly committees schedule (Rice & Shrimp)?',
      'What is the direct hotline and contact info?',
      'Where is the main headquarters located?',
      'What is the strategic reserve coverage?',
      'How to register in the suppliers registry?',
      'What is the vision of Unified Procurement?',
      'What are the 8 internal directorates?'
    ],
    pl: [
      'Jakie są oficjalne godziny pracy?',
      'Jaki jest harmonogram komisji (Ryż i Krewetki)?',
      'Jaki jest numer infolinii i kontakt?',
      'Gdzie znajduje się główna siedziba?',
      'Jaki jest stan rezerw strategicznych?',
      'Jak zarejestrować się w rejestrze dostawców?',
      'Jaka jest wizja Dyrekcji ds. Zakupów?',
      'Jakie jest 8 wewnętrznych departamentów?'
    ],
    uk: [
      'Які офіційні години роботи?',
      'Який графік комісій із закупівель (Рис та Креветки)?',
      'Який номер гарячої лінії та контакти?',
      'Де розташований головний офіс?',
      'На скільки місяців вистачає резервів?',
      'Як зареєструватися в реєстрі постачальників?',
      'Яка стратегічна візія системи єдиних закупівель?',
      'Які є 8 внутрішніх департаментів?'
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

// Modular Handler: handleCommitteesQuery (Priority #1: Never intercepted by working hours)
function handleCommitteesQuery(q, lang, info, isAr) {
  const isRice = q.includes('ارز') || q.includes('أرز') || q.includes('رز') || q.includes('rice') || q.includes('ryż') || q.includes('рис');
  const isCattle = q.includes('رؤوس') || q.includes('مواشي') || q.includes('عجول') || q.includes('لحوم') || q.includes('cattle') || q.includes('bydł') || q.includes('худоб');
  const isShrimp = q.includes('جمبري') || q.includes('جمبرى') || q.includes('shrimp') || q.includes('krewetk') || q.includes('креветк');

  const isCommitteeQuery = (
    q.includes('لجان') || 
    q.includes('لجنة') || 
    q.includes('بت وتوريد') || 
    q.includes('جلسات') || 
    q.includes('جلسة') || 
    q.includes('مواعيد اللجان') || 
    q.includes('موعد اللجان') || 
    q.includes('ميعاد اللجان') || 
    q.includes('أيام اللجان') || 
    q.includes('ايام اللجان') || 
    q.includes('جدول اللجان') || 
    q.includes('الأحد') || 
    q.includes('الاحد') || 
    q.includes('الاثنين') || 
    q.includes('الإثنين') || 
    q.includes('الثلاثاء') || 
    q.includes('شروط حضور') ||
    q.includes('اوراق اللجان') ||
    q.includes('أوراق اللجان') ||
    q.includes('قاعة اللجان') ||
    q.includes('committee') || 
    q.includes('komisj') ||
    isRice || isCattle || isShrimp
  );

    if (isCommitteeQuery) {
    let specificNote = '';
    const isDatesQuery = q.includes('تاريخ') || q.includes('تواريخ') || q.includes('تاريخ اللجان') || q.includes('تواريخ اللجان') || q.includes('date') || q.includes('dates');

    const nextRice = getNextSessionDisplay('sunday-rice', lang);
    const nextShrimp = getNextSessionDisplay('monday-shrimp', lang);
    const nextCattle = getNextSessionDisplay('tuesday-cattle', lang);

    if (isDatesQuery) {
      if (lang === 'en') {
        specificNote = `\n\nNext Official Committee Sessions:\n• Rice Committee: ${nextRice} (02:00 PM, Weekly)\n• Shrimp Committee: ${nextShrimp} (02:00 PM, Bi-weekly)\n• Live Cattle Committee: ${nextCattle} (02:00 PM, Bi-weekly)\nVenue: Tucano Commercial Complex — Floor 3 — Central Sessions Hall.`;
      } else if (lang === 'pl') {
        specificNote = `\n\nNajbliższe Terminy Posiedzeń:\n• Komisja ds. Ryżu: ${nextRice} (14:00)\n• Komisja ds. Krewetek: ${nextShrimp} (14:00)\n• Komisja ds. Żywego Bydła: ${nextCattle} (14:00)`;
      } else if (lang === 'uk') {
        specificNote = `\n\nНайближчі Дати Засідань Комісій:\n• Комісія з рису: ${nextRice} (14:00)\n• Комісія з креветок: ${nextShrimp} (14:00)\n• Комісія з живої худоби: ${nextCattle} (14:00)`;
      } else {
        specificNote = `\n\nتواريخ الجلسات القادمة المعتمدة:\n• لجنة الأرز: ${nextRice} (02:00 ظهراً — جلسة أسبوعية ثابتة).\n• لجنة الجمبري: ${nextShrimp} (02:00 ظهراً — دورية تبادلية).\n• لجنة الرؤوس الحية: ${nextCattle} (02:00 ظهراً — دورية تبادلية).\nالمقر: مجمع توكانو التجاري — الدور الثالث — قاعة اللجان المركزية.`;
      }
    } else if (isRice && !isCattle && !isShrimp) {
      if (lang === 'en') {
        specificNote = `\n\nRegarding Rice Committee: Convenes weekly every Sunday at 02:00 PM in the Central Bidding Hall (Tucano Mall — Floor 3). Next Session: ${nextRice}. Adjudication priority is strictly by physical sign-in order in the hall.`;
      } else if (lang === 'pl') {
        specificNote = `\n\nKomisja ds. Ryżu: Obraduje w każdą niedzielę o godz. 14:00 w Tucano Mall (3. piętro). Najbliższa sesja: ${nextRice}.`;
      } else if (lang === 'uk') {
        specificNote = `\n\nКомісія із закупівель рису: Засідає щонеділі о 14:00 у залі торгів Tucano Mall (3-й поверх). Найближча дата: ${nextRice}.`;
      } else {
        specificNote = `\n\nبخصوص لجنة الأرز: تنعقد أسبوعياً كل يوم أحد في تمام الساعة 02:00 ظهراً بقاعة اللجان المركزية (توكانو مول — الدور الثالث). الجلسة القادمة: ${nextRice}. وتطبق قاعدة أسبقية التواجد الفعلي بالقاعة للتسجيل وترتيب الترسية.`;
      }
    } else if (isCattle && !isRice && !isShrimp) {
      if (lang === 'en') {
        specificNote = `\n\nRegarding Live Cattle (Livestock) Committee: Convenes Tuesdays at 02:00 PM on a bi-weekly alternating cycle with the Shrimp Committee. Next Session: ${nextCattle}.`;
      } else if (lang === 'pl') {
        specificNote = `\n\nKomisja ds. Żywego Bydła: Obraduje we wtorki o godz. 14:00 co dwa tygodnie. Najbliższa sesja: ${nextCattle}.`;
      } else if (lang === 'uk') {
        specificNote = `\n\nКомісія з живої худоби: Засідає щовівторка о 14:00 раз на два тижні. Найближча дата: ${nextCattle}.`;
      } else {
        specificNote = `\n\nبخصوص لجنة الرؤوس الحية (المواشي والعجول): تنعقد كل يوم ثلاثاء في تمام الساعة 02:00 ظهراً وفق دورية تبادلية أسبوعية مع لجنة الجمبري بقاعة اللجان المركزية. الجلسة القادمة: ${nextCattle}.`;
      }
    } else if (isShrimp && !isRice && !isCattle) {
      if (lang === 'en') {
        specificNote = `\n\nRegarding Shrimp & Seafood Committee: Convenes Mondays at 02:00 PM on a bi-weekly alternating schedule with the Live Cattle Committee. Next Session: ${nextShrimp}.`;
      } else if (lang === 'pl') {
        specificNote = `\n\nKomisja ds. Krewetek: Obraduje w poniedziałki o godz. 14:00 co dwa tygodnie. Najbliższa sesja: ${nextShrimp}.`;
      } else if (lang === 'uk') {
        specificNote = `\n\nКомісія із закупівель креветок: Засідає щопонеділка о 14:00 раз на два тижні. Найближча дата: ${nextShrimp}.`;
      } else {
        specificNote = `\n\nبخصوص لجنة الجمبري والأسماك: تنعقد كل يوم اثنين في تمام الساعة 02:00 ظهراً وفق دورية تبادلية أسبوعية مع لجنة الرؤوس الحية بقاعة اللجان المركزية. الجلسة القادمة: ${nextShrimp}.`;
      }
    }

    let mainTitle = '';
    if (lang === 'en') {
      mainTitle = `Official Sourcing & Procurement Committees Schedule (Tucano Mall HQ — Floor 3):${specificNote}`;
    } else if (lang === 'pl') {
      mainTitle = `Oficjalny Harmonogram Komisji Przetargowych (Tucano Mall — 3. piętro):${specificNote}`;
    } else if (lang === 'uk') {
      mainTitle = `Офіційний графік закупівельних комісій (Tucano Mall — 3-й поверх):${specificNote}`;
    } else {
      mainTitle = `جدول ومواعيد لجان البت والتوريد المعتمدة (بمقر إدارة الشراء الموحد بتوكانو مول):${specificNote}`;
    }

    return {
      type: 'committees',
      text: mainTitle
    };
  }

  return null;
}

// Modular Handler: handleLocationQuery (Priority #2: Clean text with dedicated card, ZERO raw URLs)
function handleLocationQuery(q, lang, info, isAr) {
  if (
    q.includes('مقر') || 
    q.includes('عنوان') || 
    q.includes('مكان') || 
    q.includes('موقعكم') || 
    q.includes('فين') || 
    q.includes('أين') || 
    q.includes('اين') || 
    q.includes('توكانو') || 
    q.includes('مدينة نصر') || 
    q.includes('يوسف عباس') || 
    q.includes('خريطة') || 
    q.includes('خرائط') || 
    q.includes('الدور') || 
    q.includes('لوكيشن') || 
    q.includes('اللوكيشن') || 
    q.includes('address') || 
    q.includes('location') || 
    q.includes('where') || 
    q.includes('maps') || 
    q.includes('map') || 
    q.includes('siedzib') || 
    q.includes('gdzie') || 
    q.includes('адрес') || 
    q.includes('офіс') || 
    q.includes('де')
  ) {
    let text = '';
    if (lang === 'en') {
      text = `Official Main Headquarters of Mostaqbal Misr Unified Strategic Procurement Directorate:
• Location: Tucano Commercial Complex — Floor 3 — Yousef Abbas St. — Nasr City — Cairo.
• Central Sessions Hall: Dedicated venue for weekly procurement committees and vendor reception.
• Working Hours: Sunday through Thursday (09:00 AM – 05:00 PM).
• Direct Unified Hotline: 19842 | Official Email: procurement@foe.gov.eg`;
    } else if (lang === 'pl') {
      text = `Oficjalna Główna Siedziba Dyrekcji ds. Zakupów Agencji Przyszłość Egiptu:
• Adres: Tucano Commercial Complex — 3. piętro — ul. Yousef Abbas — Nasr City — Kair.
• Sala posiedzeń: Centralna sala przetargowa do obsługi komisji i dostawców.
• Godziny urzędowania: Niedziela – Czwartek (09:00 – 17:00).
• Główna Infolinia: +20 19842 | E-mail: procurement@foe.gov.eg`;
    } else if (lang === 'uk') {
      text = `Офіційний головний офіс Директорату єдиних закупівель Агентства Майбутнє Єгипту:
• Адреса: Tucano Commercial Complex — 3-й поверх — вул. Юсефа Аббаса — Наср-Сіті — Каїр.
• Зала засідань: Центральна зала торгів для щотижневих комісій та прийому постачальників.
• Години роботи: Неділя – Четвер (09:00 – 17:00).
• Єдина гаряча лінія: +20 19842 | Email: procurement@foe.gov.eg`;
    } else {
      text = `المقر الرسمي الرئيسي لإدارة الشراء الموحد بجهاز مستقبل مصر للتنمية المستدامة:
• العنوان: مجمع توكانو التجاري — الدور الثالث — شارع يوسف عباس — مدينة نصر — القاهرة.
• قاعة اللجان المركزية: مجهزة بالكامل لعقد جلسات البت والتوريد الأسبوعية واستقبال السادة الموردين.
• مواعيد الاستقبال والعمل: من الأحد إلى الخميس (من 09:00 صباحاً حتى 05:00 مساءً).
• الخط الساخن الموحد: 19842 | البريد الرسمي: procurement@foe.gov.eg`;
    }

    return {
      type: 'location',
      text: text
    };
  }

  return null;
}

// Modular Handler: handleWorkingHoursQuery (Priority #3: Guarded against false positives)
function handleWorkingHoursQuery(q, lang, info, isAr) {
  // Prevent false matches for committee, tender, or specific commodities
  if (
    q.includes('لجان') || 
    q.includes('لجنة') || 
    q.includes('ارز') || 
    q.includes('أرز') || 
    q.includes('رز') || 
    q.includes('جمبري') || 
    q.includes('رؤوس') || 
    q.includes('مواشي') || 
    q.includes('عجول') || 
    q.includes('مناقص') || 
    q.includes('توريد')
  ) {
    return null;
  }

  if (
    q.includes('ساعات العمل') || 
    q.includes('مواعيد العمل') || 
    q.includes('أوقات العمل') || 
    q.includes('وقت العمل') || 
    q.includes('دوام') || 
    q.includes('شغالين') || 
    q.includes('فاتحين') || 
    q.includes('أيام العمل') || 
    q.includes('ايام العمل') || 
    q.includes('إجازة') || 
    q.includes('اجازة') || 
    q.includes('عطلة') || 
    q.includes('working hours') || 
    q.includes('work time') || 
    q.includes('opening hours') || 
    q.includes('schedule') || 
    q.includes('godziny') || 
    q.includes('czas pracy') || 
    q.includes('години') || 
    q.includes('графік') ||
    ((q.includes('مواعيد') || q.includes('ساعات')) && !q.includes('لجان') && !q.includes('لجنة'))
  ) {
    if (lang === 'en') {
      return `Official Working Hours of Mostaqbal Misr Unified Strategic Procurement Directorate:
• Working Days: Sunday through Thursday weekly.
• Operational Hours: 09:00 AM to 05:00 PM (9 to 5).
• Official Weekend: Friday & Saturday.
• Procurement & Bidding Sessions: Convene at 02:00 PM on designated committee days in the Central Hall.
• Venue: Tucano Mall — Floor 3 — Yousef Abbas St. — Nasr City — Cairo.`;
    } else if (lang === 'pl') {
      return `Oficjalne Godziny Pracy Dyrekcji ds. Zakupów:
• Dni robocze: Od niedzieli do czwartku.
• Godziny urzędowania: 09:00 – 17:00 (od 9 do 17).
• Weekend: Piątek i sobota.
• Posiedzenia komisji przetargowych: Godzina 14:00 w wyznaczone dni.
• Siedziba: Tucano Mall — 3. piętro — Nasr City — Kair.`;
    } else if (lang === 'uk') {
      return `Офіційні години роботи Директорату закупівель:
• Робочі дні: З неділі по четвер щотижня.
• Години роботи: 09:00 – 17:00 (з 9 до 17).
• Вихідні дні: П'ятниця та субота.
• Засідання комісій із закупівель: О 14:00 у визначені дні у центральній залі.
• Штаб-квартира: Tucano Mall — 3-й поверх — Наср-Сіті — Каїр.`;
    } else {
      return `مواعيد وساعات العمل الرسمية لإدارة الشراء الموحد بجهاز مستقبل مصر:
• أيام العمل الرسمية: من الأحد إلى الخميس أسبوعياً (يومياً عدا الجمعة والسبت).
• ساعات الدوام الرسمي: من الساعة 09:00 صباحاً حتى 05:00 مساءً (من 9 إلى 5).
• العطلة الأسبوعية: يومي الجمعة والسبت.
• جلسات لجان البت والتوريد: تبدأ في تمام الساعة 02:00 ظهراً بالقاعة المركزية بتوكانو مول.
• مواعيد الاستقبال والمراجعات: متاحة طوال ساعات العمل الرسمية.`;
    }
  }

  return null;
}

// Modular Handler: handleContactQuery (Priority #4: Guarded against single word 'رقم' collisions)
function handleContactQuery(q, lang, info, isAr) {
  const isContactKeyword = (
    q.includes('هاتف') || 
    q.includes('تليفون') || 
    q.includes('تلفون') || 
    q.includes('خط ساخن') || 
    q.includes('ساخن') || 
    q.includes('اتصال') || 
    q.includes('تواصل') || 
    q.includes('ايميل') || 
    q.includes('إيميل') || 
    q.includes('بريد') || 
    q.includes('ارقام') || 
    q.includes('أرقام') || 
    (q.includes('رقم') && (q.includes('هاتف') || q.includes('تلفون') || q.includes('تواصل') || q.includes('خط') || q.includes('اتصال') || q.includes('الساخن'))) ||
    q.includes('خدمة العملاء') ||
    q.includes('phone') || 
    q.includes('hotline') || 
    q.includes('call') || 
    q.includes('contact') || 
    q.includes('email') || 
    q.includes('mail') || 
    q.includes('infolinia') || 
    q.includes('телефон') || 
    q.includes('гаряча лінія')
  );

  if (isContactKeyword) {
    if (lang === 'en') {
      return `Official Contact Channels of Mostaqbal Misr Unified Strategic Procurement Directorate:
• Unified Direct Hotline: 19842 (Available during official working hours).
• Official Procurement Email: procurement@foe.gov.eg
• General Inquiries Email: info@foe.gov.eg
• Main HQ: Tucano Commercial Complex — Floor 3 — Yousef Abbas St. — Nasr City — Cairo.
• Working Hours: Sunday through Thursday (09:00 AM – 05:00 PM).`;
    } else if (lang === 'pl') {
      return `Oficjalne Dane Kontaktowe Dyrekcji ds. Zakupów Agencji Przyszłość Egiptu:
• Główna Infolinia: +20 19842 (W godzinach urzędowania).
• Oficjalny E-mail ds. Zakupów: procurement@foe.gov.eg
• E-mail ogólny: info@foe.gov.eg
• Adres: Tucano Commercial Complex — 3. piętro — ul. Yousef Abbas — Nasr City — Kair.
• Godziny urzędowania: Niedziela – Czwartek (09:00 – 17:00).`;
    } else if (lang === 'uk') {
      return `Офіційні контакти Директорату єдиних закупівель Агентства Майбутнє Єгипту:
• Єдина гаряча лінія: +20 19842 (У робочі години).
• Офіційний email із закупівель: procurement@foe.gov.eg
• Загальний email: info@foe.gov.eg
• Адреса: Tucano Commercial Complex — 3-й поверх — вул. Юсефа Аббаса — Наср-Сіті — Каїр.
• Години роботи: Неділя – Четвер (09:00 – 17:00).`;
    } else {
      return `قنوات التواصل الرسمية لإدارة الشراء الموحد بجهاز مستقبل مصر للتنمية المستدامة:
• الخط الساخن الموحد: 19842 (متاح خلال أوقات العمل الرسمية).
• البريد الإلكتروني الرسمي لإدارة المشتريات والتعاقدات: procurement@foe.gov.eg
• البريد الإلكتروني العام للاستفسارات: info@foe.gov.eg
• المقر الرئيسي: مجمع توكانو التجاري — الدور الثالث — شارع يوسف عباس — مدينة نصر — القاهرة.
• مواعيد استقبال الاتصالات والزيارات: من الأحد إلى الخميس (من 09:00 صباحاً حتى 05:00 مساءً).`;
    }
  }

  return null;
}

// Modular Handler: handleSocialQuery
function handleSocialQuery(q, lang, info, isAr) {
  if (
    q.includes('فيس') || 
    q.includes('فيسبوك') || 
    q.includes('لينكد') || 
    q.includes('لينكدان') || 
    q.includes('تويتر') || 
    q.includes('سوشيال') || 
    q.includes('روابط') || 
    q.includes('رابط') || 
    q.includes('مواقع التواصل') || 
    q.includes('social') || 
    q.includes('facebook') || 
    q.includes('linkedin') || 
    q.includes('twitter') || 
    q.includes('x.com') ||
    q.includes('قنوات')
  ) {
    return {
      type: 'social_links',
      text: isAr 
        ? `إليك القنوات والروابط الرسمية المعتمدة لجهاز مستقبل مصر للتنمية المستدامة (FOE):`
        : `Official verified channels of Future of Egypt Agency (FOE):`
    };
  }

  return null;
}

// Modular Handler: handleTendersQuery
function handleTendersQuery(q, lang, info, isAr) {
  if (
    q.includes('مورد') || 
    q.includes('موردين') || 
    q.includes('تسجيل') || 
    q.includes('سجل الموردين') || 
    q.includes('مناقصة') || 
    q.includes('مناقصات') || 
    q.includes('مزايدة') || 
    q.includes('مزايدات') || 
    q.includes('ممارسة') || 
    q.includes('كراسة الشروط') || 
    q.includes('شروط التوريد') || 
    q.includes('توريد') || 
    q.includes('تأهيل') || 
    q.includes('عروض فنية') || 
    q.includes('tender') || 
    q.includes('bidding') || 
    q.includes('supplier') || 
    q.includes('przetarg') || 
    q.includes('dostawc') || 
    q.includes('тендер') || 
    q.includes('постачальник')
  ) {
    if (lang === 'en') {
      return `Active Strategic Procurement Operations & Suppliers Registry:
• Open Procurement Tenders:
  1. FOE-REQ-2026-092: 420,000 MT Bulk Milling Wheat (FOB/CIF) — Open for Technical Offers.
  2. FOE-REQ-2026-090: 60,000 MT Vegetable Oils (Soybean & Sunflower) — Open for Technical Offers.
  3. FOE-REQ-2026-088: 120,000 MT Grade-1 Yellow Feed Corn — Open for Technical Offers.
  4. FOE-REQ-2026-085: Grain Spectral Analysis & Telemetry at Smart Silos — Technical Inquiries Stage.
• Certified Suppliers Registry:
  Open at the Government Contracting Directorate (Tucano Commercial Complex — Floor 3).
  Requirements: Valid Commercial Registry, Tax Compliance, Audited Financials (3 years), and Quality Certifications (ISO/HACCP/GAFTA/FOSFA).
• Contact: procurement@foe.gov.eg | Unified Hotline: 19842.`;
    } else if (lang === 'pl') {
      return `Rejestracja Dostawców i Aktualne Postępowania Przetargowe:
• Aktualne Zapytania i Przetargi:
  1. FOE-REQ-2026-092: 420 000 ton pszenicy konsumpcyjnej (FOB/CIF).
  2. FOE-REQ-2026-090: 60 000 ton olejów roślinnych (sojowy i słonecznikowy).
  3. FOE-REQ-2026-088: 120 000 ton kukurydzy paszowej I klasy.
  4. FOE-REQ-2026-085: Systemy telemetryczne i spektrometryczne dla silosów.
• Rejestr Dostawców: Dyrekcja ds. Zamówień Rządowych (Tucano Mall — 3. piętro).
• Kontakt: procurement@foe.gov.eg | Infolinia: 19842.`;
    } else if (lang === 'uk') {
      return `Тендери та реєстрація в реєстрі постачальників:
• Поточні закупівлі:
  1. FOE-REQ-2026-092: 420 000 тонн продовольчої пшениці (FOB/CIF).
  2. FOE-REQ-2026-090: 60 000 тонн рослинних олій (соєва та соняшникова).
  3. FOE-REQ-2026-088: 120 000 тонн жовтої кормової кукурудзи.
  4. FOE-REQ-2026-085: Системи спектрального аналізу для елеваторів.
• Реєстрація постачальників: Директорат урядових контрактів (Tucano Mall — 3-й поверх).
• Зв'язок: procurement@foe.gov.eg | Гаряча лінія: 19842.`;
    } else {
      return `العمليات الاستراتيجية الحالية وإجراءات القيد في سجل الموردين:
• المناقصات وعمليات التوريد المطروحة حالياً:
  1. عملية توريد 420 ألف طن قمح طاحن مستورد صب (FOE-REQ-2026-092) — مفتوحة لتلقي العروض الفنية.
  2. طلب عروض أسعار لتوريد 60 ألف طن زيوت نباتية صويا وعباد شمس (FOE-REQ-2026-090) — مفتوحة لتلقي العروض.
  3. توريد 120 ألف طن ذرة صفراء علفية لتعزيز المخزون القومي (FOE-REQ-2026-088) — مفتوحة لتلقي العروض.
  4. تجهيز أنظمة الفحص الطيفي السريع للحبوب بالصوامع الذكية (FOE-REQ-2026-085) — جلسة الاستفسارات الفنية.
• إجراءات القيد بسجل الموردين المعتمد:
  مفتوح لدى إدارة التعاقدات الحكومية بمقر الإدارة (توكانو مول — الدور الثالث — مدينة نصر).
  المستندات المطلوبة: السجل التجاري الساري، البطاقة الضريبية، القوائم المالية المدققة، وشهادات الجودة والسلامة الغذائية.
• للاستعلام وسحب كراسات الشروط: التواصل عبر procurement@foe.gov.eg أو الخط الساخن 19842.`;
    }
  }

  return null;
}

// Modular Handler: handleReservesQuery
function handleReservesQuery(q, lang, info, isAr) {
  if (
    q.includes('مخزون') || 
    q.includes('احتياطي') || 
    q.includes('ارصدة') || 
    q.includes('أرصدة') || 
    q.includes('رصيد') || 
    q.includes('سلع استراتيجية') || 
    q.includes('سلع أساسية') || 
    q.includes('كم يغطي') || 
    q.includes('مخزون الدولة') || 
    q.includes('كم شهر') || 
    q.includes('reserve') || 
    q.includes('stock') || 
    q.includes('buffer') || 
    q.includes('wheat') || 
    q.includes('rezerw') || 
    q.includes('резерв') ||
    ((q.includes('قمح') || q.includes('زيوت') || q.includes('سكر') || q.includes('ذرة')) && !q.includes('مناقص') && !q.includes('توريد'))
  ) {
    if (lang === 'en') {
      return `National Strategic Commodity Reserves Buffer managed by Mostaqbal Misr:
• Milling Wheat: 7.8 Months safe buffer (5.8 Million Metric Tons).
• Vegetable Oils: 6.9 Months reserve (1.4 Million Metric Tons).
• Sugar: 8.2 Months self-sufficiency supported by New Delta refineries.
• Yellow Corn: 6.2 Months reserve (3.2 Million Metric Tons) supporting livestock and feedmills.
All commodity inventories undergo real-time automated monitoring across modern smart silos nationwide.`;
    } else if (lang === 'pl') {
      return `Poziom Państwowych Rezerw Strategicznych:
• Pszenica konsumpcyjna: 7.8 miesięcy (5.8 mln ton metrycznych).
• Oleje roślinne: 6.9 miesięcy (1.4 mln ton metrycznych).
• Cukier: 8.2 miesięcy samowystarczalności dzięki cukrowniom Nowej Delty.
• Kukurydza żółta: 6.2 miesięcy (3.2 mln ton metrycznych).`;
    } else if (lang === 'uk') {
      return `Рівень стратегічних резервів держави:
• Пшениця борошномельна: 7.8 місяців (5.8 млн метричних тонн).
• Рослинні олії: 6.9 місяців (1.4 млн метричних тонн).
• Цукор: 8.2 місяців завдяки агроіндустріальним потужностям Нової Дельти.
• Кукурудза жовта: 6.2 місяців (3.2 млн метричних тонн).`;
    } else {
      return `مؤشرات أرصدة السلع والمخزون الاستراتيجي لجهاز مستقبل مصر للتنمية المستدامة:
• القمح الطاحن: يغطي 7.8 أشهر (بإجمالي 5.8 مليون طن متري لتأمين الخبز المدعم).
• الزيوت النباتية: تغطي 6.9 أشهر (بإجمالي 1.4 مليون طن من زيوت الصويا وعباد الشمس).
• السكر التمويني والحر: يغطي 8.2 أشهر (طفرة اكتفاء مدعومة بمجمعات ومصانع سكر الدلتا الجديدة).
• الذرة الصفراء: تغطي 6.2 أشهر (3.2 مليون طن لدعم الثروة الحيوانية وصناعة الأعلاف).
تتم المتابعة اللحظية للأرصدة عبر منظومة رقمية متصلة بكافة الصوامع الاستراتيجية على مستوى الجمهورية.`;
    }
  }

  return null;
}

// Modular Handler: handlePillarsQuery
function handlePillarsQuery(q, lang, info, isAr) {
    // 7. Strategic Pillars
    if (
      q.includes('ركائز') || 
      q.includes('مبادئ') || 
      q.includes('محاور') || 
      q.includes('pillars') || 
      q.includes('filarów') || 
      q.includes('стовп')
    ) {
      if (lang === 'en') {
        return `The 6 Strategic Pillars of Mostaqbal Misr Unified Strategic Procurement:
1. Commodity security, controlled pricing, and certified international quality.
2. Fortifying state strategic reserves of essential grains and commodities.
3. Regulating price fluctuations through supply augmentation and direct trading.
4. Rigorous quality auditing ensuring citizen health and food safety.
5. Diversifying import origins across 18+ sovereign nations to mitigate geopolitical risks.
6. Professional high-level negotiation achieving substantial foreign currency savings.`;
      } else if (lang === 'pl') {
        return `Sześć Strategicznych Filarów Zunifikowanych Zakupów:
1. Bezpieczeństwo towarowe, kontrola cen i certyfikowana jakość.
2. Wzmocnienie państwowych rezerw strategicznych kluczowych surowców.
3. Stabilizacja cen poprzez zwiększenie podaży rynkowej.
4. Rygorystyczna kontrola jakości zgodna ze standardami NFSA.
5. Dywersyfikacja źródeł importu z ponad 18 krajów.
6. Profesjonalne negocjacje przynoszące wymierne oszczędności walutowe.`;
      } else if (lang === 'uk') {
        return `Шість стратегічних стовпів Директорату єдиних закупівель:
1. Товарна безпека, стабільні контрольовані ціни та гарантована якість.
2. Зміцнення державних резервів зернових та стратегічних культур.
3. Регулювання ринкових цін шляхом нарощування товарної пропозиції.
4. Суворий аудит якості у відповідності до стандартів NFSA.
5. Диверсифікація джерел постачання з понад 18 країн світу.
6. Професійні переговори, що забезпечують збереження валютних резервів.`;
      } else {
        return `الركائز الاستراتيجية الست المعتمدة لإدارة الشراء الموحد:
1. أمن سلعي.. وأسعار منضبطة.. وجودة مضمونة.
2. تعزيز مخزون الدولة من السلع والمحاصيل الأساسية والاستراتيجية.
3. ضبط حركة الأسعار من خلال زيادة المعروض السلعي في الأسواق.
4. مراجعة الجودة الشاملة لضمان سلع آمنة وصحية للمواطنين.
5. تنويع مناشئ الاستيراد لضمان استمرارية الإمدادات والتحوط ضد المخاطر الجيوسياسية.
6. تفاوض احترافي يحقق وفر دولاري مباشر للدولة ويحسن شروط السداد والتوريد.`;
      }
    }

  return null;
}

// Modular Handler: handleTendersQuery
function handleTendersQuery(q, lang, info, isAr) {
    // 8. Tenders, Bidding & Suppliers Registry
    if (
      q.includes('مورد') || 
      q.includes('موردين') || 
      q.includes('تسجيل') || 
      q.includes('سجل الموردين') || 
      q.includes('مناقصة') || 
      q.includes('مناقصات') || 
      q.includes('مزايدة') || 
      q.includes('مزايدات') || 
      q.includes('ممارسة') || 
      q.includes('كراسة الشروط') || 
      q.includes('شروط التوريد') || 
      q.includes('توريد') || 
      q.includes('tender') || 
      q.includes('bidding') || 
      q.includes('supplier') || 
      q.includes('przetarg') || 
      q.includes('dostawc') || 
      q.includes('тендер') || 
      q.includes('постачальник')
    ) {
      if (lang === 'en') {
        return `Tenders & Certified Suppliers Registration:
• Suppliers Registry: Open for domestic and international suppliers at the Government Contracting Directorate.
• Registration Requirements: Valid Commercial Registry, Tax Card, Audited Financials, and Quality Certifications (ISO/HACCP).
• Central Bidding Sessions: Conducted at Tucano Mall HQ (Floor 3) starting 02:00 PM on designated committee days.
• Submission & Registration: Contact the Government Contracting Directorate at procurement@foe.gov.eg or hotline 19842.`;
      } else if (lang === 'pl') {
        return `Rejestracja Dostawców i Przetargi Publiczne:
• Rejestr Dostawców: Otwarty dla firm krajowych i międzynarodowych w Dyrekcji ds. Zamówień Rządowych.
• Wymagania: Wpis do KRS/Rejestru Handlowego, NIP, sprawozdania finansowe i certyfikaty jakości.
• Posiedzenia komisji: Tucano Mall (3. piętro) o godz. 14:00 w wyznaczone dni robocze.
• Kontakt: procurement@foe.gov.eg | Infolinia: 19842.`;
      } else if (lang === 'uk') {
        return `Тендери та реєстрація постачальників:
• Реєстр постачальників: Відкритий для єгипетських та міжнародних компаній у Директораті урядових контрактів.
• Необхідні документи: Витяг з комерційного реєстру, податковий номер, фінансова звітність та сертифікати якості.
• Засідання комісій: Штаб-квартира Tucano Mall (3-й поверх) о 14:00.
• Зв'язок: procurement@foe.gov.eg або лінія 19842.`;
      } else {
        return `إجراءات التسجيل في سجل الموردين والمناقصات المركزية:
• سجل الموردين المعتمد: مفتوح للشركات والموردين المحليين والدوليين بإدارة التعاقدات الحكومية.
• المستندات المطلوبة للتأهيل: السجل التجاري الساري، البطاقة الضريبية، القوائم المالية المعتمدة، وشهادات الجودة المعتمدة.
• جلسات فتح المظاريف والبت: تعقد أسبوعياً بمقر الإدارة بتوكانو مول (الدور الثالث) بدءاً من الساعة 02:00 ظهراً.
• للاستعلام وسحب كراسات الشروط: التواصل عبر البريد الرسمي procurement@foe.gov.eg أو عبر الخط الساخن 19842.`;
      }
    }

  return null;
}

// Modular Handler: handleQualityQuery
function handleQualityQuery(q, lang, info, isAr) {
    // 9. Quality, Food Safety & Specifications
    if (
      q.includes('جودة') || 
      q.includes('سلامة الغذاء') || 
      q.includes('سلامه الغذاء') || 
      q.includes('هيئة سلامة الغذاء') || 
      q.includes('مواصفات') || 
      q.includes('معايير') || 
      q.includes('فحص') || 
      q.includes('تحليل') || 
      q.includes('رقابة') || 
      q.includes('quality') || 
      q.includes('standards') || 
      q.includes('food safety') || 
      q.includes('nfsa') || 
      q.includes('gafta') || 
      q.includes('fosfa') || 
      q.includes('jakość') || 
      q.includes('якість')
    ) {
      if (lang === 'en') {
        return `Quality & Food Safety Assurance Framework:
• Regulatory Authority: All consignments comply with Egyptian National Food Safety Authority (NFSA) and EOS standards.
• International Standards: Full compliance with CODEX Alimentarius, GAFTA (grains), and FOSFA (oils) grading.
• 3-Tier Verification: Rigorous pre-shipment inspection at port of origin, onboard sampling, and accredited lab release upon arrival.
• Zero Tolerance: Consignments failing biological or chemical thresholds are strictly rejected before port discharge.`;
      } else if (lang === 'pl') {
        return `Standardy Jakości i Bezpieczeństwa Żywności:
• Nadzór: Pełna zgodność z normami Egipskiego Urzędu ds. Bezpieczeństwa Żywności (NFSA) i EOS.
• Standardy międzynarodowe: Certyfikacja CODEX, reguły GAFTA (zboża) oraz FOSFA (oleje).
• Trzystopniowa kontrola: Kontrola w porcie załadunku, badania próbek na statkach i testy laboratoryjne w portach egipskich.`;
      } else if (lang === 'uk') {
        return `Стандарти якості та безпечності харчової продукції:
• Контроль: Сувора відповідність нормам Національного агентства безпечності харчових продуктів (NFSA).
• Світові стандарти: Сертифікація за правилами GAFTA (зернові), FOSFA (олії) та CODEX Alimentarius.
• Трирівнева перевірка: Інспекція в порту відправлення, лабораторний відбір на судні та фінальний аналіз у портах Єгипту.`;
      } else {
        return `معايير الجودة وسلامة الغذاء المعتمدة بإدارة الشراء الموحد:
• الرقابة والاعتماد: خضوع كافة الشحنات الواردة لرقابة الهيئة القومية لسلامة الغذاء (NFSA) وهيئة المواصفات والجودة (EOS).
• المعايير الدولية: الالتزام الصارم بلائحة الكودكس (CODEX Alimentarius)، وقواعد جافتا (GAFTA) للأقماح، وفوسفا (FOSFA) للزيوت.
• الفحص الثلاثي الإلزامي: فحص وفحص مسبق بموانئ الشحن، فحص على متن البواخر، ثم سحب عينات وتحليل بمعامل وزارة الصحة والموانئ المصرية قبل الإفراج.
• جودة وطنية: لا يتم استلام أي شحنة إلا بعد مطابقتها التامة لكافة الاشتراطات الفنية والصحية لحماية المستهلك المصري.`;
      }
    }

  return null;
}

// Modular Handler: handleStorageQuery
function handleStorageQuery(q, lang, info, isAr) {
    // 10. Silos, Storage & Logistics Network
    if (
      q.includes('صوامع') || 
      q.includes('صومعة') || 
      q.includes('تخزين') || 
      q.includes('سعات') || 
      q.includes('سعة') || 
      q.includes('موانئ') || 
      q.includes('ميناء') || 
      q.includes('تفريغ') || 
      q.includes('لوجستيات') || 
      q.includes('سلاسل امداد') || 
      q.includes('سلاسل الإمداد') || 
      q.includes('غرامات') || 
      q.includes('demurrage') || 
      q.includes('silos') || 
      q.includes('storage') || 
      q.includes('ports') || 
      q.includes('discharge') || 
      q.includes('logistics') || 
      q.includes('magazyn') || 
      q.includes('елеватор')
    ) {
      if (lang === 'en') {
        return `Silos & Integrated Port Logistics:
• Smart Silos Network: Total aggregate storage capacity exceeding 5.5 Million Metric Tons equipped with temperature sensors and automated aeration.
• Port Discharge Velocity: Fast daily discharge rate surpassing 45,000 MT/day across Alexandria, Damietta, Port Said, Dekheila, and Safaga.
• Zero Demurrage: Advanced logistics scheduling reducing vessel idle times and eliminating costly maritime demurrage fees.`;
      } else if (lang === 'pl') {
        return `Silosy i Zintegrowana Logistyka Portowa:
• Pojemność silosów: Ponad 5.5 mln ton metrycznych w nowoczesnych cyfrowych silosach w całym kraju.
• Rozładunek portowy: Ponad 45 000 ton dziennie w portach Aleksandria, Damietta, Port Said i Safaga.
• Zero opłat postojowych: Cyfrowe zarządzanie ruchem statków eliminujące kary demurrage.`;
      } else if (lang === 'uk') {
        return `Мережа елеваторів та портова логістика:
• Місткість елеваторів: Понад 5.5 млн метричних тонн у сучасних цифрових зерносховищах.
• Швидкість розвантаження: Понад 45 000 тонн на добу в портах Александрія, Дамієтта, Порт-Саїд та Сафага.
• Нульовий демередж: Цифровий диспетчеринг суден для уникнення витрат на простій флоту.`;
      } else {
        return `منظومة الصوامع والقدرات اللوجستية لإدارة الشراء الموحد:
• شبكة الصوامع الذكية: طاقة استيعابية تتجاوز 5.5 مليون طن متري مدعومة بأنظمة التحكم الرقمي والمراقبة الحرارية.
• سرعة التفريغ بالموانئ: معدل تفريغ يتخطى 45 ألف طن يومياً بموانئ الإسكندرية، ودمياط، وبورسعيد، والدخيلة، وسفاجا.
• مبادرة صفر غرامات تأخير (Zero Demurrage): إدارة تشغيلية متكاملة لدخول وتفريغ البواخر تمنع أي هدر بالعملة الأجنبية.
• ربط رقمي متكامل: اتصال فوري بين موانئ التفريغ، ومجمعات الصوامع، وشبكة النقل بالسكك الحديدية والأسطول البري.`;
      }
    }

  return null;
}

// Modular Handler: handleDirectoratesQuery
function handleDirectoratesQuery(q, lang, info, isAr) {
    // 11. The 8 Internal Directorates (Must NOT trigger on single word 'ادارة')
    if (
      q.includes('ادارات') || 
      q.includes('إدارات') || 
      q.includes('هيكل') || 
      q.includes('الهيكل') || 
      q.includes('قطاعات') || 
      q.includes('اقسام') || 
      q.includes('أقسام') || 
      q.includes('department') || 
      q.includes('directorates') || 
      q.includes('departament') || 
      q.includes('департамент') || 
      q.includes('структура') ||
      (q.includes('الادارات') && q.includes('الثمانية')) ||
      (q.includes('الإدارات') && q.includes('الثمانية'))
    ) {
      if (lang === 'en') {
        return `The 8 Executive Internal Directorates of Mostaqbal Misr Unified Strategic Procurement:
1. Government Contracting Directorate (التعاقدات الحكومية) — Bidding, sovereign tenders, and vendor accreditation.
2. Legal Affairs Directorate (الإدارة القانونية) — International contracts drafting and dispute prevention.
3. Foreign Commercial Directorate (الإدارة التجارية الخارجية) — Global commodity exchanges tracking and negotiations.
4. Financial Directorate (المالية) — Budget allocations, letters of credit (LCs), and supplier payments.
5. Supply Chain Directorate (إدارة سلاسل الإمداد) — Crop flow harmonization connecting New Delta with strategic reserves.
6. Logistics Directorate (إدارة اللوجستيات) — Port operations, immediate discharge, and freight monitoring.
7. Strategic Planning Directorate (إدارة التخطيط) — Strategic gap forecasting and annual consumption mapping.
8. Domestic Trade Directorate (إدارة التجارة الداخلية) — Local market supply stabilization and essential commodity distribution.`;
      } else if (lang === 'pl') {
        return `8 Wewnętrznych Dyrekcji Wykonawczych:
1. Dyrekcja ds. Zamówień Rządowych (Przetargi i rejestracja dostawców)
2. Dyrekcja ds. Prawnych (Umowy międzynarodowe)
3. Dyrekcja ds. Handlu Zagranicznego (Giełdy surowcowe i negocjacje)
4. Dyrekcja Finansowa (Akredytywy i rozliczenia)
5. Dyrekcja ds. Łańcucha Dostaw (Koordynacja z Nową Deltą)
6. Dyrekcja Logistyki (Porty, rozładunek i transport)
7. Dyrekcja ds. Planowania (Prognozy zapotrzebowania państwa)
8. Dyrekcja ds. Handlu Wewnętrznego (Dystrybucja krajowa)`;
      } else if (lang === 'uk') {
        return `8 Внутрішніх Виконавчих Директоратів:
1. Директорат урядових контрактів (Тендери та кваліфікація постачальників)
2. Юридичний директорат (Міжнародні контракти та правовий захист)
3. Директорат зовнішньої торгівлі (Моніторинг бірж та прямі закупівлі)
4. Фінансовий директорат (Акредитиви та фінансові потоки)
5. Директорат ланцюгів постачання (Інтеграція з проектом Нова Дельта)
6. Директорат логістики (Портові операції та перевезення)
7. Директорат стратегічного планування (Прогнозування потреб ринку)
8. Директорат внутрішньої торгівлі (Стабілізація внутрішнього ринку)`;
      } else {
        return `الإدارات التنفيذية الثمانية المعتمدة داخل إدارة الشراء الموحد بجهاز مستقبل مصر:
1. إدارة التعاقدات الحكومية: تنظيم وطرح وإدارة المناقصات الاستراتيجية واعتماد سجل الموردين.
2. الإدارة القانونية: إعداد وصياغة العقود النموذجية الدولية وصون حقوق ومصالح الدولة.
3. الإدارة التجارية الخارجية: رصد البورصات السلعية العالمية والتفاوض المباشر مع كبرى الشركات الدولية.
4. الإدارة المالية: التخطيط المالي وتوفير السيولة والاعتمادات المستندية وحسابات الموردين.
5. إدارة سلاسل الإمداد: تنظيم تدفق المحاصيل والربط المحكم مع إنتاجية الدلتا الجديدة ومجمعات الصناعات.
6. إدارة اللوجستيات: إدارة عمليات الموانئ والتفريغ الفوري وتتبع أساطيل النقل وشبكة الصوامع.
7. إدارة التخطيط: التخطيط الاستراتيجي لاحتياجات البلاد والتنبؤ بالفجوات السلعية ومعدلات الاستهلاك.
8. إدارة التجارة الداخلية: توجيه التدفقات السلعية للأسواق وضبط حركة المعروض واستقرار الأسعار للمواطنين.`;
      }
    }

  return null;
}

// Modular Handler: handleVisionQuery
function handleVisionQuery(q, lang, info, isAr) {
    // 12. Strategic Vision, Cabinet Mandate & Governance
    if (
      q.includes('رؤية') || 
      q.includes('اهداف') || 
      q.includes('أهداف') || 
      q.includes('اختصاص') || 
      q.includes('دور') || 
      q.includes('مجلس الوزراء') || 
      q.includes('وزراء') || 
      q.includes('قرار') || 
      q.includes('قرارات') || 
      q.includes('مين انتو') || 
      q.includes('مين انتم') || 
      q.includes('من انتم') || 
      q.includes('من أنتم') || 
      q.includes('تأسيس') || 
      q.includes('who are you') || 
      q.includes('vision') || 
      q.includes('mandate') || 
      q.includes('mission') || 
      q.includes('wizja') || 
      q.includes('візія') || 
      q.includes('мета')
    ) {
      if (lang === 'en') {
        return `Strategic Vision of Mostaqbal Misr Unified Strategic Procurement Directorate:
Pursuant to presidential directives and Egyptian Cabinet decrees mandating the Future of Egypt Agency (FOE) for unified sovereign strategic procurement:
1. Sovereign Integration: Seamless integration between the mega-agricultural output of the 2.2M-feddan New Delta and strategic global procurement.
2. Long-term Security: Extending national strategic reserves to 6–9 months buffer across all essential food crops.
3. Financial Optimization: Direct bulk contracting and advanced payment terms achieving significant foreign currency savings.
4. Logistics Superiority: Operating automated modern silos and achieving zero port demurrage.`;
      } else if (lang === 'pl') {
        return `Strategiczna Wizja Dyrekcji ds. Zunifikowanych Zakupów Agencji Przyszłość Egiptu:
Zgodnie z decyzjami Rady Ministrów na mocy dekretu Prezydenta:
1. Połączenie potężnej produkcji rolnej Nowej Delty (2.2 mln feddanów) ze strategicznym handlem globalnym.
2. Bezpieczny poziom rezerw strategicznych państwa na 6 do 9 miesięcy.
3. Oszczędności walutowe dzięki bezpośrednim zakupom hurtowym.
4. Nowoczesne silosy cyfrowe i brak kar za opóźnienia w portach.`;
      } else if (lang === 'uk') {
        return `Стратегічна візія Директорату єдиних закупівель Агентства Майбутнє Єгипту:
Відповідно до указів Президента Єгипту та постанов Кабінету Міністрів:
1. Об'єднання агропотенціалу Нової Дельти (2.2 млн feddanów) із прямими світовими закупівлями.
2. Гарантування державних запасів продовольства на безпечні 6–9 місяців.
3. Оптимізація валютних витрат завдяки масштабним прямим контрактам.
4. Цифрові елеватори та швидка портова логістика без демереджу.`;
      } else {
        return `الرؤية الاستراتيجية لإدارة الشراء الموحد بجهاز مستقبل مصر للتنمية المستدامة:
إعمالاً للتوجيهات الرئاسية وقرارات مجلس الوزراء بإنابة الجهاز في إدارة الشراء الموحد للسلع الاستراتيجية والحبوب:
1. التكامل السيادي المباشر بين الإنتاج الزراعي والصناعي بمشروع الدلتا الجديدة (2.2 مليون فدان) والشراء المباشر الذكي.
2. بناء مخزون استراتيجي آمن يغطي من 6 إلى 9 أشهر من القمح والزيوت والذرة والسكر.
3. تحقيق وفورات دولارية نوعية عبر الشراء بالكميات المجمعة والاستفادة من تقلبات البورصات السلعية العالمية.
4. إدارة سلاسل الإمداد اللوجستية وشبكة الصوامع الرقمية الذكية والتفريغ الفوري بالموانئ دون غرامات تأخير.`;
      }
    }

  return null;
}

// Modular Handler: handleGreetingQuery
function handleGreetingQuery(q, lang, info, isAr) {
    // 13. Polite Greetings & Courtesy
    if (
      q.includes('سلام') || 
      q.includes('السلام عليكم') || 
      q.includes('صباح') || 
      q.includes('مساء') || 
      q.includes('شكرا') || 
      q.includes('شكراً') || 
      q.includes('أهلا') || 
      q.includes('اهلا') || 
      q.includes('مرحبا') || 
      q.includes('ازيك') || 
      q.includes('عامل ايه') || 
      q.includes('hello') || 
      q.includes('hi') || 
      q.includes('good morning') || 
      q.includes('good evening') || 
      q.includes('thank') || 
      q.includes('thanks') || 
      q.includes('dzień dobry') || 
      q.includes('dziękuj') || 
      q.includes('привіт') || 
      q.includes('дякую')
    ) {
      if (lang === 'en') {
        return `Welcome to the Unified Strategic Procurement Directorate of Future of Egypt Agency (FOE).
I am at your service to assist you with:
• Official working hours and headquarters location (Tucano Mall).
• Weekly procurement committees schedule (Rice on Sundays, Cattle on Tuesdays, Shrimp on Mondays).
• National strategic commodity reserves coverage.
• Supplier registration guidelines and tender procedures.
How can I assist you today?`;
      } else if (lang === 'pl') {
        return `Witamy w Dyrekcji ds. Zunifikowanych Zakupów Agencji Przyszłość Egiptu.
Służę pomocą w zakresie:
• Oficjalnych godzin pracy i siedziby (Tucano Mall).
• Harmonogramu cotygodniowych komisji przetargowych.
• Stanu rezerw strategicznych kraju.
• Rejestracji dostawców i udziału w przetargach.
W czym mogę dziś pomóc?`;
      } else if (lang === 'uk') {
        return `Ласкаво просимо до Директорату єдиних закупівель Агентства Майбутнє Єгипту.
Я готовий допомогти вам у таких питаннях:
• Години роботи та розташування штаб-квартири (Tucano Mall).
• Графік щотижневих закупівельних комісій.
• Стан стратегічних державних запасів.
• Процедури акредитації постачальників та тендери.
Чим можу бути корисним?`;
      } else {
        return `أهلاً وسهلاً بك في إدارة الشراء الموحد بجهاز مستقبل مصر للتنمية المستدامة.
أنا في خدمتك لتقديم كافة البيانات المعتمدة حول:
• مواعيد وساعات العمل الرسمية ومقر الإدارة (توكانو مول).
• جدول لجان البت والتوريد الأسبوعية (الأرز كل أحد، والرؤوس الحية كل ثلاثاء، والجمبري كل اثنين).
• مؤشرات المخزون الاستراتيجي والأرصدة التموينية.
• شروط التسجيل في سجل الموردين والمناقصات.
كيف يمكنني مساعدتك اليوم؟`;
      }
    }

  return null;
}

// Modular Handler: handleFallbackResponse
function handleFallbackResponse(lang, info, isAr) {
    // 14. Fallback Default Response
    if (lang === 'en') {
      return `Welcome to Mostaqbal Misr Unified Strategic Procurement Directorate.
We lead sovereign commodity procurement, national strategic reserves, and weekly procurement committees (Rice on Sundays, Cattle on Tuesdays, Shrimp on Mondays at 02:00 PM).
• Main HQ: Tucano Commercial Complex — Floor 3 — Yousef Abbas St. — Nasr City — Cairo.
• Direct Hotline: 19842 | Email: procurement@foe.gov.eg
• Working Hours: Sunday to Thursday (09:00 AM – 05:00 PM).
You can inquire about committees, strategic reserves, quality standards, or supplier registration.`;
    } else if (lang === 'pl') {
      return `Witamy w Dyrekcji ds. Zunifikowanych Zakupów Agencji Przyszłość Egiptu.
Prowadzimy zunifikowane zakupy strategiczne, rezerwy państwowe oraz cotygodniowe posiedzenia komisji przetargowych.
• Siedziba: Tucano Mall — 3. piętro — ul. Yousef Abbas — Nasr City — Kair.
• Infolinia: +20 19842 | E-mail: procurement@foe.gov.eg
• Godziny pracy: Niedziela – Czwartek (09:00 – 17:00).
Możesz zapytać o harmonogram komisji, rezerwy lub rejestrację dostawców.`;
    } else if (lang === 'uk') {
      return `Ласкаво просимо до Директорату єдиних закупівель Агентства Майбутнє Єгипту.
Ми керуємо державними стратегічними закупівлями, резервами базових культур та щотижневими комісіями.
• Штаб-квартира: Tucano Mall — 3-й поверх — вул. Юсефа Аббаса — Наср-Сіті — Каїр.
• Гаряча лінія: +20 19842 | Email: procurement@foe.gov.eg
• Години роботи: Неділя – Четвер (09:00 – 17:00).
Ви можете дізнатися про графік комісій, обсяги резервів або умови реєстрації постачальників.`;
    } else {
      return `أهلاً بكم في إدارة الشراء الموحد بجهاز مستقبل مصر للتنمية المستدامة.
تتولى الإدارة التعاقدات السيادية وبناء المخزون الاستراتيجي للدولة وجلسات اللجان الأسبوعية (الأرز كل أحد، والرؤوس الحية كل ثلاثاء، والجمبري كل اثنين في تمام الساعة 02:00 ظهراً).
• المقر الرئيسي: توكانو مول — الدور الثالث — شارع يوسف عباس — مدينة نصر — القاهرة.
• الخط الساخن: 19842 | البريد الرسمي: procurement@foe.gov.eg
• مواعيد الدوام: من الأحد إلى الخميس (09:00 صباحاً – 05:00 مساءً).
يمكنك السؤال عن: جدول اللجان، مؤشرات المخزون، سجل الموردين، أو معايير الجودة والصوامع.`;
    }
}

  // Modular intent router calling dedicated query handlers
  const generateAnswer = (query) => {
    const q = query.toLowerCase();

    // Priority order: Specific inquiries (Committees, Location, Hours) tested before generic fallbacks
    return (
      handleCommitteesQuery(q, lang, info, isAr) ||
      handleLocationQuery(q, lang, info, isAr) ||
      handleWorkingHoursQuery(q, lang, info, isAr) ||
      handleContactQuery(q, lang, info, isAr) ||
      handleSocialQuery(q, lang, info, isAr) ||
      handleTendersQuery(q, lang, info, isAr) ||
      handleReservesQuery(q, lang, info, isAr) ||
      handleQualityQuery(q, lang, info, isAr) ||
      handleStorageQuery(q, lang, info, isAr) ||
      handleDirectoratesQuery(q, lang, info, isAr) ||
      handlePillarsQuery(q, lang, info, isAr) ||
      handleVisionQuery(q, lang, info, isAr) ||
      handleGreetingQuery(q, lang, info, isAr) ||
      handleFallbackResponse(lang, info, isAr)
    );
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = generateAnswer(text);
      let botResponse;

      if (typeof answer === 'object' && answer.type) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          type: answer.type,
          text: answer.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 400);
  };

  const activePrompts = quickPrompts[lang] || quickPrompts.ar;

  return (
    <>
      {/* Floating Bot Button - CIRCLE with Official Mostaqbal Misr Logo Emblem & Colors */}
      <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 ${isOpen ? 'hidden' : 'block'}`}>
        {/* Outer glowing pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 opacity-70 blur-sm animate-pulse pointer-events-none"></span>

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label="Mostaqbal Misr AI Assistant"
          className="relative w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-slate-950 border-2 border-amber-400 shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/70 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center p-1.5 cursor-pointer group overflow-hidden"
        >
          {/* Inner Golden Radial Sheen */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-emerald-500/10 rounded-full pointer-events-none"></div>

          {/* Official Emblem of Mostaqbal Misr */}
          <img 
            src="/assets/foe-emblem-official.png" 
            alt="شعار جهاز مستقبل مصر" 
            className="w-full h-full object-contain filter drop-shadow group-hover:rotate-6 transition-transform duration-300"
          />
        </button>
      </div>

      {/* Dimmed backdrop when expanded to center of page */}
      {isOpen && isExpanded && (
        <div 
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 transition-opacity duration-300 animate-fadeIn"
          aria-hidden="true"
        />
      )}

      {/* Floating or Centered Dynamic Chat Window with 3 Size Modes */}
      {isOpen && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-label={isAr ? "المساعد الذكي لبوابة الشراء الموحد" : "Smart Procurement Assistant"} 
          className={`fixed z-50 border shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-300 ease-out animate-fadeIn ${
            isExpanded
              ? 'inset-2 sm:inset-6 md:inset-8 lg:inset-10 max-w-4xl w-auto h-[calc(100dvh-16px)] sm:h-[84vh] max-h-[800px] m-auto rounded-2xl sm:rounded-3xl shadow-2xl'
              : 'bottom-3 sm:bottom-5 left-2 right-2 sm:left-auto sm:right-6 w-auto sm:w-[450px] max-w-[calc(100vw-20px)] h-[calc(100dvh-28px)] sm:h-[590px] max-h-[88dvh] sm:max-h-[82vh] rounded-2xl sm:rounded-3xl shadow-2xl'
          } ${
            theme === 'dark' 
              ? 'bg-slate-950/95 border-amber-500/30 text-slate-100 shadow-black/80' 
              : 'bg-white/95 border-amber-400/40 text-slate-900 shadow-2xl'
          }`}
        >
          
          {/* Streamlined Sovereign Header */}
          <div className="p-3 sm:p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-500/15 via-transparent to-amber-500/5 gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-950 border border-amber-400/80 p-1 flex items-center justify-center shadow-md">
                  <img 
                    src="/assets/foe-emblem-official.png" 
                    alt="شعار الجهاز" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse"></span>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight truncate">
                    {isAr ? 'المساعد الذكي للشراء الموحد' : 'Unified Procurement AI'}
                  </h3>
                </div>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 mt-0.5 leading-none truncate">
                  <span>{isAr ? 'جهاز مستقبل مصر (FOE)' : 'Future of Egypt Agency'}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-emerald-500 font-bold">{isAr ? 'متصل الآن' : 'Online'}</span>
                </span>
              </div>
            </div>

            {/* Header Controls: Maximize & Actions */}
            <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
              {/* Reset Conversation */}
              <button
                onClick={handleResetChat}
                type="button"
                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={isAr ? 'بدء محادثة جديدة' : 'Restart Chat'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Maximize / Restore Toggle (as in the past) */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                type="button"
                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={isAr ? (isExpanded ? 'استعادة الحجم العادي' : 'تكبير وتوسيط النافذة') : (isExpanded ? 'Restore Normal Size' : 'Maximize Window')}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              {/* Close */}
              <button
                onClick={() => { setIsOpen(false); setIsExpanded(false); }}
                type="button"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={isAr ? 'إغلاق' : 'Close'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className={`flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm chat-scroll ${
            theme === 'dark' ? 'bg-slate-950/70' : 'bg-slate-50/70'
          }`}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} group`}
              >
                <div
                  className={`p-3 sm:p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed relative ${
                    msg.sender === 'user'
                      ? (isExpanded ? 'max-w-[70%]' : 'max-w-[85%]') + ' bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold rounded-br-xs shadow-md shadow-amber-500/20 whitespace-pre-line'
                      : (isExpanded ? 'max-w-[80%]' : 'max-w-[90%]') + (theme === 'dark' 
                          ? ' bg-slate-900/90 border border-amber-500/20 text-slate-100 rounded-bl-xs font-medium shadow-sm shadow-black/40' 
                          : ' bg-white border border-amber-400/30 text-slate-900 rounded-bl-xs font-medium shadow-sm')
                  }`}
                >
                  {/* Bot Message Header Pill & Copy Button */}
                  {msg.sender === 'bot' && (
                    <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-200/60 dark:border-slate-800 text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>{isAr ? 'رد المساعد الذكي المعتمد' : 'Official AI Response'}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        type="button"
                        className="p-1 rounded hover:bg-amber-500/10 text-slate-400 hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-1"
                        title={isAr ? 'نسخ النص' : 'Copy'}
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-500 text-[9px]">{isAr ? 'تم النسخ' : 'Copied'}</span>
                          </>
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  )}

                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Render Visual Location Card with Direct 1-Click Google Maps Button */}
                  {msg.type === 'location' && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                      <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-start justify-between gap-3 shadow-xs">
                        <div className="flex items-start gap-2.5">
                          <div className="p-2 rounded-lg bg-amber-500 text-slate-950 font-bold flex-shrink-0 shadow-sm mt-0.5">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                              <span>{isAr ? 'مجمع توكانو التجاري (Tucano Mall)' : 'Tucano Commercial Complex'}</span>
                              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300">
                                {isAr ? 'الدور 3' : 'Floor 3'}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                              {isAr 
                                ? 'شارع يوسف عباس — مدينة نصر — القاهرة (قاعة اللجان المركزية وإدارة الشراء الموحد)' 
                                : 'Yousef Abbas St. — Nasr City — Cairo (Central Committees Hall)'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Direct 1-Click Google Maps Button */}
                      <a
                        href="https://www.google.com/maps/place/Tucano+Commercial+Complex/@30.0608796,31.3200135,17z/data=!3m1!4b1!4m6!3m5!1s0x14583f5f7da2e537:0x71310f58dac3832f!8m2!3d30.060875!4d31.3225884!16s%2Fg%2F11ry5fvchh"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{isAr ? 'فتح موقع توكانو مول على خرائط Google ↗' : 'Open Location in Google Maps ↗'}</span>
                      </a>
                    </div>
                  )}

                  {/* Render Visual Committees Schedule Cards with Lucide Icons */}
                  {msg.type === 'committees' && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                      <div className="flex items-center gap-2 pb-1 text-xs font-bold text-slate-900 dark:text-white">
                        <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span>{isAr ? 'جدول ومواعيد لجان البت والتوريد المعتمدة:' : 'Official Procurement Committees Schedule:'}</span>
                      </div>

                      <div className={`grid ${isExpanded ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1'} gap-2`}>
                        {/* Sunday Rice */}
                        <div className="p-2.5 sm:p-3 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-xs text-amber-700 dark:text-amber-400">
                            <Wheat className="w-4 h-4 text-amber-500 flex-shrink-0" />
                            <span>{isAr ? '1. لجنة الأرز (كل أحد)' : '1. Rice Committee (Sundays)'}</span>
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-500 flex-shrink-0" />
                              <span>{isAr ? 'أسبوعياً — 02:00 ظهراً' : 'Weekly — 02:00 PM'}</span>
                            </div>
                            <div className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 font-bold text-[10px] text-amber-800 dark:text-amber-300">
                              {isAr ? `تاريخ الجلسة القادمة: ${getNextSessionDisplay('sunday-rice', lang)}` : `Next Session: ${getNextSessionDisplay('sunday-rice', lang)}`}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                              {isAr ? 'الأولوية بأسبقية التواجد الفعلي بالقاعة.' : 'Adjudication by physical sign-in order.'}
                            </div>
                          </div>
                        </div>

                        {/* Tuesday Live Cattle */}
                        <div className="p-2.5 sm:p-3 rounded-xl border border-rose-500/30 bg-rose-500/5 space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-xs text-rose-700 dark:text-rose-400">
                            <Award className="w-4 h-4 text-rose-500 flex-shrink-0" />
                            <span>{isAr ? '2. لجنة الرؤوس الحية (الثلاثاء)' : '2. Live Cattle Committee (Tue)'}</span>
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-rose-500 flex-shrink-0" />
                              <span>{isAr ? 'دورية تبادلية — 02:00 ظهراً' : 'Bi-weekly — 02:00 PM'}</span>
                            </div>
                            <div className="px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30 font-bold text-[10px] text-rose-800 dark:text-rose-300">
                              {isAr ? `تاريخ الجلسة القادمة: ${getNextSessionDisplay('tuesday-cattle', lang)}` : `Next Session: ${getNextSessionDisplay('tuesday-cattle', lang)}`}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                              {isAr ? 'بالتبادل الأسبوعي مع لجنة الجمبري.' : 'Alternating weekly with Shrimp.'}
                            </div>
                          </div>
                        </div>

                        {/* Monday Shrimp */}
                        <div className="p-2.5 sm:p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-700 dark:text-emerald-400">
                            <Fish className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            <span>{isAr ? '3. لجنة الجمبري (الاثنين)' : '3. Shrimp Committee (Mondays)'}</span>
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                              <span>{isAr ? 'دورية تبادلية — 02:00 ظهراً' : 'Bi-weekly — 02:00 PM'}</span>
                            </div>
                            <div className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 font-bold text-[10px] text-emerald-800 dark:text-emerald-300">
                              {isAr ? `تاريخ الجلسة القادمة: ${getNextSessionDisplay('monday-shrimp', lang)}` : `Next Session: ${getNextSessionDisplay('monday-shrimp', lang)}`}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                              {isAr ? 'بالتبادل الأسبوعي مع لجنة الرؤوس الحية.' : 'Alternating weekly with Cattle.'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Requirements & Venue Box */}
                      <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/60 space-y-1 text-[11px]">
                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                          <span>{isAr ? 'المستندات المطلوبة: الأوراق القانونية السارية والتفويض المعتمد.' : 'Required: Valid statutory docs and official authorization.'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                          <span>{isAr ? 'المقر: توكانو مول - الدور الثالث - شارع يوسف عباس - مدينة نصر (قاعة اللجان المركزية).' : 'Venue: Tucano Mall, Floor 3, Yousef Abbas St., Nasr City (Central Sessions Hall).'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Interactive Quick Action Chips inside the Initial Welcome Message */}
                  {msg.id === 1 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-800 space-y-2">
                      <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>{isAr ? 'خدمات الاستعلام الفوري (اضغط للسؤال):' : 'Instant Inquiries (Click to ask):'}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {[
                          { text: isAr ? 'ما هي مواعيد اللجان (الأرز، الرؤوس الحية، والجمبري)؟' : 'Committees Schedule', label: isAr ? 'مواعيد وتواريخ اللجان المعتمدة' : 'Committees Schedule', icon: Calendar },
                          { text: isAr ? 'أين يقع المقر الرئيسي للإدارة؟' : 'Location of Tucano Mall', label: isAr ? 'موقع المقر وقاعة اللجان بتوكانو مول' : 'Headquarters & Central Hall', icon: MapPin },
                          { text: isAr ? 'ما هي مواعيد وساعات العمل الرسمية؟' : 'Official Working Hours', label: isAr ? 'ساعات ومواعيد الدوام الرسمي' : 'Official Working Hours', icon: Clock },
                          { text: isAr ? 'ما هو رقم الخط الساخن وقنوات التواصل؟' : 'Direct Hotline 19842', label: isAr ? 'الخط الساخن الموحد (19842)' : 'Official Hotline 19842', icon: PhoneCall },
                        ].map((item, qIdx) => {
                          const ItemIcon = item.icon;
                          return (
                            <button
                              key={qIdx}
                              onClick={() => handleSendMessage(item.text)}
                              type="button"
                              className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-between text-right ${
                                theme === 'dark'
                                  ? 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-amber-500/60 hover:bg-amber-500/10 hover:text-amber-300'
                                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-950 shadow-2xs'
                              }`}
                            >
                              <span className="flex items-center gap-1.5">
                                <ItemIcon className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                                <span>{item.label}</span>
                              </span>
                              <span className="text-amber-500 text-xs">←</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Official Channels Micro-Strip inside Welcome Message */}
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                        <span className="font-semibold">{isAr ? 'القنوات الرسمية المعتمدة:' : 'Official Channels:'}</span>
                        <div className="flex items-center gap-1.5">
                          <a href={info.facebookUrl} target="_blank" rel="noreferrer" className="w-5 h-5 rounded-md bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white flex items-center justify-center transition-colors">
                            <FacebookIcon className="w-3 h-3" />
                          </a>
                          <a href={info.linkedinUrl} target="_blank" rel="noreferrer" className="w-5 h-5 rounded-md bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white flex items-center justify-center transition-colors">
                            <LinkedInIcon className="w-3 h-3" />
                          </a>
                          <a href={info.twitterUrl} target="_blank" rel="noreferrer" className="w-5 h-5 rounded-md bg-slate-500/10 hover:bg-slate-900 text-slate-600 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 flex items-center justify-center transition-colors">
                            <XTwitterIcon className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-400 mt-0.5 px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 w-16 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills - Streamlined horizontal bar with ZERO visible scrollbar */}
          <div className="px-3 sm:px-4 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-950/95 relative">
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
              <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 flex items-center gap-1 flex-shrink-0">
                <Sparkles className="w-3 h-3 flex-shrink-0 text-amber-500" />
                <span>{isAr ? 'أسئلة مقترحة:' : 'Quick:'}</span>
              </span>
              {activePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  type="button"
                  className={`whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all flex-shrink-0 cursor-pointer shadow-2xs hover:scale-105 active:scale-95 ${
                    theme === 'dark'
                      ? 'bg-slate-900 border-slate-700/80 text-slate-200 hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-300'
                      : 'bg-white border-amber-500/30 text-slate-800 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-950'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Modern Capsule Input Box */}
          <div className="p-2.5 sm:p-3 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-2xl px-3 py-1.5 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all shadow-inner">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isAr ? 'اسأل عن مواعيد اللجان، السلع، الروابط...' : 'Ask about committees, commodities, links...'}
                className="flex-1 bg-transparent border-0 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none py-1"
              />

              {inputValue.trim() && (
                <button
                  type="button"
                  onClick={() => setInputValue('')}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded cursor-pointer"
                  title={isAr ? 'مسح النص' : 'Clear text'}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="w-8 h-8 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-bold transition-all shadow-sm flex items-center justify-center cursor-pointer flex-shrink-0 hover:scale-105 active:scale-95"
                title={isAr ? 'إرسال الرسالة' : 'Send Message'}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
