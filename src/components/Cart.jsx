import { useState } from 'react'

const TAX_RATE = 0.05

export default function Cart({ cart, onUpdateQty, onRemove, onCheckout }) {
  const [paid, setPaid] = useState('')
  const [error, setError] = useState('')
  const [showPayment, setShowPayment] = useState(false)
  const [payMethod, setPayMethod] = useState('cash')

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax
  const paidNum = parseFloat(paid) || 0
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0)
  const orderNum = 20

  function handleBillPayment() {
    if (cart.length === 0) return setError('Add items to the order first')
    setShowPayment(true)
    setError('')
  }

  function handleConfirm() {
    if (payMethod === 'cash' && paidNum < total) return setError('Amount received is less than total')
    setError('')
    setShowPayment(false)
    onCheckout(payMethod === 'cash' ? paidNum : total)
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
      <div className="px-4 pt-4 pb-3 border-b border-gray-100 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#059669] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <div>
              <p className="text-base font-bold text-gray-900">Order #{orderNum}</p>
              <p className="text-xs text-gray-400">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
            </div>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-medium text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              Clear
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <select className="flex-1 border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-600 bg-gray-50 focus:outline-none appearance-none cursor-pointer">
            <option>Dine In</option>
            <option>Take Away</option>
            <option>Delivery</option>
          </select>
          <select className="flex-1 border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-600 bg-gray-50 focus:outline-none appearance-none cursor-pointer">
            <option>Table 1</option>
            <option>Table 2</option>
            <option>Table 3</option>
            <option>Table 4</option>
          </select>
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-auto px-3 py-2 space-y-1.5">
        {cart.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-300 py-10 gap-2">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
              <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-400">Cart is empty</p>
            <p className="text-xs text-gray-300">Select items from the menu</p>
          </div>
        )}
        {cart.map((item, idx) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-3" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-md bg-[#ecfdf5] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-[#059669]">{idx + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">${item.price.toFixed(2)} each</p>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="w-5 h-5 rounded-md hover:bg-red-50 flex items-center justify-center shrink-0 transition-colors group"
              >
                <svg className="w-3 h-3 text-gray-300 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between mt-2.5">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                  className="w-6 h-6 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 font-bold text-sm flex items-center justify-center transition-colors"
                >−</button>
                <span className="text-sm font-bold text-gray-800 w-5 text-center">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                  className="w-6 h-6 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 font-bold text-sm flex items-center justify-center transition-colors"
                >+</button>
              </div>
              <p className="text-base font-bold text-[#059669]">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-gray-100 bg-white">
        <div className="px-4 pt-3 pb-2 space-y-1.5">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span className="font-medium text-gray-700">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Tax (5%)</span>
            <span className="font-medium text-gray-700">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Discount</span>
            <span className="font-medium text-green-600">— $0.00</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100 mt-1">
            <span>Total</span>
            <span className="font-bold text-[#059669]">${total.toFixed(2)}</span>
          </div>
        </div>

        {showPayment && (
          <div className="px-4 pb-3 space-y-2.5 border-t border-gray-100 pt-3">
            <div className="flex gap-1.5">
              {[
                { id: 'cash', label: 'Cash', icon: <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/> },
                { id: 'card', label: 'Card', icon: <><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></> },
                { id: 'qr',   label: 'QR Pay', icon: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 17h.01M17 14h.01"/></> },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setPayMethod(m.id)}
                  className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg border text-xs font-semibold transition-all ${
                    payMethod === m.id
                      ? 'bg-[#059669] border-[#059669] text-white'
                      : 'border-gray-200 text-gray-500 hover:border-[#059669]/30 hover:text-[#059669]'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>{m.icon}</svg>
                  {m.label}
                </button>
              ))}
            </div>

            {payMethod === 'cash' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cash Received</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={paid}
                  onChange={e => { setPaid(e.target.value); setError('') }}
                  placeholder={`Min. $${total.toFixed(2)}`}
                  autoFocus
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669]/40 bg-gray-50 transition-all"
                />
                <div className="flex gap-1.5">
                  {[Math.ceil(total), Math.ceil(total / 5) * 5 + 5, Math.ceil(total / 10) * 10 + 10].map(amt => (
                    <button
                      key={amt}
                      onClick={() => { setPaid(String(amt)); setError('') }}
                      className="flex-1 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:border-[#059669]/30 hover:text-[#059669] hover:bg-[#ecfdf5] transition-all"
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                {paid && paidNum >= total && (
                  <div className="flex justify-between text-sm font-bold text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                    <span>Change</span>
                    <span>${(paidNum - total).toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}

            {payMethod !== 'cash' && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-center">
                <p className="text-sm font-semibold text-gray-600">Amount to charge</p>
                <p className="text-2xl font-bold text-[#059669] mt-0.5">${total.toFixed(2)}</p>
                <p className="text-xs text-gray-400 mt-1">{payMethod === 'card' ? 'Tap or insert card' : 'Scan QR code to pay'}</p>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mx-4 mb-2 px-3 py-2 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}

        <div className="px-4 pb-4 space-y-2">
          {showPayment ? (
            <div className="flex gap-2">
              <button
                onClick={() => { setShowPayment(false); setError('') }}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-[2] py-2.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold transition-colors shadow-sm"
              >
                Confirm Payment
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <button
                  onClick={() => { if (cart.length > 0) alert('KOT sent to kitchen') }}
                  className="flex-1 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-colors"
                >
                  KOT &amp; Print
                </button>
                <button className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors">
                  Save Draft
                </button>
              </div>
              <button
                onClick={handleBillPayment}
                className="w-full py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-base font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                Charge ${total.toFixed(2)}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
