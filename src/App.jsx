import { useState } from 'react'
import POS from './pages/POS'
import Products from './pages/Products'
import Sales from './pages/Sales'

const nav = [
  {
    id: 'POS', label: 'Order',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    )
  },
  {
    id: 'Products', label: 'Menu',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/>
      </svg>
    )
  },
  {
    id: 'Sales', label: 'Sales',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    )
  },
]

export default function App() {
  const [tab, setTab] = useState('POS')

  return (
    <div className="flex h-screen bg-cafe-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-20 bg-cafe-800 flex flex-col items-center py-6 gap-2 shrink-0">
        {/* Brand mark */}
        <div className="mb-6 flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-2xl bg-cafe-400 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="white" strokeWidth={2}>
              <path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
              <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
            </svg>
          </div>
        </div>

        {nav.map(item => {
          const active = tab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex flex-col items-center gap-1.5 w-full py-3 px-2 transition-all ${
                active ? 'text-cafe-200' : 'text-cafe-500 hover:text-cafe-300'
              }`}
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                active ? 'bg-cafe-600 shadow-inner' : 'hover:bg-cafe-700'
              }`}>
                {item.icon}
              </div>
              <span className="text-[10px] font-semibold tracking-wide uppercase">{item.label}</span>
            </button>
          )
        })}

        <div className="mt-auto">
          <div className="w-9 h-9 rounded-full bg-cafe-600 border-2 border-cafe-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#d4b896" strokeWidth={1.8}>
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-hidden">
        {tab === 'POS'      && <POS />}
        {tab === 'Products' && <Products />}
        {tab === 'Sales'    && <Sales />}
      </main>
    </div>
  )
}
