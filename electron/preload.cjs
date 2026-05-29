const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electron', {
  launchGame: (path) => ipcRenderer.invoke('launch-game', path),
});
