# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development:**
- `npm start` - Start development version
- `npm run dev` - Start with developer tools open
- `npm run lint` - Run ESLint on TypeScript files
- `npm run format` - Format code with Prettier
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode

**Building:**
- `npm run build` - Build for current platform
- `npm run pack` - Package without installer
- `npm run dist` - Create installer for current platform
- `npm run clean` - Clean build artifacts

## Architecture Overview

This is an Electron desktop timer application in active transition from JavaScript to TypeScript with a modular component architecture.

### Current Hybrid Structure

**Main Process (JavaScript):**
- `main.js` - Electron main process with TimelordMain class
- `preload.js` - Secure IPC bridge using contextBridge
- Uses class-based architecture with IPC handlers for file operations

**Renderer Process (Mixed JS/TS):**
- Legacy: `renderer.js` with TimelordRenderer class and component system
- Modern: `src/renderer/` with TypeScript components extending BaseComponent
- Components in root `components/` directory are legacy JavaScript modules

**Data Storage:**
- Sessions: `~/.timelord/sessions.json`
- Settings: `~/.timelord/settings.json`
- Uses secure IPC for all file operations through preload script

### Component Architecture

**Legacy Components (JavaScript):**
- Located in root `components/` directory
- Include: BackgroundComponent, ButtonsComponent, TimerComponent, etc.
- Follow pattern: constructor with DOM element binding and event handlers

**Modern Components (TypeScript):**
- Located in `src/renderer/components/`
- Extend `BaseComponent` abstract class
- Include theme system integration via ThemeSystem and ThemeConfig
- Located in `base/`, `ui/`, and `utils/` subdirectories

### Theme System

The application uses a sophisticated theme system:
- ThemeConfig manages theme definitions and CSS variables
- ThemeSystem handles theme application and background effects  
- Themes stored in `src/renderer/styles/themes/theme-config.json`
- CSS variables applied to document root for theming

### Key IPC Channels

Main process exposes these APIs via contextBridge:
- File operations: save/load sessions and settings
- Dialog operations: file exports, error dialogs
- Window controls: minimize, close, toggle developer tools

### CSS Architecture

**Legacy Styles:**
- `styles.css` - Main stylesheet with CSS custom properties
- Component-specific styles in `src/renderer/styles/components/`

**Modern Styles:**
- Organized in `src/renderer/styles/` with base/, components/, themes/ structure
- Uses CSS modules pattern and CSS custom properties for theming
- Responsive design with animations and transitions

## Development Guidelines

**When Adding Features:**
1. For new UI components, extend BaseComponent in `src/renderer/components/`
2. Add corresponding CSS in `src/renderer/styles/components/`
3. Register new IPC handlers in main.js setupIpcHandlers() method
4. Expose IPC APIs through preload.js contextBridge

**Architecture Migration:**
- Gradually migrate legacy JavaScript components to TypeScript
- Follow existing BaseComponent pattern for new components
- Maintain backward compatibility during transition

**Testing:**
- Tests located in `tests/main/` and `tests/renderer/`
- Use Jest for testing framework
- Test both IPC handlers and component behavior

**Security:**
- Context isolation enabled, Node integration disabled
- All main process communication through secure IPC
- No direct file system access from renderer