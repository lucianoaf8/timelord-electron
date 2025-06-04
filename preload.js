const { contextBridge, ipcRenderer } = require('electron');

// Expose secure APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // File operations
  loadSessions: () => ipcRenderer.invoke('load-sessions'),
  saveSessions: (sessions) => ipcRenderer.invoke('save-sessions', sessions),
  loadSettings: () => ipcRenderer.invoke('load-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
  exportSessionsCSV: (sessions) => ipcRenderer.invoke('export-sessions-csv', sessions),
  
  // Window controls
  send: (channel, ...args) => {
    // Whitelist of allowed channels
    const validChannels = ['minimize-window', 'close-window', 'toggle-minimal-mode'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, ...args);
    }
  },
  
  // Menu event listener
  onMenuAction: (callback) => {
    ipcRenderer.on('menu-action', (event, action) => callback(action));
  },
  
  // Notification sounds
  playNotificationSound: (type) => ipcRenderer.invoke('play-notification-sound', type)
});