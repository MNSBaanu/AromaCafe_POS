import { useState, useEffect, useCallback } from 'react'

let _addToast = null

export function toast(message, type = 'success') {
  if (_addToast) _addToast(message, type)
}

const ICONS = {
  success: <path d="M5 13l4 4L19 7"/>,
  error:   <><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></>,
  info:    <><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></>,
}
const COLORS = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error:   'bg-red-50 border-red-200 text-red-800',
  info:    'bg-blue-50 border-blue-200 text-blue-800',
}
const ICON_COLORS = {
  success: 'text-emerald-500',
  error:   'text-red-500',
  info:    'text-blue-500',
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([])

  const add = useCallback((message, type) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type, exiting: false }])
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t))
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 300)
    }, 2700)
  }, [])

  useEffect(() => { _addToast = add; return () => { _addToast = null } }, [add])

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium pointer-events-auto
            ${COLORS[t.type]} ${t.exiting ? 'toast-exit' : 'toast-enter'}`}
        >
          <svg className={`w-4 h-4 shrink-0 ${ICON_COLORS[t.type]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            {ICONS[t.type]}
          </svg>
          {t.message}
        </div>
      ))}
    </div>
  )
}
