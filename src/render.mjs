import { business, mapsUrl, wazeUrl, waLink, SITE_URL } from './config.mjs';
import { services, celulares, homeFaq } from './pages.mjs';

const b = business;
const addrLine = `${b.address.street}, ${b.address.city} - ${b.address.region}`;
const WA_DEFAULT = 'Oi! Vim pelo site da LK e quero um orçamento.';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const url = (path) => SITE_URL + (path === '/' ? '/' : path);

/* ---------- Ícones (SVG inline, sem dependência) ---------- */
const i = {
  wa: (s = 20) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41"/></svg>`,
  arrow: (s = 16) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  pin: (s = 16) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`,
  check: (s = 18) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>`,
  phones: (s = 16) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/></svg>`,
  receipt: (s = 16) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/></svg>`,
  ig: (s = 18) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>`,
  menu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  // Ícones dos serviços
  'troca-de-tela': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="m9 7 3 3-2 2 4 4"/></svg>`,
  'troca-de-bateria': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="16" height="10" rx="2"/><path d="M21 10.5v3M7 12h4M9 10v4"/></svg>`,
  'conector-de-carga': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3v4M15 3v4M7 7h10v4a5 5 0 0 1-10 0z"/><path d="M12 16v5"/></svg>`,
  'reparo-de-placa': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/></svg>`,
};

const waBtn = (text, label, track, cls = 'btn btn-chrome') =>
  `<a class="${cls}" href="${esc(waLink(text))}" target="_blank" rel="noopener" data-track="${track}"><span class="wa-dot">${i.wa()}</span>${label}</a>`;

const hoursText = () =>
  b.hours.length ? b.hours.map((h) => `${h.label}: ${h.opens} às ${h.closes}`).join('<br>') : 'Confirme o horário pelo WhatsApp';

/* ---------- Schema.org ---------- */
function businessSchema() {
  const s = {
    '@type': 'MobilePhoneStore',
    '@id': `${SITE_URL}/#loja`,
    name: b.name,
    alternateName: ['LK Assistência', 'LK_CELL', 'LK Cell Balneário Camboriú'],
    slogan: b.tagline,
    description:
      'Assistência técnica de celular e loja de smartphones em Balneário Camboriú (SC). Troca de tela, troca de bateria, conector de carga e reparo em placa de iPhone, Samsung, Motorola e Xiaomi. Venda de iPhone e Android, com opção no boleto.',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/img/logo-lk.jpg`,
    image: [`${SITE_URL}/img/loja-fachada-equipe.jpg`, `${SITE_URL}/og.jpg`],
    telephone: b.phoneE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.address.street,
      addressLocality: b.address.city,
      addressRegion: b.address.region,
      addressCountry: b.address.country,
      ...(b.address.postalCode && { postalCode: b.address.postalCode }),
    },
    areaServed: b.areaServed.map((name) => ({ '@type': 'City', name })),
    sameAs: [b.instagram],
    hasMap: mapsUrl,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: b.phoneE164,
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
      url: waLink(WA_DEFAULT),
    },
    knowsAbout: ['Conserto de iPhone', 'Troca de tela de celular', 'Troca de bateria de celular', 'Conector de carga', 'Reparo em placa de celular', 'Venda de smartphones'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços e produtos',
      itemListElement: [
        ...services.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.serviceType, url: url('/' + s.slug) },
        })),
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'iPhone e smartphones', url: url('/celulares') } },
      ],
    },
  };
  if (b.geo) s.geo = { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng };
  if (b.hours.length)
    s.openingHoursSpecification = b.hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes }));
  return s;
}

function faqSchema(faq) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

function crumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, n) => ({ '@type': 'ListItem', position: n + 1, name: c.name, item: url(c.path) })),
  };
}

const jsonLd = (graph) =>
  `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`;

/* ---------- Estrutura comum ---------- */
const navItems = [
  { href: '/#servicos', label: 'Serviços' },
  { href: '/celulares', label: 'Celulares à venda' },
  { href: '/#orcamento', label: 'Orçamento' },
  { href: '/#loja', label: 'Onde estamos' },
];

function head({ title, description, path, css, preload = '', graph }) {
  const canonical = url(path);
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="theme-color" content="#060607">
<meta name="geo.region" content="BR-SC">
<meta name="geo.placename" content="${b.address.city}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${b.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE_URL}/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="LK Cell, consertos e vendas de smartphones em Balneário Camboriú">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE_URL}/og.jpg">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="text/plain" title="LLM summary" href="/llms.txt">
<link rel="preload" href="/fonts/bodoni-moda.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/hanken-grotesk.woff2" as="font" type="font/woff2" crossorigin>
${preload}
<style>${css}</style>
${jsonLd(graph)}
</head>`;
}

