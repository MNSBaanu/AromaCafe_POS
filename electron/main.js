const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Database = require('better-sqlite3')

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged

// Setup DB
const dbPath = isDev
  ? path.join(__dirname, '../pos.db')
  : path.join(app.getPath('userData'), 'pos.db')

const db = new Database(dbPath)

// Init tables
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    category TEXT DEFAULT 'General'
  );

  CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    total REAL NOT NULL,
    paid REAL NOT NULL,
    change REAL NOT NULL,
    created_at TEXT DEFAULT (datetime('now','localtime'))
  );

  CREATE TABLE IF NOT EXISTS sale_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    product_name TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES sales(id)
  );
`)

// ── Product handlers ──────────────────────────────────────────────
ipcMain.handle('products:getAll', () => db.prepare('SELECT * FROM products ORDER BY name').all())

ipcMain.handle('products:add', (_, p) =>
  db.prepare('INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)').run(p.name, p.price, p.stock, p.category || 'General')
)

ipcMain.handle('products:update', (_, p) =>
  db.prepare('UPDATE products SET name=?, price=?, stock=?, category=? WHERE id=?').run(p.name, p.price, p.stock, p.category, p.id)
)

ipcMain.handle('products:delete', (_, id) =>
  db.prepare('DELETE FROM products WHERE id=?').run(id)
)

// ── Sales handlers ────────────────────────────────────────────────
ipcMain.handle('sales:create', (_, { items, total, paid, change }) => {
  const insertSale = db.prepare('INSERT INTO sales (total, paid, change) VALUES (?, ?, ?)')
  const insertItem = db.prepare('INSERT INTO sale_items (sale_id, product_id, product_name, price, quantity) VALUES (?, ?, ?, ?, ?)')
  const updateStock = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?')

  const transaction = db.transaction(() => {
    const { lastInsertRowid } = insertSale.run(total, paid, change)
    for (const item of items) {
      insertItem.run(lastInsertRowid, item.id, item.name, item.price, item.quantity)
      updateStock.run(item.quantity, item.id)
    }
    return lastInsertRowid
  })

  return transaction()
})

ipcMain.handle('sales:getAll', () => {
  const sales = db.prepare('SELECT * FROM sales ORDER BY created_at DESC').all()
  const getItems = db.prepare('SELECT * FROM sale_items WHERE sale_id = ?')
  return sales.map(s => ({ ...s, items: getItems.all(s.id) }))
})

// ── Window ────────────────────────────────────────────────────────
function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
