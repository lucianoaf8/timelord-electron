import { ThemeConfig } from './ThemeConfig';
import { BackgroundComponent } from './Background';

export class ThemeSystem {
  private currentTheme: string;
  private themeConfig: ThemeConfig;
  private background: BackgroundComponent;
  private themeListeners: Set<(theme: string) => void>;

  constructor() {
    this.currentTheme = 'cyber-blue';
    this.themeConfig = new ThemeConfig();
    this.background = new BackgroundComponent();
    this.themeListeners = new Set();
  }

  public initialize(): void {
    this.applyTheme(this.currentTheme);
  }

  public addThemeListener(callback: (theme: string) => void): void {
    this.themeListeners.add(callback);
  }

  public removeThemeListener(callback: (theme: string) => void): void {
    this.themeListeners.delete(callback);
  }

  public getCurrentTheme(): string {
    return this.currentTheme;
  }

  public getThemeConfig(): ThemeConfig {
    return this.themeConfig;
  }

  public applyTheme(themeName: string): boolean {
    if (!this.themeConfig.hasTheme(themeName)) {
      console.error(`Theme '${themeName}' not found`);
      return false;
    }

    this.currentTheme = themeName;
    const theme = this.themeConfig.getTheme(themeName);

    // Apply CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });

    // Update background effects
    this.background.updateEffects(theme.effects);

    // Notify listeners
    this.themeListeners.forEach(callback => callback(themeName));

    return true;
  }

  public previewTheme(themeName: string): boolean {
    if (!this.themeConfig.hasTheme(themeName)) {
      console.error(`Theme '${themeName}' not found`);
      return false;
    }

    const originalTheme = this.currentTheme;
    this.applyTheme(themeName);
    return true;
  }

  public revertPreview(): void {
    this.applyTheme(this.currentTheme);
  }

  public getAllThemes(): string[] {
    return this.themeConfig.getThemeOrder();
  }

  public getTheme(themeName: string): any {
    return this.themeConfig.getTheme(themeName);
  }
}
