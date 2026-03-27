import { useState, useEffect } from 'react'

export default function Sales() {
  const [sales, setSales] = useState([])
  const [expanded, setExpanded] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => { window.api.sales.getAll().then(setSales) }, [])

  const grandTotal = sales.reduce((s, sale) => s + sale.total, 0)
  const avgOrder = sales.length > 0 ? grandTotal / sales.length : 0

  const filtered = sales.filter(s =>
    String(s.id).includes(search) || (s.created_at || '').includes(search)
  )

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center gap-4 shrink-0">
        <div>
          <h1 className="font-bold text-gray-900 text-base">Sales History</h1>
          <p className="text-xs text-gray-400 leading-none mt-0.5">
            <span className="text-gray-500">Dashboard</span>
            <span className="mx-1 text-gray-300">/</span>
            <span className="text-[#059669] font-medium">Sales</span>
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className="h-8 px-3 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center gap-1.5 text-xs font-medium transition-all">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Export
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-6 shrink-0">
        {[
          { label: 'Total Orders', value: sales.length, icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>, color: 'bg-blue-50 text-blue-500' },
          { label: 'Total Revenue', value: `$${grandTotal.toFixed(2)}`, icon: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>, color: 'bg-[#ecfdf5] text-[#059669]' },
          { label: 'Avg. Order Value', value: `$${avgOrder.toFixed(2)}`, icon: <><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></>, color: 'bg-green-50 text-green-600' },
        ].map(stat => (
          <div key={stat.label} className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center shrink-0`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>{stat.icon}</svg>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{stat.label}</p>
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className="w-px h-8 bg-gray-100"/>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-5">
        {sales.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-300 gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
              <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                <rect x="9" y="3" width="6" height="4" rx="1"/>
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-400">No sales yet</p>
            <p className="text-xs text-gray-300">Completed orders will appear here</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-2">
            {/* Search */}
            <div className="relative mb-4">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search by order ID or date..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669]/40 transition-all"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
              />
            </div>

            {filtered.map(sale => (
              <div
                key={sale.id}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
              >
                <button
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50/80 transition-colors text-left"
                  onClick={() => setExpanded(expanded === sale.id ? null : sale.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#ecfdf5] border border-emerald-100 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#059669]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                        <rect x="9" y="3" width="6" height="4" rx="1"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Order #{sale.id}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{sale.created_at}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2.5 py-1 rounded-lg bg-green-50 text-green-700 text-sm font-bold border border-green-100">Paid</span>
                    <span className="font-bold text-gray-900 text-base">${sale.total.toFixed(2)}</span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expanded === sale.id ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </button>

                {expanded === sale.id && (
                  <div className="border-t border-gray-100 bg-slate-50/60 px-5 pb-4 pt-3">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-400 text-xs uppercase tracking-wider">
                          <th className="text-left pb-2 font-bold">Item</th>
                          <th className="text-right pb-2 font-bold">Qty</th>
                          <th className="text-right pb-2 font-bold">Unit Price</th>
                          <th className="text-right pb-2 font-bold">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sale.items.map(item => (
                          <tr key={item.id} className="border-t border-gray-100">
                            <td className="py-2 text-gray-700 font-medium">{item.product_name}</td>
                            <td className="py-2 text-right text-gray-500">{item.quantity}</td>
                            <td className="py-2 text-right text-gray-500">${item.price.toFixed(2)}</td>
                            <td className="py-2 text-right font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-1.5 text-sm">
                      <div className="flex justify-end gap-8 text-gray-500"><span>Total</span><span className="font-bold text-gray-900">${sale.total.toFixed(2)}</span></div>
                      <div className="flex justify-end gap-8 text-gray-500"><span>Cash</span><span>${sale.paid.toFixed(2)}</span></div>
                      <div className="flex justify-end gap-8 text-green-600 font-bold"><span>Change</span><span>${sale.change.toFixed(2)}</span></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
