import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Bot, 
  Zap, 
  Building2, 
  TrendingUp, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  Users, 
  Clock, 
  Target,
  ChevronDown,
  Menu,
  X,
  MessageSquare,
  Cpu,
  Globe,
  BookOpen
} from "lucide-react";

interface ContactForm {
  nome: string;
  telefone: string;
  empresa: string;
  dor: string;
}

export default function ModernHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({
    nome: "",
    telefone: "",
    empresa: "",
    dor: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
              MeuSuper.app
            </div>
            
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('sobre')} className="text-gray-300 hover:text-purple-400 transition-colors">
                Sobre
              </button>
              <button onClick={() => scrollToSection('servicos')} className="text-gray-300 hover:text-purple-400 transition-colors">
                Serviços
              </button>
              <button onClick={() => scrollToSection('resultados')} className="text-gray-300 hover:text-purple-400 transition-colors">
                Resultados
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-300 hover:text-purple-400 transition-colors">
                FAQ
              </button>
              <button onClick={() => scrollToSection('contato')} className="text-gray-300 hover:text-purple-400 transition-colors">
                Contato
              </button>
            </div>

            <Button 
              asChild 
              className="hidden md:flex bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
            >
              <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20automatizar%20minha%20empresa%20com%20o%20MeuSuper.app" target="_blank">
                <MessageSquare className="mr-2 h-4 w-4" />
                Falar com especialista
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-purple-500/20">
              <div className="flex flex-col space-y-4 pt-4">
                <button onClick={() => scrollToSection('sobre')} className="text-gray-300 hover:text-purple-400 transition-colors text-left">
                  Sobre
                </button>
                <button onClick={() => scrollToSection('servicos')} className="text-gray-300 hover:text-purple-400 transition-colors text-left">
                  Serviços
                </button>
                <button onClick={() => scrollToSection('resultados')} className="text-gray-300 hover:text-purple-400 transition-colors text-left">
                  Resultados
                </button>
                <button onClick={() => scrollToSection('faq')} className="text-gray-300 hover:text-purple-400 transition-colors text-left">
                  FAQ
                </button>
                <button onClick={() => scrollToSection('contato')} className="text-gray-300 hover:text-purple-400 transition-colors text-left">
                  Contato
                </button>
                <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                  <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20automatizar%20minha%20empresa%20com%20o%20MeuSuper.app" target="_blank">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Falar com especialista
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Sparkles className="mr-2 h-3 w-3" />
              A maneira mais rápida de automatizar seu negócio
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Automação com <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">IA</span> sob medida para escalar seu negócio
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Atenda, venda e prospecte no WhatsApp com bots inteligentes e integrações que realmente funcionam. 
              <span className="text-purple-400 font-semibold"> Aumente suas vendas em até 300%</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 text-lg"
                onClick={() => scrollToSection('contato')}
              >
                <Bot className="mr-2 h-5 w-5" />
                Quero automatizar agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg"
                onClick={() => scrollToSection('servicos')}
              >
                <Globe className="mr-2 h-5 w-5" />
                Conhecer serviços
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">100+</div>
                <div className="text-gray-400">Projetos Entregues</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-gray-400">Clientes Satisfeitos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400">Suporte Automatizado</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">300%</div>
                <div className="text-gray-400">Aumento em Vendas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section id="sobre" className="py-20 px-6 bg-slate-800/50">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Users className="mr-2 h-3 w-3" />
                Quem somos
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Especialistas em automação inteligente
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Criamos soluções que realmente funcionam para negócios que querem crescer
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <Card className="bg-slate-900/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">Samuel Vicente Ferreira</CardTitle>
                    <CardDescription className="text-purple-300">Founder & Lead Developer</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      O <span className="text-purple-400 font-semibold">MeuSuper.app</span> nasceu da mente de Samuel Vicente Ferreira, 
                      desenvolvedor e estrategista que une IA, automações e visão de negócio para construir soluções inteligentes.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      Com anos de experiência em desenvolvimento de software e estratégias de crescimento, 
                      criamos soluções personalizadas que geram resultados mensuráveis e escaláveis.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 border-purple-500/20">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">5+</div>
                      <div className="text-gray-300">Anos de Experiência</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-yellow-900/50 to-slate-900/50 border-yellow-500/20">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-yellow-400 mb-2">R$ 2M+</div>
                      <div className="text-gray-300">Economizado pelos Clientes</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    <Cpu className="mr-1 h-3 w-3" />
                    Inteligência Artificial
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    <Zap className="mr-1 h-3 w-3" />
                    Automação
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    <MessageSquare className="mr-1 h-3 w-3" />
                    WhatsApp Business
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    <Building2 className="mr-1 h-3 w-3" />
                    Sistemas Empresariais
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Zap className="mr-2 h-3 w-3" />
                Nossos serviços
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Soluções que <span className="text-purple-400">transformam</span> negócios
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Automatize processos, aumente vendas e melhore o atendimento com nossas soluções personalizadas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-slate-900/50 border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Bots com IA para WhatsApp</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center mb-4">
                    Agentes inteligentes que respondem em tempo real, com voz, áudio, leitura de PDFs e acesso a banco de dados.
                  </p>
                  <Badge className="w-full justify-center bg-purple-500/20 text-purple-300">
                    Conversational AI
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Integrações via API</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center mb-4">
                    Conectamos CRM, e-commerce, planilhas, ERP ou qualquer sistema com automações sob medida.
                  </p>
                  <Badge className="w-full justify-center bg-yellow-500/20 text-yellow-300">
                    System Integration
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Plataformas sob demanda</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center mb-4">
                    Sistemas SaaS, painéis, sites e aplicativos completos com foco em automação e escalabilidade.
                  </p>
                  <Badge className="w-full justify-center bg-green-500/20 text-green-300">
                    Custom Development
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Consultorias e Mentorias</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center mb-4">
                    Treinamentos para dominar ferramentas no-code e implementar automações reais, sem depender de devs.
                  </p>
                  <Badge className="w-full justify-center bg-blue-500/20 text-blue-300">
                    Training & Consulting
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Target className="mr-2 h-3 w-3" />
                Como funciona
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Processo simples e <span className="text-purple-400">eficiente</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  1
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Análise do seu negócio</h3>
                <p className="text-gray-300">
                  Identificamos oportunidades de automação e criamos uma estratégia personalizada para seu negócio.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  2
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Desenvolvimento da solução</h3>
                <p className="text-gray-300">
                  Criamos e configuramos todas as automações, bots e integrações necessárias para seu projeto.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  3
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Entrega e suporte</h3>
                <p className="text-gray-300">
                  Implementamos a solução em seu negócio e oferecemos treinamento e suporte contínuo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section id="resultados" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Star className="mr-2 h-3 w-3" />
                Depoimentos
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Resultados que <span className="text-purple-400">impressionam</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Veja o que nossos clientes estão dizendo sobre nossas soluções
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-slate-900/50 border-purple-500/20">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
                      A
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Ana Carolina</h4>
                      <p className="text-purple-300 text-sm">CEO - E-commerce de Moda</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic mb-4 leading-relaxed">
                    "Dobrei minhas vendas em 3 meses com o bot do Samuel. Ele entende de tech e de negócio. 
                    O atendimento automatizado no WhatsApp foi um divisor de águas para minha empresa."
                  </p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-white font-bold mr-4">
                      R
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Ricardo Mendes</h4>
                      <p className="text-purple-300 text-sm">Diretor - Agência Digital</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic mb-4 leading-relaxed">
                    "Economizamos mais de R$ 15 mil por mês com automações. Atendimento 24/7, sem contratar mais ninguém. 
                    A equipe do MeuSuper.app entrega mais do que promete."
                  </p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-slate-800/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                FAQ
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Perguntas frequentes
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "Quanto tempo leva para implementar uma automação?",
                  answer: "O tempo varia conforme a complexidade, mas geralmente entregamos soluções simples em 1-2 semanas e projetos mais complexos em 1-2 meses."
                },
                {
                  question: "Vocês oferecem suporte após a entrega?",
                  answer: "Sim! Oferecemos suporte técnico contínuo e treinamento para sua equipe. Também fazemos atualizações e melhorias conforme necessário."
                },
                {
                  question: "As automações funcionam com qualquer sistema?",
                  answer: "Trabalhamos com a maioria dos sistemas através de APIs. Se seu sistema não tem API, podemos criar soluções alternativas como web scraping ou integrações via planilhas."
                },
                {
                  question: "Qual o investimento necessário?",
                  answer: "Os valores variam conforme o escopo do projeto. Fazemos uma análise gratuita e apresentamos um orçamento personalizado sem compromisso."
                }
              ].map((faq, index) => (
                <Card key={index} className="bg-slate-900/50 border-purple-500/20">
                  <CardHeader 
                    className="cursor-pointer" 
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <CardTitle className="flex items-center justify-between text-white">
                      {faq.question}
                      <ChevronDown 
                        className={`h-5 w-5 text-purple-400 transition-transform ${
                          expandedFaq === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </CardTitle>
                  </CardHeader>
                  {expandedFaq === index && (
                    <CardContent>
                      <p className="text-gray-300">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contato" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <MessageSquare className="mr-2 h-3 w-3" />
                Vamos conversar
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Pronto para <span className="text-purple-400">automatizar</span> seu negócio?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Fale com um especialista agora e veja como seu atendimento pode trabalhar por você 24 horas por dia
              </p>
            </div>

            {showSuccess ? (
              <Card className="bg-gradient-to-br from-green-900/50 to-slate-900/50 border-green-500/30 max-w-2xl mx-auto">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">Obrigado!</h3>
                  <p className="text-gray-300 mb-4">
                    Em breve nossa equipe entrará em contato com você pelo WhatsApp.
                  </p>
                  <p className="text-sm text-gray-400">
                    Redirecionando para o WhatsApp em alguns segundos...
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-slate-900/50 border-purple-500/20 max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Nome *
                        </label>
                        <Input
                          required
                          value={formData.nome}
                          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          className="bg-slate-800 border-purple-500/30 text-white"
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Telefone *
                        </label>
                        <Input
                          required
                          value={formData.telefone}
                          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                          className="bg-slate-800 border-purple-500/30 text-white"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nome da empresa
                      </label>
                      <Input
                        value={formData.empresa}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        className="bg-slate-800 border-purple-500/30 text-white"
                        placeholder="Nome da sua empresa"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Qual sua maior dor hoje?
                      </label>
                      <Textarea
                        value={formData.dor}
                        onChange={(e) => setFormData({ ...formData, dor: e.target.value })}
                        className="bg-slate-800 border-purple-500/30 text-white min-h-[120px]"
                        placeholder="Conte-nos sobre os principais desafios do seu negócio..."
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? (
                        <>
                          <Clock className="mr-2 h-5 w-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="mr-2 h-5 w-5" />
                          Quero automatizar agora
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900 to-slate-900">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Junte-se a mais de <span className="text-yellow-400">200.000</span> empreendedores
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Que já estão automatizando seus negócios e aumentando suas vendas
            </p>
            <Button 
              size="lg" 
              asChild
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-12 py-4 text-lg"
            >
              <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20automatizar%20minha%20empresa%20com%20o%20MeuSuper.app" target="_blank">
                <MessageSquare className="mr-2 h-5 w-5" />
                Começar agora pelo WhatsApp
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 border-t border-purple-500/20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent mb-4">
              MeuSuper.app
            </div>
            <p className="text-gray-400 mb-6">
              Automação com IA para escalar seu negócio
            </p>
            <Separator className="bg-purple-500/20 mb-6" />
            <p className="text-gray-500 text-sm">
              MeuSuper.app © 2025 — Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}