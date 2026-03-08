const { app, BrowserWindow } = require('electron');
const path = require('path');
require('./server.js'); 

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'icon.ico'), // سطر الأيقونة
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('log.html'); 
  win.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);