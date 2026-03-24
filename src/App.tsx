/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Clock, 
  Hammer, 
  Package, 
  ShieldCheck, 
  Star, 
  TrendingUp, 
  Users, 
  Zap,
  ArrowRight,
  Gift,
  Check,
  HelpCircle
} from 'lucide-react';

// --- Components ---

const Button = ({ children, onClick, className = "", variant = "primary" }: { children: React.ReactNode, onClick?: () => void, className?: string, variant?: "primary" | "secondary" | "outline" }) => {
  const variants = {
    primary: "bg-profit hover:bg-emerald-700 text-white shadow-lg shadow-profit/20",
    secondary: "bg-profit hover:bg-emerald-700 text-white shadow-lg shadow-profit/20",
    outline: "bg-profit hover:bg-emerald-700 text-white shadow-lg shadow-profit/20"
  };

  return (
    <motion.button
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 uppercase tracking-wider cursor-pointer whitespace-nowrap ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-10 px-6 md:py-16 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-wood/10 py-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-bold text-base md:text-lg py-1 cursor-pointer group"
      >
        <span className="flex items-center gap-3">
          <HelpCircle className="w-4 h-4 text-earth opacity-50" />
          {question}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="py-2 text-sm text-wood/80 leading-relaxed whitespace-pre-line">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(16 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center justify-center gap-2 font-bold text-red-600 mt-4">
      <Clock className="w-4 h-4" />
      <span className="text-sm uppercase tracking-wider whitespace-nowrap">Essa oferta expira em {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
    </div>
  );
};

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const images = [
    "https://res.cloudinary.com/dyqfspsap/image/upload/v1773788475/depoimento_01_aotdtv.webp",
    "https://res.cloudinary.com/dyqfspsap/image/upload/v1773788475/depoimento_02_tahws6.webp",
    "https://res.cloudinary.com/dyqfspsap/image/upload/v1773788475/depoimento_03_pwsxq8.webp",
    "https://res.cloudinary.com/dyqfspsap/image/upload/v1773788475/depoimento_04_gqiywq.webp",
    "https://res.cloudinary.com/dyqfspsap/image/upload/v1773788475/depoimento_05_hsa5ab.webp"
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 pb-4 pt-0">
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:-px-4 z-30 pointer-events-none">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prev}
          className="w-12 h-12 rounded-full bg-white shadow-xl border border-wood/10 flex items-center justify-center text-wood pointer-events-auto cursor-pointer hover:bg-beige transition-colors"
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={next}
          className="w-12 h-12 rounded-full bg-white shadow-xl border border-wood/10 flex items-center justify-center text-wood pointer-events-auto cursor-pointer hover:bg-beige transition-colors"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* Carousel Track */}
      <div className="overflow-hidden rounded-3xl shadow-inner bg-beige/10 p-2 md:p-4">
        <motion.div 
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {images.map((src, i) => (
            <div key={i} className="min-w-full flex justify-center items-center px-2">
              <motion.div 
                animate={{ 
                  rotate: [0, -1, 0, 1, 0],
                  y: [0, -5, 0, 5, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
                className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-wood/5 w-full max-w-[400px] aspect-[9/16] md:aspect-[3/4] flex items-center justify-center p-2"
              >
                <img 
                  src={src} 
                  alt={`Depoimento ${i + 1}`} 
                  className="w-full h-full object-contain pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-3 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === i 
                ? 'w-10 h-2 bg-profit' 
                : 'w-2 h-2 bg-wood/20 hover:bg-wood/40'
            }`}
            aria-label={`Ir para depoimento ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="font-sans overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative flex flex-col items-center text-center px-6 pt-8 pb-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-beige via-beige to-[#F0EBE3]">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-profit/5 blur-[120px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl relative z-10"
        >
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug tracking-tight mb-6 text-wood">
            Descubra como transformar pallets baratos <span className="text-profit">(ou até grátis)</span> em móveis que você pode vender por mais de <span className="text-profit">R$500</span> mesmo sem experiência.
          </h1>
          
          <p className="text-sm md:text-base text-wood/80 mb-6 max-w-2xl mx-auto leading-relaxed font-medium">
            Um negócio de baixo custo que gera renda extra imediata com móveis de alta demanda.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative w-full max-w-5xl mx-auto mb-4 group"
          >
            <div className="absolute -inset-4 bg-wood/5 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://res.cloudinary.com/dyqfspsap/image/upload/v1773788480/Imagem_de_capa_tbf3rn.webp" 
                alt="Móveis de Pallet" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-4">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-xl shadow-wood/5 border border-white mb-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 blur-3xl -mr-12 -mt-12 rounded-full" />
              <p className="text-red-600 line-through text-xs mb-0 font-medium italic">De R$ 99,90</p>
              <div className="flex flex-col items-center mb-2">
                <span className="text-sm font-bold text-profit">Por apenas</span>
                <span className="text-4xl font-black text-profit tracking-tighter">R$ 10</span>
              </div>
              <p className="text-[10px] text-wood/50 max-w-[200px] mx-auto leading-tight">
                Valor simbólico para separar quem realmente quer aprender dos curiosos.
              </p>
            </div>

            <div className="w-full max-w-sm">
              <Button 
                variant="secondary"
                onClick={() => document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-3 text-base shadow-xl shadow-profit/20 whitespace-nowrap"
              >
                Quero Começar Agora
              </Button>
            </div>
          </div>
        </motion.div>
      </header>

      <div className="bg-white py-1" />

      {/* What is Section */}
      <Section className="bg-white pt-2 pb-2 md:pt-4 md:pb-6 !py-6 md:!py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              O que é o guia Do Pallet ao Lucro?
            </h2>
            <p className="text-sm text-wood/80 mb-4 leading-relaxed">
              É um método simples e direto que te mostra como transformar pallets baratos (ou até grátis) em móveis incríveis que você pode usar ou vender.
            </p>
            <p className="text-sm text-wood/80 mb-6 leading-relaxed">
              Mesmo sem experiência e usando ferramentas básicas, você aprende a criar peças com alta procura direto da sua casa.
            </p>
            
            <div className="space-y-2 mb-4">
              <h3 className="font-bold text-base text-earth">Você vai aprender a fazer:</h3>
              <p className="text-xs text-wood/70">Mesas, sofás, camas, prateleiras, racks, bancos, estantes e muitos outros móveis que são fáceis de produzir e têm grande potencial de venda.</p>
            </div>
          </motion.div>
          
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Rack para TV", img: "https://res.cloudinary.com/dyqfspsap/image/upload/v1773788488/Imagem_rack_tv_r5aqss.webp" },
                { name: "Bancos", img: "https://res.cloudinary.com/dyqfspsap/image/upload/v1773788476/Imagem_bancos_jnxzux.webp" },
                { name: "Mesa de Pallet", img: "https://res.cloudinary.com/dyqfspsap/image/upload/v1773788483/Imagem_mesa_qbl4fe.webp" },
                { name: "Prateleira", img: "https://res.cloudinary.com/dyqfspsap/image/upload/v1773788484/Imagem_prateleira_gmwf67.webp" },
                { name: "Sofás", img: "https://res.cloudinary.com/dyqfspsap/image/upload/v1773788489/imagem_sofas_fkazfk.webp" },
                { name: "Mesa de Centro", img: "https://res.cloudinary.com/dyqfspsap/image/upload/v1773788483/Imagem_mesa_de_centro_krojhx.webp" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="flex flex-col gap-2"
                >
                  <div className="group relative rounded-xl overflow-hidden shadow-md">
                    <img src={item.img} alt={item.name} className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-wood font-bold text-[10px] md:text-xs text-center uppercase tracking-wider">{item.name}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center md:justify-start">
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full md:w-auto"
              >
                Quero Aprender
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* For Whom Section */}
      <Section className="bg-wood text-beige rounded-[2rem] my-1 !py-4 md:!py-8">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Esse material é pra você que:</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Quer criar uma nova fonte de renda ou até viver do seu próprio negócio, trabalhando de casa.",
            "Deseja aprender algo prático, criativo e lucrativo, mesmo começando do zero.",
            "Já trabalha com artesanato ou marcenaria e quer aumentar seus ganhos com produtos que vendem fácil.",
            "Está cansado de depender de um salário fixo e busca mais liberdade financeira.",
            "Acredita que é possível ganhar dinheiro reutilizando materiais e construindo algo com as próprias mãos."
          ].map((text, i) => (
            <div key={i} className="flex gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
              <p className="text-sm md:text-base opacity-90">{text}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <img src="https://res.cloudinary.com/dyqfspsap/image/upload/v1773788476/imagem_5_imagens_os5abf.webp" alt="Trabalhos com Pallets" className="rounded-xl shadow-lg w-full max-w-4xl" referrerPolicy="no-referrer" />
        </div>
      </Section>

      {/* Bonuses Section */}
      <Section className="bg-beige/30 !py-6 md:!py-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-earth">Adquirindo hoje você ganha:</h2>
          <p className="text-xl md:text-2xl text-profit font-black">+3 Brindes Exclusivos</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "Bônus 01: Como atrair clientes",
              desc: "Aprenda usar o Marketplace, chamar atenção com boas fotos e atrair clientes para o WhatsApp.",
              img: "https://res.cloudinary.com/dyqfspsap/image/upload/v1773788478/Imagem_bonus_01_u5y066.webp"
            },
            {
              title: "Bônus 02: Pallets de Graça",
              desc: "Revelamos os melhores comércios que disponibilizam pallets de graça para você começar sem custo.",
              img: "https://res.cloudinary.com/dyqfspsap/image/upload/v1773788479/Imagem_bonus_02_ukyulj.webp"
            },
            {
              title: "Bônus 03: 165 projetos de móveis",
              desc: "Para você nunca mais ficar sem ideias na hora de produzir.",
              img: "https://res.cloudinary.com/dyqfspsap/image/upload/v1773788479/Imagem_bonus_03_ymh77n.webp"
            }
          ].map((bonus, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-wood/5 border border-wood/10 flex flex-col group"
            >
              <div className="relative overflow-hidden aspect-[16/11] bg-beige/20 p-1">
                <img 
                  src={bonus.img} 
                  alt={bonus.title} 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-3 text-earth leading-tight">{bonus.title}</h3>
                <p className="text-sm text-wood/70 leading-relaxed mb-6">{bonus.desc}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2 text-profit font-black text-sm">
                    <Gift className="w-4 h-4" />
                    GRATUITO
                  </div>
                  <div className="text-[10px] font-bold text-red-500 line-through opacity-50">
                    VALOR: R$ 47,00
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mb-12"
          >
            <div className="absolute inset-0 bg-gold/20 blur-[100px] rounded-full -z-10" />
            <img 
              src="https://res.cloudinary.com/dyqfspsap/image/upload/v1773788476/imagem_apostila_f%C3%ADsica_wqn3ez.webp" 
              alt="Apostila Física Mockup" 
              className="max-w-xs md:max-w-md w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] border-4 border-white rounded-2xl" 
              referrerPolicy="no-referrer" 
            />
          </motion.div>
          <Button 
            variant="primary" 
            onClick={() => document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full md:w-auto px-12"
          >
            Quero Começar Agora
          </Button>
        </div>
      </Section>

      {/* What You'll Learn */}
      <Section className="bg-[#F0EBE3] rounded-[3rem] !py-6 md:!py-10">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center text-earth">O que você irá aprender:</h2>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
          {[
            "O truque dos pallets grátis",
            "Como desmontar e tratar a madeira corretamente",
            "Ferramentas essenciais e baratas para começar",
            "Passo a passo de móveis fáceis e que vendem rápido",
            "Técnicas de pintura rústica e acabamento",
            "Como precificar e calcular seu lucro",
            "Como vender na primeira semana",
            "Estratégias para atrair clientes locais",
            "Dicas para transformar o hobby em negócio",
            "Como criar uma marca artesanal lucrativa"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-profit flex items-center justify-center shrink-0">
                <Check className="text-white w-4 h-4" />
              </div>
              <span className="text-base font-medium text-wood">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Offer Block */}
      <Section id="oferta" className="!py-2">
        <div className="max-w-xl mx-auto bg-white rounded-[2rem] shadow-xl border border-earth/10 overflow-hidden">
          <div className="p-8 pb-4 flex flex-col items-center">
            <img 
              src="https://res.cloudinary.com/dyqfspsap/image/upload/v1773788483/Imagem_mockup_apf9ks.webp" 
              alt="Mockup Curso" 
              className="w-full max-w-[280px] drop-shadow-xl" 
              referrerPolicy="no-referrer" 
            />
          </div>
          
          <div className="px-8">
            <div className="h-px bg-earth/10 w-full" />
          </div>

          <div className="p-8 pt-6">
            <ul className="grid grid-cols-1 gap-3 mb-8">
              {[
                "Curso em Vídeo Aulas",
                "Apostila Do Pallet ao Lucro",
                "Bônus 01: Como atrair clientes",
                "Bônus 02: Como conseguir pallets de graça",
                "Bônus 03: 165 projetos de móveis",
                "Acesso VITALÍCIO"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-wood/80 font-medium">
                  <CheckCircle2 className="text-profit w-4 h-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="text-center mb-8">
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-4">
                <span className="text-red-600 line-through text-xl font-bold">De R$ 99,90</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-wood/60">Por</span>
                  <span className="text-6xl md:text-8xl font-black text-profit tracking-tighter">R$ 10</span>
                </div>
              </div>
            </div>

            <a href="https://pay.lowify.com.br/checkout?product_id=0fLlRa" className="w-full">
              <Button variant="secondary" className="w-full py-4 text-sm md:text-base font-black shadow-2xl shadow-profit/40">
                QUERO COMEÇAR AGORA
              </Button>
            </a>
            
            <Timer />

            <div className="mt-4 text-center">
              <p className="text-[10px] md:text-xs font-bold text-wood/40 uppercase tracking-widest whitespace-nowrap">
                Compra 100% segura - 7 dias de garantia
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <section className="bg-white overflow-hidden py-1 md:py-2">
        <div className="text-center mb-0 px-6">
          <h2 className="text-2xl md:text-4xl font-bold">
            Eu <span className="text-red-600">recebo</span> mensagens como essas todo dia, <br /> logo será <span className="text-red-600">você</span> me enviando mensagens assim <span className="text-red-600">também</span>
          </h2>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <TestimonialCarousel />
        </div>
      </section>

      {/* Advantages */}
      <Section className="bg-wood text-beige rounded-[3rem]">
        <h2 className="text-base md:text-xl font-bold mb-4 text-center">Vantagens em ter este material:</h2>
        <div className="grid md:grid-cols-2 gap-2">
          {[
            "Acesso 100% online e vitalício.",
            "Com apenas uma venda, você já recupera todo o investimento.",
            "Mesmo com ferramentas simples (serrote, martelo e pregos) você já pode começar hoje sem precisar gastar muito.",
            "Baixo investimento inicial, com alto potencial de retorno."
          ].map((adv, i) => (
            <div key={i} className="flex gap-2 p-2 bg-white/5 rounded-xl border border-white/10 items-center">
              <TrendingUp className="w-4 h-4 text-gold shrink-0" />
              <p className="text-xs font-medium">{adv}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <a href="https://pay.lowify.com.br/checkout?product_id=0fLlRa" className="w-full max-w-sm">
            <Button variant="secondary" className="w-full py-4 text-base font-black shadow-xl shadow-profit/20">
              COMPRAR AGORA
            </Button>
          </a>
        </div>
      </Section>
      <Section className="text-center">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-wood/5">
          <img src="https://res.cloudinary.com/dyqfspsap/image/upload/v1773788489/SELO_GARANTIA_IMAGEM_pekub3.webp" alt="Garantia 7 Dias" className="w-48 h-48 mx-auto mb-6" referrerPolicy="no-referrer" />
          <h2 className="text-xl md:text-3xl font-bold mb-4">GARANTIA DE 7 DIAS</h2>
          <p className="text-base text-wood/70 leading-relaxed">
            Se por qualquer motivo o nosso material não atender suas expectativas, nós devolvemos todo o seu dinheiro dentro do prazo de 7 dias. Sem perguntas, sem burocracia.
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="!py-4 md:!py-8">
        <h2 className="text-xl md:text-3xl font-bold mb-8 text-center">🔥 DÚVIDAS FREQUENTES:</h2>
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-[2rem] shadow-lg">
          <FAQItem 
            question="O material é físico ou digital?" 
            answer="O Do Pallet ao Lucro é 100% digital (PDF + vídeo aulas). Você pode acessar pelo celular ou computador, quando quiser e de onde estiver." 
          />
          <FAQItem 
            question="Como tenho acesso e em quanto tempo recebo?" 
            answer="O acesso é imediato após a compra. Você recebe tudo direto no seu e-mail." 
          />
          <FAQItem 
            question="Por que o material não é gratuito?" 
            answer="Porque aqui você não está recebendo apenas dicas soltas… Você está tendo acesso a um método validado, com passo a passo completo para transformar pallets em renda por um valor simbólico. Além disso, existe todo um investimento para manter o conteúdo atualizado, suporte e estrutura. E mesmo assim, o valor é menor do que o lucro de uma única peça vendida." 
          />
          <FAQItem 
            question="Posso imprimir o material?" 
            answer="Sim! Você pode imprimir e usar como guia prático enquanto produz seus móveis." 
          />
          <FAQItem 
            question="Vocês enviam material físico?" 
            answer="Não. O acesso é totalmente digital, para você receber imediatamente e começar hoje mesmo." 
          />
          <FAQItem 
            question="Vou ter acesso por quanto tempo?" 
            answer="O acesso é vitalício. Você compra uma vez e pode acessar para sempre, sem mensalidades." 
          />
        </div>
        <div className="mt-8 flex justify-center">
          <a href="https://pay.lowify.com.br/checkout?product_id=0fLlRa" className="w-full max-w-sm">
            <Button variant="secondary" className="w-full py-4 text-base font-black shadow-xl shadow-profit/20">
              COMPRAR AGORA
            </Button>
          </a>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-wood text-beige/40 py-12 text-center text-sm">
        <p>© 2026 Do Pallet ao Lucro. Todos os direitos reservados.</p>
        <p className="mt-2">Desenvolvido para transformar criatividade em lucro.</p>
      </footer>
    </div>
  );
}
