import React from 'react';
import { motion } from 'framer-motion';
import { Building, Truck, TreePine } from 'lucide-react';

const projects = [
  {
    title: 'Asfalto Verde',
    description: 'Transformação de cinzas industriais em asfalto ecológico',
    icon: Building,
    image: 'https://images.unsplash.com/photo-1762344093522-9a83cc3da323?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwzfHxyb2FkJTIwY29uc3RydWN0aW9uJTIwYXNwaGFsdCUyMG1vZGVybnxlbnwwfHx8fDE3NzEwODMxNTJ8MA&ixlib=rb-4.1.0&q=85',
    category: 'Economia Circular'
  },
  {
    title: 'Mobiliário Urbano',
    description: 'Produtos sustentáveis a partir de plástico reciclado',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1607854364114-f2c2b14f8bb1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxwbGFzdGljJTIwcmVjeWNsaW5nJTIwcGVsbGV0cyUyMGNsb3NlJTIwdXB8ZW58MHx8fHwxNzcxMDgzMTQ5fDA&ixlib=rb-4.1.0&q=85',
    category: 'Reciclagem'
  },
  {
    title: 'Retrofit Industrial',
    description: 'Modernização energética de instalações existentes',
    icon: TreePine,
    image: 'https://images.unsplash.com/photo-1770121696398-6084654c1364?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMG9uJTIwZmFjdG9yeSUyMHJvb2Z8ZW58MHx8fHwxNzcxMDgzMTUwfDA&ixlib=rb-4.1.0&q=85',
    category: 'Eficiência Energética'
  }
];

const ProjectGallery = () => {
  return (
    <section id="projects" className="py-24 md:py-32 bg-background grain-overlay">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[0.2em] text-xs font-semibold text-accent-foreground mb-4 block">Projetos Realizados</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight leading-[1.1] mb-4">
            Casos de Sucesso em Sustentabilidade
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exemplos de como transformamos passivos industriais em soluções lucrativas e sustentáveis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              data-testid={`project-card-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-sm overflow-hidden technical-border hover-lift custom-shadow h-full">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80" />
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-sm bg-accent/90 flex items-center justify-center">
                      <project.icon className="text-accent-foreground" size={20} />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-semibold text-accent tracking-wider uppercase">{project.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground italic">
            Esta é uma amostra de projetos. Você poderá adicionar suas próprias fotos e casos de sucesso posteriormente.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectGallery;