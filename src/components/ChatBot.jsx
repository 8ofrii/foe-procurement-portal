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
  Minimize2
} from 'lucide-react';
import { PORTAL_INFO } from '../data/portalData';

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
      ar: 'مرحباً بك! أنا المساعد الذكي لإدارة الشراء الموحد بجهاز مستقبل مصر للتنمية المستدامة. كيف يمكنني إفادتك اليوم بخصوص مواعيد اللجان (لجنة الأرز، لجنة الرؤوس الحية، لجنة الجمبري)، السلع والمخزون، أو القنوات الرسمية؟',
      en: 'Welcome! I am the AI Assistant of Mostaqbal Misr Unified Procurement Directorate. How can I assist you regarding committees schedule (Rice, Live Cattle, Shrimp), strategic reserves, or official channels?',
      pl: 'Witamy! Jestem Asystentem AI ds. Zakupów Strategicznych Agencji Przyszłość Egiptu. W czym mogę pomóc w kwestii harmonogramu komisji, surowców lub oficjalnych kanałów?',
      uk: 'Вітаємо! Я інтелектуальний помічник Директорату єдиних закупівель Агентства Майбутнє Єгипту. Чим можу допомогти щодо графіка комісій, стратегічних запасів чи контактів?'
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
      'ما هي مواعيد اللجان (لجنة الأرز، لجنة الرؤوس الحية، ولجنة الجمبري)؟',
      'ما هي القنوات والروابط الرسمية للجهاز؟',
      'ما هي رؤية وأهداف إدارة الشراء الموحد؟',
      'ما هي الإدارات التخصصية الثمانية؟',
      'أين يقع المقر الرئيسي للإدارة؟',
      'كم يغطي المخزون الاستراتيجي للدولة؟'
    ],
    en: [
      'What are the official working hours?',
      'What is the weekly committees schedule (Rice & Shrimp)?',
      'What are the official social media channels?',
      'What is the vision of Unified Procurement?',
      'What are the 8 internal directorates?',
      'Where is the main headquarters located?',
      'What is the strategic reserve coverage?'
    ],
    pl: [
      'Jakie są oficjalne godziny pracy?',
      'Jaki jest harmonogram komisji (Ryż i Krewetki)?',
      'Jakie są oficjalne kanały społecznościowe?',
      'Jaka jest wizja Zunifikowanego Systemu Zakupów?',
      'Jakie jest 8 wewnętrznych departamentów?',
      'Gdzie znajduje się główna siedziba?',
      'Jaki jest stan rezerw strategicznych?'
    ],
    uk: [
      'Які офіційні години роботи?',
      'Який графік комісій із закупівель (Рис та Креветки)?',
      'Які офіційні канали в соцмережах?',
      'Яка стратегічна візія системи єдиних закупівель?',
      'Які є 8 внутрішніх департаментів?',
      'Де розташований головний офіс?',
      'На скільки місяців вистачає резервів?'
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAnswer = (query) => {
    const q = query.toLowerCase();

    // 1. Social Media & Official Channels Query
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
      q.includes('x')
    ) {
      return {
        type: 'social_links',
        text: isAr 
          ? `🌐 إليك القنوات والروابط الرسمية المعتمدة لجهاز مستقبل مصر للتنمية المستدامة (FOE):`
          : `🌐 Official verified channels of Future of Egypt Agency (FOE):`
      };
    }

    // 2. Weekly Committees Query (Sunday Rice, Tuesday Live Cattle, Monday Shrimp)
    if (
      q.includes('لجان') || 
      q.includes('لجنة') || 
      q.includes('ارز') || 
      q.includes('أرز') || 
      q.includes('رز') || 
      q.includes('جمبري') || 
      q.includes('رؤوس') || 
      q.includes('مواشي') || 
      q.includes('الأحد') || 
      q.includes('الاثنين') || 
      q.includes('الثلاثاء') || 
      q.includes('committee') || 
      q.includes('komisj') ||
      q.includes('rice') || 
      q.includes('shrimp') || 
      q.includes('cattle')
    ) {
      if (lang === 'en') {
        return `📅 Official Procurement Committees Schedule:

1. Sunday Committee — Rice (الأرز):
   • Schedule: Every Sunday at 02:00 PM Sharp (Fixed Weekly Session).
   • Priority Rule: Priority strictly by physical arrival & sign-in order.
   • Required: Official company documents + supply track record.

2. Tuesday Committee — Live Cattle & Livestock (الرؤوس الحية 🐂):
   • Schedule: Bi-weekly (Every other Tuesday) at 02:00 PM Sharp.
   • Required: Official company documents + supply track record.

3. Monday Committee — Shrimp (الجمبري 🦐):
   • Schedule: Bi-weekly (Every other Monday) at 02:00 PM Sharp.
   • Required: Official company documents + supply track record.

📍 Official Venue: Unified Procurement Directorate HQ — Tucano Mall, Floor 3, Yousef Abbas St., Nasr City, Cairo.`;
      } else if (lang === 'pl') {
        return `📅 Oficjalny Harmonogram Komisji Zakupowych:

1. Niedziela — Ryż (الأرز):
   • Czas: Każda niedziela o 14:00 (Stała sesja cotygodniowa).
   • Zasada: Pierwszeństwo według kolejności przybycia.

2. Wtorek — Żywe bydło (الرؤوس الحية 🐂):
   • Czas: Co dwa tygodnie we wtorki o 14:00.

3. Poniedziałek — Krewetki (الجمبري 🦐):
   • Czas: Co dwa tygodnie w poniedziałki o 14:00.

📄 Wymagane: Wyłącznie oficjalne dokumenty firmy + doświadczenie w dostawach.
📍 Siedziba: Tucano Mall - 3. piętro - ul. Yousef Abbas - Nasr City - Kair.`;
      } else if (lang === 'uk') {
        return `📅 Офіційний графік комісій із закупівель:

1. Неділя — Рис (الأرز):
   • Щонеділі о 14:00 (Постійна щотижнева сесія).
   • Пріоритет за черговістю прибуття.

2. Вівторок — Жива худоба (الرؤوس الحية 🐂):
   • Раз на два тижні щовівторка о 14:00.

3. Понеділок — Креветки (الجمبري 🦐):
   • Раз на два тижні щопонеділка о 14:00.

📄 Потрібні лише офіційні документи компанії + підтверджений досвід поставок.
📍 Штаб-квартира: Tucano Mall - 3-й поверх - вул. Юсефа Аббаса - Наср-Сіті - Каїр.`;
      } else {
        return `📅 جدول ومواعيد لجان البت والتوريد المعتمدة (بمقر إدارة الشراء الموحد):

1. لجنة الأرز (جلسة أسبوعية ثابتة كل أحد):
   • التوقيت: أسبوعياً كل يوم أحد في تمام الساعة 02:00 ظهراً (02:00 PM).
   • ⚠️ الضابط الأساسي: الأولوية بأسبقية التواجد والحضور الفعلي والتسجيل بقاعة اللجنة.

2. لجنة الرؤوس الحية (يوم الثلاثاء — دورية أسبوع وأسبوع):
   • التوقيت: الساعة 02:00 ظهراً (02:00 PM).
   • 🐂 النظام: انعقاد دوري كل أسبوعين بالتناوب مع لجنة الجمبري.

3. لجنة الجمبري (يوم الاثنين — دورية أسبوع وأسبوع):
   • التوقيت: الساعة 02:00 ظهراً (02:00 PM).
   • 🦐 النظام: انعقاد دوري كل أسبوعين بالتناوب مع لجنة الرؤوس الحية.

📄 المستندات المطلوبة (لكافة اللجان):
• الأوراق والمستندات الرسمية للشركة (السجل التجاري الساري، البطاقة الضريبية، القيمة المضافة، التفويض المعتمد).
• سابقة الأعمال والخبرة في التوريد إن وُجدت لدعم ملف المورد (دون اشتراط عينات مسبقة).

📍 مقر الانعقاد: توكانو مول - الدور الثالث - شارع يوسف عباس - مدينة نصر - القاهرة (قاعة اللجان المركزية).`;
      }
    }

    // 3. Strategic Vision, Mandate & Governance Query
    if (
      q.includes('رؤية') || 
      q.includes('اهداف') || 
      q.includes('أهداف') || 
      q.includes('vision') || 
      q.includes('اختصاص') || 
      q.includes('دور') || 
      q.includes('مجلس الوزراء') || 
      q.includes('وزراء') || 
      q.includes('قرارات') || 
      q.includes('مين انتو') || 
      q.includes('من انتم') || 
      q.includes('من أنتم') || 
      q.includes('who are you') || 
      q.includes('wizja') || 
      q.includes('візія') || 
      q.includes('мета')
    ) {
      if (lang === 'en') {
        return `🏛️ Strategic Vision of Mostaqbal Misr Unified Procurement Directorate:
Pursuant to Egyptian Cabinet decrees and presidential directives, the Directorate is mandated to lead unified sovereign procurement of essential food commodities and grains.
Core Strategic Pillars:
1. Harmonizing mega-agricultural production across the 2.2M-feddan New Delta with smart direct international trading.
2. Extending state strategic reserves to a secure 6 to 9 months buffer (wheat, oils, corn, sugar).
3. Capturing foreign currency savings and optimizing payment facilities via bulk direct trading agreements.
4. Expanding digital smart silos complexes and port logistics for zero demurrage and certified food safety.`;
      } else if (lang === 'pl') {
        return `🏛️ Strategiczna Wizja Dyrekcji ds. Zunifikowanych Zakupów:
Zgodnie z decyzjami Rady Ministrów na mocy dekretu Prezydenta, Agencja Przyszłość Egiptu realizuje zunifikowane zakupy strategiczne:
1. Połączenie gigantycznej produkcji rolniczej Nowej Delty (2.2 mln feddanów) z bezpośrednim handlem globalnym.
2. Rozbudowa rezerw strategicznych kraju na 6–9 miesięcy (pszenica, oleje, kukurydza, cukier).
3. Oszczędności walutowe i bezpośrednie kontrakty z międzynarodowymi partnerami handlowymi.
4. Nowoczesne silosy cyfrowe i sprawna logistyka portowa bez opłat postojowych.`;
      } else if (lang === 'uk') {
        return `🏛️ Стратегічна візія Директорату єдиних закупівель:
На виконання постанов Кабінету Міністрів та указів Президента Єгипту:
1. Інтеграція масштабного агровиробництва Нової Дельти (2.2 млн федданів) із прямими міжнародними закупівлями.
2. Формування гарантованого державного резерву базових культур на 6–9 місяців.
3. Валютна оптимізація та довгострокові контракти з провідними світовими експортерами.
4. Розбудова мережі цифрових елеваторів та ефективна логістика у портах.`;
      } else {
        return `🏛️ الرؤية الاستراتيجية لإدارة الشراء الموحد بجهاز مستقبل مصر للتنمية المستدامة:
إعمالاً لتوجيهات فخامة رئيس الجمهورية وقرار مجلس الوزراء بإنابة الجهاز في إدارة الشراء الموحد للسلع الاستراتيجية والأقماح:
1. الربط والتكامل المباشر بين الإنتاج الزراعي والصناعي الضخم بمشروع الدلتا الجديدة (2.2 مليون فدان) والشراء المباشر الذكي.
2. بناء مخزون استراتيجي آمن يغطي من 6 إلى 9 أشهر من القمح والزيوت والذرة والسكر.
3. تحقيق وفورات دولارية نوعية عبر الشراء بالكميات المجمعة والاستفادة من تقلبات البورصات السلعية العالمية.
4. إدارة سلاسل الإمداد اللوجستية وشبكة الصوامع الرقمية الذكية والتفريغ الفوري بالموانئ دون غرامات تأخير.`;
      }
    }

    // 4. Departments Query
    if (
      q.includes('ادارات') || 
      q.includes('إدارات') || 
      q.includes('ادارة') || 
      q.includes('إدارة') || 
      q.includes('اقسام') || 
      q.includes('أقسام') || 
      q.includes('department') || 
      q.includes('departament') || 
      q.includes('департамент') || 
      q.includes('قطاعات') ||
      q.includes('تعاقدات') ||
      q.includes('قانونية') ||
      q.includes('تجارية') ||
      q.includes('مالية') ||
      q.includes('تخطيط') ||
      q.includes('داخلية') ||
      q.includes('تجارة داخلية') ||
      q.includes('planning') ||
      q.includes('domestic') ||
      q.includes('supply chain') ||
      q.includes('logistics')
    ) {
      if (lang === 'en') {
        return `🏛️ The 8 Executive Internal Directorates of Mostaqbal Misr Unified Procurement:
1. Government Contracting Directorate (التعاقدات الحكومية)
2. Legal Affairs Directorate (الإدارة القانونية)
3. Foreign Commercial Directorate (الإدارة التجارية الخارجية)
4. Financial Directorate / Finance (المالية)
5. Supply Chain Directorate (إدارة سلاسل الإمداد)
6. Logistics Directorate (إدارة اللوجستيات)
7. Planning Directorate (إدارة التخطيط)
8. Domestic Trade Directorate (إدارة التجارة الداخلية)`;
      } else if (lang === 'pl') {
        return `🏛️ 8 Wewnętrznych Dyrekcji Wykonawczych:
1. Dyrekcja ds. Zamówień Rządowych
2. Dyrekcja ds. Prawnych
3. Dyrekcja ds. Handlu Zagranicznego
4. Dyrekcja Finansowa
5. Dyrekcja ds. Łańcucha Dostaw (Supply Chain)
6. Dyrekcja Logistyki
7. Dyrekcja ds. Planowania
8. Dyrekcja ds. Handlu Wewnętrznego`;
      } else if (lang === 'uk') {
        return `🏛️ 8 Внутрішніх Виконавчих Директоратів:
1. Директорат урядових контрактів
2. Юридичний директорат
3. Директорат зовнішньої торгівлі
4. Фінансовий директорат (Finance)
5. Директорат ланцюгів постачання (Supply Chain)
6. Директорат логістики
7. Директорат планування
8. Директорат внутрішньої торгівлі`;
      } else {
        return `🏛️ الإدارات التنفيذية الثمانية المعتمدة داخل إدارة الشراء الموحد بجهاز مستقبل مصر:
1. التعاقدات الحكومية (تنظيم وطرح وإدارة المناقصات الاستراتيجية)
2. الإدارة القانونية (الصياغات التعاقدية وحماية حقوق الدولة)
3. الإدارة التجارية الخارجية (التفاوض الدولي ورصد البورصات السلعية)
4. المالية (التخطيط المالي وتوفير السيولة والاعتمادات المستندية)
5. إدارة سلاسل الإمداد — Supply Chain (التدفقات السلعية والربط مع الدلتا)
6. إدارة اللوجستيات — Logistics (عمليات الموانئ والتفريغ الفوري والصوامع)
7. إدارة التخطيط (التخطيط الاستراتيجي لاحتياجات الدولة والتنبؤ بالفجوة السلعية)
8. إدارة التجارة الداخلية (توزيع التدفقات السلعية ومتابعة استقرار الأسواق المحلية)`;
      }
    }

    // 5. Working Hours & Operation Schedule
    if (
      q.includes('ساعات العمل') || 
      q.includes('مواعيد العمل') || 
      q.includes('أوقات العمل') || 
      q.includes('وقت العمل') || 
      q.includes('ساعات') || 
      q.includes('دوام') || 
      q.includes('شغالين') || 
      q.includes('فاتحين') || 
      q.includes('working hours') || 
      q.includes('work time') || 
      q.includes('hours') || 
      q.includes('godziny') || 
      q.includes('години')
    ) {
      if (lang === 'en') {
        return `⏰ Official Working Hours of Mostaqbal Misr Unified Procurement Directorate:
• Days: Sunday to Thursday (Everyday except Friday & Saturday).
• Working Time: 09:00 AM – 05:00 PM (9 to 5).
• Official Weekend: Friday & Saturday.
• Procurement & Bidding Committees: Kick off at 02:00 PM.
📍 Venue: Tucano Mall - Yousef Abbas St. - Nasr City - Cairo.`;
      } else if (lang === 'pl') {
        return `⏰ Oficjalne Godziny Pracy Dyrekcji ds. Zakupów:
• Dni robocze: Od niedzieli do czwartku.
• Godziny: 09:00 – 17:00 (od 9 do 17).
• Weekend: Piątek i sobota.
• Rozpoczęcie posiedzeń komisji: Godzina 14:00.
📍 Siedziba: Tucano Mall - Nasr City - Kair.`;
      } else if (lang === 'uk') {
        return `⏰ Офіційні години роботи Директорату закупівель:
• Робочі дні: З неділі по четвер.
• Години роботи: 09:00 – 17:00 (з 9 до 17).
• Вихідні: П'ятниця та субота.
• Засідання комісій: Рівно о 14:00.
📍 Штаб-квартира: Tucano Mall - Наср-Сіті - Каїр.`;
      } else {
        return `⏰ مواعيد وساعات العمل الرسمية لإدارة الشراء الموحد بجهاز مستقبل مصر:
• أيام العمل: من الأحد إلى الخميس أسبوعياً (يومياً عدا الجمعة والسبت).
• ساعات العمل: من الساعة 09:00 صباحاً حتى 05:00 مساءً (من 9 إلى 5).
• العطلة الأسبوعية الرسمية: يومي الجمعة والسبت.
• جلسات لجان البت والتوريد: تبدأ في تمام الساعة 02:00 ظهراً (الأحد، الاثنين، الثلاثاء حسب الجدول المعتمد).
📍 المقر الرئيسي: توكانو مول - شارع يوسف عباس - مدينة نصر - القاهرة.`;
      }
    }

    // 6. Address & Headquarters Query
    if (q.includes('مقر') || q.includes('عنوان') || q.includes('مكان') || q.includes('توكانو') || q.includes('مدينة نصر') || q.includes('دور') || q.includes('floor') || q.includes('address') || q.includes('location') || q.includes('siedzib') || q.includes('адрес') || q.includes('офіс') || q.includes('map') || q.includes('خريطة')) {
      if (lang === 'en') {
        return `Official Main Headquarters of Mostaqbal Misr Unified Procurement Directorate:
📍 Location: Tucano Mall — Floor 3 — Yousef Abbas St. — Nasr City — Cairo.
🗺️ Google Maps: https://www.google.com/maps/search/?api=1&query=Tucano+Commercial+Complex,+Youssef+Abbas,+Nasr+City,+Cairo
⏰ Working Hours: Sunday to Thursday (09:00 AM – 05:00 PM).
Direct Hotline: 19842 | Email: procurement@foe.gov.eg`;
      } else if (lang === 'pl') {
        return `Oficjalna Główna Siedziba Dyrekcji ds. Zakupów:
📍 Adres: Tucano Mall — 3. piętro — ul. Yousef Abbas — Nasr City — Kair.
⏰ Godziny pracy: Niedziela – Czwartek (09:00 – 17:00).
Infolinia: +20 19842 | E-mail: procurement@foe.gov.eg`;
      } else if (lang === 'uk') {
        return `Офіційний головний офіс Директорату закупівель:
📍 Адреса: Tucano Mall — 3-й поверх — вул. Юсефа Аббаса — Наср-Сіті — Каїр.
⏰ Години роботи: Неділя – Четвер (09:00 – 17:00).
Гаряча лінія: +20 19842 | Email: procurement@foe.gov.eg`;
      } else {
        return `المقر الرسمي الرئيسي لإدارة الشراء الموحد بجهاز مستقبل مصر للتنمية المستدامة:
📍 العنوان: توكانو مول — الدور الثالث — شارع يوسف عباس — مدينة نصر — القاهرة.
🗺️ رابط خرائط Google: https://www.google.com/maps/search/?api=1&query=Tucano+Commercial+Complex,+Youssef+Abbas,+Nasr+City,+Cairo
⏰ مواعيد العمل: من الأحد إلى الخميس (من 09:00 صباحاً حتى 05:00 مساءً).
الخط الساخن: 19842 | البريد الرسمي: procurement@foe.gov.eg`;
      }
    }

    // 6. Strategic Pillars
    if (q.includes('ركائز') || q.includes('pillars') || q.includes('filarów') || q.includes('стовп')) {
      if (lang === 'en') {
        return `The 6 Strategic Pillars of Mostaqbal Misr Unified Procurement:
1. Commodity security, controlled pricing, and certified quality.
2. Fortifying state strategic reserves of essential crops & commodities.
3. Regulating price fluctuations through supply augmentation.
4. Rigorous quality auditing ensuring citizen safety.
5. Diversifying import origins to mitigate supply chain risks.
6. Professional high-level negotiation achieving foreign currency savings.`;
      } else if (lang === 'pl') {
        return `Sześć Strategicznych Filarów:
1. Bezpieczeństwo towarowe, kontrola cen i certyfikowana jakość.
2. Wzmocnienie państwowych rezerw strategicznych.
3. Stabilizacja cen poprzez zwiększenie podaży.
4. Rygorystyczna kontrola jakości w portach.
5. Dywersyfikacja źródeł importu z ponad 18 krajów.
6. Profesjonalne negocjacje przynoszące oszczędności walutowe.`;
      } else if (lang === 'uk') {
        return `Шість стратегічних стовпів Директорату єдиних закупівель:
1. Товарна безпека, контрольовані ціни та гарантована якість.
2. Зміцнення державних резервів зернових та олійних культур.
3. Регулювання цін шляхом збільшення товарної пропозиції.
4. Суворий контроль якості в портах та референс-лабораторіях.
5. Диверсифікація імпорту з понад 18 країн світу.
6. Валютна оптимізація через масштабні прямі контракти.`;
      } else {
        return `الركائز الاستراتيجية الست المعتمدة للشراء الموحد:
1. أمن سلعي.. وأسعار منضبطة.. وجودة مضمونة.
2. تعزيز مخزون الدولة من السلع والمحاصيل الأساسية والاستراتيجية.
3. ضبط حركة الأسعار من خلال زيادة المعروض في الأسواق.
4. مراجعة الجودة لضمان سلع آمنة وصحية للمواطنين.
5. تنويع مناشئ الاستيراد لضمان استمرارية الإمدادات وتقليل المخاطر.
6. تفاوض احترافي يحقق وفر دولاري للدولة ويحسن شروط التوريد.`;
      }
    }

    // 7. Reserves
    if (q.includes('مخزون') || q.includes('reserve') || q.includes('rezerw') || q.includes('резерв') || q.includes('قمح') || q.includes('wheat') || q.includes('كم يغطي')) {
      if (lang === 'en') {
        return `Strategic Reserves Buffer:
• Milling Wheat: 7.8 months safe coverage (5.8M MT).
• Vegetable Oils: 6.9 months buffer (1.4M MT).
• Sugar: 8.2 months (supported by New Delta factories).
• Yellow Corn: 6.2 months.`;
      } else if (lang === 'pl') {
        return `Poziom Rezerw Strategicznych:
• Pszenica: 7.8 miesięcy (5.8 mln ton).
• Oleje Roślinne: 6.9 miesięcy (1.4 mln ton).
• Cukier: 8.2 miesięcy.
• Kukurydza: 6.2 miesięcy.`;
      } else if (lang === 'uk') {
        return `Рівень стратегічних запасів Єгипту:
• Пшениця: 7.8 місяців (5.8 млн тонн).
• Рослинні олії: 6.9 місяців (1.4 млн тонн).
• Цукор: 8.2 місяців.
• Кукурудза: 6.2 місяців.`;
      } else {
        return `مؤشرات أرصدة السلع والمخزون الاستراتيجي لجهاز مستقبل مصر:
• القمح الطاحن: يغطي 7.8 أشهر (بإجمالي 5.8 مليون طن).
• الزيوت النباتية: تغطي 6.9 أشهر (بإجمالي 1.4 مليون طن).
• السكر: يغطي 8.2 أشهر (طفرة اكتفاء بدعم مصانع الدلتا الجديدة).
• الذرة الصفراء: تغطي 6.2 أشهر.`;
      }
    }

    // Default response
    if (lang === 'en') {
      return `Welcome to Mostaqbal Misr Unified Strategic Procurement Directorate. We lead sovereign commodity procurement, national strategic reserves, and weekly procurement committees (Rice on Sundays & Shrimp/Cattle on Mondays). Main HQ: Tucano Mall - Yousef Abbas St. - Nasr City - Cairo.`;
    } else if (lang === 'pl') {
      return `Witamy w Dyrekcji ds. Zunifikowanych Zakupów Agencji Przyszłość Egiptu. Prowadzimy cotygodniowe komisje przetargowe (Ryż w niedziele, Bydło we wtorki, Krewetki w poniedziałki). Główna siedziba: Tucano Mall - 3. piętro - Nasr City - Kair.`;
    } else if (lang === 'uk') {
      return `Ласкаво просимо до Директорату єдиних закупівель Агентства Майбутнє Єгипту. Проводимо щотижневі комісії (Рис щонеділі, Худоба щовівторка, Креветки щопонеділка). Головний офіс: Tucano Mall - 3-й поверх - Наср-Сіті - Каїр.`;
    } else {
      return `أهلاً بكم في إدارة الشراء الموحد بجهاز مستقبل مصر للتنمية المستدامة. تتولى الإدارة إدارة التعاقدات وجلسات اللجان الأسبوعية (لجنة الأرز كل أحد، ولجنة الرؤوس الحية كل ثلاثاء، ولجنة الجمبري كل اثنين). مقرنا: توكانو مول - الدور الثالث - شارع يوسف عباس - مدينة نصر.`;
    }
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

      if (typeof answer === 'object' && answer.type === 'social_links') {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          type: 'social_links',
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
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
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
        <div className={`fixed z-50 border shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-300 ease-out animate-fadeIn ${
          isExpanded
            ? 'inset-3 sm:inset-6 md:inset-10 lg:inset-14 max-w-5xl max-h-[90vh] m-auto rounded-3xl'
            : 'bottom-20 sm:bottom-24 left-3 right-3 sm:left-auto sm:right-6 w-auto sm:w-[440px] max-w-[calc(100vw-24px)] h-[540px] max-h-[82vh] rounded-3xl'
        } ${
          theme === 'dark' 
            ? 'bg-slate-950/95 border-amber-500/30 text-slate-100 shadow-black/80' 
            : 'bg-white/95 border-amber-400/40 text-slate-900 shadow-2xl'
        }`}>
          
          {/* Header */}
          <div className="p-3.5 sm:p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-500/15 via-transparent to-amber-500/5">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950 border border-amber-400/80 p-1 flex items-center justify-center shadow-md flex-shrink-0">
                <img 
                  src="/assets/foe-emblem-official.png" 
                  alt="شعار الجهاز" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-base font-black text-slate-900 dark:text-white leading-none">
                    {isAr ? 'المساعد الذكي للشراء الموحد' : 'Unified Procurement AI Assistant'}
                  </h3>
                  {isExpanded && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 hidden sm:inline-block">
                      {isAr ? 'نافذة موسعة' : 'Expanded Mode'}
                    </span>
                  )}
                </div>
                <span className="text-[10px] sm:text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 mt-1 leading-none">
                  <span>{isAr ? 'إدارة الشراء الموحد — جهاز مستقبل مصر (FOE)' : 'Future of Egypt Agency (FOE)'}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5">
              <button
                onClick={handleResetChat}
                type="button"
                className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-amber-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={isAr ? 'بدء محادثة جديدة (إعادة ضبط)' : 'Restart Chat'}
              >
                <RotateCcw className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                type="button"
                className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-amber-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={isAr ? (isExpanded ? 'استعادة الحجم العادي' : 'تكبير وتوسيط المحادثة في الصفحة') : (isExpanded ? 'Restore Normal Size' : 'Expand to Center')}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" /> : <Maximize2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
              </button>

              <button
                onClick={() => { setIsOpen(false); setIsExpanded(false); }}
                type="button"
                className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={isAr ? 'إغلاق' : 'Close'}
              >
                <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </div>
          </div>

          {/* Social Media Quick Bar inside Bot Header */}
          <div className="px-3.5 sm:px-4 py-1.5 border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/70 flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <Share2 className="w-3 h-3 text-amber-500" />
              <span>{isAr ? 'منصات التواصل الرسمية:' : 'Official Channels:'}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <a 
                href={info.facebookUrl} 
                target="_blank" 
                rel="noreferrer"
                title="Facebook"
                className="px-2 py-0.5 rounded-md bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white font-bold text-[10px] transition-all flex items-center gap-1 border border-blue-500/20"
              >
                <span>FB</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <a 
                href={info.linkedinUrl} 
                target="_blank" 
                rel="noreferrer"
                title="LinkedIn"
                className="px-2 py-0.5 rounded-md bg-sky-600/10 hover:bg-sky-600 text-sky-600 hover:text-white font-bold text-[10px] transition-all flex items-center gap-1 border border-sky-500/20"
              >
                <span>IN</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <a 
                href={info.twitterUrl} 
                target="_blank" 
                rel="noreferrer"
                title="Twitter / X"
                className="px-2 py-0.5 rounded-md bg-slate-500/10 hover:bg-slate-900 hover:text-white text-slate-700 dark:text-slate-300 font-bold text-[10px] transition-all flex items-center gap-1 border border-slate-500/20"
              >
                <span>X</span>
                <ExternalLink className="w-2.5 h-2.5" />
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
                  className={`p-3.5 sm:p-4 rounded-2xl leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? (isExpanded ? 'max-w-[75%]' : 'max-w-[88%]') + ' bg-amber-500 text-slate-950 font-semibold rounded-br-none whitespace-pre-line'
                      : (isExpanded ? 'max-w-[82%]' : 'max-w-[88%]') + (theme === 'dark' 
                          ? ' bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none' 
                          : ' bg-white border border-slate-200 text-slate-800 rounded-bl-none')
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
                        className="p-2.5 rounded-xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/15 transition-all flex items-center justify-between gap-2 group text-slate-900 dark:text-white"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                            f
                          </div>
                          <div>
                            <div className="text-xs font-bold">{isAr ? 'الصفحة الرسمية على فيسبوك' : 'Official Facebook Page'}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">@foe.eg</div>
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                      </a>

                      {/* LinkedIn Card */}
                      <a 
                        href={info.linkedinUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2.5 rounded-xl border border-sky-500/30 bg-sky-500/5 hover:bg-sky-500/15 transition-all flex items-center justify-between gap-2 group text-slate-900 dark:text-white"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center font-bold text-xs">
                            in
                          </div>
                          <div>
                            <div className="text-xs font-bold">{isAr ? 'المنصة الرسمية على لينكد إن' : 'Official LinkedIn Profile'}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Future of Egypt Agency</div>
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-sky-500 group-hover:translate-x-0.5 transition-transform" />
                      </a>

                      {/* Twitter / X Card */}
                      <a 
                        href={info.twitterUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2.5 rounded-xl border border-slate-500/30 bg-slate-500/5 hover:bg-slate-500/15 transition-all flex items-center justify-between gap-2 group text-slate-900 dark:text-white"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs">
                            𝕏
                          </div>
                          <div>
                            <div className="text-xs font-bold">{isAr ? 'الحساب الرسمي على منصة X (تويتر)' : 'Official X (Twitter) Account'}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">@futureofegypt_</div>
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </a>

                    </div>
                  )}

                  {/* Suggested Topics in the Welcome Message */}
                  {msg.id === 1 && (
                    <div className="mt-3.5 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="text-[11px] sm:text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isAr ? 'الاستفسارات الشائعة (اضغط للسؤال فوراً):' : 'Suggested Topics (Click to ask):'}</span>
                      </div>
                      <div className={`grid ${isExpanded ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-2 pt-0.5`}>
                        {activePrompts.slice(0, isExpanded ? 6 : 4).map((promptText, pIdx) => (
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

          {/* Quick Questions Pills */}
          <div className="px-3 sm:px-4 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-950/90">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 flex items-center gap-1 flex-shrink-0">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{isAr ? 'أسئلة سريعة:' : 'Quick:'}</span>
              </span>
              {activePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  type="button"
                  className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all flex-shrink-0 cursor-pointer shadow-xs ${
                    theme === 'dark'
                      ? 'bg-slate-900 border-slate-700/80 text-slate-200 hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-300'
                      : 'bg-white border-slate-300 text-slate-800 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-900'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 sm:p-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isAr ? 'اسأل عن مواعيد اللجان، السلع، الروابط...' : 'Ask about committees, commodities, links...'}
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="p-2.5 sm:p-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 transition-colors shadow-sm cursor-pointer flex-shrink-0"
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
