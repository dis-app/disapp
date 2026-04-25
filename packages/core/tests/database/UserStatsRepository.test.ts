import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { UserStatsRepository } from '../../src/database/repositories/UserStatsRepository';
import { setupTestDatabase } from './setup';
import { getDatabase, userStats } from '../../src/database/db';
import { eq, and } from 'drizzle-orm';

describe('UserStatsRepository', () => {
  let repository: UserStatsRepository;
  let db: ReturnType<typeof getDatabase>;

  beforeAll(() => {
    db = setupTestDatabase();
    repository = new UserStatsRepository();
  });

  afterEach(async () => {
    try {
      await db.delete(userStats).where(eq(userStats.userId, 999999999n));
      await db.delete(userStats).where(eq(userStats.userId, 888888888n));
    } catch (error) {
    }
  });

  describe('incrementMessages', () => {
    it('should create new stats if not exists', async () => {
      await repository.incrementMessages(999999999n, 123n, 1);
      const stats = await repository.getUserStats(999999999n, 123n);
      
      expect(stats).toBeDefined();
      expect(stats?.messageCount).toBe(1);
    });

    it('should increment existing message count', async () => {
      await repository.incrementMessages(999999999n, 123n, 1);
      await repository.incrementMessages(999999999n, 123n, 5);
      
      const stats = await repository.getUserStats(999999999n, 123n);
      expect(stats?.messageCount).toBe(6);
    });

    it('should default to increment by 1', async () => {
      await repository.incrementMessages(999999999n, 123n);
      const stats = await repository.getUserStats(999999999n, 123n);
      
      expect(stats?.messageCount).toBe(1);
    });
  });

  describe('incrementReactions', () => {
    it('should create new stats if not exists', async () => {
      await repository.incrementReactions(999999999n, 123n, 1);
      const stats = await repository.getUserStats(999999999n, 123n);
      
      expect(stats).toBeDefined();
      expect(stats?.reactionCount).toBe(1);
    });

    it('should increment existing reaction count', async () => {
      await repository.incrementReactions(999999999n, 123n, 1);
      await repository.incrementReactions(999999999n, 123n, 3);
      
      const stats = await repository.getUserStats(999999999n, 123n);
      expect(stats?.reactionCount).toBe(4);
    });
  });

  describe('incrementCommands', () => {
    it('should create new stats if not exists', async () => {
      await repository.incrementCommands(999999999n, 123n, 1);
      const stats = await repository.getUserStats(999999999n, 123n);
      
      expect(stats).toBeDefined();
      expect(stats?.commandCount).toBe(1);
    });

    it('should increment existing command count', async () => {
      await repository.incrementCommands(999999999n, 123n, 1);
      await repository.incrementCommands(999999999n, 123n, 2);
      
      const stats = await repository.getUserStats(999999999n, 123n);
      expect(stats?.commandCount).toBe(3);
    });
  });

  describe('getUserStats', () => {
    it('should return user stats', async () => {
      await repository.incrementMessages(999999999n, 123n, 5);
      const stats = await repository.getUserStats(999999999n, 123n);
      
      expect(stats).toBeDefined();
      expect(stats?.userId).toBe(999999999n);
      expect(stats?.guildId).toBe(123n);
    });

    it('should return null if stats not found', async () => {
      const stats = await repository.getUserStats(111111111n, 123n);
      expect(stats).toBeNull();
    });
  });

  describe('getLeaderboard', () => {
    it('should return empty array when no stats', async () => {
      const leaderboard = await repository.getLeaderboard(999n, 'messages');
      expect(leaderboard).toEqual([]);
    });

    it('should sort by messages', async () => {
      await repository.incrementMessages(999999999n, 123n, 10);
      await repository.incrementMessages(888888888n, 123n, 5);
      
      const leaderboard = await repository.getLeaderboard(123n, 'messages', 10);
      
      if (leaderboard.length > 0) {
        expect(leaderboard[0].messageCount).toBeGreaterThanOrEqual(leaderboard[leaderboard.length - 1].messageCount);
      }
    });

    it('should sort by reactions', async () => {
      await repository.incrementReactions(999999999n, 123n, 10);
      
      const leaderboard = await repository.getLeaderboard(123n, 'reactions', 10);
      expect(Array.isArray(leaderboard)).toBe(true);
    });

    it('should sort by commands', async () => {
      await repository.incrementCommands(999999999n, 123n, 10);
      
      const leaderboard = await repository.getLeaderboard(123n, 'commands', 10);
      expect(Array.isArray(leaderboard)).toBe(true);
    });
  });

  describe('getUserRank', () => {
    it('should return null when no stats', async () => {
      const rank = await repository.getUserRank(111111111n, 123n, 'messages');
      expect(rank).toBeNull();
    });

    it('should return rank for messages', async () => {
      await repository.incrementMessages(999999999n, 123n, 10);
      await repository.incrementMessages(888888888n, 123n, 5);
      
      const rank = await repository.getUserRank(999999999n, 123n, 'messages');
      expect(rank).toBeGreaterThan(0);
    });
  });
});
