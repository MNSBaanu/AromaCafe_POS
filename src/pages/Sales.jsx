import { useState, useEffect } from 'react'

export default function Sales() {
  const [sales, setSales] = useState([])
  const [expanded, setExpanded] = useState(null)

  useEffect(() => { window.api.sales.getAll().then(setSales) }, [])

  const grandTotal = sales.reduce((s, sale) => s + sale.total, 0)

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center gap-4 shrink-0">
        <div className="relative w-64">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Search (Ctrl+/)" className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none" readOnly />
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
          <h1 className="font-bold text-gray-800 text-base">Sales History</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            <span className="text-gray-500">Dashboard</span>
            <span className="mx-1.5 text-gray-300">•</span>
            <span className="text-[#9b2335]">Sales</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Total Revenue</p>
          <p className="font-bold text-gray-800">${grandTotal.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-5">
        {sales.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-300">
            <span className="text-5xl mb-3">📋</span>
            <p className="text-sm font-medium text-gray-400">No sales yet</p>
          </div>
        )}
        <div className="space-y-2 max-w-3xl mx-auto">
          {sales.map(sale => (
            <div key={sale.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors text-left"
                onClick={() => setExpanded(expanded === sale.id ? null : sale.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#fdf0f2] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#9b2335]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                      <rect x="9" y="3" width="6" height="4" rx="1"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Order #{sale.id}</p>
                    <p className="text-xs text-gray-400">{sale.created_at}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-800">${sale.total.toFixed(2)}</span>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${expanded === sale.id ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </button>

              {expanded === sale.id && (
                <div className="px-5 pb-4 border-t border-gray-50 bg-gray-50">
                  <table className="w-full text-sm mt-3">
                    <thead>
                      <tr className="text-gray-400 text-xs uppercase">
                        <th className="text-left pb-2 font-semibold">Item</th>
                        <th className="text-right pb-2 font-semibold">Qty</th>
                        <th className="text-right pb-2 font-semibold">Price</th>
                        <th className="text-right pb-2 font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sale.items.map(item => (
                        <tr key={item.id} className="border-t border-gray-100">
                          <td className="py-2 text-gray-700">{item.product_name}</td>
                          <td className="py-2 text-right text-gray-500">{item.quantity}</td>
                          <td className="py-2 text-right text-gray-500">${item.price.toFixed(2)}</td>
                          <td className="py-2 text-right font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-3 pt-3 border-t border-gray-200 text-sm space-y-1">
                    <div className="flex justify-end gap-8 text-gray-500"><span>Total</span><span className="font-bold text-gray-800">${sale.total.toFixed(2)}</span></div>
                    <div className="flex justify-end gap-8 text-gray-500"><span>Cash</span><span>${sale.paid.toFixed(2)}</span></div>
                    <div className="flex justify-end gap-8 text-green-600 font-semibold"><span>Change</span><span>${sale.change.toFixed(2)}</span></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
