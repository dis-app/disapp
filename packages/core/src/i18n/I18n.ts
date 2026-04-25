import fs from 'fs';
import path from 'path';

export interface I18nOptions {
  defaultLanguage?: string;
  fallbackLanguage?: string;
  localesPath?: string;
}

export class I18n {
  private static instance: I18n;
  private locales: Map<string, Record<string, any>> = new Map();
  private defaultLanguage: string = 'en';
  private fallbackLanguage: string = 'en';
  private localesPath: string = '';
  private isLoaded: boolean = false;
  private userLanguages: Map<string, string> = new Map();

  private constructor(options: I18nOptions = {}) {
    this.defaultLanguage = options.defaultLanguage || 'en';
    this.fallbackLanguage = options.fallbackLanguage || 'en';
    this.localesPath = options.localesPath || './locales';
  }

  static getInstance(options?: I18nOptions): I18n {
    if (!I18n.instance) {
      I18n.instance = new I18n(options);
    }
    return I18n.instance;
  }

  loadLocales(localesPath: string): void {
    this.localesPath = localesPath;
    
    if (!fs.existsSync(localesPath)) {
      this.isLoaded = false;
      return;
    }

    const files = fs.readdirSync(localesPath).filter(f => f.endsWith('.json'));
    
    if (files.length === 0) {
      this.isLoaded = false;
      return;
    }

    files.forEach(file => {
      const lang = file.replace('.json', '');
      const filePath = path.join(localesPath, file);
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        this.locales.set(lang, JSON.parse(content));
      } catch (error) {
      }
    });

    this.isLoaded = true;
  }

  addLocale(language: string, translations: Record<string, any>): void {
    this.locales.set(language, translations);
    this.isLoaded = true;
  }

  setUserLanguage(userId: string, language: string): void {
    if (this.hasLanguage(language)) {
      this.userLanguages.set(userId, language);
    }
  }

  getUserLanguage(userId: string): string {
    return this.userLanguages.get(userId) || this.defaultLanguage;
  }

  t(key: string, language: string = this.defaultLanguage, params?: Record<string, any>): string {
    if (!this.isLoaded || this.locales.size === 0) {
      return key;
    }

    let locale = this.locales.get(language);
    let value: any = locale;
    
    if (locale) {
      const keys = key.split('.');
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          value = undefined;
          break;
        }
      }
    }

    if (!value && language !== this.fallbackLanguage) {
      locale = this.locales.get(this.fallbackLanguage);
      value = locale;
      
      if (locale) {
        const keys = key.split('.');
        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = value[k];
          } else {
            return key;
          }
        }
      }
    }

    if (!value || typeof value !== 'string') {
      return key;
    }

    if (params) {
      let result = value;
      for (const [paramKey, paramValue] of Object.entries(params)) {
        result = result.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
      }
      return result;
    }

    return value;
  }

  getLanguages(): string[] {
    return Array.from(this.locales.keys());
  }

  hasLanguage(language: string): boolean {
    return this.locales.has(language);
  }

  setDefaultLanguage(language: string): void {
    this.defaultLanguage = language;
  }

  getDefaultLanguage(): string {
    return this.defaultLanguage;
  }

  isInitialized(): boolean {
    return this.isLoaded && this.locales.size > 0;
  }
}

export function i18n(options?: I18nOptions): I18n {
  return I18n.getInstance(options);
}
