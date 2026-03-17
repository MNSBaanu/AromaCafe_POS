import { useState } from 'react'

const TAX_RATE = 0.05

export default function Cart({ cart, onUpdateQty, onRemove, onCheckout }) {
  const [paid, setPaid] = useState('')
  const [error, setError] = useState('')
  const [showPayment, setShowPayment] = useState(false)

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax
  const paidNum = parseFloat(paid) || 0

  // order number mock
  const orderNum = 20

  function handleBillPayment() {
    if (cart.length === 0) return setError('Add items first')
    setShowPayment(true)
    setError('')
  }

  function handleConfirm() {
    if (paidNum < total) return setError('Insufficient amount')
    setError('')
    setShowPayment(false)
    onCheckout(paidNum)
    setPaid('')
  }

  function clearCart() {
    cart.forEach(i => onRemove(i.id))
    setShowPayment(false)
    setPaid('')
    setError('')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 shrink-0">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search in Existing"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-4 py-2 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4849a] focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 mt-2">
          <select className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-600 bg-white focus:outline-none appearance-none cursor-pointer">
            <option>Select Dining</option>
            <option>Dine In</option>
            <option>Take Away</option>
          </select>
          <select className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-600 bg-white focus:outline-none appearance-none cursor-pointer">
            <option>Select Table</option>
            <option>Table 1</option>
            <option>Table 2</option>
            <option>Table 3</option>
          </select>
        </div>
      </div>

      {/* Order label */}
      <div className="px-4 py-2.5 flex items-center gap-2 border-b border-gray-100 shrink-0">
        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <span className="text-sm font-semibold text-gray-700">Order #{orderNum}</span>
        {cart.length > 0 && (
          <button onClick={clearCart} className="ml-auto text-xs text-gray-400 hover:text-red-400 transition-colors">Clear</button>
        )}
      </div>

      {/* Items */}
      <div className="flex-1 overflow-auto px-4 py-2 space-y-2">
        {cart.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-300 py-10">
            <span className="text-4xl mb-2">🛒</span>
            <p className="text-sm text-gray-400 font-medium">No items yet</p>
            <p className="text-xs text-gray-300 mt-1">Click a product to add</p>
          </div>
        )}

        {cart.map(item => (
          <div key={item.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-xs text-[#9b2335] font-medium mt-0.5">
                  ${item.price.toFixed(2)} × {item.quantity} = <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </p>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center shrink-0 transition-colors"
              >
                <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                  className="w-6 h-6 rounded-md border border-gray-200 bg-white hover:bg-gray-100 text-gray-600 font-bold text-sm flex items-center justify-center transition-colors"
                >−</button>
                <span className="text-sm font-semibold text-gray-700 w-5 text-center">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                  className="w-6 h-6 rounded-md border border-gray-200 bg-white hover:bg-gray-100 text-gray-600 font-bold text-sm flex items-center justify-center transition-colors"
                >+</button>
              </div>
              <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Add Notes
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-gray-100 px-4 pt-3 pb-4">
        {/* Totals */}
        <div className="space-y-1.5 mb-3">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Sub total :</span>
            <span className="font-medium text-gray-700">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Tax (5%) :</span>
            <span className="font-medium text-gray-700">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Discount :</span>
            <span className="font-medium text-gray-700">$0.00</span>
          </div>
          <div className="flex justify-between font-bold text-gray-800 text-sm pt-2 border-t border-gray-100">
            <span>Total :</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment input */}
        {showPayment && (
          <div className="mb-3 space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Cash Received</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={paid}
              onChange={e => { setPaid(e.target.value); setError('') }}
              placeholder={`Min. $${total.toFixed(2)}`}
              autoFocus
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d4849a] bg-gray-50"
            />
            {paid && paidNum >= total && (
              <div className="flex justify-between text-sm font-semibold text-green-600 bg-green-50 rounded-lg px-3 py-2">
                <span>Change</span>
                <span>${(paidNum - total).toFixed(2)}</span>
              </div>
            )}
          </div>
        )}

        {error && <p className="text-xs text-red-500 font-medium mb-2">{error}</p>}

        {/* Action buttons */}
        {showPayment ? (
          <div className="flex gap-2">
            <button
              onClick={() => { setShowPayment(false); setError('') }}
              className="flex-1 py-2.5 rounded-lg border border-[#d4849a] text-[#9b2335] text-sm font-semibold hover:bg-[#fdf0f2] transition-colors"
            >Back</button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-2.5 rounded-lg bg-[#7c4a1e] hover:bg-[#6a3d18] text-white text-sm font-bold transition-colors"
            >Confirm</button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <button
                onClick={() => { if (cart.length > 0) alert('KOT sent to kitchen') }}
                className="flex-1 py-2.5 rounded-lg bg-[#7c4a1e] hover:bg-[#6a3d18] text-white text-xs font-bold transition-colors"
              >KOT &amp; Print</button>
              <button className="flex-1 py-2.5 rounded-lg border border-[#d4849a] text-[#9b2335] text-xs font-semibold hover:bg-[#fdf0f2] transition-colors">
                Draft
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleBillPayment}
                className="flex-1 py-2.5 rounded-lg bg-[#9b2335] hover:bg-[#7d1c2b] text-white text-xs font-bold transition-colors"
              >Bill &amp; Payment</button>
              <button
                onClick={handleBillPayment}
                className="flex-1 py-2.5 rounded-lg bg-[#7c4a1e] hover:bg-[#6a3d18] text-white text-xs font-bold transition-colors"
              >Bill &amp; Print</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
