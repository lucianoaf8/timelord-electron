class SessionHistoryComponent {
  constructor(onExport) {
    this.sessions = [];
    this.onExport = onExport;
    this.elements = {};
    this.init();
  }

  init() {
    this.elements = {
      sessionsList: document.getElementById('sessionsList'),
      sessionsStats: document.getElementById('sessionsStats'),
      statsText: document.getElementById('statsText'),
      exportBtn: document.getElementById('exportBtn')
    };

    this.bindEvents();
    this.updateDisplay();
  }

  bindEvents() {
    this.elements.exportBtn?.addEventListener('click', () => this.exportSessions());
  }

  addSession(session) {
    this.sessions.unshift(session);
    
    // Keep only last 10 sessions
    if (this.sessions.length > 10) {
      this.sessions = this.sessions.slice(0, 10);
    }

    this.updateDisplay();
    return this.sessions;
  }

  loadSessions(sessions) {
    // Always start empty - ignore any loaded sessions
    this.sessions = [];
    this.updateDisplay();
  }

  updateDisplay() {
    if (!this.elements.sessionsList) return;

    // Always hide stats completely
    this.elements.sessionsStats?.classList.add('hidden');
    
    this.elements.sessionsList.innerHTML = '';
    
    if (this.sessions.length === 0) {
      this.elements.sessionsList.innerHTML = `
        <div class="empty-sessions">
          <p>No sessions recorded yet</p>
          <p>Press SAVE to record time</p>
        </div>
      `;
      return;
    }

    this.renderSessions();
  }

  renderSessions() {
    if (!this.elements.sessionsList) return;

    this.sessions.forEach((session, index) => {
      const sessionElement = document.createElement('div');
      sessionElement.className = 'session-item';
      
      // Extract just the time part (HH:MM:SS) from session.time
      const timeOnly = session.time.split(':').slice(0, 2).join(':'); // Get HH:MM
      
      // Format duration to be more compact
      const compactDuration = this.formatCompactDuration(session.rawSeconds);
      
      // Create compact display with index
      let content = `
        <div class="session-compact">
          <span class="session-index">#${index + 1}</span>
          <span class="session-time">${timeOnly}</span>
          <span class="session-arrow">→</span>
          <span class="session-duration">${compactDuration}</span>
      `;
      
      // Add target indicator if enabled
      if (session.targetEnabled && session.targetTime) {
        const targetMinutes = Math.round(session.targetTime / 60);
        const reached = session.rawSeconds >= session.targetTime;
        content += `<span class="session-target">${reached ? '🎯' : '⏱'}</span>`;
      }
      
      content += `</div>`;
      
      sessionElement.innerHTML = content;
      this.elements.sessionsList.appendChild(sessionElement);
    });
  }

  formatCompactDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    // More compact format
    if (hours > 0) {
      return `${hours}h${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m${secs}s`;
    } else {
      return `${secs}s`;
    }
  }

  async exportSessions() {
    if (this.sessions.length === 0) {
      alert('No sessions to export!');
      return;
    }

    try {
      const result = await this.onExport?.(this.sessions);
      if (result?.success && !result.cancelled) {
        alert(`Sessions exported successfully to:\n${result.path}`);
      } else if (result?.error) {
        alert(`Export failed: ${result.error}`);
      }
    } catch (error) {
      alert(`Export failed: ${error.message}`);
    }
  }

  getSessions() {
    return this.sessions;
  }

  clearSessions() {
    this.sessions = [];
    this.updateDisplay();
  }
}