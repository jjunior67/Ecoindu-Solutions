import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Target, Users } from 'lucide-react';

const AboutSection = () => {
  const credentials = [
    {
      icon: GraduationCap,
      title: 'Formação Acadêmica',
      description: 'Eletrotécnica Industrial + Mestrado em Eficiência Energética e Sustentabilidade pela UFMS'
    },
    {
      icon: Award,
      title: 'Expertise Especializada',
      description: 'Conhecimento profundo em reciclagem de plástico, logística e construção de linhas de produção'
    },
    {
      icon: Target,
      title: 'Abordagem 360°',
      description: 'Da concepção do projeto à operação, cobrimos todas as etapas do processo industrial sustentável'
    },
    {
      icon: Users,
      title: 'Consultoria Personalizada',
      description: 'Visitas técnicas presenciais para entender profundamente suas necessidades e desafios'
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-secondary/30 grain-overlay">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-5"
          >
            <div className="relative rounded-sm overflow-hidden custom-shadow">
              <img 
                src="https://images.unsplash.com/photo-1758574697253-25a1bad14666?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHw0fHxlbmdpbmVlciUyMHdpdGglMjBoYXJkJTIwaGF0JTIwYW5kJTIwdGFibGV0fGVufDB8fHx8MTc3MTA4MzE1MXww&ixlib=rb-4.1.0&q=85"
                alt="Engenheiro consultor"
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-transparent p-6">
                <div className="text-white">
                  <div className="text-sm font-semibold tracking-wider uppercase mb-1">Consultor Especializado</div>
                  <div className="text-2xl font-bold">UFMS Certified</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="col-span-1 md:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="uppercase tracking-[0.2em] text-xs font-semibold text-accent-foreground mb-4 block">Sobre a Consultoria</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight leading-[1.1] mb-6">
                Expertise Técnica para Transformação Sustentável
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Com formação sólida pela UFMS e experiência prática em projetos industriais, oferecemos consultoria especializada que transforma desafios ambientais em oportunidades de negócio.
              </p>

              <div className="space-y-6">
                {credentials.map((item, index) => (
                  <motion.div
                    key={index}
                    data-testid={`credential-card-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4 bg-white rounded-sm p-4 technical-border hover-lift"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-sm bg-accent/10 flex items-center justify-center">
                        <item.icon className="text-accent-foreground" size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;