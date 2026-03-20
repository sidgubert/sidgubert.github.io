/* ── script.js ─────────────────────────────────────────────────────────── */

/* ── 1. NAV: scroll effect + mobile burger ─────────────────────────────── */
const nav    = document.getElementById('nav');
const burger = document.getElementById('burger');
const links  = document.querySelector('.nav__links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

burger.addEventListener('click', () => {
  links.classList.toggle('open');
  const isOpen = links.classList.contains('open');
  burger.querySelectorAll('span').forEach((s, i) => {
    s.style.transform = isOpen
      ? i === 0 ? 'translateY(7px) rotate(45deg)'
      : i === 1 ? 'scaleX(0)'
      : 'translateY(-7px) rotate(-45deg)'
      : '';
    s.style.opacity = isOpen && i === 1 ? '0' : '';
  });
});

// Fecha menu ao clicar em link
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    links.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  });
});

/* ── 2. SCROLL REVEAL ───────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── 3. SKILL BARS: anima largura ao entrar na tela ────────────────────── */
const barData = [85, 75, 90, 70]; // frontend, ui, dados, back

document.querySelectorAll('.stack__card').forEach((card, i) => {
  const bar = card.querySelector('.card__bar span');
  if (bar) bar.style.setProperty('--w', barData[i] + '%');
});

/* ── 4. ACTIVE NAV LINK por seção ──────────────────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));

/* Estilo do link ativo (injetado via JS para manter CSS limpo) */
const activeStyle = document.createElement('style');
activeStyle.textContent = `.nav__links a.active { color: var(--accent); }
.nav__links a.active::after { width: 100%; }`;
document.head.appendChild(activeStyle);

/* ── 5. TYPING EFFECT no hero ──────────────────────────────────────────── */
const roles = [
  'Frontend Developer',
  'React & Next.js',
  'Analista de Dados',
  'TypeScript & Tailwind',
];
let roleIdx = 0, charIdx = 0, deleting = false;
const roleTarget = document.querySelector('.hero__role .highlight:first-child');

if (roleTarget) {
  // Salva o texto original e cria cursor
  const originalText = 'Frontend';
  roleTarget.style.display = 'inline-block';
  const cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.cssText = 'animation:blink .7s step-end infinite;color:var(--accent);';
  const blinkStyle = document.createElement('style');
  blinkStyle.textContent = '@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}';
  document.head.appendChild(blinkStyle);
  roleTarget.after(cursor);

  function typeRole() {
    const current = roles[roleIdx];
    if (!deleting) {
      roleTarget.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeRole, 1800);
        return;
      }
    } else {
      roleTarget.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(typeRole, deleting ? 55 : 90);
  }

  setTimeout(typeRole, 1400);
}

/* ── 6. CONTADOR de anos de experiência ────────────────────────────────── */
function animateCount(el, target, duration = 1500) {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(progress * target) + '+';
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const badgeEl = document.querySelector('.avatar-badge');
if (badgeEl) {
  const badgeObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      badgeObs.disconnect();
      // já está estático no HTML, só garante visibilidade
    }
  });
  badgeObs.observe(badgeEl);
}

/* ── 7. FORMULÁRIO DE CONTATO ───────────────────────────────────────────── */
const form       = document.getElementById('form');
const submitBtn  = document.getElementById('submit-btn');
const formSuccess = document.getElementById('form-success');

function validateField(input) {
  const field = input.closest('.field');
  const value = input.value.trim();
  let valid = true;

  if (input.hasAttribute('required') && !value) {
    valid = false;
  }
  if (input.type === 'email' && value) {
    valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  field.classList.toggle('has-error', !valid);
  input.classList.toggle('error', !valid);
  return valid;
}

// Validação em tempo real
form.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('blur', () => validateField(input));
  input.addEventListener('input', () => {
    if (input.classList.contains('error')) validateField(input);
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let allValid = true;
  form.querySelectorAll('input[required], textarea[required]').forEach(input => {
    if (!validateField(input)) allValid = false;
  });

  if (!allValid) return;

  // Simula envio
  const btnText = submitBtn.querySelector('.btn-text');
  const btnIcon = submitBtn.querySelector('.btn-icon');

  submitBtn.disabled = true;
  btnText.textContent = 'Enviando...';
  btnIcon.style.animation = 'spin-icon .6s linear infinite';

  const spinStyle = document.createElement('style');
  spinStyle.textContent = '@keyframes spin-icon{to{transform:rotate(360deg)}}';
  document.head.appendChild(spinStyle);

  await new Promise(r => setTimeout(r, 1500));

  form.style.opacity = '0';
  form.style.transform = 'translateY(8px)';
  form.style.transition = 'all .3s ease';

  setTimeout(() => {
    form.style.display = 'none';
    formSuccess.classList.add('show');
    formSuccess.style.display = 'flex';
    formSuccess.style.opacity = '0';
    formSuccess.style.transition = 'opacity .4s ease';
    setTimeout(() => formSuccess.style.opacity = '1', 50);
  }, 300);
});

/* ── 8. SMOOTH SCROLL com offset para nav fixo ─────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


