const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  products: {
    getAll: () => ipcRenderer.invoke('products:getAll'),
    add: (p) => ipcRenderer.invoke('products:add', p),
    update: (p) => ipcRenderer.invoke('products:update', p),
    delete: (id) => ipcRenderer.invoke('products:delete', id)
  },
  sales: {
    create: (data) => ipcRenderer.invoke('sales:create', data),
    getAll: () => ipcRenderer.invoke('sales:getAll')
  }
})
