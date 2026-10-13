(function () {
  var doc = document.documentElement;
  doc.classList.add('js');

  // Header com borda depois de rolar
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu mobile
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Entrada suave das seções (o conteúdo já é visível sem JS)
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    items.forEach(function (el) {
      if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in');
      else io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Pré-orçamento: monta a mensagem do WhatsApp
  var form = document.getElementById('os-form');
  if (form) {
    var send = document.getElementById('os-send');
    var preview = document.getElementById('os-preview');
    var phone = form.getAttribute('data-wa');
    var today = form.querySelector('[data-today]');
    if (today) today.textContent = new Date().toLocaleDateString('pt-BR');

    var build = function () {
      var ap = (form.querySelector('input[name="aparelho"]:checked') || {}).value || '';
      var pb = (form.querySelector('input[name="problema"]:checked') || {}).value || '';
      var modelo = (form.modelo.value || '').trim();
      var aparelho = modelo ? modelo : ap;
      var msg;
      if (pb === 'Quero comprar um celular') {
        msg = 'Oi! Vim pelo site da LK. Quero comprar um celular' + (aparelho && ap !== 'Outro' ? ' (' + aparelho + ')' : '') + '. O que vocês têm hoje?';
      } else {
        msg = 'Oi! Vim pelo site da LK e quero um orçamento.\nAparelho: ' + (aparelho || 'não sei o modelo') + '\nProblema: ' + pb;
      }
      preview.innerHTML = '';
      var label = document.createElement('small');
      label.textContent = 'Mensagem';
      preview.appendChild(label);
      preview.appendChild(document.createTextNode(msg));
      send.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
    };
    form.addEventListener('input', build);
    form.addEventListener('change', build);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      send.click();
    });
    build();
  }

  // Eventos de conversão: funcionam com GA4/GTM (dataLayer) ou Meta Pixel (fbq) se forem instalados
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-track]');
    if (!a) return;
    var name = a.getAttribute('data-track');
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'lk_click', lk_action: name, lk_page: location.pathname });
    if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { method: name });
    if (typeof window.fbq === 'function' && name.indexOf('whatsapp') === 0) window.fbq('track', 'Contact', { content_name: name });
  });

  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
