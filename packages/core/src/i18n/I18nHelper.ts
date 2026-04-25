import { I18n } from './I18n';

export class I18nHelper {
  static setUserLanguage(userId: string, language: string): void {
    I18n.getInstance().setUserLanguage(userId, language);
  }

  static getUserLanguage(userId: string): string {
    return I18n.getInstance().getUserLanguage(userId);
  }

  static t(key: string, language?: string, params?: Record<string, any>): string {
    return I18n.getInstance().t(key, language, params);
  }

  static tUser(userId: string, key: string, params?: Record<string, any>): string {
    const userLang = this.getUserLanguage(userId);
    return I18n.getInstance().t(key, userLang, params);
  }

  static button(labelKey: string, language?: string, params?: Record<string, any>): string {
    return this.t(`buttons.${labelKey}`, language, params);
  }

  static modal(titleKey: string, language?: string, params?: Record<string, any>): string {
    return this.t(`modals.${titleKey}`, language, params);
  }

  static message(messageKey: string, language?: string, params?: Record<string, any>): string {
    return this.t(`messages.${messageKey}`, language, params);
  }

  static error(errorKey: string, language?: string, params?: Record<string, any>): string {
    return this.t(`errors.${errorKey}`, language, params);
  }

  static command(commandKey: string, language?: string, params?: Record<string, any>): string {
    return this.t(`commands.${commandKey}`, language, params);
  }

  static embed(embedKey: string, language?: string, params?: Record<string, any>): string {
    return this.t(`embeds.${embedKey}`, language, params);
  }
}
