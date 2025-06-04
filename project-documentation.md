**Proposed Modular Project Structure for TIMELORD (Electron & Web Stack)**

Below is a suggested directory layout and description of each module/component. The goal is to break the existing 1,000‑line monolithic script into clear separation of concerns, making future enhancements and maintenance straightforward.

```
TIMELORD-ELECTRON/
├── package.json                 # Project metadata, dependencies, scripts
├── tsconfig.json                # TypeScript compiler config (if using TS)
├── .gitignore                   # Files/folders to ignore in Git
├── README.md                    # Overview, setup, build instructions
├── build/                       # Electron packaged builds (output from electron-builder)
├── public/                      # Static assets copied verbatim into final bundle
│   ├── icon.png                 # Application icon
│   └── index.html               # Main HTML file for renderer entry
├── src/                         # All source code (Electron main + renderer)
│   ├── main/                    # Electron “main” process files
│   │   ├── index.ts             # Entry point: create BrowserWindow, load URL, app events
│   │   ├── menu.ts              # Custom application menu (File, View, Help, etc.)
│   │   ├── tray.ts              # System tray integration (icon, context menu)
│   │   ├── ipcMainHandlers.ts   # ipcMain listeners/channels for communication
│   │   ├── autoUpdater.ts       # Electron auto-update logic (if planned)
│   │   └── types.d.ts           # Shared type definitions (e.g., IPC payloads)
│   ├── preload/                 # Preload script (contextBridge / safe IPC)
│   │   └── preload.ts           # Expose safe APIs to renderer (e.g., file I/O)
│   ├── renderer/                # All front‑end (web) code
│   │   ├── components/          # Reusable UI components (buttons, toggles, history list)
│   │   │   ├── Header.tsx       # Title bar + close/minimize buttons
│   │   │   ├── TimerDisplay.tsx # Digit display + state indicator
│   │   │   ├── Controls.tsx     # Start/Reset/Save button group
│   │   │   ├── ToggleSwitch.tsx # Milliseconds/Seconds toggle component
│   │   │   └── HistoryList.tsx  # Scrollable session history list
│   │   ├── styles/              # CSS/SCSS modules, theme definitions, variables
│   │   │   ├── global.css       # Base resets, dark theme vars, fonts
│   │   │   ├── Header.module.css
│   │   │   ├── TimerDisplay.module.css
│   │   │   └── Controls.module.css
│   │   ├── pages/               # If the app grows to multiple views/pages
│   │   ├── App.tsx              # Root React (or other UI library) component
│   │   ├── index.tsx            # Renderer entry: ReactDOM.render() or equivalent
│   │   └── types.d.ts           # Shared front‑end types (e.g., TimerState)
│   ├── utils/                   # Pure helper modules (formatting, date math)
│   │   ├── timeFormatter.ts     # Format elapsed time into `HH:MM:SS(.ms)` strings
│   │   ├── storage.ts           # Persistent storage: read/write JSON (session history)
│   │   ├── constants.ts         # Color codes, default theme vars, font sizes
│   │   └── validations.ts       # Validate user input (if any), clamp ranges
│   └── assets/                  # Static assets (SVG icons, fonts, sound files)
│       ├── logo.svg             # Vector icon for title bar
│       └── font/                # Any custom web fonts for neon glows
├── scripts/                     # Auxiliary scripts (e.g., lint, format, release)
│   ├── build-electron.js        # Custom bundling logic (if needed)
│   └── prelaunch-checks.sh      # Verify Node version, dependencies, env vars
└── tests/                       # Unit / integration tests
    ├── main/                    # Tests for main‑process logic (e.g., IPC, storage)
    │   └── ipcMainHandlers.test.ts
    └── renderer/                # Tests for React components (snapshot, behavior)
        └── TimerDisplay.test.tsx
```

---

### Module Descriptions & Rationale

1. **`package.json` & Build Configs**
   * Define all dependencies (e.g., `electron`, `electron-builder`, `react`, `typescript`, etc.).
   * Include scripts for `npm run start`, `npm run build`, `npm run dist` (for packaging).
   * If using TypeScript, configure `tsconfig.json` to output into `dist/` or `out/` directories.
