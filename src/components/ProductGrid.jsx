// Emoji icons per category for a café feel
const CATEGORY_ICONS = {
  coffee:     '☕',
  drinks:     '🥤',
  beverages:  '🧃',
  food:       '🍽️',
  snacks:     '🥐',
  desserts:   '🍰',
  dessert:    '🍰',
  breakfast:  '🍳',
  lunch:      '🥗',
  pastry:     '🥐',
  cake:       '🎂',
  tea:        '🍵',
  juice:      '🍊',
  general:    '🛒',
}

function getCategoryIcon(category = '') {
  return CATEGORY_ICONS[category.toLowerCase()] ?? '☕'
}

const CARD_ACCENTS = [
  'bg-amber-50 border-amber-100',
  'bg-orange-50 border-orange-100',
  'bg-yellow-50 border-yellow-100',
  'bg-lime-50 border-lime-100',
  'bg-teal-50 border-teal-100',
  'bg-sky-50 border-sky-100',
  'bg-rose-50 border-rose-100',
]

function accentIndex(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % CARD_ACCENTS.length
  return h
}

export default function ProductGrid({ products, onAdd }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-cafe-300">
        <span className="text-5xl mb-3">☕</span>
        <p className="text-sm font-medium">No items found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {products.map(p => {
        const outOfStock = p.stock <= 0
        const accent = CARD_ACCENTS[accentIndex(p.category || 'general')]
        return (
          <button
            key={p.id}
            onClick={() => onAdd(p)}
            disabled={outOfStock}
            className={`group relative rounded-2xl border p-4 text-left transition-all ${accent} ${
              outOfStock
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer active:scale-95'
            }`}
          >
            {/* Icon */}
            <div className="text-3xl mb-3 leading-none">{getCategoryIcon(p.category)}</div>

            <p className="font-semibold text-cafe-800 text-sm leading-snug line-clamp-2 mb-1">{p.name}</p>
            <p className="text-xs text-cafe-400 mb-2">{p.category}</p>

            <div className="flex items-center justify-between">
              <span className="font-bold text-cafe-700 text-sm">${p.price.toFixed(2)}</span>
              {outOfStock
                ? <span className="text-[10px] text-red-400 font-medium">Sold out</span>
                : <span className="text-[10px] text-cafe-400">{p.stock} left</span>
              }
            </div>

            {/* Add indicator on hover */}
            {!outOfStock && (
              <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-cafe-700 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold">
                +
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
