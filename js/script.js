window.addEventListener('DOMContentLoaded', function() {

  
  const intro = document.getElementById('intro-overlay');
  const skipBtn = document.getElementById('skip-intro');
  

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
      menuList.innerHTML = '<div class="menu-loading">Loading menu...</div>';
      
      fetch('db.json')
        .then(res => res.json())
        .then(data => {
          if (data.favorites && data.favorites.length) {
            menuList.innerHTML = data.favorites.map(item => `
              <div class="menu-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-info">
                  <div class="menu-name">${item.name}</div>
                  <div class="menu-desc">${item.description}</div>
                </div>
              </div>
            `).join('');
          } else {
            menuList.innerHTML = '<div class="menu-empty">No menu items found.</div>';
          }
        })
        .catch(() => {
          menuList.innerHTML = '<div class="menu-error">Failed to load menu.</div>';
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
});