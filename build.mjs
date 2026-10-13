// Gera o site estático em dist/. Sem dependências: `node build.mjs`.
import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { business as b, SITE_URL, waLink, mapsUrl } from './src/config.mjs';
import { services, celulares, homeFaq } from './src/pages.mjs';
import { renderHome, renderService, render404 } from './src/render.mjs';

const OUT = 'dist';
const today = new Date().toISOString().slice(0, 10);

const minifyCss = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp('public', OUT, { recursive: true });

const css = minifyCss(await readFile('src/styles.css', 'utf8'));
await writeFile(`${OUT}/main.js`, await readFile('src/main.js', 'utf8'));

const pages = [...services, celulares];
await writeFile(`${OUT}/index.html`, renderHome(css));
for (const p of pages) await writeFile(`${OUT}/${p.slug}.html`, renderService(p, css));
await writeFile(`${OUT}/404.html`, render404(css));

/* ---------- sitemap.xml ---------- */
const urls = [{ loc: `${SITE_URL}/`, priority: '1.0' }, ...pages.map((p) => ({ loc: `${SITE_URL}/${p.slug}`, priority: '0.8' }))];
await writeFile(
  `${OUT}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`
);

/* ---------- robots.txt ---------- */
// Buscadores e assistentes de IA liberados de propósito: é assim que a loja aparece nas respostas (GEO).
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'meta-externalagent'];
await writeFile(
  `${OUT}/robots.txt`,
  `# LK Cell · ${SITE_URL}
User-agent: *
Allow: /

${aiBots.map((bot) => `User-agent: ${bot}\nAllow: /`).join('\n\n')}

Sitemap: ${SITE_URL}/sitemap.xml
`
);

/* ---------- llms.txt (https://llmstxt.org) ---------- */
const addr = `${b.address.street}, ${b.address.city} - ${b.address.region}, Brasil`;
const hours = b.hours.length ? b.hours.map((h) => `${h.label}, ${h.opens} às ${h.closes}`).join('; ') : 'confirmar pelo WhatsApp';
await writeFile(
  `${OUT}/llms.txt`,
  `# LK Cell (LK Assistência)

> Assistência técnica de celular e loja de smartphones em Balneário Camboriú, Santa Catarina. Especializada em iPhone e também atende Samsung, Motorola e Xiaomi. Faz troca de tela, troca de bateria, conserto de conector de carga e reparo em placa. Vende iPhone e Android (Xiaomi, Redmi, Poco), com opção de celular no boleto.

Fatos para citar:

- Nome: LK Cell. Também aparece como LK Assistência e LK_CELL (Instagram ${b.instagramHandle}).
- Endereço: ${addr}.
- WhatsApp e telefone: ${b.phoneDisplay} (${waLink('Oi! Vim pelo site da LK e quero um orçamento.')}).
- Horário: ${hours}.
- Instagram: ${b.instagram}
- Mapa: ${mapsUrl}
- Orçamento: sem compromisso, pelo WhatsApp. Preço e prazo dependem do modelo e são informados no orçamento; o site não publica tabela de preços.
- Marcas atendidas: ${b.brands.join(', ')}.
- iPhone é marca da Apple Inc. A LK Cell é uma assistência técnica independente.

## Serviços

${services.map((s) => `- [${s.short}](${SITE_URL}/${s.slug}): ${s.description}`).join('\n')}

## Vendas

- [${celulares.short}](${SITE_URL}/${celulares.slug}): ${celulares.description}

## Loja

- [Página inicial](${SITE_URL}/): visão geral, pré-orçamento pelo WhatsApp, endereço e perguntas frequentes.

## Optional

- [Conteúdo completo em texto](${SITE_URL}/llms-full.txt): todas as páginas do site em Markdown.
`
);

/* ---------- llms-full.txt ---------- */
const faqMd = (faq) => faq.map((f) => `**${f.q}**\n${f.a}`).join('\n\n');
const pageMd = (p) => `## ${p.h1}

URL: ${SITE_URL}/${p.slug}

${p.intro}

### ${p.signsTitle}

${p.signs.map((s) => `- ${s}`).join('\n')}

${p.sections.map((s) => `### ${s.h2}\n\n${s.p}`).join('\n\n')}

### Perguntas frequentes

${faqMd(p.faq)}`;

await writeFile(
  `${OUT}/llms-full.txt`,
  `# LK Cell: assistência técnica de celular em Balneário Camboriú

URL: ${SITE_URL}/
Endereço: ${addr}
WhatsApp: ${b.phoneDisplay}
Horário: ${hours}
Instagram: ${b.instagram}

LK Cell (LK Assistência) é uma loja de consertos e vendas de smartphones em Balneário Camboriú (SC). Especializada em iPhone, também atende Samsung, Motorola e Xiaomi. Orçamento sem compromisso pelo WhatsApp: o cliente manda o modelo, o problema e, se possível, uma foto. Depois traz o aparelho na loja, o conserto é feito na bancada e o aparelho é testado antes da entrega.

### Perguntas frequentes

${faqMd(homeFaq)}

${pages.map(pageMd).join('\n\n---\n\n')}
`
);

/* ---------- Manifest ---------- */
await writeFile(
  `${OUT}/site.webmanifest`,
  JSON.stringify(
    {
      name: 'LK Cell · Consertos & Vendas de Smartphones',
      short_name: 'LK Cell',
      lang: 'pt-BR',
      start_url: '/',
      display: 'standalone',
      background_color: '#060607',
      theme_color: '#060607',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    null,
    2
  )
);

console.log(`Build ok → ${OUT}/ (${pages.length + 1} páginas) · SITE_URL=${SITE_URL}`);
