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
    <div className="h-screen bg-cafe-50 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-cafe-100 px-6 h-16 flex items-center gap-4 shrink-0">
        <div>
          <h1 className="font-bold text-cafe-800 text-base">Menu Items</h1>
          <p className="text-xs text-cafe-400">{products.length} items</p>
        </div>
        <div className="relative flex-1 max-w-sm ml-4">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cafe-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-cafe-50 border border-cafe-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-cafe-800 placeholder-cafe-300 focus:outline-none focus:ring-2 focus:ring-cafe-300 focus:border-transparent"
          />
        </div>
        <button
          onClick={openAdd}
          className="ml-auto flex items-center gap-2 bg-cafe-700 hover:bg-cafe-800 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Add Item
        </button>
      </header>

      {/* Table */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-2xl border border-cafe-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cafe-100">
                {['Item', 'Category', 'Price', 'Stock', ''].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-cafe-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-cafe-50 hover:bg-cafe-50 transition-colors last:border-0">
                  <td className="px-5 py-3.5 font-semibold text-cafe-800">{p.name}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 rounded-lg bg-cafe-100 text-cafe-600 text-xs font-medium">{p.category}</span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-cafe-700">${p.price.toFixed(2)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      p.stock > 10 ? 'bg-green-100 text-green-700'
                      : p.stock > 0 ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-600'
                    }`}>
                      {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3 justify-end">
                      <button onClick={() => openEdit(p)} className="text-cafe-500 hover:text-cafe-800 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                      </button>
                      <button onClick={() => remove(p.id)} className="text-cafe-300 hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-cafe-300 text-sm">
                    No items found
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
          <div className="bg-white rounded-3xl shadow-2xl border border-cafe-100 p-7 w-[400px]">
            <h3 className="font-bold text-cafe-800 text-lg mb-5">{editing ? 'Edit Item' : 'New Menu Item'}</h3>
            <div className="space-y-4">
              {[
                { label: 'Item Name', key: 'name', type: 'text', placeholder: 'e.g. Caramel Latte' },
                { label: 'Price ($)', key: 'price', type: 'number', placeholder: '0.00' },
                { label: 'Stock Qty', key: 'stock', type: 'number', placeholder: '0' },
                { label: 'Category', key: 'category', type: 'text', placeholder: 'e.g. Coffee, Desserts' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-cafe-500 uppercase tracking-wide mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full border border-cafe-200 rounded-xl px-4 py-2.5 text-sm text-cafe-800 focus:outline-none focus:ring-2 focus:ring-cafe-400 focus:border-transparent bg-cafe-50"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-cafe-200 text-cafe-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-cafe-50 transition-colors">
                Cancel
              </button>
              <button onClick={save} className="flex-1 bg-cafe-700 hover:bg-cafe-800 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                {editing ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
