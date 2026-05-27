document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const closeMenu = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
  closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  // Scroll reveal observer
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children').forEach(el => {
    observer.observe(el);
  });

  // Hero parallax
  const heroImg = document.getElementById('heroImg');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroImg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
    }
  });

  // Menu page category tabs
  document.querySelectorAll('.menu-cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.cat;
      // Update tabs
      document.querySelectorAll('.menu-cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // Update sections
      document.querySelectorAll('.menu-cat-section').forEach(s => s.classList.remove('active'));
      document.querySelector(`.menu-cat-section[data-section="${cat}"]`).classList.add('active');
    });
  });

  const contactForm = document.querySelector('.contact-form');
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you for your message. We will get back to you shortly.');
  });
});
