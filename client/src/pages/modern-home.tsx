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
import { WhatsAppModal } from "@/components/WhatsAppModal";
import { ParticleBackground } from "@/components/ParticleBackground";
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
  BookOpen,
  Store,
  UserCheck,
  Award,
  Shield,
  Briefcase,
  Heart
} from "lucide-react";

export default function ModernHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate rocket position based on scroll
  const rocketBottom = Math.min(scrollY / 10, typeof window !== 'undefined' ? window.innerHeight * 0.8 : 400);
  const rocketOpacity = scrollY > 300 ? 1 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      <ParticleBackground />
      
      {/* Animated Rocket */}
      <div 
        className="fixed right-8 z-40 transition-all duration-500 ease-in-out"
        style={{ 
          bottom: `${rocketBottom}px`,
          opacity: rocketOpacity,
          transform: `translateY(${Math.sin(scrollY * 0.01) * 10}px) rotate(${Math.sin(scrollY * 0.005) * 5}deg)`
        }}
      >
        <div className="text-4xl animate-pulse">🚀</div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-2 h-12 bg-gradient-to-t from-orange-400 via-yellow-400 to-transparent opacity-70 animate-pulse"></div>
        </div>
      </div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20 relative">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold group cursor-pointer">
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-orange-300 group-hover:to-orange-400">
                Meu
              </span>
              <span className="text-white transition-all duration-300 group-hover:text-gray-200">
                Super.app
              </span>
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

            <WhatsAppModal
              trigger={
                <Button className="hidden md:flex bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Falar com especialista
                </Button>
              }
            />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
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
                <WhatsAppModal
                  trigger={
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Falar com especialista
                    </Button>
                  }
                />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-6 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Sparkles className="mr-2 h-3 w-3" />
              A maneira mais rápida de automatizar seu negócio
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight">
              Você está perdendo <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">clientes</span> enquanto dorme?
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
              Se seu negócio para quando você para, você está deixando <span className="text-orange-400 font-semibold">milhares de reais</span> na mesa. 
              Descubra como empresários inteligentes estão automatizando vendas e atendimento para lucrar 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-16">
              <WhatsAppModal
                trigger={
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 md:px-8 py-4 text-base md:text-lg"
                  >
                    <Target className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                    Descobrir quanto estou perdendo
                    <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                }
              />
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-6 md:px-8 py-4 text-base md:text-lg"
                onClick={() => scrollToSection('problemas')}
              >
                <Globe className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                Ver se é meu caso
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">🌎</div>
                <div className="text-gray-200 text-sm md:text-base font-semibold">Brasil e Dubai</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400 mb-2">97%</div>
                <div className="text-gray-200 text-sm md:text-base">Taxa de Satisfação</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-2">4.9⭐</div>
                <div className="text-gray-200 text-sm md:text-base">Avaliação Média</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-gray-200 text-sm md:text-base">Suporte Automatizado</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problemas (SPIN - Situation & Problem) */}
      <section id="problemas" className="py-20 px-6 bg-red-900/20 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-red-500/20 text-red-300 border-red-500/30">
                <Target className="mr-2 h-3 w-3" />
                Situação Atual
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Estes problemas estão <span className="text-red-400">matando</span> seu negócio?
              </h2>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                Identifique quantos desses cenários acontecem no seu negócio diariamente
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Clock,
                  title: "Clientes esperando horas para serem atendidos",
                  description: "Enquanto você dorme, almoça ou está ocupado, leads quentes esfriam e vão para a concorrência.",
                  impact: "💸 Cada hora perdida = R$ 500-2.000 em vendas"
                },
                {
                  icon: Users,
                  title: "Equipe sobrecarregada respondendo sempre as mesmas coisas",
                  description: "Seus funcionários gastam 70% do tempo com perguntas repetitivas em vez de vender.",
                  impact: "⏰ 40h/semana perdidas por funcionário"
                },
                {
                  icon: TrendingUp,
                  title: "Leads não qualificados ocupando todo seu tempo",
                  description: "Você atende curiosos e perde tempo que deveria usar com clientes prontos para comprar.",
                  impact: "🎯 80% do seu tempo com quem não vai comprar"
                },
                {
                  icon: MessageSquare,
                  title: "Informações importantes se perdendo no WhatsApp",
                  description: "Conversas importantes se perdem no meio de centenas de mensagens sem organização.",
                  impact: "📊 Dados valiosos jogados fora todos os dias"
                }
              ].map((problema, index) => (
                <Card key={index} className="bg-slate-900/70 border-red-500/30 hover:border-red-400/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <problema.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-3">{problema.title}</h3>
                        <p className="text-gray-200 mb-3 leading-relaxed">{problema.description}</p>
                        <div className="text-orange-400 font-semibold text-sm">{problema.impact}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-500/30 max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Se você se identificou com 2 ou mais problemas acima...
                  </h3>
                  <p className="text-gray-200 mb-6">
                    Sua empresa está perdendo <span className="text-orange-400 font-bold">no mínimo R$ 10.000/mês</span> em vendas perdidas, 
                    tempo desperdiçado e oportunidades que vão para a concorrência.
                  </p>
                  <WhatsAppModal
                    trigger={
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                      >
                        <Target className="mr-2 h-5 w-5" />
                        Calcular quanto estou perdendo
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

      {/* Implicações (SPIN - Implication) */}
      <section className="py-20 px-6 bg-slate-800/50 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30">
                <TrendingUp className="mr-2 h-3 w-3" />
                Consequências
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                O que acontece se você <span className="text-orange-400">não resolver</span> isso agora?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-red-900/50 to-slate-900/50 border-red-500/20 text-center">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">📉</div>
                  <h3 className="text-xl font-bold text-white mb-4">Em 30 dias</h3>
                  <p className="text-gray-200">
                    <span className="text-red-400 font-bold">R$ 30.000+</span> em vendas perdidas para concorrentes que respondem mais rápido
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-900/50 to-slate-900/50 border-orange-500/20 text-center">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">😰</div>
                  <h3 className="text-xl font-bold text-white mb-4">Em 6 meses</h3>
                  <p className="text-gray-200">
                    Sua equipe <span className="text-orange-400 font-bold">esgotada</span> e você trabalhando fins de semana para "dar conta"
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-900/50 to-slate-900/50 border-yellow-500/20 text-center">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold text-white mb-4">Em 1 ano</h3>
                  <p className="text-gray-200">
                    Concorrentes dominando o mercado enquanto você ainda <span className="text-yellow-400 font-bold">responde WhatsApp manualmente</span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section id="sobre" className="py-20 px-6 bg-slate-800/50 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Users className="mr-2 h-3 w-3" />
                Quem somos
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Especialistas em automação inteligente
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Criamos soluções que realmente funcionam para negócios que querem crescer
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <img 
                  src="https://minio.tratorbel.meusuper.app/api/v1/download-shared-object/aHR0cHM6Ly9zMy50cmF0b3JiZWwubWV1c3VwZXIuYXBwL3B1YmxpYy80ODI3NzA4MzlfNTExMTUyMjQ1MzY0MjA0XzU3OTQ3MDU3MjAwMzA5MTY0X24lMjAlMjgxJTI5LmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUQ1VUdJWlMySkRJNk5SMkVFUDkxJTJGMjAyNTA2MjQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNjI0VDAzMjEwNVomWC1BbXotRXhwaXJlcz00MzIwMCZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSkVOVlZIU1ZwVE1rcEVTVFpPVWpKRlJWQTVNU0lzSW1WNGNDSTZNVGMxTURjM09ETTVOQ3dpY0dGeVpXNTBJam9pWVdSdGFXNGlmUS4taV9sbVZBYWNfenlOQ21EdlRsa2N0SHN3dF9IVzV2UEF2bmt2aE9SaTREWTU0WnpRUFJBRkNGMEFRXzRYWEc5aUhOT3BiX0xFVk1EWE1EY0RTSHlnUSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmdmVyc2lvbklkPW51bGwmWC1BbXotU2lnbmF0dXJlPTYxYzNhOGE5YmE5MjBjODU4YzhjOTgzMmEyOTMxZjZlYWE1Yzg5NzMxN2E5NDQ0YzEwMmU0NmMzOTI5MzNmY2U" 
                  alt="Samuel Vicente Ferreira - Founder" 
                  className="rounded-full shadow-2xl w-full max-w-sm mx-auto aspect-square object-cover border-4 border-transparent bg-gradient-to-r from-orange-400 to-purple-500 p-1"
                  style={{
                    background: 'linear-gradient(45deg, #fb923c, #a855f7)',
                    borderRadius: '50%'
                  }}
                />
              </div>

              <div className="space-y-6">
                <Card className="bg-slate-900/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">Samuel Vicente Ferreira</CardTitle>
                    <CardDescription className="text-purple-300">Founder & Lead Developer</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-200 leading-relaxed">
                      Criado por <span className="text-orange-400 font-semibold">Samuel Vicente Ferreira</span> — desenvolvedor, estrategista e especialista em IA — 
                      o <span className="text-purple-400 font-semibold">MeuSuper.app</span> entrega soluções inteligentes que eliminam tarefas repetitivas e aumentam o faturamento com tecnologia de ponta.
                    </p>
                    <p className="text-gray-200 leading-relaxed">
                      <span className="text-orange-400 font-semibold">Aqui, IA não é promessa, é entrega.</span> Trabalhamos em parceria com a <span className="text-purple-400 font-semibold">Dubotics</span>, 
                      empresa de robótica e inovação, para levar automações ainda mais avançadas a negócios no Brasil e no exterior.
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <a 
                        href="https://instagram.com/eusamuelvicente" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-300 hover:text-orange-400 transition-colors duration-300"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        @eusamuelvicente
                      </a>
                    </div>
                  </CardContent>
                </Card>

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

      {/* Solução (SPIN - Need-payoff) */}
      <section id="solucao" className="py-20 px-6 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
                <CheckCircle className="mr-2 h-3 w-3" />
                A Solução
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                E se você pudesse <span className="text-green-400">resolver tudo isso</span> em 7 dias?
              </h2>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                Imagine sua empresa vendendo 24/7, sem você precisar responder um WhatsApp sequer
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-slate-900/50 border-purple-500/20 hover:border-purple-400/50 interactive-card hover-glow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Atenda em segundos, converta o dia todo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200 text-center mb-4">
                    Bots que entendem, falam e resolvem — do áudio ao PDF. Agentes inteligentes que trabalham 24/7 por você.
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
                  <CardTitle className="text-xl text-white">Tudo conectado, nada manual</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200 text-center mb-4">
                    Do seu CRM ao WhatsApp, com automações que não falham. Conectamos qualquer sistema em tempo recorde.
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
                  <CardTitle className="text-xl text-white">Você sonha. A gente desenvolve</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200 text-center mb-4">
                    Criação de sistemas SaaS, apps e dashboards 100% funcionais. Da ideia ao produto final.
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
                  <CardTitle className="text-xl text-white">Você no controle da sua IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200 text-center mb-4">
                    Aprenda a automatizar sem depender de desenvolvedor. Domine as ferramentas e seja independente.
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
      <section className="py-20 px-6 bg-slate-800/50 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Target className="mr-2 h-3 w-3" />
                Como funciona
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Processo simples e <span className="text-purple-400">eficiente</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mx-auto mb-6 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold text-white">
                  1
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3">Entre em contato</h3>
                <p className="text-gray-200 text-sm md:text-base">
                  <span className="text-orange-400 font-semibold">Sem compromisso e sem enrolação.</span> Fale pelo WhatsApp ou formulário.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-6 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold text-white">
                  2
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3">Diagnóstico gratuito</h3>
                <p className="text-gray-200 text-sm md:text-base">
                  <span className="text-orange-400 font-semibold">Você entende onde perde vendas</span> e como mudar isso.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-6 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold text-white">
                  3
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3">Proposta personalizada</h3>
                <p className="text-gray-200 text-sm md:text-base">
                  <span className="text-orange-400 font-semibold">Alinhada ao seu orçamento</span> e sua operação.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-6 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold text-white">
                  4
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3">Implementação rápida</h3>
                <p className="text-gray-200 text-sm md:text-base">
                  <span className="text-orange-400 font-semibold">Seu bot no ar em dias,</span> com suporte completo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Users className="mr-2 h-3 w-3" />
                Para quem é
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Para quem é o <span className="text-purple-400">MeuSuper.app</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Soluções que se adaptam a qualquer tipo de negócio
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-900/50 border-purple-500/20 hover:border-purple-400/50 interactive-card">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Pequenas e médias empresas</h3>
                  <p className="text-gray-300 text-sm">Automatize processos e escale sem aumentar custos</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Agências de marketing</h3>
                  <p className="text-gray-300 text-sm">Ofereça automação como serviço para seus clientes</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Store className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">E-commerces</h3>
                  <p className="text-gray-300 text-sm">Atendimento 24/7 e recuperação de carrinho abandonado</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Prestadores de serviço</h3>
                  <p className="text-gray-300 text-sm">Agendamentos automáticos e follow-up de clientes</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Profissionais autônomos</h3>
                  <p className="text-gray-300 text-sm">Automatize seu atendimento e foque no que importa</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Qualquer negócio</h3>
                  <p className="text-gray-300 text-sm">Se você atende clientes, temos uma solução para você</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 px-6 bg-slate-800/50 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Award className="mr-2 h-3 w-3" />
                Benefícios
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                O que você <span className="text-orange-400">ganha</span> com IA
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Promessas que se transformam em resultados reais
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 border-purple-500/20 text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">10.000h</h3>
                  <p className="text-gray-200 text-sm"><span className="text-orange-400 font-semibold">Economize</span> com atendimento automatizado que nunca para</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-900/50 to-slate-900/50 border-yellow-500/20 text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">R$ 100k+</h3>
                  <p className="text-gray-200 text-sm"><span className="text-orange-400 font-semibold">Recupere</span> em vendas perdidas que voltam automaticamente</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/50 to-slate-900/50 border-green-500/20 text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">24/7</h3>
                  <p className="text-gray-200 text-sm"><span className="text-orange-400 font-semibold">Um bot que nunca dorme:</span> atendimento 24/7</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-slate-900/50 border-blue-500/20 text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">-60%</h3>
                  <p className="text-gray-200 text-sm"><span className="text-orange-400 font-semibold">Reduza seus custos</span> operacionais sem perder qualidade</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section id="resultados" className="py-20 px-6 relative z-10">
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
                  <p className="text-gray-200 italic mb-4 leading-relaxed">
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
                  <p className="text-gray-200 italic mb-4 leading-relaxed">
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
      <section id="faq" className="py-20 px-6 bg-slate-800/50 relative z-10">
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

      {/* CTA Final */}
      <section id="contato" className="py-20 px-6 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
              <Target className="mr-2 h-3 w-3" />
              Diagnóstico Gratuito
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Pare de <span className="text-red-400">perder dinheiro</span> agora mesmo
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-12">
              Em 15 minutos descobrimos exatamente quanto sua empresa está perdendo e como recuperar tudo isso em 30 dias
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <WhatsAppModal
                trigger={
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 text-lg"
                  >
                    <Target className="mr-2 h-5 w-5" />
                    Calcular minhas perdas agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                }
              />
              
              <WhatsAppModal
                trigger={
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white font-bold py-6 text-lg"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Falar com especialista
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                }
              />
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-300 text-sm">
                ⚡ Diagnóstico gratuito em 15 minutos<br/>
                🎯 Descubra exatamente quanto você está perdendo<br/>
                💰 Veja como recuperar tudo isso em 30 dias<br/>
                🔥 Sem compromisso - apenas resultados reais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Garantia e Suporte */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Shield className="mr-2 h-3 w-3" />
              Garantia
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              E depois da <span className="text-orange-400">entrega</span>?
            </h2>
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardContent className="p-8">
                <p className="text-lg text-gray-200 leading-relaxed mb-6">
                  Você não está sozinho. Após a entrega, seguimos com você por 
                  <span className="text-orange-400 font-semibold"> 60 dias</span> com suporte técnico e melhorias contínuas. 
                  E sim: <span className="text-yellow-400 font-semibold">atualizações inclusas</span>.
                </p>
                <div className="grid sm:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">60 dias de garantia</h4>
                    <p className="text-gray-400 text-sm">Suporte completo pós-entrega</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Atualizações inclusas</h4>
                    <p className="text-gray-400 text-sm">Melhorias sem custo adicional</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Suporte direto</h4>
                    <p className="text-gray-400 text-sm">Atendimento pelo WhatsApp</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Plano de Crescimento */}
      <section className="py-20 px-6 bg-slate-800/50 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              <TrendingUp className="mr-2 h-3 w-3" />
              Crescimento
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Nosso plano de <span className="text-orange-400">crescimento</span> com você
            </h2>
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardContent className="p-8">
                <p className="text-lg text-gray-200 leading-relaxed mb-8">
                  Começamos com o básico: um bot que atende, responde e converte. 
                  Mas o céu é o limite — agende rotinas, colete leads, conecte com IA de voz, CRM e muito mais.
                </p>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="mx-auto mb-3 w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <h4 className="text-white font-semibold text-sm">Bot Básico</h4>
                    <p className="text-gray-400 text-xs">Atendimento automatizado</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-3 w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <h4 className="text-white font-semibold text-sm">Integrações</h4>
                    <p className="text-gray-400 text-xs">CRM e sistemas</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-3 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <h4 className="text-white font-semibold text-sm">IA Avançada</h4>
                    <p className="text-gray-400 text-xs">Voz e análise</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-3 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <h4 className="text-white font-semibold text-sm">Escalabilidade</h4>
                    <p className="text-gray-400 text-xs">Crescimento ilimitado</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900 to-slate-900 relative z-10">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Junte-se a mais de <span className="text-yellow-400">200.000</span> empreendedores
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Que já estão automatizando seus negócios e aumentando suas vendas
            </p>
            <div className="space-y-6">
              <WhatsAppModal
                trigger={
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 md:px-12 py-4 text-lg"
                  >
                    <Target className="mr-2 h-5 w-5" />
                    Parar de perder R$ 10mil/mês agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                }
              />
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WhatsAppModal
                  trigger={
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white font-bold px-6 py-3"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Equipe sobrecarregada
                    </Button>
                  }
                />
                
                <WhatsAppModal
                  trigger={
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white font-bold px-6 py-3"
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Perdendo para concorrência
                    </Button>
                  }
                />
              </div>
              
              <p className="text-gray-300 text-sm max-w-md mx-auto">
                ⚡ Diagnóstico gratuito em 15 minutos<br/>
                🎯 Descubra exatamente quanto você está perdendo<br/>
                💰 Veja como recuperar tudo isso em 30 dias
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
            <p className="text-gray-500 text-sm">
              MeuSuper.app © 2025 — Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}