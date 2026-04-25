import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

let db: ReturnType<typeof drizzle> | null = null;

export function initializeDatabase(connectionString: string) {
  const client = postgres(connectionString);
  db = drizzle(client, { schema });
  return db;
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase first.');
  }
  return db;
}

export * from './schema';

export type User = typeof schema.users.$inferSelect;
export type Guild = typeof schema.guilds.$inferSelect;
export type VoiceActivity = typeof schema.voiceActivity.$inferSelect;
export type VoiceStats = typeof schema.voiceStats.$inferSelect;