2. **`public/index.html`**
   * Minimal HTML shell that loads the renderer bundle (`<div id="root"></div>`).
   * Link to a bundled CSS file or import library styles (e.g., Tailwind, if chosen).
3. **`src/main/` (Electron Main Process)**
   * **`index.ts`** : Initialize the Electron `app`, create a `BrowserWindow` (transparent/frameless if replicating the custom title bar), load `file://./index.html`. Manage `ready`, `window-all-closed`, `activate` events. Grab environment variables (e.g., `NODE_ENV`) to decide whether to open devtools or not.
   * **`menu.ts`** : Define a custom application menu (File → New Session, Edit → Clear History, View → Toggle DevTools, Help → About). Keeps menu logic separate from window-creation code.
   * **`tray.ts`** : If you want a system tray icon to launch/hide the timer quickly. Handles `tray.on('click')`, building context menu (Start, Pause, Show, Quit).
   * **`ipcMainHandlers.ts`** : Expose main-process functions via `ipcMain.handle(...)` or `ipcMain.on(...)` to the renderer. E.g., `save-session`: write JSON to disk; `fetch-history`: read JSON from disk; `request-close`: perform any cleanup.
   * **`autoUpdater.ts`** : (Optional) Use `electron-updater` to check for updates and notify. Keeps that logic isolated.
4. **`src/preload/preload.ts`**
   * Use `contextBridge.exposeInMainWorld(...)` to define safe APIs that the renderer can call (e.g., `window.api.saveSession(data)` or `window.api.getHistory()`). Prevents direct access to Node.js in the renderer, mitigating security risks.
5. **`src/renderer/` (Front-End Code)**
   * **`components/`** : Break UI into small, reusable React (or Preact/Vue/vanilla TS) components. Each has its own CSS module for styling:
   * `Header.tsx`: Renders the ⏰ icon, title, and custom close/minimize buttons. Binds clicks to `window.api.requestClose()` via IPC.
   * `TimerDisplay.tsx`: Shows `HH:MM:SS` (and optionally `.ms`) with neon glow. Listens to a `useTimer` hook or context that tracks `isRunning`, `elapsedTime`.
   * `Controls.tsx`: Group of three buttons. Each triggers an IPC event or local state change (`start`, `reset`, `save`). Button styling (green/orange/purple) pulled from CSS variables.
   * `ToggleSwitch.tsx`: Implements a custom CSS toggle. Maintains local state (`on/off`) or reads from React context. On toggle, instructs parent to switch between seconds/milliseconds granularity.
   * `HistoryList.tsx`: Scrollable `div` that lists past sessions (time stamps + duration). Reads from React context or calls `window.api.getHistory()`. Renders multiple `<HistoryItem>` subcomponents.
   * **`styles/`** : Each component’s dark theme styling. Common variables in `global.css`:
   * `:root { --bg-dark: #1a1a1a; --accent-blue: #60a5fa; --neon: #60e5ff; --btn-start: #10b981; --btn-reset: #f59e0b; --btn-save: #8b5cf6; }`
   * Shared classes (`.neon-text`, `.round-corner`, `.drop-shadow`) can be reused across components.
   * **`App.tsx`** : Glue that puts all components together. Manages top‑level state (e.g., `timerState`, `history`, `showMilliseconds`, etc.) via React `useState` or `useReducer`.
   * **`index.tsx`** : Bootstrap file that renders `<App />` into `<div id="root"></div>` and optionally attaches hot‑reload (if in dev mode).
6. **`src/utils/` (Pure JS/TS Helpers)**
   * `timeFormatter.ts`: Functions to convert milliseconds to `HH:MM:SS` or `HH:MM:SS:mm` strings. Nothing UI‑specific.
   * `storage.ts`: Abstraction over `window.api.readHistory()` & `window.api.writeHistory()`. Handles file I/O in main process, but presents a Promise‑based API to renderer.
   * `constants.ts`: Central place for color codes, default font sizes, default window dimensions.
   * `validations.ts`: Simple checks (e.g., prevent saving when `elapsedTime === 0`, clamp maximum session entries to avoid huge JSON files).
