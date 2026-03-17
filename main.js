const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs   = require('fs');

const PRODUCTS_PATH     = path.join(__dirname, 'data', 'products.json');
const TRANSACTIONS_PATH = path.join(__dirname, 'data', 'transactions.json');
const SETTINGS_PATH     = path.join(__dirname, 'data', 'settings.json');

// ── Helpers ──────────────────────────────────────────────────────────────────
function readJSON(filePath) {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); }
  catch { return null; }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ── IPC: Products ─────────────────────────────────────────────────────────────
ipcMain.handle('get-products', () => readJSON(PRODUCTS_PATH) || []);

ipcMain.handle('save-product', (_, product) => {
  const products = readJSON(PRODUCTS_PATH) || [];
  if (product.id) {
    const idx = products.findIndex(p => p.id === product.id);
    if (idx !== -1) products[idx] = product;
    else products.push(product);
  } else {
    product.id = Date.now();
    products.push(product);
  }
  writeJSON(PRODUCTS_PATH, products);
  return { success: true, product };
});

ipcMain.handle('delete-product', (_, id) => {
  const products = (readJSON(PRODUCTS_PATH) || []).filter(p => p.id !== id);
  writeJSON(PRODUCTS_PATH, products);
  return { success: true };
});

// ── IPC: Transactions ─────────────────────────────────────────────────────────
ipcMain.handle('get-transactions', () => readJSON(TRANSACTIONS_PATH) || []);

ipcMain.handle('save-transaction', (_, transaction) => {
  const transactions = readJSON(TRANSACTIONS_PATH) || [];
  transactions.push({
    ...transaction,
    id: Date.now(),
    timestamp: new Date().toISOString()
  });
  writeJSON(TRANSACTIONS_PATH, transactions);
  return { success: true };
});

// ── IPC: Settings ─────────────────────────────────────────────────────────────
ipcMain.handle('get-settings', () => readJSON(SETTINGS_PATH));

ipcMain.handle('save-settings', (_, settings) => {
  writeJSON(SETTINGS_PATH, settings);
  return { success: true };
});

// ── IPC: Receipt Window ───────────────────────────────────────────────────────
ipcMain.on('print-receipt', (_, data) => {
  const win = new BrowserWindow({
    width: 420, height: 650,
    title: 'Receipt',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  win.loadFile(path.join(__dirname, 'src', 'pages', 'receipt.html'));
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('receipt-data', data);
  });
});

// ── IPC: Navigation ───────────────────────────────────────────────────────────
ipcMain.on('navigate', (event, page) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.loadFile(path.join(__dirname, 'src', 'pages', `${page}.html`));
});

// ── App Window ────────────────────────────────────────────────────────────────
function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 800,
    minWidth: 1024, minHeight: 700,
    title: 'Aroma Cafe POS',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, 'src', 'pages', 'pos.html'));
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
