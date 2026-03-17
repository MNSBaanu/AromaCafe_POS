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

  function handleProceed() {
    if (cart.length === 0) return setError('Add items to proceed')
    setShowPayment(true)
    setError('')
  }

  function handleConfirm() {
    if (paidNum < total) return setError('Amount paid is insufficient')
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
      <div className="px-5 py-4 border-b border-cafe-100 shrink-0 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-cafe-800 text-base">Current Order</h2>
          <p className="text-xs text-cafe-400 mt-0.5">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
        </div>
        {cart.length > 0 && (
          <button onClick={clearCart} className="text-xs text-cafe-400 hover:text-red-400 transition-colors font-medium">
            Clear all
          </button>
        )}
      </div>

      {/* Items */}
      <div className="flex-1 overflow-auto px-5 py-3 space-y-1">
        {cart.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-cafe-300 py-10">
            <span className="text-4xl mb-2">🛒</span>
            <p className="text-sm font-medium">Your order is empty</p>
            <p className="text-xs mt-1">Tap an item to add it</p>
          </div>
        )}
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-3 py-2.5 border-b border-cafe-50 last:border-0">
            {/* Qty controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                className="w-6 h-6 rounded-lg bg-cafe-100 hover:bg-cafe-200 text-cafe-700 font-bold text-sm flex items-center justify-center transition-colors"
              >−</button>
              <span className="w-5 text-center text-sm font-semibold text-cafe-800">{item.quantity}</span>
              <button
                onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                className="w-6 h-6 rounded-lg bg-cafe-100 hover:bg-cafe-200 text-cafe-700 font-bold text-sm flex items-center justify-center transition-colors"
              >+</button>
            </div>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-cafe-800 truncate">{item.name}</p>
              <p className="text-xs text-cafe-400">${item.price.toFixed(2)} each</p>
            </div>

            {/* Price + remove */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm font-bold text-cafe-700">${(item.price * item.quantity).toFixed(2)}</span>
              <button
                onClick={() => onRemove(item.id)}
                className="w-5 h-5 rounded-full bg-cafe-100 hover:bg-red-100 flex items-center justify-center transition-colors"
              >
                <svg className="w-3 h-3 text-cafe-400 hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-cafe-100 px-5 pt-4 pb-5 space-y-3">
        {/* Totals */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm text-cafe-500">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-cafe-500">
            <span>Tax (5%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-cafe-800 text-base pt-2 border-t border-cafe-100">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment input */}
        {showPayment && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-cafe-600 uppercase tracking-wide">Cash Received</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={paid}
              onChange={e => { setPaid(e.target.value); setError('') }}
              placeholder={`Min. $${total.toFixed(2)}`}
              autoFocus
              className="w-full border border-cafe-200 rounded-xl px-4 py-2.5 text-sm text-cafe-800 focus:outline-none focus:ring-2 focus:ring-cafe-400 focus:border-transparent bg-cafe-50"
            />
            {paid && paidNum >= total && (
              <div className="flex justify-between text-sm font-semibold text-green-600 bg-green-50 rounded-xl px-3 py-2">
                <span>Change</span>
                <span>${(paidNum - total).toFixed(2)}</span>
              </div>
            )}
          </div>
        )}

        {error && (
          <p className="text-xs text-red-500 font-medium">{error}</p>
        )}

        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          {showPayment ? (
            <>
              <button
                onClick={() => { setShowPayment(false); setError('') }}
                className="flex-1 py-3 rounded-xl border border-cafe-200 text-cafe-600 text-sm font-semibold hover:bg-cafe-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors shadow-sm"
              >
                Confirm
              </button>
            </>
          ) : (
            <button
              onClick={handleProceed}
              className="w-full py-3 rounded-xl bg-cafe-700 hover:bg-cafe-800 text-white text-sm font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Place Order · ${total.toFixed(2)}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
