const { contextBridge, ipcRenderer } = require('electron');

// Expose ipcRenderer methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  scanNetwork: () => ipcRenderer.invoke('scan-network'),
  takeScreenshot: (filePath) => ipcRenderer.invoke('take-screenshot', filePath)
});