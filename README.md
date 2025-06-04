# Timelord Timer - Electron Edition

A modern, modular timer application built with Electron, migrated from Python/Tkinter with enhanced cross-platform functionality.

## 🚀 Features

* **High-Precision Timer** : Millisecond-accurate timing with start/stop/reset functionality
* **Target Timer** : Pomodoro-style target timing with audio notifications
* **Session History** : Persistent session storage with CSV export capability
* **Dual Themes** : Dark and light mode support
* **Minimal Mode** : Compact interface for distraction-free timing
* **Keyboard Shortcuts** : Full keyboard control for power users
* **Cross-Platform** : Native desktop app for Windows, macOS, and Linux
* **Draggable Interface** : Custom title bar with drag-to-move functionality
* **Audio Feedback** : Web Audio API-based sound notifications

## 🛠️ Quick Start

### Prerequisites

* Node.js 18.x or higher
* npm 8.x or higher

### Installation & Running

```bash
# Clone or download the project
cd timelord-electron

# Install dependencies
npm install

# Start development version
npm start

# Start with developer tools
npm run dev
```

### Building for Distribution

```bash
# Build for current platform
npm run build

# Package without installer
npm run pack

# Create installer for current platform
npm run dist

# Clean build artifacts
npm run clean
```

## 🎯 Architecture Overview

### Modular Electron Structure

* **`main.js`** : Main process - window management, file I/O, menu system
* **`preload.js`** : Secure IPC bridge between main and renderer processes
* **`renderer.js`** : Renderer process - UI logic and timer functionality
* **`index.html`** : Application interface structure
* **`styles.css`** : Modern CSS with CSS custom properties for theming

### Key Design Decisions

1. **Security First** : Uses contextBridge and disabled node integration
2. **State Management** : Centralized timer state with event-driven updates
3. **Persistent Storage** : JSON-based data persistence in user directory
4. **Modular Components** : Logical separation of UI elements and functionality
5. **Cross-Platform** : Native Electron APIs for consistent behavior

## ⌨️ Keyboard Shortcuts

| Action              | Shortcut                    |
| ------------------- | --------------------------- |
| Start/Stop Timer    | `Space`                   |
| Reset Timer         | `Enter`or `Ctrl/Cmd+R`  |
| Save Session        | `Ctrl/Cmd+S`              |
| Toggle Minimal Mode | `Ctrl/Cmd+M`              |
| Toggle Theme        | `Ctrl/Cmd+T`              |
| Increase Font       | `Ctrl/Cmd++`              |
| Decrease Font       | `Ctrl/Cmd+-`              |
| Export Sessions     | `Ctrl/Cmd+E`              |
| Close App           | `Escape`or `Ctrl/Cmd+Q` |

## 📊 Data Storage

* **Sessions** : `~/.timelord/sessions.json`
* **Settings** : `~/.timelord/settings.json`
* **Export** : User-selected location for CSV files

## 🔧 Configuration

### Target Timer

* Set custom target duration in minutes
* Audio notification when target is reached
* Visual indication in session history

### Display Options

* Toggle milliseconds precision display
* Toggle seconds vs minutes-only display
* Adjustable font size (20px - 60px)

### Interface Modes

* **Full Mode** : Complete interface with all features
* **Minimal Mode** : Timer and basic controls only
* **Theme Toggle** : Dark mode (default) and light mode

## 🏗️ Development

### Project Structure

```
TIMELORD-ELECTRON/
├── package.json          # Dependencies and build configuration
├── main.js              # Electron main process
├── preload.js           # Secure IPC bridge
├── index.html           # Application UI structure
├── renderer.js          # Frontend logic and timer functionality
├── styles.css           # Modern CSS with theming support
├── assets/
│   └── icon.png         # Application icon
└── README.md           # This file
```

### Adding Features

1. **New UI Components** : Add to `index.html` and style in `styles.css`
2. **Timer Logic** : Extend `TimelordRenderer` class in `renderer.js`
3. **File Operations** : Add IPC handlers in `main.js` and expose via `preload.js`
4. **Menu Items** : Extend menu template in `main.js`

### Security Considerations

* Context isolation enabled
* Node integration disabled in renderer
* Secure IPC communication via preload script
* No eval() or unsafe code execution

## 📦 Building & Distribution

The application uses `electron-builder` for packaging:

* **Windows** : NSIS installer
* **macOS** : DMG with application bundle
* **Linux** : AppImage portable executable

Build artifacts are output to the `dist/` directory.

## 🎨 Customization

### Themes

Edit CSS custom properties in `styles.css`:

```css
:root {
  --bg-primary: #ffffff;
  --accent-blue: #3b82f6;
  /* ... other variables */
}

.theme-dark {
  --bg-primary: #1e1e1e;
  --accent-blue: #60a5fa;
  /* ... dark theme overrides */
}
```

### Audio Feedback

Modify the `playSound()` method in `renderer.js` to customize notification sounds.

## 🐛 Troubleshooting

### Common Issues

* **App won't start** : Ensure Node.js 18+ is installed
* **No audio** : Check system audio permissions
* **Settings not saving** : Verify write permissions to user directory
* **Window positioning** : May vary on multi-monitor setups

### Debug Mode

Run with `npm run dev` to open developer tools for debugging.

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

* **Issues** : [GitHub Issues](https://github.com/your-org/timelord-electron/issues)
* **Documentation** : [Project Wiki](https://github.com/your-org/timelord-electron/wiki)
* **Discussions** : [GitHub Discussions](https://github.com/your-org/timelord-electron/discussions)
