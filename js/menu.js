// Menu Data
const menuData = {
  cakes: [
    { id: 1, name: 'Chocolate Cake', price: 3.99, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', desc: 'Rich chocolate layers' },
    { id: 2, name: 'Red Velvet', price: 4.99, image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400', desc: 'Classic red velvet with cream cheese' },
    { id: 4, name: 'Strawberry Delight', price: 5.99, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400', desc: 'Fresh strawberries and cream' }
  ],
  cookies: [
    { id: 5, name: 'Chocolate Chip', price: 3.99, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400', desc: 'Classic chocolate chip cookies' },
    { id: 6, name: 'Oatmeal Raisin', price: 3.49, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', desc: 'Hearty oatmeal with raisins' },
    { id: 7, name: 'Sugar Cookies', price: 2.99, image: 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=400', desc: 'Sweet and buttery' },
    
  ],
  bestsellers: [
    { id: 9, name: 'Croissant', price: 4.99, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', desc: 'Buttery and flaky' },
    { id: 11, name: 'Donut', price: 6.99, image: 'https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?w=400', desc: 'Warm and gooey' },
    { id: 12, name: 'Blueberry Muffin', price: 4.49, image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400', desc: 'Fresh blueberries' }
  ]
};

// Cart Array
let cart = [];

// Create Menu Cards
function createCard(item) {
  return `
    <div class="menu-card">
      <img src="${item.image}" alt="${item.name}">
      <div class="menu-card-content">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="menu-card-footer">
          <span class="price">$${item.price}</span>
          <button class="add-to-cart-btn" onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}

// Render Menu
function renderMenu() {
  document.getElementById('cakesGrid').innerHTML = menuData.cakes.map(createCard).join('');
  document.getElementById('cookiesGrid').innerHTML = menuData.cookies.map(createCard).join('');
  document.getElementById('bestsellersGrid').innerHTML = menuData.bestsellers.map(createCard).join('');
}

// Add to Cart
function addToCart(id) {
  const allItems = [...menuData.cakes, ...menuData.cookies, ...menuData.bestsellers];
  const item = allItems.find(i => i.id === id);
  cart.push(item);
  updateCart();
}

// Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Update Cart UI
function updateCart() {
  const cartCount = document.getElementById('cartCount');
  const fabBadge = document.getElementById('fabBadge');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  
  cartCount.textContent = cart.length;
  fabBadge.textContent = cart.length;
  
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart-state">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p class="empty-cart">Your cart is empty</p>
        <p class="empty-cart-sub">Add some delicious items!</p>
      </div>
    `;
    cartTotal.textContent = '$0.00';
  } else {
    cartItems.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <span class="cart-item-price">$${item.price}</span>
        </div>
        <button class="remove-item" onclick="removeFromCart(${index})">×</button>
      </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }
}

// Toggle Cart
function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('active');
}

// Scroll to Section
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.tab-btn').classList.add('active');
  }
}

// Initialize
renderMenu();