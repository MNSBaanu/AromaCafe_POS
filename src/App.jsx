import { useState } from 'react'
import POS from './pages/POS'
import Products from './pages/Products'
import Sales from './pages/Sales'

const NAV = [
  {
    section: null,
    items: [
      { id: 'Dashboard', label: 'Dashboard', icon: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></> },
      { id: 'POS',       label: 'Point of Sale', icon: <><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></> },
      { id: 'Products',  label: 'Menu Items',    icon: <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></> },
      { id: 'Sales',     label: 'Sales',         icon: <><path d="M9 17H5a2 2 0 00-2 2"/><path d="M9 3H5a2 2 0 00-2 2v4"/><rect x="9" y="11" width="13" height="10" rx="2"/><path d="M9 7h13"/></> },
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
      { id: 'Settings', label: 'Settings',  icon: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></> },
    ]
  }
]

export default function App() {
  const [tab, setTab] = useState('POS')

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-52 bg-white border-r border-gray-100 flex flex-col shrink-0" style={{ boxShadow: '1px 0 0 0 #f1f5f9' }}>
        {/* Logo */}
        <div className="px-5 py-4 flex items-center gap-3 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#059669] to-[#047857] flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 24 24" fill="white" className="w-4.5 h-4.5 w-[18px] h-[18px]">
              <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-base leading-tight">Aroma Cafe</p>
            <p className="text-xs text-gray-400 font-medium">POS System</p>
          </div>
        </div>

        {/* User */}
        <div className="px-4 py-3 mx-3 my-3 rounded-xl bg-gradient-to-r from-[#ecfdf5] to-emerald-50 border border-emerald-100 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white border border-emerald-200 flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="#059669" strokeWidth={2}>
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">Cashier</p>
            <p className="text-xs text-[#059669] font-medium truncate">● Online</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-auto py-1 px-3 space-y-5">
          {NAV.map((group, gi) => (
            <div key={gi}>
              {group.section && (
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] px-2 mb-1.5">{group.section}</p>
              )}
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const active = tab === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => setTab(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                        active
                          ? 'bg-[#059669] text-white shadow-sm'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                      }`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
                        {item.icon}
                      </svg>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] font-bold bg-amber-400 text-white px-1.5 py-0.5 rounded-full leading-none">{item.badge}</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-3 border-t border-gray-100 space-y-0.5">
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all">
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={1.8}>
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-hidden flex flex-col min-w-0">
        {tab === 'POS'      && <POS />}
        {tab === 'Products' && <Products />}
        {tab === 'Sales'    && <Sales />}
        {!['POS','Products','Sales'].includes(tab) && (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-3">
            <svg className="w-12 h-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            <p className="text-sm font-medium text-gray-400">{tab} — coming soon</p>
          </div>
        )}
      </main>
    </div>
  )
}
