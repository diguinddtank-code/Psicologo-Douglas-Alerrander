import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, Variants } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Heart, 
  Briefcase, 
  Users, 
  MessageCircle, 
  Quote,
  Brain,
  Sparkles,
  Puzzle,
  Leaf,
  Loader2,
  XCircle,
  ArrowDown,
  Instagram,
  ExternalLink,
  CalendarCheck,
  CheckCircle2,
  HelpCircle,
  Zap,
  Anchor,
  Compass,
  Shield,
  BatteryWarning,
  HeartHandshake,
  MoveRight,
  ChevronRight,
  Plus
} from 'lucide-react';

// --- Types & Interfaces ---

interface Testimonial {
  id: number;
  text: string;
  author: string;
}

interface FeelingDetail {
  title: string;
  description: string;
  guidance: string;
}

// --- Constants ---

const WHATSAPP_NUMBER = "5561991973167";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const INSTAGRAM_URL = "https://www.instagram.com/psidouglasalerrander/";

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: "A abordagem do Douglas mudou minha carreira. Aprendi a gerenciar meu estresse e focar no que realmente importa.",
    author: "Cliente de Mentoria de Carreira"
  },
  {
    id: 2,
    text: "Me sinto mais leve nas minhas relações. O processo foi acolhedor e muito prático desde o primeiro dia.",
    author: "Paciente de Terapia Individual"
  },
  {
    id: 3,
    text: "Eu estava estagnado, sem entender meus próprios sentimentos. O Douglas me ajudou a organizar a mente.",
    author: "Paciente Online"
  }
];

const FEELINGS_DATA: FeelingDetail[] = [
  {
    title: "Ansiedade excessiva no trabalho",
    description: "A sensação de estar sempre 'ligado', o medo de falhar ou a pressão por produtividade podem paralisar.",
    guidance: "Na terapia, identificamos os gatilhos e construímos estratégias de regulação emocional para que você produza com saúde, não com sofrimento."
  },
  {
    title: "Dificuldade nos relacionamentos",
    description: "Repetir padrões dolorosos, dificuldade em se comunicar ou sentir-se incompreendido por quem ama.",
    guidance: "Trabalhamos habilidades sociais e assertividade para que você possa estabelecer limites saudáveis e construir vínculos mais profundos."
  },
  {
    title: "Sensação de estar estagnado",
    description: "A vida parece estar em pausa. Você vê os outros avançando, mas sente que seus pés estão presos no concreto.",
    guidance: "Investigamos as crenças limitantes que te impedem de agir e criamos um plano comportamental gradual para destravar seu potencial."
  },
  {
    title: "Falta de propósito",
    description: "Acordar e fazer tudo no 'piloto automático', sem sentir conexão real com suas escolhas ou futuro.",
    guidance: "Utilizamos ferramentas de valores para redescobrir o que realmente importa para você e realinhar sua bússola interna."
  },
  {
    title: "Dificuldade em dizer 'não'",
    description: "Colocar a necessidade dos outros sempre à frente das suas, gerando ressentimento e exaustão.",
    guidance: "Aprender a dizer não é um ato de autorespeito. Fortalecemos sua autoestima para que suas escolhas reflitam suas vontades."
  },
  {
    title: "Desgaste emocional constante",
    description: "Um cansaço que não passa com o sono. Uma exaustão da alma, onde tudo parece exigir um esforço hercúleo.",
    guidance: "Focamos em autocuidado real e reestruturação da rotina para devolver sua vitalidade e equilibrar sua energia mental."
  }
];

// Helper to get icon for feeling
const getFeelingIcon = (index: number) => {
  const icons = [
    <Briefcase className="w-4 h-4 md:w-5 md:h-5" />, 
    <HeartHandshake className="w-4 h-4 md:w-5 md:h-5" />, 
    <Anchor className="w-4 h-4 md:w-5 md:h-5" />, 
    <Compass className="w-4 h-4 md:w-5 md:h-5" />, 
    <Shield className="w-4 h-4 md:w-5 md:h-5" />, 
    <BatteryWarning className="w-4 h-4 md:w-5 md:h-5" />
  ];
  return icons[index] || <Sparkles className="w-4 h-4 md:w-5 md:h-5" />;
};

// --- Sub-Components ---

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}

const FadeInView: React.FC<FadeInViewProps> = ({ children, delay = 0, className = "", direction = 'up' }) => {
  const initial = direction === 'up' ? { y: 40 } : direction === 'left' ? { x: -40 } : { x: 40 };
  
  return (
    <motion.div
      initial={{ opacity: 0, ...initial }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} 
      className={className}
    >
      {children}
    </motion.div>
  );
};

