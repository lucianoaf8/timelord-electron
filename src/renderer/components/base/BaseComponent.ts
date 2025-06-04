import { ThemeSystem } from '../ui/ThemeSystem';
import { ThemeConfig } from '../ui/ThemeConfig';

export interface ComponentOptions {
  elementId?: string;
  className?: string;
  themeSystem?: ThemeSystem;
}

export abstract class BaseComponent {
  protected element: HTMLElement | null = null;
  protected themeSystem: ThemeSystem;
  protected themeConfig: ThemeConfig;

  constructor(protected options: ComponentOptions = {}) {
    this.themeSystem = options.themeSystem || new ThemeSystem();
    this.themeConfig = this.themeSystem.getThemeConfig();
    this.initialize();
  }

  protected abstract initialize(): void;

  protected getElement(): HTMLElement {
    if (!this.element) {
      throw new Error('Component element not initialized');
    }
    return this.element;
  }

  protected getThemeValue(key: string, defaultValue: string): string {
    return this.themeConfig.getThemeValue(key) || defaultValue;
  }

  protected applyTheme(): void {
    const currentTheme = this.themeSystem.getCurrentTheme();
    const themeStyles = this.themeConfig.getThemeStyles(currentTheme);
    
    if (themeStyles) {
      Object.entries(themeStyles).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value);
      });
    }
  }

  protected addEventListeners(): void {
    // Implement in subclasses
  }

  protected removeEventListeners(): void {
    // Implement in subclasses
  }

  public destroy(): void {
    this.removeEventListeners();
    if (this.element) {
      this.element.remove();
    }
  }

  public updateTheme(themeName: string): void {
    this.themeSystem.applyTheme(themeName);
    this.applyTheme();
  }

  public getTheme(): string {
    return this.themeSystem.getCurrentTheme();
  }
}
