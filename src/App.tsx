/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  ShieldCheck, 
  Zap, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  ArrowRight, 
  Menu, 
  X,
  Clock,
  Target,
  Award,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { OstacLogo } from './components/OstacLogo';
import { InteractiveStatsSection } from './components/InteractiveStatsSection';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-black/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          className="flex items-center h-full group cursor-pointer relative"
          animate={{
            y: [0, -4, 0],
          }}
          whileHover={{ 
            rotateY: 20, 
            rotateX: -10,
            scale: 1.1,
          }}
          transition={{ 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            type: "spring", 
            stiffness: 400, 
            damping: 15 
          }}
          style={{ perspective: 1000, transformStyle: "preserve-3d" }}
        >
          <div className="relative flex flex-col items-start">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-brilliant tracking-tighter leading-none">
              TORNEARIA
            </h1>
            <h1 className="text-3xl md:text-4xl font-display font-black text-brilliant tracking-widest leading-none -mt-1">
              OSTAC
            </h1>
            
            {/* Sparks */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="spark"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 100],
                  y: [0, (Math.random() - 1) * 100],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${40 + Math.random() * 40}%`,
                }}
              />
            ))}
          </div>
        </motion.div>

          {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#servicos" className="text-sm uppercase tracking-widest hover:text-industrial-amber transition-colors">Serviços</a>
          <a href="#galeria" className="text-sm uppercase tracking-widest hover:text-industrial-amber transition-colors">Galeria</a>
          <a href="#sobre" className="text-sm uppercase tracking-widest hover:text-industrial-amber transition-colors">Sobre</a>
          <a href="#contato" className="text-sm uppercase tracking-widest hover:text-industrial-amber transition-colors">Contato</a>

          <a 
            href="https://wa.me/554733461085" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-industrial-amber text-slate-black px-6 py-2.5 font-display font-bold uppercase tracking-wider text-sm hover:bg-white transition-all animate-pulse-amber"
          >
            Solicitar Orçamento
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-slate-black border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            <a href="#servicos" onClick={() => setIsMobileMenuOpen(false)} className="text-lg uppercase font-display">Serviços</a>
            <a href="#galeria" onClick={() => setIsMobileMenuOpen(false)} className="text-lg uppercase font-display">Galeria</a>
            <a href="#sobre" onClick={() => setIsMobileMenuOpen(false)} className="text-lg uppercase font-display">Sobre</a>
            <a href="#contato" onClick={() => setIsMobileMenuOpen(false)} className="text-lg uppercase font-display">Contato</a>

            <a 
              href="https://wa.me/554733461085" 
              className="bg-industrial-amber text-slate-black p-4 text-center font-display font-bold uppercase"
            >
              Solicitar Orçamento
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-slate-black/70 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1920" 
          alt="Industrial Lathe" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-industrial-amber font-display tracking-[0.3em] uppercase text-sm mb-4 block">
              Engenharia de Alta Performance
            </span>
            <h1 className="text-5xl md:text-8xl font-bold leading-[0.9] mb-8 text-white">
              A ARTE DA <span className="text-industrial-amber">PRECISÃO</span> EM CADA CENTÉSIMO DE M/M.
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mb-10 leading-relaxed font-normal">
              Oferecemos serviços completos de usinagem de torno convencional, freza pleina, soldas mig e tig. Atendendo aos mais diversos setores da indústria. Trabalhamos com peças personalizadas, fabricação de componentes mecânicos, retíficas e reparos, sempre com foco em qualidade e precisão dimensional. Nossa equipe experiente garante prazos ágeis e acabamento de alto padrão. Atendemos desde pequenas peças até projetos industriais de maior complexidade, com orçamento sob medida para cada necessidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/554733461085"
                className="group bg-industrial-amber text-slate-black px-8 py-4 font-display font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all"
              >
                Falar com um Especialista
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 border-t border-l border-white/5 pointer-events-none hidden lg:block" />
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Tornearia de Precisão",
      desc: "Recuperação e fabricação de peças complexas com tolerâncias mínimas. Especialistas em eixos, buchas e engrenagens de grande porte.",
      image: "https://lh3.googleusercontent.com/d/1G5V3hf7hEb64lZa4j8tyQH_QTIfgR9I1",
      icon: <Settings className="w-8 h-8" />
    },
    {
      title: "Usinagem Especializada",
      desc: "Soluções sob medida para o setor portuário e industrial. Atendemos demandas críticas com agilidade e rigor técnico absoluto.",
      image: "https://lh3.googleusercontent.com/d/1oelL9ZMDgC2X9AGRvE0vuAouyhrl9jE0",
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: "Soldas e Acabamentos",
      desc: "Processos de soldagem certificados e acabamentos superficiais de alta qualidade para garantir a durabilidade de cada componente.",
      image: "https://lh3.googleusercontent.com/d/1vZjeP1uL-RAN00bvZiMlVXrVRUch4TYA",
      icon: <ShieldCheck className="w-8 h-8" />
    }
  ];

  return (
    <section id="servicos" className="py-24 bg-slate-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Engenharia de <span className="text-industrial-amber">Elite</span></h2>
          <div className="w-24 h-1 bg-industrial-amber" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -8 }}
              className="group relative bg-white/5 border border-white/10 p-6 md:p-8 overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                {service.icon}
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="text-industrial-amber mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-titanium-silver/70 mb-6 leading-relaxed text-sm md:text-base">
                  {service.desc}
                </p>
                <div className="h-72 sm:h-80 w-full overflow-hidden rounded-sm mt-auto border border-white/5 bg-black/40">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://lh3.googleusercontent.com/d/16NFazF7aBgZNU4nLbwXDpIUJ58O1bjBJ",
    "https://lh3.googleusercontent.com/d/1skTVNoAGNyUc0m7XT7ggG7qUQQHHh5iL",
    "https://lh3.googleusercontent.com/d/1mgFLMHae2A9Fe09X6CcsTW1NsVocLRIP",
    "https://lh3.googleusercontent.com/d/1ZMUSyD7GF_GqLR2OPKL-Cx3Wop8cuyqt",
    "https://lh3.googleusercontent.com/d/11UEmKOF4tLVTYBWv0Kf5IR0Z1UhPUYla",
    "https://lh3.googleusercontent.com/d/1VexSjLPmdeYIwuiJ0DiYeXzazrxh56BQ"
  ];

  return (
    <section id="galeria" className="py-24 bg-slate-black">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">NOSSA <span className="text-industrial-amber">OFICINA</span></h2>
          <p className="text-titanium-silver/40 uppercase tracking-widest text-sm">Excelência visual em cada detalhe do processo</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="aspect-square overflow-hidden group relative"
            >
              <img 
                src={img} 
                alt={`Gallery ${idx}`} 
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formsubmit.co/ajax/torneariaostac@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nome: formData.name.trim(),
          email: formData.email.trim(),
          telefone_whatsapp: formData.phone.trim() || 'Não informado',
          _subject: formData.subject.trim() 
            ? `[Orçamento OSTAC] ${formData.subject.trim()} - ${formData.name.trim()}`
            : `[Contato Site OSTAC] Orçamento de Usinagem - ${formData.name.trim()}`,
          mensagem: formData.message.trim(),
          _captcha: 'false',
          _template: 'table'
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok || data.success === 'true' || data.success === true || (typeof data.message === 'string' && data.message.includes('Activate'))) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="py-24 bg-white text-slate-black">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-slate-black text-white p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-industrial-amber/10 -mr-16 -mt-16 rotate-45" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-4xl font-bold mb-6">VAMOS <span className="text-industrial-amber">CONVERSAR?</span></h2>
              <p className="text-titanium-silver/60 mb-8 leading-relaxed">
                Tem um projeto desafiador ou precisa de manutenção urgente? Nossa equipe está pronta para entregar a precisão que você busca.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-industrial-amber flex items-center justify-center text-industrial-amber shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-40">Telefone / WhatsApp</p>
                    <p className="font-bold">(47) 3346-1085</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-industrial-amber flex items-center justify-center text-industrial-amber shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-40">E-mail para contato</p>
                    <p className="font-bold text-industrial-amber">torneariaostac@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  required
                  placeholder="Nome Completo *" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-white/5 border border-white/10 p-4 w-full focus:outline-none focus:border-industrial-amber transition-colors text-white placeholder-titanium-silver/40 text-sm"
                />
                <input 
                  type="email" 
                  required
                  placeholder="Seu E-mail *" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-white/5 border border-white/10 p-4 w-full focus:outline-none focus:border-industrial-amber transition-colors text-white placeholder-titanium-silver/40 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="tel" 
                  placeholder="Telefone / WhatsApp" 
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-white/5 border border-white/10 p-4 w-full focus:outline-none focus:border-industrial-amber transition-colors text-white placeholder-titanium-silver/40 text-sm"
                />
                <input 
                  type="text" 
                  placeholder="Assunto (Ex: Usinagem de Eixo)" 
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="bg-white/5 border border-white/10 p-4 w-full focus:outline-none focus:border-industrial-amber transition-colors text-white placeholder-titanium-silver/40 text-sm"
                />
              </div>

              <textarea 
                required
                placeholder="Descreva sua necessidade técnica (medidas, material, prazos)... *" 
                rows={4} 
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="bg-white/5 border border-white/10 p-4 w-full focus:outline-none focus:border-industrial-amber transition-colors resize-none text-white placeholder-titanium-silver/40 text-sm"
              ></textarea>

              {/* Botão Responsivo Enviar Mensagem */}
              <button 
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-industrial-amber text-slate-black font-display font-bold uppercase tracking-wider sm:tracking-widest py-3.5 sm:py-4 px-4 sm:px-6 text-sm sm:text-base hover:bg-amber-400 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-industrial-amber/10 hover:shadow-industrial-amber/25 cursor-pointer disabled:opacity-80"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin shrink-0" />
                    <span>Enviando Mensagem...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 shrink-0" />
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </button>

              {/* Feedback de Envio Direto ao E-mail */}
              {status === 'success' && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-sm text-emerald-400 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-sm leading-relaxed">
                    <p className="font-bold text-white">Mensagem enviada com sucesso!</p>
                    <p className="text-xs text-titanium-silver/80 mt-0.5">
                      Sua solicitação caiu diretamente no e-mail <strong className="text-white">torneariaostac@gmail.com</strong>. Nossa equipe técnica responderá o mais breve possível.
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-sm text-red-400 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="text-sm leading-relaxed">
                    <p className="font-bold text-white">Não foi possível enviar a mensagem no momento.</p>
                    <p className="text-xs text-titanium-silver/80 mt-0.5">
                      Por favor, verifique sua conexão ou fale diretamente pelo telefone / WhatsApp <strong className="text-white">(47) 3346-1085</strong>.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const segments = [
    {
      title: "Manutenção Industrial",
      items: ["Reparo, instalação, projetos e adequações de equipamentos e produtos industriais em geral"]
    },
    {
      title: "Usinagem de precisão",
      items: ["Torno, solda, fresa, projetos, desenvolvimento, tratamento, têmpera, furações, metrologia e laudos"]
    },
    {
      title: "Estruturas Metálicas",
      items: ["Mezaninos, Escadas, Guarda corpo e Corrimão", "Pipe Rack, Galpões, Coberturas, Vasos de pressão", "Acessórios Navais (PSV, tubulação, usinagem e acessórios para Rebocadores)"]
    },
    {
      title: "Químicos",
      items: ["Biocombustíveis, lubrificantes, tintas e vernizes, derivados de petróleo em geral"]
    },
    {
      title: "Caldeiraria e montagem",
      items: ["Fabricação e montagem, fábricas, mão de obra técnica, desenvolvimento e gestão de projetos e equipamentos, plantas e estruturas em geral"]
    }
  ];

  const policies = [
    "Respeito Social e Ambiental",
    "Compromisso com Clientes e Parceiros",
    "Planejamento, Processos e Controles baseados na Norma ISO 9001",
    "Profissionais Treinados e Certificados",
    "Valorização de Fornecedores Qualificados",
    "Cumprimento dos Prazos e Especificações",
    "Orçamentos Competitivos",
    "Excelência nos Produtos e Serviços"
  ];

  return (
    <section id="sobre" className="py-24 bg-white text-slate-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <div className="relative lg:sticky lg:top-24 mb-12 lg:mb-0">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-industrial-amber" />
            <img 
              src="https://lh3.googleusercontent.com/d/1tX59Z5A2aLamrbfaVHj00yeQ2eVLEgtv" 
              alt="Workshop" 
              className="w-full h-auto max-h-[340px] md:max-h-none md:h-[600px] object-contain md:object-cover shadow-2xl rounded-sm"
              referrerPolicy="no-referrer"
            />
            <div 
              className="absolute z-20 group -bottom-3 -right-2 md:bottom-[-10mm] md:right-[-10mm]"
            >
              {/* Shadow and Border Wrapper */}
              <div 
                className="relative w-20 h-20 md:w-32 md:h-32 flex items-center justify-center transition-transform group-hover:scale-105 cursor-default"
                style={{
                  filter: "drop-shadow(0 0 1px #000) drop-shadow(0 0 1px #000) drop-shadow(0 8px 12px rgba(0,0,0,0.7))"
                }}
              >
                {/* The Golden Seal */}
                <div 
                  className="w-full h-full flex items-center justify-center overflow-hidden relative"
                  style={{
                    background: "linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
                    clipPath: "polygon(50% 0%, 53% 8%, 60% 5%, 62% 13%, 70% 11%, 71% 19%, 79% 18%, 79% 26%, 87% 27%, 85% 35%, 92% 38%, 89% 46%, 95% 50%, 89% 54%, 92% 62%, 85% 65%, 87% 73%, 79% 74%, 79% 82%, 71% 81%, 70% 89%, 62% 87%, 60% 95%, 53% 92%, 50% 100%, 47% 92%, 40% 95%, 38% 87%, 30% 89%, 29% 81%, 21% 82%, 21% 74%, 13% 73%, 15% 65%, 8% 62%, 11% 54%, 5% 50%, 11% 46%, 8% 38%, 15% 35%, 13% 27%, 21% 26%, 21% 18%, 29% 19%, 30% 11%, 38% 13%, 40% 5%, 47% 8%)"
                  }}
                >
                  {/* Shiny Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent pointer-events-none" />
                  
                  <div className="text-center p-1 border border-black/20 rounded-full w-[90%] h-[90%] flex flex-col items-center justify-center relative z-10">
                    <p className="font-display font-black text-[10px] md:text-base uppercase leading-none text-slate-black mb-0.5">
                      Qualidade
                    </p>
                    <p className="font-display font-black text-[10px] md:text-base uppercase leading-none text-slate-black mb-0.5">
                      Garantida
                    </p>
                    <div className="h-[1px] w-6 md:w-10 bg-black/40 my-0.5 md:my-1" />
                    <p className="font-display font-bold text-[6px] md:text-[9px] uppercase tracking-widest text-slate-black/90">
                      desde 2005
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">OSTAC</h2>
            <h3 className="text-2xl md:text-3xl font-display text-industrial-amber mb-8">METALURGICA E USINAGEM</h3>
            
            <div className="space-y-6 text-lg text-slate-black/70 leading-relaxed mb-12">
              <p>
                A OSTAC é formada por um grupo de profissionais com larga experiência em projetos metal mecânicos, usinagem de precisão, metrologia e caldeiraria, com alto nível de complexidade, seguindo normas técnicas nacionais e internacionais.
              </p>
              <p>
                Atua fortemente em projetos, fabricação de peças usinadas, fresadas e montagens de equipamentos ligados a todos os ambientes industriais, navais, metalúrgicos, automotivos e metal mecânicos de precisão, bem como estruturas metálicas na área da construção civil, manutenção, adequação, projeto e instalação mecânicas, petroquímicas em diversos metais ferrosos e não ferrosos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 bg-slate-black/5 border-l-4 border-industrial-amber">
                <h4 className="font-bold mb-2">Certificado NR-35</h4>
                <p className="text-sm opacity-60">Trabalho em Altura</p>
              </div>
              <div className="p-6 bg-slate-black/5 border-l-4 border-industrial-amber">
                <h4 className="font-bold mb-2">Certificado NR-18</h4>
                <p className="text-sm opacity-60">Uso Adequado de EPI</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-24">
          {/* Imagem do Soldador OSTAC centralizada acima do texto 'ATUAMOS NOS SEGMENTOS DE:' */}
          <div className="flex justify-center mb-8">
            <OstacLogo 
              className="w-52 sm:w-60 md:w-68 h-auto object-contain drop-shadow-md"
              alt="OSTAC Soldador e Usinagem" 
            />
          </div>

          <h3 className="text-3xl font-bold mb-12 text-center">ATUAMOS NOS <span className="text-industrial-amber">SEGMENTOS</span> DE:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {segments.map((seg, i) => (
              <div key={i} className="p-8 border border-slate-black/10 hover:border-industrial-amber transition-colors">
                <h4 className="text-xl font-bold mb-4 text-industrial-amber uppercase tracking-tighter">{seg.title}</h4>
                <ul className="space-y-2">
                  {seg.items.map((item, j) => (
                    <li key={j} className="text-sm text-slate-black/60 flex items-start gap-2">
                      <span className="text-industrial-amber mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-black text-white p-12 rounded-sm">
          <h3 className="text-3xl font-bold mb-12 text-center">PREMISSAS E <span className="text-industrial-amber">POLÍTICAS</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {policies.map((policy, i) => (
              <div key={i} className="flex items-center gap-3 p-4 border border-white/10">
                <ShieldCheck className="text-industrial-amber shrink-0 w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">{policy}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-industrial-amber font-bold mb-1">Trabalho Seguro</p>
              <p className="text-xs opacity-40 uppercase tracking-widest">e Confiável</p>
            </div>
            <div>
              <p className="text-industrial-amber font-bold mb-1">Sustentabilidade</p>
              <p className="text-xs opacity-40 uppercase tracking-widest">Contínua</p>
            </div>
            <div>
              <p className="text-industrial-amber font-bold mb-1">Satisfação</p>
              <p className="text-xs opacity-40 uppercase tracking-widest">de Clientes e Parceiros</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contato" className="bg-slate-black pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex flex-col items-start mb-8">
              <h1 className="text-3xl font-display font-bold text-brilliant tracking-tighter leading-none">
                TORNEARIA
              </h1>
              <h1 className="text-4xl font-display font-black text-brilliant tracking-widest leading-none -mt-1">
                OSTAC
              </h1>
            </div>
            <p className="text-titanium-silver/40 text-sm leading-relaxed mb-8">
              Líder em usinagem de precisão e soluções industriais em Itajaí. Transformando desafios técnicos em resultados de alta performance.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/torneariaostac/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-industrial-amber hover:text-slate-black transition-all"
                title="Instagram Tornearia Ostac"
                aria-label="Instagram Tornearia Ostac"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://web.facebook.com/ostactornearia/?locale=pt_BR&_rdc=1&_rdr#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-industrial-amber hover:text-slate-black transition-all"
                title="Facebook Tornearia Ostac"
                aria-label="Facebook Tornearia Ostac"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-widest mb-8">Links Rápidos</h4>
            <ul className="space-y-4 text-sm text-titanium-silver/60">
              <li><a href="#" className="hover:text-industrial-amber transition-colors">Início</a></li>
              <li><a href="#servicos" className="hover:text-industrial-amber transition-colors">Serviços</a></li>
              <li><a href="#sobre" className="hover:text-industrial-amber transition-colors">Sobre Nós</a></li>
              <li><a href="#contato" className="hover:text-industrial-amber transition-colors">Solicitar Orçamento</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-widest mb-8">Contato</h4>
            <ul className="space-y-6 text-sm text-titanium-silver/60">
              <li className="flex items-start gap-4">
                <MapPin className="text-industrial-amber w-5 h-5 shrink-0" />
                <span>R. Nossa Sra. de Fátima, 868 <br /> Cordeiros, Itajaí - SC</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-industrial-amber w-5 h-5 shrink-0" />
                <span>(47) 3346-1085</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-industrial-amber w-5 h-5 shrink-0" />
                <span>torneariaostac@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-titanium-silver/40 uppercase tracking-widest">
          <p>© 2026 Tornearia Ostac. Todos os direitos reservados.</p>
          <p>Engenharia e Precisão Industrial.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="mesh-gradient min-h-screen relative">
      <div className="fixed inset-0 steel-texture pointer-events-none z-10" />
      <Navbar />
      <main>
        <Hero />
        <InteractiveStatsSection />
        <Services />
        <Gallery />
        <About />
        <ContactForm />
      </main>
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/554733461085" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