// New Component for smoother section transitions on Desktop
const SectionSeparator = () => (
  <div className="hidden md:block w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent opacity-50 my-0" />
);

// --- NAVBAR ---
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "O Método", href: "#metodo" },
    { name: "Sobre Mim", href: "#sobre" },
    { name: "Depoimentos", href: "#depoimentos" },
  ];

  const headerClass = isScrolled 
    ? "bg-white/80 backdrop-blur-xl border-b border-stone-200/50 py-3 shadow-sm"
    : "bg-transparent py-5 md:py-6";

  const textColorClass = isScrolled
    ? "text-stone-900"
    : "text-white md:text-stone-900"; 
  
  const logoBgClass = isScrolled
    ? "bg-stone-900 text-white"
    : "bg-white text-stone-900 md:bg-stone-900 md:text-white"; 

  const logoTextClass = isScrolled 
    ? "text-stone-900"
    : "text-white md:text-stone-900";

  const ctaButtonClass = isScrolled
    ? "bg-stone-900 text-white hover:bg-stone-800"
    : "bg-white text-stone-900 md:bg-stone-900 md:text-white hover:bg-stone-100 md:hover:bg-stone-800";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${headerClass}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group shrink-0 relative z-50">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-serif italic text-lg transition-colors duration-500 ${logoBgClass}`}>
              D
            </div>
            <span className={`hidden md:block font-serif text-lg font-medium tracking-tight transition-colors duration-500 ${logoTextClass}`}>
              Douglas Alerrander
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-xs font-bold tracking-widest uppercase hover:underline underline-offset-4 decoration-sage-500 transition-colors duration-500 ${textColorClass}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action & Mobile Toggle */}
          <div className="flex items-center gap-2 md:gap-3">
             <a 
              href="#insight"
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide border transition-all duration-500 ${
                  isScrolled 
                  ? "bg-sage-50 text-sage-800 border-sage-100" 
                  : "bg-white/10 backdrop-blur-sm text-white border-white/20 md:text-sage-800 md:bg-sage-50 md:border-sage-100"
              }`}
            >
              <Sparkles size={14} />
              <span className="hidden lg:inline">IA Insight</span>
            </a>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2.5 text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300 shadow-lg ${ctaButtonClass}`}
            >
              Agendar
            </a>
            <button 
                className={`md:hidden p-2 transition-colors duration-500 ${textColorClass}`} 
                onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-stone-50 fixed inset-0 z-40 overflow-hidden pt-24"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-sage-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex flex-col p-8 space-y-8 items-center justify-center h-full pb-32 relative z-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-stone-800 text-3xl font-serif italic"
                >
                  {link.name}
                </a>
              ))}
               <a 
                  href="#insight" 
                  onClick={() => setIsOpen(false)}
                  className="text-sage-700 text-xl font-medium flex items-center gap-2"
                >
                  <Sparkles size={20} /> IA Insight
                </a>
               <a 
                  href={WHATSAPP_LINK} 
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-4 bg-stone-900 text-stone-50 rounded-full text-lg mt-8 shadow-xl flex items-center gap-2"
                >
                  <MessageCircle size={20} />
                  Agendar via WhatsApp
                </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- MOBILE HERO (Updated for Fixed Image + Scrollable Box) ---
const MobileHero = () => {
  // We want the image to stay fixed in the background
  const { scrollY } = useScroll();
  // Image effects: subtle zoom and fade out as you scroll down
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  return (
    <>
      {/* 1. Fixed Background Image Layer */}
      <motion.div 
        style={{ scale, opacity }}
        className="md:hidden fixed top-0 left-0 w-full h-[70vh] z-0 pointer-events-none"
      >
        <img 
          src="https://i.imgur.com/DZJiZ7u.png" 
          alt="Douglas Alerrander" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-transparent to-stone-900/20" />
      </motion.div>

      {/* 2. Invisible Spacer to push the 'Box' down to the bottom of the viewport initially */}
      <div className="md:hidden h-[65vh] w-full pointer-events-none" />

      {/* 3. The 'Box' - Starts the scrollable content flow */}
      <section className="md:hidden relative z-10 bg-stone-900 rounded-t-[2.5rem] px-6 pt-10 pb-6 flex flex-col justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-stone-800/50 min-h-[35vh]">
        <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 mb-4 bg-stone-800/50 backdrop-blur-sm px-3 py-1 rounded-full border border-stone-700/50">
                 <CheckCircle2 size={10} className="text-sage-400" />
                 <span className="text-xs font-bold tracking-widest uppercase text-stone-300">Psicólogo Clínico</span>
            </div>
            <h1 className="font-serif italic text-4xl text-white mb-2 leading-tight">Douglas Alerrander</h1>
            <h2 className="text-lg font-serif text-stone-300 font-light mb-4">
                Arquitetura da <span className="text-white italic relative">mente</span>.
            </h2>
            <p className="text-stone-400 text-xs leading-relaxed max-w-[280px] font-light">
                Reconstrua o alinhamento entre o que você sente, pensa e vive através da TCC.
            </p>
        </div>
        <div className="w-full mt-6">
            <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-stone-100 text-stone-900 rounded-xl shadow-xl active:scale-95 transition-all relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-stone-50 to-stone-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CalendarCheck size={18} className="text-sage-700 relative z-10" />
                <span className="font-bold tracking-widest uppercase text-xs relative z-10">Agendar Sessão</span>
            </a>
        </div>
      </section>
    </>
  );
};

