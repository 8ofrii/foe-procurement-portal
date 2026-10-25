import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
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
  Building2,
  Maximize2,
  Minimize2,
  Award
} from 'lucide-react';
import { PORTAL_INFO } from '../data/portalData';
import { FacebookIcon, LinkedInIcon, XTwitterIcon } from './SocialIcons';

export default function ChatBot({ lang, theme }) {
  const isAr = lang === 'ar';
  const info = PORTAL_INFO[lang] || PORTAL_INFO.ar;
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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

// Modular Handler: handleContactQuery
function handleContactQuery(q, lang, info, isAr) {
    // 1. Contact, Hotline, Phone & Official Emails
    if (
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
      q.includes('رقم') || 
      q.includes('phone') || 
      q.includes('hotline') || 
      q.includes('call') || 
      q.includes('contact') || 
      q.includes('email') || 
      q.includes('mail') || 
      q.includes('infolinia') || 
      q.includes('телефон') || 
      q.includes('гаряча лінія')
    ) {
      if (lang === 'en') {
        return `Official Contact Channels of Mostaqbal Misr Unified Strategic Procurement Directorate:
• Unified Direct Hotline: 19842 (Available during working hours).
• Official Procurement Email: procurement@foe.gov.eg
• General Inquiries Email: info@foe.gov.eg
• Main HQ: Tucano Commercial Complex — Floor 3 — Yousef Abbas St. — Nasr City — Cairo.
• Working Hours: Sunday through Thursday (09:00 AM – 05:00 PM).`;
      } else if (lang === 'pl') {
        return `Oficjalne Dane Kontaktowe Dyrekcji ds. Zakupów Agencji Przyszłość Egiptu:
• Główna Infolinia: +20 19842
• Oficjalny E-mail ds. Zakupów: procurement@foe.gov.eg
• E-mail ogólny: info@foe.gov.eg
• Adres: Tucano Commercial Complex — 3. piętro — ul. Yousef Abbas — Nasr City — Kair.
• Godziny urzędowania: Niedziela – Czwartek (09:00 – 17:00).`;
      } else if (lang === 'uk') {
        return `Офіційні контакти Директорату єдиних закупівель Агентства Майбутнє Єгипту:
• Єдина гаряча лінія: +20 19842
• Офіційний email із закупівель: procurement@foe.gov.eg
• Загальний email: info@foe.gov.eg
• Адреса: Tucano Commercial Complex — 3-й поверх — вул. Юсефа Аббаса — Наср-Сіті — Каїр.
• Години роботи: Неділя – Четвер (09:00 – 17:00).`;
      } else {
        return `قنوات التواصل الرسمية لإدارة الشراء الموحد بجهاز مستقبل مصر للتنمية المستدامة:
• الخط الساخن الموحد: 19842 (متاح خلال أوقات العمل الرسمية).
• البريد الإلكتروني الرسمي لإدارة المشتريات والتعاقدات: procurement@foe.gov.eg
• البريد الإلكتروني العام للاستفسارات: info@foe.gov.eg
• المقر الرئيسي: توكانو مول التجاري — الدور الثالث — شارع يوسف عباس — مدينة نصر — القاهرة.
• مواعيد استقبال الاتصالات والزيارات: من الأحد إلى الخميس (من 09:00 صباحاً حتى 05:00 مساءً).`;
      }
    }

  return null;
}

// Modular Handler: handleLocationQuery
function handleLocationQuery(q, lang, info, isAr) {
    // 2. Location, Address & Google Maps (Prioritized before generic departments)
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
      if (lang === 'en') {
        return `Official Main Headquarters of Mostaqbal Misr Unified Strategic Procurement Directorate:
• Location: Tucano Commercial Complex — Floor 3 — Yousef Abbas St. — Nasr City — Cairo.
• Google Maps: https://www.google.com/maps/place/Tucano+Commercial+Complex/@30.0608796,31.3200135,17z/data=!3m1!4b1!4m6!3m5!1s0x14583f5f7da2e537:0x71310f58dac3832f!8m2!3d30.060875!4d31.3225884!16s%2Fg%2F11ry5fvchh
• Direct Hotline: 19842
• Email: procurement@foe.gov.eg
• Working Hours: Sunday through Thursday (09:00 AM – 05:00 PM).`;
      } else if (lang === 'pl') {
        return `Oficjalna Główna Siedziba Dyrekcji ds. Zakupów:
• Adres: Tucano Commercial Complex — 3. piętro — ul. Yousef Abbas — Nasr City — Kair.
• Google Maps: https://www.google.com/maps/place/Tucano+Commercial+Complex/@30.0608796,31.3200135,17z/data=!3m1!4b1!4m6!3m5!1s0x14583f5f7da2e537:0x71310f58dac3832f!8m2!3d30.060875!4d31.3225884!16s%2Fg%2F11ry5fvchh
• Infolinia: +20 19842 | E-mail: procurement@foe.gov.eg
• Godziny pracy: Niedziela – Czwartek (09:00 – 17:00).`;
      } else if (lang === 'uk') {
        return `Офіційний головний офіс Директорату закупівель:
• Адреса: Tucano Commercial Complex — 3-й поверх — вул. Юсефа Аббаса — Наср-Сіті — Каїр.
• Google Maps: https://www.google.com/maps/place/Tucano+Commercial+Complex/@30.0608796,31.3200135,17z/data=!3m1!4b1!4m6!3m5!1s0x14583f5f7da2e537:0x71310f58dac3832f!8m2!3d30.060875!4d31.3225884!16s%2Fg%2F11ry5fvchh
• Гаряча лінія: +20 19842 | Email: procurement@foe.gov.eg
• Години роботи: Неділя – Четвер (09:00 – 17:00).`;
      } else {
        return `المقر الرسمي الرئيسي لإدارة الشراء الموحد بجهاز مستقبل مصر للتنمية المستدامة:
• العنوان: توكانو مول التجاري — الدور الثالث — شارع يوسف عباس — مدينة نصر — القاهرة.
• رابط خرائط Google: https://www.google.com/maps/place/Tucano+Commercial+Complex/@30.0608796,31.3200135,17z/data=!3m1!4b1!4m6!3m5!1s0x14583f5f7da2e537:0x71310f58dac3832f!8m2!3d30.060875!4d31.3225884!16s%2Fg%2F11ry5fvchh
• الخط الساخن: 19842
• البريد الرسمي: procurement@foe.gov.eg
• أوقات استقبال الموردين والمراجعين: من الأحد إلى الخميس (09:00 صباحاً – 05:00 مساءً).`;
      }
    }

  return null;
}

