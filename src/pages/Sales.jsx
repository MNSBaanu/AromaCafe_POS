import { useState, useEffect } from 'react'

export default function Sales() {
  const [sales, setSales] = useState([])
  const [expanded, setExpanded] = useState(null)

  useEffect(() => { window.api.sales.getAll().then(setSales) }, [])

  const grandTotal = sales.reduce((s, sale) => s + sale.total, 0)

  return (
    <div className="h-screen bg-cafe-50 flex flex-col overflow-hidden">
      <header className="bg-white border-b border-cafe-100 px-6 h-16 flex items-center shrink-0">
        <div>
          <h1 className="font-bold text-cafe-800 text-base">Sales History</h1>
          <p className="text-xs text-cafe-400">{sales.length} transactions</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-cafe-400">Total Revenue</p>
          <p className="font-bold text-cafe-800 text-base">${grandTotal.toFixed(2)}</p>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        {sales.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-cafe-300">
            <span className="text-5xl mb-3">📋</span>
            <p className="text-sm font-medium">No sales yet</p>
          </div>
        )}
        <div className="space-y-2 max-w-3xl mx-auto">
          {sales.map(sale => (
            <div key={sale.id} className="bg-white rounded-2xl border border-cafe-100 shadow-sm overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-cafe-50 transition-colors text-left"
                onClick={() => setExpanded(expanded === sale.id ? null : sale.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-cafe-100 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-cafe-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                      <rect x="9" y="3" width="6" height="4" rx="1"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-cafe-800 text-sm">Order #{sale.id}</p>
                    <p className="text-xs text-cafe-400 mt-0.5">{sale.created_at}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-cafe-800">${sale.total.toFixed(2)}</span>
                  <svg className={`w-4 h-4 text-cafe-400 transition-transform ${expanded === sale.id ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </button>

              {expanded === sale.id && (
                <div className="px-5 pb-5 border-t border-cafe-50">
                  <table className="w-full text-sm mt-3">
                    <thead>
                      <tr className="text-cafe-400 text-xs uppercase">
                        <th className="text-left pb-2 font-semibold">Item</th>
                        <th className="text-right pb-2 font-semibold">Qty</th>
                        <th className="text-right pb-2 font-semibold">Price</th>
                        <th className="text-right pb-2 font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sale.items.map(item => (
                        <tr key={item.id} className="border-t border-cafe-50">
                          <td className="py-2 text-cafe-700">{item.product_name}</td>
                          <td className="py-2 text-right text-cafe-500">{item.quantity}</td>
                          <td className="py-2 text-right text-cafe-500">${item.price.toFixed(2)}</td>
                          <td className="py-2 text-right font-semibold text-cafe-800">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-3 pt-3 border-t border-cafe-100 text-sm space-y-1 text-right">
                    <div className="flex justify-end gap-8 text-cafe-500"><span>Total</span><span className="font-bold text-cafe-800">${sale.total.toFixed(2)}</span></div>
                    <div className="flex justify-end gap-8 text-cafe-500"><span>Cash</span><span>${sale.paid.toFixed(2)}</span></div>
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
