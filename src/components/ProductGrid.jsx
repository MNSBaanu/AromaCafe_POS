const BG_COLORS = [
  'bg-rose-50', 'bg-amber-50', 'bg-stone-100',
  'bg-red-50',  'bg-yellow-50', 'bg-orange-50', 'bg-zinc-100'
]

const EMOJI = {
  coffee: '☕', drinks: '🥤', beverages: '🧃', tea: '🍵',
  food: '🍽️', snacks: '🥐', pastry: '🥐', breakfast: '🍳',
  lunch: '🥗', desserts: '🍰', dessert: '🍰', cake: '🎂',
  juice: '🍊', pizza: '🍕', burger: '🍔', soup: '🍜',
  salad: '🥗', rice: '🍚', general: '🛒',
}

function getEmoji(cat = '') {
  return EMOJI[cat.toLowerCase()] ?? '🍽️'
}

function colorIdx(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % BG_COLORS.length
  return h
}

export default function ProductGrid({ products, onAdd }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-300">
        <span className="text-5xl mb-3">🍽️</span>
        <p className="text-sm font-medium text-gray-400">No items found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {products.map(p => {
        const outOfStock = p.stock <= 0
        const bg = BG_COLORS[colorIdx(p.category || 'general')]
        return (
          <button
            key={p.id}
            onClick={() => onAdd(p)}
            disabled={outOfStock}
            className={`group relative bg-white rounded-xl border border-gray-100 overflow-hidden text-left transition-all shadow-sm ${
              outOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md hover:border-[#d4849a] cursor-pointer'
            }`}
          >
            {/* Image area */}
            <div className={`${bg} h-28 flex items-center justify-center relative`}>
              <span className="text-5xl">{getEmoji(p.category)}</span>
              {/* Add button on hover */}
              {!outOfStock && (
                <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-[#9b2335] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm text-base font-bold leading-none">
                  +
                </div>
              )}
              {outOfStock && (
                <span className="absolute top-2 right-2 text-[10px] font-semibold bg-red-100 text-red-500 px-2 py-0.5 rounded-full">Sold out</span>
              )}
            </div>

            {/* Info */}
            <div className="px-3 py-2.5">
              <p className="text-sm font-semibold text-gray-800 truncate leading-snug">{p.name}</p>
              <p className="text-sm font-bold text-[#9b2335] mt-0.5">${p.price.toFixed(2)}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
