const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// File Paths
const PRODUCTS_PATH = path.join(__dirname, 'data', 'products.json');
const TRANSACTIONS_PATH = path.join(__dirname, 'data', 'transactions.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}

// IPC Handlers
ipcMain.handle('get-products', async () => {
    try {
        const data = fs.readFileSync(PRODUCTS_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading products:', error);
        return [];
    }
});

ipcMain.handle('save-transaction', async (event, transaction) => {
    try {
        let transactions = [];
        if (fs.existsSync(TRANSACTIONS_PATH)) {
            const data = fs.readFileSync(TRANSACTIONS_PATH, 'utf8');
            transactions = JSON.parse(data);
        }
        
        transactions.push({
            ...transaction,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });

        fs.writeFileSync(TRANSACTIONS_PATH, JSON.stringify(transactions, null, 2));
        return { success: true };
    } catch (error) {
        console.error('Error saving transaction:', error);
        return { success: false, error: error.message };
    }
});

ipcMain.on('print-receipt', (event, data) => {
    const receiptWin = new BrowserWindow({
        width: 400,
        height: 600,
        title: "Receipt Preview",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    receiptWin.loadFile('receipt.html');
    
    // Send data after window is loaded
    receiptWin.webContents.on('did-finish-load', () => {
        receiptWin.webContents.send('receipt-data', data);
    });
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // For simplicity in this step, but for production we'd use contextBridge
    },
    title: "Aroma Cafe POS"
  });

  win.loadFile('index.html');
  
  // Open DevTools during development (optional)
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
