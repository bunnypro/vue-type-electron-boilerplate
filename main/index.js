const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const config = require('../config');

let win;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 });

    let urlPath;

    if (process.env.NODE_ENV === 'development') {
        urlPath = url.format({
            host: config.dev.publicPath,
            protocol: config.dev.protocol
        });
    } else {
        urlPath = url.format({
            pathname: path.join(config.prod.path, 'index.html'),
            protocol: config.prod.protocol,
            slashes: true
        });
    }

    win.loadURL(urlPath);

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
