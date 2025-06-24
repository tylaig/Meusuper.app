#!/bin/bash

# Script de Deploy para MeuSuper.app
# Autor: MeuSuper.app Team
# Data: 2025

set -e

echo "🚀 Iniciando deploy do MeuSuper.app..."

# Verificar se estamos no Docker Swarm
if ! docker info | grep -q "Swarm: active"; then
    echo "❌ Docker Swarm não está ativo. Execute: docker swarm init"
    exit 1
fi

# Criar volume se não existir
echo "📦 Verificando volume..."
if ! docker volume ls | grep -q "meusuper-data"; then
    echo "📦 Criando volume meusuper-data..."
    docker volume create meusuper-data
fi

# Criar rede se não existir
echo "🌐 Verificando rede..."
if ! docker network ls | grep -q "MSAppRede"; then
    echo "🌐 Criando rede MSAppRede..."
    docker network create --driver overlay --attachable MSAppRede
fi

# Deploy da stack
echo "🔄 Fazendo deploy da stack..."
docker stack deploy -c docker-stack.yml meusuper-stack

echo "⏳ Aguardando serviços subirem..."
sleep 30

# Verificar status
echo "📊 Status dos serviços:"
docker service ls | grep meusuper-stack

echo "📋 Logs do serviço:"
docker service logs --tail 20 meusuper-stack_meusuper-app

echo "✅ Deploy concluído!"
echo "🌐 Acesse: https://meusuper.app"
echo "📊 Monitoramento: docker service logs -f meusuper-stack_meusuper-app"