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
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center gap-4 shrink-0">
        {/* Search */}
        <div className="relative w-64">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search (Ctrl+/)"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4849a] focus:border-transparent"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button onClick={load} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#fdf0f2] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="#9b2335" strokeWidth={2}>
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </div>
        </div>
      </header>

      {/* Page title bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0">
        <div>
          <h1 className="font-bold text-gray-800 text-base">Point of Sale (POS)</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            <span className="text-gray-500">Dashboard</span>
            <span className="mx-1.5 text-gray-300">•</span>
            <span className="text-[#9b2335]">Pos</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 bg-[#9b2335] hover:bg-[#7d1c2b] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M12 5v14M5 12h14"/></svg>
            New
          </button>
          <button className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            QR Menu Orders
          </button>
          <button className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
            Draft List
          </button>
          <button className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
            Table Order
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden gap-0">
        {/* Left: products */}
        <div className="flex flex-col flex-1 overflow-hidden p-4 gap-3">
          {/* Filters row */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative flex-1 max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search in products"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4849a] focus:border-transparent"
              />
            </div>
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#d4849a] appearance-none pr-8 cursor-pointer">
              <option>All Category</option>
              {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 shrink-0 overflow-x-auto pb-0.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#9b2335] text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#d4849a] hover:text-[#9b2335]'
                }`}
              >
                {cat === 'All' ? 'Show All' : cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="flex-1 overflow-auto">
            <ProductGrid products={filtered} onAdd={addToCart} />
          </div>
        </div>

        {/* Right: order panel */}
        <div className="w-[320px] shrink-0 bg-white border-l border-gray-100 flex flex-col overflow-hidden">
          <Cart cart={cart} onUpdateQty={updateQty} onRemove={removeFromCart} onCheckout={checkout} />
        </div>
      </div>
    </div>
  )
}
