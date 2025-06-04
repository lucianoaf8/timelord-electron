import themeConfig from '../../styles/themes/theme-config.json';

export class ThemeConfig {
  private config: any;

  constructor() {
    this.config = themeConfig;
  }

  public hasTheme(themeName: string): boolean {
    return this.config.themes.hasOwnProperty(themeName);
  }

  public getTheme(themeName: string): any {
    return this.config.themes[themeName];
  }

  public getThemeValue(themeName: string, key: string): string {
    const theme = this.getTheme(themeName);
    return theme ? theme[key] : undefined;
  }

  public getThemeStyles(themeName: string): Record<string, string> {
    const theme = this.getTheme(themeName);
    return theme ? theme.colors : {};
  }

  public getThemeOrder(): string[] {
    return this.config.themeOrder;
  }

  public getDefaultTheme(): string {
    return this.config.defaultTheme;
  }

  public addTheme(themeName: string, themeData: any): void {
    if (!this.hasTheme(themeName)) {
      this.config.themes[themeName] = themeData;
      this.config.themeOrder.push(themeName);
    }
  }

  public removeTheme(themeName: string): void {
    if (this.hasTheme(themeName)) {
      delete this.config.themes[themeName];
      this.config.themeOrder = this.config.themeOrder.filter(
        name => name !== themeName
      );
    }
  }

  public updateTheme(themeName: string, themeData: any): void {
    if (this.hasTheme(themeName)) {
      this.config.themes[themeName] = themeData;
    }
  }
}
