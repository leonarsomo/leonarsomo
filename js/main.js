// ===== Menú móvil =====
const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__menu');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// Cierra el menú al hacer clic en un enlace (móvil)
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Año dinámico en el footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Botón "volver arriba" =====
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('show', window.scrollY > 500);
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== Animaciones al hacer scroll (reveal) =====
const revealEls = document.querySelectorAll('.card, .level, .feature, .news, .gallery figure, .section__head');
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => io.observe(el));

// ===== Contador animado de estadísticas =====
const counters = document.querySelectorAll('.stat strong[data-count]');
const animateCount = (el) => {
  const target = +el.dataset.count;
  const duration = 1500;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target).toLocaleString('es-CO') + (progress === 1 ? '+' : '');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

counters.forEach(c => statObserver.observe(c));

// ===== Formulario de contacto (validación front-end) =====
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!nombre || !mensaje || !emailOk) {
    status.textContent = 'Por favor completa tu nombre, un correo válido y tu mensaje.';
    status.className = 'form__status err';
    return;
  }

  status.textContent = `¡Gracias, ${nombre}! Hemos recibido tu mensaje y te responderemos pronto.`;
  status.className = 'form__status ok';
  form.reset();
});
