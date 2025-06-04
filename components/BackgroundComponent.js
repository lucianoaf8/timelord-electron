class BackgroundComponent {
  constructor() {
    this.particles = [];
    this.matrixColumns = [];
    this.backgroundElement = null;
    this.currentTheme = 'cyber-blue';
    this.themeEffects = {
      particleCount: 50,
      glowIntensity: 0.4,
      animationSpeed: 1.0
    };
    this.matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.init();
  }

  init() {
    this.backgroundElement = document.getElementById('background');
    if (this.backgroundElement) {
      this.createEffects();
    }
  }

  createEffects() {
    if (!this.backgroundElement) return;
    
    // Clear existing effects
    this.backgroundElement.innerHTML = '';
    this.particles = [];
    this.matrixColumns = [];
    
    if (this.currentTheme === 'matrix-green') {
      this.createMatrixRain();
    } else {
      this.createParticles();
    }
  }

  createMatrixRain() {
    if (!this.backgroundElement) return;
    
    const containerWidth = window.innerWidth;
    const columnWidth = 20; // Width of each character column
    const numColumns = Math.floor(containerWidth / columnWidth);
    
    for (let i = 0; i < numColumns; i++) {
      this.createMatrixColumn(i * columnWidth);
    }
  }

  createMatrixColumn(xPosition) {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.style.cssText = `
      position: absolute;
      left: ${xPosition}px;
      top: 0;
      width: 20px;
      height: 100vh;
      overflow: hidden;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      font-weight: bold;
      color: #00ff41;
      pointer-events: none;
      z-index: 1;
    `;
    
    this.backgroundElement.appendChild(column);
    this.matrixColumns.push(column);
    
    // Start the rain for this column
    this.startMatrixRain(column);
  }

  startMatrixRain(column) {
    const createRainDrop = () => {
      const rainLength = Math.random() * 15 + 5; // Length of rain trail
      const speed = Math.random() * 3 + 1; // Fall speed
      const delay = Math.random() * 5000; // Random delay before starting
      
      setTimeout(() => {
        this.createRainTrail(column, rainLength, speed);
      }, delay);
    };
    
    // Create initial rain drop
    createRainDrop();
    
    // Continue creating rain drops
    const intervalTime = Math.random() * 3000 + 1000; // 1-4 seconds between drops
    setInterval(createRainDrop, intervalTime);
  }

  createRainTrail(column, length, speed) {
    const trail = [];
    const startY = -length * 20; // Start above the screen
    
    for (let i = 0; i < length; i++) {
      const char = document.createElement('div');
      char.textContent = this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
      char.style.cssText = `
        position: absolute;
        top: ${startY + (i * 20)}px;
        left: 0;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        opacity: ${1 - (i / length)}; 
        color: ${i === 0 ? '#ffffff' : '#00ff41'};
        text-shadow: 0 0 5px currentColor;
        transition: all 0.1s ease;
      `;
      
      column.appendChild(char);
      trail.push(char);
    }
    
    // Animate the trail falling
    const animateTrail = () => {
      trail.forEach((char, index) => {
        const currentTop = parseInt(char.style.top);
        const newTop = currentTop + speed;
        char.style.top = `${newTop}px`;
        
        // Update character occasionally for more dynamic effect
        if (Math.random() < 0.05) {
          char.textContent = this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
        }
        
        // Remove characters that are off screen
        if (newTop > window.innerHeight + 20) {
          if (char.parentNode) {
            char.parentNode.removeChild(char);
          }
          trail.splice(index, 1);
        }
      });
      
      // Continue animation if trail still exists
      if (trail.length > 0) {
        requestAnimationFrame(animateTrail);
      }
    };
    
    requestAnimationFrame(animateTrail);
  }

  createParticles() {
    if (!this.backgroundElement) return;

    const particleCount = this.themeEffects.particleCount;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random horizontal position across full viewport
      particle.style.left = Math.random() * 100 + 'vw';
      
      // Staggered animation start time
      particle.style.animationDelay = Math.random() * 20 + 's';
      
      // Varied animation duration based on theme speed
      const baseDuration = 20 / this.themeEffects.animationSpeed;
      particle.style.animationDuration = (baseDuration + Math.random() * 10) + 's';
      
      // Random size variation (theme-dependent)
      const baseSize = this.getParticleSizeForTheme();
      const size = baseSize + Math.random() * baseSize;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Apply theme-specific effects
      this.applyParticleThemeEffects(particle);
      
      this.backgroundElement.appendChild(particle);
      this.particles.push(particle);
    }
  }

  getParticleSizeForTheme() {
    // Different themes can have different particle sizes
    switch (this.currentTheme) {
      case 'matrix-green':
        return 1.5; // Slightly larger for Matrix effect
      case 'minimal-dark':
      case 'light':
        return 1; // Smaller for minimal themes
      case 'neon-purple':
        return 2; // Larger for more dramatic effect
      default:
        return 1.5;
    }
  }

  applyParticleThemeEffects(particle) {
    // Apply theme-specific particle effects
    const glowSize = Math.floor(4 * this.themeEffects.glowIntensity);
    
    switch (this.currentTheme) {
      case 'matrix-green':
        // Matrix-style particles with varying opacity
        particle.style.opacity = Math.random() * 0.8 + 0.2;
        particle.style.boxShadow = `0 0 ${glowSize}px var(--particle-color)`;
        break;
        
      case 'neon-purple':
        // Brighter, more intense glow
        particle.style.boxShadow = `0 0 ${glowSize * 1.5}px var(--particle-color), 0 0 ${glowSize * 2}px var(--particle-color)`;
        break;
        
      case 'sunset-orange':
        // Warm glow effect
        particle.style.boxShadow = `0 0 ${glowSize}px var(--particle-color), 0 0 ${glowSize * 1.2}px rgba(255, 149, 0, 0.3)`;
        break;
        
      case 'minimal-dark':
      case 'light':
        // Subtle effect for minimal themes
        particle.style.boxShadow = `0 0 ${Math.max(1, glowSize / 2)}px var(--particle-color)`;
        particle.style.opacity = '0.6';
        break;
        
      default: // cyber-blue
        particle.style.boxShadow = `0 0 ${glowSize}px var(--particle-color)`;
        break;
    }
  }

  updateTheme(themeName, effects = null) {
    this.currentTheme = themeName;
    
    if (effects) {
      this.themeEffects = { ...this.themeEffects, ...effects };
    }
    
    // Add special theme-based effects
    this.applyThemeSpecificEffects(themeName);
    
    // Recreate effects with new theme settings
    setTimeout(() => this.createEffects(), 100);
  }

  applyThemeSpecificEffects(themeName) {
    const gridOverlay = document.querySelector('.grid-overlay');
    
    if (gridOverlay) {
      switch (themeName) {
        case 'matrix-green':
          // Hide grid for Matrix theme (digital rain replaces it)
          gridOverlay.style.display = 'none';
          break;
          
        case 'minimal-dark':
        case 'light':
          // Lighter grid for minimal themes
          gridOverlay.style.display = 'block';
          gridOverlay.style.backgroundSize = '60px 60px';
          gridOverlay.style.opacity = '0.3';
          break;
          
        case 'neon-purple':
          // Medium grid with higher opacity
          gridOverlay.style.display = 'block';
          gridOverlay.style.backgroundSize = '40px 40px';
          gridOverlay.style.opacity = '0.7';
          break;
          
        default:
          // Default grid
          gridOverlay.style.display = 'block';
          gridOverlay.style.backgroundSize = '50px 50px';
          gridOverlay.style.opacity = '0.5';
          break;
      }
    }
  }

  // Add dynamic particle effects for special events
  addBurstEffect(color = 'var(--accent-primary)', duration = 2000) {
    const burstCount = 20;
    const burstParticles = [];
    
    for (let i = 0; i < burstCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle burst-particle';
      particle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: ${color};
        border-radius: 50%;
        left: 50%;
        top: 50%;
        pointer-events: none;
        z-index: 100;
        box-shadow: 0 0 10px ${color};
        animation: burst-${i} ${duration}ms ease-out forwards;
      `;
      
      // Create unique burst animation for each particle
      const angle = (360 / burstCount) * i;
      const distance = 100 + Math.random() * 100;
      
      const keyframes = `
        @keyframes burst-${i} {
          0% {
            transform: translate(-50%, -50%) rotate(${angle}deg) translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(${angle}deg) translateX(${distance}px) scale(0);
            opacity: 0;
          }
        }
      `;
      
      // Add keyframes to document
      const style = document.createElement('style');
      style.textContent = keyframes;
      document.head.appendChild(style);
      
      this.backgroundElement?.appendChild(particle);
      burstParticles.push({ particle, style });
    }
    
    // Clean up after animation
    setTimeout(() => {
      burstParticles.forEach(({ particle, style }) => {
        particle.remove();
        style.remove();
      });
    }, duration);
  }

  // Pulse effect for special events
  pulseGrid(intensity = 1.5, duration = 1000) {
    const gridOverlay = document.querySelector('.grid-overlay');
    if (gridOverlay && gridOverlay.style.display !== 'none') {
      const originalOpacity = gridOverlay.style.opacity || '0.5';
      
      gridOverlay.style.transition = `opacity ${duration / 2}ms ease-in-out`;
      gridOverlay.style.opacity = (parseFloat(originalOpacity) * intensity).toString();
      
      setTimeout(() => {
        gridOverlay.style.opacity = originalOpacity;
        setTimeout(() => {
          gridOverlay.style.transition = '';
        }, duration / 2);
      }, duration / 2);
    }
  }

  destroy() {
    if (this.backgroundElement) {
      this.backgroundElement.innerHTML = '';
    }
    this.particles = [];
    this.matrixColumns = [];
  }

  // Expose current theme info
  getCurrentTheme() {
    return this.currentTheme;
  }

  getThemeEffects() {
    return { ...this.themeEffects };
  }

  reateTronGrid() {
    if (!this.backgroundElement) return;
    
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const gridSize = 60; // Larger grid for Tron aesthetic
    
    // Create enhanced grid container
    const tronGrid = document.createElement('div');
    tronGrid.className = 'tron-grid';
    tronGrid.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
    `;
    
    this.backgroundElement.appendChild(tronGrid);
    
    // Create energy nodes at grid intersections
    this.createEnergyNodes(tronGrid, gridSize);
    
    // Create moving light streams
    this.createLightStreams(tronGrid, gridSize);
    
    // Create pulsing circuit connections
    this.createCircuitConnections(tronGrid, gridSize);
  }
  
// Update the createEffects() method in BackgroundComponent.js

createEffects() {
  if (!this.backgroundElement) return;
  
  // Clear existing effects
  this.backgroundElement.innerHTML = '';
  this.particles = [];
  this.matrixColumns = [];
  
  if (this.currentTheme === 'matrix-green') {
    this.createMatrixRain();
  } else if (this.currentTheme === 'tron-legacy') {
    this.createTronGrid();
  } else {
    this.createParticles();
  }
}

// Add the new Tron methods to BackgroundComponent.js:

createTronGrid() {
  if (!this.backgroundElement) return;
  
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  const gridSize = 60; // Larger grid for Tron aesthetic
  
  // Create enhanced grid container
  const tronGrid = document.createElement('div');
  tronGrid.className = 'tron-grid';
  tronGrid.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
  `;
  
  this.backgroundElement.appendChild(tronGrid);
  
  // Create energy nodes at grid intersections
  this.createEnergyNodes(tronGrid, gridSize);
  
  // Create moving light streams
  this.createLightStreams(tronGrid, gridSize);
  
  // Create pulsing circuit connections
  this.createCircuitConnections(tronGrid, gridSize);
}

createEnergyNodes(container, gridSize) {
  const cols = Math.ceil(window.innerWidth / gridSize);
  const rows = Math.ceil(window.innerHeight / gridSize);
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Only create nodes at some intersections (not all)
      if (Math.random() < 0.15) {
        const node = document.createElement('div');
        node.className = 'tron-node';
        node.style.cssText = `
          position: absolute;
          left: ${col * gridSize}px;
          top: ${row * gridSize}px;
          width: 6px;
          height: 6px;
          background: var(--accent-primary);
          border-radius: 50%;
          box-shadow: 
            0 0 10px var(--accent-primary),
            0 0 20px var(--accent-primary),
            0 0 30px var(--accent-primary);
          animation: tronNodePulse ${2 + Math.random() * 3}s ease-in-out infinite alternate;
          transform: translate(-50%, -50%);
        `;
        
        container.appendChild(node);
      }
    }
  }
}

createLightStreams(container, gridSize) {
  const streamCount = 8;
  
  for (let i = 0; i < streamCount; i++) {
    setTimeout(() => {
      this.createSingleLightStream(container, gridSize);
    }, Math.random() * 5000);
    
    // Continue creating streams
    setInterval(() => {
      this.createSingleLightStream(container, gridSize);
    }, 8000 + Math.random() * 4000);
  }
}

createSingleLightStream(container, gridSize) {
  const isHorizontal = Math.random() < 0.5;
  const stream = document.createElement('div');
  stream.className = 'tron-stream';
  
  if (isHorizontal) {
    // Horizontal stream
    const row = Math.floor(Math.random() * (window.innerHeight / gridSize)) * gridSize;
    stream.style.cssText = `
      position: absolute;
      left: -100px;
      top: ${row}px;
      width: 80px;
      height: 2px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        var(--accent-primary) 50%, 
        transparent 100%);
      box-shadow: 0 0 10px var(--accent-primary);
      animation: tronStreamHorizontal ${3 + Math.random() * 2}s linear forwards;
    `;
  } else {
    // Vertical stream
    const col = Math.floor(Math.random() * (window.innerWidth / gridSize)) * gridSize;
    stream.style.cssText = `
      position: absolute;
      left: ${col}px;
      top: -100px;
      width: 2px;
      height: 80px;
      background: linear-gradient(180deg, 
        transparent 0%, 
        var(--accent-primary) 50%, 
        transparent 100%);
      box-shadow: 0 0 10px var(--accent-primary);
      animation: tronStreamVertical ${3 + Math.random() * 2}s linear forwards;
    `;
  }
  
  container.appendChild(stream);
  
  // Remove stream after animation
  setTimeout(() => {
    if (stream.parentNode) {
      stream.parentNode.removeChild(stream);
    }
  }, 6000);
}

createCircuitConnections(container, gridSize) {
  const connectionCount = 6;
  
  for (let i = 0; i < connectionCount; i++) {
    setTimeout(() => {
      this.createCircuitConnection(container, gridSize);
    }, Math.random() * 3000);
    
    // Continue creating connections
    setInterval(() => {
      this.createCircuitConnection(container, gridSize);
    }, 12000 + Math.random() * 8000);
  }
}

createCircuitConnection(container, gridSize) {
  const cols = Math.ceil(window.innerWidth / gridSize);
  const rows = Math.ceil(window.innerHeight / gridSize);
  
  const startCol = Math.floor(Math.random() * cols);
  const startRow = Math.floor(Math.random() * rows);
  const endCol = Math.floor(Math.random() * cols);
  const endRow = Math.floor(Math.random() * rows);
  
  const startX = startCol * gridSize;
  const startY = startRow * gridSize;
  const endX = endCol * gridSize;
  const endY = endRow * gridSize;
  
  // Create connection line
  const connection = document.createElement('div');
  connection.className = 'tron-connection';
  
  const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
  
  connection.style.cssText = `
    position: absolute;
    left: ${startX}px;
    top: ${startY}px;
    width: 0px;
    height: 1px;
    background: var(--accent-primary);
    transform-origin: left center;
    transform: rotate(${angle}deg);
    box-shadow: 0 0 4px var(--accent-primary);
    animation: tronConnectionGrow 2s ease-out forwards;
    opacity: 0.7;
  `;
  
  container.appendChild(connection);
  
  // Animate the connection growing
  connection.style.setProperty('--target-width', `${length}px`);
  
  // Remove connection after animation
  setTimeout(() => {
    if (connection.parentNode) {
      connection.style.animation = 'tronConnectionFade 1s ease-out forwards';
      setTimeout(() => {
        if (connection.parentNode) {
          connection.parentNode.removeChild(connection);
        }
      }, 1000);
    }
  }, 3000);
}

// Update the applyThemeSpecificEffects method to handle Tron:

applyThemeSpecificEffects(themeName) {
  const gridOverlay = document.querySelector('.grid-overlay');
  
  if (gridOverlay) {
    switch (themeName) {
      case 'matrix-green':
        // Hide grid for Matrix theme (digital rain replaces it)
        gridOverlay.style.display = 'none';
        break;
        
      case 'tron-legacy':
        // Enhanced grid for Tron theme
        gridOverlay.style.display = 'block';
        gridOverlay.style.backgroundSize = '60px 60px';
        gridOverlay.style.opacity = '0.8';
        break;
        
      case 'minimal-dark':
      case 'light':
        // Lighter grid for minimal themes
        gridOverlay.style.display = 'block';
        gridOverlay.style.backgroundSize = '60px 60px';
        gridOverlay.style.opacity = '0.3';
        break;
        
      case 'neon-purple':
        // Medium grid with higher opacity
        gridOverlay.style.display = 'block';
        gridOverlay.style.backgroundSize = '40px 40px';
        gridOverlay.style.opacity = '0.7';
        break;
        
      default:
        // Default grid
        gridOverlay.style.display = 'block';
        gridOverlay.style.backgroundSize = '50px 50px';
        gridOverlay.style.opacity = '0.5';
        break;
    }
  }
}
}

