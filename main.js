const { app, BrowserWindow } = require("electron");
const path = require("path");
const { electron } = require("process");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 200,
    autoHideMenuBar: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile("index.html");
  win.setSkipTaskbar(true);

  const { width, height } = require("electron").screen.getPrimaryDisplay().workAreaSize;
  win.setBounds({
    x: width - 200,
    y: 1020,
    width: 300,
    height: 100,
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
