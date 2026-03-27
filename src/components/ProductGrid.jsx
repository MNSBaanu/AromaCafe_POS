const CATEGORY_COLORS = {
  coffee:     { bg: 'bg-amber-50',   icon: '☕', accent: 'border-amber-200' },
  drinks:     { bg: 'bg-sky-50',     icon: '🥤', accent: 'border-sky-200' },
  beverages:  { bg: 'bg-cyan-50',    icon: '🧃', accent: 'border-cyan-200' },
  tea:        { bg: 'bg-green-50',   icon: '🍵', accent: 'border-green-200' },
  food:       { bg: 'bg-orange-50',  icon: '🍽️', accent: 'border-orange-200' },
  snacks:     { bg: 'bg-yellow-50',  icon: '🥐', accent: 'border-yellow-200' },
  pastry:     { bg: 'bg-rose-50',    icon: '🥐', accent: 'border-rose-200' },
  breakfast:  { bg: 'bg-orange-50',  icon: '🍳', accent: 'border-orange-200' },
  lunch:      { bg: 'bg-lime-50',    icon: '🥗', accent: 'border-lime-200' },
  desserts:   { bg: 'bg-pink-50',    icon: '🍰', accent: 'border-pink-200' },
  dessert:    { bg: 'bg-pink-50',    icon: '🍰', accent: 'border-pink-200' },
  cake:       { bg: 'bg-fuchsia-50', icon: '🎂', accent: 'border-fuchsia-200' },
  juice:      { bg: 'bg-orange-50',  icon: '🍊', accent: 'border-orange-200' },
  pizza:      { bg: 'bg-red-50',     icon: '🍕', accent: 'border-red-200' },
  burger:     { bg: 'bg-yellow-50',  icon: '🍔', accent: 'border-yellow-200' },
  soup:       { bg: 'bg-amber-50',   icon: '🍜', accent: 'border-amber-200' },
  salad:      { bg: 'bg-green-50',   icon: '🥗', accent: 'border-green-200' },
  rice:       { bg: 'bg-stone-50',   icon: '🍚', accent: 'border-stone-200' },
  general:    { bg: 'bg-slate-50',   icon: '🛒', accent: 'border-slate-200' },
}

const FALLBACK_COLORS = [
  { bg: 'bg-rose-50',    icon: '🍽️', accent: 'border-rose-200' },
  { bg: 'bg-amber-50',   icon: '🍽️', accent: 'border-amber-200' },
  { bg: 'bg-sky-50',     icon: '🍽️', accent: 'border-sky-200' },
  { bg: 'bg-violet-50',  icon: '🍽️', accent: 'border-violet-200' },
  { bg: 'bg-teal-50',    icon: '🍽️', accent: 'border-teal-200' },
]

function getCategoryStyle(cat = '') {
  const key = cat.toLowerCase()
  if (CATEGORY_COLORS[key]) return CATEGORY_COLORS[key]
  let h = 0
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % FALLBACK_COLORS.length
  return FALLBACK_COLORS[h]
}

export default function ProductGrid({ products, onAdd }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-300">
        <span className="text-5xl mb-3">🍽️</span>
        <p className="text-sm font-semibold text-gray-400">No items found</p>
        <p className="text-xs text-gray-300 mt-1">Try a different search or category</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {products.map(p => {
        const outOfStock = p.stock <= 0
        const style = getCategoryStyle(p.category)
        return (
          <button
            key={p.id}
            onClick={() => onAdd(p)}
            disabled={outOfStock}
            className={`group relative bg-white rounded-xl border overflow-hidden text-left transition-all duration-200 ${
              outOfStock
                ? 'opacity-50 cursor-not-allowed border-gray-100'
                : `hover:shadow-md hover:-translate-y-0.5 cursor-pointer border-gray-100 hover:border-[#059669]/25`
            }`}
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
          >
            {/* Image area */}
            <div className={`${style.bg} h-24 flex items-center justify-center relative border-b ${style.accent}`}>
              <span className="text-4xl">{style.icon}</span>

              {!outOfStock && (
                <div className="absolute inset-0 bg-[#059669]/0 group-hover:bg-[#059669]/5 transition-colors duration-200 flex items-end justify-end p-2">
                  <div className="w-7 h-7 bg-[#059669] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md text-lg font-bold leading-none translate-y-1 group-hover:translate-y-0">
                    +
                  </div>
                </div>
              )}

              {outOfStock && (
                <span className="absolute top-2 left-2 text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-md">Sold Out</span>
              )}

              {p.stock > 0 && p.stock <= 5 && (
                <span className="absolute top-2 left-2 text-[10px] font-bold bg-amber-400 text-white px-2 py-0.5 rounded-md">Low Stock</span>
              )}
            </div>

            {/* Info */}
            <div className="px-3 py-2.5">
              <p className="text-sm font-semibold text-gray-800 truncate leading-snug">{p.name}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-base font-bold text-[#059669]">${p.price.toFixed(2)}</p>
                <span className="text-xs text-gray-400 font-medium">{p.stock > 0 ? `${p.stock} left` : p.category}</span>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
