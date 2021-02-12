const { app, BrowserWindow } = require('electron');

const { autoUpdater } = require('electron-updater')

const { start: startServer, stop: stopServer } = require('@scoreman/server');

const process = require('process');

const SERVER_PORT = process.env.PORT || 3000;


// Auto updates
autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.checkForUpdatesAndNotify();

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    });

    startServer({
        altPort: SERVER_PORT,
        appBasePath: process.env.PORTABLE_EXECUTABLE_DIR || process.cwd(),
        baseUrl: '',
        hostname: 'localhost'
    });
    win.loadURL(`http://localhost:${SERVER_PORT}`);

    //win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        stopServer();
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
