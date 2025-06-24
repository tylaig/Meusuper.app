import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Eye, Database, Lock } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/">
              <Button variant="outline" className="mb-6 border-purple-500/30 text-purple-300 hover:bg-purple-500/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao início
              </Button>
            </Link>
            
            <Badge className="mb-4 bg-purple-500/20 text-purple-200 border-purple-500/30">
              <Shield className="mr-2 h-3 w-3" />
              Política de Privacidade
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Política de <span className="text-purple-400">Privacidade</span>
            </h1>
            
            <p className="text-gray-200 text-lg">
              Como coletamos, usamos e protegemos suas informações
            </p>
            
            <p className="text-gray-400 text-sm mt-4">
              Última atualização: 24 de junho de 2025
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Eye className="mr-2 h-5 w-5 text-purple-400" />
                  1. Informações que Coletamos
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200 space-y-4">
                <h4 className="font-semibold text-white">Informações fornecidas voluntariamente:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Nome e informações de contato (telefone, email)</li>
                  <li>Nome da empresa e faturamento mensal</li>
                  <li>Informações sobre canais de atendimento utilizados</li>
                  <li>Descrição dos desafios e necessidades do seu negócio</li>
                </ul>

                <h4 className="font-semibold text-white pt-4">Informações coletadas automaticamente:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Dados de navegação (páginas visitadas, tempo no site)</li>
                  <li>Informações do dispositivo (tipo, sistema operacional)</li>
                  <li>Endereço IP e localização geográfica aproximada</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Database className="mr-2 h-5 w-5 text-purple-400" />
                  2. Como Usamos suas Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200 space-y-4">
                <p>Utilizamos suas informações para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Entrar em contato e agendar consultas sobre nossos serviços</li>
                  <li>Personalizar nossa proposta de acordo com suas necessidades</li>
                  <li>Enviar informações relevantes sobre automação e IA</li>
                  <li>Melhorar nossos serviços e experiência do usuário</li>
                  <li>Cumprir obrigações legais e regulamentares</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Lock className="mr-2 h-5 w-5 text-purple-400" />
                  3. Proteção e Segurança
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200 space-y-4">
                <p>Implementamos medidas técnicas e organizacionais para proteger suas informações:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Criptografia de dados em trânsito e em repouso</li>
                  <li>Acesso restrito às informações apenas a funcionários autorizados</li>
                  <li>Monitoramento contínuo de segurança</li>
                  <li>Backup regular e seguro dos dados</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">4. Compartilhamento de Informações</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200 space-y-4">
                <p>Não vendemos suas informações pessoais. Podemos compartilhar dados apenas:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Com prestadores de serviços que nos auxiliam (ex: plataformas de email)</li>
                  <li>Quando exigido por lei ou autoridades competentes</li>
                  <li>Com seu consentimento explícito</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">5. Seus Direitos (LGPD)</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200 space-y-4">
                <p>Você tem direito a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Confirmar a existência de tratamento de seus dados</li>
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                  <li>Solicitar a exclusão de dados desnecessários</li>
                  <li>Revogar seu consentimento a qualquer momento</li>
                </ul>
                
                <div className="bg-purple-900/30 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold text-white mb-2">Para exercer seus direitos:</h4>
                  <p>Entre em contato conosco através do WhatsApp ou email: contato@meusuper.app</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">6. Cookies e Tecnologias</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200 space-y-4">
                <p>Utilizamos cookies e tecnologias similares para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Melhorar a funcionalidade do site</li>
                  <li>Analisar o uso do site e otimizar a experiência</li>
                  <li>Personalizar conteúdo e ofertas</li>
                </ul>
                <p className="text-sm text-gray-400">
                  Você pode gerenciar cookies através das configurações do seu navegador.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">7. Contato</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200">
                <p className="mb-4">Para dúvidas sobre esta política ou exercer seus direitos:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> contato@meusuper.app</p>
                  <p><strong>WhatsApp:</strong> (11) 99999-9999</p>
                  <p><strong>Responsável:</strong> Samuel Vicente Ferreira</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}