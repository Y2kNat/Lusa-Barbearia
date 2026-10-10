# LUSA Barbearia

Landing page da LUSA Barbearia, Jardim Bonfiglioli, São Paulo.

React + Vite + TypeScript + Tailwind + GSAP. Deploy na Vercel.

## Antes do primeiro deploy

Defina o domínio. Ele aparece em 5 lugares do `index.html` (canonical,
og:image, og:image:secure_url, og:url, twitter:image) e **precisa** ser URL
absoluta, senão WhatsApp e Facebook não carregam a imagem de compartilhamento.

```bash
./TROCAR-DOMINIO.sh seudominio.com.br
```

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build -> dist/
npm run preview  # serve o dist
```

## Estrutura

```
public/frames-desktop/   240 frames 1280x720 (8,1 MB)
public/frames-mobile/    240 frames 960x540  (5,5 MB)
public/og-image.jpg      imagem de compartilhamento (1200x630)
src/components/          um componente por arquivo
src/data/                serviços,-establishment e avaliações (transcritos)
src/lib/feriados.ts      feriados nacionais 2026-2027 + municipal de SP
```

O hero é um canvas que faz scrub dos 240 frames conforme o scroll, com blur
de 2px e carregamento progressivo. `prefers-reduced-motion` mostra só o
primeiro frame.

## Dados

Serviços, preços, horários, equipe e avaliações vêm dos arquivos em
`src/data/`, extraídos do Google Maps e da Booksy. Nada é inventado. O status
"Aberto agora" é calculado no navegador a partir do horário e da lista de
feriados.
