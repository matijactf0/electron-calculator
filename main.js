const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 400,
        height: 650,
        minWidth: 350,
        minHeight: 600,
        maxWidth: 500,
        maxHeight: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'assets/icon.png'),
        titleBarStyle: 'default',
        frame: true,
        resizable: true,
        show: false,
        backgroundColor: '#0f0f19'
    });

    mainWindow.loadFile('frontend/index.html');

    // Remove menu bar
    Menu.setApplicationMenu(null);

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Handle window closed
    mainWindow.on('closed', () => {
        app.quit();
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});