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

  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0)
  const outOfStock = products.filter(p => p.stock === 0).length
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5).length

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center gap-4 shrink-0">
        <div>
          <h1 className="font-bold text-gray-900 text-sm">Menu Items</h1>
          <p className="text-[11px] text-gray-400 leading-none mt-0.5">
            <span className="text-gray-500">Dashboard</span>
            <span className="mx-1 text-gray-300">/</span>
            <span className="text-[#9b2335] font-medium">Menu</span>
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={openAdd} className="h-8 px-3 rounded-lg bg-[#9b2335] hover:bg-[#7d1c2b] text-white flex items-center gap-1.5 text-xs font-semibold transition-all shadow-sm">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M12 5v14M5 12h14"/></svg>
            Add Item
          </button>
        </div>
      </header>

      {/* Stats row */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-6 shrink-0">
        {[
          { label: 'Total Items', value: products.length, color: 'text-gray-900' },
          { label: 'Inventory Value', value: `$${totalValue.toFixed(2)}`, color: 'text-[#9b2335]' },
          { label: 'Out of Stock', value: outOfStock, color: outOfStock > 0 ? 'text-red-500' : 'text-gray-900' },
          { label: 'Low Stock', value: lowStock, color: lowStock > 0 ? 'text-amber-500' : 'text-gray-900' },
        ].map(stat => (
          <div key={stat.label} className="flex items-center gap-3">
            <div>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{stat.label}</p>
              <p className={`text-base font-bold ${stat.color}`}>{stat.value}</p>
            </div>
            <div className="w-px h-8 bg-gray-100 last:hidden"/>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-5">
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search items..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9b2335]/20 focus:border-[#9b2335]/40 transition-all"
              />
            </div>
            <span className="text-xs text-gray-400 ml-auto font-medium">{filtered.length} of {products.length} items</span>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                {['#', 'Item Name', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, idx) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-slate-50/80 transition-colors last:border-0 group">
                  <td className="px-5 py-3.5 text-xs text-gray-400 font-medium">{idx + 1}</td>
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 rounded-lg bg-[#fdf0f2] text-[#9b2335] text-xs font-semibold border border-rose-100">{p.category}</span>
                  </td>
                  <td className="px-5 py-3.5 font-bold text-[#9b2335] text-sm">${p.price.toFixed(2)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      p.stock > 10 ? 'bg-green-50 text-green-700 border border-green-100'
                      : p.stock > 0 ? 'bg-amber-50 text-amber-700 border border-amber-100'
                      : 'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                      {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(p)}
                        className="h-7 px-3 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => remove(p.id)}
                        className="h-7 px-3 rounded-lg bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <p className="text-gray-400 text-sm font-medium">No items found</p>
                    <p className="text-gray-300 text-xs mt-1">Try adjusting your search</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 w-[420px]" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#fdf0f2] flex items-center justify-center">
                <svg className="w-4.5 h-4.5 w-[18px] h-[18px] text-[#9b2335]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {editing
                    ? <><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></>
                    : <path d="M12 5v14M5 12h14"/>
                  }
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base">{editing ? 'Edit Item' : 'Add Menu Item'}</h3>
                <p className="text-xs text-gray-400">{editing ? 'Update item details' : 'Fill in the details below'}</p>
              </div>
              <button onClick={() => setShowForm(false)} className="ml-auto w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Item Name', key: 'name', type: 'text', placeholder: 'e.g. Caramel Latte' },
                { label: 'Price ($)', key: 'price', type: 'number', placeholder: '0.00' },
                { label: 'Stock Quantity', key: 'stock', type: 'number', placeholder: '0' },
                { label: 'Category', key: 'category', type: 'text', placeholder: 'e.g. Coffee, Desserts' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#9b2335]/20 focus:border-[#9b2335]/40 bg-gray-50 transition-all placeholder-gray-300"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="flex-[2] bg-[#9b2335] hover:bg-[#7d1c2b] text-white py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm"
              >
                {editing ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
