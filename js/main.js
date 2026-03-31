// main.js — entry point for the portfolio

const toggle = document.querySelector('.navbar__toggle');
const menu   = document.querySelector('.navbar__menu');

function closeMenu() {
  toggle.classList.remove('is-open');
  menu.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}

toggle.addEventListener('click', () => {
  const open = toggle.classList.toggle('is-open');
  menu.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
});

// Close menu when a link is tapped
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close menu with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('is-open')) {
    closeMenu();
    toggle.focus();
  }
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-toggle__icon');

function getPreferredTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label',
    theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'
  );
  localStorage.setItem('theme', theme);
}

applyTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Fade-in sections on scroll
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Contact form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const fields = [
    { id: 'contact-name', message: 'Veuillez entrer votre nom.' },
    { id: 'contact-email', message: 'Veuillez entrer une adresse email valide.' },
    { id: 'contact-message', message: 'Veuillez entrer votre message.' }
  ];

  function validateField(field) {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.id + '-error');
    const valid = input.checkValidity();
    input.setAttribute('aria-invalid', String(!valid));
    error.textContent = valid ? '' : field.message;
    return valid;
  }

  fields.forEach(field => {
    const input = document.getElementById(field.id);
    input.addEventListener('blur', () => validateField(field));
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = fields.map(f => validateField(f)).every(Boolean);
    if (!allValid) {
      const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    const success = contactForm.querySelector('.contact-form__success');
    success.textContent = 'Message envoyé avec succès !';
    success.hidden = false;
    contactForm.reset();
    fields.forEach(f => {
      document.getElementById(f.id).removeAttribute('aria-invalid');
      document.getElementById(f.id + '-error').textContent = '';
    });
  });
}
