import { initializeDatabase } from '../../src/database/db';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required for tests');
}

export function setupTestDatabase() {
  try {
    return initializeDatabase(DATABASE_URL);
  } catch (error) {
    console.error('Failed to initialize test database:', error);
    throw error;
  }
}