function header(path) {
  return `<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header class="site-header" id="topo">
  <div class="wrap nav">
    <a class="brand" href="/" aria-label="LK Cell, página inicial">
      <img src="/img/logo-lk.webp" width="42" height="42" alt="Logo LK Cell">
      <span><b>LK Cell</b><small>Consertos &amp; vendas</small></span>
    </a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${i.menu}</button>
    <nav class="nav-links" id="menu" aria-label="Principal">
      ${navItems.map((n) => `<a href="${n.href}"${n.href === path ? ' aria-current="page"' : ''}>${n.label}</a>`).join('')}
    </nav>
    ${waBtn(WA_DEFAULT, 'Chamar no WhatsApp', 'whatsapp_header', 'btn btn-chrome btn-sm')}
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <img src="/img/logo-lk.webp" width="64" height="64" alt="" loading="lazy">
        <p>LK Cell · ${b.tagline}.<br>Assistência técnica e loja de smartphones em Balneário Camboriú.</p>
      </div>
      <div>
        <h2>Serviços</h2>
        <ul>${services.map((s) => `<li><a href="/${s.slug}">${s.short}</a></li>`).join('')}<li><a href="/celulares">Celulares à venda</a></li></ul>
      </div>
      <div>
        <h2>Loja</h2>
        <address style="font-style:normal">${b.address.street}<br>${b.address.city} - ${b.address.region}</address>
        <p style="margin-top:10px">${hoursText()}</p>
        <p style="margin-top:10px"><a href="${esc(mapsUrl)}" target="_blank" rel="noopener">Abrir no Google Maps</a></p>
      </div>
      <div>
        <h2>Contato</h2>
        <ul>
          <li><a href="${esc(waLink(WA_DEFAULT))}" target="_blank" rel="noopener" data-track="whatsapp_footer">WhatsApp ${b.phoneDisplay}</a></li>
          <li><a href="tel:+${b.whatsapp}">Ligar ${b.phoneDisplay}</a></li>
          <li><a href="${b.instagram}" target="_blank" rel="noopener">Instagram ${b.instagramHandle}</a></li>
        </ul>
      </div>
    </div>
    <div class="legal">
      <span>© <span data-year>${new Date().getFullYear()}</span> LK Cell. Balneário Camboriú, SC.</span>
      <span>iPhone é marca da Apple Inc. A LK Cell é uma assistência técnica independente.</span>
    </div>
  </div>
</footer>
<a class="wa-float" href="${esc(waLink(WA_DEFAULT))}" target="_blank" rel="noopener" aria-label="Falar com a LK Cell no WhatsApp" data-track="whatsapp_float">${i.wa(30)}</a>
<script src="/main.js" defer></script>
</body>
</html>`;
}

const faqBlock = (faq) =>
  `<div class="faq">${faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>`;

