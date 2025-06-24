import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Users, AlertTriangle, Clock } from "lucide-react";
import { Link } from "wouter";

export default function TermsOfService() {
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
            
            <Badge className="mb-4 bg-orange-500/20 text-orange-200 border-orange-500/30">
              <FileText className="mr-2 h-3 w-3" />
              Termos de Uso
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Termos de <span className="text-orange-400">Uso</span>
            </h1>
            
            <p className="text-gray-200 text-lg">
              Condições para uso dos nossos serviços de automação com IA
            </p>
            
            <p className="text-gray-400 text-sm mt-4">
              Última atualização: 24 de junho de 2025
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <Card className="bg-slate-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Users className="mr-2 h-5 w-5 text-orange-400" />
                  1. Aceitação dos Termos
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200 space-y-4">
                <p>
                  Ao acessar e usar os serviços do MeuSuper.app, você concorda com estes Termos de Uso. 
                  Se não concordar com qualquer parte destes termos, não deve usar nossos serviços.
                </p>
                <p>
                  Estes termos se aplicam a todos os usuários, visitantes e outras pessoas que acessam 
                  ou usam nossos serviços de agentes de IA para automação multicanal.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-white">2. Descrição dos Serviços</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200 space-y-4">
                <p>O MeuSuper.app oferece:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Desenvolvimento de agentes de IA para atendimento multicanal</li>
                  <li>Integração com WhatsApp, Instagram, Facebook, Email e SMS</li>
                  <li>Automação de processos de vendas e atendimento</li>
                  <li>Integração com sistemas de CRM e plataformas de venda</li>
                  <li>Suporte técnico mensal contínuo</li>
                </ul>
                
                <div className="bg-orange-900/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Prazo de Implementação:</h4>
                  <p>15 dias úteis a partir da confirmação do projeto e recebimento de todos os materiais necessários.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Clock className="mr-2 h-5 w-5 text-orange-400" />
                  3. Condições de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200 space-y-4">
                <h4 className="font-semibold text-white">Modalidade de Cobrança:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Serviço de assinatura mensal</li>
                  <li>Taxa de setup para implementação inicial</li>
                  <li>Pagamento via PIX, cartão ou boleto</li>
                  <li>Cobrança recorrente no mesmo dia de cada mês</li>
                </ul>

                <h4 className="font-semibold text-white pt-4">Política de Cancelamento:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cancelamento a qualquer momento com aviso de 30 dias</li>
                  <li>Não há devolução de valores já pagos</li>
                  <li>Acesso aos serviços permanece ativo até o fim do período pago</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-white">4. Responsabilidades do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200 space-y-4">
                <p>Você se compromete a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fornecer informações precisas e atualizadas</li>
                  <li>Manter em sigilo credenciais de acesso aos sistemas</li>
                  <li>Usar os serviços apenas para fins legais e éticos</li>
                  <li>Não tentar comprometer a segurança dos sistemas</li>
                  <li>Pagar as mensalidades em dia</li>
                  <li>Colaborar durante o processo de implementação</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-white">5. Nossas Responsabilidades</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200 space-y-4">
                <p>Nós nos comprometemos a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Implementar os agentes de IA conforme especificado</li>
                  <li>Fornecer suporte técnico durante horário comercial</li>
                  <li>Manter a confidencialidade dos seus dados</li>
                  <li>Garantir uptime de 99% dos serviços</li>
                  <li>Realizar backup regular dos dados</li>
                  <li>Atualizar e manter os sistemas funcionando</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <AlertTriangle className="mr-2 h-5 w-5 text-orange-400" />
                  6. Limitações e Garantias
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200 space-y-4">
                <h4 className="font-semibold text-white">Garantias:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>97% de satisfação dos clientes</li>
                  <li>Implementação em até 15 dias úteis</li>
                  <li>Suporte técnico responsivo</li>
                  <li>Agentes funcionais conforme especificado</li>
                </ul>

                <h4 className="font-semibold text-white pt-4">Limitações:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Dependência de APIs de terceiros (WhatsApp, Instagram, etc.)</li>
                  <li>Limitações técnicas das plataformas integradas</li>
                  <li>Necessidade de cooperação do cliente para implementação</li>
                  <li>Suporte limitado ao horário comercial</li>
                </ul>

                <div className="bg-red-900/30 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold text-white mb-2">Importante:</h4>
                  <p>Não garantimos resultados específicos de vendas ou conversões, pois dependem de múltiplos fatores do seu negócio.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-white">7. Propriedade Intelectual</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200 space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Os agentes criados são customizados para seu negócio</li>
                  <li>Você mantém propriedade sobre seus dados e conteúdo</li>
                  <li>Nós mantemos propriedade sobre a tecnologia e metodologia</li>
                  <li>Uso da nossa marca e logotipos requer autorização</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-white">8. Modificações dos Termos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200 space-y-4">
                <p>
                  Podemos modificar estes termos a qualquer momento. Mudanças significativas serão 
                  comunicadas com 30 dias de antecedência via email ou WhatsApp.
                </p>
                <p>
                  O uso continuado dos serviços após as modificações constitui aceitação dos novos termos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-white">9. Contato e Suporte</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200">
                <p className="mb-4">Para dúvidas, suporte ou questões sobre estes termos:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> contato@meusuper.app</p>
                  <p><strong>WhatsApp:</strong> (11) 99999-9999</p>
                  <p><strong>Responsável:</strong> Samuel Vicente Ferreira</p>
                  <p><strong>Horário:</strong> Segunda a sexta, 9h às 18h</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}