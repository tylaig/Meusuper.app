#!/bin/bash

# Script para deploy do MeuSuper.app no Docker Swarm com Traefik

echo "🚀 Iniciando deploy do MeuSuper.app..."

# 1. Parar stack anterior se existir
echo "📦 Removendo stack anterior..."
docker stack rm meusuper-stack 2>/dev/null || true

# Aguardar limpeza completa
echo "⏳ Aguardando limpeza dos serviços..."
sleep 10

# 2. Verificar se a rede existe
echo "🌐 Verificando rede MSAppRede..."
if ! docker network ls | grep -q MSAppRede; then
    echo "⚠️  Rede MSAppRede não encontrada. Criando..."
    docker network create --driver overlay MSAppRede
fi

# 3. Verificar se o volume existe
echo "💾 Verificando volume meusuperapp..."
if ! docker volume ls | grep -q meusuperapp; then
    echo "⚠️  Volume meusuperapp não encontrado. Criando..."
    docker volume create meusuperapp
fi

# 4. Deploy do novo stack
echo "🚀 Fazendo deploy do novo stack..."
docker stack deploy -c docker-stack-fixed.yml meusuper-stack

# 5. Verificar status
echo "📊 Verificando status do deploy..."
sleep 5
docker service ls | grep meusuper

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "📋 Comandos úteis para monitoramento:"
echo "   docker service logs meusuper-stack_meusuper-app"
echo "   docker service ps meusuper-stack_meusuper-app"
echo "   curl -I https://meusuper.app"
echo ""
echo "🔧 Configuração aplicada:"
echo "   - Porta interna: 5005 (evita conflitos com Portainer)"
echo "   - Ambiente: production"
echo "   - SSL: LetsEncrypt automático"
echo ""
echo "🌍 Site estará disponível em: https://meusuper.app"