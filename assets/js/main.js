/* ============================================================
   Claudenice Bezerra — site institucional
   ============================================================ */

/* ------------------------------------------------------------
   1. CONTATO  —  EDITE AQUI
   ------------------------------------------------------------
   Para ativar o WhatsApp, coloque o número entre as aspas no
   formato internacional, sem espaços, sinais ou parênteses:
   55 (Brasil) + DDD + número.  Ex.: "5598999999999"
   Enquanto estiver vazio, todos os botões abrem o e-mail.
------------------------------------------------------------ */
const CONTATO = {
  whatsapp: '559888585667',
  email: 'Claudeniceboliveira@gmail.com',
  nome: 'Claudenice Bezerra'
};
/* Se o link abrir conversa errada ou "número inválido", troque por
   '5598988585667' (com o 9 na frente) — é a outra forma aceita pelo WhatsApp. */

const MENSAGENS = {
  agendar:   'Olá, Claudenice! Vim pelo site e gostaria de agendar um atendimento.',
  avaliacao: 'Olá, Claudenice! Vim pelo site e gostaria de informações sobre a avaliação neuropsicológica.',
  tea:       'Olá, Claudenice! Vim pelo site e gostaria de conversar sobre um atendimento voltado ao TEA.',
  palestra:  'Olá, Claudenice! Vim pelo site e gostaria de uma proposta de palestra ou curso.',
  domicilio: 'Olá, Claudenice! Vim pelo site e gostaria de saber sobre o atendimento a domicílio.'
};

const ASSUNTOS = {
  agendar:   'Agendamento de atendimento',
  avaliacao: 'Avaliação neuropsicológica',
  tea:       'Atendimento em autismo (TEA)',
  palestra:  'Palestra ou curso',
  domicilio: 'Atendimento a domicílio'
};

const temWhats = () => /^\d{12,13}$/.test(CONTATO.whatsapp.trim());

function linkContato(chave, corpoExtra) {
  const texto = corpoExtra || MENSAGENS[chave] || MENSAGENS.agendar;
  if (temWhats()) {
    return 'https://wa.me/' + CONTATO.whatsapp.trim() + '?text=' + encodeURIComponent(texto);
  }
  const assunto = ASSUNTOS[chave] || ASSUNTOS.agendar;
  return 'mailto:' + CONTATO.email +
         '?subject=' + encodeURIComponent(assunto) +
         '&body=' + encodeURIComponent(texto);
}

/* aplica os links em todo elemento com data-contato */
document.querySelectorAll('[data-contato]').forEach((el) => {
  const chave = el.dataset.contato;
  el.setAttribute('href', linkContato(chave));
  if (temWhats()) {
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  }
});

/* o botão flutuante e a nota do formulário mudam de rótulo */
if (temWhats()) {
  const flut = document.querySelector('.float-cta span');
  if (flut) flut.textContent = 'WhatsApp';
  const nota = document.getElementById('formNota');
  if (nota) nota.textContent = 'Abre o WhatsApp com a mensagem pronta.';
}

/* ------------------------------------------------------------
   2. Menu
------------------------------------------------------------ */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');

function fecharMenu() {
  nav.classList.remove('is-aberto');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Abrir menu');
}

navToggle.addEventListener('click', () => {
  const aberto = nav.classList.toggle('is-aberto');
  navToggle.setAttribute('aria-expanded', String(aberto));
  navToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});

nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', fecharMenu));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('is-aberto')) {
    fecharMenu();
    navToggle.focus();
  }
});

/* ------------------------------------------------------------
   3. Header com sombra ao rolar + botão flutuante
------------------------------------------------------------ */
const header = document.querySelector('.site-header');
const floatAcoes = document.querySelector('.float-acoes');
const contato = document.getElementById('contato');

function aoRolar() {
  const y = window.scrollY;
  header.classList.toggle('is-stuck', y > 8);

  if (floatAcoes) {
    const contatoVisivel = contato
      ? contato.getBoundingClientRect().top < window.innerHeight * 0.9
      : false;
    floatAcoes.classList.toggle('is-visivel', y > 620 && !contatoVisivel);
  }
}

window.addEventListener('scroll', aoRolar, { passive: true });
aoRolar();

/* ------------------------------------------------------------
   4. Revelação por scroll
------------------------------------------------------------ */
const alvos = document.querySelectorAll('[data-reveal]');
const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (semMovimento || !('IntersectionObserver' in window)) {
  alvos.forEach((el) => el.classList.add('is-visivel'));
} else {
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada, i) => {
      if (!entrada.isIntersecting) return;
      const atraso = Math.min(i * 70, 280);
      setTimeout(() => entrada.target.classList.add('is-visivel'), atraso);
      obs.unobserve(entrada.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  alvos.forEach((el) => obs.observe(el));
}

/* ------------------------------------------------------------
   5. Mapa das funções cognitivas
------------------------------------------------------------ */
const FUNCOES = {
  atencao: {
    titulo: 'Atenção',
    texto: 'Sustentar o foco, dividir a atenção entre duas tarefas e retomar o que se estava fazendo depois de uma interrupção. É o que mais aparece nas queixas de escola e de trabalho.'
  },
  memoria: {
    titulo: 'Memória',
    texto: 'Registrar, guardar e recuperar informações — do recado dado há cinco minutos ao conteúdo estudado na semana passada. Avaliamos memória verbal, visual e de trabalho.'
  },
  linguagem: {
    titulo: 'Linguagem',
    texto: 'Compreender o que se ouve e se lê, encontrar as palavras, organizar a fala e acompanhar uma conversa. Em crianças, está diretamente ligada à alfabetização.'
  },
  aprendizagem: {
    titulo: 'Aprendizagem',
    texto: 'Como a pessoa adquire e aplica conhecimento novo: leitura, escrita, cálculo e as estratégias que ela já usa — muitas vezes sem perceber — para dar conta das tarefas.'
  },
  executivas: {
    titulo: 'Funções executivas',
    texto: 'Planejar, organizar, iniciar uma tarefa, inibir impulsos e mudar de estratégia quando a primeira não funciona. É o maestro que rege todas as outras funções.'
  }
};

const nos = document.querySelectorAll('.mapa-node');
const mapaTitulo = document.getElementById('mapaTitulo');
const mapaTexto = document.getElementById('mapaTexto');

function selecionarFuncao(no) {
  const dados = FUNCOES[no.dataset.funcao];
  if (!dados) return;
  nos.forEach((n) => {
    const ativo = n === no;
    n.classList.toggle('is-ativo', ativo);
    n.setAttribute('aria-pressed', String(ativo));
  });
  mapaTitulo.textContent = dados.titulo;
  mapaTexto.textContent = dados.texto;
}

nos.forEach((no) => {
  no.setAttribute('aria-pressed', 'false');
  no.addEventListener('click', () => selecionarFuncao(no));
  no.addEventListener('mouseenter', () => selecionarFuncao(no));
  no.addEventListener('focus', () => selecionarFuncao(no));
  no.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selecionarFuncao(no);
    }
  });
});

if (nos.length) selecionarFuncao(nos[0]);

/* ------------------------------------------------------------
   6. Formulário — monta a mensagem e abre WhatsApp ou e-mail
------------------------------------------------------------ */
const form = document.getElementById('formContato');

function mostrarErro(campo, mensagem) {
  limparErro(campo);
  campo.setAttribute('aria-invalid', 'true');
  const aviso = document.createElement('span');
  aviso.className = 'erro';
  aviso.textContent = mensagem;
  campo.parentElement.appendChild(aviso);
}

function limparErro(campo) {
  campo.removeAttribute('aria-invalid');
  const antigo = campo.parentElement.querySelector('.erro');
  if (antigo) antigo.remove();
}

if (form) {
  const nome = form.querySelector('#nome');
  const assunto = form.querySelector('#assunto');
  const mensagem = form.querySelector('#mensagem');

  [nome, mensagem].forEach((c) => c.addEventListener('input', () => limparErro(c)));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valido = true;

    if (!nome.value.trim()) {
      mostrarErro(nome, 'Me diga como você se chama.');
      valido = false;
    }
    if (mensagem.value.trim().length < 5) {
      mostrarErro(mensagem, 'Escreva um pouco mais para eu entender sua necessidade.');
      valido = false;
    }
    if (!valido) {
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    const corpo =
      'Olá, Claudenice! Vim pelo site.\n\n' +
      'Nome: ' + nome.value.trim() + '\n' +
      'Assunto: ' + assunto.value + '\n\n' +
      mensagem.value.trim();

    if (temWhats()) {
      window.open('https://wa.me/' + CONTATO.whatsapp.trim() + '?text=' + encodeURIComponent(corpo), '_blank', 'noopener');
    } else {
      window.location.href =
        'mailto:' + CONTATO.email +
        '?subject=' + encodeURIComponent('Site — ' + assunto.value) +
        '&body=' + encodeURIComponent(corpo);
    }
  });
}

/* ------------------------------------------------------------
   7. Acordeão: só uma pergunta aberta por vez
------------------------------------------------------------ */
const perguntas = document.querySelectorAll('.faq-item');
perguntas.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    perguntas.forEach((outra) => {
      if (outra !== item) outra.open = false;
    });
  });
});

/* ------------------------------------------------------------
   8. Ano atual no rodapé (se houver marcador)
------------------------------------------------------------ */
const ano = document.getElementById('ano');
if (ano) ano.textContent = new Date().getFullYear();