// Modular Handler: handleWorkingHoursQuery
function handleWorkingHoursQuery(q, lang, info, isAr) {
    // 3. Working Hours & Operation Schedule
    if (
      q.includes('ساعات العمل') || 
      q.includes('مواعيد العمل') || 
      q.includes('أوقات العمل') || 
      q.includes('وقت العمل') || 
      q.includes('ساعات') || 
      q.includes('مواعيد') || 
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
      q.includes('графік')
    ) {
      if (lang === 'en') {
        return `Official Working Hours of Mostaqbal Misr Unified Strategic Procurement Directorate:
• Working Days: Sunday through Thursday weekly.
• Operational Hours: 09:00 AM to 05:00 PM (9 to 5).
• Official Weekend: Friday & Saturday.
• Procurement & Bidding Committees: Kick off at 02:00 PM in the Central Bidding Hall.
Venue: Tucano Mall — Floor 3 — Yousef Abbas St. — Nasr City — Cairo.`;
      } else if (lang === 'pl') {
        return `Oficjalne Godziny Pracy Dyrekcji ds. Zakupów:
• Dni robocze: Od niedzieli do czwartku.
• Godziny: 09:00 – 17:00 (od 9 do 17).
• Weekend: Piątek i sobota.
• Rozpoczęcie posiedzeń komisji przetargowych: Godzina 14:00.
Siedziba: Tucano Mall — 3. piętro — Nasr City — Kair.`;
      } else if (lang === 'uk') {
        return `Офіційні години роботи Директорату закупівель:
• Робочі дні: З неділі по четвер щотижня.
• Години роботи: 09:00 – 17:00 (з 9 до 17).
• Вихідні дні: П'ятниця та субота.
• Засідання комісій із закупівель: Початок о 14:00 у центральній залі торгів.
Штаб-квартира: Tucano Mall — 3-й поверх — Наср-Сіті — Каїр.`;
      } else {
        return `مواعيد وساعات العمل الرسمية لإدارة الشراء الموحد بجهاز مستقبل مصر:
• أيام العمل الرسمية: من الأحد إلى الخميس أسبوعياً (يومياً عدا الجمعة والسبت).
• ساعات الدوام الرسمي: من الساعة 09:00 صباحاً حتى 05:00 مساءً (من 9 إلى 5).
• العطلة الأسبوعية: يومي الجمعة والسبت.
• جلسات لجان البت والتوريد: تبدأ في تمام الساعة 02:00 ظهراً بالقاعة المركزية.
المقر: توكانو مول — الدور الثالث — شارع يوسف عباس — مدينة نصر — القاهرة.`;
      }
    }

  return null;
}

