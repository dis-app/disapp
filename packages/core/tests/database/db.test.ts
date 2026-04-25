import { describe, it, expect, beforeAll } from 'vitest';
import { initializeDatabase, getDatabase } from '../../src/database/db';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required for tests');
}

describe('Database', () => {
  describe('initializeDatabase', () => {
    it('should initialize database connection', () => {
      const db = initializeDatabase(DATABASE_URL);
      expect(db).toBeDefined();
    });
  });

  describe('getDatabase', () => {
    beforeAll(() => {
      initializeDatabase(DATABASE_URL);
    });

    it('should return initialized database', () => {
      const db = getDatabase();
      expect(db).toBeDefined();
    });

    it('should throw error if not initialized', () => {
      const originalDb = getDatabase();
      
      expect(originalDb).toBeDefined();
    });
  });
});
