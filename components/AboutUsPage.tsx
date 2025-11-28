'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Award, Heart, Sparkles, Users, Shield, FileCheck, ChevronRight } from 'lucide-react';
import { CertificateModal } from './about/CertificateModal';
import { Footer } from './Footer';

interface AboutUsPageProps {
  onNavigateToHome: () => void;
  onBookSession?: () => void;
  onNavigateToCareers?: () => void;
  onOpenLegalDoc?: (docType: 'offer' | 'privacy') => void;
}

export function AboutUsPage({ onNavigateToHome, onBookSession, onNavigateToCareers, onOpenLegalDoc }: AboutUsPageProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set document title for SEO
    document.title = 'О нас | Баня в Калининграде';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Узнайте о нашей бане, нашей миссии, истории и о том, что делает наш велнес-центр и банный опыт уникальными.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Узнайте о нашей бане, нашей миссии, истории и о том, что делает наш велнес-центр и банный опыт уникальными.';
      document.head.appendChild(meta);
    }

    // Scroll to top on mount
    window.scrollTo(0, 0);
    setTimeout(() => setIsVisible(true), 100);

    return () => {
      // Reset title when unmounting
      document.title = 'Баня в Калининграде | Премиум баня и велнес';
    };
  }, []);

  const timeline = [
    {
      year: '1971',
      title: 'Открытие',
      description: 'Открылась первая общественная баня в Калининграде. Место, где жители впервые получили возможность по-настоящему отдохнуть и восстановиться в жаркой парной.',
      icon: Sparkles,
    },
    {
      year: '1993',
      title: 'Коммерческое заведение',
      description: 'Баня стала коммерческим заведением и сохранила атмосферу, знакомую многим ещё со времён Советского Союза.',
      icon: Heart,
    },
    {
      year: '2008',
      title: 'Обновление',
      description: 'Сменилось руководство. Начались ремонтные работы и обновление помещений, чтобы сохранить дух традиций и поднять качество сервиса.',
      icon: Shield,
    },
    {
      year: '2021',
      title: 'Юбилей',
      description: 'Бане исполнилось 50 лет. Полвека тепла, пара и семейного отдыха.',
      icon: Award,
    },
    {
      year: '2026',
      title: 'Развитие традиций',
      description: 'Мы продолжаем традиции, учитываем пожелания гостей и движемся вперёд, чтобы баня оставалась тем самым местом, куда хочется возвращаться.',
      icon: ChevronRight,
    },
  ];

  const certificates = [
    {
      title: 'Сертификат охраны здоровья и безопасности',
      description: 'Сертифицировано Национальным управлением здравоохранения за соответствие всем стандартам безопасности и санитарии.',
      image: 'https://images.unsplash.com/photo-1637763723578-79a4ca9225f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNlcnRpZmljYXRlJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzYxOTI5MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      issueDate: '15 января 2024',
      validUntil: '15 января 2026',
    },
    {
      title: 'Соответствие пожарной безопасности',
      description: 'Одобрено пожарной службой со всеми мерами пожарной безопасности.',
      image: 'https://images.unsplash.com/photo-1637763723578-79a4ca9225f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNlcnRpZmljYXRlJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzYxOTI5MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      issueDate: '10 марта 2024',
      validUntil: '10 марта 2025',
    },
    {
      title: 'Бизнес-лицензия',
      description: 'Лицензирована для работы в качестве премиум-велнес и спа-центра.',
      image: 'https://images.unsplash.com/photo-1637763723578-79a4ca9225f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNlcnRpZmljYXRlJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzYxOTI5MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      issueDate: '1 ноября 2023',
      validUntil: '1 ноября 2025',
    },
    {
      title: 'Санитарное разрешение',
      description: 'Качество воды и стандарты санитарии проверены и одобрены.',
      image: 'https://images.unsplash.com/photo-1637763723578-79a4ca9225f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNlcnRpZmljYXRlJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzYxOTI5MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      issueDate: '20 февраля 2024',
      validUntil: '20 февраля 2026',
    },
  ];

  return (
    <>
      {/* Header with Home Button */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl text-[#3D3226]" style={{ fontFamily: 'Georgia, serif' }}>
            О нас
          </h1>
          <button
            onClick={onNavigateToHome}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF7F2] hover:bg-[#E8DFD5] transition-all duration-300 hover:scale-105"
          >
            <X className="w-5 h-5 text-[#7A5C47]" />
            <span className="text-[#7A5C47] text-sm">На главную</span>
          </button>
        </div>
      </div>

      {/* Full Page Content */}
      <div className="bg-white overflow-y-auto"
      >

            {/* Hero Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] to-white relative overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#CBA35A]/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4A574]/5 rounded-full blur-3xl" />

              <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[#3D3226] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                  Добро пожаловать в нашу баню
                </h2>
                <p className="text-lg sm:text-xl text-[#7A5C47] leading-relaxed max-w-3xl mx-auto">
                  Где древние традиции встречаются с современным комфортом. Мы создаём оазис 
                  спокойствия, аутентичные русские банные впечатления и уникальный опыт.
                </p>
              </div>
            </motion.section>

            {/* Our Story Timeline */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FAF7F2] relative overflow-hidden">
              {/* Animated Steam Effect */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#CBA35A]/10 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.1, 0.15, 0.1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                  }}
                  className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D4A574]/10 rounded-full blur-3xl"
                />
              </div>

              <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-3xl sm:text-4xl text-[#3D3226] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    Наша история
                  </h2>
                  <p className="text-[#7A5C47] text-lg max-w-2xl mx-auto">
                    Путешествие традиций и здоровья
                  </p>
                </motion.div>

                <div className="space-y-8">
                  {timeline.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                        className={`flex flex-col sm:flex-row items-center gap-6 ${
                          index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                        }`}
                      >
                        {/* Content */}
                        <div className={`flex-1 ${index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'} text-center sm:text-left`}>
                          <div className="inline-block px-4 py-1 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] text-white rounded-full text-sm mb-3">
                            {item.year}
                          </div>
                          <h3 className="text-2xl text-[#3D3226] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                            {item.title}
                          </h3>
                          <p className="text-[#7A5C47] leading-relaxed">{item.description}</p>
                        </div>

                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FAF7F2] to-[#E8DFD5] flex items-center justify-center shadow-lg">
                            <Icon className="w-8 h-8 text-[#CBA35A]" />
                          </div>
                        </div>

                        {/* Spacer for alignment */}
                        <div className="flex-1 hidden sm:block" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Articles Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl sm:text-4xl text-[#3D3226] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    Статьи о бане
                  </h2>
                  <p className="text-[#7A5C47] text-lg max-w-2xl mx-auto">
                    Полезная информация о пользе бани и велнеса
                  </p>
                </motion.div>

                <div className="space-y-8">
                  {/* Article 1 */}
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-2xl text-[#3D3226] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                      Сауны Калининграда – позвольте себе роскошный отдых за умеренную плату
                    </h3>
                    <p className="text-sm text-[#8B7761] mb-6">24 октября 2025, 11:43</p>
                    <div className="text-[#7A5C47] mb-6 leading-relaxed space-y-4">
                      <p>
                        Если вы ведете активный образ жизни, тогда вы знаете, что такое стрессы, переутомления, переживания и всплески раздражения. Всё это результат сложившихся современных реалий, где работа занимает первое место и вытесняет всё остальное. Так быть не должно. Организм человеческий устроен так, чтобы время от времени отдыхать и восстанавливать свои затраченные силы. Если вы желаете быть в тонусе и не болеть, тогда стоит задуматься над тем, чтобы в свой плотный график внести графу под названием "сауна". Именно это место позволит полностью восстановить затраченные силы и повысить настроение. Сауна известна из спокон веков на наших землях. В то давнее время пойти туда считалось честью и привилегией. Не каждый мог себе позволить такую роскошь. Как же мы должны быть рады, что сейчас такое мероприятие доступно всем. Желаете восстановить свои жизненные силы и зарядиться энергией? Тогда сауна именно такое место.
                      </p>
                      <p>
                        В Калининграде представлено огромное количество саун на любой вкус. Вы можете организовать свой досуг со своими друзьями или семьей. Поверьте, вы получите колоссальное удовольствие! Сауны Калининграда предлагают полный спектр услуг, который включают услуги парикмахера, массажиста, косметолога. Вы сможете привести в порядок своё тело и отдохнуть душой, что так важно в мире, наполненном суетой и стрессами. Посредством сауны с бассейном вы сможете оздоровиться и уйти от привычных суетливых забот и хлопот. Организуйте для себя отдых, который принесет немало радости и удовольствия вам. Сауна – идеальное место для общения с друзьями и семьей. Здесь отлично совмещается задушевное общение и оздоровительные процедуры. Если вы желаете после парения освежиться, то тогда вам стоит посетить сауны с бассейном. Здесь вы сможете отлично попариться, и замечательно поплавать.
                      </p>
                      <p>
                        Наша сауна расположена в центре города, имеет место для парковки, бассейны и отличные места для того, чтобы попариться. Здесь вы сможете и попариться, и выпить горячего травяного чая с медом или вареньем, и задушевно пообщаться с друзьями и своей семьей.
                      </p>
                      <p>
                        Умейте расслабляться и отдыхать, ведь это так важно в реалиях современности!
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E8DFD5]">
                      <span className="text-xs text-[#8B7761]">Сауна,</span>
                      <span className="text-xs text-[#8B7761]">сауны Калининграда с бассейном,</span>
                      <span className="text-xs text-[#8B7761]">бассейн,</span>
                      <span className="text-xs text-[#8B7761]">баня,</span>
                      <span className="text-xs text-[#8B7761]">русская баня на дровах,</span>
                      <span className="text-xs text-[#8B7761]">сауна Калининград</span>
                    </div>
                  </motion.article>

                  {/* Article 2 */}
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-2xl text-[#3D3226] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                      Самые яркие и незабываемые встречи друзей – в русских банях Калининграда
                    </h3>
                    <p className="text-sm text-[#8B7761] mb-6">24 октября 2025, 11:40</p>
                    <div className="text-[#7A5C47] mb-6 leading-relaxed space-y-4">
                      <p>
                        Если есть возможность организовать отдых, то наилучший вариант – поход в русскую сауну. Это именно то место, которое так любо дорого русскому человеку. Жизнь бьет своим ключом. Современный лад устроен так, что больше работаешь, меньше отдыхаешь. Что получается в итоге? А в итоге огромное количество стрессов, переутомления, нервных расстройств. Вывод напрашивается такой: своевременный отдых гарантирует крепкое здоровье и железные нервы. Лучшим отдыхом станет поход в сауну. Это место, где собираются любимые друзья и родственник, где общение можно сочетать с оздоровительными процедурами. Именно здесь вы сможете окунуться в атмосферу уюта, спокойствия и гармонии. Недаром из спокон веков люди на Руси ходили в сауну. После трудного и тяжелого рабочего дня сауна была возможностью восстановить свои жизненные силы. Времена прошли, а традиции остались. Почему бы не продолжить такие замечательные традиции?
                      </p>
                      <p>
                        Русские бани Калининграда дают возможность отдохнуть душой и телом. Здесь вы окунетесь в атмосферу уюта и спокойствия. Для человека двадцать первого столетия с его постоянными заботами и беспокойствами, такая возможность посетить сауны Калининграда и отдохнуть просто на вес золота. Когда возникают трудности в жизни, то лучший способ их решить, это уйти от проблемы на время, чтобы вернувшись решить ее с новыми силами. Именно баня представляет собой то место, где ваши мозги смогут расслабиться в прямом смысле этого слова. Позвольте себе немного релакса. Он вам точно не повредит!
                      </p>
                      <p>
                        Сауна очень полезна для здоровья. Она улучшает циркуляцию крови, расслабляет уставшие мышцы, глубоко очищает кожу, увеличивает жизненный тонус, выводит шлаки из организма, укрепляет сон.
                      </p>
                      <p>
                        Наша баня представляет собой замечательный оздоровительный комплекс, где вы сможете окунуться в атмосферу уюта, покоя и полного отдыха. Именно такое состояние очень ценно сейчас, в эпоху суетливой и динамичной жизни. Устройте себе выходной в кругу родных и близких, а сделать это можно у нас. Мы создадим вам атмосферу релакса и успокоения. Русские бани Калининграда – это ваш шанс отдохнуть и восстановить затраченные силы! Современная жизнь бьет полным ключом. Смотрите, чтобы этот ключ не забил вас, а во избежание этого чаще отдыхайте.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E8DFD5]">
                      <span className="text-xs text-[#8B7761]">русские бани Калининграда</span>
                    </div>
                  </motion.article>

                  {/* Article 3 */}
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.0, duration: 0.6 }}
                    className="bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-2xl text-[#3D3226] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                      Сауна – место, где отдыхают и набираются сил душа и тело
                    </h3>
                    <p className="text-sm text-[#8B7761] mb-6">24 октября 2025, 11:29</p>
                    <div className="text-[#7A5C47] mb-6 leading-relaxed space-y-4">
                      <p>
                        Жизнь развивается чересчур динамично и оживленно. И что мы видим в итоге? Медицинские данные свидетельствуют об увеличении количества сердечных приступов и нервных потрясений. И всё это происходит по причине переутомлений, вызванных огромным количеством работы. В современных реалиях сложно представить себе возможность отдохнуть. Однако именно отдых и необходим в сложившейся ситуации. Как же быть?
                      </p>
                      <p>
                        Прежде всего, стоит немного забыть о проблемах и невзгодах и попробовать отдохнуть. Местом, где вы пополните свои жизненные силы, повысите настроение и просто отдохнете душой и телом, станет сауна. Именно здесь вы сможете окунуться в атмосферу уюта, спокойствия и гармонии. Недаром из спокон веков люди на Руси ходили в сауну. После трудного и тяжелого рабочего дня сауна была возможностью восстановить свои жизненные силы. Времена прошли, а традиции остались. Сейчас сауны получили свое второе рождение, и пользуются необычайной популярностью. Прежде всего, баня/сауна полезна для здоровья. Посредством пота из организма выходят вредные токсины, что позволяет очистить организм и кожу. Баня/сауна в Калининграде дает следующие возможности:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>улучшить циркуляцию крови;</li>
                        <li>расслабить уставшие мышцы;</li>
                        <li>вывести шлаки из организма;</li>
                        <li>глубоко очистить кожу;</li>
                        <li>глубокий и спокойный сон.</li>
                      </ul>
                      <p>
                        Если вы желаете укрепить свои жизненные силы и пребывать в тонусе, тогда сауна именно то, что вам нужно! Баня/сауна Калининград предлагает вам окунуться в атмосферу спокойствия и уюта. Здесь вы сможете насладиться настоящей русской сауной. Отлично попариться вы сможете с помощью березовых и дубовых веников. Они изготовлены в экологически чистых местах, вдали от промышленных объектов, автомобильных и железных дорог. Вкусите атмосферу тепла, уюта и покоя! Сауна – это место, где вы найдете покой вашему телу, а ваши нервы смогут расслабиться и восстановить свои силы. Здесь у вас есть замечательная возможность отдохнуть в кругу друзей и семьи. Вкусите радость отдыха и спокойствия! Помните, что именно своевременный отдых позволит вам полноценно работать в условиях динамики современной жизни.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E8DFD5]">
                      <span className="text-xs text-[#8B7761]">баня сауна,</span>
                      <span className="text-xs text-[#8B7761]">сауна в Калининграде,</span>
                      <span className="text-xs text-[#8B7761]">баня Калининград,</span>
                      <span className="text-xs text-[#8B7761]">сауна</span>
                    </div>
                  </motion.article>

                  {/* Article 4 */}
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-2xl text-[#3D3226] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                      Отличный способ отдохнуть – сходить в баню Калининграда
                    </h3>
                    <p className="text-sm text-[#8B7761] mb-6">24 октября 2025, 11:14</p>
                    <div className="text-[#7A5C47] mb-6 leading-relaxed space-y-4">
                      <p>
                        Отдых важен и он требуется в реалиях современной жизни. Что мы имеем на сегодняшний день? Стрессы, стрессы, и еще раз стрессы. Городская жизнь проходит в условиях постоянных транспортных пробок, плохой экологии и в различном шуме. Разве это может принести пользу для здоровья горожан? Скорее это несет огромное количество переутомлений, нервных срывов и выплески раздражения. В сложившейся ситуации стоит найти место для полноценного отдыха. Люди не машины, потому жизненного топлива им не хватит надолго. Отличный вариантом уйти от жизненных проблем и невзгод – поход в баню. Древнейшая традиция на Руси состоит именно в сауне, где можно отдохнуть и душой, и телом. Баня дает возможность провести время в компании друзей и своей семьи. Это отличный способ отдохнуть и расслабиться.
                      </p>
                      <p>
                        Бани в Калининграде представлены в огромном количестве. Вы можете выбрать любую сауну или баню Калининград в зависимости от места вашего жительства или работы. Однако бани, находящиеся в центре города, имеют свои преимущества. Прежде всего, если вы собираетесь собраться с компанией, то лучше выбрать место, подходящее для всех, чтобы каждый смог туда добраться. А именно в центральную часть города доехать проще всего.
                      </p>
                      <p>
                        Когда возникают трудности в жизни, то лучший способ их решить, это уйти от проблемы на время, чтобы вернувшись решить ее с новыми силами. Именно баня представляет собой то место, где ваши мозги смогут расслабиться в прямом смысле этого слова. Прилив сил вам обеспечен!
                      </p>
                      <p>
                        Наша баня поможет вам расслабиться и отдохнуть в полной мере. Вас ожидает отличная парилка с натуральными березовыми и дубовыми вениками, изготавливаемые в экологически чистых местах области. Подарите себе отдых! Он точно обеспечен в таком замечательном и уютном месте как баня.
                      </p>
                      <p>
                        Баня Калининград дает отличную возможность расслабиться, уйти от суеты и переживаний. Именно здесь ваши жизненные силы будут восстановлены. Вас ожидает атмосфера тепла, уюта и спокойствия. Мы придерживаемся русских традиций парения! Подарите себе возможность отдохнуть тихо и спокойно. Ждем вас!
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E8DFD5]">
                      <span className="text-xs text-[#8B7761]">бани Калининграда,</span>
                      <span className="text-xs text-[#8B7761]">баня в Калининграде,</span>
                      <span className="text-xs text-[#8B7761]">сауны Калининграда,</span>
                      <span className="text-xs text-[#8B7761]">баня Калининград</span>
                    </div>
                  </motion.article>
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FAF7F2]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <h2 className="text-3xl sm:text-4xl text-[#3D3226] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                  Готовы посетить нашу баню?
                </h2>
                <p className="text-[#7A5C47] text-lg mb-8 max-w-2xl mx-auto">
                  Присоединяйтесь к нашему сообществу любителей здоровья и откройте для себя преобразующую силу аутентичной банной терапии.
                </p>
                <motion.button
                  onClick={() => {
                    onBookSession?.();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Забронировать баню</span>
                  <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </motion.div>
            </section>
      </div>

      {/* Footer */}
      <Footer 
        onNavigateToCareers={onNavigateToCareers}
        onOpenLegalDoc={onOpenLegalDoc}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
        certificate={selectedCertificate}
      />
    </>
  );
}
