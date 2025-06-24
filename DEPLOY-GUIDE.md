# Guia de Deploy - MeuSuper.app

## Correções Aplicadas

### ❌ Problemas da Configuração Original:
1. **Nome do serviço**: `crm-app` vs labels `gestao` (incompatível)
2. **Ambiente**: development em produção
3. **CORS**: sem HTTPS nos domínios
4. **Build**: apenas `npm run dev` (desenvolvimento)
5. **Certificado SSL**: configuração incompleta

### ✅ Correções Implementadas:
1. **Consistência**: `meusuper-app` para serviço e `meusuper-main` para labels
2. **Produção**: NODE_ENV=production + build completo
3. **CORS**: HTTPS nos domínios permitidos
4. **SSL**: Certificado LetsEncrypt + redirect HTTP→HTTPS
5. **WWW redirect**: www.meusuper.app → meusuper.app

## Arquivos Gerados

- `docker-stack-fixed.yml`: Configuração corrigida
- `deploy-commands.sh`: Script automatizado de deploy
- `DEPLOY-GUIDE.md`: Este guia

## Como Aplicar as Correções

### Opção 1: Script Automatizado
```bash
./deploy-commands.sh
```

### Opção 2: Manual
```bash
# 1. Parar stack atual
docker stack rm meusuper-stack

# 2. Aguardar limpeza
sleep 10

# 3. Deploy corrigido
docker stack deploy -c docker-stack-fixed.yml meusuper-stack

# 4. Monitorar
docker service logs meusuper-stack_meusuper-app
```

## Verificação do Deploy

```bash
# Status dos serviços
docker service ls

# Logs da aplicação
docker service logs meusuper-stack_meusuper-app

# Teste HTTP
curl -I https://meusuper.app

# Teste redirect WWW
curl -I https://www.meusuper.app
```

## Configurações do Traefik

### Labels Implementados:
- **Router HTTPS**: `meusuper-main` para tráfego seguro
- **Router HTTP**: Redirect automático para HTTPS
- **Middleware**: Redirect www → non-www
- **SSL/TLS**: LetsEncrypt automático
- **Load Balancer**: Porta 5000 com host header

### Entrypoints Necessários:
- `web`: Porta 80 (HTTP)
- `websecure`: Porta 443 (HTTPS)

## Troubleshooting

### Problema: Certificado SSL não gerado
```bash
# Verificar logs do Traefik
docker service logs traefik_traefik | grep -i cert

# Verificar configuração DNS
nslookup meusuper.app
```

### Problema: Serviço não responde
```bash
# Verificar se a aplicação está rodando
docker service ps meusuper-stack_meusuper-app

# Testar conectividade interna
docker exec -it $(docker ps -q --filter name=meusuper) curl localhost:5000
```

### Problema: 502 Bad Gateway
```bash
# Verificar se a porta está correta
docker service inspect meusuper-stack_meusuper-app | grep -i port

# Verificar logs de erro
docker service logs meusuper-stack_meusuper-app --tail 50
```

## Estrutura Final

```
📁 Projeto
├── docker-stack-fixed.yml     # ✅ Configuração corrigida
├── deploy-commands.sh         # ✅ Script de deploy
├── DEPLOY-GUIDE.md           # ✅ Documentação
└── troubleshoot-traefik.md   # ✅ Diagnóstico técnico
```

O domínio `meusuper.app` estará disponível após aplicar essas correções.