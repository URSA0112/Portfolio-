// ============================================
//  MAIN.JS — Portfolio interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Loader ──────────────────────────────────
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 1200);
  });

  // ── Custom Cursor ────────────────────────────
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let fx = 0, fy = 0, lx = 0, ly = 0;

  document.addEventListener('mousemove', (e) => {
    fx = e.clientX; fy = e.clientY;
    cursor.style.left = fx + 'px';
    cursor.style.top = fy + 'px';
  });

  function animateFollower() {
    lx += (fx - lx) * 0.12;
    ly += (fy - ly) * 0.12;
    follower.style.left = lx + 'px';
    follower.style.top = ly + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .project-card, .skill-tag, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovered'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
  });

  // ── Navbar ───────────────────────────────────
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNav();
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Active nav link on scroll
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    });
  }

  // ── Hero counter animation ───────────────────
  function animateCounter(el, target, duration = 1500) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.floor(start) + (target >= 10 ? '+' : '');
    }, 16);
  }

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-num').forEach(el => {
          animateCounter(el, parseInt(el.dataset.count));
        });
        heroObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) heroObserver.observe(heroStats);

  // ── Reveal on scroll ─────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── Skill bars ───────────────────────────────
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        barObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const skillBars = document.querySelector('.skill-bars');
  if (skillBars) barObserver.observe(skillBars);

  // ── Project filter ───────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
        if (match) { card.style.animation = 'none'; card.offsetHeight; card.style.animation = ''; }
      });
    });
  });

  // ── 3D card tilt (about) ─────────────────────
  const card3d = document.getElementById('about-card');
  if (card3d) {
    card3d.addEventListener('mousemove', (e) => {
      const rect = card3d.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / rect.height) * 20;
      const ry = -((e.clientX - cx) / rect.width) * 20;
      card3d.querySelector('.card-face').style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card3d.addEventListener('mouseleave', () => {
      card3d.querySelector('.card-face').style.transform = 'rotateX(0) rotateY(0)';
    });
  }

  // ── Contact form ─────────────────────────────
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.submit-btn');
      const original = btn.innerHTML;
      btn.innerHTML = '<span>Message Sent!</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; form.reset(); }, 3000);
    });
  }

  // ── Smooth anchor scrolling ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Typed name effect ─────────────────────────
  const nameEl = document.getElementById('typed-name');
  if (nameEl) {
    const texts = ['URSA0112', 'Developer', 'Creator', 'Builder'];
    let idx = 0, charIdx = 0, deleting = false;
    function typeLoop() {
      const current = texts[idx];
      if (deleting) {
        nameEl.textContent = current.slice(0, charIdx--);
        if (charIdx < 0) { deleting = false; idx = (idx + 1) % texts.length; charIdx = 0; setTimeout(typeLoop, 500); return; }
      } else {
        nameEl.textContent = current.slice(0, charIdx++);
        if (charIdx > current.length) { deleting = true; setTimeout(typeLoop, 2000); return; }
      }
      setTimeout(typeLoop, deleting ? 60 : 100);
    }
    setTimeout(typeLoop, 1800);
  }

});