// --- DESKTOP HERO (Standard Scrolling - NO Parallax on Scroll) ---
const DesktopHero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [showTooltip, setShowTooltip] = useState(false);

  // NOTE: Scroll Parallax removed as requested. 
  // We keep the interactive mouse subtle effect for premium feel.

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  const xSpring = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const ySpring = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const moveX = useTransform(xSpring, [0, window.innerWidth], [-15, 15]);
  const moveY = useTransform(ySpring, [0, window.innerHeight], [-15, 15]);
  const moveReverseX = useTransform(xSpring, [0, window.innerWidth], [15, -15]);

  return (
    <div 
      className="hidden md:flex relative w-full h-screen min-h-[700px] flex-col justify-center overflow-hidden bg-stone-50"
      onMouseMove={handleMouseMove}
    >
      {/* Abstract Background Blobs - Interactive */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ x: moveX, y: moveY }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[900px] h-[900px] bg-gradient-to-br from-sage-200/40 to-stone-200/40 rounded-full blur-[120px] mix-blend-multiply" 
        />
        <motion.div 
          style={{ x: moveReverseX, y: moveReverseX }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-tr from-sage-100/40 to-stone-300/40 rounded-full blur-[100px] mix-blend-multiply" 
        />
      </div>

      {/* Image Container - NO Parallax Y transform */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute right-0 bottom-0 w-[55%] h-[95%]">
            <img 
               src="https://i.imgur.com/DZJiZ7u.png" 
               alt="Douglas Alerrander" 
               className="w-full h-full object-cover object-top opacity-90"
            />
            <div className="absolute inset-0 bg-sage-900/10 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-stone-50/80 to-transparent" />
         </div>
      </motion.div>

      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise.png')] z-10"></div>

      <motion.div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-10">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7 relative">
             <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
                <div className="flex items-center gap-4 mb-8">
                  <span className="h-[1px] w-12 bg-stone-800"></span>
                  <span className="text-sm font-bold tracking-widest uppercase text-stone-800">Psicologia Clínica</span>
                </div>
                <h1 className="text-8xl lg:text-9xl font-serif text-stone-900 leading-[0.9] tracking-tight mb-8 drop-shadow-sm">
                  Arquitetura <br/>
                  <span className="italic font-light text-stone-600 relative z-10">
                    da mente.
                    <svg className="absolute -bottom-4 left-0 w-full h-6 text-sage-500 -z-10 opacity-40" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C2.00025 6.99997 53.3659 1.62325 93.3659 2.62322C160.033 4.28984 198.001 7.49993 198.001 7.49993" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                  </span>
                </h1>
                <p className="text-2xl text-stone-700 font-light max-w-xl leading-relaxed mt-10">
                  Terapia Cognitivo-Comportamental para quem busca alinhamento entre o que <span className="text-stone-900 font-medium">sente</span>, o que <span className="text-stone-900 font-medium">pensa</span> e como <span className="text-stone-900 font-medium">vive</span>.
                </p>
                <div className="flex flex-row gap-6 mt-12 items-center">
                   <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="group relative px-8 py-5 bg-stone-900 text-stone-50 overflow-hidden rounded-full shadow-xl shadow-stone-900/10 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95">
                    <div className="absolute inset-0 w-full h-full bg-sage-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                    <span className="relative z-10 font-bold tracking-wider text-sm uppercase">Agendar Sessão</span>
                    <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#metodo" className="px-8 py-5 flex items-center gap-3 text-stone-800 font-bold tracking-wider text-sm uppercase hover:text-sage-700 transition-colors">
                    <div className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center">
                       <ArrowDown size={16} className="animate-bounce" />
                    </div>
                    Conhecer Método
                  </a>
                  
                   <div className="relative ml-4">
                      <button 
                        onClick={() => setShowTooltip(!showTooltip)}
                        className="w-10 h-10 rounded-full bg-stone-100 hover:bg-sage-100 text-stone-500 hover:text-sage-700 flex items-center justify-center transition-all border border-stone-200"
                        aria-label="Sobre a abordagem"
                      >
                        <HelpCircle size={20} />
                      </button>
                      <AnimatePresence>
                        {showTooltip && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-full left-0 mb-4 w-72 bg-white/90 backdrop-blur-xl p-5 rounded-2xl border border-stone-200 shadow-2xl z-50 origin-bottom-left text-left"
                          >
                            <div className="flex items-center gap-2 mb-2 text-sage-800">
                              <Brain size={16} />
                              <span className="text-xs font-bold uppercase tracking-widest">Abordagem TCC</span>
                            </div>
                            <p className="text-sm text-stone-600 leading-relaxed">
                              A Terapia Cognitivo-Comportamental é baseada em evidências científicas. Focamos em identificar padrões de pensamento que influenciam suas emoções e comportamentos, promovendo mudanças práticas e duradouras.
                            </p>
                            <div className="absolute bottom-[-6px] left-4 w-3 h-3 bg-white border-b border-r border-stone-200 rotate-45"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>
                </div>
             </motion.div>
          </div>
          <div className="lg:col-span-5 hidden lg:block pb-4 relative">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="flex flex-col items-end gap-8 pr-8">
                <div className="text-right backdrop-blur-sm bg-white/30 p-4 rounded-xl border border-white/50 shadow-sm hover:bg-white/50 transition-colors">
                    <h3 className="text-3xl font-serif italic text-sage-900 mb-1">Online</h3>
                    <p className="text-xs uppercase tracking-widest text-stone-800 font-bold">Brasil & Mundo</p>
                </div>
                <div className="text-right backdrop-blur-sm bg-white/30 p-4 rounded-xl border border-white/50 shadow-sm hover:bg-white/50 transition-colors">
                    <h3 className="text-3xl font-serif italic text-stone-900 mb-1">DF</h3>
                    <p className="text-xs uppercase tracking-widest text-stone-800 font-bold">Atendimento Presencial</p>
                </div>
             </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Empathy Section ---
const Empathy = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [selectedFeeling, setSelectedFeeling] = useState<FeelingDetail | null>(null);

  const containerClass = isMobile 
    ? "py-8 bg-stone-900 text-stone-100 relative z-10" 
    : "py-32 md:py-40 bg-stone-900 text-stone-100 overflow-hidden relative shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"; 

  // Stagger animation variants for children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Variants for individual items (text, buttons)
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 15
      }
    }
  };

  return (
    <section className={containerClass}>
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
      
      {isMobile && <div className="absolute top-0 right-0 w-64 h-64 bg-sage-500/10 rounded-full blur-[80px] pointer-events-none" />}

      <div className={`mx-auto px-6 relative z-10 ${isMobile ? 'max-w-full' : 'max-w-6xl'}`}>
        
        {/* Animated Header Section */}
        <motion.div 
          className={`${isMobile ? 'text-left mb-6' : 'text-center mb-20'}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-6xl'} mb-2 md:mb-6 font-serif leading-tight`}
          >
            O que te trouxe aqui?
          </motion.h2>
          
          <motion.p 
             variants={itemVariants}
             className={isMobile ? "text-stone-400 text-sm font-light" : "text-stone-400 max-w-2xl mx-auto font-light text-xl leading-relaxed"}
          >
             {!isMobile ? 
               "Muitas vezes, a dor emocional se manifesta em padrões. Identifique o que ressoa com o seu momento atual." 
               : "Toque no sentimento que ressoa com você hoje."
             }
          </motion.p>
        </motion.div>
        
        {/* Animated Grid of Feelings */}
        <motion.div 
          className={isMobile 
            ? "flex flex-col gap-2.5" 
            : "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          }
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {FEELINGS_DATA.map((feeling, idx) => (
            <motion.button
              key={idx}
              variants={itemVariants}
              onClick={() => setSelectedFeeling(feeling)}
              className={isMobile
                ? "w-full flex items-center justify-between p-3 bg-stone-800/50 border border-stone-800 active:bg-stone-800 active:scale-[0.98] transition-all rounded-xl group backdrop-blur-sm"
                : "group relative flex flex-col items-start p-8 bg-stone-800/40 border border-stone-800 rounded-2xl text-left hover:bg-stone-800 hover:border-sage-900/50 transition-all duration-300 hover:shadow-2xl hover:shadow-sage-900/10 overflow-hidden"
              }
            >
               {isMobile ? (
                   <>
                      <div className="flex items-center gap-3.5 flex-1">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-sage-400 border border-stone-700/50">
                              {getFeelingIcon(idx)}
                          </div>
                          <span className="text-sm text-stone-200 font-medium text-left leading-tight pr-2">
                              {feeling.title}
                          </span>
                      </div>
                      <ChevronRight size={14} className="text-stone-600 group-hover:text-sage-400 transition-colors shrink-0" />
                   </>
               ) : (
                   <>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-sage-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="mb-6 p-3 rounded-xl bg-stone-900 border border-stone-700 text-sage-400 group-hover:text-sage-300 group-hover:border-sage-800/50 transition-colors">
                        {getFeelingIcon(idx)}
                      </div>
                      <h3 className="text-xl font-serif text-stone-200 mb-3 pr-4 group-hover:text-white transition-colors">
                        {feeling.title}
                      </h3>
                      <div className="mt-auto flex items-center gap-2 text-sm font-bold tracking-widest text-stone-500 uppercase group-hover:text-sage-400 transition-colors">
                        <span>Entender</span>
                        <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                      </div>
                   </>
               )}
            </motion.button>
          ))}
        </motion.div>

        {/* Animated Footer CTA */}
        <motion.div 
           variants={itemVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           className={`mt-8 md:mt-24 ${isMobile ? 'text-left' : 'text-center'}`}
        >
          <p className="text-stone-400 mb-6 font-light text-base md:text-lg">Se identificou? Você não precisa carregar isso sozinho.</p>
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex justify-center items-center gap-2 px-10 py-4 border border-stone-700 text-stone-300 rounded-full hover:bg-sage-900 hover:border-sage-800 hover:text-white transition-all duration-300 uppercase tracking-widest text-sm shadow-md"
          >
             <MessageCircle size={18} />
            Iniciar Atendimento
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedFeeling && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-md" onClick={() => setSelectedFeeling(null)} />
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative w-full max-w-lg bg-stone-100 rounded-2xl shadow-2xl p-6 md:p-8 border border-stone-200 overflow-hidden"
            >
              <button onClick={() => setSelectedFeeling(null)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-2"><XCircle size={28} /></button>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-serif text-stone-900 mb-4 pr-8 leading-tight">{selectedFeeling.title}</h3>
                <div className="w-12 h-1 bg-sage-500 mb-6" />
                <p className="text-stone-600 text-base md:text-lg mb-6 leading-relaxed">{selectedFeeling.description}</p>
                <div className="bg-white p-5 rounded-xl border-l-4 border-sage-500 shadow-sm mb-6">
                  <p className="text-stone-800 italic font-medium text-sm md:text-base">" {selectedFeeling.guidance} "</p>
                </div>
                <div className="flex justify-end">
                  <a 
                    href={`${WHATSAPP_LINK}?text=Olá Douglas, me identifiquei com o sentimento de ${selectedFeeling.title} e gostaria de saber mais sobre a terapia.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSelectedFeeling(null)}
                    className="w-full md:w-auto flex justify-center items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-lg font-bold tracking-wide uppercase text-xs md:text-sm hover:bg-sage-900 transition-colors shadow-lg"
                  >
                    Agendar conversa <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- NEW FAQ SECTION ---
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    { q: "Como funciona a primeira sessão?", a: "É um momento de acolhimento e entendimento da sua história. Não há julgamentos, apenas uma escuta ativa para traçarmos os primeiros objetivos." },
    { q: "Você atende por convênio?", a: "Trabalho exclusivamente particular para garantir a qualidade, privacidade e o tempo necessário para cada caso. Forneço recibo para solicitação de reembolso junto ao seu plano." },
    { q: "A terapia online é eficaz?", a: "Sim. Estudos mostram que a TCC online tem eficácia equivalente à presencial, com o benefício extra da comodidade e de estar no seu ambiente seguro." },
    { q: "Qual a duração do tratamento?", a: "A TCC é focada em objetivos, tendendo a ser mais breve que outras abordagens. O tempo varia, mas trabalhamos para que você se torne seu próprio terapeuta." }
  ];

  return (
    <section className="py-24 bg-stone-50 border-t border-stone-100">
      <div className="max-w-3xl mx-auto px-6">
        <FadeInView className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4">Dúvidas Frequentes</h2>
          <p className="text-stone-500 text-lg font-light">Entenda como funciona o processo terapêutico.</p>
        </FadeInView>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border border-stone-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-serif text-lg text-stone-800 font-medium">{faq.q}</span>
                <motion.div
                  animate={{ rotate: activeIndex === idx ? 45 : 0 }}
                  className="text-sage-500"
                >
                   <Plus size={24} />
                </motion.div>
              </button>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-stone-600 font-light leading-relaxed border-t border-stone-100">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CognitivePuzzle = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const leftX = useTransform(scrollYProgress, [0.1, 0.5], [-150, 0]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.5], [150, 0]);
  const bottomY = useTransform(scrollYProgress, [0.1, 0.5], [150, 0]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.4, 0.6], [1, 1.1]);
  const lineColor = useTransform(scrollYProgress, [0.4, 0.6], ["#e2e8f0", "#3b82f6"]); 

  return (
    <section ref={containerRef} id="metodo" className="py-24 md:py-32 bg-white overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <FadeInView>
          <h2 className="text-3xl md:text-5xl text-stone-900 mb-4 font-serif">O Quebra-Cabeça da Mente</h2>
          <p className="text-stone-500 text-lg mb-16 max-w-2xl mx-auto">
            Na Terapia Cognitivo-Comportamental (TCC), trabalhamos para alinhar três peças fundamentais que definem sua realidade.
          </p>
        </FadeInView>

        <div className="relative h-[300px] md:h-[400px] flex items-center justify-center scale-90 md:scale-100">
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
            <motion.line x1="50%" y1="50%" x2="50%" y2="20%" style={{ stroke: lineColor, strokeWidth: 2 }} />
            <motion.line x1="50%" y1="50%" x2="25%" y2="70%" style={{ stroke: lineColor, strokeWidth: 2 }} />
            <motion.line x1="50%" y1="50%" x2="75%" y2="70%" style={{ stroke: lineColor, strokeWidth: 2 }} />
          </svg>
          <motion.div style={{ opacity, scale }} className="absolute z-20 w-32 h-32 rounded-full bg-sage-800 text-white flex flex-col items-center justify-center shadow-2xl shadow-sage-200">
            <Sparkles size={24} className="mb-2" /><span className="font-serif italic text-lg">Equilíbrio</span>
          </motion.div>
          <motion.div style={{ x: leftX, y: -100, opacity }} className="absolute z-10 w-32 h-32 md:w-40 md:h-40 bg-stone-50 border border-stone-100 rounded-full flex flex-col items-center justify-center shadow-lg backdrop-blur-sm">
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-400 mb-1">Mente</span><span className="font-serif text-lg md:text-xl text-stone-800">Pensamentos</span>
          </motion.div>
          <motion.div style={{ x: rightX, y: -100, opacity }} className="absolute z-10 w-32 h-32 md:w-40 md:h-40 bg-stone-50 border border-stone-100 rounded-full flex flex-col items-center justify-center shadow-lg backdrop-blur-sm">
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-400 mb-1">Coração</span><span className="font-serif text-lg md:text-xl text-stone-800">Emoções</span>
          </motion.div>
           <motion.div style={{ y: bottomY, opacity }} className="absolute z-10 top-[180px] md:top-[220px] w-32 h-32 md:w-40 md:h-40 bg-stone-50 border border-stone-100 rounded-full flex flex-col items-center justify-center shadow-lg backdrop-blur-sm">
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-400 mb-1">Ação</span><span className="font-serif text-lg md:text-xl text-stone-800">Comportamento</span>
          </motion.div>
        </div>
        <motion.p style={{ opacity }} className="mt-8 text-stone-600 italic font-serif">"Quando mudamos a forma de pensar, transformamos o sentir e o agir."</motion.p>
      </div>
    </section>
  );
};

const Approach = () => {
  return (
    <section className="py-24 bg-stone-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Users className="w-8 h-8 text-stone-100" />, title: "Relações", desc: "Construa vínculos mais saudáveis e aprenda a estabelecer limites com empatia.", color: "bg-stone-800" },
            { icon: <Heart className="w-8 h-8 text-sage-900" />, title: "Vida", desc: "Autoconhecimento profundo e ferramentas práticas para regulação emocional.", color: "bg-sage-200" },
            { icon: <Briefcase className="w-8 h-8 text-stone-800" />, title: "Trabalho", desc: "Foco, produtividade sustentável e gestão inteligente do estresse corporativo.", color: "bg-white border border-stone-200" }
          ].map((item, i) => (
            <FadeInView key={i} delay={i * 0.1} className="h-full">
              <motion.div 
                whileHover={{ y: -10 }}
                className={`h-full p-8 md:p-10 rounded-3xl ${item.color} ${item.title === 'Trabalho' ? 'text-stone-800' : (item.title === 'Vida' ? 'text-sage-900' : 'text-stone-100')} flex flex-col justify-between shadow-xl transition-all duration-300`}
              >
                <div>
                  <div className={`mb-8 p-4 rounded-2xl inline-block ${item.title === 'Trabalho' ? 'bg-stone-100' : 'bg-white/10'}`}>{item.icon}</div>
                  <h3 className="text-3xl mb-4 font-serif">{item.title}</h3>
                  <p className={`text-lg leading-relaxed ${item.title === 'Trabalho' || item.title === 'Vida' ? 'font-light' : 'font-light text-stone-300'}`}>{item.desc}</p>
                </div>
                <div className="mt-8 pt-8 border-t border-current opacity-20"><span className="text-xs tracking-widest uppercase">Área de Foco {i + 1}</span></div>
              </motion.div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="sobre" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-stone-100 to-transparent"></div>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-20 relative z-10">
        <FadeInView className="w-full md:w-5/12 relative order-2 md:order-1" direction="right">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 border-[1px] border-stone-800 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
            <div className="relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out aspect-[4/5] bg-stone-200">
               <img src="https://i.imgur.com/DZJiZ7u.png" alt="Douglas Alerrander Portrait" className="w-full h-full object-cover" />
            </div>
             <div className="absolute bottom-6 left-[-20px] bg-sage-800 text-white px-6 py-3 shadow-lg">
                <p className="text-xs font-bold uppercase tracking-wider">CRP-01/29285</p>
             </div>
          </div>
        </FadeInView>
        <FadeInView className="w-full md:w-7/12 order-1 md:order-2" delay={0.2} direction="left">
          <h2 className="text-4xl md:text-5xl text-stone-900 mb-8 leading-tight">
            Não é só sobre ouvir. <br />
            É sobre <span className="italic font-serif text-sage-800 bg-sage-50 px-2">transformar.</span>
          </h2>
          <div className="space-y-6 text-stone-600 text-lg font-light leading-relaxed pl-6 border-l border-stone-200">
            <p>Sou <strong>Douglas Alerrander Silva Pontes</strong>. Minha prática clínica é fundamentada na Terapia Cognitivo-Comportamental, mas minha abordagem é desenhada para o ser humano moderno.</p>
            <p>Muitas vezes, sabemos <em>o que</em> fazer, mas não entendemos <em>por que</em> não conseguimos fazer. Meu papel é te ajudar a decifrar esses padrões invisíveis.</p>
            <p>Ofereço um espaço seguro, livre de julgamentos, onde a técnica científica encontra a empatia necessária para mudanças reais.</p>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};

const MindfulInsight = () => {
  const [inputWord, setInputWord] = useState('');
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateInsight = async () => {
    if (!inputWord.trim()) return;
    setLoading(true);
    setInsight(null);
    try {
      const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
      if (!apiKey) throw new Error("API Key not found");
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Atue como um psicólogo clínico compassivo. O usuário sente: "${inputWord}". Escreva um insight curto (max 40 palavras), acolhedor. Tom: Calmo, sofisticado. PT-BR.`;
      const result = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      setInsight(result.text);
    } catch (error) {
      setInsight("No silêncio da mente, encontramos as respostas. Respire fundo e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="insight" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-sage-50 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <FadeInView>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs tracking-widest uppercase mb-6 border border-stone-200">
            <Sparkles size={12} className="text-sage-500" /><span>Inteligência Artificial & Psicologia</span>
          </div>
          <h2 className="text-3xl md:text-5xl text-stone-900 mb-6 font-serif">Insight do Momento</h2>
          <p className="text-stone-500 text-lg mb-10 max-w-xl mx-auto">Como você se sente hoje? Digite uma palavra e receba uma reflexão.</p>
        </FadeInView>
        <div className="max-w-md mx-auto bg-stone-50 p-2 rounded-full shadow-lg border border-stone-200 flex items-center transition-all focus-within:ring-2 focus-within:ring-sage-200">
          <input type="text" value={inputWord} onChange={(e) => setInputWord(e.target.value)} placeholder="Ex: Cansaço..." className="flex-1 bg-transparent px-6 py-3 outline-none text-stone-800 placeholder:text-stone-400 font-serif text-lg" onKeyDown={(e) => e.key === 'Enter' && generateInsight()} />
          <button onClick={generateInsight} disabled={loading || !inputWord.trim()} className="bg-stone-900 text-white p-3 rounded-full hover:bg-sage-800 disabled:opacity-50 transition-all">{loading ? <Loader2 className="animate-spin" size={24} /> : <ArrowRight size={24} />}</button>
        </div>
        <div className="mt-12 min-h-[100px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {insight && (
              <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-sage-100 relative">
                <Quote className="absolute top-4 left-4 text-sage-200 w-6 h-6 rotate-180" /><p className="text-xl text-stone-700 font-serif italic">{insight}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const InstagramSection = () => {
  return (
    <section className="py-24 bg-stone-50 border-t border-stone-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeInView>
          <div className="inline-flex items-center gap-3 text-sage-800 mb-6 bg-sage-50 px-5 py-2 rounded-full border border-sage-100">
            <Instagram size={20} /><span className="text-xs font-bold tracking-widest uppercase">Diário Visual</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">Reflexões diárias <br className="hidden md:block"/> para sua jornada.</h2>
          <p className="text-lg text-stone-600 mb-10 max-w-xl mx-auto font-light leading-relaxed">Acompanhe insights, conteúdos sobre TCC e um olhar humanizado sobre a psicologia no meu perfil oficial.</p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-tr from-purple-900 to-pink-900 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
            <Instagram size={24} className="group-hover:rotate-12 transition-transform duration-500" /><span className="text-sm font-bold tracking-widest uppercase">Seguir no Instagram</span><ExternalLink size={18} className="opacity-50" />
          </a>
        </FadeInView>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => { const timer = setInterval(() => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length), 6000); return () => clearInterval(timer); }, []);

  return (
    <section id="depoimentos" className="py-24 bg-sage-50/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12"><Quote className="w-12 h-12 text-sage-300 mx-auto mb-6 opacity-50" /></div>
        <div className="relative min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8 }} className="text-center max-w-2xl">
              <h3 className="text-2xl md:text-4xl font-serif text-stone-800 mb-8 italic leading-snug">"{TESTIMONIALS[current].text}"</h3>
              <div className="flex flex-col items-center gap-2"><div className="w-12 h-[1px] bg-stone-300"></div><p className="text-xs font-bold tracking-widest uppercase text-stone-500">{TESTIMONIALS[current].author}</p></div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-4 mt-12">
          {TESTIMONIALS.map((_, idx) => (
            <button key={idx} onClick={() => setCurrent(idx)} className={`h-1 transition-all duration-500 rounded-full ${idx === current ? 'bg-stone-800 w-12' : 'bg-stone-300 w-4 hover:bg-stone-400'}`} aria-label={`Ver depoimento ${idx + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contato" className="bg-white pt-24 pb-12 border-t border-stone-100">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="max-w-xs">
          <h2 className="font-serif text-4xl text-stone-900 mb-6 italic">Douglas Alerrander</h2>
          <p className="text-stone-500 mb-2 font-light">Psicologia Clínica & Terapia Cognitivo-Comportamental.</p>
          <span className="inline-block bg-stone-100 px-3 py-1 text-xs font-bold text-stone-600 rounded">CRP-01/29285</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sage-800 mb-2">Contato Direto</h3>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center group-hover:bg-sage-100 group-hover:border-sage-200 transition-colors"><MessageCircle size={18} /></div><span className="text-lg font-light">(61) 99919-7316</span>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors group">
               <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center group-hover:bg-sage-100 group-hover:border-sage-200 transition-colors"><span className="font-serif italic">@</span></div><span className="text-lg font-light">psidouglasalerrander</span>
            </a>
          </div>
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sage-800 mb-2">Atendimento</h3>
            <div className="space-y-2 text-stone-600 font-light">
               <p className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-stone-300"></span>Online para todo o Brasil</p>
               <p className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-stone-300"></span>Presencial em Brasília/DF</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-24 pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 gap-4">
        <p>&copy; {new Date().getFullYear()} Douglas Alerrander. Todos os direitos reservados.</p>
        <div className="flex gap-6"><a href="#" className="hover:text-stone-600">Política de Privacidade</a><a href="#" className="hover:text-stone-600">Termos de Uso</a></div>
      </div>
    </footer>
  );
};

const StickyCTA = () => {
  return (
    <motion.a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 2, type: "spring", stiffness: 100 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-stone-900 text-white pl-5 pr-6 py-3 rounded-full shadow-2xl shadow-stone-500/30 border border-stone-700/50 backdrop-blur-sm">
      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="font-medium text-sm tracking-wide">Agendar Agora</span>
    </motion.a>
  );
};

// --- MAIN APP (Layout Logic) ---

const App: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen text-stone-800 selection:bg-sage-200 selection:text-sage-900 font-sans">
      <NavBar />
      <main>
        {/* MOBILE FLOW */}
        {/* MobileHero now includes both the fixed image and the initial scrollable Box */}
        <MobileHero />
        
        {/* DESKTOP FLOW - Standard Flow */}
        <DesktopHero />
        <SectionSeparator />

        {/* Main Content Wrapper - Continues flow from MobileHero's Box */}
        <div className="relative z-10 bg-white">
          <Empathy isMobile={typeof window !== 'undefined' && window.innerWidth < 768} />
          
          <SectionSeparator />
          <CognitivePuzzle />
          
          <SectionSeparator />
          <Approach />
          
          <SectionSeparator />
          <About />
          
          <SectionSeparator />
          <FAQ />
          
          <SectionSeparator />
          <MindfulInsight />
          <InstagramSection />
          <Testimonials />
        </div>
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default App;