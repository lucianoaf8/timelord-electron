class ButtonsComponent {
  constructor(timerComponent, onAction) {
    this.timer = timerComponent;
    this.onAction = onAction;
    this.elements = {};
    this.audioContext = null;
    this.init();
  }

  init() {
    try {
      this.elements = {
        startBtn: document.getElementById('startBtn'),
        resetBtn: document.getElementById('resetBtn'),
        saveBtn: document.getElementById('saveBtn')
      };

      this.bindEvents();
      this.updateButtonStates();
    } catch (error) {
      console.error('Error initializing ButtonsComponent:', error);
    }
  }

  bindEvents() {
    try {
      if (this.elements.startBtn) {
        this.elements.startBtn.addEventListener('click', () => this.handleStart());
      }
      if (this.elements.resetBtn) {
        this.elements.resetBtn.addEventListener('click', () => this.handleReset());
      }
      if (this.elements.saveBtn) {
        this.elements.saveBtn.addEventListener('click', () => this.handleSave());
      }
    } catch (error) {
      console.error('Error binding button events:', error);
    }
  }

  handleStart() {
    try {
      if (this.timer.state.isRunning) {
        this.timer.stop();
        this.playSound('stop');
      } else {
        this.timer.start();
        this.playSound('start');
      }
      this.updateButtonStates();
      if (this.onAction) {
        this.onAction('timer-toggled');
      }
    } catch (error) {
      console.error('Error handling start:', error);
    }
  }

  handleReset() {
    try {
      this.timer.reset();
      this.playSound('reset');
      this.updateButtonStates();
      if (this.onAction) {
        this.onAction('timer-reset');
      }
    } catch (error) {
      console.error('Error handling reset:', error);
    }
  }

  handleSave() {
    try {
      const session = this.timer.getCurrentSession();
      if (session) {
        this.playSound('save');
        if (this.onAction) {
          this.onAction('save-session', session);
        }
      }
    } catch (error) {
      console.error('Error handling save:', error);
    }
  }

  updateButtonStates() {
    try {
      if (this.elements.startBtn) {
        const iconSpan = this.elements.startBtn.querySelector('.material-icons');
        if (this.timer.state.isRunning) {
          if (iconSpan) {
            iconSpan.textContent = 'pause';
          }
          this.elements.startBtn.innerHTML = '<span class="material-icons">pause</span>PAUSE';
          this.elements.startBtn.className = 'control-button start-btn running';
        } else {
          if (iconSpan) {
            iconSpan.textContent = 'play_arrow';
          }
          this.elements.startBtn.innerHTML = '<span class="material-icons">play_arrow</span>START';
          this.elements.startBtn.className = 'control-button start-btn';
        }
      }
    } catch (error) {
      console.error('Error updating button states:', error);
    }
  }

  async playSound(type) {
    try {
      // Try to use Electron API first
      if (window.electronAPI && window.electronAPI.playNotificationSound) {
        await window.electronAPI.playNotificationSound(type);
      } else {
        // Fallback to web audio
        this.playWebAudio(type);
      }
    } catch (error) {
      // Fallback to web audio
      this.playWebAudio(type);
    }
  }

  playWebAudio(type) {
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }

      const frequencies = {
        start: 440,    // A4
        stop: 330,     // E4
        reset: 220,    // A3
        save: 550,     // C#5
        target: 660    // E5
      };

      const frequency = frequencies[type] || 440;
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.2);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }

  handleKeyboard(e) {
    try {
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          this.handleStart();
          break;
        case 'KeyR':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            this.handleReset();
          }
          break;
        case 'KeyS':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            this.handleSave();
          }
          break;
      }
    } catch (error) {
      console.error('Error handling keyboard:', error);
    }
  }
}