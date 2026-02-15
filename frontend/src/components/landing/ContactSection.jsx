import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    industry: '',
    project_type: '',
    message: '',
    preferred_date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${BACKEND_URL}/api/consultation`, formData);
      toast.success('Solicitação enviada com sucesso! Entraremos em contato em breve.');
      setFormData({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        industry: '',
        project_type: '',
        message: '',
        preferred_date: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary/30 grain-overlay">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[0.2em] text-xs font-semibold text-accent-foreground mb-4 block">Entre em Contato</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight leading-[1.1] mb-4">
            Agende Sua Visita Técnica
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada projeto é único. Vamos visitar sua instalação para entender suas necessidades e propor soluções personalizadas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-5"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-6">Informações de Contato</h3>
                <div className="space-y-4">
                  <div data-testid="contact-info-email" className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-accent-foreground" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-primary mb-1">Email</div>
                      <div className="text-muted-foreground">ecoindusolutions@gmail.com</div>
                    </div>
                  </div>

                  <div data-testid="contact-info-phone" className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-accent-foreground" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-primary mb-1">Telefone</div>
                      <div className="text-muted-foreground">+55 (67) 99303-5810</div>
                    </div>
                  </div>

                  <div data-testid="contact-info-location" className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-accent-foreground" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-primary mb-1">Localização</div>
                      <div className="text-muted-foreground">Campo Grande, MS - Brasil</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 rounded-sm p-6 border border-accent/20">
                <Calendar className="text-accent-foreground mb-3" size={32} />
                <h4 className="font-bold text-primary mb-2">Visita Técnica Inclusa</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nossa consultoria começa com uma visita presencial para avaliar suas instalações e entender profundamente seus desafios. Orçamento detalhado após a visita.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-7"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-sm p-8 technical-border custom-shadow">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company_name">Nome da Empresa </Label>
                    <Input
                      id="company_name"
                      data-testid="input-company-name"
                      required
                      value={formData.company_name}
                      onChange={(e) => handleChange('company_name', e.target.value)}
                      placeholder="Sua empresa"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact_name">Nome do Contato *</Label>
                    <Input
                      id="contact_name"
                      data-testid="input-contact-name"
                      required
                      value={formData.contact_name}
                      onChange={(e) => handleChange('contact_name', e.target.value)}
                      placeholder="Seu nome"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      data-testid="input-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      data-testid="input-phone"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="(67) 99999-9999"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="industry">Setor Industrial </Label>
                    <Select value={formData.industry} onValueChange={(value) => handleChange('industry', value)} required>
                      <SelectTrigger data-testid="select-industry" className="mt-2">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manufacturing">Manufatura</SelectItem>
                        <SelectItem value="construction">Construção Civil</SelectItem>
                        <SelectItem value="energy">Energia</SelectItem>
                        <SelectItem value="chemical">Química</SelectItem>
                        <SelectItem value="food">Alimentos e Bebidas</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="project_type">Tipo de Projeto *</Label>
                    <Select value={formData.project_type} onValueChange={(value) => handleChange('project_type', value)} required>
                      <SelectTrigger data-testid="select-project-type" className="mt-2">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="energy_efficiency">Eficiência Energética</SelectItem>
                        <SelectItem value="plastic_recycling">Reciclagem de Plástico</SelectItem>
                        <SelectItem value="carbon_capture">Captura de Carbono</SelectItem>
                        <SelectItem value="production_line">Linha de Produção</SelectItem>
                        <SelectItem value="waste_transformation">Transformação de Resíduos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="preferred_date">Data Preferencial para Visita</Label>
                  <Input
                    id="preferred_date"
                    data-testid="input-preferred-date"
                    type="date"
                    value={formData.preferred_date}
                    onChange={(e) => handleChange('preferred_date', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    data-testid="textarea-message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Conte-nos mais sobre seu projeto e desafios..."
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <Button
                  data-testid="submit-consultation-button"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold group"
                  size="lg"
                >
                  {isSubmitting ? 'Enviando...' : 'Solicitar Visita Técnica'}
                  <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;