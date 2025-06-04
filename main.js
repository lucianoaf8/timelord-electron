const { app, BrowserWindow, Menu, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const os = require('os');

class TimelordMain {
  constructor() {
    this.mainWindow = null;
    this.dataDir = path.join(os.homedir(), '.timelord');
    this.sessionsFile = path.join(this.dataDir, 'sessions.json');
    this.settingsFile = path.join(this.dataDir, 'settings.json');
    this.isQuitting = false;
    
    this.initializeApp();
    this.setupIpcHandlers();
  }

  async initializeApp() {
    // Fix GPU process issues
    app.commandLine.appendSwitch('disable-gpu-sandbox');
    app.commandLine.appendSwitch('disable-software-rasterizer');
    
    // Ensure data directory exists
    try {
      await fs.mkdir(this.dataDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create data directory:', error);
    }

    // App event handlers
    app.whenReady().then(() => {
      this.createMainWindow();
      this.createMenu();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createMainWindow();
      }
    });

    app.on('before-quit', () => {
      this.isQuitting = true;
    });
  }

  createMainWindow() {
    this.mainWindow = new BrowserWindow({
      width: 480,
      height: 750,
      minWidth: 480,          // Same as width
      maxWidth: 480,          // Same as width  
      minHeight: 750,         // Same as height
      maxHeight: 750,         // Same as height
      frame: false,
      transparent: false,
      alwaysOnTop: true,
      resizable: false,       // Disable manual resizing
      maximizable: false,     // Disable maximize button/double-click
      minimizable: true,      // Keep minimize functionality
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        preload: path.join(__dirname, 'preload.js')
      },
      icon: path.join(__dirname, 'assets', 'icon.png'),
      show: false,
      titleBarStyle: 'hidden',
      backgroundColor: '#0c0c0c'
    });
  
  
    this.mainWindow.loadFile('index.html');

    // Re-enforce always on top when window loses focus
    this.mainWindow.on('blur', () => {
      if (!this.isQuitting) {
        this.mainWindow.setAlwaysOnTop(true, 'floating');
      }
    });

    // Re-enforce always on top when window is minimized/restored
    this.mainWindow.on('minimize', () => {
      if (!this.isQuitting) {
        setTimeout(() => {
          this.mainWindow.setAlwaysOnTop(true, 'floating');
        }, 100);
      }
    });

    this.mainWindow.on('restore', () => {
      if (!this.isQuitting) {
        this.mainWindow.setAlwaysOnTop(true, 'floating');
        this.mainWindow.focus();
      }
    });

    // Handle system events that might affect always-on-top
    this.mainWindow.on('show', () => {
      if (!this.isQuitting) {
        this.mainWindow.setAlwaysOnTop(true, 'floating');
      }
    });

    // Extra enforcement - check periodically
    setInterval(() => {
      if (this.mainWindow && !this.mainWindow.isDestroyed() && !this.isQuitting) {
        if (!this.mainWindow.isAlwaysOnTop()) {
          this.mainWindow.setAlwaysOnTop(true, 'floating');
        }
      }
    }, 2000); // Check every 2 seconds

    
    // Position window on right side of screen
    this.mainWindow.once('ready-to-show', () => {
      const { screen } = require('electron');
      const primaryDisplay = screen.getPrimaryDisplay();
      const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;
      
      const windowWidth = 480;
      const windowHeight = 750;
      const x = screenWidth - windowWidth - 100;
      const y = 50;
      
      this.mainWindow.setBounds({ x, y, width: windowWidth, height: windowHeight });
      this.mainWindow.show();
    });

    // Handle window close
    this.mainWindow.on('close', (event) => {
      if (!this.isQuitting && process.platform === 'darwin') {
        event.preventDefault();
        this.mainWindow.hide();
      }
    });

    // Development mode
    if (process.argv.includes('--dev')) {
      this.mainWindow.webContents.openDevTools();
    }
  }

  createMenu() {
    const template = [
      {
        label: 'File',
        submenu: [
          {
            label: 'New Session',
            accelerator: 'CmdOrCtrl+N',
            click: () => this.mainWindow.webContents.send('menu-action', 'new-session')
          },
          {
            label: 'Export Sessions',
            accelerator: 'CmdOrCtrl+E',
            click: () => this.mainWindow.webContents.send('menu-action', 'export-sessions')
          },
          { type: 'separator' },
          {
            label: 'Quit',
            accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
            click: () => {
              this.isQuitting = true;
              app.quit();
            }
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Toggle Minimal Mode',
            accelerator: 'CmdOrCtrl+M',
            click: () => this.mainWindow.webContents.send('menu-action', 'toggle-minimal')
          },
          {
            label: 'Toggle Theme',
            accelerator: 'CmdOrCtrl+T',
            click: () => this.mainWindow.webContents.send('menu-action', 'toggle-theme')
          },
          { type: 'separator' },
          { role: 'reload' },
          { role: 'forceReload' },
          { role: 'toggleDevTools' }
        ]
      },
      {
        label: 'Timer',
        submenu: [
          {
            label: 'Start/Stop',
            accelerator: 'Space',
            click: () => this.mainWindow.webContents.send('menu-action', 'toggle-timer')
          },
          {
            label: 'Reset',
            accelerator: 'CmdOrCtrl+R',
            click: () => this.mainWindow.webContents.send('menu-action', 'reset-timer')
          },
          {
            label: 'Save Session',
            accelerator: 'CmdOrCtrl+S',
            click: () => this.mainWindow.webContents.send('menu-action', 'save-session')
          }
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'About Timelord',
            click: () => {
              dialog.showMessageBox(this.mainWindow, {
                type: 'info',
                title: 'About Timelord',
                message: 'Timelord Timer v1.0.0',
                detail: 'A modern, modular timer application built with Electron.'
              });
            }
          },
          {
            label: 'Learn More',
            click: () => shell.openExternal('https://github.com/your-org/timelord-electron')
          }
        ]
      }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }

  setupIpcHandlers() {
    // File system operations
    ipcMain.handle('load-sessions', async () => {
      try {
        const data = await fs.readFile(this.sessionsFile, 'utf8');
        return JSON.parse(data);
      } catch (error) {
        return [];
      }
    });

    ipcMain.handle('save-sessions', async (event, sessions) => {
      try {
        await fs.writeFile(this.sessionsFile, JSON.stringify(sessions, null, 2));
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    ipcMain.handle('load-settings', async () => {
      try {
        const data = await fs.readFile(this.settingsFile, 'utf8');
        return JSON.parse(data);
      } catch (error) {
        return {
          theme: 'dark',
          fontSize: 42,
          showMilliseconds: false,
          showSeconds: true,
          isMinimal: false
        };
      }
    });

    ipcMain.handle('save-settings', async (event, settings) => {
      try {
        await fs.writeFile(this.settingsFile, JSON.stringify(settings, null, 2));
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    ipcMain.handle('export-sessions-csv', async (event, sessions) => {
      try {
        const result = await dialog.showSaveDialog(this.mainWindow, {
          title: 'Export Sessions',
          defaultPath: `timelord_sessions_${new Date().toISOString().slice(0, 10)}.csv`,
          filters: [
            { name: 'CSV Files', extensions: ['csv'] },
            { name: 'All Files', extensions: ['*'] }
          ]
        });

        if (!result.canceled && result.filePath) {
          const csvHeader = 'Date,Time,Duration,Raw Seconds,Target Enabled,Target Time\n';
          const csvData = sessions.map(session => 
            `${session.date},${session.time},${session.duration},${session.rawSeconds},${session.targetEnabled || false},${session.targetTime || ''}`
          ).join('\n');
          
          await fs.writeFile(result.filePath, csvHeader + csvData);
          return { success: true, path: result.filePath };
        }
        
        return { success: false, cancelled: true };
      } catch (error) {
        console.error('Error in export-sessions-csv handler:', error);
        return { success: false, error: error.message };
      }
    });

    // Window controls (corrected)
    ipcMain.on('minimize-window', () => {
      if (this.mainWindow) {
        this.mainWindow.minimize();
      }
    });

    ipcMain.on('close-window', () => {
      if (this.mainWindow) {
        this.mainWindow.close();
      }
    });

    // Minimal mode window resizing
    ipcMain.on('toggle-minimal-mode', (event, isMinimal) => {
      if (this.mainWindow) {
        if (isMinimal) {
          // Store original size before switching to minimal
          this.originalSize = this.mainWindow.getSize();
          this.originalPosition = this.mainWindow.getPosition();
          
          // Set minimal size (compact timer window)
          this.mainWindow.setSize(300, 120);
          this.mainWindow.center();
          this.mainWindow.setResizable(false);
        } else {
          // Restore original size
          if (this.originalSize) {
            this.mainWindow.setSize(this.originalSize[0], this.originalSize[1]);
          } else {
            this.mainWindow.setSize(600, 800); // fallback to default
          }
          if (this.originalPosition) {
            this.mainWindow.setPosition(this.originalPosition[0], this.originalPosition[1]);
          }
          this.mainWindow.setResizable(true);
          this.mainWindow.center();
        }
      }
    });
  } // Closes setupIpcHandlers() method
}

// Initialize the application
new TimelordMain();