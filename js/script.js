window.addEventListener('DOMContentLoaded', function() {
  const intro = document.querySelector('#intro-overlay');
  const skipBtn = document.querySelector('#skip-intro');
  const particlesContainer = document.querySelector('.intro-particles');


  if (particlesContainer) {
    for (let i = 0; i < 9; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particlesContainer.appendChild(particle);
    }
  }
  
  if (intro) {
    setTimeout(() => {
      intro.style.opacity = '0';
      intro.style.transition = 'opacity 1s ease';
      setTimeout(() => {
        intro.style.pointerEvents = 'none';
        intro.style.visibility = 'hidden';
      }, 1000);
    }, 6000);
  }
  

  if (skipBtn && intro) {
    skipBtn.addEventListener('click', function() {
      intro.style.opacity = '0';
      intro.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        intro.style.pointerEvents = 'none';
        intro.style.visibility = 'hidden';
      }, 500);
    });
  }

  const menuBtn = document.querySelector('.menu-card .view-btn');
  const menuModal = document.getElementById('menu-modal');
  const menuClose = document.querySelector('.menu-modal-close');
  const menuList = document.getElementById('menu-list');
  
  if (menuBtn && menuModal && menuClose && menuList) {
    menuBtn.addEventListener('click', () => {
      menuModal.style.display = 'block';
      menuList.innerHTML = '<div class="menu-loading">Menu laden...</div>';
      fetch('db.json')
        .then(res => res.json())
        .then(data => {
          if (data.categories && data.categories.length) {
            menuList.innerHTML = data.categories.map(cat => `
              <div class="menu-category">
                <h3 class="menu-category-title">${cat.name}</h3>
                <div class="menu-items">
                  ${cat.items.map(item => `
                    <div class="menu-item">
                      <img src="${item.image}" alt="${item.name}" class="menu-item-img">
                      <div class="menu-item-info">
                        <div class="menu-item-name">${item.name}</div>
                        <div class="menu-item-desc">${item.description}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('');
          } else {
            menuList.innerHTML = '<div class="menu-empty">Geen menu items gevonden.</div>';
          }
        })
        .catch(() => {
          menuList.innerHTML = '<div class="menu-error">Menu laden mislukt.</div>';
        });
    });
    menuClose.addEventListener('click', () => {
      menuModal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
      if (e.target === menuModal) menuModal.style.display = 'none';
    });
  }

  
  window.toggleMobileMenu = function() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
      mobileNav.classList.toggle('active');
    }
  };
  
  window.closeMobileMenu = function() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
      mobileNav.classList.remove('active');
    }
  };

  // Chef Popup Logic
  const chefPopup = document.getElementById('chefPopup');
  const closeChefPopup = document.getElementById('closeChefPopup');
  const chefLink = document.querySelector('a[href="#chef"]');

  if (chefPopup && closeChefPopup && chefLink) {
    chefLink.addEventListener('click', (e) => {
      e.preventDefault();
      chefPopup.style.display = 'block';
    });

    closeChefPopup.addEventListener('click', () => {
      chefPopup.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === chefPopup) {
        chefPopup.style.display = 'none';
      }
    });
  }


});

