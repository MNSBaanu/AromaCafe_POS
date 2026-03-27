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
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center gap-4 shrink-0">
        <div>
          <h1 className="font-bold text-gray-900 text-base">Point of Sale</h1>
          <p className="text-xs text-gray-400 leading-none mt-0.5">
            <span className="text-gray-500">Dashboard</span>
            <span className="mx-1 text-gray-300">/</span>
            <span className="text-[#059669] font-medium">POS</span>
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={load}
            className="h-8 px-3 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 flex items-center gap-1.5 text-sm font-medium transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Refresh
          </button>
          <button className="h-8 px-3 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center gap-1.5 text-sm font-medium transition-all">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            QR Orders
          </button>
          <button className="h-8 px-3 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center gap-1.5 text-sm font-medium transition-all">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/>
            </svg>
            Drafts
          </button>
          <button className="h-8 px-3 rounded-lg bg-[#059669] hover:bg-[#047857] text-white flex items-center gap-1.5 text-sm font-semibold transition-all shadow-sm">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M12 5v14M5 12h14"/></svg>
            New Order
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: products */}
        <div className="flex flex-col flex-1 overflow-hidden p-4 gap-3 min-w-0">
          {/* Search + filter row */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative flex-1 max-w-sm">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669]/40 transition-all"
              />
            </div>
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#059669]/20 appearance-none pr-8 cursor-pointer">
              <option>All Categories</option>
              {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
            </select>
            <div className="ml-auto text-sm text-gray-400 font-medium shrink-0">
              {filtered.length} items
            </div>
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto pb-0.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-150 ${
                  activeCategory === cat
                ? 'bg-[#059669] text-white shadow-sm'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-[#059669]/30 hover:text-[#059669]'
                }`}
              >
                {cat === 'All' ? 'All Items' : cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="flex-1 overflow-auto">
            <ProductGrid products={filtered} onAdd={addToCart} />
          </div>
        </div>

        {/* Right: order panel */}
        <div className="w-[340px] shrink-0 bg-white border-l border-gray-100 flex flex-col overflow-hidden">
          <Cart cart={cart} onUpdateQty={updateQty} onRemove={removeFromCart} onCheckout={checkout} />
        </div>
      </div>
    </div>
  )
}
