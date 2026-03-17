const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Products
  getProducts:     ()       => ipcRenderer.invoke('get-products'),
  saveProduct:     (p)      => ipcRenderer.invoke('save-product', p),
  deleteProduct:   (id)     => ipcRenderer.invoke('delete-product', id),

  // Transactions
  getTransactions: ()       => ipcRenderer.invoke('get-transactions'),
  saveTransaction: (t)      => ipcRenderer.invoke('save-transaction', t),

  // Settings
  getSettings:     ()       => ipcRenderer.invoke('get-settings'),
  saveSettings:    (s)      => ipcRenderer.invoke('save-settings', s),

  // Receipt
  printReceipt:    (data)   => ipcRenderer.send('print-receipt', data),

  // Navigation
  navigate:        (page)   => ipcRenderer.send('navigate', page),
});
