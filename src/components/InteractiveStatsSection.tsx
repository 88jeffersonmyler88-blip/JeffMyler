import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, MotionValue } from 'motion/react';
import { Clock, Target, Award } from 'lucide-react';
import { OstacLogo } from './OstacLogo';

interface StatItemProps {
  prefix?: string;
  targetNumber: number;
  suffix?: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  delay: number;
  index: number;
  scrollProgress: MotionValue<number>;
}

const AnimatedCounter: React.FC<{
  target: number;
  prefix?: string;
  suffix?: string;
  inView: boolean;
}> = ({ target, prefix = '', suffix = '', inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1800; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing suave exponencial (easeOutExpo)
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeOut * target);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    };

    const animFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animFrame);
  }, [inView, target]);

  return (
    <span className="tabular-nums font-black tracking-tight inline-block">
      {prefix}
      {count.toLocaleString('pt-BR')}
      {suffix}
    </span>
  );
};

const StatCard: React.FC<StatItemProps> = ({
  prefix,
  targetNumber,
  suffix,
  label,
  sublabel,
  icon,
  delay,
  index,
  scrollProgress,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.25 });

  // Deslocamento de Parallax suave no número ativado pelo SCROLL da página
  const direction = index === 1 ? -1 : 1;
  const numY = useTransform(scrollProgress, [0, 1], [24 * direction, -24 * direction]);
  const numX = useTransform(scrollProgress, [0, 1], [(index - 1) * -8, (index - 1) * 8]);

  // Marca d'água técnica de fundo que desliza suavemente no scroll
  const bgNumY = useTransform(scrollProgress, [0, 1], [36 * direction, -36 * direction]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: delay * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative group p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-white via-amber-50/20 to-slate-50 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(13,22,43,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(245,158,11,0.14)] hover:border-amber-400/50 transition-all duration-500 overflow-hidden flex flex-col justify-between"
    >
      {/* Luz ambiente de fundo reativa ao hover */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-400/20 group-hover:scale-125 transition-all duration-700" />

      {/* Linhas técnicas de precisão no canto superior */}
      <div className="flex items-center mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3.5 bg-slate-900 text-industrial-amber rounded-xl shadow-md group-hover:bg-industrial-amber group-hover:text-slate-900 transition-colors duration-300">
            {icon}
          </div>
          <div className="h-1.5 w-8 bg-amber-200 rounded-full group-hover:w-14 group-hover:bg-industrial-amber transition-all duration-500" />
        </div>
      </div>

      {/* Número com efeito de profundidade dinâmica no Scroll */}
      <motion.div 
        style={{ x: numX, y: numY }}
        className="relative z-10 mb-2 select-none"
      >
        <div className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-slate-900 tracking-tight flex items-baseline gap-1 select-none">
          <AnimatedCounter 
            target={targetNumber} 
            prefix={prefix} 
            suffix={suffix} 
            inView={isInView} 
          />
        </div>
      </motion.div>

      {/* Rótulo limpo, estável e perfeitamente legível (sem efeito de distorção de letras) */}
      <div className="relative z-10 pt-3 border-t border-slate-100">
        <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-800 font-display">
          {label}
        </h4>
        {sublabel && (
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {sublabel}
          </p>
        )}
      </div>

      {/* Marca d'água técnica de fundo que desliza no scroll */}
      <motion.div 
        style={{ y: bgNumY }}
        className="absolute -bottom-6 -right-4 font-black font-display text-8xl text-slate-900/[0.03] select-none pointer-events-none group-hover:text-amber-500/[0.08] transition-colors duration-500"
      >
        {prefix}{targetNumber}{suffix}
      </motion.div>
    </motion.div>
  );
};

export const InteractiveStatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll Parallax Suave (sem movimentação de mouse)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 65, damping: 22 });
  const yFloating1 = useTransform(smoothScrollY, [0, 1], [-28, 28]);
  const yFloating2 = useTransform(smoothScrollY, [0, 1], [34, -34]);
  const rotateSlight = useTransform(smoothScrollY, [0, 1], [-2, 2]);

  const stats = [
    {
      prefix: "+",
      targetNumber: 20,
      suffix: "",
      label: "Anos de Experiência",
      sublabel: "Tradição em usinagem pesada e caldeiraria",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      prefix: "",
      targetNumber: 100,
      suffix: "%",
      label: "Precisão Técnica",
      sublabel: "Tolerâncias rigorosas e conformidade ISO",
      icon: <Target className="w-5 h-5" />,
    },
    {
      prefix: "+",
      targetNumber: 1000,
      suffix: "",
      label: "Projetos",
      sublabel: "Obras entregues para indústrias e portos",
      icon: <Award className="w-5 h-5" />,
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="bg-gradient-to-b from-white via-slate-50/70 to-white text-slate-black py-20 relative z-30 overflow-hidden border-y border-slate-200/60"
    >
      {/* Background Decorativo com Linhas de Grade de Usinagem em Parallax de Scroll */}
      <motion.div 
        style={{ y: yFloating1 }}
        className="absolute inset-0 pointer-events-none opacity-[0.035] [background-image:radial-gradient(#0d162b_1px,transparent_1px)] [background-size:24px_24px]"
      />

      {/* Partículas sutis e reflexos industriais flutuantes no scroll */}
      <motion.div 
        style={{ y: yFloating2, rotate: rotateSlight }}
        className="absolute top-1/4 -left-20 w-72 h-72 bg-industrial-amber/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: yFloating1 }}
        className="absolute bottom-10 -right-20 w-80 h-80 bg-blue-900/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Imagem do Soldador OSTAC centralizada acima das estatísticas */}
        <div className="flex flex-col items-center justify-center mb-12">
          <OstacLogo 
            className="w-56 sm:w-64 md:w-72 h-auto object-contain drop-shadow-md"
            alt="OSTAC Soldador e Usinagem" 
          />
          <div className="mt-3 flex items-center justify-center text-xs font-mono tracking-widest text-slate-400 uppercase font-semibold text-center">
            <span>Engenharia & Soluções Industriais de Alta Precisão</span>
          </div>
        </div>

        {/* Grade de Estatísticas com Movimento de Números e Letras no Scroll */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {stats.map((stat, idx) => (
            <StatCard
              key={idx}
              index={idx}
              delay={idx}
              prefix={stat.prefix}
              targetNumber={stat.targetNumber}
              suffix={stat.suffix}
              label={stat.label}
              sublabel={stat.sublabel}
              icon={stat.icon}
              scrollProgress={smoothScrollY}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
