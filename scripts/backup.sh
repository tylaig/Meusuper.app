#!/bin/bash

# Script de Backup para MeuSuper.app
# Autor: MeuSuper.app Team
# Data: 2025

set -e

BACKUP_DIR="/backups/meusuper-app"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="meusuper-app-backup-$DATE.tar.gz"

echo "💾 Iniciando backup do MeuSuper.app..."

# Criar diretório de backup se não existir
mkdir -p $BACKUP_DIR

# Fazer backup do volume
echo "📦 Fazendo backup do volume meusuper-data..."
docker run --rm \
  -v meusuper-data:/data \
  -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/$BACKUP_FILE -C /data .

# Verificar se o backup foi criado
if [ -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
    echo "✅ Backup criado com sucesso: $BACKUP_FILE"
    echo "📁 Localização: $BACKUP_DIR/$BACKUP_FILE"
    echo "📊 Tamanho: $(du -h $BACKUP_DIR/$BACKUP_FILE | cut -f1)"
else
    echo "❌ Erro ao criar backup!"
    exit 1
fi

# Limpar backups antigos (manter apenas os últimos 7 dias)
echo "🧹 Limpando backups antigos..."
find $BACKUP_DIR -name "meusuper-app-backup-*.tar.gz" -mtime +7 -delete

echo "🎉 Backup concluído!"