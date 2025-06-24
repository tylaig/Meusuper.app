import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, X } from "lucide-react";

interface WhatsAppModalProps {
  trigger: React.ReactNode;
}

export function WhatsAppModal({ trigger }: WhatsAppModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    empresa: "",
    mensagem: ""
  });

  const handleWhatsAppRedirect = () => {
    const baseMessage = "Olá, quero automatizar minha empresa com o MeuSuper.app";
    let message = baseMessage;
    
    if (formData.nome) {
      message = `Olá, sou ${formData.nome}`;
      if (formData.empresa) {
        message += ` da empresa ${formData.empresa}`;
      }
      message += " e quero automatizar meu negócio com o MeuSuper.app";
      
      if (formData.mensagem) {
        message += `. ${formData.mensagem}`;
      }
      
      if (formData.telefone) {
        message += `. Meu telefone é ${formData.telefone}`;
      }
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const handleQuickRedirect = () => {
    const message = "Olá, quero automatizar minha empresa com o MeuSuper.app";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-slate-900 border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MessageSquare className="h-5 w-5 text-green-400" />
            Falar com Especialista
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Preencha os dados abaixo para uma conversa mais personalizada ou clique em "Falar Agora" para ir direto ao WhatsApp.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome" className="text-gray-300">Nome</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="bg-slate-800 border-purple-500/30 text-white"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <Label htmlFor="telefone" className="text-gray-300">Telefone</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                className="bg-slate-800 border-purple-500/30 text-white"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="empresa" className="text-gray-300">Empresa (opcional)</Label>
            <Input
              id="empresa"
              value={formData.empresa}
              onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
              className="bg-slate-800 border-purple-500/30 text-white"
              placeholder="Nome da empresa"
            />
          </div>
          
          <div>
            <Label htmlFor="mensagem" className="text-gray-300">Mensagem (opcional)</Label>
            <Textarea
              id="mensagem"
              value={formData.mensagem}
              onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
              className="bg-slate-800 border-purple-500/30 text-white min-h-[80px]"
              placeholder="Conte um pouco sobre seu negócio..."
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleWhatsAppRedirect}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            >
              <Send className="mr-2 h-4 w-4" />
              Enviar para WhatsApp
            </Button>
            <Button
              onClick={handleQuickRedirect}
              variant="outline"
              className="flex-1 border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Falar Agora
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}