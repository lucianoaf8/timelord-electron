class TimelordRenderer {
  constructor() {
    this.timerState = {
      startTime: null,
      elapsedTime: 0,
      isRunning: false,
      targetTime: 0,
      targetEnabled: false,
      targetReached: false,
      showMilliseconds: false,
      showSeconds: true,
      fontSize: 48,
      theme: 'cyber-blue', // Updated default theme
      isMinimal: false
    };

    // Component instances
    this.components = {};
    this.sessions = [];
    
    this.init();
  }

  async init() {
    await this.loadSettings();
    // Don't load sessions - always start empty
    this.sessions = [];
    
    this.initializeComponents();
    this.setupGlobalKeyboardHandlers();
    this.setupMenuHandlers();
    this.setupWindowDragging();
    this.setupWindowControls();
    
    // Wait for DOM to be ready
    setTimeout(() => {
      this.applyInitialSettings();
    }, 100);
  }

  initializeComponents() {
    // Initialize Background Component
    this.components.background = new BackgroundComponent();

    // Initialize Timer Component
    this.components.timer = new TimerComponent(
      this.timerState,
      this.handleTimerStateChange.bind(this)
    );

    // Initialize Buttons Component
    this.components.buttons = new ButtonsComponent(
      this.components.timer,
      this.handleButtonAction.bind(this)
    );

    // Initialize Toggles Component
    this.components.toggles = new TogglesComponent(
      this.components.timer,
      this.handleStateChange.bind(this)
    );

    // Initialize Theme Toggle Component
    this.components.themeToggle = new ThemeToggleComponent(
      this.components.background,
      this.handleThemeChange.bind(this)
    );

    // Initialize Session History Component
    this.components.sessionHistory = new SessionHistoryComponent(
      this.handleExportSessions.bind(this)
    );

    // Setup minimal mode functionality
    this.setupMinimalMode();
  }

  setupMinimalMode() {
    const minimalModeBtn = document.getElementById('minimalModeBtn');
    if (minimalModeBtn) {
      minimalModeBtn.addEventListener('click', () => this.toggleMinimalMode());
    }

    // Minimal mode control buttons
    const minimalStartBtn = document.getElementById('minimalStartBtn');
    if (minimalStartBtn) {
      minimalStartBtn.addEventListener('click', () => this.components.buttons?.handleStart());
    }

    const minimalResetBtn = document.getElementById('minimalResetBtn');
    if (minimalResetBtn) {
      minimalResetBtn.addEventListener('click', () => this.components.buttons?.handleReset());
    }

    const minimalSaveBtn = document.getElementById('minimalSaveBtn');
    if (minimalSaveBtn) {
      minimalSaveBtn.addEventListener('click', () => this.components.buttons?.handleSave());
    }

    const minimalExpandBtn = document.getElementById('minimalExpandBtn');
    if (minimalExpandBtn) {
      minimalExpandBtn.addEventListener('click', () => this.toggleMinimalMode());
    }

    const minimalCloseBtn = document.getElementById('minimalCloseBtn');
    if (minimalCloseBtn) {
      minimalCloseBtn.addEventListener('click', () => {
        window.electronAPI?.send('close-window');
      });
    }
  }

  setupGlobalKeyboardHandlers() {
    document.addEventListener('keydown', (e) => {
      // Let components handle their specific shortcuts first
      this.components.buttons?.handleKeyboard(e);
      this.components.themeToggle?.handleKeyboard(e);
      
      // Handle global shortcuts that weren't handled by components
      if (!e.defaultPrevented) {
        switch (e.code) {
          case 'KeyM':
            if (e.ctrlKey || e.metaKey) {
              e.preventDefault();
              this.toggleMinimalMode();
            }
            break;
          case 'Equal':
          case 'NumpadAdd':
            if (e.ctrlKey || e.metaKey) {
              e.preventDefault();
              this.components.timer?.adjustFontSize(4);
            }
            break;
          case 'Minus':
          case 'NumpadSubtract':
            if (e.ctrlKey || e.metaKey) {
              e.preventDefault();
              this.components.timer?.adjustFontSize(-4);
            }
            break;
        }
      }
    });
  }

  setupWindowDragging() {
    const titleBar = document.getElementById('titleBar');
    let isDragging = false;

    if (titleBar) {
      titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
      });

      document.addEventListener('mouseup', () => {
        isDragging = false;
      });
    }
  }

  setupMenuHandlers() {
    window.electronAPI?.onMenuAction((action) => {
      switch (action) {
        case 'new-session':
          this.components.timer?.reset();
          break;
        case 'export-sessions':
          this.components.sessionHistory?.exportSessions();
          break;
        case 'toggle-minimal':
          this.toggleMinimalMode();
          break;
        case 'toggle-theme':
          this.components.themeToggle?.toggleTheme();
          break;
        case 'toggle-timer':
          this.components.buttons?.handleStart();
          break;
        case 'reset-timer':
          this.components.timer?.reset();
          break;
        case 'save-session':
          this.components.buttons?.handleSave();
          break;
      }
    });
  }

  setupWindowControls() {
    console.log('[Renderer] setupWindowControls called');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const closeBtn = document.getElementById('closeBtn');
    console.log('[Renderer] minimizeBtn:', minimizeBtn);
    console.log('[Renderer] closeBtn:', closeBtn);
    console.log('[Renderer] window.electronAPI:', window.electronAPI);

    if (minimizeBtn) {
      minimizeBtn.addEventListener('click', () => {
        console.log('[Renderer] Minimize button clicked');
        window.electronAPI?.send('minimize-window');
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        console.log('[Renderer] Close button clicked');
        window.electronAPI?.send('close-window');
      });
    }
  }

  // Event handlers for component communication
  handleTimerStateChange(event) {
    switch (event) {
      case 'timer-started':
        this.saveSettings();
        if (this.timerState.isMinimal) this.syncMinimalTimer();
        break;
      case 'timer-stopped':
        this.saveSettings();
        if (this.timerState.isMinimal) this.syncMinimalTimer();
        break;
      case 'timer-reset':
        this.saveSettings();
        if (this.timerState.isMinimal) this.syncMinimalTimer();
        break;
      case 'target-reached':
        this.components.buttons?.playSound('target');
        if (this.timerState.isMinimal) this.syncMinimalTimer();
        break;
      case 'settings-changed':
        this.saveSettings();
        if (this.timerState.isMinimal) this.syncMinimalTimer();
        break;
    }
  }

  handleButtonAction(action, data) {
    switch (action) {
      case 'timer-toggled':
        // Timer state is already updated by the timer component
        break;
      case 'timer-reset':
        // Timer state is already updated by the timer component
        break;
      case 'save-session':
        if (data) {
          const updatedSessions = this.components.sessionHistory?.addSession(data);
          if (updatedSessions) {
            this.saveSessions(updatedSessions);
          }
        }
        break;
    }
  }

  handleStateChange(event) {
    if (event === 'settings-changed') {
      this.saveSettings();
    }
  }

  handleThemeChange(theme) {
    this.timerState.theme = theme;
    this.saveSettings();
    
    // Add special effects for theme changes
    if (this.components.background) {
      this.components.background.addBurstEffect?.('var(--accent-primary)', 1500);
      this.components.background.pulseGrid?.(1.5, 800);
    }
  }

  async handleExportSessions(sessions) {
    try {
      return await window.electronAPI?.exportSessionsCSV(sessions);
    } catch (error) {
      throw error;
    }
  }

  toggleMinimalMode() {
    this.timerState.isMinimal = !this.timerState.isMinimal;
    
    const app = document.getElementById('app');
    const body = document.body;
    const minimalModeBtn = document.getElementById('minimalModeBtn');
    
    if (app && minimalModeBtn) {
      if (this.timerState.isMinimal) {
        // Use the minimal container approach
        body.classList.add('minimal-mode');
        minimalModeBtn.textContent = 'Full Mode';
        
        // Sync the minimal timer with the main timer
        this.syncMinimalTimer();
      } else {
        body.classList.remove('minimal-mode');
        minimalModeBtn.textContent = 'Minimal Mode';
      }
    }
    
    // Resize window via IPC
    window.electronAPI.send('toggle-minimal-mode', this.timerState.isMinimal);
    
    this.saveSettings();
  }

  syncMinimalTimer() {
    // Sync the minimal timer display with the main timer
    const mainTimeText = document.getElementById('timeText');
    const minimalTimeText = document.getElementById('minimalTimeText');
    const mainStatus = document.getElementById('statusText');
    const minimalStatus = document.getElementById('minimalStatus');
    
    if (mainTimeText && minimalTimeText) {
      minimalTimeText.textContent = mainTimeText.textContent;
    }
    
    if (mainStatus && minimalStatus) {
      minimalStatus.textContent = mainStatus.textContent;
      minimalStatus.className = 'minimal-status ' + mainStatus.className.replace('status-text', '').trim();
    }
  }

  applyInitialSettings() {
    // Apply theme - use the enhanced theme system
    this.components.themeToggle?.setTheme(this.timerState.theme);
    
    // Apply font size
    this.components.timer?.applyFontSize();
    
    // Update toggles state with proper state loading
    this.components.toggles?.loadState({
      targetEnabled: this.timerState.targetEnabled,
      targetTime: this.timerState.targetTime,
      showMilliseconds: this.timerState.showMilliseconds,
      showSeconds: this.timerState.showSeconds
    });
    
    // Apply minimal mode
    if (this.timerState.isMinimal) {
      this.toggleMinimalMode();
    }
    
    // Load empty sessions into history component
    this.components.sessionHistory?.loadSessions([]);
    
    // Update timer display
    this.components.timer?.updateDisplay();
  }

  // Settings persistence
  async loadSettings() {
    try {
      const settings = await window.electronAPI?.loadSettings();
      if (settings) {
        // Merge settings with defaults, ensuring theme compatibility
        this.timerState = { 
          ...this.timerState, 
          ...settings,
          // Ensure theme is valid, fallback to cyber-blue
          theme: settings.theme === 'dark' ? 'cyber-blue' : (settings.theme || 'cyber-blue')
        };
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }

  async saveSettings() {
    try {
      const settings = {
        theme: this.timerState.theme,
        fontSize: this.timerState.fontSize,
        showMilliseconds: this.timerState.showMilliseconds,
        showSeconds: this.timerState.showSeconds,
        isMinimal: this.timerState.isMinimal,
        targetEnabled: this.timerState.targetEnabled,
        targetTime: this.timerState.targetTime
      };
      await window.electronAPI?.saveSettings(settings);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  async loadSessions() {
    // This method is kept for compatibility but no longer used
    // Sessions always start empty
    try {
      this.sessions = [];
    } catch (error) {
      console.error('Failed to load sessions:', error);
      this.sessions = [];
    }
  }

  async saveSessions(sessions = null) {
    try {
      const sessionsToSave = sessions || this.components.sessionHistory?.getSessions() || [];
      await window.electronAPI?.saveSessions(sessionsToSave);
    } catch (error) {
      console.error('Failed to save sessions:', error);
    }
  }

  // Public API for external access and debugging
  getTimer() {
    return this.components.timer;
  }

  getSessionHistory() {
    return this.components.sessionHistory;
  }

  getThemeSystem() {
    return this.components.themeToggle?.themeSystem;
  }

  getBackgroundComponent() {
    return this.components.background;
  }

  getCurrentState() {
    return { 
      ...this.timerState,
      sessions: this.sessions,
      currentTheme: this.components.themeToggle?.getCurrentTheme(),
      availableThemes: this.components.themeToggle?.getAllThemes()
    };
  }

  // Debug helpers
  debugComponents() {
    console.log('TimeLord Components:', {
      background: this.components.background,
      timer: this.components.timer,
      buttons: this.components.buttons,
      toggles: this.components.toggles,
      themeToggle: this.components.themeToggle,
      sessionHistory: this.components.sessionHistory
    });
  }

  // Component health check
  validateComponents() {
    const required = ['background', 'timer', 'buttons', 'toggles', 'themeToggle', 'sessionHistory'];
    const missing = required.filter(name => !this.components[name]);
    
    if (missing.length > 0) {
      console.error('Missing components:', missing);
      return false;
    }
    
    console.log('All components loaded successfully');
    return true;
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TimelordRenderer();
});