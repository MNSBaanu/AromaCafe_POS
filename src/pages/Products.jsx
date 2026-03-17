import { useState, useEffect } from 'react'

const empty = { name: '', price: '', stock: '', category: '' }

export default function Products() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => { load() }, [])
  async function load() { setProducts(await window.api.products.getAll()) }

  function openAdd() { setForm(empty); setEditing(null); setShowForm(true) }
  function openEdit(p) { setForm({ ...p, price: String(p.price), stock: String(p.stock) }); setEditing(p.id); setShowForm(true) }

  async function save() {
    if (!form.name || !form.price || form.stock === '') return
    const payload = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock), category: form.category || 'General' }
    if (editing) await window.api.products.update({ ...payload, id: editing })
    else await window.api.products.add(payload)
    setShowForm(false)
    load()
  }

  async function remove(id) {
    if (!confirm('Delete this item?')) return
    await window.api.products.delete(id)
    load()
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center gap-4 shrink-0">
        <div className="relative w-64">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Search (Ctrl+/)" className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4849a] focus:border-transparent" readOnly />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#fdf0f2] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="#9b2335" strokeWidth={2}>
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </div>
        </div>
      </header>

      {/* Page title */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0">
        <div>
          <h1 className="font-bold text-gray-800 text-base">Menu Items</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            <span className="text-gray-500">Dashboard</span>
            <span className="mx-1.5 text-gray-300">•</span>
            <span className="text-[#9b2335]">Menu</span>
          </p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-1.5 bg-[#9b2335] hover:bg-[#7d1c2b] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M12 5v14M5 12h14"/></svg>
          Add Item
        </button>
      </div>

      {/* Search + table */}
      <div className="flex-1 overflow-auto p-5">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search items..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4849a] focus:border-transparent"
              />
            </div>
            <span className="text-xs text-gray-400 ml-auto">{filtered.length} items</span>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['Item Name', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0">
                  <td className="px-5 py-3.5 font-semibold text-gray-800">{p.name}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#fdf0f2] text-[#9b2335] text-xs font-medium border border-[#f0d0d8]">{p.category}</span>
                  </td>
                  <td className="px-5 py-3.5 font-bold text-[#9b2335]">${p.price.toFixed(2)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      p.stock > 10 ? 'bg-green-50 text-green-600 border border-green-100'
                      : p.stock > 0 ? 'bg-yellow-50 text-yellow-600 border border-yellow-100'
                      : 'bg-red-50 text-red-500 border border-red-100'
                    }`}>
                      {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <button onClick={() => openEdit(p)} className="text-xs font-medium text-blue-500 hover:text-blue-700 transition-colors">Edit</button>
                      <button onClick={() => remove(p.id)} className="text-xs font-medium text-red-400 hover:text-red-600 transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-gray-400 text-sm">No items found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-[400px]">
            <h3 className="font-bold text-gray-800 text-base mb-5">{editing ? 'Edit Item' : 'Add Menu Item'}</h3>
            <div className="space-y-3">
              {[
                { label: 'Item Name', key: 'name', type: 'text', placeholder: 'e.g. Caramel Latte' },
                { label: 'Price ($)', key: 'price', type: 'number', placeholder: '0.00' },
                { label: 'Stock Qty', key: 'stock', type: 'number', placeholder: '0' },
                { label: 'Category', key: 'category', type: 'text', placeholder: 'e.g. Coffee, Desserts' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d4849a] focus:border-transparent bg-gray-50"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-[#d4849a] text-[#9b2335] py-2.5 rounded-lg text-sm font-semibold hover:bg-[#fdf0f2] transition-colors">Cancel</button>
              <button onClick={save} className="flex-1 bg-[#9b2335] hover:bg-[#7d1c2b] text-white py-2.5 rounded-lg text-sm font-semibold transition-colors">
                {editing ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
