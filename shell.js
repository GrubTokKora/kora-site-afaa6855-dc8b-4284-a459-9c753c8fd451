(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     SHELL CSS
  ───────────────────────────────────────────── */
  var SHELL_CSS = `
    /* ── Navbar ── */
    #navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 50;
      background: transparent;
      transition: background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease;
    }
    #navbar.navbar-scrolled {
      background: rgba(255,255,255,0.97) !important;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 2px 16px rgba(0,0,0,0.10);
    }
    #navbar.navbar-scrolled .nav-link,
    #navbar.navbar-scrolled nav a,
    #navbar.navbar-scrolled .nav-brand {
      color: #1a1a1a !important;
    }
    #navbar.navbar-scrolled .nav-link:hover,
    #navbar.navbar-scrolled nav a:hover {
      color: #696969 !important;
    }
    #navbar.navbar-scrolled .desktop-phone {
      color: #1a1a1a !important;
    }
    #navbar.navbar-scrolled .desktop-phone:hover {
      color: #696969 !important;
    }
    #navbar.navbar-scrolled #menuBtn .bar1,
    #navbar.navbar-scrolled #menuBtn .bar2,
    #navbar.navbar-scrolled #menuBtn .bar3 {
      background: #1a1a1a;
    }

    /* Nav links – underline hover */
    .nav-link {
      position: relative;
      padding-bottom: 2px;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px; left: 0;
      width: 0; height: 1.5px;
      background: currentColor;
      transition: width 0.25s ease;
    }
    .nav-link:hover::after { width: 100%; }

    /* Mobile backdrop */
    #mobileMenuBackdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.55);
      z-index: 59;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s ease;
    }
    #mobileMenuBackdrop.open {
      opacity: 1;
      pointer-events: auto;
    }

    /* Mobile drawer */
    #mobileMenuWrapper {
      position: fixed;
      top: 0; right: 0;
      width: min(320px, 85vw);
      height: 100%;
      z-index: 60;
      transform: translateX(100%);
      transition: transform 0.38s cubic-bezier(0.16,1,0.3,1);
      will-change: transform;
      pointer-events: none;
    }
    #mobileMenuWrapper.open {
      transform: translateX(0);
      pointer-events: auto;
    }
    #mobileMenu {
      pointer-events: auto;
      height: 100%;
      background: #fff;
      display: flex;
      flex-direction: column;
    }

    /* Mobile nav links */
    #mobileMenu nav a {
      display: flex;
      align-items: center;
      min-height: 48px;
      padding: 0.5rem 0;
      border-bottom: 1px solid #f0f0f0;
      font-size: 1rem;
      font-weight: 600;
      color: #1a1a1a;
      text-decoration: none;
      transition: color 0.2s, padding-left 0.2s;
      pointer-events: auto;
      cursor: pointer;
      position: relative;
      z-index: 1;
    }
    #mobileMenu nav a:last-child { border-bottom: none; }
    #mobileMenu nav a:hover,
    #mobileMenu nav a:focus {
      color: #696969;
      padding-left: 6px;
      outline: none;
    }
    #mobileMenu nav a:focus-visible {
      outline: 2px solid #696969;
      outline-offset: 2px;
      border-radius: 4px;
    }

    /* Hamburger animation */
    #menuBtn .bar1, #menuBtn .bar2, #menuBtn .bar3 {
      display: block;
      width: 22px; height: 2px;
      background: white;
      border-radius: 2px;
      transition: transform 0.3s ease, opacity 0.3s ease;
      transform-origin: center;
    }
    #menuBtn .bar2 { margin: 5px 0; }
    #menuBtn.is-open .bar1 { transform: translateY(7px) rotate(45deg); }
    #menuBtn.is-open .bar2 { opacity: 0; transform: scaleX(0); }
    #menuBtn.is-open .bar3 { transform: translateY(-7px) rotate(-45deg); }

    /* Desktop nav – hide on small, show on lg */
    @media (max-width: 1023px) {
      .desktop-nav { display: none !important; }
      .desktop-phone { display: none !important; }
    }
    @media (min-width: 1024px) {
      #menuBtn { display: none !important; }
    }

    /* ── Footer ── */
    #site-footer-el {
      background: #0d0d0d;
      color: rgba(255,255,255,0.7);
      font-family: 'Roboto', sans-serif;
    }
    #site-footer-el a {
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      transition: color 0.2s;
    }
    #site-footer-el a:hover { color: #fff; }
    #site-footer-el .footer-divider {
      border: none;
      border-top: 1px solid rgba(255,255,255,0.1);
      margin: 2rem 0;
    }
    #site-footer-el .footer-logo {
      width: 48px; height: 48px;
      border-radius: 12px;
      object-fit: cover;
    }
    #site-footer-el .footer-social-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px; height: 38px;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.05);
      color: rgba(255,255,255,0.7);
      transition: background 0.2s, border-color 0.2s, color 0.2s;
    }
    #site-footer-el .footer-social-link:hover {
      background: rgba(255,255,255,0.12);
      border-color: rgba(255,255,255,0.35);
      color: #fff;
    }
  `;

  /* ─────────────────────────────────────────────
     HEADER HTML
  ───────────────────────────────────────────── */
  var HEADER_HTML = `
    <nav id="navbar" aria-label="Main navigation">
      <div style="max-width:1152px;margin:0 auto;padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;height:72px;">
        <!-- Logo -->
        <a href="index.html" style="display:flex;align-items:center;gap:0.75rem;text-decoration:none;flex-shrink:0;">
          <img src="https://quseprdus1.blob.core.windows.net/kora-business-images/social-media/afaa6855-dc8b-4284-a459-9c753c8fd451/medialibrary/1781674810_rbpnce.jpg"
               alt="Kora Demo logo"
               style="width:40px;height:40px;border-radius:10px;object-fit:cover;"
               width="40" height="40"/>
          <span class="nav-brand" style="font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:700;color:#fff;letter-spacing:0.02em;">Kora Demo</span>
        </a>

        <!-- Desktop nav -->
        <div class="desktop-nav" style="display:flex;align-items:center;gap:2rem;">
          <a href="index.html" class="nav-link" style="color:#fff;text-decoration:none;font-size:0.875rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">Home</a>
          <a href="menu.html" class="nav-link" style="color:#fff;text-decoration:none;font-size:0.875rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">Menu</a>
          <a href="events.html" class="nav-link" style="color:#fff;text-decoration:none;font-size:0.875rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">Events</a>
          <a href="index.html#about" class="nav-link" style="color:#fff;text-decoration:none;font-size:0.875rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">About</a>
          <a href="index.html#contact" class="nav-link" style="color:#fff;text-decoration:none;font-size:0.875rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">Contact</a>
        </div>

        <!-- Desktop phone + CTA -->
        <div class="desktop-nav" style="display:flex;align-items:center;gap:1rem;">
          <a href="tel:+12030000000" class="desktop-phone" style="color:#fff;text-decoration:none;font-size:0.8rem;font-weight:600;letter-spacing:0.05em;">+1 203 000 0000</a>
          <a href="https://www.toasttab.com/bedford-thai-stamford-77-bedford-street-stamford-ct"
             target="_blank" rel="noopener noreferrer"
             style="display:inline-flex;align-items:center;padding:0.55rem 1.25rem;border-radius:999px;background:#fff;color:#1a1a1a;font-size:0.78rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;transition:background 0.2s;">
            Order Online
          </a>
        </div>

        <!-- Hamburger -->
        <button id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenuWrapper"
                style="display:flex;flex-direction:column;justify-content:center;align-items:center;width:44px;height:44px;background:transparent;border:none;cursor:pointer;padding:0;">
          <span class="bar1"></span>
          <span class="bar2"></span>
          <span class="bar3"></span>
        </button>
      </div>
    </nav>

    <!-- Mobile backdrop -->
    <div id="mobileMenuBackdrop" aria-hidden="true"></div>

    <!-- Mobile drawer -->
    <div id="mobileMenuWrapper" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div id="mobileMenu">
        <!-- Drawer header -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid #f0f0f0;">
          <a href="index.html" style="display:flex;align-items:center;gap:0.6rem;text-decoration:none;" onclick="closeDrawer()">
            <img src="https://quseprdus1.blob.core.windows.net/kora-business-images/social-media/afaa6855-dc8b-4284-a459-9c753c8fd451/medialibrary/1781674810_rbpnce.jpg"
                 alt="Kora Demo logo"
                 style="width:36px;height:36px;border-radius:8px;object-fit:cover;"
                 width="36" height="36"/>
            <span style="font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:#1a1a1a;">Kora Demo</span>
          </a>
          <button id="mobileCloseBtn" aria-label="Close menu"
                  style="width:36px;height:36px;border-radius:50%;border:1px solid #e0e0e0;background:#f5f5f5;cursor:pointer;display:flex;align-items:center;justify-content:center;">
            <svg width="16" height="16" fill="none" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round">
              <line x1="2" y1="2" x2="14" y2="14"/><line x1="14" y1="2" x2="2" y2="14"/>
            </svg>
          </button>
        </div>
        <!-- Nav links -->
        <nav style="padding:1rem 1.5rem;flex:1;">
          <a href="index.html" onclick="closeDrawer()">Home</a>
          <a href="menu.html" onclick="closeDrawer()">Menu</a>
          <a href="events.html" onclick="closeDrawer()">Events</a>
          <a href="index.html#about" onclick="closeDrawer()">About</a>
          <a href="index.html#contact" onclick="closeDrawer()">Contact</a>
        </nav>
        <!-- Drawer footer -->
        <div style="padding:1.25rem 1.5rem;border-top:1px solid #f0f0f0;">
          <a href="tel:+12030000000"
             style="display:flex;align-items:center;gap:0.5rem;color:#1a1a1a;text-decoration:none;font-size:0.9rem;font-weight:600;margin-bottom:0.75rem;">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            +1 203 000 0000
          </a>
          <a href="https://www.toasttab.com/bedford-thai-stamford-77-bedford-street-stamford-ct"
             target="_blank" rel="noopener noreferrer"
             style="display:flex;align-items:center;justify-content:center;padding:0.75rem;border-radius:999px;background:#1a1a1a;color:#fff;font-size:0.8rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;">
            Order Online
          </a>
        </div>
      </div>
    </div>
  `;

  /* ─────────────────────────────────────────────
     FOOTER HTML
  ───────────────────────────────────────────── */
  var FOOTER_HTML = `
    <footer id="site-footer-el">
      <div style="max-width:1152px;margin:0 auto;padding:4rem 1.5rem 2rem;">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2.5rem;margin-bottom:2rem;">
          <!-- Brand column -->
          <div>
            <a href="index.html" style="display:inline-flex;align-items:center;gap:0.75rem;text-decoration:none;margin-bottom:1rem;">
              <img src="https://quseprdus1.blob.core.windows.net/kora-business-images/social-media/afaa6855-dc8b-4284-a459-9c753c8fd451/medialibrary/1781674810_rbpnce.jpg"
                   alt="Kora Demo logo" class="footer-logo" width="48" height="48"/>
              <span style="font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:#fff;">Kora Demo</span>
            </a>
            <p style="font-size:0.875rem;line-height:1.65;max-width:260px;">Authentic Thai cuisine crafted with the finest ingredients and premium spices from Thailand.</p>
            <div style="display:flex;gap:0.6rem;margin-top:1.25rem;">
              <a href="https://www.instagram.com/askkora.ai/" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Instagram">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              </a>
              <a href="https://www.tiktok.com/@kora.demo" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="TikTok">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
            </div>
          </div>

          <!-- Quick links -->
          <div>
            <h4 style="font-family:'Playfair Display',serif;font-size:0.95rem;font-weight:700;color:#fff;margin-bottom:1rem;letter-spacing:0.05em;text-transform:uppercase;">Quick Links</h4>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.6rem;">
              <li><a href="index.html" style="font-size:0.875rem;">Home</a></li>
              <li><a href="menu.html" style="font-size:0.875rem;">Menu</a></li>
              <li><a href="events.html" style="font-size:0.875rem;">Events</a></li>
              <li><a href="index.html#about" style="font-size:0.875rem;">About</a></li>
              <li><a href="index.html#contact" style="font-size:0.875rem;">Contact</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 style="font-family:'Playfair Display',serif;font-size:0.95rem;font-weight:700;color:#fff;margin-bottom:1rem;letter-spacing:0.05em;text-transform:uppercase;">Contact</h4>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.75rem;">
              <li style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.875rem;">
                <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;margin-top:2px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                48 Strawberry Hill Ave, Stamford, CT 06902
              </li>
              <li style="font-size:0.875rem;">
                <a href="tel:+12030000000" style="display:flex;align-items:center;gap:0.5rem;">
                  <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  +1 203 000 0000
                </a>
              </li>
              <li style="font-size:0.875rem;">
                <a href="mailto:umang@gmail.com" style="display:flex;align-items:center;gap:0.5rem;">
                  <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  umang@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <!-- Order CTA -->
          <div>
            <h4 style="font-family:'Playfair Display',serif;font-size:0.95rem;font-weight:700;color:#fff;margin-bottom:1rem;letter-spacing:0.05em;text-transform:uppercase;">Order &amp; Reserve</h4>
            <div style="display:flex;flex-direction:column;gap:0.75rem;">
              <a href="https://www.toasttab.com/bedford-thai-stamford-77-bedford-street-stamford-ct"
                 target="_blank" rel="noopener noreferrer"
                 style="display:inline-flex;align-items:center;justify-content:center;padding:0.7rem 1.25rem;border-radius:999px;background:#fff;color:#1a1a1a;font-size:0.78rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;transition:background 0.2s;">
                Order Online
              </a>
              <a href="tel:+12030000000"
                 style="display:inline-flex;align-items:center;justify-content:center;padding:0.7rem 1.25rem;border-radius:999px;background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,0.3);font-size:0.78rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;transition:background 0.2s,border-color 0.2s;">
                Reserve a Table
              </a>
            </div>
          </div>
        </div>

        <hr class="footer-divider"/>

        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;">
          <p style="font-size:0.8rem;margin:0;">&copy; <span id="footer-year"></span> Kora Demo. All rights reserved.</p>
          <p style="font-size:0.8rem;margin:0;">48 Strawberry Hill Ave, Stamford, CT 06902 &nbsp;|&nbsp; <a href="tel:+12030000000">+1 203 000 0000</a></p>
        </div>
      </div>
    </footer>
  `;

  /* ─────────────────────────────────────────────
     INJECT CSS
  ───────────────────────────────────────────── */
  function injectCSS() {
    var style = document.createElement('style');
    style.id = 'shell-styles';
    style.textContent = SHELL_CSS;
    document.head.appendChild(style);
  }

  /* ─────────────────────────────────────────────
     INJECT HELPERS
     HEADER_HTML has multiple root nodes (nav +
     backdrop + drawer). Always insert the full set.
  ───────────────────────────────────────────── */
  function injectMarkup(placeholderId, html, fallbackPosition) {
    var placeholder = document.getElementById(placeholderId);
    var markup = (html || '').trim();
    if (!markup) return;

    if (placeholder) {
      placeholder.insertAdjacentHTML('afterend', markup);
      placeholder.remove();
      return;
    }

    document.body.insertAdjacentHTML(fallbackPosition, markup);
  }

  function injectHeader() {
    injectMarkup('site-header', HEADER_HTML, 'afterbegin');
  }

  function injectFooter() {
    injectMarkup('site-footer', FOOTER_HTML, 'beforeend');
    var yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ─────────────────────────────────────────────
     DRAWER LOGIC
  ───────────────────────────────────────────── */
  function initDrawer() {
    var menuBtn = document.getElementById('menuBtn');
    var backdrop = document.getElementById('mobileMenuBackdrop');
    var wrapper = document.getElementById('mobileMenuWrapper');
    var closeBtn = document.getElementById('mobileCloseBtn');

    if (!menuBtn || !backdrop || !wrapper) return;

    function openDrawer() {
      wrapper.classList.add('open');
      backdrop.classList.add('open');
      menuBtn.classList.add('is-open');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    window.closeDrawer = function () {
      wrapper.classList.remove('open');
      backdrop.classList.remove('open');
      menuBtn.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (wrapper.classList.contains('open')) {
        window.closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        window.closeDrawer();
      });
    }

    backdrop.addEventListener('click', window.closeDrawer);

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && wrapper.classList.contains('open')) {
        window.closeDrawer();
      }
    });
  }

  /* ─────────────────────────────────────────────
     SCROLL EFFECT
  ───────────────────────────────────────────── */
  function initScrollEffect() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 40) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ─────────────────────────────────────────────
     ACTIVE NAV LINK HIGHLIGHT
  ───────────────────────────────────────────── */
  function highlightActiveNav() {
    var path = window.location.pathname;
    var currentHash = (window.location.hash || '').replace(/^#/, '');
    var currentPage = path.replace(/^\//, '').replace(/\/$/, '').replace(/\.html$/, '');
    if (currentPage === '' || currentPage === 'index') currentPage = 'index';

    var links = document.querySelectorAll('#navbar .nav-link, #mobileMenu nav a');
    links.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var parts = href.split('#');
      var linkPath = (parts[0] || '').replace(/^\//, '').replace(/\/$/, '');
      var linkHash = parts[1] || '';
      var linkPage = linkPath.replace(/\.html$/, '');
      if (linkPage === '') linkPage = 'index';

      var isActive = false;
      if (linkHash) {
        // Hash links (About/Contact) are active only when that section is current
        isActive = linkPage === currentPage && linkHash === currentHash;
      } else {
        isActive = linkPage === currentPage;
      }

      if (isActive) {
        link.style.opacity = '0.6';
        link.style.pointerEvents = 'none';
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ─────────────────────────────────────────────
     BOOT
  ───────────────────────────────────────────── */
  function boot() {
    injectCSS();
    injectHeader();
    injectFooter();
    initDrawer();
    initScrollEffect();
    highlightActiveNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();