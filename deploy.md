# Deploy Guide - MeuSuper.app

## Pré-requisitos

1. **Docker Swarm** configurado
2. **Traefik** configurado como proxy reverso
3. **Rede externa** `MSAppRede` criada
4. **Volume** `meusuper-app-data` criado
5. **Certificados SSL** configurados no Traefik

## Configuração do Ambiente

### 1. Criar Volume Docker
```bash
docker volume create meusuper-app-data
```

### 2. Criar Rede Externa
```bash
docker network create --driver overlay --attachable MSAppRede
```

### 3. Configurar Variáveis de Ambiente

Edite o arquivo `docker-compose.yml` e substitua:
- `SEU_USUARIO` pelo seu usuário do GitHub
- `SUA_SENHA` pela senha do seu banco Neon
- `SEU_HOST` pelo host do seu banco Neon
- `SUA_SENHA_EMAIL` pela senha do seu email

### 4. Configurar Banco de Dados

1. Acesse [Neon.tech](https://neon.tech)
2. Crie um novo projeto
3. Copie a connection string
4. Atualize as variáveis no docker-compose.yml

## Deploy

### 1. Deploy da Stack
```bash
docker stack deploy -c docker-compose.yml meusuper-app-stack
```

### 2. Verificar Status
```bash
docker service ls
docker service logs meusuper-app-stack_meusuper-app
```

### 3. Verificar Logs
```bash
docker service logs -f meusuper-app-stack_meusuper-app
```

## Configurações DNS

Configure os seguintes registros DNS:

```
A     meusuper.app         -> SEU_IP_SERVIDOR
CNAME www.meusuper.app     -> meusuper.app
```

## Certificados SSL

O Traefik irá gerar automaticamente certificados SSL via Let's Encrypt para:
- `meusuper.app`
- `www.meusuper.app`

## Monitoramento

### Verificar Saúde do Serviço
```bash
curl -I https://meusuper.app
```

### Logs em Tempo Real
```bash
docker service logs -f meusuper-app-stack_meusuper-app
```

## Backup e Recuperação

### Backup do Volume
```bash
docker run --rm -v meusuper-app-data:/data -v $(pwd):/backup alpine tar czf /backup/meusuper-app-backup-$(date +%Y%m%d).tar.gz -C /data .
```

### Restaurar Backup
```bash
docker run --rm -v meusuper-app-data:/data -v $(pwd):/backup alpine tar xzf /backup/meusuper-app-backup-YYYYMMDD.tar.gz -C /data
```

## Atualizações

### Atualizar Aplicação
```bash
docker service update --force meusuper-app-stack_meusuper-app
```

### Rollback
```bash
docker service rollback meusuper-app-stack_meusuper-app
```

## Troubleshooting

### Serviço não inicia
```bash
docker service ps meusuper-app-stack_meusuper-app --no-trunc
```

### Problemas de certificado
```bash
docker logs traefik_container_name
```

### Problemas de rede
```bash
docker network inspect MSAppRede
```

## Variáveis de Ambiente Importantes

- `DATABASE_URL`: String de conexão com o banco
- `SESSION_SECRET`: Chave secreta para sessões
- `APP_URL`: URL principal da aplicação
- `WHATSAPP_NUMBER`: Número do WhatsApp para redirect
- `WEBHOOK_URL`: URL do webhook para leads

## Scripts Úteis

### Script de Deploy Automatizado
```bash
#!/bin/bash
echo "Fazendo deploy do MeuSuper.app..."
docker stack deploy -c docker-compose.yml meusuper-app-stack
echo "Aguardando serviços subirem..."
sleep 30
docker service ls | grep meusuper-app-stack
echo "Deploy concluído! Acesse: https://meusuper.app"
```

### Script de Backup Diário
```bash
#!/bin/bash
DATE=$(date +%Y%m%d)
docker run --rm -v meusuper-app-data:/data -v /backups:/backup alpine tar czf /backup/meusuper-app-$DATE.tar.gz -C /data .
echo "Backup criado: meusuper-app-$DATE.tar.gz"
```