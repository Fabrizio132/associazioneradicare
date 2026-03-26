// ============================================================
// main.js — Associazione Radicare
// ============================================================

// ── Mobile navbar toggle ──────────────────────────────────
const toggle = document.getElementById('nav-toggle');
const nav    = document.getElementById('main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Chiudi menu' : 'Apri menu');
  });

  // Chiudi il menu se si clicca fuori
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── Navbar: trasparente → solida allo scroll ──────────────
const navbar  = document.querySelector('.navbar');
const hasHero = document.body.classList.contains('has-hero');

if (navbar) {
  const onScroll = () => {
    // Su pagine senza hero: sempre solida
    // Su homepage: trasparente finché non si scrolla oltre 60px
    if (!hasHero || window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // applica subito al caricamento
}

// ── Animazione entrata elementi ──────────────────────────
// Usa IntersectionObserver per fade-in leggero sulle card
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(card);
});
