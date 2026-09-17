import React, { useState, useEffect, useRef } from 'react';
import { useClubData } from '../context/ClubDataContext';
import { 
  Bot, 
  Send, 
  X, 
  MessageSquare, 
  Sparkles, 
  Trash2, 
  ArrowRight, 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  Phone,
  HelpCircle,
  Trophy
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  action?: {
    label: string;
    sectionId?: string;
    url?: string;
  };
  timestamp: string;
}

// Global dispatcher to open the bot from anywhere
export const openClubBot = (initialQuestion?: string) => {
  window.dispatchEvent(
    new CustomEvent('open-club-bot', { detail: { question: initialQuestion } })
  );
};

export const ClubAssistantBot: React.FC = () => {
  const { clubInfo, categories, matches, membershipPlans } = useClubData();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `¡Hola! 👋 Soy el asistente virtual del **Club Meridiano V°**.\n\nEstoy preparado para resolver tus dudas sobre **cómo asociarte**, **categorías de básquet**, **horarios de práctica**, **requisitos** y más. ¿En qué puedo ayudarte hoy?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Frequent questions chips
  const frequentQuestions = [
    {
      id: 'faq-asociarme',
      label: '📝 ¿Cómo puedo asociarme?',
      icon: CreditCard,
      question: '¿Cómo puedo asociarme al club y cuánto cuesta la cuota?'
    },
    {
      id: 'faq-categorias',
      label: '🏀 ¿Qué categorías de básquet hay?',
      icon: Users,
      question: '¿Qué categorías de básquet hay en el club?'
    },
    {
      id: 'faq-horarios',
      label: '⏰ ¿Cuáles son los días y horarios de práctica?',
      icon: Clock,
      question: '¿Cuáles son los días y horarios de entrenamiento de cada categoría?'
    },
    {
      id: 'faq-requisitos',
      label: '📋 ¿Requisitos para empezar a jugar?',
      icon: CheckCircle2,
      question: '¿Cuáles son los requisitos para comenzar a jugar al básquet?'
    },
    {
      id: 'faq-ubicacion',
      label: '📍 ¿Dónde queda la sede?',
      icon: MapPin,
      question: '¿Dónde queda el club y cómo llegar?'
    },
    {
      id: 'faq-partidos',
      label: '🏆 ¿Cuándo juega la Primera División?',
      icon: Trophy,
      question: '¿Cuándo son los próximos partidos del club?'
    },
    {
      id: 'faq-contacto',
      label: '📞 ¿Cómo contacto a secretaría?',
      icon: Phone,
      question: '¿Cuáles son los canales de contacto de la secretaría?'
    }
  ];

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Global event listener to open bot from anywhere
  useEffect(() => {
    const handleOpenEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ question?: string }>;
      setIsOpen(true);
      if (customEvent.detail?.question) {
        handleUserSend(customEvent.detail.question);
      }
    };

    window.addEventListener('open-club-bot', handleOpenEvent);
    return () => window.removeEventListener('open-club-bot', handleOpenEvent);
  }, [categories, clubInfo, matches, membershipPlans]);

  // Navigation handler
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    // On small screens, close the chat modal when navigating
    if (window.innerWidth < 640) {
      setIsOpen(false);
    }
  };

  // Bot Knowledge Engine (Uses live data from context)
  const generateBotAnswer = (query: string): { text: string; action?: ChatMessage['action'] } => {
    const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // 1. Cómo asociarse / Planes de socios / Cuota
    if (
      q.includes('asociar') || 
      q.includes('socio') || 
      q.includes('cuota') || 
      q.includes('precio') || 
      q.includes('costo') || 
      q.includes('arancel') || 
      q.includes('plan')
    ) {
      let plansText = membershipPlans.map(plan => 
        `• **${plan.name}**: $${plan.monthlyFee}/mes\n  ${plan.description}\n  *Beneficios:* ${plan.benefits.slice(0, 2).join(', ')}.`
      ).join('\n\n');

      return {
        text: `Para asociarte al **Club Meridiano V°** podés completar la solicitud online en esta web. Contamos con los siguientes planes sociales:\n\n${plansText}\n\nUna vez enviado el formulario, administración se pondrá en contacto para coordinar el alta y entrega de tu carnet social.`,
        action: {
          label: 'Ir al formulario de inscripción',
          sectionId: 'asociate'
        }
      };
    }

    // 2. Categorías de básquet
    if (
      q.includes('categoria') || 
      q.includes('equipo') || 
      q.includes('edades') || 
      q.includes('chicos') || 
      q.includes('nenes') || 
      q.includes('femenino') || 
      q.includes('mini') || 
      q.includes('escuelita') ||
      q.includes('u13') || 
      q.includes('u15') || 
      q.includes('u17') || 
      q.includes('u21')
    ) {
      const catList = categories.map(cat => 
        `• **${cat.name}** (${cat.ageGroup})\n  DT: ${cat.coach} | ${cat.trainingSchedule.days}`
      ).join('\n\n');

      return {
        text: `El club cuenta con una tira completa de básquet formativo y competitivo:\n\n${catList}\n\nEn la sección **Nuestros Equipos** podés ver los planteles completos, fotos y cuerpo técnico de cada división.`,
        action: {
          label: 'Ver sección Nuestros Equipos',
          sectionId: 'equipos'
        }
      };
    }

    // 3. Días y Horarios de práctica
    if (
      q.includes('horario') || 
      q.includes('dias') || 
      q.includes('hora') || 
      q.includes('practica') || 
      q.includes('entrena')
    ) {
      const scheduleList = categories.map(cat => 
        `• **${cat.name}**:\n  🗓️ ${cat.trainingSchedule.days}\n  ⏰ ${cat.trainingSchedule.time}\n  📍 ${cat.trainingSchedule.court}`
      ).join('\n\n');

      return {
        text: `Estos son los días y horarios oficiales de entrenamiento en nuestras instalaciones:\n\n${scheduleList}\n\n*Nota:* Se recomienda llegar 10 minutos antes del horario fijado con ropa deportiva.`,
        action: {
          label: 'Consultar categorías',
          sectionId: 'equipos'
        }
      };
    }

    // 4. Requisitos para comenzar a jugar
    if (
      q.includes('requisito') || 
      q.includes('empezar') || 
      q.includes('comenzar') || 
      q.includes('arrancar') || 
      q.includes('prueba') || 
      q.includes('apto') || 
      q.includes('medico')
    ) {
      return {
        text: `Los requisitos básicos para comenzar a jugar en **Meridiano V°** son:\n\n1. **Apto Físico Médico:** Certificado médico de salud extendido por clínico o pediatra habilitante para actividad deportiva.\n2. **Ropa Deportiva & Calzado:** Indumentaria cómoda y zapatillas deportivas con suela limpia para piso de madera parquet.\n3. **Botella de Hidratación:** Es obligatorio que cada deportista traiga su propia botella de agua.\n4. **Clase de Prueba Gratuita:** ¡No es necesario tener experiencia previa! Podés venir a entrenar y conocer al equipo en tu primera semana sin cargo.`,
        action: {
          label: 'Ver sección Sumate a Jugar',
          sectionId: 'sumate'
        }
      };
    }

    // 5. Ubicación / Sede / Dirección
    if (
      q.includes('donde') || 
      q.includes('direccion') || 
      q.includes('ubicacion') || 
      q.includes('llegar') || 
      q.includes('sede') || 
      q.includes('calle') || 
      q.includes('mapa')
    ) {
      return {
        text: `Nuestra sede social y deportiva está ubicada en pleno corazón del histórico barrio de la estación:\n\n📍 **Dirección:** ${clubInfo.address}\n🏙️ **Ciudad:** ${clubInfo.city}\n🏟️ **Instalaciones:** Microestadio Principal de Parquet y Gimnasio Auxiliar formativo.\n📞 **Teléfono:** ${clubInfo.phone}`,
        action: {
          label: 'Ver mapa y ubicación',
          sectionId: 'contacto'
        }
      };
    }

    // 6. Próximos partidos / Fixture / Primera división
    if (
      q.includes('partido') || 
      q.includes('juega') || 
      q.includes('fixture') || 
      q.includes('fecha') || 
      q.includes('proximo') || 
      q.includes('cancha') || 
      q.includes('torneo')
    ) {
      const upcoming = matches.filter(m => !m.isFinished);
      if (upcoming.length > 0) {
        const nextGames = upcoming.slice(0, 3).map(m => 
          `• **${m.category}** vs **${m.awayTeam === clubInfo.name ? m.homeTeam : m.awayTeam}**\n  📅 ${m.date} a las ${m.time} hs\n  🏟️ ${m.court} (${m.isLocal ? 'Local' : 'Visitante'})\n  ${m.summary ? `*${m.summary}*` : ''}`
        ).join('\n\n');

        return {
          text: `Estos son los próximos encuentros programados:\n\n${nextGames}`,
          action: {
            label: 'Ver noticias del club',
            sectionId: 'noticias'
          }
        };
      }
      return {
        text: `Actualmente el fixture se encuentra en actualización para la próxima fecha de la Asociación Platense de Básquetbol (APB). En cuanto se confirmen los horarios oficiales los verás publicados en las noticias del club.`,
        action: {
          label: 'Ver noticias',
          sectionId: 'noticias'
        }
      };
    }

    // 7. Autoridades del club
    if (
      q.includes('autoridad') || 
      q.includes('presidente') || 
      q.includes('comision') || 
      q.includes('directiva')
    ) {
      const authList = clubInfo.authorities.map(a => `• **${a.role}:** ${a.name}`).join('\n');
      return {
        text: `Comisión Directiva y Autoridades de **Club Meridiano V°**:\n\n${authList}`,
        action: {
          label: 'Ver historia del club',
          sectionId: 'el-club'
        }
      };
    }

    // 8. Contacto / Secretaría / WhatsApp
    if (
      q.includes('contacto') || 
      q.includes('telefono') || 
      q.includes('mail') || 
      q.includes('email') || 
      q.includes('whatsapp') || 
      q.includes('mensaje') || 
      q.includes('secretaria')
    ) {
      return {
        text: `Podés comunicarte con el club a través de los siguientes canales oficiales:\n\n📱 **WhatsApp:** +${clubInfo.whatsapp}\n📞 **Teléfono Sede:** ${clubInfo.phone}\n✉️ **Correo Electrónico:** ${clubInfo.email}\n📍 **Sede:** ${clubInfo.address}\n\nSi necesitás atención personalizada con secretaría o coordinación deportiva, podés escribirnos por WhatsApp:`,
        action: {
          label: 'Abrir WhatsApp oficial',
          url: `https://wa.me/${clubInfo.whatsapp}?text=${encodeURIComponent('Hola Club Meridiano V°, me comunico desde la web para realizar una consulta.')}`
        }
      };
    }

    // 9. Historia del club
    if (
      q.includes('historia') || 
      q.includes('fundacion') || 
      q.includes('fundado') || 
      q.includes('año') || 
      q.includes('biblioteca')
    ) {
      return {
        text: `**${clubInfo.legalName}** fue fundado el **${clubInfo.foundationDate}** por vecinos del Barrio Sud de La Plata luego de una primera reunión el 8 de junio de 1928.\n\nA lo largo de casi un siglo, el club formó a miles de jóvenes deportistas en el básquetbol platense, manteniendo además viva la Biblioteca Popular y la cantina familiar del barrio.`,
        action: {
          label: 'Leer historia completa',
          sectionId: 'el-club'
        }
      };
    }

    // Default friendly response
    return {
      text: `¡Gracias por tu consulta! En el Club Meridiano V° ofrecemos:\n\n• **Básquetbol formativo y competitivo** desde los 4 años hasta Primera División.\n• **Inscripción de socios** con planes accesibles y múltiples beneficios.\n• **Clase de prueba gratis** para conocer al equipo y al entrenador.\n\nPodés elegir una de las preguntas sugeridas arriba o escribirnos directamente por WhatsApp si necesitás hablar con secretaría.`,
      action: {
        label: 'Ir a Asociarse',
        sectionId: 'asociate'
      }
    };
  };

  const handleUserSend = (textToSend?: string) => {
    const question = (textToSend || inputValue).trim();
    if (!question) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate natural thinking delay
    setTimeout(() => {
      const answer = generateBotAnswer(question);
      const botMsg: ChatMessage = {
        id: 'msg-bot-' + Date.now(),
        sender: 'bot',
        text: answer.text,
        action: answer.action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: `Conversación reiniciada. ¿En qué duda puedo orientarte sobre el **Club Meridiano V°**?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button (Replaces the raw WhatsApp button) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-end gap-3 pointer-events-auto">
        {/* Tooltip hint when closed */}
        {!isOpen && hasUnread && (
          <div 
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hidden sm:flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-slate-900/95 border border-emerald-500/40 text-slate-100 text-xs shadow-2xl backdrop-blur animate-in fade-in slide-in-from-bottom-2 duration-300 hover:border-emerald-400 group"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform shrink-0" />
            <div>
              <p className="font-bold text-white leading-tight">¿Dudas sobre el club?</p>
              <p className="text-[11px] text-slate-300">Consultale a nuestro Asistente Virtual</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHasUnread(false);
              }}
              className="text-slate-400 hover:text-white p-0.5 rounded ml-1"
              aria-label="Cerrar sugerencia"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Floating Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 flex items-center justify-center focus:outline-none ${
            isOpen 
              ? 'bg-slate-800 text-white rotate-90 border border-slate-700' 
              : 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-400 hover:to-emerald-500 text-white hover:scale-105 shadow-emerald-600/40 ring-4 ring-emerald-500/20'
          }`}
          aria-label={isOpen ? "Cerrar Asistente Virtual" : "Abrir Asistente Virtual del Club"}
        >
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-slate-950" />
            </span>
          )}
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Bot className="w-6 h-6 sm:w-7 sm:h-7" />
          )}
        </button>
      </div>

      {/* Floating Chat Window Modal / Widget */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[420px] max-h-[85vh] h-[640px] flex flex-col bg-slate-950 border border-emerald-950/80 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-emerald-500/20">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-600/30 text-white font-bold">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-300 border-2 border-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading font-black text-sm text-white tracking-wide uppercase">
                    Asistente Meridiano V°
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    BOT
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  En línea · Respuestas con información oficial
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                title="Reiniciar chat"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Reiniciar conversación"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Cerrar asistente"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick FAQ Pills Bar */}
          <div className="px-3.5 py-2.5 bg-slate-900/90 border-b border-slate-800/80 overflow-x-auto scrollbar-none flex gap-1.5 shrink-0">
            {frequentQuestions.slice(0, 4).map((faq) => (
              <button
                key={faq.id}
                onClick={() => handleUserSend(faq.question)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 hover:bg-emerald-600/30 text-slate-200 hover:text-emerald-300 text-[11px] font-semibold border border-slate-700 hover:border-emerald-500/40 transition-colors shrink-0"
              >
                {faq.label}
              </button>
            ))}
          </div>

          {/* Message Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950 text-slate-200 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-emerald-600/25 border border-emerald-500/40 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3.5 shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}>
                  <div className="whitespace-pre-line leading-relaxed">
                    {msg.text}
                  </div>

                  {/* Interactive Action Button inside message */}
                  {msg.action && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-2">
                      {msg.action.sectionId && (
                        <button
                          onClick={() => handleNavigate(msg.action!.sectionId!)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-colors"
                        >
                          <span>{msg.action.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {msg.action.url && (
                        <a
                          href={msg.action.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{msg.action.label}</span>
                        </a>
                      )}
                    </div>
                  )}

                  <span className={`block text-[9px] mt-1.5 ${
                    msg.sender === 'user' ? 'text-emerald-100 text-right' : 'text-slate-400 text-left'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
                <div className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="flex gap-1 items-center px-3 py-2 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Selection Drawer at the bottom */}
          <div className="p-2.5 bg-slate-900/60 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mb-1.5 px-1">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Preguntas frecuentes:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {frequentQuestions.map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => handleUserSend(faq.question)}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-emerald-600/20 text-slate-300 hover:text-emerald-300 text-[11px] border border-slate-800 hover:border-emerald-500/40 transition-colors text-left"
                >
                  {faq.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Input Footer */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 shrink-0">
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-2xl px-3 py-2 focus-within:border-emerald-500 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribí tu pregunta sobre el club..."
                className="flex-1 bg-transparent text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => handleUserSend()}
                disabled={!inputValue.trim()}
                className={`p-2 rounded-xl transition-all ${
                  inputValue.trim()
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer active:scale-95 shadow-md shadow-emerald-600/30'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
                aria-label="Enviar pregunta"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
