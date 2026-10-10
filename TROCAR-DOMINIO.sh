#!/usr/bin/env bash
# Troca SEU-DOMINIO.com.br pelo dominio real em index.html.
# Rode dentro desta pasta: ./TROCAR-DOMINIO.sh seudominio.com.br
set -euo pipefail

[ $# -eq 1 ] || { echo "uso: $0 seudominio.com.br"; exit 1; }
[ -f index.html ] || { echo "erro: rode dentro da pasta do projeto"; exit 1; }

NOVO="$1"
ALVO="SEU-DOMINIO.com.br"

grep -q "$ALVO" index.html || { echo "erro: placeholder '$ALVO' nao encontrado (dominio ja trocado?)"; exit 1; }

sed -i.bak "s|https://$ALVO|https://$NOVO|g" index.html
rm -f index.html.bak

echo "dominio aplicado: https://$NOVO"
grep -oE 'https://SEU-DOMINIO|https://'"$NOVO" index.html | sort -u
