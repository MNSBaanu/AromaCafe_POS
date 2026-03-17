import { useState, useEffect } from 'react'
import ProductGrid from '../components/ProductGrid'
import Cart from '../components/Cart'
import Receipt from '../components/Receipt'

export default function POS() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [receipt, setReceipt] = useState(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => { load() }, [])

  async function load() {
    const data = await window.api.products.getAll()
    setProducts(data)
  }

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category))).sort()]

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    return matchSearch && matchCat
  })

  function addToCart(product) {
    if (product.stock <= 0) return
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        if (existing.quantity >= product.stock) return prev
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function updateQty(id, qty) {
    if (qty <= 0) return removeFromCart(id)
    const product = products.find(p => p.id === id)
    if (qty > product.stock) return
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  async function checkout(paid) {
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
    const tax = subtotal * 0.05
    const total = subtotal + tax
    const change = paid - total
    const saleId = await window.api.sales.create({ items: cart, total, paid, change })
    setReceipt({ id: saleId, items: cart, total, paid, change, date: new Date().toLocaleString() })
    setCart([])
    load()
  }

  if (receipt) return <Receipt receipt={receipt} onClose={() => setReceipt(null)} />

  return (
    <div className="flex flex-col h-screen bg-cafe-50">
      {/* Top bar */}
      <header className="bg-white border-b border-cafe-100 px-6 h-16 flex items-center gap-4 shrink-0">
        <div>
          <h1 className="font-bold text-cafe-800 text-lg leading-none">Aroma Cafe</h1>
          <p className="text-xs text-cafe-400 mt-0.5">Point of Sale</p>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-sm ml-6">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cafe-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search menu items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-cafe-50 border border-cafe-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-cafe-800 placeholder-cafe-300 focus:outline-none focus:ring-2 focus:ring-cafe-300 focus:border-transparent transition"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button onClick={load} title="Refresh" className="w-9 h-9 rounded-xl bg-cafe-50 border border-cafe-200 hover:bg-cafe-100 flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 text-cafe-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </button>
          <div className="text-right">
            <p className="text-xs font-semibold text-cafe-700">{new Date().toLocaleDateString('en-US',{weekday:'long'})}</p>
            <p className="text-xs text-cafe-400">{new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</p>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        {/* Product panel */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Category pills */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1 shrink-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
                  activeCategory === cat
                    ? 'bg-cafe-700 text-white border-cafe-700 shadow-sm'
                    : 'bg-white text-cafe-600 border-cafe-200 hover:border-cafe-400 hover:text-cafe-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-auto">
            <ProductGrid products={filtered} onAdd={addToCart} />
          </div>
        </div>

        {/* Cart panel */}
        <div className="w-[310px] shrink-0 bg-white rounded-2xl border border-cafe-100 shadow-sm flex flex-col overflow-hidden">
          <Cart cart={cart} onUpdateQty={updateQty} onRemove={removeFromCart} onCheckout={checkout} />
        </div>
      </div>
    </div>
  )
}
