class TogglesComponent {
  constructor(timerComponent, onStateChange) {
    this.timer = timerComponent;
    this.onStateChange = onStateChange;
    this.elements = {};
    this.init();
  }

  init() {
    this.elements = {
      targetToggle: document.getElementById('targetToggle'),
      targetMinutes: document.getElementById('targetMinutes'),
      millisecondsToggle: document.getElementById('millisecondsToggle'),
      secondsToggle: document.getElementById('secondsToggle')
    };

    this.bindEvents();
    this.updateToggles();
  }

  bindEvents() {
    // Target timer
    this.elements.targetToggle?.addEventListener('change', () => this.toggleTarget());
    this.elements.targetMinutes?.addEventListener('input', () => this.updateTargetTime());

    // Display toggles
    this.elements.millisecondsToggle?.addEventListener('change', () => this.toggleMilliseconds());
    this.elements.secondsToggle?.addEventListener('change', () => this.toggleSeconds());
  }

  toggleTarget() {
    this.timer.state.targetEnabled = this.elements.targetToggle?.checked || false;
    this.updateTargetTime();
    this.onStateChange?.('settings-changed');
  }

  updateTargetTime() {
    if (this.timer.state.targetEnabled && this.elements.targetMinutes) {
      const minutes = parseInt(this.elements.targetMinutes.value) || 25;
      this.timer.state.targetTime = minutes * 60 * 1000;
    }
  }

  toggleMilliseconds() {
    // Set the state directly from checkbox
    this.timer.state.showMilliseconds = this.elements.millisecondsToggle?.checked || false;
    
    // Update milliseconds container visibility
    if (this.timer.elements.millisecondsContainer) {
      if (this.timer.state.showMilliseconds) {
        this.timer.elements.millisecondsContainer.classList.remove('hidden');
      } else {
        this.timer.elements.millisecondsContainer.classList.add('hidden');
      }
    }
    
    // Update display
    this.timer.updateDisplay();
    this.onStateChange?.('settings-changed');
  }

  toggleSeconds() {
    // Set the state directly from checkbox
    this.timer.state.showSeconds = this.elements.secondsToggle?.checked || false;
    
    // Update display
    this.timer.updateDisplay();
    this.onStateChange?.('settings-changed');
  }

  updateToggles() {
    if (this.elements.targetToggle) {
      this.elements.targetToggle.checked = this.timer.state.targetEnabled;
    }

    if (this.elements.millisecondsToggle) {
      this.elements.millisecondsToggle.checked = this.timer.state.showMilliseconds;
    }

    if (this.elements.secondsToggle) {
      this.elements.secondsToggle.checked = this.timer.state.showSeconds;
    }

    // Update timer display based on toggle states
    if (this.timer.elements.millisecondsContainer) {
      if (this.timer.state.showMilliseconds) {
        this.timer.elements.millisecondsContainer.classList.remove('hidden');
      } else {
        this.timer.elements.millisecondsContainer.classList.add('hidden');
      }
    }
  }

  loadState(state) {
    this.timer.state.targetEnabled = state.targetEnabled || false;
    this.timer.state.showMilliseconds = state.showMilliseconds || false;
    this.timer.state.showSeconds = state.showSeconds !== undefined ? state.showSeconds : true;
    
    if (this.elements.targetMinutes && state.targetTime) {
      const minutes = Math.round(state.targetTime / (60 * 1000));
      this.elements.targetMinutes.value = minutes;
      this.timer.state.targetTime = state.targetTime;
    }

    this.updateToggles();
  }
}