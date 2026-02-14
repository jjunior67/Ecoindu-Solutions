import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CarbonCalculatorModal from '@/components/features/CarbonCalculatorModal';

const HeroSection = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden grain-overlay">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1759812765703-f5f98fe1c854?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwyfHxpbmR1c3RyaWFsJTIwZW5naW5lZXIlMjByZW5ld2FibGUlMjBlbmVyZ3klMjBwbGFudHxlbnwwfHx8fDE3NzEwODMxNDB8MA&ixlib=rb-4.1.0&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(26, 60, 52, 0.4), rgba(26, 60, 52, 0.9))'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left: Content */}
          <div className="col-span-1 md:col-span-7">
            <motion.div
              data-testid="hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Award size={16} className="text-accent" />
              <span className="text-xs font-semibold text-white tracking-wider uppercase">Certificado UFMS</span>
            </motion.div>

            <motion.h1
              data-testid="hero-headline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6"
            >
              Transforme Passivos em{' '}
              <span className="text-accent">Ativos Sustentáveis</span>
            </motion.h1>

            <motion.p
              data-testid="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/90 mb-8 max-w-2xl leading-relaxed"
            >
              Consultoria especializada em eficiência energética, reciclagem de plástico e captura de carbono. 
              Do projeto à implementação de linhas de produção sustentáveis.
            </motion.p>

            <motion.div
              data-testid="hero-credentials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-6 mb-10"
            >
              <div className="flex items-center space-x-2">
                <Leaf className="text-accent" size={20} />
                <span className="text-white/80 text-sm">Mestrado UFMS</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="text-accent" size={20} />
                <span className="text-white/80 text-sm">Eficiência Energética</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="text-accent" size={20} />
                <span className="text-white/80 text-sm">Certificações Verdes</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                data-testid="hero-cta-primary"
                onClick={scrollToContact}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold group"
              >
                Agendar Visita Técnica
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
              <Button
                data-testid="hero-cta-calculator"
                onClick={() => setIsCalculatorOpen(true)}
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                Calcular Captura de Carbono
              </Button>
            </motion.div>
          </div>

          {/* Right: Stats Cards */}
          <div className="col-span-1 md:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-4"
            >
              <div data-testid="hero-stat-card-1" className="bg-white/10 backdrop-blur-md border border-white/20 rounded-sm p-6 custom-shadow">
                <div className="text-3xl font-bold text-accent mb-2">100%</div>
                <div className="text-white/90 text-sm">Soluções Personalizadas</div>
              </div>
              <div data-testid="hero-stat-card-2" className="bg-white/10 backdrop-blur-md border border-white/20 rounded-sm p-6 custom-shadow">
                <div className="text-3xl font-bold text-accent mb-2">360°</div>
                <div className="text-white/90 text-sm">Da Logística à Produção</div>
              </div>
              <div data-testid="hero-stat-card-3" className="bg-white/10 backdrop-blur-md border border-white/20 rounded-sm p-6 custom-shadow">
                <div className="text-3xl font-bold text-accent mb-2">UFMS</div>
                <div className="text-white/90 text-sm">Mestrado em Sustentabilidade</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <CarbonCalculatorModal 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />
    </section>
  );
};

export default HeroSection;