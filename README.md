# LK Cell · site

Site da LK Cell (Instagram @lk_assistenciabc), assistência técnica e loja de smartphones em Balneário Camboriú.
É um site estático, sem framework e sem dependências: um script Node gera o HTML em `dist/`.

## Páginas

| URL | Conteúdo |
|---|---|
| `/` | Home: hero, serviços, vitrine, pré-orçamento que monta a mensagem do WhatsApp, como funciona, endereço, FAQ |
| `/troca-de-tela` `/troca-de-bateria` `/conector-de-carga` `/reparo-de-placa` | Uma página por serviço, cada uma mirando a busca "serviço + Balneário Camboriú" |
| `/celulares` | Venda de iPhone e Android, celular no boleto |

Arquivos de SEO/GEO gerados no build: `sitemap.xml`, `robots.txt` (com os bots de IA liberados), `llms.txt`, `llms-full.txt`, `site.webmanifest`. Em todas as páginas há schema.org (`MobilePhoneStore`, `Service`, `FAQPage`, `BreadcrumbList`), canonical, Open Graph e Twitter Card.

## Rodar local

```bash
npm run dev     # build + servidor em http://localhost:3000
npm run build   # só gera dist/
```

## Deploy na Vercel

1. Importe o repositório na Vercel. O `vercel.json` já define build (`node build.mjs`), saída (`dist`) e URLs limpas.
2. Com domínio próprio, crie a variável de ambiente `SITE_URL` (ex.: `https://www.lkcell.com.br`). Sem ela, o build usa o domínio de produção da Vercel automaticamente.
3. Depois do primeiro deploy: cadastre o domínio no Google Search Console e envie `/sitemap.xml`.

## Onde editar

- `src/config.mjs`: endereço, WhatsApp, horário, garantia, marcas. Campos com `TODO` ainda precisam de confirmação; enquanto estiverem vazios, o site não exibe a informação.
- `src/pages.mjs`: textos das páginas de serviço e das FAQs.
- `src/render.mjs`: HTML e schema.org.
- `src/styles.css`, `src/main.js`: visual e interações.
- `public/img/`: fotos. As atuais foram recortadas do feed do Instagram e estão em baixa resolução; trocar por fotos originais melhora bastante.
- `npm run assets`: regera favicons e `og.jpg` (precisa de Playwright e ImageMagick).

## Medir conversão

Todo botão de WhatsApp, Maps e Waze tem `data-track`. Se GA4/GTM ou Meta Pixel forem instalados, o `main.js` já dispara `generate_lead` (GA4) e `Contact` (Pixel) no clique.
