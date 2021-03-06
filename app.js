const {
  app,
  BrowserWindow
} = require('electron')
const url = require("url");
const path = require("path");

let appWindow

function initWindow() {
  appWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })
  appWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  )
  appWindow.webContents.openDevTools()
  appWindow.on('closed', function () {
    appWindow = null
  })


}
app.on('ready', initWindow)
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  if (appWindow === null) {
    initWindow()
  }
})
