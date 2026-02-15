import React from 'react';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-sm bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold">E</span>
              </div>
              <span className="text-lg font-bold">EcoIndus Solutions</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Transformando passivos industriais em ativos sustentáveis. Consultoria especializada em eficiência energética e reciclagem.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Serviços</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Eficiência Energética</li>
              <li>Reciclagem de Plástico</li>
              <li>Captura de Carbono</li>
              <li>Linhas de Produção</li>
              <li>Consultoria Ambiental</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>ecoindusolutions@gmail.com</li>
              <li>+55 (67) 99303-5810</li>
              <li>Campo Grande, MS - Brasil</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/60 mb-4 md:mb-0">
              © {new Date().getFullYear()} EcoIndus Solutions. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-2 text-sm text-white/60">
              <Leaf size={16} className="text-accent" />
              <span>Certificado UFMS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;