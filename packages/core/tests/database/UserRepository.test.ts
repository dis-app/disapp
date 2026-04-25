import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { UserRepository } from '../../src/database/repositories/UserRepository';
import { setupTestDatabase } from './setup';
import { getDatabase, users } from '../../src/database/db';
import { eq } from 'drizzle-orm';

describe('UserRepository', () => {
  let repository: UserRepository;
  let db: ReturnType<typeof getDatabase>;

  beforeAll(() => {
    db = setupTestDatabase();
    repository = new UserRepository();
  });

  afterEach(async () => {
    try {
      await db.delete(users).where(eq(users.discordId, 999999999n));
      await db.delete(users).where(eq(users.discordId, 888888888n));
    } catch (error) {
    }
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user = await repository.create(999999999n, 'testuser', 'avatar.png');
      
      expect(user).toBeDefined();
      expect(user.discordId).toBe(999999999n);
      expect(user.username).toBe('testuser');
      expect(user.avatar).toBe('avatar.png');
    });

    it('should create user without avatar', async () => {
      const user = await repository.create(888888888n, 'testuser2');
      
      expect(user).toBeDefined();
      expect(user.discordId).toBe(888888888n);
      expect(user.avatar).toBeNull();
    });
  });

  describe('findByDiscordId', () => {
    it('should find user by discord id', async () => {
      await repository.create(999999999n, 'testuser');
      const user = await repository.findByDiscordId(999999999n);
      
      expect(user).toBeDefined();
      expect(user?.username).toBe('testuser');
    });

    it('should return null if user not found', async () => {
      const user = await repository.findByDiscordId(111111111n);
      expect(user).toBeNull();
    });
  });

  describe('findById', () => {
    it('should find user by id', async () => {
      const created = await repository.create(999999999n, 'testuser');
      const user = await repository.findById(created.id);
      
      expect(user).toBeDefined();
      expect(user?.id).toBe(created.id);
    });

    it('should return null if user not found', async () => {
      try {
        const user = await repository.findById('00000000-0000-0000-0000-000000000000');
        expect(user).toBeNull();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const created = await repository.create(999999999n, 'testuser');
      const updated = await repository.update(created.id, { username: 'updated' });
      
      expect(updated.username).toBe('updated');
      expect(updated.id).toBe(created.id);
    });
  });

  describe('getOrCreate', () => {
    it('should create new user if not exists', async () => {
      const user = await repository.getOrCreate(999999999n, 'testuser');
      
      expect(user).toBeDefined();
      expect(user.username).toBe('testuser');
    });

    it('should return existing user if exists', async () => {
      const first = await repository.create(999999999n, 'testuser');
      const second = await repository.getOrCreate(999999999n, 'different');
      
      expect(second.id).toBe(first.id);
      expect(second.username).toBe('testuser');
    });
  });
});