7. **`src/assets/`**
   * **`logo.svg`** : High-resolution vector icon. Used in `Header.tsx` or as the application dock/tray icon.
   * **`fonts/`** : Any custom fonts loaded via `@font-face` in CSS (e.g., a pixel‑perfect monospace for the timer digits).
   * **`sounds/`** (Optional): If you want auditory cues (start beep, stop beep, save beep), store short `.mp3` or `.wav` files here and load via HTMLAudioElement.
8. **`scripts/`**
   * **`build-electron.js`** : If you require extra programmatic bundling steps (e.g., copying certain files into `dist/`, injecting environment variables into the renderer code, or renaming HTML files). Usually, you can rely on `electron-builder` config in `package.json`, but having a script gives more control if your CI/CD pipeline demands it.
   * **`prelaunch-checks.sh`** : Simple Bash script used in CI to lint/format, ensure Node version >= 18.x, run tests. Could be invoked before `npm run build`.
9. **`tests/`**
   * **`tests/main/`** : Unit tests for main process logic. For example, test that `ipcMain.handle('save-session')` writes correct JSON or test that `menu.ts` generates the correct menu template structure.
   * **`tests/renderer/`** : Use a framework like Jest + React Testing Library to test renderer components. E.g., snapshot tests for `<TimerDisplay />` when `elapsedTime` changes, or ensure `<ToggleSwitch>` toggles its position and calls the correct callback.

---

### Architectural Benefits of This Layout

* **Separation of Concerns** : Main process code (app lifecycle, file I/O) lives independently of renderer code (UI). Preload scripts isolate Node access from front-end.
* **Scalability** : If you add features—like a preferences window, advanced reporting, dark/light switch—it’s easy to drop a new folder under `renderer/pages/` or create additional IPC channels.
* **Testability** : With helpers in `utils/`, you can write unit tests for time formatting, history persistence, or channel validation without needing to render the UI.
* **Maintainability** : Smaller files with a narrow focus are easier to reason about. When a bug emerges in menu logic, you know to look in `src/main/menu.ts`. If the timer display flickers, you inspect `TimerDisplay.tsx` and its CSS module.
* **Future Enhancements** :
* **Multiple Windows** : Add a second window (e.g., a floating mini‑timer or a settings window) by creating a new `createWindow("settings")` in `index.ts`.
* **Plugin System** : If you later want to let users install custom “themes” or “timer behaviors,” you can store plugin manifests in a `plugins/` folder and load them via IPC.
* **Auto‑Update** : Splitting `autoUpdater.ts` keeps all update logic self‑contained, so you can easily swap out providers (GitHub Releases vs. a private S3 bucket) without touching your core.

---

### Getting Started Steps

1. **Initialize the Electron Project**
   ```bash
   mkdir timelord-electron && cd timelord-electron
   npm init -y
   npm install --save electron
   npm install --save-dev electron-builder typescript @types/node @types/electron
   npm install react react-dom
   npm install --save-dev @types/react @types/react-dom webpack webpack-cli ts-loader css-loader style-loader
   ```
2. **Create Basic `src/main/index.ts`**
   * Boilerplate to create `BrowserWindow` and load `public/index.html`.
3. **Set Up `public/index.html` and `src/renderer/index.tsx`**
   * Add a `<div id="root"></div>` and render a minimal React component to verify the pipeline.
4. **Configure Webpack/TS**
   * Bundle `renderer/**/*.tsx` into a single `renderer.js` and copy into `public/renderer.js`.
   * Ensure CSS modules are processed by Webpack.
5. **Build & Run**
   * Add `"start": "electron ."` to `package.json` scripts.
   * Add `"dist": "electron-builder"` for packaging installers.
6. **Begin Migrating UI Logic**
   * Start building individual components (Header, TimerDisplay, Controls, etc.) in isolation using Storybook (optional) or direct props tests.

By following the layout above, you’ll have a robust foundation to evolve TIMELORD into a fully featured, cross-platform desktop application while keeping your code modular and maintainable.
