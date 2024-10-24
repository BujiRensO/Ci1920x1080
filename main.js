const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Make sure preload script is loaded here
      contextIsolation: true, // Important for security
      enableRemoteModule: false, // Recommended to set to false
      nodeIntegration: false // Recommended to set to false
    }
  });

  win.loadFile('index.html');
}

// Function to capture the screenshot with additional logging for debugging
ipcMain.handle('take-screenshot', async (event, filePath) => {
    console.log('take-screenshot IPC invoked, file path:', filePath); // Debug log
  
    try {
      const sources = await desktopCapturer.getSources({ types: ['screen'] });
  
      // Capture the first screen
      const screenshotSource = sources[0];
      const image = screenshotSource.thumbnail.toPNG();
  
      // Save the screenshot to the specified file path
      fs.writeFile(filePath, image, (err) => {
        if (err) {
          console.error('Failed to save screenshot:', err);
          throw err;
        }
        console.log('Screenshot saved to', filePath);
      });
    } catch (error) {
      console.error('Error capturing screenshot:', error); // Debugging error log
    }
  });
  
  app.whenReady().then(createWindow);