const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const path = require('path');
var {execSync} = require("child_process");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

function exe(cwd, command){
  return execSync(command, { cwd, encoding: "utf8"});
}
var comm = "";//command to be  executed

function esegui(cwd){
  return exe(cwd, comm);
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1800,
    height: 1600,
    webPreferences: {
      nodeIntegration : true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

};

function nl2br(str){
  return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
}

function template(func_name){
  comm = "bash " + path.join(__dirname, ('ft_' + func_name + '_bot.sh'));
  var stringa = esegui();
  stringa = stringa.split("\n");//stringa.lenght da il numero di elementi
  var arr = [];
  for (let index = 0; index < (stringa.length - 3) / 2; index++) {
    arr.push(stringa[index].localeCompare(stringa[(stringa.length -3) / 2 + index]));
  }
  for (let index = 0; index < arr.length; index++) {
    mainWindow.webContents.send('' + index,arr[index]);
  }
  arr = [];
}

ipcMain.on('click', () => {
  
  template('Mini');// da mandare in loop con i nomi dei bot (in un array const?)
  
});

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