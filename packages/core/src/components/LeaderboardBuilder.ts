import { EmbedBuilder, ColorResolvable } from 'discord.js';
import { VoiceTracker } from '../utils/VoiceTracker';

export interface LeaderboardOptions {
  title?: string;
  color?: ColorResolvable;
  emptyMessage?: string;
  medals?: [string, string, string];
  showRank?: boolean;
  showTotalStats?: boolean;
  footer?: string;
  thumbnail?: string;
  image?: string;
  formatUser?: (userId: bigint, index: number) => string;
  formatValue?: (value: number) => string;
  fields?: Array<{
    name: string;
    value: (stats: any) => string;
    inline?: boolean;
  }>;
}

export interface UserStatsOptions {
  title?: string;
  color?: ColorResolvable;
  emptyMessage?: string;
  showRank?: boolean;
  footer?: string;
  thumbnail?: string;
  image?: string;
  fields?: Array<{
    name: string;
    value: (stats: any, rank?: number | null) => string;
    inline?: boolean;
  }>;
}

export interface LeaderboardData {
  userId: bigint;
  value: number;
  [key: string]: any;
}

export class LeaderboardBuilder {
  async buildLeaderboard(
    data: LeaderboardData[],
    options: LeaderboardOptions = {}
  ) {
    const {
      title = '🏆 Leaderboard',
      color = 0x5865f2,
      emptyMessage = 'No data available.',
      medals = ['🥇', '🥈', '🥉'],
      showRank = true,
      showTotalStats = true,
      footer,
      thumbnail,
      image,
      formatUser,
      formatValue,
      fields,
    } = options;

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setColor(color)
      .setTimestamp();

    if (thumbnail) embed.setThumbnail(thumbnail);
    if (image) embed.setImage(image);
    if (footer) embed.setFooter({ text: footer });

    if (data.length === 0) {
      embed.setDescription(emptyMessage);
      return embed;
    }

    const valueFormatter = formatValue || ((v: number) => v.toString());
    const userFormatter = formatUser || ((userId: bigint, index: number) => {
      const medal = showRank && index < 3 ? medals[index] : `#${index + 1}`;
      return `${medal} <@${userId}>`;
    });

    const description = data
      .map((item, index) => {
        const userDisplay = userFormatter(item.userId, index);
        const value = valueFormatter(item.value);
        return `${userDisplay} - **${value}**`;
      })
      .join('\n');

    embed.setDescription(description);

    if (showTotalStats) {
      const totalUsers = data.length;
      const totalValue = data.reduce((sum, item) => sum + item.value, 0);

      embed.addFields(
        { name: '👥 Total Users', value: totalUsers.toString(), inline: true },
        { name: '📊 Total', value: valueFormatter(totalValue), inline: true }
      );
    }

    if (fields) {
      const customFields = fields.map(field => ({
        name: field.name,
        value: field.value(data),
        inline: field.inline ?? false,
      }));
      embed.addFields(...customFields);
    }

    return embed;
  }

  async buildUserStats(
    stats: any | null,
    rank: number | null,
    options: UserStatsOptions = {}
  ) {
    const {
      title = '📊 Statistics',
      color = 0x5865f2,
      emptyMessage = 'No data available.',
      showRank: displayRank = true,
      footer,
      thumbnail,
      image,
      fields,
    } = options;

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setColor(color)
      .setTimestamp();

    if (thumbnail) embed.setThumbnail(thumbnail);
    if (image) embed.setImage(image);
    if (footer) embed.setFooter({ text: footer });

    if (!stats) {
      embed.setDescription(emptyMessage);
      return embed;
    }

    const defaultFields = [];

    if (displayRank && rank) {
      defaultFields.push({ name: '🏅 Rank', value: `#${rank}`, inline: true });
    }

    if (defaultFields.length > 0) {
      embed.addFields(...defaultFields);
    }

    if (fields) {
      const customFields = fields.map(field => ({
        name: field.name,
        value: field.value(stats, rank),
        inline: field.inline ?? false,
      }));
      embed.addFields(...customFields);
    }

    return embed;
  }

  async buildCustom(
    builder: () => EmbedBuilder | Promise<EmbedBuilder>
  ) {
    return await builder();
  }
}

export class VoiceLeaderboardBuilder extends LeaderboardBuilder {
  private tracker: VoiceTracker;

  constructor(tracker: VoiceTracker) {
    super();
    this.tracker = tracker;
  }

  async buildVoiceLeaderboard(guildId: bigint, limit: number = 10, options: LeaderboardOptions = {}) {
    const leaderboard = await this.tracker.getLeaderboard(guildId, limit);
    
    const data: LeaderboardData[] = leaderboard.map(stat => ({
      userId: stat.userId,
      value: stat.totalDuration,
      sessionCount: stat.sessionCount,
      lastActive: stat.lastActive,
    }));

    return this.buildLeaderboard(data, {
      title: '🏆 Voice Activity Leaderboard',
      formatValue: (seconds) => this.tracker.formatDuration(seconds),
      fields: options.showTotalStats !== false ? [
        {
          name: '📊 Total Sessions',
          value: (data) => data.reduce((sum: number, item: any) => sum + item.sessionCount, 0).toString(),
          inline: true,
        },
      ] : undefined,
      ...options,
    });
  }

  async buildVoiceUserStats(userId: bigint, guildId: bigint, options: UserStatsOptions = {}) {
    const stats = await this.tracker.getUserStats(userId, guildId);
    const rank = await this.tracker.getUserRank(userId, guildId);

    if (!stats) {
      return this.buildUserStats(null, null, options);
    }

    const avgSession = Math.floor(stats.totalDuration / stats.sessionCount);

    return this.buildUserStats(stats, rank, {
      title: '📊 Voice Statistics',
      fields: [
        { name: '⏱️ Total Time', value: () => this.tracker.formatDuration(stats.totalDuration), inline: true },
        { name: '📊 Sessions', value: () => stats.sessionCount.toString(), inline: true },
        { name: '⏰ Average Session', value: () => this.tracker.formatDuration(avgSession), inline: true },
        ...(stats.lastActive ? [{
          name: '🕐 Last Active',
          value: () => `<t:${Math.floor(stats.lastActive!.getTime() / 1000)}:R>`,
          inline: true,
        }] : []),
      ],
      ...options,
    });
  }
}
