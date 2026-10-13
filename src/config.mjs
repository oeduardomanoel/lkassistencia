// Dados do negócio. Tudo que aparece no site, no schema.org e no llms.txt sai daqui.
// Campos marcados com TODO ainda não foram confirmados com o cliente:
// enquanto estiverem vazios, o site simplesmente não exibe a informação.

export const business = {
  name: 'LK Cell',
  legalName: 'LK Assistência', // TODO: confirmar razão social / CNPJ
  tagline: 'Consertos & Vendas de Smartphones',
  instagram: 'https://www.instagram.com/lk_assistenciabc/',
  instagramHandle: '@lk_assistenciabc',

  whatsapp: '5547997856226',
  phoneDisplay: '(47) 99785-6226',
  phoneE164: '+55-47-99785-6226',

  address: {
    street: 'Rua 1400, 386, Box 308',
    city: 'Balneário Camboriú',
    region: 'SC',
    regionName: 'Santa Catarina',
    country: 'BR',
    postalCode: '', // TODO: CEP
    neighborhood: '', // TODO: bairro
  },
  // TODO: latitude/longitude do Google Maps (melhora o SEO local)
  geo: null, // ex.: { lat: -26.99, lng: -48.63 }

  // TODO: horário real. Formato schema.org: dias em inglês, horas 24h.
  // Ex.: [{ days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '19:00', label: 'Segunda a sexta' }]
  hours: [],

  // TODO: garantia oferecida (ex.: '90 dias'). Vazio = o site não fala de prazo de garantia.
  warranty: '',

  brands: ['iPhone', 'Samsung', 'Motorola', 'Xiaomi'],
  // TODO: incluir cidades vizinhas se a loja atende/entrega (Camboriú, Itajaí, Itapema...)
  areaServed: ['Balneário Camboriú'],
};

export const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(`LK Cell, ${business.address.street}, ${business.address.city} - ${business.address.region}`);

export const wazeUrl =
  'https://waze.com/ul?q=' + encodeURIComponent(`Rua 1400, 386, ${business.address.city}`) + '&navigate=yes';

export function waLink(text) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
}

// URL pública. Na Vercel o domínio de produção vem sozinho; com domínio próprio, defina SITE_URL no projeto.
export const SITE_URL = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'https://lkcell.vercel.app'
).replace(/\/$/, '');
