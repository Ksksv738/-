const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1000,
    minHeight: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: '#050508',
  });

  win.loadURL(
    isDev ? 'http://localhost:5173' : `file://${path.join(__dirname, '../dist/index.html')}`
  );
}

ipcMain.handle('launch-game', async (event, gamePath) => {
  try {
    const child = spawn(gamePath, [], { detached: true, stdio: 'ignore' });
    child.unref();
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
