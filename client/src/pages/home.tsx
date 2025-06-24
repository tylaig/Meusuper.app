import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ContactForm {
  nome: string;
  telefone: string;
  empresa: string;
  dor: string;
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({
    nome: "",
    telefone: "",
    empresa: "",
    dor: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const response = await apiRequest("POST", "/api/webhook", data);
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      setFormData({ nome: "", telefone: "", empresa: "", dor: "" });
      
      // Redirect to WhatsApp after 3 seconds
      setTimeout(() => {
        const whatsappUrl = `https://wa.me/5511999999999?text=Ol%C3%A1%2C%20sou%20${formData.nome}%20e%20acabei%20de%20preencher%20o%20formul%C3%A1rio%20no%20site.%20Gostaria%20de%20conversar%20sobre%20automa%C3%A7%C3%A3o%20para%20minha%20empresa.`;
        window.open(whatsappUrl, '_blank');
      }, 3000);
    },
    onError: (error) => {
      console.error('Form submission error:', error);
      toast({
        title: "Erro ao enviar formulário",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.telefone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha nome e telefone.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const toggleFAQ = (num: number) => {
    const content = document.getElementById(`content-${num}`);
    const icon = document.getElementById(`icon-${num}`);
    
    if (content && icon) {
      content.classList.toggle('hidden');
      icon.classList.toggle('rotate-180');
    }
  };

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href?.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 font-inter">
      {/* Navigation */}
      <nav className="gradient-bg text-white sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="text-gold">Meu</span>Super.app
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#sobre" className="hover:text-gold transition duration-300">Sobre</a>
              <a href="#servicos" className="hover:text-gold transition duration-300">Serviços</a>
              <a href="#resultados" className="hover:text-gold transition duration-300">Resultados</a>
              <a href="#faq" className="hover:text-gold transition duration-300">FAQ</a>
              <a href="#contato" className="hover:text-gold transition duration-300">Contato</a>
            </div>
            <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20automatizar%20minha%20empresa%20com%20o%20MeuSuper.app" 
               className="bg-gold hover:bg-gold-dark text-purple-dark font-bold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105 cta-button">
              <i className="fab fa-whatsapp mr-2"></i>Falar com especialista
            </a>
            <button 
              className="md:hidden focus:outline-none" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4">
              <div className="flex flex-col space-y-3 pb-4">
                <a href="#sobre" className="hover:text-gold transition duration-300" onClick={() => setMobileMenuOpen(false)}>Sobre</a>
                <a href="#servicos" className="hover:text-gold transition duration-300" onClick={() => setMobileMenuOpen(false)}>Serviços</a>
                <a href="#resultados" className="hover:text-gold transition duration-300" onClick={() => setMobileMenuOpen(false)}>Resultados</a>
                <a href="#faq" className="hover:text-gold transition duration-300" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                <a href="#contato" className="hover:text-gold transition duration-300" onClick={() => setMobileMenuOpen(false)}>Contato</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-bg text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-12 md:mb-0 fade-in">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Automação com <span className="text-gold">IA</span> sob medida para escalar seu negócio
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Atenda, venda e prospecte no WhatsApp com bots inteligentes e integrações que realmente funcionam.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#contato" className="bg-gold hover:bg-gold-dark text-purple-dark font-bold py-4 px-8 rounded-full text-center transition duration-300 transform hover:scale-105 cta-button">
                <i className="fas fa-rocket mr-2"></i>Quero automatizar agora
              </a>
              <a href="#servicos" className="border-2 border-white hover:bg-white hover:text-purple-dark text-white font-bold py-4 px-8 rounded-full text-center transition duration-300">
                <i className="fas fa-eye mr-2"></i>Conhecer serviços
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="floating-animation">
              <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600" alt="AI and automation technology" className="w-full max-w-md rounded-xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="fade-in">
              <div className="text-4xl font-bold text-purple-custom mb-2">100+</div>
              <div className="text-gray-600">Projetos Entregues</div>
            </div>
            <div className="fade-in">
              <div className="text-4xl font-bold text-purple-custom mb-2">50+</div>
              <div className="text-gray-600">Clientes Satisfeitos</div>
            </div>
            <div className="fade-in">
              <div className="text-4xl font-bold text-purple-custom mb-2">24/7</div>
              <div className="text-gray-600">Suporte Automatizado</div>
            </div>
            <div className="fade-in">
              <div className="text-4xl font-bold text-purple-custom mb-2">300%</div>
              <div className="text-gray-600">Aumento Médio em Vendas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section id="sobre" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-purple-dark">Quem somos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">Especialistas em automação inteligente para negócios que querem crescer</p>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600" alt="Samuel Vicente Ferreira - Founder" className="rounded-2xl shadow-2xl w-full max-w-md mx-auto" />
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-purple-dark mb-6">Samuel Vicente Ferreira</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  O <span className="font-bold text-purple-custom">MeuSuper.app</span> nasceu da mente de Samuel Vicente Ferreira, desenvolvedor e estrategista que une IA, automações e visão de negócio para construir soluções inteligentes de atendimento, vendas e prospecção digital.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Com anos de experiência em desenvolvimento de software e estratégias de crescimento, nossa equipe cria soluções personalizadas que realmente resolvem os problemas dos nossos clientes, gerando resultados mensuráveis e escaláveis.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-purple-custom mb-2">5+</div>
                    <div className="text-gray-600 text-sm">Anos de Experiência</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-purple-custom mb-2">R$ 2M+</div>
                    <div className="text-gray-600 text-sm">Economizado pelos Clientes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-purple-dark">O que fazemos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">Soluções inteligentes para automatizar e escalar seu negócio com resultados comprovados</p>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transition duration-500 card-hover border border-gray-100">
              <div className="service-icon text-center">
                <i className="fas fa-robot"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-dark text-center">Bots com IA para WhatsApp</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Criação de agentes inteligentes que respondem em tempo real, com voz, áudio, leitura de PDFs, acesso a banco de dados e muito mais.
              </p>
              <div className="mt-6 text-center">
                <span className="inline-block bg-purple-100 text-purple-dark px-3 py-1 rounded-full text-sm font-medium">Conversational AI</span>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transition duration-500 card-hover border border-gray-100">
              <div className="service-icon text-center">
                <i className="fas fa-plug"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-dark text-center">Integrações via API</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Conectamos seu negócio ao que importa: CRM, e-commerce, planilhas, ERP ou qualquer sistema com n8n e automações sob medida.
              </p>
              <div className="mt-6 text-center">
                <span className="inline-block bg-purple-100 text-purple-dark px-3 py-1 rounded-full text-sm font-medium">System Integration</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transition duration-500 card-hover border border-gray-100">
              <div className="service-icon text-center">
                <i className="fas fa-cubes"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-dark text-center">Plataformas sob demanda</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Desenvolvimento de sistemas SaaS, painéis, sites e aplicativos completos com foco em automação e escalabilidade.
              </p>
              <div className="mt-6 text-center">
                <span className="inline-block bg-purple-100 text-purple-dark px-3 py-1 rounded-full text-sm font-medium">Custom Development</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transition duration-500 card-hover border border-gray-100">
              <div className="service-icon text-center">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-dark text-center">Consultorias e Mentorias</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Treinamentos personalizados para dominar ferramentas no-code e implementar automações reais, sem depender de devs.
              </p>
              <div className="mt-6 text-center">
                <span className="inline-block bg-purple-100 text-purple-dark px-3 py-1 rounded-full text-sm font-medium">Training & Consulting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section id="resultados" className="py-20 gradient-bg text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Clientes e Resultados</h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-6">Veja o que nossos clientes estão dizendo sobre nossas soluções</p>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Depoimento 1 */}
            <div className="bg-purple-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100" alt="Ana Carolina" className="w-16 h-16 rounded-full mr-4 border-2 border-gold object-cover" />
                <div>
                  <h4 className="font-bold text-lg">Ana Carolina</h4>
                  <p className="text-purple-300">CEO - E-commerce de Moda</p>
                </div>
              </div>
              <p className="italic text-lg leading-relaxed mb-4">
                "Dobrei minhas vendas em 3 meses com o bot do Samuel. Ele entende de tech e de negócio. O atendimento automatizado no WhatsApp foi um divisor de águas para minha empresa."
              </p>
              <div className="flex mb-4">
                <i className="fas fa-star text-gold"></i>
                <i className="fas fa-star text-gold"></i>
                <i className="fas fa-star text-gold"></i>
                <i className="fas fa-star text-gold"></i>
                <i className="fas fa-star text-gold"></i>
              </div>
              <div className="text-sm text-purple-200">
                <strong>Resultado:</strong> +200% em vendas | Redução de 80% no tempo de atendimento
              </div>
            </div>

            {/* Depoimento 2 */}
            <div className="bg-purple-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100" alt="Ricardo Mendes" className="w-16 h-16 rounded-full mr-4 border-2 border-gold object-cover" />
                <div>
                  <h4 className="font-bold text-lg">Ricardo Mendes</h4>
                  <p className="text-purple-300">Diretor - Agência Digital</p>
                </div>
              </div>
              <p className="italic text-lg leading-relaxed mb-4">
                "Economizamos mais de R$ 15 mil por mês com as automações. Atendimento 24/7, sem contratar mais ninguém. A integração com nosso CRM foi perfeita!"
              </p>
              <div className="flex mb-4">
                <i className="fas fa-star text-gold"></i>
                <i className="fas fa-star text-gold"></i>
                <i className="fas fa-star text-gold"></i>
                <i className="fas fa-star text-gold"></i>
                <i className="fas fa-star text-gold"></i>
              </div>
              <div className="text-sm text-purple-200">
                <strong>Resultado:</strong> -R$ 180k/ano em custos | +50 leads qualificados/mês
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-purple-dark">Perguntas Frequentes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">Tire suas dúvidas sobre nossas soluções de automação</p>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button className="w-full px-8 py-6 text-left focus:outline-none" onClick={() => toggleFAQ(1)}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-purple-dark">Quanto tempo leva para implementar um bot no WhatsApp?</h3>
                    <i className="fas fa-chevron-down transition-transform duration-300" id="icon-1"></i>
                  </div>
                </button>
                <div className="hidden px-8 pb-6" id="content-1">
                  <p className="text-gray-700">Em média, levamos de 7 a 15 dias para entregar um bot completamente funcional, dependendo da complexidade das integrações necessárias. Bots simples podem ser entregues em até 3 dias.</p>
                </div>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button className="w-full px-8 py-6 text-left focus:outline-none" onClick={() => toggleFAQ(2)}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-purple-dark">As automações funcionam com meu sistema atual?</h3>
                    <i className="fas fa-chevron-down transition-transform duration-300" id="icon-2"></i>
                  </div>
                </button>
                <div className="hidden px-8 pb-6" id="content-2">
                  <p className="text-gray-700">Sim! Trabalhamos com integrações via API para conectar praticamente qualquer sistema: CRMs, ERPs, e-commerce, planilhas e muito mais. Se tem API, conseguimos integrar.</p>
                </div>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button className="w-full px-8 py-6 text-left focus:outline-none" onClick={() => toggleFAQ(3)}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-purple-dark">Qual é o investimento necessário?</h3>
                    <i className="fas fa-chevron-down transition-transform duration-300" id="icon-3"></i>
                  </div>
                </button>
                <div className="hidden px-8 pb-6" id="content-3">
                  <p className="text-gray-700">Nossos projetos começam a partir de R$ 2.997 para bots básicos. O investimento varia conforme a complexidade e integrações necessárias. Oferecemos sempre um ROI positivo em até 90 dias.</p>
                </div>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button className="w-full px-8 py-6 text-left focus:outline-none" onClick={() => toggleFAQ(4)}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-purple-dark">Vocês oferecem suporte após a entrega?</h3>
                    <i className="fas fa-chevron-down transition-transform duration-300" id="icon-4"></i>
                  </div>
                </button>
                <div className="hidden px-8 pb-6" id="content-4">
                  <p className="text-gray-700">Claro! Oferecemos 30 dias de suporte gratuito após a entrega e planos de manutenção mensal a partir de R$ 297. Também temos treinamento para sua equipe usar as automações.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário de Contato */}
      <section id="contato" className="py-20 gradient-bg text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Pronto para automatizar seu negócio?</h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-6">Fale com um especialista agora e veja como seu atendimento pode trabalhar por você 24 horas por dia.</p>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="max-w-2xl mx-auto">
            {!showSuccess ? (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                    <input 
                      type="text" 
                      id="nome" 
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-custom focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">Telefone (WhatsApp) *</label>
                    <input 
                      type="tel" 
                      id="telefone" 
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-custom focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-2">Nome da empresa</label>
                  <input 
                    type="text" 
                    id="empresa" 
                    value={formData.empresa}
                    onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-custom focus:border-transparent text-gray-900"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="dor" className="block text-sm font-medium text-gray-700 mb-2">Qual sua maior dor hoje?</label>
                  <textarea 
                    id="dor" 
                    rows={4} 
                    value={formData.dor}
                    onChange={(e) => setFormData({...formData, dor: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-custom focus:border-transparent resize-none text-gray-900" 
                    placeholder="Descreva o principal desafio que você gostaria de resolver com automação..."
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full bg-gold hover:bg-gold-dark text-purple-dark font-bold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105 cta-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  {contactMutation.isPending ? 'Enviando...' : 'Quero automatizar agora'}
                </button>
              </form>
            ) : (
              <div className="mt-6 p-6 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
                <i className="fas fa-check-circle text-2xl mb-2"></i>
                <p className="font-semibold">Obrigado! Em breve nossa equipe entrará em contato com você pelo WhatsApp.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold mb-4">
                <span className="text-gold">Meu</span>Super.app
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Especialistas em automação inteligente para empresas que querem crescer e escalar com IA.
              </p>
              <div className="flex space-x-4">
                <a href="https://wa.me/5511999999999" className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition duration-300">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition duration-300">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition duration-300">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Serviços</h3>
              <ul className="space-y-2">
                <li><a href="#servicos" className="hover:text-gold transition duration-300">Bots WhatsApp</a></li>
                <li><a href="#servicos" className="hover:text-gold transition duration-300">Integrações API</a></li>
                <li><a href="#servicos" className="hover:text-gold transition duration-300">Desenvolvimento</a></li>
                <li><a href="#servicos" className="hover:text-gold transition duration-300">Consultoria</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Empresa</h3>
              <ul className="space-y-2">
                <li><a href="#sobre" className="hover:text-gold transition duration-300">Sobre Nós</a></li>
                <li><a href="#resultados" className="hover:text-gold transition duration-300">Cases</a></li>
                <li><a href="#faq" className="hover:text-gold transition duration-300">FAQ</a></li>
                <li><a href="#contato" className="hover:text-gold transition duration-300">Contato</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p>&copy; 2025 MeuSuper.app - Todos os direitos reservados</p>
            <div className="mt-4 space-x-4">
              <a href="#" className="hover:text-gold transition duration-300">Política de Privacidade</a>
              <a href="#" className="hover:text-gold transition duration-300">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
