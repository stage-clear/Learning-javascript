const electron = require('electron')
const path = require('path')
const url = require('url')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

// Electron のライフサイクル
let mainWindow
app.on('ready', createWindow)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

// ウィンドウを作成
function createWindow () {
  mainWindow = new BrowserWindow({width: 600, height: 800})
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// 読み込まれる index.html は Webpack によってパックされた, out/index.js を読み込みます.