// Modular Handler: handleCommitteesQuery
function handleCommitteesQuery(q, lang, info, isAr) {
    // 4. Weekly Committees Query (Sunday Rice, Tuesday Live Cattle, Monday Shrimp)
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
      q.includes('الأحد') || 
      q.includes('الاحد') || 
      q.includes('الاثنين') || 
      q.includes('الإثنين') || 
      q.includes('الثلاثاء') || 
      q.includes('بت وتوريد') || 
      q.includes('جلسات') || 
      q.includes('جلسة') || 
      q.includes('committee') || 
      q.includes('komisj') || 
      q.includes('rice') || 
      q.includes('shrimp') || 
      q.includes('cattle')
    ) {
      return {
        type: 'committees',
        text: isAr 
          ? `جدول ومواعيد لجان البت والتوريد المعتمدة (بمقر إدارة الشراء الموحد):`
          : `Official Procurement Committees Schedule:`
      };
    }

  return null;
}

// Modular Handler: handleSocialQuery
function handleSocialQuery(q, lang, info, isAr) {
    // 5. Social Media & Official Channels Query
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

// Modular Handler: handleReservesQuery
function handleReservesQuery(q, lang, info, isAr) {
    // 6. Strategic Reserves & Commodity Buffers
    if (
      q.includes('مخزون') || 
      q.includes('احتياطي') || 
      q.includes('ارصدة') || 
      q.includes('أرصدة') || 
      q.includes('رصيد') || 
      q.includes('سلع استراتيجية') || 
      q.includes('سلع أساسية') || 
      q.includes('قمح') || 
      q.includes('زيوت') || 
      q.includes('سكر') || 
      q.includes('ذرة') || 
      q.includes('كم يغطي') || 
      q.includes('reserve') || 
      q.includes('stock') || 
      q.includes('buffer') || 
      q.includes('wheat') || 
      q.includes('rezerw') || 
      q.includes('резерв')
    ) {
      if (lang === 'en') {
        return `National Strategic Reserves Buffer managed by Mostaqbal Misr:
• Milling Wheat: 7.8 months safe buffer (5.8 Million Metric Tons).
• Vegetable Oils: 6.9 months reserve (1.4 Million Metric Tons).
• Sugar: 8.2 months self-sufficiency supported by New Delta refineries.
• Yellow Corn: 6.2 months reserve supporting feedmills and livestock.
All reserves undergo automated digital monitoring across modern silos nationwide.`;
      } else if (lang === 'pl') {
        return `Poziom Państwowych Rezerw Strategicznych:
• Pszenica konsumpcyjna: 7.8 miesięcy (5.8 mln ton metrycznych).
• Oleje roślinne: 6.9 miesięcy (1.4 mln ton metrycznych).
• Cukier: 8.2 miesięcy samowystarczalności.
• Kukurydza żółta: 6.2 miesięcy.`;
      } else if (lang === 'uk') {
        return `Рівень стратегічних резервів держави:
• Пшениця борошномельна: 7.8 місяців (5.8 млн метричних тонн).
• Рослинні олії: 6.9 місяців (1.4 млн метричних тонн).
• Цукор: 8.2 місяців завдяки переробним потужностям Нової Дельти.
• Кукурудза жовта: 6.2 місяців.`;
      } else {
        return `مؤشرات أرصدة السلع والمخزون الاستراتيجي لجهاز مستقبل مصر:
• القمح الطاحن: يغطي 7.8 أشهر (بإجمالي 5.8 مليون طن لتأمين الخبز المدعم).
• الزيوت النباتية: تغطي 6.9 أشهر (بإجمالي 1.4 مليون طن من زيوت الصويا وعباد الشمس).
• السكر التمويني والحر: يغطي 8.2 أشهر (طفرة اكتفاء مدعومة بمجمعات السكر بالدلتا الجديدة).
• الذرة الصفراء: تغطي 6.2 أشهر لدعم الثروة الحيوانية وصناعة الأعلاف.
تتم المتابعة اللحظية للأرصدة عبر منظومة رقمية متصلة بكافة الصوامع الاستراتيجية.`;
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

    return (
      handleContactQuery(q, lang, info, isAr) ||
      handleLocationQuery(q, lang, info, isAr) ||
      handleWorkingHoursQuery(q, lang, info, isAr) ||
      handleCommitteesQuery(q, lang, info, isAr) ||
      handleSocialQuery(q, lang, info, isAr) ||
      handleReservesQuery(q, lang, info, isAr) ||
      handlePillarsQuery(q, lang, info, isAr) ||
      handleTendersQuery(q, lang, info, isAr) ||
      handleQualityQuery(q, lang, info, isAr) ||
      handleStorageQuery(q, lang, info, isAr) ||
      handleDirectoratesQuery(q, lang, info, isAr) ||
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
          className="relative w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-slate-950 border-2 border-amber-400 shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/70 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center p-1.5 cursor-pointer group overflow-hidden"
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

      {/* Floating or Centered Expanded Chat Window */}
      {isOpen && (
        <div role="dialog" aria-modal="true" aria-label={isAr ? "المساعد الذكي لبوابة الشراء الموحد" : "Smart Procurement Assistant"} className={`fixed z-50 border shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-300 ease-out animate-fadeIn ${
          isExpanded
            ? 'inset-2 sm:inset-6 md:inset-10 lg:inset-14 max-w-5xl h-[calc(100dvh-16px)] sm:h-auto max-h-[94dvh] sm:max-h-[90vh] m-auto rounded-2xl sm:rounded-3xl'
            : 'bottom-2 sm:bottom-24 left-2 right-2 sm:left-auto sm:right-6 w-auto sm:w-[440px] max-w-[calc(100vw-16px)] sm:max-w-[calc(100vw-24px)] h-[calc(100dvh-20px)] sm:h-[540px] max-h-[88dvh] sm:max-h-[82vh] rounded-2xl sm:rounded-3xl'
        } ${
          theme === 'dark' 
            ? 'bg-slate-950/95 border-amber-500/30 text-slate-100 shadow-black/80' 
            : 'bg-white/95 border-amber-400/40 text-slate-900 shadow-2xl'
        }`}>
          
          {/* Header */}
          <div className="p-2.5 sm:p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-500/15 via-transparent to-amber-500/5">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-950 border border-amber-400/80 p-1 flex items-center justify-center shadow-md flex-shrink-0">
                <img 
                  src="/assets/foe-emblem-official.png" 
                  alt="شعار الجهاز" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight whitespace-nowrap">
                    {isAr ? 'المساعد الذكي للشراء الموحد' : 'Unified Procurement AI Assistant'}
                  </h3>
                  {isExpanded && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 hidden sm:inline-block">
                      {isAr ? 'نافذة موسعة' : 'Expanded'}
                    </span>
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 mt-0.5 leading-none whitespace-nowrap">
                  <span>{isAr ? 'إدارة الشراء الموحد — جهاز مستقبل مصر (FOE)' : 'Future of Egypt Agency (FOE)'}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
              <button
                onClick={handleResetChat}
                type="button"
                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={isAr ? 'بدء محادثة جديدة (إعادة ضبط)' : 'Restart Chat'}
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                type="button"
                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={isAr ? (isExpanded ? 'استعادة الحجم العادي' : 'تكبير وتوسيط المحادثة في الصفحة') : (isExpanded ? 'Restore Normal Size' : 'Expand to Center')}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => { setIsOpen(false); setIsExpanded(false); }}
                type="button"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={isAr ? 'إغلاق' : 'Close'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Social Media Quick Bar inside Bot Header */}
          <div className="px-3 sm:px-4 py-1.5 border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/70 flex items-center justify-between text-[11px] gap-2">
            <span className="font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1 min-w-0 truncate text-[10px] sm:text-[11px]">
              <Share2 className="w-3 h-3 text-amber-500 flex-shrink-0" />
              <span className="truncate">{isAr ? 'منصات التواصل الرسمية:' : 'Official Channels:'}</span>
            </span>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <a 
                href={info.facebookUrl} 
                target="_blank" 
                rel="noreferrer"
                title="Facebook"
                className="w-6 h-6 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white transition-all flex items-center justify-center border border-[#1877F2]/25 shadow-2xs cursor-pointer"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a 
                href={info.linkedinUrl} 
                target="_blank" 
                rel="noreferrer"
                title="LinkedIn"
                className="w-6 h-6 rounded-lg bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white transition-all flex items-center justify-center border border-[#0A66C2]/25 shadow-2xs cursor-pointer"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
              </a>
              <a 
                href={info.twitterUrl} 
                target="_blank" 
                rel="noreferrer"
                title="Twitter / X"
                className="w-6 h-6 rounded-lg bg-slate-500/10 hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-slate-800 dark:text-slate-200 transition-all flex items-center justify-center border border-slate-500/25 shadow-2xs cursor-pointer"
              >
                <XTwitterIcon className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Messages Container */}
          <div className={`flex-1 p-3.5 sm:p-5 overflow-y-auto space-y-3.5 text-xs sm:text-sm ${
            theme === 'dark' ? 'bg-slate-950/70' : 'bg-slate-50/70'
          }`}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 sm:p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? (isExpanded ? 'max-w-[75%]' : 'max-w-[85%]') + ' bg-amber-500 text-slate-950 font-bold rounded-br-none whitespace-pre-line'
                      : (isExpanded ? 'max-w-[82%]' : 'max-w-[88%]') + (theme === 'dark' 
                          ? ' bg-slate-900 border border-slate-800 text-slate-100 rounded-bl-none font-medium' 
                          : ' bg-white border border-slate-200 text-slate-900 rounded-bl-none font-medium shadow-2xs')
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Render Visual Social Media Link Cards if message type is social_links */}
                  {msg.type === 'social_links' && (
                    <div className={`mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 ${
                      isExpanded ? 'grid grid-cols-1 sm:grid-cols-3 gap-2.5' : 'space-y-2'
                    }`}>
                      
                      {/* Facebook Card */}
                      <a 
                        href={info.facebookUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-3 rounded-2xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/15 hover:border-blue-500 transition-all flex items-center justify-between gap-3 group text-slate-900 dark:text-white shadow-2xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shadow-md shadow-[#1877F2]/25 flex-shrink-0 group-hover:scale-105 transition-transform">
                            <FacebookIcon className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {isAr ? 'الصفحة الرسمية على فيسبوك' : 'Official Facebook Page'}
                            </div>
                            <div className="text-[11px] text-blue-600 dark:text-blue-400 font-mono font-medium truncate mt-0.5">
                              @foe.eg
                            </div>
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </a>

                      {/* LinkedIn Card */}
                      <a 
                        href={info.linkedinUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-3 rounded-2xl border border-sky-500/30 bg-sky-500/5 hover:bg-sky-500/15 hover:border-sky-500 transition-all flex items-center justify-between gap-3 group text-slate-900 dark:text-white shadow-2xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center shadow-md shadow-[#0A66C2]/25 flex-shrink-0 group-hover:scale-105 transition-transform">
                            <LinkedInIcon className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {isAr ? 'المنصة الرسمية على لينكد إن' : 'Official LinkedIn Profile'}
                            </div>
                            <div className="text-[11px] text-sky-600 dark:text-sky-400 font-mono font-medium truncate mt-0.5">
                              Future of Egypt Agency
                            </div>
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </a>

                      {/* Twitter / X Card */}
                      <a 
                        href={info.twitterUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-3 rounded-2xl border border-slate-300 dark:border-slate-700/80 bg-slate-500/5 hover:bg-slate-500/15 hover:border-slate-800 dark:hover:border-slate-400 transition-all flex items-center justify-between gap-3 group text-slate-900 dark:text-white shadow-2xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center shadow-md shadow-black/25 flex-shrink-0 group-hover:scale-105 transition-transform">
                            <XTwitterIcon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {isAr ? 'الحساب الرسمي على منصة X (تويتر)' : 'Official X (Twitter) Account'}
                            </div>
                            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono font-medium truncate mt-0.5">
                              @futureofegypt_
                            </div>
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-950 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </a>

                    </div>
                  )}

                  {/* Render Visual Committees Schedule Cards with Lucide Icons (Zero Emojis) */}
                  {msg.type === 'committees' && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                      <div className="flex items-center gap-2 pb-1 text-xs font-bold text-slate-900 dark:text-white">
                        <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span>{isAr ? 'جدول ومواعيد لجان البت والتوريد المعتمدة:' : 'Official Procurement Committees Schedule:'}</span>
                      </div>

                      <div className={`grid ${isExpanded ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1'} gap-2`}>
                        {/* Sunday Rice */}
                        <div className="p-3 rounded-xl border border-amber-500/25 bg-amber-500/5 space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-xs text-amber-700 dark:text-amber-400">
                            <Wheat className="w-4 h-4 text-amber-500 flex-shrink-0" />
                            <span>{isAr ? '1. لجنة الأرز (كل أحد)' : '1. Rice Committee (Sundays)'}</span>
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-500 flex-shrink-0" />
                              <span>{isAr ? 'أسبوعياً — 02:00 ظهراً' : 'Weekly — 02:00 PM'}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                              {isAr ? 'الأولوية بأسبقية التواجد الفعلي بالقاعة.' : 'Adjudication by physical sign-in order.'}
                            </div>
                          </div>
                        </div>

                        {/* Tuesday Live Cattle */}
                        <div className="p-3 rounded-xl border border-rose-500/25 bg-rose-500/5 space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-xs text-rose-700 dark:text-rose-400">
                            <Award className="w-4 h-4 text-rose-500 flex-shrink-0" />
                            <span>{isAr ? '2. لجنة الرؤوس الحية (الثلاثاء)' : '2. Live Cattle Committee (Tue)'}</span>
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-rose-500 flex-shrink-0" />
                              <span>{isAr ? 'دورية تبادلية — 02:00 ظهراً' : 'Bi-weekly — 02:00 PM'}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                              {isAr ? 'بالتبادل الأسبوعي مع لجنة الجمبري.' : 'Alternating weekly with Shrimp.'}
                            </div>
                          </div>
                        </div>

                        {/* Monday Shrimp */}
                        <div className="p-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-700 dark:text-emerald-400">
                            <Fish className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            <span>{isAr ? '3. لجنة الجمبري (الاثنين)' : '3. Shrimp Committee (Mondays)'}</span>
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                              <span>{isAr ? 'دورية تبادلية — 02:00 ظهراً' : 'Bi-weekly — 02:00 PM'}</span>
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

                  {/* Suggested Topics in the Welcome Message (Shown in Expanded Mode Only to avoid traffic) */}
                  {msg.id === 1 && isExpanded && (
                    <div className="mt-3.5 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="text-[11px] sm:text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isAr ? 'الاستفسارات الشائعة (اضغط للسؤال فوراً):' : 'Suggested Topics (Click to ask):'}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-0.5">
                        {activePrompts.slice(0, 6).map((promptText, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => handleSendMessage(promptText)}
                            type="button"
                            className={`w-full ${isAr ? 'text-right' : 'text-left'} px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between gap-2 group ${
                              theme === 'dark'
                                ? 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-amber-500/60 hover:bg-amber-500/10 hover:text-amber-300'
                                : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-900'
                            }`}
                          >
                            <span className="leading-snug">{promptText}</span>
                            <span className="text-amber-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform flex-shrink-0 text-xs">
                              {isAr ? '←' : '→'}
                            </span>
                          </button>
                        ))}
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
              <div className="flex items-center gap-1 p-2.5 rounded-2xl bg-slate-200 dark:bg-slate-800 w-14">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills - Primary streamlined suggestion bar */}
          <div className="px-3 sm:px-4 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-950/95">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 flex items-center gap-1 flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" />
                <span>{isAr ? 'أسئلة مقترحة:' : 'Quick:'}</span>
              </span>
              {activePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  type="button"
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all flex-shrink-0 cursor-pointer shadow-2xs ${
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

          {/* Input Box */}
          <div className="p-2.5 sm:p-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isAr ? 'اسأل عن مواعيد اللجان، السلع، الروابط...' : 'Ask about committees, commodities, links...'}
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 text-base sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="p-2 sm:p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 transition-colors shadow-sm cursor-pointer flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
