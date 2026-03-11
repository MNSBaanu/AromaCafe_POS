import './Header.css'

function Header() {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">AromaCafe POS</h1>
          <span className="header-subtitle">Point of Sale System</span>
        </div>
        <div className="header-right">
          <div className="header-time">
            <div className="time">{currentTime}</div>
            <div className="date">{currentDate}</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
