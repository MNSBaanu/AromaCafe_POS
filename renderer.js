const { ipcRenderer } = require('electron');

let products = [];
let cart = [];

async function loadProducts() {
    products = await ipcRenderer.invoke('get-products');
    renderProducts();
}

function renderProducts(filter = 'All') {
    const productList = document.getElementById('product-list');
    const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);
    
    productList.innerHTML = filtered.map(p => `
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-amber-500 cursor-pointer transition-all transform active:scale-95 flex flex-col items-center" onclick="addToCart(${p.id})">
            <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-2 text-2xl">
                ${getIcon(p.category)}
            </div>
            <span class="font-bold text-gray-800 text-center">${p.name}</span>
            <span class="text-amber-700 font-semibold mt-1">$${p.price.toFixed(2)}</span>
        </div>
    `).join('');
}

function getIcon(category) {
    switch(category) {
        case 'Coffee': return '☕';
        case 'Pastry': return '🥐';
        case 'Cold Drink': return '🥤';
        default: return '🍴';
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
    }
    renderCart();
}

function clearCart() {
    if (cart.length > 0 && confirm('Are you sure you want to clear the cart?')) {
        cart = [];
        renderCart();
    }
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="text-gray-400 text-center py-8">Cart is empty</div>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="flex justify-between items-center mb-3 p-2 bg-gray-50 rounded">
                <div>
                    <div class="font-bold text-sm">${item.name}</div>
                    <div class="text-xs text-gray-500">$${item.price.toFixed(2)} x ${item.quantity}</div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="font-bold text-amber-700">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    subtotalEl.innerText = subtotal.toFixed(2);
    taxEl.innerText = tax.toFixed(2);
    totalEl.innerText = total.toFixed(2);
}

async function checkout() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const transaction = {
        items: cart,
        subtotal,
        tax,
        total
    };

    const result = await ipcRenderer.invoke('save-transaction', transaction);
    
    if (result.success) {
        alert(`Order Placed Successfully!\nTotal: $${total.toFixed(2)}`);
        cart = [];
        renderCart();
    } else {
        alert(`Error saving order: ${result.error}`);
    }
}

function printReceipt() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    ipcRenderer.send('print-receipt', {
        items: cart,
        subtotal,
        tax,
        total
    });
}

// Category filtering
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('bg-amber-600', 'text-white'));
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.add('bg-white', 'text-gray-700'));
        
        btn.classList.remove('bg-white', 'text-gray-700');
        btn.classList.add('bg-amber-600', 'text-white');
        
        renderProducts(btn.innerText);
    });
});

// Initial load
loadProducts();
renderCart();
