const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const path = require('path');

const { exec } = require("child_process");

exec("pwd", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

var person = {
  getx: function(v) {
    //return this.firstName + " " + this.lastName;
    return this.xvalue;
  }
}
var x1 = {
  xvalue: 0,
}
var x2 = {
  xvalue: 2,
}
var x3 = {
  xvalue: 15000,
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration : true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.webContents.on('did-finish-load', function () {
   console.log('X1 :' + person.getx.call(x1));
   var tmp = person.getx.call(x1);
   console.log('test' + tmp);
   mainWindow.webContents.send('X1', tmp);
   console.log('X2 :' + person.getx.call(x2));
   mainWindow.webContents.send('X2',person.getx.call(x2));
   console.log('X3 :' + person.getx.call(x3));
   mainWindow.webContents.send('X3',person.getx.call(x3));
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
