export class Validator {
  static isValidToken(token: string): boolean {
    return token.length > 0 && token.split('.').length === 3;
  }

  static isValidSnowflake(id: string): boolean {
    return /^\d{17,19}$/.test(id);
  }

  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static isValidDatabaseUrl(url: string): boolean {
    return url.startsWith('postgresql://') || url.startsWith('postgres://');
  }
}