/* ---------- Home ---------- */
export function renderHome(css) {
  const title = 'LK Cell | Assistência Técnica de Celular em Balneário Camboriú';
  const description =
    'Troca de tela, bateria, conector e reparo em placa de iPhone, Samsung, Motorola e Xiaomi. Venda de iPhone e celular no boleto. Rua 1400, Balneário Camboriú.';
  const graph = [
    businessSchema(),
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#site`,
      url: `${SITE_URL}/`,
      name: 'LK Cell',
      inLanguage: 'pt-BR',
      publisher: { '@id': `${SITE_URL}/#loja` },
    },
    { '@type': 'WebPage', '@id': `${SITE_URL}/#pagina`, url: `${SITE_URL}/`, name: title, description, isPartOf: { '@id': `${SITE_URL}/#site` }, about: { '@id': `${SITE_URL}/#loja` }, inLanguage: 'pt-BR' },
    faqSchema(homeFaq),
  ];

  const problems = [
    ['Tela quebrada', 'Tela quebrada ou com defeito'],
    ['Bateria', 'Bateria durando pouco / estufada'],
    ['Não carrega', 'Problema pra carregar (conector)'],
    ['Não liga', 'Não liga / reinicia / sem sinal'],
    ['Outro', 'Outro problema'],
    ['Comprar', 'Quero comprar um celular'],
  ];
  const devices = ['iPhone', 'Samsung', 'Motorola', 'Xiaomi', 'Outro'];

  return `${head({
    title,
    description,
    path: '/',
    css,
    graph,
    preload: '<link rel="preload" as="image" href="/img/loja-fachada-equipe.webp" type="image/webp" fetchpriority="high">',
  })}
<body>
${header('/')}
<main id="conteudo">
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <h1>
          <span class="kicker">Assistência técnica de celular em Balneário Camboriú</span>
          <span class="display chrome">Celular quebrado tem <em>conserto.</em></span>
        </h1>
        <p class="lead">Troca de tela, bateria, conector de carga e reparo em placa de <strong>iPhone e Android</strong>. Manda o modelo e o problema no WhatsApp e recebe o orçamento sem compromisso.</p>
        <div class="cta-row">
          ${waBtn(WA_DEFAULT, 'Pedir orçamento no WhatsApp', 'whatsapp_hero')}
          <a class="btn btn-ghost" href="/celulares">Ver celulares à venda</a>
        </div>
        <ul class="facts">
          <li>${i.pin()}Rua 1400, 386 · Box 308</li>
          <li>${i.phones()}iPhone, Samsung, Motorola, Xiaomi</li>
          <li>${i.receipt()}Orçamento sem compromisso</li>
        </ul>
      </div>
      <div class="hero-media">
        <div class="hero-photo">
          <img src="/img/loja-fachada-equipe.webp" width="318" height="518" alt="Equipe da LK Cell em frente à loja, com a placa Consertos e Vendas de Smartphones" fetchpriority="high">
        </div>
        <div class="hero-badge"><img src="/img/logo-lk.webp" width="112" height="112" alt=""></div>
        <p class="hero-tag"><span>Loja física</span><b>Balneário Camboriú</b></p>
      </div>
    </div>
  </section>

  <section class="strip" aria-label="Marcas atendidas">
    <div class="wrap">
      <p>Especializada em iPhone. Também atende:</p>
      <ul>${b.brands.map((x) => `<li>${x}</li>`).join('')}</ul>
    </div>
  </section>

  <section class="section" id="servicos">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="eyebrow">Serviços</span>
        <h2>O que costuma quebrar, a gente conserta.</h2>
        <p>Escolhe o que está acontecendo com o seu aparelho. Cada página explica os sinais, como funciona e o que perguntar antes de deixar o celular.</p>
      </div>
      <div class="svc-grid">
        ${services
          .map(
            (s) => `<a class="svc reveal" href="/${s.slug}">
          <span class="icon">${i[s.slug]}</span>
          <h3>${s.short}</h3>
          <p>${s.card}</p>
          <span class="more">Ver detalhes ${i.arrow()}</span>
        </a>`
          )
          .join('')}
      </div>
      <div class="sale reveal">
        <div class="sale-copy">
          <span class="pill">Vitrine</span>
          <h3>iPhone e smartphones à venda.</h3>
          <p>iPhone de várias gerações e Android como Xiaomi, Redmi e Poco. Tem opção de celular no boleto. O estoque gira, então pergunta o que tem hoje.</p>
          <div class="cta-row" style="margin-top:8px">
            ${waBtn(celulares.wa, 'Perguntar o que tem hoje', 'whatsapp_vitrine')}
            <a class="btn btn-ghost" href="/celulares">Saiba mais</a>
          </div>
        </div>
        <div class="sale-pics">
          <img src="/img/vitrine-iphones.webp" width="312" height="518" alt="Vitrine da LK Cell com iPhones expostos e caixas de Xiaomi" loading="lazy">
          <img src="/img/iphone-17-pro-laranja.webp" width="380" height="270" alt="Caixas de iPhone 17 Pro nas cores prata e laranja" loading="lazy">
          <img src="/img/iphone-azul.webp" width="390" height="300" alt="iPhone Pro azul-sierra na mão de cliente" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <section class="section os-section" id="orcamento">
    <div class="wrap os-grid">
      <div class="os-intro reveal">
        <span class="eyebrow">Orçamento rápido</span>
        <h2>Monta o pedido aqui e manda direto pro WhatsApp.</h2>
        <p>Marca o aparelho e o problema. A mensagem já sai pronta, é só enviar. Se puder, manda uma foto junto: ajuda a passar o valor mais rápido.</p>
      </div>
      <form class="ticket reveal" id="os-form" data-wa="${b.whatsapp}" aria-label="Pré-orçamento pelo WhatsApp">
        <div class="ticket-head"><b>LK Cell</b><span>Pré-orçamento · <span data-today></span></span></div>
        <fieldset>
          <legend>Aparelho</legend>
          <div class="chips">
            ${devices.map((d, n) => `<label class="chip"><input type="radio" name="aparelho" id="ap-${n}" value="${d}"${n === 0 ? ' checked' : ''}><span>${d}</span></label>`).join('')}
          </div>
        </fieldset>
        <fieldset>
          <label class="lbl" for="modelo">Modelo (se souber)</label>
          <input type="text" id="modelo" name="modelo" placeholder="Ex.: iPhone 13, Galaxy A54, Moto G84" autocomplete="off" maxlength="60">
        </fieldset>
        <fieldset>
          <legend>O que está acontecendo</legend>
          <div class="chips">
            ${problems.map(([label, val], n) => `<label class="chip"><input type="radio" name="problema" id="pb-${n}" value="${val}"${n === 0 ? ' checked' : ''}><span>${label}</span></label>`).join('')}
          </div>
        </fieldset>
        <output class="preview" id="os-preview" for="modelo" aria-live="polite"><small>Mensagem</small>${esc(WA_DEFAULT)}</output>
        <a class="btn btn-dark" id="os-send" href="${esc(waLink(WA_DEFAULT))}" target="_blank" rel="noopener" data-track="whatsapp_orcamento">${i.wa()} Enviar no WhatsApp</a>
        <p class="ticket-foot">Atendimento pelo ${b.phoneDisplay}</p>
      </form>
    </div>
  </section>

  <section class="section" id="como-funciona">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="eyebrow">Como funciona</span>
        <h2>Do primeiro “oi” ao celular de volta.</h2>
      </div>
      <ol class="steps" style="list-style:none;margin:0;padding:0">
        <li class="step reveal"><span class="n">01</span><h3>Manda mensagem</h3><p>Modelo do aparelho, o que aconteceu e, se der, uma foto.</p></li>
        <li class="step reveal"><span class="n">02</span><h3>Recebe o orçamento</h3><p>Valor e prazo antes de qualquer serviço. Sem compromisso.</p></li>
        <li class="step reveal"><span class="n">03</span><h3>Traz na loja</h3><p>Rua 1400, 386, Box 308. O conserto é feito na bancada.</p></li>
        <li class="step reveal"><span class="n">04</span><h3>Retira testado</h3><p>O aparelho é testado antes de voltar pra sua mão.</p></li>
      </ol>
    </div>
  </section>

  <section class="section" id="loja" style="padding-top:0">
    <div class="wrap store">
      <div class="store-photos reveal">
        <img src="/img/teste-tela.webp" width="318" height="518" alt="Celular sendo testado na bancada da LK Cell" loading="lazy">
        <img src="/img/bancada-reparo.webp" width="318" height="518" alt="Técnico abrindo um celular na bancada da LK Cell" loading="lazy">
      </div>
      <div class="address reveal">
        <span class="eyebrow">Onde estamos</span>
        <p class="street">Rua 1400, 386<br><span class="chrome">Box 308</span></p>
        <dl>
          <dt>Cidade</dt><dd>${b.address.city} - ${b.address.region}</dd>
          <dt>Horário</dt><dd>${hoursText()}</dd>
          <dt>WhatsApp</dt><dd><a href="${esc(waLink(WA_DEFAULT))}" target="_blank" rel="noopener" data-track="whatsapp_loja">${b.phoneDisplay}</a></dd>
          <dt>Instagram</dt><dd><a href="${b.instagram}" target="_blank" rel="noopener">${b.instagramHandle}</a></dd>
        </dl>
        <div class="cta-row" style="margin-top:6px">
          <a class="btn btn-chrome" href="${esc(mapsUrl)}" target="_blank" rel="noopener" data-track="maps">${i.pin(18)} Abrir no Google Maps</a>
          <a class="btn btn-ghost" href="${esc(wazeUrl)}" target="_blank" rel="noopener" data-track="waze">Ir pelo Waze</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="duvidas" style="padding-top:0">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="eyebrow">Dúvidas frequentes</span>
        <h2>Antes de chamar.</h2>
      </div>
      ${faqBlock(homeFaq)}
    </div>
  </section>

  <section class="final">
    <div class="wrap">
      <span class="eyebrow">LK Cell · Balneário Camboriú</span>
      <h2 class="chrome">Manda uma foto do problema.</h2>
      <p>Com o modelo e uma foto, a gente já consegue te passar o caminho. Resposta pelo WhatsApp.</p>
      ${waBtn(WA_DEFAULT, 'Falar com a LK no WhatsApp', 'whatsapp_final')}
    </div>
  </section>
</main>
${footer()}`;
}

