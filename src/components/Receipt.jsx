export default function Receipt({ receipt, onClose }) {
  return (
    <div className="flex items-center justify-center h-full bg-cafe-50">
      <div className="bg-white rounded-3xl shadow-xl border border-cafe-100 p-8 w-[380px]">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h2 className="font-bold text-cafe-800 text-xl">Order Complete</h2>
          <p className="text-cafe-400 text-sm mt-1">{receipt.date}</p>
          <p className="text-cafe-300 text-xs mt-0.5">Receipt #{receipt.id}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-cafe-200 my-4"/>

        {/* Items */}
        <div className="space-y-2 mb-4">
          {receipt.items.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-cafe-700">{item.name} <span className="text-cafe-400">×{item.quantity}</span></span>
              <span className="font-medium text-cafe-800">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-cafe-200 my-4"/>

        {/* Totals */}
        <div className="space-y-1.5 text-sm mb-6">
          <div className="flex justify-between text-cafe-500">
            <span>Subtotal</span>
            <span>${(receipt.total / 1.05).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-cafe-500">
            <span>Tax (5%)</span>
            <span>${(receipt.total - receipt.total / 1.05).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-cafe-800 text-base pt-1">
            <span>Total</span>
            <span>${receipt.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-cafe-500">
            <span>Cash</span>
            <span>${receipt.paid.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-green-600">
            <span>Change</span>
            <span>${receipt.change.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-cafe-700 hover:bg-cafe-800 text-white py-3 rounded-2xl font-bold text-sm transition-colors"
        >
          New Order
        </button>
      </div>
    </div>
  )
}
