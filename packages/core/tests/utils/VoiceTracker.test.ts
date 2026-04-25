import { describe, it, expect, beforeEach } from 'vitest';
import { VoiceTracker } from '../../src/utils/VoiceTracker';
import { Logger } from '../../src/utils/Logger';

describe('VoiceTracker', () => {
  let tracker: VoiceTracker;
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger({ level: 'error' });
    tracker = new VoiceTracker(logger);
  });

  describe('constructor', () => {
    it('should create VoiceTracker instance', () => {
      expect(tracker).toBeDefined();
    });
  });

  describe('formatDuration', () => {
    it('should format seconds only', () => {
      expect(tracker.formatDuration(30)).toBe('30s');
    });

    it('should format minutes and seconds', () => {
      expect(tracker.formatDuration(90)).toBe('1m 30s');
    });

    it('should format hours, minutes and seconds', () => {
      expect(tracker.formatDuration(3665)).toBe('1h 1m 5s');
    });

    it('should format days, hours, minutes and seconds', () => {
      expect(tracker.formatDuration(90061)).toBe('1d 1h 1m 1s');
    });

    it('should handle zero seconds', () => {
      expect(tracker.formatDuration(0)).toBe('0s');
    });

    it('should use custom labels', () => {
      const result = tracker.formatDuration(3665, {
        days: ' days',
        hours: ' hours',
        minutes: ' mins',
        seconds: ' secs',
      });
      expect(result).toBe('1 hours 1 mins 5 secs');
    });

    it('should handle only days', () => {
      expect(tracker.formatDuration(86400)).toBe('1d');
    });

    it('should handle only hours', () => {
      expect(tracker.formatDuration(3600)).toBe('1h');
    });

    it('should handle only minutes', () => {
      expect(tracker.formatDuration(60)).toBe('1m');
    });
  });

  describe('getLeaderboard', () => {
    it('should return empty array when database not available', async () => {
      const leaderboard = await tracker.getLeaderboard(123n);
      expect(leaderboard).toEqual([]);
    });

    it('should accept custom limit', async () => {
      const leaderboard = await tracker.getLeaderboard(123n, 20);
      expect(leaderboard).toEqual([]);
    });
  });

  describe('getUserStats', () => {
    it('should return null when database not available', async () => {
      const stats = await tracker.getUserStats(123n, 456n);
      expect(stats).toBeNull();
    });
  });

  describe('getUserRank', () => {
    it('should return null when database not available', async () => {
      const rank = await tracker.getUserRank(123n, 456n);
      expect(rank).toBeNull();
    });
  });
});