/* ---------- Página de serviço / vendas ---------- */
export function renderService(p, css) {
  const path = '/' + p.slug;
  const pageUrl = url(path);
  const isSale = p.slug === 'celulares';
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: p.short, path },
  ];
  const graph = [
    businessSchema(),
    { '@type': 'WebPage', '@id': `${pageUrl}#pagina`, url: pageUrl, name: p.title, description: p.description, isPartOf: { '@id': `${SITE_URL}/#site` }, about: { '@id': `${SITE_URL}/#loja` }, inLanguage: 'pt-BR', breadcrumb: { '@id': `${pageUrl}#trilha` } },
    { ...crumbSchema(crumbs), '@id': `${pageUrl}#trilha` },
    faqSchema(p.faq),
  ];
  if (!isSale)
    graph.push({
      '@type': 'Service',
      '@id': `${pageUrl}#servico`,
      name: p.serviceType,
      serviceType: p.serviceType,
      description: p.intro,
      url: pageUrl,
      provider: { '@id': `${SITE_URL}/#loja` },
      areaServed: b.areaServed.map((name) => ({ '@type': 'City', name })),
      audience: { '@type': 'Audience', audienceType: 'Donos de iPhone, Samsung, Motorola e Xiaomi' },
    });

  const others = [...services, celulares].filter((s) => s.slug !== p.slug);

  return `${head({
    title: p.title,
    description: p.description,
    path,
    css,
    graph,
    preload: `<link rel="preload" as="image" href="${p.image.src}" type="image/webp">`,
  })}
<body>
${header(path)}
<main id="conteudo">
  <section class="hero svc-hero">
    <div class="wrap hero-grid">
      <div>
        <nav class="crumbs" aria-label="Você está em"><a href="/">Início</a><span aria-hidden="true">/</span><span>${p.short}</span></nav>
        <h1>
          <span class="kicker">${p.h1}</span>
          <span class="display chrome">${p.display}</span>
        </h1>
        <p class="lead">${p.intro}</p>
        <div class="cta-row">
          ${waBtn(p.wa, isSale ? 'Perguntar o que tem hoje' : 'Pedir orçamento no WhatsApp', `whatsapp_${p.slug}`)}
          <a class="btn btn-ghost" href="${esc(mapsUrl)}" target="_blank" rel="noopener" data-track="maps">${i.pin(18)} Rua 1400, 386</a>
        </div>
      </div>
      <div class="hero-media">
        <div class="hero-photo"><img src="${p.image.src}" width="${p.image.w}" height="${p.image.h}" alt="${esc(p.image.alt)}" fetchpriority="high"></div>
        <div class="hero-badge"><img src="/img/logo-lk.webp" width="112" height="112" alt=""></div>
      </div>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="wrap">
      <div class="section-head reveal"><span class="eyebrow">${isSale ? 'Na loja' : 'Sinais'}</span><h2>${p.signsTitle}</h2></div>
      <ul class="signs">${p.signs.map((s) => `<li class="reveal">${i.check()}<span>${esc(s)}</span></li>`).join('')}</ul>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="wrap prose">
      ${p.sections.map((s) => `<article class="reveal"><h2>${s.h2}</h2><p>${s.p}</p></article>`).join('')}
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="wrap">
      <div class="section-head reveal"><span class="eyebrow">Dúvidas</span><h2>Perguntas sobre ${p.short.toLowerCase()}</h2></div>
      ${faqBlock(p.faq)}
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="wrap">
      <div class="section-head reveal"><span class="eyebrow">Também na LK</span><h2>Outros serviços</h2></div>
      <div class="related">${others.map((o) => `<a href="/${o.slug}">${o.short} ${i.arrow()}</a>`).join('')}</div>
    </div>
  </section>

  <section class="final">
    <div class="wrap">
      <span class="eyebrow">${p.short} · Balneário Camboriú</span>
      <h2 class="chrome">${isSale ? 'Pergunta o que tem na vitrine.' : 'Manda uma foto do problema.'}</h2>
      <p>${addrLine}. Atendimento pelo WhatsApp ${b.phoneDisplay}.</p>
      ${waBtn(p.wa, 'Falar no WhatsApp', `whatsapp_final_${p.slug}`)}
    </div>
  </section>
</main>
${footer()}`;
}

/* ---------- 404 ---------- */
export function render404(css) {
  return `${head({ title: 'Página não encontrada | LK Cell', description: 'Essa página não existe. Volte pro início ou fale com a LK Cell no WhatsApp.', path: '/404', css, graph: [businessSchema()] }).replace(
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">',
    '<meta name="robots" content="noindex">'
  )}
<body>
${header('')}
<main id="conteudo">
  <section class="final" style="border-top:0">
    <div class="wrap">
      <span class="eyebrow">Erro 404</span>
      <h1 class="chrome" style="font:500 var(--step-4)/1 var(--display)">Essa página quebrou.</h1>
      <p>Já celular quebrado a gente conserta. Volta pro início ou chama no WhatsApp.</p>
      <div class="cta-row" style="justify-content:center">
        <a class="btn btn-chrome" href="/">Voltar pro início</a>
        ${waBtn(WA_DEFAULT, 'WhatsApp', 'whatsapp_404', 'btn btn-ghost')}
      </div>
    </div>
  </section>
</main>
${footer()}`;
}
