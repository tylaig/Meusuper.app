import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ParticleBackground } from "@/components/ParticleBackground";
import { WhatsAppModal } from "@/components/WhatsAppModal";
import { useToast } from "@/hooks/use-toast";
import {
  Clock,
  MessageSquare,
  Users,
  CheckCircle,
  ArrowRight,
  Target,
  TrendingUp,
  Award,
  Zap,
  Bot,
  Star,
  GraduationCap,
  ShoppingCart,
  UserCheck,
  Building2,
  Heart,
  ChevronDown,
  Menu,
  X,
  Calendar,
  Briefcase,
  Shield
} from "lucide-react";

interface ContactForm {
  nome: string;
  telefone: string;
  empresa: string;
  dor: string;
}

export default function ModernHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [scrollIndicatorOpacity, setScrollIndicatorOpacity] = useState(1);
  const [formData, setFormData] = useState<ContactForm>({
    nome: "",
    telefone: "",
    empresa: "",
    dor: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const response = await fetch("/api/webhook", {
        method: "POST",
        body: data,
      });
      return response;
    },
    onSuccess: () => {
      setShowSuccess(true);
      toast({
        title: "Mensagem enviada!",
        description: "Em breve nossa equipe entrará em contato com você.",
      });
      
      // Redirect to WhatsApp after 3 seconds
      setTimeout(() => {
        const message = encodeURIComponent(
          `Olá! Acabei de preencher o formulário no site do MeuSuper.app. Faturamento: ${formData.faturamento}. Empresa: ${formData.empresa || 'não informado'}. Principal dor: ${formData.dor}`
        );
        window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
      }, 3000);
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Hide scroll indicator after scrolling
      const opacity = Math.max(1 - currentScrollY / 300, 0);
      setScrollIndicatorOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      <ParticleBackground />

      {/* Scroll Indicator */}
      <div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 transition-opacity duration-500"
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <div className="flex flex-col items-center text-center animate-bounce">
          <div className="bg-gradient-to-r from-purple-500/20 to-orange-500/20 backdrop-blur-sm rounded-full p-4 border border-orange-400/30 mb-2 animate-pulse">
            <svg 
              className="w-6 h-6 text-orange-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <p className="text-orange-300 text-xs font-medium">
            Role para descobrir seus problemas
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-purple-500/20">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl sm:text-2xl font-bold group cursor-pointer">
              <span className="text-orange-highlight transition-all duration-300 group-hover:text-orange-300">
                Meu
              </span>
              <span className="text-white transition-all duration-300 group-hover:text-gray-200">
                Super.app
              </span>
            </div>
            
            <nav className="hidden lg:flex space-x-6">
              {[
                { label: "Como funciona", href: "#como-funciona" },
                { label: "Para quem é", href: "#para-quem" },
                { label: "Resultados", href: "#resultados" },
                { label: "FAQ", href: "#faq" }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href.substring(1))}
                  className="text-gray-300 hover:text-orange-highlight transition-colors font-medium text-sm"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <WhatsAppModal
              trigger={
                <Button className="hidden sm:inline-flex bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 text-sm px-4 py-2">
                  <MessageSquare className="mr-2 h-3 w-3" />
                  <span className="hidden md:inline">Falar com especialista</span>
                  <span className="md:hidden">WhatsApp</span>
                </Button>
              }
            />

            <button 
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-slate-900/95 backdrop-blur-sm border-t border-purple-500/20 absolute top-full left-0 right-0 z-50">
              <div className="container mx-auto px-4 sm:px-6 py-4">
                <nav className="flex flex-col space-y-3">
                  {[
                    { label: "Como funciona", href: "#como-funciona" },
                    { label: "Para quem é", href: "#para-quem" },
                    { label: "Resultados", href: "#resultados" },
                    { label: "FAQ", href: "#faq" }
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        scrollToSection(item.href.substring(1));
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-gray-300 hover:text-orange-highlight transition-colors font-medium text-left py-2 text-sm"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="pt-2">
                    <WhatsAppModal
                      trigger={
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 text-sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Falar com especialista no WhatsApp
                        </Button>
                      }
                    />
                  </div>
                </nav>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-10 px-4 sm:px-6">
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-6 bg-orange-500/20 text-orange-200 border-orange-500/30 text-lg px-6 py-2">
              <Bot className="mr-2 h-4 w-4" />
              Agentes de IA Multicanal
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white-strong leading-tight mb-8">
              Pare de <span className="text-pain-highlight">perder vendas</span> enquanto você dorme
              <br />
              <span className="text-orange-highlight">Agentes de IA</span> que trabalham <span className="text-solution-purple">24h por dia</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-medium-contrast max-w-4xl mx-auto leading-relaxed mb-12">
              <span className="text-pain-highlight font-bold">Chega de perder leads quentes por falta de resposta rápida.</span> 
              Automatize <span className="text-orange-highlight">WhatsApp, Instagram, Email e SMS</span> com IA própria. 
              <span className="text-solution-purple font-bold">Sem depender de plataformas que travam, sem programar, retorno em 30 dias</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <WhatsAppModal
                trigger={
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 py-4 text-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Parar de perder vendas agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                }
              />
              
              <button 
                onClick={() => scrollToSection('calculadora')}
                className="text-orange-highlight hover:text-orange-300 font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105"
              >
                <Target className="h-5 w-5" />
                Descobrir quanto estou perdendo agora
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-highlight mb-2">+R$100k</div>
                <div className="text-medium-contrast text-xs sm:text-sm">Em vendas recuperadas</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-solution-purple mb-2">+10k</div>
                <div className="text-medium-contrast text-xs sm:text-sm">Horas economizadas</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-solution-purple mb-2">97%</div>
                <div className="text-medium-contrast text-xs sm:text-sm">Satisfação</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-highlight mb-2">4.9⭐</div>
                <div className="text-medium-contrast text-xs sm:text-sm">Avaliação média</div>
              </div>
              <div className="text-center col-span-2 sm:col-span-1">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-solution-purple mb-2">3</div>
                <div className="text-medium-contrast text-xs sm:text-sm">Países atendidos</div>
              </div>
            </div>

            {/* Bio do Especialista */}
            <div className="mt-16 flex justify-center">
              <Card className="glass-card neon-border max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                      <img 
                        src="https://minio.meusuper.app/api/v1/download-shared-object/aHR0cHM6Ly9zMy5tZXVzdXBlci5hcHAvcHVibGljLzQ4Mjc3MDgzOV81MTExNTIyNDUzNjQyMDRfNTc5NDcwNTcyMDAzMDkxNjRfbiUyMCUyODElMjkuanBnP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9UzhPSk4yQkZXTkpTQ1E4MVNSWFAlMkYyMDI1MDYyNCUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTA2MjRUMTc1NTAwWiZYLUFtei1FeHBpcmVzPTQzMjAwJlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lKVE9FOUtUakpDUmxkT1NsTkRVVGd4VTFKWVVDSXNJbVY0Y0NJNk1UYzFNRGd6TURnMU5Td2ljR0Z5Wlc1MElqb2lZV1J0YVc0aWZRLmRYdlg2T2ExaDhvS2ttMlZVbzFaOXRCYmZscnBTS0ZKMGRsY2ZzTlJ6RFBWUzRkU0QyYmxPZmdsUUlzdTIwSlh5cEJ0LU93clRDWmlDb29ZZmZuLUl3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9OTAzZmExNmU3MDJjYmE0YzE1MDExYTg0NmVjMTg2Y2MxZDFhYjAzNjMzZDlmOGJlMzU4N2NiNTA2MjE0ZGExZg"
                        alt="Samuel Vicente Ferreira"
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-orange-400 shadow-lg"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <Heart className="h-5 w-5 text-red-400" />
                        <span className="text-white-strong text-lg">
                          Criado por{" "}
                          <a 
                            href="https://instagram.com/eusamuelvicente" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-orange-highlight hover:text-orange-300 font-bold"
                          >
                            @eusamuelvicente
                          </a>
                          {" "}em parceria com{" "}
                          <span className="text-solution-purple font-bold">Dubotics</span>
                        </span>
                      </div>
                      <div className="text-medium-contrast leading-relaxed">
                        <strong className="text-orange-highlight">Samuel Vicente Ferreira</strong> é especialista em automações com IA, desenvolvedor de software e estrategista digital. 
                        Atua com foco em criar soluções que transformam negócios com inteligência artificial, automação de atendimento, integrações com APIs, bots de voz e ferramentas no-code.
                        <br /><br />
                        Fundador do MeuSuper.app e parceiro da Dubotics, já atendeu clientes no <strong className="text-solution-purple">Brasil, Dubai e outros mercados internacionais</strong>, 
                        com foco em resultados reais, escalabilidade e independência tecnológica.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 px-6 bg-slate-800/30 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-200 border-purple-500/30">
                <Zap className="mr-2 h-3 w-3" />
                Como Funciona
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white-strong mb-6">
                Implementação em <span className="text-orange-highlight">4 passos simples</span>
              </h2>
              <p className="text-xl text-medium-contrast max-w-3xl mx-auto">
                <span className="text-solution-purple font-bold">Do primeiro contato até seus agentes vendendo 24h por dia</span> - processo testado e aprovado
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-slate-900/50 border-blue-500/20 relative text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                </div>
                <CardContent className="p-6 pt-8">
                  <MessageSquare className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white-strong mb-3">Análise Gratuita</h3>
                  <p className="text-medium-contrast text-sm">
                    <span className="text-solution-purple font-bold">Diagnóstico completo do seu atendimento atual</span> e identificação de quanto você está perdendo sem automação
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20 relative text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                </div>
                <CardContent className="p-6 pt-8">
                  <Building2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white-strong mb-3">Configuração</h3>
                  <p className="text-medium-contrast text-sm">
                    <span className="text-solution-purple font-bold">Criação e treinamento dos agentes de IA</span> específicos para seu negócio e suas dores
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-green-500/20 relative text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                </div>
                <CardContent className="p-6 pt-8">
                  <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white-strong mb-3">Integração</h3>
                  <p className="text-medium-contrast text-sm">
                    <span className="text-solution-purple font-bold">Conexão com WhatsApp, Instagram, Facebook, Email e SMS</span> em 15 dias máximo
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-orange-500/20 relative text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                </div>
                <CardContent className="p-6 pt-8">
                  <TrendingUp className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white-strong mb-3">Otimização</h3>
                  <p className="text-medium-contrast text-sm">
                    <span className="text-solution-purple font-bold">Monitoramento contínuo e melhorias mensais</span> para maximizar resultados
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Para Quem É */}
      <section id="para-quem" className="py-20 px-6 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-orange-500/20 text-orange-200 border-orange-500/30">
                <UserCheck className="mr-2 h-3 w-3" />
                Casos de Uso Reais
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Soluções práticas para <span className="text-orange-400">cada tipo de negócio</span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Veja como nossos agentes de IA transformam operações específicas do seu nicho
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="glass-card neon-border group">
                <CardContent className="p-6">
                  <GraduationCap className="w-12 h-12 text-blue-400 mb-4 icon-glow group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-high-contrast mb-3">Cursos Online</h3>
                  <p className="text-medium-contrast text-sm mb-4">
                    <span className="text-orange-highlight font-semibold">Recuperação de carrinho</span> e <span className="text-orange-highlight font-semibold">envio de certificado automatizado</span> via WhatsApp e Instagram
                  </p>
                  <div className="text-blue-300 text-xs font-semibold bg-blue-900/30 p-2 rounded border border-blue-500/30">
                    ✓ Suporte 24h ✓ Vendas automáticas ✓ Redução de refund
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card neon-border group">
                <CardContent className="p-6">
                  <ShoppingCart className="w-12 h-12 text-green-400 mb-4 icon-glow group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-high-contrast mb-3">E-commerce</h3>
                  <p className="text-medium-contrast text-sm mb-4">
                    <span className="text-orange-highlight font-semibold">Integração com estoque</span>, <span className="text-orange-highlight font-semibold">atendimento automático</span> e <span className="text-orange-highlight font-semibold">rastreio de pedidos</span>
                  </p>
                  <div className="text-green-300 text-xs font-semibold bg-green-900/30 p-2 rounded border border-green-500/30">
                    ✓ Catálogo automático ✓ Checkout simplificado ✓ Pós-venda
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card neon-border group">
                <CardContent className="p-6">
                  <Briefcase className="w-12 h-12 text-purple-400 mb-4 icon-glow group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-high-contrast mb-3">Mentores/Consultores</h3>
                  <p className="text-medium-contrast text-sm mb-4">
                    <span className="text-orange-highlight font-semibold">Agendamento com IA</span>, <span className="text-orange-highlight font-semibold">follow-up de sessões</span> e <span className="text-orange-highlight font-semibold">suporte com voz</span>
                  </p>
                  <div className="text-purple-300 text-xs font-semibold bg-purple-900/30 p-2 rounded border border-purple-500/30">
                    ✓ Agenda lotada ✓ Leads qualificados ✓ Follow-up automático
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card neon-border group">
                <CardContent className="p-6">
                  <Building2 className="w-12 h-12 text-orange-400 mb-4 icon-glow group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-high-contrast mb-3">SaaS</h3>
                  <p className="text-medium-contrast text-sm mb-4">
                    Onboarding automatizado, suporte técnico e redução de churn via multicanal
                  </p>
                  <div className="text-orange-300 text-xs font-semibold bg-orange-900/30 p-2 rounded border border-orange-500/30">
                    ✓ Ativação de usuários ✓ Suporte tier 1 ✓ Retenção
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card neon-border group">
                <CardContent className="p-6">
                  <Star className="w-12 h-12 text-yellow-400 mb-4 icon-glow group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-high-contrast mb-3">Infoprodutores</h3>
                  <p className="text-medium-contrast text-sm mb-4">
                    <span className="text-orange-highlight font-semibold">Integração com Hotmart</span>, <span className="text-orange-highlight font-semibold">liberação de acesso</span> e <span className="text-orange-highlight font-semibold">suporte inteligente</span>
                  </p>
                  <div className="text-yellow-300 text-xs font-semibold bg-yellow-900/30 p-2 rounded border border-yellow-500/30">
                    ✓ Entrega automática ✓ Suporte integrado ✓ Upsell
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card neon-border group">
                <CardContent className="p-6">
                  <Heart className="w-12 h-12 text-red-400 mb-4 icon-glow group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-high-contrast mb-3">Produtos Encapsulados</h3>
                  <p className="text-medium-contrast text-sm mb-4">
                    <span className="text-orange-highlight font-semibold">Sequência automatizada de nutrição</span>, <span className="text-orange-highlight font-semibold">upsell</span> e <span className="text-orange-highlight font-semibold">recompra</span>
                  </p>
                  <div className="text-red-300 text-xs font-semibold bg-red-900/30 p-2 rounded border border-red-500/30">
                    ✓ Recompra automática ✓ Fidelização ✓ Cross-sell
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Calculadora de Perdas */}
      <section id="calculadora" className="py-20 px-6 bg-gradient-to-br from-red-900/20 to-orange-900/20 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-red-500/20 text-red-200 border-red-500/30">
                <Target className="mr-2 h-3 w-3" />
                Calculadora de Perdas
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Quanto você está <span className="text-red-400">perdendo</span> por mês?
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Descubra o impacto financeiro da demora no atendimento multicanal
              </p>
            </div>

            <Card className="bg-slate-900/50 border-red-500/20">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Quantos leads você recebe por mês?
                    </label>
                    <Input
                      type="number"
                      placeholder="Ex: 100"
                      className="bg-slate-800 border-orange-500/30 text-white text-center text-lg"
                      onChange={(e) => {
                        const leads = parseFloat(e.target.value) || 0;
                        const valorVenda = parseFloat((document.querySelector('input[placeholder="Ex: 500"]') as HTMLInputElement)?.value || '0') || 0;
                        const perdas = leads * valorVenda * 0.3;
                        const resultado = document.getElementById('resultado-perdas');
                        if (resultado && perdas > 0) {
                          resultado.textContent = 'R$ ' + Math.round(perdas).toLocaleString('pt-BR');
                        } else if (resultado) {
                          resultado.textContent = 'R$ 0';
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Qual o valor médio da sua venda?
                    </label>
                    <Input
                      type="number"
                      placeholder="Ex: 500"
                      className="bg-slate-800 border-orange-500/30 text-white text-center text-lg"
                      onChange={(e) => {
                        const valorVenda = parseFloat(e.target.value) || 0;
                        const leads = parseFloat((document.querySelector('input[placeholder="Ex: 100"]') as HTMLInputElement)?.value || '0') || 0;
                        const perdas = leads * valorVenda * 0.3;
                        const resultado = document.getElementById('resultado-perdas');
                        if (resultado && perdas > 0) {
                          resultado.textContent = 'R$ ' + Math.round(perdas).toLocaleString('pt-BR');
                        } else if (resultado) {
                          resultado.textContent = 'R$ 0';
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-lg border border-red-500/30">
                  <h3 className="text-xl font-bold text-white mb-4">Suas perdas mensais estimadas:</h3>
                  <div className="text-3xl font-bold text-red-400 mb-2" id="resultado-perdas">R$ 0</div>
                  <p className="text-gray-200 text-sm">
                    Baseado em 30% de leads perdidos por demora no atendimento
                  </p>
                  <p className="text-gray-300 text-xs mt-2">
                    💡 Digite os valores acima para calcular suas perdas reais
                  </p>
                </div>

                <div className="mt-8">
                  <WhatsAppModal
                    trigger={
                      <Button 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
                      >
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Quero escalar meu atendimento com IA
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problemas */}
      <section className="py-20 px-6 bg-slate-800/50 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-200 border-purple-500/30">
                <Award className="mr-2 h-3 w-3" />
                Benefícios
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Pare de <span className="text-red-400">sofrer</span> com estes problemas
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Dores reais que fazem você <span className="text-orange-400 font-semibold">perder dinheiro todos os dias</span> - e que nossos agentes resolvem automaticamente
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              <Card className="glass-card neon-border text-center group">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
                    <Clock className="h-8 w-8 text-white icon-glow group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-high-contrast mb-3">Respostas <span className="text-orange-highlight">lentas que fazem você perder vendas</span></h3>
                  <p className="text-medium-contrast text-sm">Clientes esperando horas no WhatsApp, Instagram, Facebook enquanto concorrentes respondem em segundos</p>
                </CardContent>
              </Card>

              <Card className="glass-card neon-border text-center group">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <Users className="h-8 w-8 text-white icon-glow group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-high-contrast mb-3">Falta de equipe para responder <span className="text-orange-highlight">fora do horário comercial</span></h3>
                  <p className="text-medium-contrast text-sm">Leads chegando 24h por todos os canais mas você só atende 8h por dia</p>
                </CardContent>
              </Card>

              <Card className="glass-card neon-border text-center group">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <MessageSquare className="h-8 w-8 text-white icon-glow group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-high-contrast mb-3">Perda de leads por <span className="text-orange-highlight">falta de follow-up</span></h3>
                  <p className="text-medium-contrast text-sm">WhatsApp, Instagram, Facebook, Email - impossível acompanhar e nutrir todos manualmente</p>
                </CardContent>
              </Card>

              <Card className="glass-card neon-border text-center group">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Zap className="h-8 w-8 text-white icon-glow group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-high-contrast mb-3">Dificuldade de <span className="text-orange-highlight">integrar ferramentas e CRMs</span></h3>
                  <p className="text-medium-contrast text-sm">Dados de clientes perdidos entre WhatsApp, Instagram, Email e outros canais sem integração</p>
                </CardContent>
              </Card>

              <Card className="glass-card neon-border text-center group">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                    <Target className="h-8 w-8 text-white icon-glow group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-high-contrast mb-3">Atendimento manual <span className="text-orange-highlight">que não escala</span></h3>
                  <p className="text-medium-contrast text-sm">Cada novo canal = mais funcionários = custos que explodem sem controle</p>
                </CardContent>
              </Card>

              <Card className="glass-card neon-border text-center group">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                    <TrendingUp className="h-8 w-8 text-white icon-glow group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-high-contrast mb-3">Operações que dependem de você estar <span className="text-orange-highlight">online 24h</span></h3>
                  <p className="text-medium-contrast text-sm">Você é prisioneiro do próprio negócio</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos Expandidos */}
      <section id="resultados" className="py-20 px-6 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-200 border-purple-500/30">
                <Target className="mr-2 h-3 w-3" />
                Resultados Reais
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Empresas que <span className="text-purple-400">transformaram</span> seus resultados
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Casos reais de clientes que implementaram agentes de IA multicanal
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-slate-900/50 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                    <span className="ml-2 text-sm text-gray-400">Curso Online</span>
                  </div>
                  <p className="text-gray-100 mb-4 italic">
                    "Automatizamos recuperação de carrinho no WhatsApp e Instagram. Recuperamos R$ 45.000 em vendas perdidas no primeiro mês."
                  </p>
                  <div className="bg-green-900/30 p-3 rounded mb-4">
                    <p className="text-green-300 text-sm font-semibold">+300% vendas recuperadas</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">M</div>
                    <div className="ml-3">
                      <p className="text-white font-semibold">Marina Silva</p>
                      <p className="text-gray-400 text-sm">CEO, EduTech Pro</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                    <span className="ml-2 text-sm text-gray-400">E-commerce</span>
                  </div>
                  <p className="text-gray-100 mb-4 italic">
                    "Agentes conectados em todos os canais. Diminuímos tempo de resposta de 4h para 30 segundos. Vendas cresceram 400%."
                  </p>
                  <div className="bg-blue-900/30 p-3 rounded mb-4">
                    <p className="text-blue-300 text-sm font-semibold">ROI 400% em 30 dias</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">R</div>
                    <div className="ml-3">
                      <p className="text-white font-semibold">Roberto Santos</p>
                      <p className="text-gray-400 text-sm">Fundador, EcoStore</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                    <span className="ml-2 text-sm text-gray-400">Consultoria</span>
                  </div>
                  <p className="text-gray-100 mb-4 italic">
                    "Agendamento automático via IA liberou nossa equipe. Agenda 90% mais cheia, sem contratar ninguém."
                  </p>
                  <div className="bg-purple-900/30 p-3 rounded mb-4">
                    <p className="text-purple-300 text-sm font-semibold">+90% agenda preenchida</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
                    <div className="ml-3">
                      <p className="text-white font-semibold">Ana Costa</p>
                      <p className="text-gray-400 text-sm">Diretora, ConsultPro</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                    <span className="ml-2 text-sm text-gray-400">Infoprodutos</span>
                  </div>
                  <p className="text-gray-100 mb-4 italic">
                    "Integração com Hotmart + WhatsApp automatizada. Suporte 24h liberou nossa equipe para focar em vendas."
                  </p>
                  <div className="bg-orange-900/30 p-3 rounded mb-4">
                    <p className="text-orange-300 text-sm font-semibold">-80% tickets de suporte</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">C</div>
                    <div className="ml-3">
                      <p className="text-white font-semibold">Carlos Mendes</p>
                      <p className="text-gray-400 text-sm">CEO, DigitalWorks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                    <span className="ml-2 text-sm text-gray-400">Produtos Físicos</span>
                  </div>
                  <p className="text-gray-100 mb-4 italic">
                    "Nutrição automatizada em 5 canais diferentes. Recompra aumentou 250% com sequências inteligentes."
                  </p>
                  <div className="bg-yellow-900/30 p-3 rounded mb-4">
                    <p className="text-yellow-300 text-sm font-semibold">+250% recompras</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold">L</div>
                    <div className="ml-3">
                      <p className="text-white font-semibold">Lucia Ferreira</p>
                      <p className="text-gray-400 text-sm">Fundadora, NutriVida</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                    <span className="ml-2 text-sm text-gray-400">SaaS</span>
                  </div>
                  <p className="text-gray-100 mb-4 italic">
                    "Onboarding automatizado multicanal. Diminuímos churn em 60% e aumentamos ativação de usuários."
                  </p>
                  <div className="bg-red-900/30 p-3 rounded mb-4">
                    <p className="text-red-300 text-sm font-semibold">-60% churn</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">P</div>
                    <div className="ml-3">
                      <p className="text-white font-semibold">Paulo Oliveira</p>
                      <p className="text-gray-400 text-sm">CTO, TechSolutions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Card className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-500/20 max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Média de resultados dos nossos clientes:
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-400">+280%</div>
                      <div className="text-gray-200 text-sm">Aumento em vendas</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">-70%</div>
                      <div className="text-gray-200 text-sm">Menos tempo manual</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">24/7</div>
                      <div className="text-gray-200 text-sm">Atendimento ativo</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-400">15 dias</div>
                      <div className="text-gray-200 text-sm">Para implementar</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-900/30 to-blue-900/30 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-purple-500/20 text-purple-200 border-purple-500/30">
              <Shield className="mr-2 h-3 w-3" />
              Compromisso com Resultados
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white-strong mb-6">
              Compromisso com <span className="text-solution-purple">Seus Resultados</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="bg-slate-900/50 border-purple-500/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white-strong mb-3">Implementação Garantida</h3>
                  <p className="text-medium-contrast text-sm">
                    <span className="text-solution-purple font-bold">Seu agente de IA funcionando perfeitamente em 15 dias</span> com todos os canais integrados
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white-strong mb-3">Parceria até o Sucesso</h3>
                  <p className="text-medium-contrast text-sm">
                    <span className="text-pain-highlight font-bold">Ficamos com você até alcançar os resultados esperados</span> - suporte contínuo e otimizações
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white-strong mb-3">Compromisso de Performance</h3>
                  <p className="text-medium-contrast text-sm">
                    <span className="text-solution-purple font-bold">Monitoramento mensal e ajustes contínuos</span> até atingir o crescimento desejado
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <Card className="bg-gradient-to-r from-green-900/50 to-green-800/50 border-green-500/30 max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    🛡️ Nossa Promessa
                  </h3>
                  <p className="text-gray-100 mb-6">
                    Se em 30 dias você não estiver 100% satisfeito com os resultados dos agentes de IA, 
                    devolvemos todo o investimento. Sem perguntas, sem burocracia.
                  </p>
                  <WhatsAppModal
                    trigger={
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      >
                        <Shield className="mr-2 h-5 w-5" />
                        Quero essa garantia
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Plano de Crescimento */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-500/20 text-blue-200 border-blue-500/30">
                <TrendingUp className="mr-2 h-3 w-3" />
                Plano de Crescimento
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Seu negócio em <span className="text-blue-400">3 estágios</span> de evolução
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Como nossos agentes de IA crescem junto com seu negócio
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-slate-900/50 border-blue-500/20 relative">
                <div className="absolute -top-4 left-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                </div>
                <CardContent className="p-6 pt-8">
                  <h3 className="text-xl font-bold text-white mb-4">Estágio Inicial (0-30 dias)</h3>
                  <ul className="text-gray-200 space-y-2 text-sm">
                    <li>• Implementação dos agentes de IA</li>
                    <li>• Conexão com 2-3 canais principais</li>
                    <li>• Automação de respostas básicas</li>
                    <li>• Qualificação simples de leads</li>
                    <li>• Integração com seu CRM</li>
                  </ul>
                  <div className="mt-4 p-3 bg-blue-900/30 rounded">
                    <p className="text-blue-300 text-sm font-semibold">Meta: +50% velocidade de resposta</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20 relative">
                <div className="absolute -top-4 left-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                </div>
                <CardContent className="p-6 pt-8">
                  <h3 className="text-xl font-bold text-white mb-4">Estágio Crescimento (30-90 dias)</h3>
                  <ul className="text-gray-200 space-y-2 text-sm">
                    <li>• Expansão para todos os canais</li>
                    <li>• Sequências de nutrição avançadas</li>
                    <li>• Agendamento automático de reuniões</li>
                    <li>• Upsell e cross-sell inteligente</li>
                    <li>• Relatórios de performance detalhados</li>
                  </ul>
                  <div className="mt-4 p-3 bg-purple-900/30 rounded">
                    <p className="text-purple-300 text-sm font-semibold">Meta: +200% conversão de leads</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-orange-500/20 relative">
                <div className="absolute -top-4 left-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                </div>
                <CardContent className="p-6 pt-8">
                  <h3 className="text-xl font-bold text-white mb-4">Estágio Escala (90+ dias)</h3>
                  <ul className="text-gray-200 space-y-2 text-sm">
                    <li>• IA preditiva para comportamentos</li>
                    <li>• Personalização total por cliente</li>
                    <li>• Automação completa do funil</li>
                    <li>• Integração com ferramentas avançadas</li>
                    <li>• Otimização contínua com machine learning</li>
                  </ul>
                  <div className="mt-4 p-3 bg-orange-900/30 rounded">
                    <p className="text-orange-300 text-sm font-semibold">Meta: Negócio 100% escalável</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/20 max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    🚀 Evolução Garantida
                  </h3>
                  <p className="text-gray-100 mb-6">
                    Cada estágio é cuidadosamente planejado para maximizar seus resultados. 
                    Nossos agentes de IA evoluem junto com seu negócio, sempre um passo à frente.
                  </p>
                  <WhatsAppModal
                    trigger={
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        <TrendingUp className="mr-2 h-5 w-5" />
                        Quero ver meu plano de crescimento
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-slate-800/30 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-200 border-purple-500/30">
                FAQ
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Perguntas frequentes
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "Preciso saber programar?",
                  answer: "Não, nossas soluções são no-code. Você não precisa ter conhecimento técnico, cuidamos de toda a implementação para você."
                },
                {
                  question: "Funciona com meu CRM atual?",
                  answer: "Sim, integramos com qualquer ferramenta através de APIs. Se não tiver API, criamos soluções alternativas."
                },
                {
                  question: "E se eu não tiver site?",
                  answer: "Não precisa. Podemos automatizar direto no WhatsApp e criar soluções que funcionam independente de ter um site."
                },
                {
                  question: "Em quanto tempo vejo resultados?",
                  answer: "Em média 7 a 15 dias após implantação você já começa a ver os primeiros resultados da automação."
                },
                {
                  question: "É seguro?",
                  answer: "Sim, usamos servidores protegidos e aderentes à LGPD. Seus dados e de seus clientes estão sempre seguros."
                }
              ].map((faq, index) => (
                <Card key={index} className="bg-slate-900/50 border-purple-500/20">
                  <CardContent className="p-6">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full text-left flex items-center justify-between"
                    >
                      <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                      <ChevronDown 
                        className={`h-5 w-5 text-purple-400 transition-transform ${
                          expandedFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedFaq === index && (
                      <p className="mt-4 text-gray-200">{faq.answer}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promessas da Transformação */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-900/50 to-orange-900/50 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-orange-500/20 text-orange-200 border-orange-500/30">
                <Target className="mr-2 h-3 w-3" />
                Transformação Completa
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white-strong mb-6">
                Do <span className="text-pain-highlight">caos manual</span> para uma <span className="text-solution-purple">operação enxuta</span> que trabalha por você
              </h2>
              <p className="text-xl text-medium-contrast mb-8 max-w-4xl mx-auto">
                <span className="text-solution-purple font-bold">Triplicar vendas automatizando atendimentos, processos e canais</span> - 
                sem depender de plataformas fechadas, sem precisar programar, com retorno em poucos meses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              <Card className="solution-card">
                <CardContent className="p-6">
                  <TrendingUp className="w-10 h-10 text-solution-purple mb-4" />
                  <h3 className="text-lg font-bold text-white-strong mb-3">Vendas que funcionam sozinhas</h3>
                  <p className="text-medium-contrast text-sm">
                    <span className="text-solution-purple font-bold">Triplicar vendas no WhatsApp</span> com estrutura automatizada que responde leads em segundos, mesmo enquanto você dorme
                  </p>
                </CardContent>
              </Card>

              <Card className="solution-card">
                <CardContent className="p-6">
                  <Shield className="w-10 h-10 text-solution-purple mb-4" />
                  <h3 className="text-lg font-bold text-white-strong mb-3">Plataforma própria em 30 dias</h3>
                  <p className="text-medium-contrast text-sm">
                    <span className="text-solution-purple font-bold">Comunicação conectando WhatsApp, Instagram, site e e-mail</span> - sem depender de ferramentas caras e limitadas
                  </p>
                </CardContent>
              </Card>

              <Card className="solution-card">
                <CardContent className="p-6">
                  <Bot className="w-10 h-10 text-solution-purple mb-4" />
                  <h3 className="text-lg font-bold text-white-strong mb-3">Agente IA 24/7</h3>
                  <p className="text-medium-contrast text-sm">
                    <span className="text-solution-purple font-bold">Inteligência artificial própria</span> capaz de responder dúvidas, agendar reuniões e recuperar vendas automaticamente
                  </p>
                </CardContent>
              </Card>

              <Card className="solution-card">
                <CardContent className="p-6">
                  <Users className="w-10 h-10 text-solution-purple mb-4" />
                  <h3 className="text-lg font-bold text-white-strong mb-3">Redução de 90% no suporte</h3>
                  <p className="text-medium-contrast text-sm">
                    <span className="text-solution-purple font-bold">Automação que reduz mensagens repetitivas</span> com respostas personalizadas, sem precisar de equipe
                  </p>
                </CardContent>
              </Card>

              <Card className="solution-card">
                <CardContent className="p-6">
                  <CheckCircle className="w-10 h-10 text-solution-purple mb-4" />
                  <h3 className="text-lg font-bold text-white-strong mb-3">Nunca mais perca leads</h3>
                  <p className="text-medium-contrast text-sm">
                    <span className="text-solution-purple font-bold">Funil inteligente com mensagens automáticas</span> quando cliente está pronto para comprar
                  </p>
                </CardContent>
              </Card>

              <Card className="solution-card">
                <CardContent className="p-6">
                  <Award className="w-10 h-10 text-solution-purple mb-4" />
                  <h3 className="text-lg font-bold text-white-strong mb-3">Custo operacional -70%</h3>
                  <p className="text-medium-contrast text-sm">
                    <span className="text-solution-purple font-bold">Substituir tarefas manuais por fluxos automáticos</span> inteligentes, sem depender de agências
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <WhatsAppModal trigger={
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white-strong px-12 py-6 text-xl font-bold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105">
                  <MessageSquare className="mr-3 h-6 w-6" />
                  Quero essa transformação agora
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              } />
              
              <p className="text-medium-contrast mt-6 max-w-2xl mx-auto">
                <span className="text-solution-purple font-bold">✅ Análise gratuita</span> • 
                <span className="text-solution-purple font-bold">✅ Implementação em 15 dias</span> • 
                <span className="text-solution-purple font-bold">✅ Garantia de satisfação</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 border-t border-purple-500/20 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Meu
              </span>
              <span className="text-white">
                Super.app
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Automação com IA para escalar seu negócio
            </p>
            <Separator className="bg-purple-500/20 mb-6" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-gray-500 text-sm">
              <p>MeuSuper.app © 2025 — Todos os direitos reservados</p>
              <div className="flex gap-4">
                <a href="/privacy-policy" className="hover:text-purple-400 transition-colors">
                  Política de Privacidade
                </a>
                <a href="/terms-of-service" className="hover:text-purple-400 transition-colors">
                  Termos de Uso
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}