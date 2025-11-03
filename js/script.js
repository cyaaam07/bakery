// js/script.js
// Moderne stijl: const/let, arrow functions, async/await, class-based toggles

document.addEventListener('DOMContentLoaded', () => {
  /* ---------------- Intro overlay + particles + skip button ---------------- */
  const intro = document.querySelector('#intro-overlay');
  const skipBtn = document.querySelector('#skip-intro');
  const particlesContainer = document.querySelector('.intro-particles');

  // Maak enkele decoratieve particles als container bestaat
  if (particlesContainer) {
    for (let i = 0; i < 9; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particlesContainer.appendChild(particle);
    }
  }

  // Sluit intro automatisch na X ms
  if (intro) {
    setTimeout(() => {
      intro.style.transition = 'opacity 1s ease';
      intro.style.opacity = '0';
      setTimeout(() => {
        intro.style.pointerEvents = 'none';
        intro.style.visibility = 'hidden';
      }, 1000);
    }, 6000);
  }

  // Skip knop
  if (skipBtn && intro) {
    skipBtn.addEventListener('click', () => {
      intro.style.transition = 'opacity 0.5s ease';
      intro.style.opacity = '0';
      setTimeout(() => {
        intro.style.pointerEvents = 'none';
        intro.style.visibility = 'hidden';
      }, 500);
    });
  }

  /* ---------------- Menu modal (laden vanuit db.json) ---------------- */
  const menuBtn = document.querySelector('.menu-card .view-btn');
  const menuModal = document.getElementById('menu-modal');
  const menuClose = document.querySelector('.menu-modal-close');
  const menuList = document.getElementById('menu-list');

  const openMenuModal = async () => {
    if (!menuModal || !menuList) return;
    menuModal.style.display = 'block';
    menuList.innerHTML = '<div class="menu-loading">Menu laden...</div>';
    try {
      const res = await fetch('db.json');
      if (!res.ok) throw new Error('Network response not ok');
      const data = await res.json();
      if (data.categories && data.categories.length) {
        menuList.innerHTML = data.categories.map(cat => `
          <div class="menu-category">
            <h3 class="menu-category-title">${cat.name}</h3>
            <div class="menu-items">
              ${cat.items.map(item => `
                <div class="menu-item">
                  <img src="${item.image}" alt="${escapeHtml(item.name)}" class="menu-item-img">
                  <div class="menu-item-info">
                    <div class="menu-item-name">${escapeHtml(item.name)}</div>
                    <div class="menu-item-desc">${escapeHtml(item.description)}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('');
      } else {
        menuList.innerHTML = '<div class="menu-empty">Geen menu items gevonden.</div>';
      }
    } catch (err) {
      console.error('Menu load failed', err);
      menuList.innerHTML = '<div class="menu-error">Menu laden mislukt.</div>';
    }
  };

  const closeMenuModal = () => {
    if (!menuModal) return;
    menuModal.style.display = 'none';
  };

  if (menuBtn && menuModal && menuClose && menuList) {
    menuBtn.addEventListener('click', openMenuModal);
    menuClose.addEventListener('click', closeMenuModal);
    window.addEventListener('click', (e) => {
      if (e.target === menuModal) closeMenuModal();
    });
  }

  // Eenvoudige HTML-escape voor data uit JSON (security)
  function escapeHtml(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ---------------- Mobile menu toggles ---------------- */
  window.toggleMobileMenu = () => {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) mobileNav.classList.toggle('active');
  };

  window.closeMobileMenu = () => {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) mobileNav.classList.remove('active');
  };

  /* ---------------- Chef popup (class toggles + accessibility) ---------------- */
  (function setupChefPopup() {
    const chefPopup = document.getElementById('chefPopup');
    const closeChefPopup = document.getElementById('closeChefPopup');
    // prefer explicit id link if present, fallback to anchor
    const chefLink = document.querySelector('#chefLink') || document.querySelector('a[href="#chef"]');

    if (!chefPopup || !closeChefPopup || !chefLink) return;

    // Ensure consistent starting state
    chefPopup.classList.remove('active');
    chefPopup.setAttribute('aria-hidden', 'true');
    closeChefPopup.setAttribute('aria-label', 'Close chef popup');

    const openChefPopup = () => {
      document.body.classList.add('popup-open'); // backdrop via CSS pseudo-element
      chefPopup.classList.add('active');
      chefPopup.setAttribute('aria-hidden', 'false');
      // focus management
      closeChefPopup.focus();
      // prevent background scroll
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    };

    const closeChefPopupFn = () => {
      chefPopup.classList.remove('active');
      chefPopup.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('popup-open');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      // restore focus
      chefLink.focus();
    };

    chefLink.addEventListener('click', (e) => {
      e.preventDefault();
      openChefPopup();
    });

    closeChefPopup.addEventListener('click', closeChefPopupFn);

    // click outside popup to close
    window.addEventListener('click', (e) => {
      if (e.target === chefPopup) closeChefPopupFn();
    });

    // ESC to close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chefPopup.classList.contains('active')) {
        closeChefPopupFn();
      }
    });

    // basic focus trap inside popup
    chefPopup.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || !chefPopup.classList.contains('active')) return;
      const focusable = Array.from(chefPopup.querySelectorAll('a, button, input, textarea, [tabindex]:not([tabindex="-1"])'))
        .filter(el => !el.hasAttribute('disabled'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  })();

 
});
