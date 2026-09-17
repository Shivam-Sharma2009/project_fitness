// ============================================================
//  SPORTFIT — APP UTILITIES
//  Shared: scroll reveal, navbar scroll, toast, counter, tilt
// ============================================================

// ── Scroll Reveal ──
export function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
}

// ── Navbar: blur on scroll ──
export function initNavbarScroll() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── Active nav link ──
export function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'home.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'home.html')) {
      a.classList.add('active');
    }
  });
}

// ── Hamburger menu ──
export function initHamburger() {
  const btn  = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav-links');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    // animate hamburger to X
    const [s1, s2, s3] = btn.querySelectorAll('span');
    if (open) {
      s1.style.transform = 'translateY(7px) rotate(45deg)';
      s2.style.opacity   = '0';
      s3.style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      [s1, s2, s3].forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

// ── Toast notification ──
export function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.innerHTML = `${icons[type] || ''} ${message}`;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 4200);
}

// ── Animated counter ──
export function animateCounter(el, target, duration = 1800, suffix = '') {
  const start = Date.now();
  const startVal = 0;

  const tick = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * eased);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

// ── Init all counters when visible ──
export function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el     = e.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, 1800, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ── 3D Tilt on cards ──
export function initTilt(selector = '.tilt-card') {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) translateZ(8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ── Particles background ──
export function initParticles(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const PARTICLE_COUNT = 45;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      border-radius: 50%;
      background: ${Math.random() > 0.5 ? 'rgba(26,111,255,0.5)' : 'rgba(0,245,147,0.4)'};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 8 + 5}s linear infinite;
      animation-delay: -${Math.random() * 8}s;
      pointer-events: none;
    `;
    container.appendChild(p);
  }
}

// ── Typewriter effect ──
export function typewriter(el, words, speed = 90, pause = 2000) {
  let wi = 0, ci = 0, deleting = false;

  const tick = () => {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

    let delay = deleting ? speed / 2 : speed;

    if (!deleting && ci > word.length) {
      deleting = true;
      delay = pause;
    } else if (deleting && ci < 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
      ci = 0;
      delay = 400;
    }
    setTimeout(tick, delay);
  };
  tick();
}

// ── Init all common features ──
export function initApp() {
  initScrollReveal();
  initNavbarScroll();
  setActiveNavLink();
  initHamburger();
  initCounters();
}
