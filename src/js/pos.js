let products = [];
let cart = [];
let settings = {};
let activeCategory = 'All';
let paymentMethod = 'cash';

// ── Init ──────────────────────────────────────────────────────────
async function init() {
  initSidebar('pos');
  [products, settings] = await Promise.all([
    window.api.getProducts(),
    window.api.getSettings()
  ]);
  renderCategories();
  renderProducts();
}

// ── Categories ────────────────────────────────────────────────────
function renderCategories() {
  const cats = ['All', ...new Set(products.map(p => p.category))];
  const container = document.getElementById('category-pills');
  container.innerHTML = cats.map(c => `
    <div class="pill ${c === activeCategory ? 'active' : ''}" onclick="filterCategory('${c}')">${c}</div>
  `).join('');
}

function filterCategory(cat) {
  activeCategory = cat;
  renderCategories();
  renderProducts();
}

// ── Products ──────────────────────────────────────────────────────
function renderProducts() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const grid = document.getElementById('product-grid');

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:40px">No products found</div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" onclick="addToCart(${p.id})">
      <div class="product-icon">${getCategoryIcon(p.category)}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-price">${settings.currency || '$'}${p.price.toFixed(2)}</div>
    </div>
  `).join('');
}

function getCategoryIcon(cat) {
  const icons = { 'Coffee': '☕', 'Pastry': '🥐', 'Cold Drink': '🥤' };
  return icons[cat] || '🍴';
}

// ── Cart ──────────────────────────────────────────────────────────
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });
  renderCart();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
  renderCart();
}

function clearCart() {
  if (cart.length === 0) return;
  if (!confirm('Clear all items?')) return;
  cart = [];
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cart-items');
  const currency = settings.currency || '$';

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <div>No items yet</div>
      </div>`;
  } else {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${currency}${item.price.toFixed(2)} each</div>
        </div>
        <div class="qty-control">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.quantity}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        </div>
        <div class="cart-item-total">${currency}${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');
  }

  updateSummary();
}

function updateSummary() {
  const currency = settings.currency || '$';
  const taxRate = (settings.taxRate || 0) / 100;
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  document.getElementById('cart-count').textContent = cart.reduce((s, i) => s + i.quantity, 0);
  document.getElementById('subtotal').textContent = `${currency}${subtotal.toFixed(2)}`;
  document.getElementById('tax-label').textContent = `Tax (${settings.taxRate || 0}%)`;
  document.getElementById('tax').textContent = `${currency}${tax.toFixed(2)}`;
  document.getElementById('total').textContent = `${currency}${total.toFixed(2)}`;

  const chargeBtn = document.getElementById('charge-btn');
  chargeBtn.textContent = `CHARGE ${currency}${total.toFixed(2)}`;
  chargeBtn.disabled = cart.length === 0;
}

// ── Payment ───────────────────────────────────────────────────────
function openPayment() {
  const currency = settings.currency || '$';
  const taxRate = (settings.taxRate || 0) / 100;
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + subtotal * taxRate;

  document.getElementById('pay-due').textContent = `${currency}${total.toFixed(2)}`;
  document.getElementById('tendered-input').value = '';
  document.getElementById('change-due').textContent = `${currency}0.00`;
  selectPayment('cash');

  document.getElementById('payment-overlay').classList.add('open');
}

function closePayment() {
  document.getElementById('payment-overlay').classList.remove('open');
}

function selectPayment(method) {
  paymentMethod = method;
  document.getElementById('opt-cash').classList.toggle('active', method === 'cash');
  document.getElementById('opt-card').classList.toggle('active', method === 'card');
  document.getElementById('cash-section').classList.toggle('show', method === 'cash');
}

function calcChange() {
  const currency = settings.currency || '$';
  const taxRate = (settings.taxRate || 0) / 100;
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + subtotal * taxRate;
  const tendered = parseFloat(document.getElementById('tendered-input').value) || 0;
  const change = Math.max(0, tendered - total);
  document.getElementById('change-due').textContent = `${currency}${change.toFixed(2)}`;
}

async function confirmPayment() {
  const taxRate = (settings.taxRate || 0) / 100;
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  if (paymentMethod === 'cash') {
    const tendered = parseFloat(document.getElementById('tendered-input').value) || 0;
    if (tendered < total) {
      alert('Amount tendered is less than total.');
      return;
    }
  }

  const transaction = {
    items: cart,
    subtotal,
    tax,
    total,
    paymentMethod,
    tendered: paymentMethod === 'cash'
      ? parseFloat(document.getElementById('tendered-input').value)
      : total
  };

  const result = await window.api.saveTransaction(transaction);
  if (result.success) {
    closePayment();
    window.api.printReceipt({ ...transaction, settings });
    cart = [];
    renderCart();
  } else {
    alert('Failed to save transaction.');
  }
}

// ── Search ────────────────────────────────────────────────────────
document.getElementById('search-input').addEventListener('input', renderProducts);

// ── Start ─────────────────────────────────────────────────────────
init();
