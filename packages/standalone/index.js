const path = require('path');
const { app, BrowserWindow } = require('electron');

const pkg = require.resolve('@scoreman/client');

function findClientFile() {

  //  try {
    //} catch (e) {
     //   throw new Error("@score/client package not found!");
    //}


    const clientFile = pkg;

    console.log('html', clientFile);

    return clientFile;
}

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile(findClientFile());

    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
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
