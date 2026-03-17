// Injects sidebar and starts the clock
function initSidebar(activePage) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const navItems = [
    { id: 'pos',          icon: '🧾', label: 'POS'         },
    { id: 'products',     icon: '📦', label: 'Products'    },
    { id: 'transactions', icon: '📋', label: 'History'     },
    { id: 'dashboard',    icon: '📊', label: 'Dashboard'   },
    { id: 'settings',     icon: '⚙️',  label: 'Settings'   },
  ];

  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <div class="logo-icon">☕</div>
      <div class="logo-name">Aroma Cafe</div>
      <div class="logo-sub">Point of Sale</div>
    </div>

    <nav class="sidebar-nav">
      ${navItems.map(item => `
        <a class="nav-item ${activePage === item.id ? 'active' : ''}"
           onclick="window.api.navigate('${item.id}')">
          <span class="nav-icon">${item.icon}</span>
          <span class="nav-label">${item.label}</span>
        </a>
      `).join('')}
    </nav>

    <div class="sidebar-footer">
      <div class="clock" id="sidebar-clock">--:--:--</div>
      <div class="date-str" id="sidebar-date"></div>
    </div>
  `;

  // Live clock
  function tick() {
    const now = new Date();
    document.getElementById('sidebar-clock').textContent =
      now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('sidebar-date').textContent =
      now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  }
  tick();
  setInterval(tick, 1000);
}
