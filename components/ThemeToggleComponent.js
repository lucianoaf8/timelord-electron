class ThemeToggleComponent {
  constructor(backgroundComponent, onThemeChange) {
    console.log('🎨 ThemeToggleComponent constructor called');
    this.backgroundComponent = backgroundComponent;
    this.onThemeChange = onThemeChange;
    this.themeSystem = new ThemeSystem();
    this.currentTheme = 'cyber-blue';
    this.originalTheme = 'cyber-blue';
    this.elements = {};
    this.tooltip = null;
    this.isPreviewMode = false;
    console.log('🎨 About to call init()');
    this.init();
  }

  init() {
    console.log('🎨 ThemeToggleComponent init() called');
    
    this.elements = {
      themeToggle: document.getElementById('themeToggle'),
      minimizeBtn: document.getElementById('minimizeBtn'),
      closeBtn: document.getElementById('closeBtn')
    };

    console.log('🎨 Elements found:', {
      themeToggle: !!this.elements.themeToggle,
      minimizeBtn: !!this.elements.minimizeBtn,
      closeBtn: !!this.elements.closeBtn
    });

    if (!this.elements.themeToggle) {
      console.error('❌ themeToggle element NOT FOUND!');
      return;
    }

    console.log('🎨 Calling setupThemeToggle()');
    this.setupThemeToggle();
    
    console.log('🎨 Calling bindEvents()');
    this.bindEvents();
    
    console.log('🎨 Calling applyTheme()');
    this.applyTheme();
    
    console.log('🎨 ThemeToggleComponent initialization complete');
  }

  setupThemeToggle() {
    console.log('🎨 setupThemeToggle() called');
    if (this.elements.themeToggle) {
      console.log('🎨 themeToggle element exists');
      this.updateThemeButton();
      console.log('🎨 Theme button updated, tooltip will be created on first click');
    } else {
      console.error('❌ themeToggle element missing in setupThemeToggle');
    }
  }

  bindEvents() {
    console.log('🎨 bindEvents() called');
    
    if (this.elements.themeToggle) {
      this.elements.themeToggle.addEventListener('click', (e) => {
        console.log('🎨 *** THEME BUTTON CLICKED ***');
        e.stopPropagation();
        this.toggleTooltip();
      });
      console.log('🎨 Click event bound to themeToggle');
    } else {
      console.error('❌ Cannot bind click event - themeToggle missing');
    }

    document.addEventListener('click', (e) => {
      console.log('🎨 Document clicked, target:', e.target.tagName);
      if (!this.elements.themeToggle?.contains(e.target)) {
        this.hideTooltip();
      }
    });

    if (this.tooltip) {
      this.tooltip.addEventListener('mouseleave', () => {
        console.log('🎨 Mouse left tooltip');
        if (this.isPreviewMode) {
          this.revertPreview();
        }
      });
      console.log('🎨 Mouse leave event bound to tooltip');
    }

    if (this.elements.minimizeBtn) {
      this.elements.minimizeBtn.addEventListener('click', () => this.minimizeWindow());
    }
    
    if (this.elements.closeBtn) {
      this.elements.closeBtn.addEventListener('click', () => this.closeWindow());
    }
    
    console.log('🎨 All events bound successfully');
  }

  toggleTooltip() {
    console.log('🎨 *** toggleTooltip() called ***');
    console.log('🎨 Tooltip exists:', !!this.tooltip);
    
    if (!this.tooltip) {
      console.log('🎨 Tooltip is null, showing it');
      this.showTooltip();
    } else if (this.tooltip.parentElement) {
      console.log('🎨 Tooltip exists in DOM, hiding it');
      this.hideTooltip();
    } else {
      console.log('🎨 Tooltip exists but not in DOM, showing new one');
      this.showTooltip();
    }
  }

  showTooltip() {
    console.log('🎨 *** showTooltip() called ***');
    
    if (this.tooltip && this.tooltip.parentElement) {
      this.tooltip.parentElement.removeChild(this.tooltip);
      console.log('🎨 Removed existing tooltip');
    }
    
    console.log('🎨 Creating new tooltip element');
    this.tooltip = document.createElement('div');
    this.tooltip.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 8px; color: #00c8ff; text-align: center;">
        🎨 Choose Theme
      </div>
      
      <!-- Original Themes -->
      <div class="theme-option" data-theme="cyber-blue" style="padding: 4px 8px; margin: 2px 0; cursor: pointer; border-radius: 4px;">
        🌊 Cyber Blue ${this.currentTheme === 'cyber-blue' ? '✓' : ''}
      </div>
      <div class="theme-option" data-theme="neon-purple" style="padding: 4px 8px; margin: 2px 0; cursor: pointer; border-radius: 4px;">
        💜 Neon Purple ${this.currentTheme === 'neon-purple' ? '✓' : ''}
      </div>
      <div class="theme-option" data-theme="matrix-green" style="padding: 4px 8px; margin: 2px 0; cursor: pointer; border-radius: 4px;">
        💚 Matrix Green ${this.currentTheme === 'matrix-green' ? '✓' : ''}
      </div>
      <div class="theme-option" data-theme="sunset-orange" style="padding: 4px 8px; margin: 2px 0; cursor: pointer; border-radius: 4px;">
        🧡 Sunset Orange ${this.currentTheme === 'sunset-orange' ? '✓' : ''}
      </div>
      <div class="theme-option" data-theme="minimal-dark" style="padding: 4px 8px; margin: 2px 0; cursor: pointer; border-radius: 4px;">
        ⚫ Minimal Dark ${this.currentTheme === 'minimal-dark' ? '✓' : ''}
      </div>
      <div class="theme-option" data-theme="light" style="padding: 4px 8px; margin: 2px 0; cursor: pointer; border-radius: 4px;">
        ☀️ Light ${this.currentTheme === 'light' ? '✓' : ''}
      </div>

      <!-- Divider -->
      <div style="height: 1px; background: #444; margin: 8px 4px;"></div>
      <div style="font-size: 10px; color: #888; text-align: center; margin: 4px 0;">Sci-Fi Collection</div>

      <!-- New Sci-Fi Themes -->
      <div class="theme-option" data-theme="hal-red" style="padding: 4px 8px; margin: 2px 0; cursor: pointer; border-radius: 4px;">
        🔴 HAL Red ${this.currentTheme === 'hal-red' ? '✓' : ''}
      </div>
      <div class="theme-option" data-theme="tesseract-mode" style="padding: 4px 8px; margin: 2px 0; cursor: pointer; border-radius: 4px;">
        🧿 Tesseract Mode ${this.currentTheme === 'tesseract-mode' ? '✓' : ''}
      </div>
      <div class="theme-option" data-theme="stark-hud" style="padding: 4px 8px; margin: 2px 0; cursor: pointer; border-radius: 4px;">
        🔵 Stark HUD ${this.currentTheme === 'stark-hud' ? '✓' : ''}
      </div>
      <div class="theme-option" data-theme="vault-tec" style="padding: 4px 8px; margin: 2px 0; cursor: pointer; border-radius: 4px;">
        💛 Vault-Tec ${this.currentTheme === 'vault-tec' ? '✓' : ''}
      </div>
      <div class="theme-option" data-theme="monolith-white" style="padding: 4px 8px; margin: 2px 0; cursor: pointer; border-radius: 4px;">
        🤍 Monolith White ${this.currentTheme === 'monolith-white' ? '✓' : ''}
      </div>
      <div class="theme-option" data-theme="tron-legacy" style="padding: 4px 8px; margin: 2px 0; cursor: pointer; border-radius: 4px;">
        🌌 Tron Legacy ${this.currentTheme === 'tron-legacy' ? '✓' : ''}
      </div>

      <div style="text-align: center; margin-top: 8px; padding: 4px; background: #ff4757; border-radius: 6px; cursor: pointer; font-size: 10px;">
        ✕ Close
      </div>
    `;
    
    // Add event listeners to theme options
    this.tooltip.querySelectorAll('.theme-option').forEach(option => {
      option.addEventListener('mouseover', () => {
        option.style.background = '#0080ff';
      });
      option.addEventListener('mouseout', () => {
        option.style.background = 'transparent';
      });
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const themeName = option.dataset.theme;
        this.previewTheme(themeName);
        this.hideTooltip();
      });
    });
    
    // Add close button event listener
    this.tooltip.querySelector('.close-button')?.addEventListener('click', () => {
      this.hideTooltip();
    });
    
    this.tooltip.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: #16213e;
      border: 3px solid #00c8ff;
      border-radius: 12px;
      padding: 12px;
      z-index: 99999;
      min-width: 200px;
      max-width: 300px;
      max-height: 400px;
      overflow-y: auto;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.9);
      color: white;
      font-family: Arial, sans-serif;
      font-size: 12px;
      display: block;
      visibility: visible;
      opacity: 1;
    `;
    
    window.themeComponent = this;
    document.body.appendChild(this.tooltip);
    
    console.log('🎨 Tooltip created and added to body');
    this.originalTheme = this.currentTheme;
  }
  
  hideTooltip() {
    console.log('🎨 hideTooltip() called');
    if (this.tooltip && this.tooltip.parentElement) {
      this.tooltip.parentElement.removeChild(this.tooltip);
      console.log('🎨 Tooltip removed from DOM');
      
      this.tooltip = null;
      console.log('🎨 Tooltip reference set to null');
      
      if (this.isPreviewMode) {
        this.revertPreview();
      }
    }
  }

  previewTheme(themeName) {
    console.log('🎨 previewTheme() called with:', themeName);
    const theme = this.themeSystem.applyTheme(themeName, this.backgroundComponent);
    if (theme) {
      this.updateThemeButton(themeName);
    }
  }

  revertPreview() {
    console.log('🎨 revertPreview() called');
    this.isPreviewMode = false;
    const theme = this.themeSystem.applyTheme(this.originalTheme, this.backgroundComponent);
    if (theme) {
      this.updateThemeButton(this.originalTheme);
    }
  }

  applyThemePermanently(themeName) {
    console.log('🎨 applyThemePermanently() called with:', themeName);
    this.isPreviewMode = false;
    this.currentTheme = themeName;
    this.originalTheme = themeName;
    const theme = this.themeSystem.applyTheme(themeName, this.backgroundComponent);
    if (theme) {
      this.updateThemeButton(themeName);
      this.onThemeChange?.(themeName);
    }
  }

  setTheme(themeName) {
    this.applyThemePermanently(themeName);
  }

  updateThemeButton(themeName = null) {
    if (this.elements.themeToggle) {
      const themeToShow = themeName || this.currentTheme;
      const theme = this.themeSystem.getTheme(themeToShow);
      
      const themeEmojis = {
        'cyber-blue': '🌊',
        'neon-purple': '💜', 
        'matrix-green': '💚',
        'sunset-orange': '🧡',
        'minimal-dark': '⚫',
        'light': '☀️',
        'hal-red': '🔴',
        'tesseract-mode': '🧿',
        'stark-hud': '🔵',
        'vault-tec': '💛',
        'monolith-white': '🤍',
        'tron-legacy': '🌌'
      };
      
      this.elements.themeToggle.textContent = themeEmojis[themeToShow] || '🎨';
      this.elements.themeToggle.title = `Current: ${theme.displayName} (Click for options)`;
    }
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  getAllThemes() {
    return this.themeSystem.getAllThemes();
  }

  applyTheme() {
    this.setTheme(this.currentTheme);
  }

  async minimizeWindow() {
    try {
      await window.electronAPI?.minimizeWindow();
    } catch (error) {
      console.error('Failed to minimize window:', error);
    }
  }

  async closeWindow() {
    try {
      await window.electronAPI?.closeWindow();
    } catch (error) {
      console.error('Failed to close window:', error);
    }
  }

  handleKeyboard(e) {
    switch (e.code) {
      case 'KeyT':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          console.log('🎨 Ctrl+T pressed');
          this.toggleTooltip();
        }
        break;
      case 'Escape':
        if (this.tooltip && this.tooltip.style.display === 'block') {
          e.preventDefault();
          this.hideTooltip();
        } else {
          e.preventDefault();
          this.closeWindow();
        }
        break;
    }
  }
}