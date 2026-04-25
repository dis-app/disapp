import { describe, it, expect } from 'vitest';
import { Validator } from '../../src/utils/Validator';

describe('Validator', () => {
  describe('isValidToken', () => {
    it('should return true for valid Discord token format', () => {
      const validToken = 'XXXXXXXXXXXXXXXXXXXXXX.YYYYYY.ZZZZZZZZZZZZZZZZZZZZZZZZZZZZ';
      expect(Validator.isValidToken(validToken)).toBe(true);
    });

    it('should return false for empty token', () => {
      expect(Validator.isValidToken('')).toBe(false);
    });

    it('should return false for token without dots', () => {
      expect(Validator.isValidToken('invalidtoken')).toBe(false);
    });

    it('should return false for token with wrong number of parts', () => {
      expect(Validator.isValidToken('part1.part2')).toBe(false);
    });
  });

  describe('isValidSnowflake', () => {
    it('should return true for valid snowflake ID', () => {
      expect(Validator.isValidSnowflake('123456789012345678')).toBe(true);
    });

    it('should return false for too short ID', () => {
      expect(Validator.isValidSnowflake('12345')).toBe(false);
    });

    it('should return false for too long ID', () => {
      expect(Validator.isValidSnowflake('12345678901234567890')).toBe(false);
    });

    it('should return false for non-numeric ID', () => {
      expect(Validator.isValidSnowflake('abc123')).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('should return true for valid HTTP URL', () => {
      expect(Validator.isValidUrl('http://example.com')).toBe(true);
    });

    it('should return true for valid HTTPS URL', () => {
      expect(Validator.isValidUrl('https://example.com')).toBe(true);
    });

    it('should return false for invalid URL', () => {
      expect(Validator.isValidUrl('not a url')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(Validator.isValidUrl('')).toBe(false);
    });
  });

  describe('isValidDatabaseUrl', () => {
    it('should return true for postgresql:// URL', () => {
      expect(Validator.isValidDatabaseUrl('postgresql://user:pass@localhost:5432/db')).toBe(true);
    });

    it('should return true for postgres:// URL', () => {
      expect(Validator.isValidDatabaseUrl('postgres://user:pass@localhost:5432/db')).toBe(true);
    });

    it('should return false for MySQL URL', () => {
      expect(Validator.isValidDatabaseUrl('mysql://localhost')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(Validator.isValidDatabaseUrl('')).toBe(false);
    });
  });
});
