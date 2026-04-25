import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { GuildRepository } from '../../src/database/repositories/GuildRepository';
import { setupTestDatabase } from './setup';
import { getDatabase, guilds } from '../../src/database/db';
import { eq } from 'drizzle-orm';

describe('GuildRepository', () => {
  let repository: GuildRepository;
  let db: ReturnType<typeof getDatabase>;

  beforeAll(() => {
    db = setupTestDatabase();
    repository = new GuildRepository();
  });

  afterEach(async () => {
    try {
      await db.delete(guilds).where(eq(guilds.discordId, 999999999n));
      await db.delete(guilds).where(eq(guilds.discordId, 888888888n));
    } catch (error) {
    }
  });

  describe('create', () => {
    it('should create a new guild', async () => {
      const guild = await repository.create(999999999n, 'Test Guild', 'icon.png');
      
      expect(guild).toBeDefined();
      expect(guild.discordId).toBe(999999999n);
      expect(guild.name).toBe('Test Guild');
      expect(guild.icon).toBe('icon.png');
    });

    it('should create guild without icon', async () => {
      const guild = await repository.create(888888888n, 'Test Guild 2');
      
      expect(guild).toBeDefined();
      expect(guild.discordId).toBe(888888888n);
      expect(guild.icon).toBeNull();
    });
  });

  describe('findByDiscordId', () => {
    it('should find guild by discord id', async () => {
      await repository.create(999999999n, 'Test Guild');
      const guild = await repository.findByDiscordId(999999999n);
      
      expect(guild).toBeDefined();
      expect(guild?.name).toBe('Test Guild');
    });

    it('should return null if guild not found', async () => {
      const guild = await repository.findByDiscordId(111111111n);
      expect(guild).toBeNull();
    });
  });

  describe('findById', () => {
    it('should find guild by id', async () => {
      const created = await repository.create(999999999n, 'Test Guild');
      const guild = await repository.findById(created.id);
      
      expect(guild).toBeDefined();
      expect(guild?.id).toBe(created.id);
    });

    it('should return null if guild not found', async () => {
      try {
        const guild = await repository.findById('00000000-0000-0000-0000-000000000000');
        expect(guild).toBeNull();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('update', () => {
    it('should update guild', async () => {
      const created = await repository.create(999999999n, 'Test Guild');
      const updated = await repository.update(created.id, { name: 'Updated Guild' });
      
      expect(updated.name).toBe('Updated Guild');
      expect(updated.id).toBe(created.id);
    });
  });

  describe('getOrCreate', () => {
    it('should create new guild if not exists', async () => {
      const guild = await repository.getOrCreate(999999999n, 'Test Guild');
      
      expect(guild).toBeDefined();
      expect(guild.name).toBe('Test Guild');
    });

    it('should return existing guild if exists', async () => {
      const first = await repository.create(999999999n, 'Test Guild');
      const second = await repository.getOrCreate(999999999n, 'Different Guild');
      
      expect(second.id).toBe(first.id);
      expect(second.name).toBe('Test Guild');
    });
  });
});
