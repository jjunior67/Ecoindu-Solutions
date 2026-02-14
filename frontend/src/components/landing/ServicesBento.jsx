import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Recycle, Leaf, Factory, TrendingUp } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: 'Eficiência Energética',
    description: 'Auditorias completas e implementação de sistemas de economia energética para redução de custos operacionais.',
    image: 'https://images.unsplash.com/photo-1770121696398-6084654c1364?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMG9uJTIwZmFjdG9yeSUyMHJvb2Z8ZW58MHx8fHwxNzcxMDgzMTUwfDA&ixlib=rb-4.1.0&q=85',
    gridClass: 'md:col-span-6 md:row-span-2'
  },
  {
    icon: Recycle,
    title: 'Linhas de Reciclagem de Plástico',
    description: 'Logística completa até construção de linhas de produção para transformação de resíduos em matéria-prima.',
    image: 'https://images.unsplash.com/photo-1607854364114-f2c2b14f8bb1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxwbGFzdGljJTIwcmVjeWNsaW5nJTIwcGVsbGV0cyUyMGNsb3NlJTIwdXB8ZW58MHx8fHwxNzcxMDgzMTQ5fDA&ixlib=rb-4.1.0&q=85',
    gridClass: 'md:col-span-6 md:row-span-1'
  },
  {
    icon: Leaf,
    title: 'Captura de Carbono & Certificações',
    description: 'Projeções precisas de captura de carbono e auxílio na obtenção de certificados verdes.',
    image: 'https://images.unsplash.com/photo-1562670766-fe70eee642e9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NjV8MHwxfHNlYXJjaHwxfHxjYXJib24lMjBjYXB0dXJlJTIwZmFjaWxpdHklMjB0ZWNobm9sb2d5fGVufDB8fHx8MTc3MTA4MzE0MXww&ixlib=rb-4.1.0&q=85',
    gridClass: 'md:col-span-6 md:row-span-1'
  },
  {
    icon: Factory,
    title: 'Construção de Linhas de Produção Verde',
    description: 'Projetos completos de linhas industriais sustentáveis, do conceito à operação.',
    image: 'https://images.unsplash.com/photo-1759812765703-f5f98fe1c854?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwyfHxpbmR1c3RyaWFsJTIwZW5naW5lZXIlMjByZW5ld2FibGUlMjBlbmVyZ3klMjBwbGFudHxlbnwwfHx8fDE3NzEwODMxNDB8MA&ixlib=rb-4.1.0&q=85',
    gridClass: 'md:col-span-4 md:row-span-2'
  },
  {
    icon: TrendingUp,
    title: 'Consultoria Passivo-Ativo',
    description: 'Transforme cinzas, resíduos e passivos industriais em produtos comercializáveis: asfalto verde, mobiliário urbano e mais.',
    image: 'https://images.unsplash.com/photo-1762344093522-9a83cc3da323?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwzfHxyb2FkJTIwY29uc3RydWN0aW9uJTIwYXNwaGFsdCUyMG1vZGVybnxlbnwwfHx8fDE3NzEwODMxNTJ8MA&ixlib=rb-4.1.0&q=85',
    gridClass: 'md:col-span-8 md:row-span-1'
  }
];

const ServicesBento = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-background grain-overlay">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[0.2em] text-xs font-semibold text-accent-foreground mb-4 block">Nossos Serviços</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight leading-[1.1] mb-4">
            Soluções Completas para Sustentabilidade Industrial
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Da análise inicial à implementação completa, oferecemos consultoria especializada em todas as etapas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              data-testid={`service-card-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${service.gridClass} group`}
            >
              <div className="h-full bg-card rounded-sm overflow-hidden technical-border hover-lift custom-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/60 group-hover:bg-primary/40 transition-colors" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 rounded-sm bg-accent/90 flex items-center justify-center">
                      <service.icon className="text-accent-foreground" size={24} />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesBento;