document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;

  /* ---------- Tema claro/escuro ---------- */
  const btnTema = document.getElementById('btn-tema');
  const sol = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const lua = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  const temaInicial = () =>
    localStorage.getItem('sg-tema') ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro');

  function aplicarTema(tema) {
    html.setAttribute('data-tema', tema);
    btnTema.innerHTML = tema === 'escuro' ? sol : lua;
    btnTema.setAttribute('aria-label', tema === 'escuro' ? 'Ativar tema claro' : 'Ativar tema escuro');
    localStorage.setItem('sg-tema', tema);
  }
  aplicarTema(temaInicial());
  btnTema.addEventListener('click', () =>
    aplicarTema(html.getAttribute('data-tema') === 'claro' ? 'escuro' : 'claro'));

  /* ---------- Menu mobile ---------- */
  const burger = document.getElementById('btn-menu');
  const menu = document.getElementById('menu-mobile');
  const alternarMenu = (forcar) => {
    const aberto = menu.classList.toggle('open', forcar);
    burger.setAttribute('aria-expanded', String(aberto));
  };
  burger.addEventListener('click', () => alternarMenu());
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => alternarMenu(false)));

  /* ---------- Sombra da navbar ao rolar ---------- */
  const nav = document.getElementById('nav');
  const aoRolar = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });

  /* ---------- Revelar ao rolar ---------- */
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));

  /* ---------- Formulário: valida e abre o cliente de e-mail ---------- */
  const form = document.getElementById('form-contato');
  const aviso = document.getElementById('form-aviso');
  const regras = {
    nome: (v) => (v.trim().length >= 3 ? '' : 'Digite seu nome (mínimo 3 letras).'),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Informe um e-mail válido.'),
    mensagem: (v) => (v.trim().length >= 10 ? '' : 'Escreva uma mensagem um pouco maior.'),
  };

  function validar(campo) {
    const erro = regras[campo.name](campo.value);
    const wrap = campo.closest('.field');
    wrap.classList.toggle('is-invalid', Boolean(erro));
    wrap.querySelector('.err').textContent = erro;
    return !erro;
  }

  const campos = [...form.querySelectorAll('input, textarea')];
  campos.forEach((c) => c.addEventListener('blur', () => validar(c)));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = campos.map(validar).every(Boolean);
    if (!ok) return;
    const d = Object.fromEntries(new FormData(form));
    const assunto = encodeURIComponent(`Contato pelo portfólio — ${d.nome}`);
    const corpo = encodeURIComponent(`${d.mensagem}\n\n— ${d.nome} (${d.email})`);
    window.location.href = `mailto:sidgubert@gmail.com?subject=${assunto}&body=${corpo}`;
    aviso.hidden = false;
    form.reset();
    setTimeout(() => (aviso.hidden = true), 6000);
  });
});
