tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef7f0', 100: '#fdeee0', 200: '#fbd9c0', 300: '#f7bf95',
          400: '#f29d5e', 500: '#ee7b2e', 600: '#e0601a', 700: '#ba4815',
          800: '#943a18', 900: '#783217',
        },
        warm: {
          50: '#faf8f5', 100: '#f5f0e8', 200: '#e8dfd0', 300: '#d6c8b0',
          400: '#c2ab8a', 500: '#b08f68', 600: '#9a7650', 700: '#7f5f40',
          800: '#684e36', 900: '#56412f',
        },
        ink: {
          50: '#f6f6f6', 100: '#e7e7e7', 200: '#d1d1d1', 300: '#b0b0b0',
          400: '#888888', 500: '#6d6d6d', 600: '#5d5d5d', 700: '#4f4f4f',
          800: '#454545', 900: '#1a1a1a',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      }
    }
  }
};

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
