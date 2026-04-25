import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { I18n } from '../../src/i18n/I18n';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

const TEST_LOCALES_DIR = join(__dirname, '__test_locales__');

describe('I18n', () => {
  beforeEach(() => {
    try {
      rmSync(TEST_LOCALES_DIR, { recursive: true, force: true });
    } catch {}
    
    mkdirSync(TEST_LOCALES_DIR, { recursive: true });
    
    writeFileSync(
      join(TEST_LOCALES_DIR, 'en.json'),
      JSON.stringify({
        greeting: 'Hello',
        welcome: 'Welcome {name}',
        nested: {
          message: 'Nested message'
        }
      })
    );
    
    writeFileSync(
      join(TEST_LOCALES_DIR, 'tr.json'),
      JSON.stringify({
        greeting: 'Merhaba',
        welcome: 'Hoşgeldin {name}'
      })
    );
  });

  afterEach(() => {
    try {
      rmSync(TEST_LOCALES_DIR, { recursive: true, force: true });
    } catch {}
  });

  it('should initialize with locales directory', () => {
    const i18n = I18n.getInstance({
      defaultLanguage: 'en'
    });
    i18n.loadLocales(TEST_LOCALES_DIR);
    
    expect(i18n).toBeDefined();
    expect(i18n.isInitialized()).toBe(true);
  });

  it('should translate simple key', () => {
    const i18n = I18n.getInstance({
      defaultLanguage: 'en'
    });
    i18n.loadLocales(TEST_LOCALES_DIR);
    
    expect(i18n.t('greeting', 'en')).toBe('Hello');
    expect(i18n.t('greeting', 'tr')).toBe('Merhaba');
  });

  it('should translate with parameters', () => {
    const i18n = I18n.getInstance({
      defaultLanguage: 'en'
    });
    i18n.loadLocales(TEST_LOCALES_DIR);
    
    expect(i18n.t('welcome', 'en', { name: 'John' })).toBe('Welcome John');
    expect(i18n.t('welcome', 'tr', { name: 'Ahmet' })).toBe('Hoşgeldin Ahmet');
  });

  it('should handle nested keys', () => {
    const i18n = I18n.getInstance({
      defaultLanguage: 'en'
    });
    i18n.loadLocales(TEST_LOCALES_DIR);
    
    expect(i18n.t('nested.message', 'en')).toBe('Nested message');
  });

  it('should fallback to default locale', () => {
    const i18n = I18n.getInstance({
      defaultLanguage: 'en',
      fallbackLanguage: 'en'
    });
    i18n.loadLocales(TEST_LOCALES_DIR);
    
    expect(i18n.t('nested.message', 'tr')).toBe('Nested message');
  });

  it('should return key if translation not found', () => {
    const i18n = I18n.getInstance({
      defaultLanguage: 'en'
    });
    i18n.loadLocales(TEST_LOCALES_DIR);
    
    expect(i18n.t('nonexistent', 'en')).toBe('nonexistent');
  });

  it('should get available languages', () => {
    const i18n = I18n.getInstance({
      defaultLanguage: 'en'
    });
    i18n.loadLocales(TEST_LOCALES_DIR);
    
    const languages = i18n.getLanguages();
    expect(languages).toContain('en');
    expect(languages).toContain('tr');
  });

  it('should check if language exists', () => {
    const i18n = I18n.getInstance({
      defaultLanguage: 'en'
    });
    i18n.loadLocales(TEST_LOCALES_DIR);
    
    expect(i18n.hasLanguage('en')).toBe(true);
    expect(i18n.hasLanguage('tr')).toBe(true);
    expect(i18n.hasLanguage('fr')).toBe(false);
  });

  it('should handle multiple parameter substitutions', () => {
    const i18n = I18n.getInstance({
      defaultLanguage: 'en'
    });
    
    i18n.addLocale('en', {
      multi: 'Hello {name}, you have {count} messages'
    });
    
    expect(i18n.t('multi', 'en', { name: 'John', count: '5' })).toBe('Hello John, you have 5 messages');
  });
});
