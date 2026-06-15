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
  const setMenuOpen = (open) => {
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuBtn.addEventListener('click', () => setMenuOpen(true));
  closeMenu.addEventListener('click', () => setMenuOpen(false));
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
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

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const submitBtn = document.getElementById('contact-submit-btn');
    const formMessage = document.getElementById('contact-form-message');
    const koraConfig = window.KORA_CONFIG || {};
    const recaptchaSiteKey = (koraConfig.recaptchaSiteKey || '').trim();

    if (!recaptchaSiteKey) {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
      }
      if (formMessage) {
        formMessage.innerHTML = '<p class="text-ink-500 text-sm">This form is temporarily unavailable.</p>';
      }
    } else {
      let recaptchaLoaded = false;
      let recaptchaWidgetId;
      const recaptchaContainer = document.getElementById('recaptcha-container');

      const renderRecaptcha = () => {
        if (recaptchaWidgetId !== undefined) {
            grecaptcha.reset(recaptchaWidgetId);
            return;
        }
        if (typeof grecaptcha !== 'undefined' && grecaptcha.render && recaptchaContainer) {
            recaptchaWidgetId = grecaptcha.render(recaptchaContainer, {
                'sitekey': recaptchaSiteKey
            });
        }
      };

      const loadRecaptcha = () => {
        if (recaptchaLoaded) {
            if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
              renderRecaptcha();
            }
            return;
        }
        if (document.querySelector('script[src^="https://www.google.com/recaptcha/api.js"]')) {
            recaptchaLoaded = true;
            if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
                renderRecaptcha();
            } else {
                const oldOnload = window.onRecaptchaLoad;
                window.onRecaptchaLoad = () => {
                    if(oldOnload) oldOnload();
                    renderRecaptcha();
                };
            }
            return;
        }
        window.onRecaptchaLoad = renderRecaptcha;
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        recaptchaLoaded = true;
      };

      contactForm.addEventListener('focusin', loadRecaptcha, { once: true });

      contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (submitBtn.disabled) return;

        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const phoneInput = document.getElementById('contact-phone');
        const messageInput = document.getElementById('contact-message');

        formMessage.textContent = '';
        formMessage.className = 'mt-4 text-center text-sm';

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
          formMessage.textContent = 'Please fill out all required fields.';
          formMessage.classList.add('text-red-500');
          return;
        }

        if (typeof grecaptcha === 'undefined' || typeof grecaptcha.getResponse === 'undefined' || recaptchaWidgetId === undefined) {
            formMessage.textContent = 'Security check is loading, please try again in a moment.';
            formMessage.classList.add('text-yellow-600');
            loadRecaptcha();
            return;
        }

        const captchaToken = grecaptcha.getResponse(recaptchaWidgetId);
        if (!captchaToken) {
            formMessage.textContent = 'Please complete the reCAPTCHA security check.';
            formMessage.classList.add('text-red-500');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Submitting...';

        try {
          const response = await fetch(`${koraConfig.apiBaseUrl}/api/v1/public/forms/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              business_id: koraConfig.businessId,
              form_type: 'contact',
              form_data: { 
                name, 
                email, 
                phone: phoneInput.value.trim(), 
                message 
              },
              submitter_email: email,
              captcha_token: captchaToken,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: 'Something went wrong. Please try again.' }));
            throw new Error(errorData.detail);
          }

          formMessage.textContent = 'Thank you for your message. We will get back to you shortly.';
          formMessage.classList.add('text-green-600');
          contactForm.reset();
          grecaptcha.reset(recaptchaWidgetId);

        } catch (error) {
          formMessage.textContent = error.message || 'An error occurred. Please try again later.';
          formMessage.classList.add('text-red-500');
          grecaptcha.reset(recaptchaWidgetId);
        } finally {
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = 'Submit Message';
        }
      });
    }
  }
});
