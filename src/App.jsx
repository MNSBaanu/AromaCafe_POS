import { useState } from 'react'
import POS from './pages/POS'
import Products from './pages/Products'
import Sales from './pages/Sales'

const NAV = [
  {
    section: null,
    items: [
      { id: 'Dashboard', label: 'Dashboard', icon: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></> },
      { id: 'POS',       label: 'Pos',       icon: <><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></> },
      { id: 'Products',  label: 'Menu',      icon: <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></> },
      { id: 'Sales',     label: 'Sales',     icon: <><path d="M9 17H5a2 2 0 00-2 2"/><path d="M9 3H5a2 2 0 00-2 2v4"/><rect x="9" y="11" width="13" height="10" rx="2"/><path d="M9 7h13"/></> },
    ]
  },
  {
    section: 'Offering',
    items: [
      { id: 'Delivery', label: 'Delivery',  icon: <><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></> },
      { id: 'Payments', label: 'Payments',  icon: <><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></>, badge: 'New' },
      { id: 'Customer', label: 'Customer',  icon: <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></> },
      { id: 'Invoice',  label: 'Invoice',   icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></> },
    ]
  },
  {
    section: 'Back Office',
    items: [
      { id: 'Reports',  label: 'Reports',   icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></> },
      { id: 'Settings', label: 'Setting',   icon: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></> },
    ]
  }
]

export default function App() {
  const [tab, setTab] = useState('POS')

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-48 bg-white border-r border-gray-100 flex flex-col shrink-0 shadow-sm">
        {/* Logo */}
        <div className="px-5 py-5 flex items-center gap-2.5 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-[#9b2335] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
              <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
            </svg>
          </div>
          <span className="font-bold text-gray-800 text-sm">Aroma Cafe</span>
        </div>

        {/* User */}
        <div className="px-5 py-4 flex items-center gap-3 border-b border-gray-100">
          <div className="w-8 h-8 rounded-full bg-[#fdf0f2] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="#9b2335" strokeWidth={2}>
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-800 truncate">Cashier</p>
            <p className="text-[10px] text-gray-400 truncate">Point of Sale</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-auto py-3 px-3 space-y-4">
          {NAV.map((group, gi) => (
            <div key={gi}>
              {group.section && (
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-2 mb-1">{group.section}</p>
              )}
              {group.items.map(item => {
                const active = tab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setTab(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? 'bg-[#fdf0f2] text-[#9b2335] font-semibold'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" stroke="currentColor" strokeWidth={1.8}>
                      {item.icon}
                    </svg>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-bold bg-[#7c4a1e] text-white px-1.5 py-0.5 rounded-full">{item.badge}</span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.8}>
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-hidden flex flex-col">
        {tab === 'POS'      && <POS />}
        {tab === 'Products' && <Products />}
        {tab === 'Sales'    && <Sales />}
        {!['POS','Products','Sales'].includes(tab) && (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">{tab} — coming soon</div>
        )}
      </main>
    </div>
  )
}
