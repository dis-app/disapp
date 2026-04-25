import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { VoiceActivityRepository } from '../../src/database/repositories/VoiceActivityRepository';
import { setupTestDatabase } from './setup';
import { getDatabase, voiceActivity, voiceStats } from '../../src/database/db';
import { eq, and } from 'drizzle-orm';

describe('VoiceActivityRepository', () => {
  let repository: VoiceActivityRepository;
  let db: ReturnType<typeof getDatabase>;

  beforeAll(() => {
    db = setupTestDatabase();
    repository = new VoiceActivityRepository();
  });

  afterEach(async () => {
    try {
      await db.delete(voiceActivity).where(eq(voiceActivity.userId, 999999999n));
      await db.delete(voiceActivity).where(eq(voiceActivity.userId, 888888888n));
      await db.delete(voiceStats).where(eq(voiceStats.userId, 999999999n));
      await db.delete(voiceStats).where(eq(voiceStats.userId, 888888888n));
    } catch (error) {
    }
  });

  describe('startSession', () => {
    it('should start a voice session', async () => {
      const session = await repository.startSession(999999999n, 123n, 456n);
      
      expect(session).toBeDefined();
      expect(session.userId).toBe(999999999n);
      expect(session.guildId).toBe(123n);
      expect(session.channelId).toBe(456n);
      expect(session.leftAt).toBeNull();
    });

    it('should start session with muted and deafened flags', async () => {
      const session = await repository.startSession(999999999n, 123n, 456n, true, true);
      
      expect(session.isMuted).toBe(true);
      expect(session.isDeafened).toBe(true);
    });
  });

  describe('endSession', () => {
    it('should end an active session', async () => {
      await repository.startSession(999999999n, 123n, 456n);
      
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      const ended = await repository.endSession(999999999n, 123n);
      
      expect(ended).toBeDefined();
      expect(ended?.leftAt).toBeDefined();
      expect(ended?.duration).toBeGreaterThan(0);
    });

    it('should return null if no active session', async () => {
      const ended = await repository.endSession(111111111n, 123n);
      expect(ended).toBeNull();
    });

    it('should update voice stats after ending session', async () => {
      await repository.startSession(999999999n, 123n, 456n);
      await new Promise(resolve => setTimeout(resolve, 1100));
      await repository.endSession(999999999n, 123n);
      
      const stats = await repository.getUserStats(999999999n, 123n);
      
      expect(stats).toBeDefined();
      expect(stats?.sessionCount).toBe(1);
      expect(stats?.totalDuration).toBeGreaterThan(0);
    });
  });

  describe('updateStats', () => {
    it('should create new stats if not exists', async () => {
      await repository.updateStats(999999999n, 123n, 100);
      
      const stats = await repository.getUserStats(999999999n, 123n);
      
      expect(stats).toBeDefined();
      expect(stats?.totalDuration).toBe(100);
      expect(stats?.sessionCount).toBe(1);
    });

    it('should update existing stats', async () => {
      await repository.updateStats(999999999n, 123n, 100);
      await repository.updateStats(999999999n, 123n, 50);
      
      const stats = await repository.getUserStats(999999999n, 123n);
      
      expect(stats?.totalDuration).toBe(150);
      expect(stats?.sessionCount).toBe(2);
    });
  });

  describe('getLeaderboard', () => {
    it('should return empty array when no stats', async () => {
      const leaderboard = await repository.getLeaderboard(999n);
      expect(leaderboard).toEqual([]);
    });

    it('should return leaderboard sorted by duration', async () => {
      await repository.updateStats(999999999n, 123n, 200);
      await repository.updateStats(888888888n, 123n, 100);
      
      const leaderboard = await repository.getLeaderboard(123n, 10);
      
      expect(leaderboard.length).toBeGreaterThan(0);
      if (leaderboard.length > 1) {
        expect(leaderboard[0].totalDuration).toBeGreaterThanOrEqual(leaderboard[1].totalDuration);
      }
    });

    it('should respect limit parameter', async () => {
      await repository.updateStats(999999999n, 123n, 100);
      await repository.updateStats(888888888n, 123n, 50);
      
      const leaderboard = await repository.getLeaderboard(123n, 1);
      expect(leaderboard.length).toBeLessThanOrEqual(1);
    });
  });

  describe('getUserStats', () => {
    it('should return user stats', async () => {
      await repository.updateStats(999999999n, 123n, 100);
      
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

  describe('getUserRank', () => {
    it('should return null when no stats', async () => {
      const rank = await repository.getUserRank(111111111n, 123n);
      expect(rank).toBeNull();
    });

    it('should return correct rank', async () => {
      await repository.updateStats(999999999n, 123n, 200);
      await repository.updateStats(888888888n, 123n, 100);
      
      const rank = await repository.getUserRank(999999999n, 123n);
      expect(rank).toBe(1);
    });

    it('should return correct rank for second place', async () => {
      await repository.updateStats(999999999n, 123n, 200);
      await repository.updateStats(888888888n, 123n, 100);
      
      const rank = await repository.getUserRank(888888888n, 123n);
      expect(rank).toBe(2);
    });
  });
});
