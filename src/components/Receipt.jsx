export default function Receipt({ receipt, onClose }) {
  const subtotal = receipt.total / 1.05
  const tax = receipt.total - subtotal

  return (
    <div className="flex items-center justify-center h-full bg-slate-50">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-[400px]" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.10)' }}>
        {/* Success badge */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h2 className="font-bold text-gray-900 text-xl">Payment Successful</h2>
          <p className="text-gray-400 text-sm mt-1">{receipt.date}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-xs font-semibold text-gray-500">
            Order #{receipt.id}
          </span>
        </div>

        <div className="border-t border-dashed border-gray-200 my-5"/>

        <div className="space-y-2 mb-5">
          {receipt.items.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-[#ecfdf5] text-[#059669] text-[10px] font-bold flex items-center justify-center shrink-0">{item.quantity}</span>
                <span className="text-gray-700">{item.name}</span>
              </div>
              <span className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-gray-200 my-5"/>

        <div className="space-y-2 text-sm mb-6">
          <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-gray-500"><span>Tax (5%)</span><span>${tax.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
            <span>Total</span><span className="text-[#9b2335]">${receipt.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-500"><span>Cash Received</span><span>${receipt.paid.toFixed(2)}</span></div>
          <div className="flex justify-between font-semibold text-green-600 bg-green-50 rounded-lg px-3 py-2 -mx-3">
            <span>Change</span><span>${receipt.change.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm1-4h4v4H10v-4z"/>
            </svg>
            Print
          </button>
          <button
            onClick={onClose}
            className="flex-[2] bg-[#059669] hover:bg-[#047857] text-white py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm"
          >
            New Order
          </button>
        </div>
      </div>
    </div>
  )
}
