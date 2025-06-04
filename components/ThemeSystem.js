class ThemeSystem {
  constructor() {
    this.themes = {
      'cyber-blue': {
        name: 'Cyber Blue',
        displayName: '🌊 Cyber Blue',
        fonts: {
          primary: 'Orbitron',
          secondary: 'JetBrains Mono'
        },
        colors: {
          // Background colors
          bgPrimary: '#0c0c0c',
          bgSecondary: '#1a1a2e',
          bgTertiary: '#16213e',
          
          // Text colors
          textPrimary: '#ffffff',
          textSecondary: '#e2e8f0',
          textMuted: 'rgba(0, 200, 255, 0.6)',
          
          // Accent colors
          accentPrimary: '#00c8ff',
          accentSecondary: '#0080ff',
          
          // Button colors - Cyber Blue theme
          successColor: '#00e5ff',
          successHover: '#00bcd4',
          dangerColor: '#ff1744',
          dangerHover: '#d50000',
          purpleColor: '#3f51b5',
          purpleHover: '#303f9f',
          pinkColor: '#e91e63',
          pinkHover: '#c2185b',
          warningColor: '#00bcd4',
          
          // Effects
          neonGlow: 'rgba(0, 200, 255, 0.4)',
          particleColor: 'rgba(0, 200, 255, 0.3)',
          gridColor: 'rgba(0, 200, 255, 0.08)',
          borderColor: 'rgba(0, 200, 255, 0.25)'
        },
        effects: {
          particleCount: 50,
          glowIntensity: 0.4,
          animationSpeed: 1.0
        }
      },

      'neon-purple': {
        name: 'Neon Purple',
        displayName: '💜 Neon Purple',
        fonts: {
          primary: 'Orbitron',
          secondary: 'JetBrains Mono'
        },
        colors: {
          bgPrimary: '#0a0a0f',
          bgSecondary: '#1a0f2e',
          bgTertiary: '#2d1b3d',
          
          textPrimary: '#ffffff',
          textSecondary: '#e2e8f0',
          textMuted: 'rgba(186, 85, 255, 0.6)',
          
          accentPrimary: '#ba55ff',
          accentSecondary: '#9333ea',
          
          // Button colors - Neon Purple theme
          successColor: '#00e676',
          successHover: '#00c853',
          dangerColor: '#e91e63',
          dangerHover: '#ad1457',
          purpleColor: '#ba55ff',
          purpleHover: '#9333ea',
          pinkColor: '#ff4081',
          pinkHover: '#f50057',
          warningColor: '#ab47bc',
          
          neonGlow: 'rgba(186, 85, 255, 0.5)',
          particleColor: 'rgba(186, 85, 255, 0.4)',
          gridColor: 'rgba(186, 85, 255, 0.1)',
          borderColor: 'rgba(186, 85, 255, 0.3)'
        },
        effects: {
          particleCount: 60,
          glowIntensity: 0.5,
          animationSpeed: 1.2
        }
      },

      'matrix-green': {
        name: 'Matrix Green',
        displayName: '💚 Matrix Green',
        fonts: {
          primary: 'Orbitron',
          secondary: 'JetBrains Mono'
        },
        colors: {
          bgPrimary: '#0a0f0a',
          bgSecondary: '#0f1f0f',
          bgTertiary: '#1a2e1a',
          
          textPrimary: '#00ff41',
          textSecondary: '#00cc33',
          textMuted: 'rgba(0, 255, 65, 0.6)',
          
          accentPrimary: '#00ff41',
          accentSecondary: '#00cc33',
          
          // Button colors - Matrix Green theme
          successColor: '#76ff03',
          successHover: '#64dd17',
          dangerColor: '#f44336',
          dangerHover: '#d32f2f',
          purpleColor: '#4caf50',
          purpleHover: '#388e3c',
          pinkColor: '#8bc34a',
          pinkHover: '#689f38',
          warningColor: '#cddc39',
          
          neonGlow: 'rgba(0, 255, 65, 0.5)',
          particleColor: 'rgba(0, 255, 65, 0.4)',
          gridColor: 'rgba(0, 255, 65, 0.1)',
          borderColor: 'rgba(0, 255, 65, 0.3)'
        },
        effects: {
          particleCount: 75,
          glowIntensity: 0.6,
          animationSpeed: 0.8
        }
      },

      'sunset-orange': {
        name: 'Sunset Orange',
        displayName: '🧡 Sunset Orange',
        fonts: {
          primary: 'Orbitron',
          secondary: 'JetBrains Mono'
        },
        colors: {
          bgPrimary: '#0f0a05',
          bgSecondary: '#2e1a0f',
          bgTertiary: '#3d2d1b',
          
          textPrimary: '#ffffff',
          textSecondary: '#f0e6d2',
          textMuted: 'rgba(255, 149, 0, 0.6)',
          
          accentPrimary: '#ff9500',
          accentSecondary: '#ff6b00',
          
          // Button colors - Sunset Orange theme
          successColor: '#4caf50',
          successHover: '#388e3c',
          dangerColor: '#f44336',
          dangerHover: '#d32f2f',
          purpleColor: '#ff7043',
          purpleHover: '#f4511e',
          pinkColor: '#ff8a65',
          pinkHover: '#ff5722',
          warningColor: '#ffa726',
          
          neonGlow: 'rgba(255, 149, 0, 0.5)',
          particleColor: 'rgba(255, 149, 0, 0.4)',
          gridColor: 'rgba(255, 149, 0, 0.1)',
          borderColor: 'rgba(255, 149, 0, 0.3)'
        },
        effects: {
          particleCount: 40,
          glowIntensity: 0.4,
          animationSpeed: 1.1
        }
      },

      'minimal-dark': {
        name: 'Minimal Dark',
        displayName: '⚫ Minimal Dark',
        fonts: {
          primary: 'Inter',
          secondary: 'SF Mono'
        },
        colors: {
          bgPrimary: '#0f172a',
          bgSecondary: '#1e293b',
          bgTertiary: '#334155',
          
          textPrimary: '#f8fafc',
          textSecondary: '#e2e8f0',
          textMuted: '#94a3b8',
          
          accentPrimary: '#60a5fa',
          accentSecondary: '#3b82f6',
          
          // Button colors - Minimal Dark theme
          successColor: '#10b981',
          successHover: '#059669',
          dangerColor: '#ef4444',
          dangerHover: '#dc2626',
          purpleColor: '#6366f1',
          purpleHover: '#4f46e5',
          pinkColor: '#ec4899',
          pinkHover: '#be185d',
          warningColor: '#eab308',
          
          neonGlow: 'rgba(96, 165, 250, 0.3)',
          particleColor: 'rgba(96, 165, 250, 0.2)',
          gridColor: 'rgba(96, 165, 250, 0.05)',
          borderColor: 'rgba(100, 116, 139, 0.3)'
        },
        effects: {
          particleCount: 20,
          glowIntensity: 0.2,
          animationSpeed: 1.5
        }
      },

      'light': {
        name: 'Light',
        displayName: '☀️ Light',
        fonts: {
          primary: 'Inter',
          secondary: 'SF Mono'
        },
        colors: {
          bgPrimary: '#ffffff',
          bgSecondary: '#f8fafc',
          bgTertiary: '#f1f5f9',
          
          textPrimary: '#1e293b',
          textSecondary: '#64748b',
          textMuted: '#94a3b8',
          
          accentPrimary: '#3b82f6',
          accentSecondary: '#60a5fa',
          
          // Button colors - Light theme
          successColor: '#16a34a',
          successHover: '#15803d',
          dangerColor: '#dc2626',
          dangerHover: '#b91c1c',
          purpleColor: '#7c3aed',
          purpleHover: '#6d28d9',
          pinkColor: '#be185d',
          pinkHover: '#9d174d',
          warningColor: '#d97706',
          
          neonGlow: 'rgba(59, 130, 246, 0.3)',
          particleColor: 'rgba(59, 130, 246, 0.4)',
          gridColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: '#e2e8f0'
        },
        effects: {
          particleCount: 30,
          glowIntensity: 0.1,
          animationSpeed: 2.0
        }
      },

      // -------- New Sci-Fi Movie Themes --------

      'hal-red': {
        name: 'HAL Red',
        displayName: '🔴 HAL Red',
        fonts: {
          primary: 'Share Tech Mono',
          secondary: 'JetBrains Mono'
        },
        colors: {
          bgPrimary: '#0a0002',
          bgSecondary: '#1a0a0a',
          bgTertiary: '#2a0a0a',

          textPrimary: '#ffffff',
          textSecondary: '#ffcccc',
          textMuted: 'rgba(255, 0, 0, 0.4)',

          accentPrimary: '#ff0000',
          accentSecondary: '#cc0000',

          successColor: '#ff3b3b',
          successHover: '#d32f2f',
          dangerColor: '#ff1a1a',
          dangerHover: '#b71c1c',
          purpleColor: '#c62828',
          purpleHover: '#8e0000',
          pinkColor: '#e53935',
          pinkHover: '#c62828',
          warningColor: '#f44336',

          neonGlow: 'rgba(255, 0, 0, 0.4)',
          particleColor: 'rgba(255, 0, 0, 0.3)',
          gridColor: 'rgba(255, 0, 0, 0.1)',
          borderColor: 'rgba(255, 0, 0, 0.25)'
        },
        effects: {
          particleCount: 25,
          glowIntensity: 0.5,
          animationSpeed: 1.0
        }
      },

      'tesseract-mode': {
        name: 'Tesseract Mode',
        displayName: '🧿 Tesseract Mode',
        fonts: {
          primary: 'Space Mono',
          secondary: 'Rajdhani'
        },
        colors: {
          bgPrimary: '#010101',
          bgSecondary: '#0d1117',
          bgTertiary: '#111827',

          textPrimary: '#c3dafe',
          textSecondary: '#94a3b8',
          textMuted: 'rgba(203, 213, 225, 0.4)',

          accentPrimary: '#00ffe0',
          accentSecondary: '#60fdfd',

          successColor: '#38bdf8',
          successHover: '#0ea5e9',
          dangerColor: '#ef4444',
          dangerHover: '#dc2626',
          purpleColor: '#818cf8',
          purpleHover: '#6366f1',
          pinkColor: '#f472b6',
          pinkHover: '#ec4899',
          warningColor: '#facc15',

          neonGlow: 'rgba(0, 255, 224, 0.4)',
          particleColor: 'rgba(224, 255, 250, 0.3)',
          gridColor: 'rgba(100, 255, 250, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        },
        effects: {
          particleCount: 40,
          glowIntensity: 0.6,
          animationSpeed: 1.2
        }
      },

      'stark-hud': {
        name: 'Stark HUD',
        displayName: '🔵 Stark HUD',
        fonts: {
          primary: 'Orbitron',
          secondary: 'Eurostile'
        },
        colors: {
          bgPrimary: '#061826',
          bgSecondary: '#0a2a43',
          bgTertiary: '#0e3c57',

          textPrimary: '#ffffff',
          textSecondary: '#cbd5e1',
          textMuted: 'rgba(0, 255, 255, 0.3)',

          accentPrimary: '#00ffff',
          accentSecondary: '#00e0e0',

          successColor: '#00bcd4',
          successHover: '#0097a7',
          dangerColor: '#ff5252',
          dangerHover: '#e53935',
          purpleColor: '#00acc1',
          purpleHover: '#00838f',
          pinkColor: '#26c6da',
          pinkHover: '#00acc1',
          warningColor: '#ffee58',

          neonGlow: 'rgba(0, 255, 255, 0.4)',
          particleColor: 'rgba(0, 255, 255, 0.3)',
          gridColor: 'rgba(0, 255, 255, 0.1)',
          borderColor: 'rgba(0, 255, 255, 0.2)'
        },
        effects: {
          particleCount: 35,
          glowIntensity: 0.5,
          animationSpeed: 1.4
        }
      },

      'vault-tec': {
        name: 'Vault-Tec',
        displayName: '💛 Vault-Tec',
        fonts: {
          primary: 'VT323',
          secondary: 'Press Start 2P'
        },
        colors: {
          bgPrimary: '#222000',
          bgSecondary: '#2a2a0a',
          bgTertiary: '#3a3a1a',

          textPrimary: '#cfd364',
          textSecondary: '#ffff99',
          textMuted: 'rgba(255, 255, 102, 0.5)',

          accentPrimary: '#f3ff0a',
          accentSecondary: '#e6e600',

          successColor: '#b2ff59',
          successHover: '#aeea00',
          dangerColor: '#ff7043',
          dangerHover: '#e64a19',
          purpleColor: '#ffee58',
          purpleHover: '#fdd835',
          pinkColor: '#ffcc80',
          pinkHover: '#ffb74d',
          warningColor: '#fbc02d',

          neonGlow: 'rgba(243, 255, 10, 0.4)',
          particleColor: 'rgba(255, 255, 100, 0.4)',
          gridColor: 'rgba(255, 255, 100, 0.1)',
          borderColor: 'rgba(255, 255, 100, 0.3)'
        },
        effects: {
          particleCount: 30,
          glowIntensity: 0.3,
          animationSpeed: 0.9
        }
      },

      'monolith-white': {
        name: 'Monolith White',
        displayName: '🤍 Monolith White',
        fonts: {
          primary: 'DIN Condensed',
          secondary: 'Rubik'
        },
        colors: {
          bgPrimary: '#f4f4f4',
          bgSecondary: '#ffffff',
          bgTertiary: '#e5e7eb',

          textPrimary: '#1f2937',
          textSecondary: '#4b5563',
          textMuted: '#9ca3af',

          accentPrimary: '#0099ff',
          accentSecondary: '#1e40af',

          successColor: '#10b981',
          successHover: '#059669',
          dangerColor: '#ef4444',
          dangerHover: '#dc2626',
          purpleColor: '#6366f1',
          purpleHover: '#4f46e5',
          pinkColor: '#ec4899',
          pinkHover: '#be185d',
          warningColor: '#fbbf24',

          neonGlow: 'rgba(0, 153, 255, 0.2)',
          particleColor: 'rgba(0, 153, 255, 0.15)',
          gridColor: 'rgba(0, 0, 0, 0.02)',
          borderColor: '#d1d5db'
        },
        effects: {
          particleCount: 15,
          glowIntensity: 0.15,
          animationSpeed: 1.6
        }
      },

      'tron-legacy': {
        name: 'Tron Legacy',
        displayName: '🌌 Tron Legacy',
        fonts: {
          primary: 'Orbitron',
          secondary: 'Audiowide'
        },
        colors: {
          bgPrimary: '#0a0a0a',
          bgSecondary: '#0d1117',
          bgTertiary: '#0f0f1a',

          textPrimary: '#00f9ff',
          textSecondary: '#99e9f2',
          textMuted: 'rgba(0, 255, 255, 0.4)',

          accentPrimary: '#00f9ff',
          accentSecondary: '#00c0e0',

          successColor: '#00e5ff',
          successHover: '#00bcd4',
          dangerColor: '#ff1744',
          dangerHover: '#d50000',
          purpleColor: '#3f51b5',
          purpleHover: '#303f9f',
          pinkColor: '#e91e63',
          pinkHover: '#c2185b',
          warningColor: '#00bcd4',

          neonGlow: 'rgba(0, 255, 255, 0.5)',
          particleColor: 'rgba(0, 255, 255, 0.3)',
          gridColor: 'rgba(0, 255, 255, 0.08)',
          borderColor: 'rgba(0, 255, 255, 0.25)'
        },
        effects: {
          particleCount: 55,
          glowIntensity: 0.6,
          animationSpeed: 1.2
        }
      }
    };

    this.currentTheme = 'cyber-blue';
  }

  getTheme(themeName) {
    return this.themes[themeName] || this.themes['cyber-blue'];
  }

  getAllThemes() {
    return Object.keys(this.themes).map(key => ({
      key,
      ...this.themes[key]
    }));
  }

  getNextTheme(currentTheme) {
    const themeKeys = Object.keys(this.themes);
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    return themeKeys[nextIndex];
  }

  applyTheme(themeName, backgroundComponent) {
    const theme = this.getTheme(themeName);
    if (!theme) return;

    this.currentTheme = themeName;

    // Apply CSS variables
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([property, value]) => {
      // Convert camelCase to kebab-case for CSS variables
      const cssProperty = `--${property.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssProperty, value);
    });

    // Apply fonts
    if (theme.fonts) {
      root.style.setProperty('--font-primary', theme.fonts.primary);
      root.style.setProperty('--font-secondary', theme.fonts.secondary);
    }

    // Update body class for any theme-specific styles
    document.body.className = `theme-${themeName}`;

    // Update background component with new settings
    if (backgroundComponent && theme.effects) {
      backgroundComponent.updateTheme(themeName, theme.effects);
    }

    return theme;
  }

  // Create a theme selector UI element
  createThemeSelector(onThemeChange) {
    const selector = document.createElement('select');
    selector.className = 'theme-selector';
    selector.style.cssText = `
      background: var(--bg-tertiary);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 4px 8px;
      font-size: 10px;
      cursor: pointer;
    `;

    this.getAllThemes().forEach(theme => {
      const option = document.createElement('option');
      option.value = theme.key;
      option.textContent = theme.displayName;
      selector.appendChild(option);
    });

    selector.addEventListener('change', (e) => {
      onThemeChange?.(e.target.value);
    });

    return selector;
  }
}
