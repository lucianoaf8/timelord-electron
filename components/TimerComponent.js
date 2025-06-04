class TimerComponent {
  constructor(timerState, onStateChange) {
    this.state = timerState;
    this.onStateChange = onStateChange;
    this.updateInterval = null;
    this.elements = {};
    this.init();
  }

  init() {
    this.elements = {
      timeText: document.getElementById('timeText'),
      millisecondsContainer: document.getElementById('millisecondsContainer'),
      millisecondsText: document.getElementById('millisecondsText'),
      statusIndicator: document.getElementById('statusIndicator'),
      statusText: document.getElementById('statusText'),
      fontDecrease: document.getElementById('fontDecrease'),
      fontIncrease: document.getElementById('fontIncrease')
    };

    this.bindEvents();
    this.updateDisplay();
    this.applyFontSize();
  }

  bindEvents() {
    this.elements.fontDecrease?.addEventListener('click', () => this.adjustFontSize(-4));
    this.elements.fontIncrease?.addEventListener('click', () => this.adjustFontSize(4));
  }

  start() {
    this.state.isRunning = true;
    this.state.startTime = Date.now() - this.state.elapsedTime;
    this.state.targetReached = false;

    this.updateStatus('RUNNING');
    this.startPulseAnimation();
    
    this.updateInterval = setInterval(() => this.updateTimer(), 10);
    this.onStateChange?.('timer-started');
  }

  stop() {
    // This method actually pauses the timer (preserves elapsed time)
    this.state.isRunning = false;
    
    this.updateStatus('PAUSED');
    this.stopPulseAnimation();
    
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.onStateChange?.('timer-paused');
  }

  reset() {
    this.state.isRunning = false;
    this.state.elapsedTime = 0;
    this.state.startTime = null;
    this.state.targetReached = false;

    this.updateStatus('READY');
    this.stopPulseAnimation();
    
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    
    this.updateDisplay();
    this.updateMinimalModeDisplay();
    this.onStateChange?.('timer-reset');
  }

  updateTimer() {
    if (!this.state.isRunning) return;

    this.state.elapsedTime = Date.now() - this.state.startTime;
    
    // Check target
    if (this.state.targetEnabled && 
        !this.state.targetReached && 
        this.state.elapsedTime >= this.state.targetTime) {
      this.state.targetReached = true;
      this.updateStatus('TARGET REACHED');
      this.onStateChange?.('target-reached');
    }
    
    this.updateDisplay();
    this.updateMinimalModeDisplay();
  }

  updateDisplay() {
    const timeStr = this.formatElapsedTime(this.state.elapsedTime, false);
    if (this.elements.timeText) {
      this.elements.timeText.textContent = timeStr;
    }

    if (this.state.showMilliseconds && this.elements.millisecondsText) {
      const ms = Math.floor((this.state.elapsedTime % 1000) / 10);
      this.elements.millisecondsText.textContent = `${ms.toString().padStart(2, '0')} ms`;
    }
  }

  updateMinimalModeDisplay() {
    const minimalTimeText = document.getElementById('minimalTimeText');
    if (minimalTimeText) {
      const timeStr = this.formatElapsedTime(this.state.elapsedTime, false);
      minimalTimeText.textContent = timeStr;
    }
  }

  formatElapsedTime(ms, includeMs = false) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 100);

    if (this.state.showSeconds) {
      const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      return includeMs ? `${timeStr}.${milliseconds}` : timeStr;
    } else {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
  }

  updateStatus(text) {
    if (this.elements.statusText) {
      this.elements.statusText.textContent = text;
    }
    
    // Update minimal mode status
    const minimalStatus = document.getElementById('minimalStatus');
    if (minimalStatus) {
      minimalStatus.textContent = text;
      minimalStatus.className = 'minimal-status ' + text.toLowerCase().replace(' ', '-');
    }
  }

  startPulseAnimation() {
    this.stopPulseAnimation();
    this.elements.statusIndicator?.classList.add('pulse');
    this.elements.timeText?.classList.add('running');
    
    // Update minimal mode start button icon
    const minimalStartBtn = document.getElementById('minimalStartBtn');
    if (minimalStartBtn) {
      const icon = minimalStartBtn.querySelector('.material-icons');
      if (icon) icon.textContent = 'pause';
    }
  }

  stopPulseAnimation() {
    this.elements.statusIndicator?.classList.remove('pulse');
    this.elements.timeText?.classList.remove('running');
    
    // Update minimal mode start button icon
    const minimalStartBtn = document.getElementById('minimalStartBtn');
    if (minimalStartBtn) {
      const icon = minimalStartBtn.querySelector('.material-icons');
      if (icon) icon.textContent = 'play_arrow';
    }
  }

  adjustFontSize(delta) {
    const newSize = Math.max(32, Math.min(80, this.state.fontSize + delta));
    if (newSize !== this.state.fontSize) {
      this.state.fontSize = newSize;
      this.applyFontSize();
      this.onStateChange?.('settings-changed');
    }
  }

  applyFontSize() {
    if (this.elements.timeText) {
      this.elements.timeText.style.fontSize = `${this.state.fontSize}px`;
    }
  }

  toggleMilliseconds() {
    this.state.showMilliseconds = !this.state.showMilliseconds;
    
    if (this.elements.millisecondsContainer) {
      if (this.state.showMilliseconds) {
        this.elements.millisecondsContainer.classList.remove('hidden');
      } else {
        this.elements.millisecondsContainer.classList.add('hidden');
      }
    }
    
    this.onStateChange?.('settings-changed');
  }

  toggleSeconds() {
    this.state.showSeconds = !this.state.showSeconds;
    this.updateDisplay();
    this.onStateChange?.('settings-changed');
  }

  getCurrentSession() {
    if (this.state.elapsedTime <= 0) return null;

    const now = new Date();
    return {
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0],
      duration: this.formatElapsedTime(this.state.elapsedTime, true),
      rawSeconds: this.state.elapsedTime / 1000,
      targetEnabled: this.state.targetEnabled,
      targetTime: this.state.targetEnabled ? this.state.targetTime : null
    };
  }

  getTimerState() {
    return {
      isRunning: this.state.isRunning,
      elapsedTime: this.state.elapsedTime,
      targetReached: this.state.targetReached,
      showMilliseconds: this.state.showMilliseconds,
      showSeconds: this.state.showSeconds
    };
  }

  formatTime(ms, includeMs = false) {
    return this.formatElapsedTime(ms, includeMs);
  }
}