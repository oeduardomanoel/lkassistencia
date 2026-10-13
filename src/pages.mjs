// Conteúdo das páginas de serviço. Cada uma vira /slug no site, entra no sitemap e no llms.txt.
// Regra da copy: nada de preço, prazo ou garantia inventados. Quando o dado depende do caso, o texto manda pro orçamento.

export const services = [
  {
    slug: 'troca-de-tela',
    short: 'Troca de tela',
    serviceType: 'Troca de tela de celular',
    title: 'Troca de Tela de Celular em Balneário Camboriú | LK Cell',
    description:
      'Tela trincada, touch falhando ou mancha no display? Troca de tela de iPhone, Samsung, Motorola e Xiaomi na Rua 1400, em BC. Orçamento sem compromisso.',
    display: 'Tela trincada não precisa virar celular novo.',
    h1: 'Troca de tela de celular em Balneário Camboriú',
    intro:
      'Vidro rachado, touch respondendo sozinho, faixa colorida ou mancha preta no display. Na maioria dos casos, trocar a tela resolve, e o resto do aparelho fica do jeito que você deixou.',
    card: 'Vidro trincado, touch falhando, linhas ou manchas na imagem.',
    signsTitle: 'Sinais de que a tela precisa de troca',
    signs: [
      'Vidro trincado ou estilhaçado',
      'Touch falhando ou clicando sozinho',
      'Manchas, linhas ou faixas na imagem',
      'Tela preta com o celular ligado (vibra, toca, mas não mostra nada)',
      'Brilho fraco ou cores estranhas depois de uma queda',
    ],
    sections: [
      {
        h2: 'Como funciona a troca',
        p: 'Você manda o modelo do aparelho e uma foto da tela no WhatsApp. A gente responde com o valor pro seu modelo. Aprovou, é só trazer na loja. Antes de devolver, a tela nova passa por teste de touch, imagem e brilho.',
      },
      {
        h2: 'Compensa trocar ou é melhor comprar outro?',
        p: 'Depende do modelo e do valor da peça. Se o conserto não fizer sentido, a gente fala. E se for hora de trocar de aparelho, a LK também vende celular, inclusive iPhone.',
      },
    ],
    faq: [
      {
        q: 'Quanto custa trocar a tela do celular?',
        a: 'O preço muda bastante de um modelo pro outro, por isso o valor sai no orçamento. Manda o modelo no WhatsApp e você recebe sem compromisso.',
      },
      {
        q: 'Vou perder minhas fotos e conversas?',
        a: 'Não. A troca de tela não apaga nada do aparelho. Mesmo assim, se conseguir, faça um backup antes, vale pra qualquer conserto.',
      },
      {
        q: 'Vocês trocam tela de Android?',
        a: 'Sim. Além de iPhone, a LK atende Samsung, Motorola e Xiaomi.',
      },
      {
        q: 'Quanto tempo demora a troca de tela?',
        a: 'Depende do modelo e de ter a peça na loja. O prazo vem junto com o orçamento, antes de você deixar o aparelho.',
      },
    ],
    wa: 'Oi! Vim pelo site. Preciso de orçamento pra troca de tela. Meu celular é: ',
    image: { src: '/img/teste-tela.webp', alt: 'Técnico da LK Cell testando um celular depois da troca de tela', w: 318, h: 518 },
  },
  {
    slug: 'troca-de-bateria',
    short: 'Troca de bateria',
    serviceType: 'Troca de bateria de celular',
    title: 'Troca de Bateria de Celular em Balneário Camboriú | LK Cell',
    description:
      'Bateria que não dura, celular desligando com carga ou bateria estufada? Troca de bateria de iPhone e Android em Balneário Camboriú. Orçamento no WhatsApp.',
    display: 'Bateria que acaba antes do almoço tem troca.',
    h1: 'Troca de bateria de celular em Balneário Camboriú',
    intro:
      'Toda bateria perde capacidade com o tempo. Quando o celular começa a desligar com 20%, esquentar carregando ou pedir tomada duas vezes por dia, a troca costuma resolver sem você precisar comprar outro aparelho.',
    card: 'Carga que não dura, desligando sozinho, bateria estufada.',
    signsTitle: 'Sinais de bateria no fim',
    signs: [
      'A carga não dura o dia',
      'Desliga sozinho mesmo com carga',
      'Esquenta muito carregando',
      'Tela levantando ou traseira estufada',
      'No iPhone: Saúde da Bateria baixa ou aviso de manutenção',
    ],
    sections: [
      {
        h2: 'Bateria estufada: não espere',
        p: 'Se a tela começou a descolar ou a traseira ficou abaulada, a bateria pode estar inchada. Pare de carregar o aparelho e traga pra avaliação. A bateria estufada força a tela por dentro e o estrago aumenta.',
      },
      {
        h2: 'Como a gente faz',
        p: 'Você manda o modelo no WhatsApp e recebe o valor. Na loja, a bateria antiga sai, a nova entra e o aparelho é testado antes de voltar pra sua mão.',
      },
    ],
    faq: [
      {
        q: 'Como saber se o problema é a bateria ou o carregador?',
        a: 'Se o celular carrega normal mas descarrega rápido, geralmente é bateria. Se ele demora pra carregar ou só carrega com o cabo numa posição, o problema pode estar no conector. Na dúvida, descreve no WhatsApp que a gente ajuda a identificar.',
      },
      {
        q: 'Onde vejo a Saúde da Bateria no iPhone?',
        a: 'Em Ajustes, Bateria, Saúde e Carregamento. O número mostra quanto da capacidade original a bateria ainda tem. Quando ele cai muito, o iPhone pode reduzir o desempenho pra evitar desligamentos.',
      },
      {
        q: 'Quanto custa trocar a bateria?',
        a: 'Varia conforme o modelo. Manda o modelo no WhatsApp e o orçamento sai sem compromisso.',
      },
      {
        q: 'Trocar a bateria apaga meus dados?',
        a: 'Não. Fotos, apps e conversas continuam no aparelho.',
      },
    ],
    wa: 'Oi! Vim pelo site. Quero orçamento pra troca de bateria. Meu celular é: ',
    image: { src: '/img/bancada-reparo.webp', alt: 'Celular aberto na bancada da LK Cell durante a troca de bateria', w: 318, h: 518 },
  },
  {
    slug: 'conector-de-carga',
    short: 'Conector de carga',
    serviceType: 'Conserto de conector de carga de celular',
    title: 'Conector de Carga de Celular em Balneário Camboriú | LK Cell',
    description:
      'Celular só carrega numa posição, cabo frouxo ou carga lenta? Conserto e troca de conector de carga em Balneário Camboriú. iPhone e Android. Fale no WhatsApp.',
    display: 'Só carrega se deixar o cabo torto?',
    h1: 'Conserto de conector de carga em Balneário Camboriú',
    intro:
      'O conector é a porta onde entra o cabo. Ele junta poeira, fiapo de bolso e areia (aqui em BC, bastante) e sofre com cabo puxado de mau jeito. Quando falha, o celular carrega devagar, para de carregar ou só funciona com o cabo segurado num ângulo.',
    card: 'Só carrega numa posição, cabo frouxo, carga lenta.',
    signsTitle: 'Sinais de conector com defeito',
    signs: [
      'Só carrega com o cabo numa posição',
      'Cabo frouxo, sai sozinho',
      'Carga lenta ou que vai e volta',
      'Não reconhece o computador pelo cabo',
      'Aviso de líquido ou de acessório não suportado',
    ],
    sections: [
      {
        h2: 'Às vezes é só sujeira',
        p: 'Nem todo problema no conector pede troca. Muitas vezes tem fiapo ou areia compactada lá dentro. A gente avalia primeiro e diz o que precisa ser feito antes de mexer.',
      },
      {
        h2: 'Não cutuque com alfinete',
        p: 'Objeto de metal dentro da porta pode entortar os contatos ou causar curto. Se o cabo não encaixa direito, desliga o aparelho e traz pra avaliar.',
      },
    ],
    faq: [
      {
        q: 'Meu celular não carrega nada. É o conector?',
        a: 'Pode ser o conector, a bateria, o cabo ou, mais raramente, a placa. Teste primeiro com outro cabo e outra fonte. Se continuar, a avaliação na loja aponta a causa.',
      },
      {
        q: 'Vocês consertam conector USB-C de Android?',
        a: 'Sim. A LK atende iPhone e Android de marcas como Samsung, Motorola e Xiaomi.',
      },
      {
        q: 'Quanto custa o conserto do conector?',
        a: 'Depende do modelo e do que a avaliação encontrar. O valor vem no orçamento, sem compromisso.',
      },
    ],
    wa: 'Oi! Vim pelo site. Meu celular está com problema pra carregar. O modelo é: ',
    image: { src: '/img/bancada-reparo.webp', alt: 'Reparo de conector de carga na bancada da LK Cell', w: 318, h: 518 },
  },
  {
    slug: 'reparo-de-placa',
    short: 'Reparo em placa',
    serviceType: 'Reparo em placa de celular',
    title: 'Reparo em Placa de Celular em Balneário Camboriú | LK Cell',
    description:
      'Celular não liga, reinicia sozinho ou ficou sem sinal? Reparo em placa de iPhone e Android em Balneário Camboriú. Mande o caso pelo WhatsApp.',
    display: 'Não liga, reinicia sozinho, ficou sem sinal.',
    h1: 'Reparo em placa de celular em Balneário Camboriú',
    intro:
      'Quando o defeito não está na tela, na bateria nem no conector, ele costuma estar na placa: a parte eletrônica onde ficam processador, memória, carga e sinal. Reparo em placa é trabalho de bancada, com diagnóstico componente por componente, e muitas vezes evita a troca do aparelho.',
    card: 'Não liga, reinicia sozinho, sem sinal, molhou.',
    signsTitle: 'Defeitos que costumam ser de placa',
    signs: [
      'Não liga ou trava no logo',
      'Reinicia sozinho',
      'Sem sinal, sem Wi-Fi ou sem Bluetooth',
      'Não carrega mesmo com conector e bateria bons',
      'Esquenta parado, sem uso',
      'Parou depois de uma queda ou de molhar',
    ],
    sections: [
      {
        h2: 'Diagnóstico antes do orçamento',
        p: 'Defeito de placa não dá pra cravar só pela descrição. O aparelho passa por avaliação na bancada e você recebe o orçamento com o que foi encontrado. Aí você decide com o número na mão.',
      },
      {
        h2: 'Celular molhou?',
        p: 'Desliga na hora, não coloca pra carregar e não usa secador. Arroz também não resolve. Quanto antes o aparelho chegar na bancada, maior a chance de recuperar.',
      },
    ],
    faq: [
      {
        q: 'Vale a pena consertar a placa do celular?',
        a: 'Depende do defeito e do valor do aparelho. Em modelos mais caros quase sempre compensa avaliar. O orçamento existe pra você decidir sabendo quanto custa.',
      },
      {
        q: 'Consigo recuperar minhas fotos?',
        a: 'Em muitos casos, consertar a placa é o que permite voltar a acessar fotos e conversas. Cada caso é um caso, por isso a avaliação vem primeiro.',
      },
      {
        q: 'Vocês fazem reparo em placa de Android?',
        a: 'Sim. A LK atende iPhone e Android.',
      },
    ],
    wa: 'Oi! Vim pelo site. Meu celular está com defeito (não liga / reinicia / sem sinal). O modelo é: ',
    image: { src: '/img/bancada-reparo.webp', alt: 'Técnico da LK Cell trabalhando na placa de um celular', w: 318, h: 518 },
  },
];

