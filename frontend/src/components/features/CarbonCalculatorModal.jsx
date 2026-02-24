import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Leaf, TrendingUp, DollarSign, TreePine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CarbonCalculatorModal = ({ isOpen, onClose }) => {
  const [wasteAmount, setWasteAmount] = useState(100);
  // REMOVIDO: const [energyUsage, setEnergyUsage] = useState(500);
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      calculateCarbon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasteAmount, isOpen]); // REMOVIDO: energyUsage da dependência

  const calculateCarbon = async () => {
    setIsCalculating(true);
    try {
      // IMPORTANTE: Em desenvolvimento, backend roda na porta 8000
      // Em produção (Vercel), usa a mesma URL
      const baseUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8000'  // Porta do backend
        : window.location.origin;    // URL do Vercel em produção
      
      // MODIFICADO: Removido energy_usage da URL
      const url = `${baseUrl}/api/calcular-carbono?waste_amount=${wasteAmount}`;
      
      console.log('Chamando API em:', baseUrl);
      console.log('URL completa:', url);
      
      const response = await axios.post(url);
      
      const data = response.data;
      setResults({
        carbon_saved: data.carbonFootprint,
        trees_equivalent: Math.round(data.carbonFootprint * 0.45),
        revenue_potential: Math.round(data.carbonFootprint * 150)
      });
    } catch (error) {
      console.error('Error calculating carbon:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent data-testid="carbon-calculator-modal" className="max-w-2xl glass-surface">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center space-x-2">
            <Leaf className="text-accent" />
            <span>Calculadora de Captura de Carbono</span>
          </DialogTitle>
          <DialogDescription>
            Estime o potencial de captura de carbono e economia com suas operações sustentáveis.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* Waste Amount Slider - MANTIDO */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <Label className="text-base font-semibold">Resíduos Mensais (Toneladas)</Label>
              <span data-testid="waste-amount-display" className="text-xl font-bold text-accent">{wasteAmount}t</span>
            </div>
            <Slider
              data-testid="waste-slider"
              value={[wasteAmount]}
              onValueChange={(value) => setWasteAmount(value[0])}
              min={10}
              max={1000}
              step={10}
              className="w-full"
            />
          </div>

          {/* REMOVIDO: Bloco completo do Energy Usage Slider */}

          {/* Results - MANTIDO */}
          <AnimatePresence mode="wait">
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t"
              >
                <div data-testid="result-card-carbon" className="bg-white rounded-sm p-6 technical-border">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center">
                      <Leaf className="text-accent-foreground" size={20} />
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground">Carbono Capturado</div>
                  </div>
                  <div className="text-3xl font-bold text-primary">{results.carbon_saved} t</div>
                  <div className="text-xs text-muted-foreground mt-1">CO\2 por mês</div>
                </div>

                <div data-testid="result-card-trees" className="bg-white rounded-sm p-6 technical-border">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center">
                      <TreePine className="text-accent-foreground" size={20} />
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground">Árvores Equivalentes</div>
                  </div>
                  <div className="text-3xl font-bold text-primary">{results.trees_equivalent}</div>
                  <div className="text-xs text-muted-foreground mt-1">Árvores plantadas</div>
                </div>

                <div data-testid="result-card-revenue" className="bg-white rounded-sm p-6 technical-border md:col-span-2">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center">
                      <DollarSign className="text-accent-foreground" size={20} />
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground">Potencial de Receita</div>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <div className="text-3xl font-bold text-primary">R$ {results.revenue_potential.toLocaleString('pt-BR')}</div>
                    <div className="text-sm text-muted-foreground">por mês</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Baseado em créditos de carbono e valorização de resíduos</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-accent/10 rounded-sm p-4 border border-accent/20">
            <p className="text-sm text-foreground">
              <strong>Importante:</strong> Estes são cáculos estimados. Para uma avaliacão precisa e orçamento detalhado, agende uma visita técnica.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarbonCalculatorModal;