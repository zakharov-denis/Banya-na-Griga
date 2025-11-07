'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ArrowRight, Newspaper, BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { ArticleModal } from './ArticleModal';
import { NewsModal } from './NewsModal';
import { Header } from './Header';

interface NewsItem {
  id: string;
  date: string;
  headline: string;
  summary: string;
  fullContent: string;
  image?: string;
  link?: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  date: string;
  fullContent: string;
  tags: string[];
  image?: string;
  link?: string;
}

interface BlogsPageProps {
  onNavigateToHome?: () => void;
  onNavigateToHomeWithScroll?: (sectionId?: string) => void;
  onNavigateToAbout?: () => void;
  onNavigateToCareers?: () => void;
  onBookSession?: () => void;
}

export function BlogsPage({ onNavigateToHome, onNavigateToHomeWithScroll, onNavigateToAbout, onNavigateToCareers, onBookSession }: BlogsPageProps) {
  const [activeTab, setActiveTab] = useState<'news' | 'articles'>('news');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Sample News Data
  const newsItems: NewsItem[] = [
    {
      id: '1',
      date: '2 мая 2025',
      headline: 'Режим работы в майские праздники',
      summary: 'Баня работает в обычном режиме 1, 2, 3, 4, 7, 8, 10 и 11 мая. 9 мая — выходной. С праздником всех!',
      fullContent: `Дорогие гости,

Рады сообщить вам график работы в майские праздники!

Баня будет работать в обычном режиме в следующие дни:
• 1 мая (четверг)
• 2 мая (пятница)
• 3 мая (суббота)
• 4 мая (воскресенье)
• 7 мая (среда)
• 8 мая (четверг)
• 10 мая (суббота)
• 11 мая (воскресенье)

Обратите внимание: 9 мая (пятница) — День Победы — выходной день для нашего заведения.

Приглашаем вас отдохнуть и восстановить силы в нашей традиционной русской бане в праздничные дни. Наш опытный персонал обеспечит вам максимально аутентичный и комфортный отдых.

С праздником всех! Ждём вас!`,
      image: 'http://i.siteapi.org/iJczRrFUhWjcI3rCXj1AFcf30FE=/0x0:1200x675/s.siteapi.org/adbb3a7b1a24aa1.ru/img/9ummzqdn2gco48kg4sc404kk8wgw44',
      link: '#',
    },
    {
      id: '2',
      date: '10 июня 2020',
      headline: 'ВАЖНАЯ НОВОСТЬ! МЫ РАБОТАЕМ В ОБЫЧНОМ РЕЖИМЕ!',
      summary: 'Дорогие посетители, мы возобновили нормальную работу! С 10 июня 2020 года наша баня открыта для всех посетителей. Мы работаем в обычном режиме и ждём вас!',
      fullContent: `ВАЖНОЕ ОБЪЯВЛЕНИЕ

Дорогие посетители,

С радостью сообщаем, что мы возобновили нормальную работу!

С 10 июня 2020 года (среда) наша баня снова открыта для всех посетителей без ограничений. Мы с нетерпением ждали этого момента, чтобы снова приветствовать вас в нашем заведении.

После периода закрытия наша команда усердно работала, чтобы все было готово к вашему приходу. Все наши помещения были тщательно подготовлены, чтобы предоставить вам исключительный отдых в бане, к которому вы привыкли.

Мы работаем в обычном режиме:
С нетерпением ждём возможности обслуживать вас и предоставить аутентичный опыт русской бани, которого вы заслуживаете.

Все наши традиционные услуги доступны, включая:
• Традиционные русские парные
• Профессиональный массаж вениками
• Зоны отдыха
• Услуги по организации питания

Мы работаем в обычном режиме и с нетерпением ждём встречи с вами!

Спасибо за ваше терпение и постоянную поддержку.`,
      link: '#',
    },
    {
      id: '3',
      date: '1 сентября 2019',
      headline: 'Внимание, изменение цен',
      summary: 'Внимание! Изменение цен! По суббота�� и воскресеньям входной билет для ВСЕХ в мужское и женское отделения — 500 рублей!',
      fullContent: `ВНИМАНИЕ! ИЗМЕНЕНИЕ ЦЕН

Дорогие гости,

Информируем вас об изменениях в нашей ценовой политике, вступающих в силу немедленно.

НОВЫЕ ЦЕНЫ НА ВЫХОДНЫЕ:
По субботам и воскресеньям входной билет для ВСЕХ в мужское и женское отделения теперь составляет 500 рублей!

Новые цены действуют для:
✓ Мужского отделения — 500 рублей
✓ Женского отделения — 500 рублей
✓ Действует каждую субботу и воскресенье

Это единый тариф, который упрощает посещение нашего заведения в выходные дни. Независимо от того, являетесь ли вы постоянным посетителем или приходите впервые, цена в выходные дни одинакова для всех гостей.

Цены в будние дни остаются без изменений, и мы продолжаем предлагать высокое качество обслуживания и аутентичный опыт русской бани, к которому вы привыкли.

Дополнительные услуги, такие как парение с вениками, массаж и напитки, доступны по обычным ценам.

Благодарим за понимание и ждём вас!

По любым вопросам о ценах или услугах, пожалуйста, не стесняйтесь обращаться к нам.`,
      link: '#',
    },
  ];

  // Sample Articles Data
  const articles: Article[] = [
    {
      id: '1',
      date: '24 октября 2013, 11:43',
      title: 'Сауны в Калининграде – позвольте себе роскошный отдых по доступной цене',
      description: 'Если вы ведёте активный образ жизни, то знаете, что такое стресс, усталость, беспокойство и гнев. Узнайте, как сауна может помочь вам восстановить жизненные силы и зарядиться энергией.',
      fullContent: `Если вы ведёте активный образ жизни, то знаете, что такое стресс, усталость, беспокойство и гнев. Всё это — результат современных реалий, где работа выходит на первый план и вытесняет всё остальное. Так быть не должно. Человеческий организм устроен так, что ему необходим отдых и восполнение энергии время от времени. Если вы хотите оставаться в форме и сохранять здоровье, то стоит включить посещение сауны в свой плотный график. Это место, где можно полностью восполнить силы и улучшить настроение. Сауна известна на наших землях с незапамятных времён. В древности посещение сауны считалось честью и привилегией. Не каждый мог позволить себе такую роскошь. Как же мы должны радоваться, что теперь такое занятие доступно каждому. Хотите восстановить жизненные силы и зарядиться энергией? Тогда сауна — именно то, что вам нужно.

Калининград предлагает широкий выбор саун на любой вкус. Вы можете организовать досуг с друзьями или семьёй. Поверьте, вы прекрасно проведёте время! Сауны Калининграда предлагают полный спектр услуг, включая парикмахерские, массаж и косметологию. Вы сможете побаловать своё тело и расслабить душу, что так важно в мире, наполненном суетой и стрессом. Сауна с бассейном поможет вам укрепить здоровье и уйти от привычной суеты забот и проблем. Запланируйте отдых, который принесёт вам радость и удовольствие. Сауна — идеальное место для общения с друзьями и семьёй. Здесь прекрасно сочетаются задушевная беседа и оздоровительные процедуры. Если вы хотите освежиться после парной, то сауна с бассейном — идеальный выбор. Здесь вы можете насладиться прекрасной парной и чудесным плаванием.

Наша сауна расположена в центре города и предлагает парковку, бассейны и отличные парные. Здесь вы можете попариться, выпить горячего травяного чая с мёдом или вареньем и поговорить по душам с друзьями и семьёй.

Научитесь расслабляться и отдыхать, ведь это так важно в современном мире!`,
      tags: ['Сауна', 'Сауны Калининграда с бассейном', 'бассейн', 'баня', 'Русская баня на дровах', 'сауна Калининград'],
      link: '#',
    },
    {
      id: '2',
      date: '24 октября 2013, 11:40',
      title: 'Самые яркие и незабываемые встречи друзей — в русских банях Калининграда',
      description: 'Современный образ жизни подразумевает, что вы работаете больше и отдыхаете меньше. Узнайте, как русские бани предлагают идеальное место для отдыха души и тела.',
      fullContent: `Если у вас есть возможность отдохнуть, лучший вариант — это поход в русскую баню. Именно это место т��к дорого русскому человеку. Жизнь бьёт ключом. Современный образ жизни устроен так, что вы работаете больше, а отдыхаете меньше. Что происходит в результате? А результат — это огромное количество стресса, усталости и нервных срывов. Вывод таков: своевременный отдых гарантирует хорошее здоровье и стальные нервы. Лучший отдых — это поход в баню. Это место, где собираются дорогие друзья и семья, где можно совместить общение с оздоровительными процедурами. Здесь можно погрузиться в атмосферу уюта, спокойствия и гармонии. Неудивительно, что на Руси в баню ходили с незапамятных времён. После трудного и напряжённого рабочего дня баня была способом восстановить жизненные силы. Времена прошли, но традиции остались. Почему бы не продолжить такие замечательные традиции?

Русские бани Калининграда предлагают возможность отдохнуть душой и телом. Здесь вы погрузитесь в атмосферу уюта и спокойствия. Для человека XXI века с постоянными заботами и тревогами возможность посетить сауны Калининграда и расслабиться просто на вес золота. Когда возникают жизненные трудности, лучший способ решить их — это ненадолго уйти от них, чтобы затем вернуться и решить их с новыми силами. Баня — это место, где ваш разум может по-настоящему отдохнуть. Позвольте себе немного расслабиться. Это точно не повредит!

Сауна имеет много преимуществ для здоровья. Она улучшает кровообращение, расслабляет уставшие мышцы, глубоко очищает кожу, повышает жизненный тонус, выводит токсины из организма и способствует крепкому сну.

Наша баня — это чудесный оздоровительный комплекс, где вы можете погрузиться в атмосферу уюта, покоя и полного расслабления. Это состояние души так ценно сегодня, в этом суетном и быстром мире. Устройте себе расслабляющие выходные с семьёй и друзьями, и вы можете сделать это у нас. Мы создадим атмосферу релаксации и спокойствия. Русские бани Калининграда — это ваш шанс расслабиться и зарядиться энергией! Современная жизнь бьёт ключом. Не позволяйте этой энергии переполнить вас; чтобы этого избежать, отдыхайте чаще.`,
      tags: ['Русские бани Калининграда'],
      link: '#',
    },
    {
      id: '3',
      date: '24 октября 2013, 11:29',
      title: 'Сауна — место, где душа и тело могут отдохнуть и набраться сил',
      description: 'Жизнь становится слишком динамичной и суетливой. Узнайте, как сауна может помочь вам восполнить энергию и улучшить настроение, выводя вредные токсины из организма.',
      fullContent: `Жизнь становится слишком динамичной и суетливой. И что мы видим в результате? Медицинские данные показывают увеличение числа инфарктов и нервных срывов. И всё это из-за переутомления, вызванного огромным объёмом работы. В современных реалиях трудно представить возможность отдыха. Но отдых — это именно то, что нужно в текущей ситуации. Что мы можем сделать?

Прежде всего, стоит на время забыть о своих проблемах и заботах и попытаться расслабиться. Сауна — это место, где можно восполнить энергию, улучшить настроение и просто отдохнуть душой и телом. Здесь можно погрузиться в атмосферу уюта, спокойствия и гармонии. Неудивительно, что на Руси в сауны ходили с незапамятных времён. После трудного и напряжённого рабочего дня сауна была способом восстановить энергию. Времена прошли, но традиции остались. Сегодня сауны переживают возрождение и невероятно популярны. Прежде всего, баня/сауна полезна для вашего здоровья. Потоотделение выводит вредные токсины из организма, что помогает очистить тело и кожу. Баня/сауна в Калининграде предлагает следующие преимущества:

• Улучшение кровообращения
• Расслабление уставших мышц
• Выведение токсинов из организма
• Глубокое очищение кожи
• Глубокий и спокойный сон

Если вы хотите повысить свою энергию и оставаться в форме, то сауна — это именно то, что вам нужно! Калининградская баня/сауна приглашает вас погрузиться в атмосферу спокойствия и уюта. Здесь вы можете насладиться аутентичной русской баней. Наслаждайтесь прекрасным парением с берёзовыми и дубовыми вениками. Они изготовлены в экологически чистых районах, вдали от промышленных объектов, автомагистралей и железных дорог. Наслаждайтесь атмосферой тепла, уюта и покоя! Сауна — это место, где ваше тело может обрести покой, а нервы могут расслабиться и восстановиться. Здесь у вас есть прекрасная возможность расслабиться с друзьями и семьёй. Наслаждайтесь радостью релаксации и спокойствия! Помните, своевременный отдых — это то, что позволяет вам полноценно функционировать в стремительном мире современной жизни.`,
      tags: ['баня сауна', 'сауна в Калининграде', 'баня Калининград', 'сауна'],
      link: '#',
    },
    {
      id: '4',
      date: '24 октября 2013, 11:14',
      title: 'Отличный способ расслабиться — это посещение калининградской бани',
      description: 'Отдых важен и необходим в современной ��изни. Узнайте, как посещение бани предлагает идеальный способ уйти от стресса и прекрасно провести время с друзьями и семьёй.',
      fullContent: `Отдых важен и необходим в реалиях современной жизни. Что мы имеем сегодня? Стресс, стресс и ещё раз стресс. Городская жизнь наполнена постоянными пробками, плохими экологическими условиями и разнообразным шумом. Как это может быть полезным для здоровья горожан? Скорее, это приносит с собой огромное количество переутомлённых людей, нервных срывов и вспышек гнева. В нынешней ситуации крайне важно найти место для полноценного отдыха. Люди — не машины, поэтому их запас топлива не продержится долго. Отличный способ уйти от жизненных проблем и неприятностей — это посещение бани. Сауна, очень древняя традиция на Руси, предлагает место для ��тдыха души и тела. Баня предлагает возможность провести время с друзьями и семьёй. Это отличный способ расслабиться и отдохнуть.

Калининград предлагает широкий выбор саун и бань. Вы можете выбрать любую сауну или баню в Калининграде в зависимости от того, где вы живёте или работаете. Однако бани, расположенные в центре города, имеют свои преимущества. Прежде всего, если вы планируете групповой отдых, лучше всего выбрать место, которое доступно для всех. Центр города легче всего достичь.

Когда возникают жизненные трудности, лучший способ решить их — это ненадолго уйти от них и вернуться, чтобы решить их с новыми силами. Сауна — идеальное место, чтобы буквально расслабить свой разум. Прилив энергии гарантирован!

Наша баня поможет вам расслабиться и отдохнуть полностью. Вас ждёт чудесная парная с натуральными берёзовыми и дубовыми вениками, изготовленными в экологически чистых районах региона. Побалуйте себя расслаблением! Оно гарантировано в таком чудесном и уютном месте, как баня.

Калининградская баня предлагает прекрасную возможность расслабиться и уйти от суеты жизни. Здесь ваши жизненные силы будут восстановлены. Вас ждёт атмосфера тепла, уюта и спокойствия. Мы придерживаемся традиций русской паровой бани! Позвольте себе спокойный и расслабляющий опыт. Ждём вас!`,
      tags: ['бани Калининграда', 'баня в Калининграде', 'сауны Калининграда', 'Калининградская баня'],
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FAF7F2] to-white">
      <Header 
        onNavigateToCareers={onNavigateToCareers}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToBlogs={() => {}} // Stay on current page
        onNavigateToHome={onNavigateToHome}
        showHomeButton={true}
        onBookSession={onBookSession}
        onNavigateToHomeWithScroll={onNavigateToHomeWithScroll}
        currentPage="blogs"
      />

      {/* Hero Section with Back Button */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-0 w-96 h-96 bg-[#D4A574]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#CBA35A]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              onClick={onNavigateToHome}
              variant="outline"
              className="border-2 border-[#D4A574] text-[#7A5C47] bg-transparent hover:bg-[#D4A574]/10 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Главная</span>
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FAF7F2] to-[#F5EFE6] rounded-full mb-4">
              <BookOpen className="w-5 h-5 text-[#CBA35A]" />
              <span className="text-[#7A5C47]">Будьте в курсе</span>
            </div>
            <h1 className="text-[#3D3226] mb-4">
              Новости и статьи
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] mx-auto rounded-full" />
            <p className="text-[#7A5C47] text-lg mt-6 max-w-3xl mx-auto">
              Будьте в курсе наших последних новостей и читайте статьи о традициях русской бани, отдыхе и здоровье.
            </p>
          </motion.div>

          {/* Tab Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg border border-[#E8DFD5]">
              <button
                onClick={() => setActiveTab('news')}
                className={`
                  relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300
                  ${activeTab === 'news' 
                    ? 'text-white' 
                    : 'text-[#7A5C47] hover:text-[#3D3226]'
                  }
                `}
              >
                {activeTab === 'news' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Newspaper className="w-5 h-5" />
                  <span className="text-base sm:text-lg">Новости</span>
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('articles')}
                className={`
                  relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300
                  ${activeTab === 'articles' 
                    ? 'text-white' 
                    : 'text-[#7A5C47] hover:text-[#3D3226]'
                  }
                `}
              >
                {activeTab === 'articles' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-base sm:text-lg">Статьи</span>
                </span>
              </button>
            </div>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {activeTab === 'news' ? (
              <motion.div
                key="news"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {newsItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E8DFD5] hover:border-[#D4A574]"
                  >
                    {/* Image (if exists) */}
                    {item.image && (
                      <div className="relative h-48 bg-gradient-to-br from-[#E8DFD5] to-[#F5EFE6] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.headline}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Date Badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FAF7F2] to-[#F5EFE6] flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-[#CBA35A]" />
                        </div>
                        <span className="text-sm text-[#7A5C47]">{item.date}</span>
                      </div>

                      {/* Headline */}
                      <h3 className="text-xl text-[#3D3226] mb-3 group-hover:text-[#CBA35A] transition-colors duration-300">
                        {item.headline}
                      </h3>

                      {/* Summary */}
                      <p className="text-[#7A5C47] leading-relaxed mb-4 line-clamp-3">
                        {item.summary}
                      </p>

                      {/* Read More Button */}
                      <Button
                        variant="ghost"
                        className="group/btn text-[#CBA35A] hover:text-[#D4A574] p-0 h-auto transition-all duration-300"
                        onClick={() => {
                          setSelectedNews(item);
                          setIsNewsModalOpen(true);
                        }}
                      >
                        <span>Читать далее</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="articles"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
              >
                {articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E8DFD5] hover:border-[#D4A574]"
                  >
                    {/* Optional Image Placeholder */}
                    {article.image && (
                      <div className="relative h-48 bg-gradient-to-br from-[#E8DFD5] to-[#F5EFE6] overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Date Badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FAF7F2] to-[#F5EFE6] flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-[#CBA35A]" />
                        </div>
                        <span className="text-sm text-[#7A5C47]">{article.date}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl text-[#3D3226] mb-3 group-hover:text-[#CBA35A] transition-colors duration-300 leading-tight">
                        {article.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[#7A5C47] leading-relaxed mb-4 line-clamp-3">
                        {article.description}
                      </p>

                      {/* Read More Button */}
                      <Button
                        variant="ghost"
                        className="group/btn text-[#CBA35A] hover:text-[#D4A574] p-0 h-auto transition-all duration-300"
                        onClick={() => {
                          setSelectedArticle(article);
                          setIsModalOpen(true);
                        }}
                      >
                        <span>Читать далее</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* News Modal */}
      <NewsModal
        isOpen={isNewsModalOpen}
        onClose={() => {
          setIsNewsModalOpen(false);
          setSelectedNews(null);
        }}
        news={selectedNews}
      />

      {/* Article Modal */}
      <ArticleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedArticle(null);
        }}
        article={selectedArticle}
      />
    </div>
  );
}
