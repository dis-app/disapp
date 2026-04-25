import postgres from 'postgres';
import { readFileSync } from 'fs';
import { join } from 'path';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is required');
  process.exit(1);
}

async function migrate() {
  const sql = postgres(DATABASE_URL);
  
  try {
    const migrationSQL = readFileSync(
      join(__dirname, '../src/database/migrations/init.sql'),
      'utf-8'
    );
    
    console.log('Running migrations...');
    await sql.unsafe(migrationSQL);
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

migrate();
