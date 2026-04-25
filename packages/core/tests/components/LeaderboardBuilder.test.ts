import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LeaderboardBuilder, LeaderboardData } from '../../src/components/LeaderboardBuilder';
import { EmbedBuilder } from 'discord.js';

describe('LeaderboardBuilder', () => {
  let builder: LeaderboardBuilder;

  beforeEach(() => {
    builder = new LeaderboardBuilder();
  });

  describe('buildLeaderboard', () => {
    it('should build leaderboard with default options', async () => {
      const data: LeaderboardData[] = [
        { userId: 123n, value: 100 },
        { userId: 456n, value: 80 },
        { userId: 789n, value: 60 },
      ];

      const embed = await builder.buildLeaderboard(data);
      
      expect(embed).toBeInstanceOf(EmbedBuilder);
      expect(embed.data.title).toBe('🏆 Leaderboard');
      expect(embed.data.color).toBe(0x5865f2);
    });

    it('should show empty message when no data', async () => {
      const embed = await builder.buildLeaderboard([]);
      
      expect(embed.data.description).toBe('No data available.');
    });

    it('should use custom title and color', async () => {
      const data: LeaderboardData[] = [
        { userId: 123n, value: 100 },
      ];

      const embed = await builder.buildLeaderboard(data, {
        title: 'Custom Title',
        color: 0xFF0000,
      });
      
      expect(embed.data.title).toBe('Custom Title');
      expect(embed.data.color).toBe(0xFF0000);
    });

    it('should use custom medals', async () => {
      const data: LeaderboardData[] = [
        { userId: 123n, value: 100 },
        { userId: 456n, value: 80 },
        { userId: 789n, value: 60 },
      ];

      const embed = await builder.buildLeaderboard(data, {
        medals: ['1️⃣', '2️⃣', '3️⃣'],
      });
      
      expect(embed.data.description).toContain('1️⃣');
      expect(embed.data.description).toContain('2️⃣');
      expect(embed.data.description).toContain('3️⃣');
    });

    it('should format values with custom formatter', async () => {
      const data: LeaderboardData[] = [
        { userId: 123n, value: 100 },
      ];

      const embed = await builder.buildLeaderboard(data, {
        formatValue: (v) => `${v} points`,
      });
      
      expect(embed.data.description).toContain('100 points');
    });

    it('should format users with custom formatter', async () => {
      const data: LeaderboardData[] = [
        { userId: 123n, value: 100 },
      ];

      const embed = await builder.buildLeaderboard(data, {
        formatUser: (userId, index) => `User ${userId}`,
      });
      
      expect(embed.data.description).toContain('User 123');
    });

    it('should show total stats', async () => {
      const data: LeaderboardData[] = [
        { userId: 123n, value: 100 },
        { userId: 456n, value: 80 },
      ];

      const embed = await builder.buildLeaderboard(data, {
        showTotalStats: true,
      });
      
      expect(embed.data.fields).toBeDefined();
      expect(embed.data.fields?.length).toBeGreaterThan(0);
    });

    it('should hide total stats when disabled', async () => {
      const data: LeaderboardData[] = [
        { userId: 123n, value: 100 },
      ];

      const embed = await builder.buildLeaderboard(data, {
        showTotalStats: false,
      });
      
      expect(embed.data.fields?.length || 0).toBe(0);
    });

    it('should add custom fields', async () => {
      const data: LeaderboardData[] = [
        { userId: 123n, value: 100 },
      ];

      const embed = await builder.buildLeaderboard(data, {
        showTotalStats: false,
        fields: [
          {
            name: 'Custom Field',
            value: () => 'Custom Value',
          },
        ],
      });
      
      expect(embed.data.fields).toBeDefined();
      expect(embed.data.fields?.[0].name).toBe('Custom Field');
    });

    it('should set thumbnail', async () => {
      const data: LeaderboardData[] = [
        { userId: 123n, value: 100 },
      ];

      const embed = await builder.buildLeaderboard(data, {
        thumbnail: 'https://example.com/thumb.png',
      });
      
      expect(embed.data.thumbnail?.url).toBe('https://example.com/thumb.png');
    });

    it('should set image', async () => {
      const data: LeaderboardData[] = [
        { userId: 123n, value: 100 },
      ];

      const embed = await builder.buildLeaderboard(data, {
        image: 'https://example.com/image.png',
      });
      
      expect(embed.data.image?.url).toBe('https://example.com/image.png');
    });

    it('should set footer', async () => {
      const data: LeaderboardData[] = [
        { userId: 123n, value: 100 },
      ];

      const embed = await builder.buildLeaderboard(data, {
        footer: 'Custom Footer',
      });
      
      expect(embed.data.footer?.text).toBe('Custom Footer');
    });
  });

  describe('buildUserStats', () => {
    it('should build user stats with default options', async () => {
      const stats = { totalDuration: 3600, sessionCount: 10 };
      const embed = await builder.buildUserStats(stats, 5);
      
      expect(embed).toBeInstanceOf(EmbedBuilder);
      expect(embed.data.title).toBe('📊 Statistics');
    });

    it('should show empty message when no stats', async () => {
      const embed = await builder.buildUserStats(null, null);
      
      expect(embed.data.description).toBe('No data available.');
    });

    it('should show rank', async () => {
      const stats = { totalDuration: 3600 };
      const embed = await builder.buildUserStats(stats, 5, {
        showRank: true,
      });
      
      expect(embed.data.fields).toBeDefined();
      expect(embed.data.fields?.[0].name).toBe('🏅 Rank');
      expect(embed.data.fields?.[0].value).toBe('#5');
    });

    it('should hide rank when disabled', async () => {
      const stats = { totalDuration: 3600 };
      const embed = await builder.buildUserStats(stats, 5, {
        showRank: false,
      });
      
      const rankField = embed.data.fields?.find(f => f.name === '🏅 Rank');
      expect(rankField).toBeUndefined();
    });

    it('should add custom fields', async () => {
      const stats = { totalDuration: 3600, sessionCount: 10 };
      const embed = await builder.buildUserStats(stats, 5, {
        fields: [
          {
            name: 'Sessions',
            value: (s) => s.sessionCount.toString(),
          },
        ],
      });
      
      expect(embed.data.fields).toBeDefined();
      const sessionField = embed.data.fields?.find(f => f.name === 'Sessions');
      expect(sessionField?.value).toBe('10');
    });
  });

  describe('buildCustom', () => {
    it('should build custom embed', async () => {
      const customEmbed = new EmbedBuilder().setTitle('Custom');
      const embed = await builder.buildCustom(() => customEmbed);
      
      expect(embed.data.title).toBe('Custom');
    });

    it('should build custom embed with async function', async () => {
      const customEmbed = new EmbedBuilder().setTitle('Async Custom');
      const embed = await builder.buildCustom(async () => customEmbed);
      
      expect(embed.data.title).toBe('Async Custom');
    });
  });
});
