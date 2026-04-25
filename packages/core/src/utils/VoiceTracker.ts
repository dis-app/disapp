import { VoiceState } from 'discord.js';
import { VoiceActivityRepository } from '../database/repositories/VoiceActivityRepository';
import { Logger } from './Logger';

export class VoiceTracker {
  private repository: VoiceActivityRepository;
  private logger: Logger;

  constructor(logger: Logger) {
    this.repository = new VoiceActivityRepository();
    this.logger = logger;
  }

  async handleVoiceStateUpdate(oldState: VoiceState, newState: VoiceState) {
    const userId = BigInt(newState.member?.id || '0');
    const guildId = BigInt(newState.guild.id);

    if (!oldState.channelId && newState.channelId) {
      await this.handleJoin(userId, guildId, BigInt(newState.channelId), newState.mute || false, newState.deaf || false);
    }

    if (oldState.channelId && !newState.channelId) {
      await this.handleLeave(userId, guildId);
    }

    if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId) {
      await this.handleMove(userId, guildId, BigInt(newState.channelId), newState.mute || false, newState.deaf || false);
    }
  }

  private async handleJoin(userId: bigint, guildId: bigint, channelId: bigint, isMuted: boolean, isDeafened: boolean) {
    try {
      await this.repository.startSession(userId, guildId, channelId, isMuted, isDeafened);
      this.logger.debug(`User ${userId} joined voice channel ${channelId}`);
    } catch (error) {
      this.logger.error('Failed to track voice join:', error as Error);
    }
  }

  private async handleLeave(userId: bigint, guildId: bigint) {
    try {
      const session = await this.repository.endSession(userId, guildId);
      if (session) {
        this.logger.debug(`User ${userId} left voice channel, duration: ${session.duration}s`);
      }
    } catch (error) {
      this.logger.error('Failed to track voice leave:', error as Error);
    }
  }

  private async handleMove(userId: bigint, guildId: bigint, newChannelId: bigint, isMuted: boolean, isDeafened: boolean) {
    try {
      await this.repository.endSession(userId, guildId);
      await this.repository.startSession(userId, guildId, newChannelId, isMuted, isDeafened);
      this.logger.debug(`User ${userId} moved to voice channel ${newChannelId}`);
    } catch (error) {
      this.logger.error('Failed to track voice move:', error as Error);
    }
  }

  async getLeaderboard(guildId: bigint, limit: number = 10) {
    try {
      return await this.repository.getLeaderboard(guildId, limit);
    } catch (error) {
      this.logger.warn('Database not available for voice leaderboard');
      return [];
    }
  }

  async getUserStats(userId: bigint, guildId: bigint) {
    try {
      return await this.repository.getUserStats(userId, guildId);
    } catch (error) {
      this.logger.warn('Database not available for voice stats');
      return null;
    }
  }

  async getUserRank(userId: bigint, guildId: bigint) {
    try {
      return await this.repository.getUserRank(userId, guildId);
    } catch (error) {
      this.logger.warn('Database not available for voice rank');
      return null;
    }
  }

  formatDuration(seconds: number, labels?: { days?: string; hours?: string; minutes?: string; seconds?: string }): string {
    const defaultLabels = {
      days: labels?.days || 'd',
      hours: labels?.hours || 'h',
      minutes: labels?.minutes || 'm',
      seconds: labels?.seconds || 's',
    };

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts = [];
    if (days > 0) parts.push(`${days}${defaultLabels.days}`);
    if (hours > 0) parts.push(`${hours}${defaultLabels.hours}`);
    if (minutes > 0) parts.push(`${minutes}${defaultLabels.minutes}`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}${defaultLabels.seconds}`);

    return parts.join(' ');
  }
}
