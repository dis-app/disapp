import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { I18nHelper } from '../../src/i18n/I18nHelper';
import { I18n } from '../../src/i18n/I18n';

describe('I18nHelper', () => {
  let testUserId: string;
  
  beforeEach(() => {
    testUserId = `test-user-${Date.now()}-${Math.random()}`;
    
    const i18n = I18n.getInstance();
    i18n.setDefaultLanguage('en');
    i18n.addLocale('en', {
      buttons: { test: 'Test Button' },
      messages: { welcome: 'Welcome' },
      errors: { notFound: 'Not Found' },
      commands: { ping: 'Ping Command' },
      embeds: { info: 'Info Embed' },
      modals: { form: 'Form Modal' }
    });
    i18n.addLocale('tr', {
      buttons: { test: 'Test Butonu' },
      messages: { welcome: 'Hoşgeldin' }
    });
  });

  describe('setUserLanguage', () => {
    it('should set user language', () => {
      I18nHelper.setUserLanguage(testUserId, 'tr');
      expect(I18nHelper.getUserLanguage(testUserId)).toBe('tr');
    });

    it('should override existing language', () => {
      const userId = `override-${testUserId}`;
      I18nHelper.setUserLanguage(userId, 'en');
      I18nHelper.setUserLanguage(userId, 'tr');
      expect(I18nHelper.getUserLanguage(userId)).toBe('tr');
    });
  });

  describe('getUserLanguage', () => {
    it('should return user language if set', () => {
      const userId = `get-${testUserId}`;
      I18nHelper.setUserLanguage(userId, 'tr');
      expect(I18nHelper.getUserLanguage(userId)).toBe('tr');
    });

    it('should return default language if not set', () => {
      const userId = `new-${testUserId}`;
      expect(I18nHelper.getUserLanguage(userId)).toBe('en');
    });
  });

  describe('t', () => {
    it('should translate key', () => {
      expect(I18nHelper.t('messages.welcome', 'en')).toBe('Welcome');
      expect(I18nHelper.t('messages.welcome', 'tr')).toBe('Hoşgeldin');
    });
  });

  describe('tUser', () => {
    it('should translate using user language', () => {
      const userId = `tuser-${testUserId}`;
      I18nHelper.setUserLanguage(userId, 'tr');
      expect(I18nHelper.tUser(userId, 'messages.welcome')).toBe('Hoşgeldin');
    });
  });

  describe('button', () => {
    it('should translate button key', () => {
      expect(I18nHelper.button('test', 'en')).toBe('Test Button');
      expect(I18nHelper.button('test', 'tr')).toBe('Test Butonu');
    });
  });

  describe('message', () => {
    it('should translate message key', () => {
      expect(I18nHelper.message('welcome', 'en')).toBe('Welcome');
    });
  });

  describe('error', () => {
    it('should translate error key', () => {
      expect(I18nHelper.error('notFound', 'en')).toBe('Not Found');
    });
  });

  describe('command', () => {
    it('should translate command key', () => {
      expect(I18nHelper.command('ping', 'en')).toBe('Ping Command');
    });
  });

  describe('embed', () => {
    it('should translate embed key', () => {
      expect(I18nHelper.embed('info', 'en')).toBe('Info Embed');
    });
  });

  describe('modal', () => {
    it('should translate modal key', () => {
      expect(I18nHelper.modal('form', 'en')).toBe('Form Modal');
    });
  });
});