export const celulares = {
  slug: 'celulares',
  short: 'Celulares à venda',
  title: 'iPhone e Celulares à Venda em Balneário Camboriú | LK Cell',
  description:
    'iPhones e smartphones à venda na LK Cell, Rua 1400 em Balneário Camboriú, com opção de celular no boleto. Pergunte no WhatsApp o que tem na vitrine hoje.',
  display: 'O que tem na vitrine hoje?',
  h1: 'iPhone e celulares à venda em Balneário Camboriú',
  intro:
    'Além do conserto, a LK vende smartphones: iPhone de várias gerações e Android como Xiaomi, Redmi e Poco. O estoque gira, então o jeito mais rápido de saber o que tem é perguntar no WhatsApp.',
  signsTitle: 'Na loja',
  signs: ['iPhone de várias gerações', 'Android Xiaomi, Redmi e Poco', 'Opção de compra no boleto', 'Retirada na loja da Rua 1400'],
  sections: [
    {
      h2: 'Celular no boleto',
      p: 'A LK tem opção de compra de celular no boleto. Modelos e condições mudam, então chama no WhatsApp e pergunta como funciona pro aparelho que você quer.',
    },
    {
      h2: 'Veja de perto antes de comprar',
      p: 'Na loja você pega o aparelho na mão, confere o estado e tira dúvida com quem conserta celular todo dia. Ajuda bastante na hora de escolher.',
    },
  ],
  faq: [
    {
      q: 'A LK Cell vende iPhone?',
      a: 'Sim. Tem iPhone na vitrine, e os modelos disponíveis mudam. Pergunte no WhatsApp o que tem hoje.',
    },
    {
      q: 'Dá pra comprar celular no boleto?',
      a: 'Tem opção de celular no boleto. Consulte no WhatsApp os modelos e as condições do momento.',
    },
    {
      q: 'Vocês vendem Android também?',
      a: 'Sim. Além de iPhone, a vitrine costuma ter Xiaomi, Redmi e Poco.',
    },
  ],
  wa: 'Oi! Vim pelo site. Quero saber quais celulares vocês têm à venda hoje. Estou procurando: ',
  image: { src: '/img/vitrine-iphones.webp', alt: 'Vitrine da LK Cell com iPhones e smartphones Xiaomi à venda', w: 312, h: 518 },
};

export const homeFaq = [
  {
    q: 'Onde fica a LK Cell em Balneário Camboriú?',
    a: 'Na Rua 1400, 386, Box 308, em Balneário Camboriú (SC). Antes de vir, se quiser, chama no WhatsApp (47) 99785-6226.',
  },
  {
    q: 'Vocês consertam só iPhone?',
    a: 'Não. A LK é especializada em iPhone e também atende Samsung, Motorola e Xiaomi.',
  },
  {
    q: 'O orçamento é cobrado?',
    a: 'O orçamento pelo WhatsApp é sem compromisso. Manda o modelo e o problema, de preferência com uma foto.',
  },
  {
    q: 'Quais serviços a LK faz?',
    a: 'Troca de tela, troca de bateria, conserto de conector de carga e reparo em placa. A loja também vende iPhone e outros smartphones, com opção no boleto.',
  },
  {
    q: 'Quanto tempo leva um conserto?',
    a: 'Depende do serviço, do modelo e de ter a peça em loja. O prazo vem junto com o orçamento.',
  },
];
