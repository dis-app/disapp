import { eq, and, desc } from 'drizzle-orm';
import { getDatabase } from '../db';
import { userStats } from '../schema';

export class UserStatsRepository {
  private get db() {
    return getDatabase();
  }

  async incrementMessages(userId: bigint, guildId: bigint, count: number = 1) {
    try {
      const existing = await this.getUserStats(userId, guildId);

      if (!existing) {
        await this.db.insert(userStats).values({
          userId,
          guildId,
          messageCount: count,
          lastMessageAt: new Date(),
        });
      } else {
        await this.db
          .update(userStats)
          .set({
            messageCount: existing.messageCount + count,
            lastMessageAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(userStats.id, existing.id));
      }
    } catch (error) {
    }
  }

  async incrementReactions(userId: bigint, guildId: bigint, count: number = 1) {
    try {
      const existing = await this.getUserStats(userId, guildId);

      if (!existing) {
        await this.db.insert(userStats).values({
          userId,
          guildId,
          reactionCount: count,
        });
      } else {
        await this.db
          .update(userStats)
          .set({
            reactionCount: existing.reactionCount + count,
            updatedAt: new Date(),
          })
          .where(eq(userStats.id, existing.id));
      }
    } catch (error) {
    }
  }

  async incrementCommands(userId: bigint, guildId: bigint, count: number = 1) {
    try {
      const existing = await this.getUserStats(userId, guildId);

      if (!existing) {
        await this.db.insert(userStats).values({
          userId,
          guildId,
          commandCount: count,
        });
      } else {
        await this.db
          .update(userStats)
          .set({
            commandCount: existing.commandCount + count,
            updatedAt: new Date(),
          })
          .where(eq(userStats.id, existing.id));
      }
    } catch (error) {
    }
  }

  async getUserStats(userId: bigint, guildId: bigint) {
    try {
      const stats = await this.db
        .select()
        .from(userStats)
        .where(
          and(
            eq(userStats.userId, userId),
            eq(userStats.guildId, guildId)
          )
        )
        .limit(1);

      return stats[0] || null;
    } catch (error) {
      return null;
    }
  }

  async getLeaderboard(guildId: bigint, sortBy: 'messages' | 'reactions' | 'commands', limit: number = 10) {
    try {
      const orderColumn = sortBy === 'messages' 
        ? userStats.messageCount 
        : sortBy === 'reactions' 
        ? userStats.reactionCount 
        : userStats.commandCount;

      return await this.db
        .select()
        .from(userStats)
        .where(eq(userStats.guildId, guildId))
        .orderBy(desc(orderColumn))
        .limit(limit);
    } catch (error) {
      return [];
    }
  }

  async getUserRank(userId: bigint, guildId: bigint, sortBy: 'messages' | 'reactions' | 'commands') {
    try {
      const orderColumn = sortBy === 'messages' 
        ? userStats.messageCount 
        : sortBy === 'reactions' 
        ? userStats.reactionCount 
        : userStats.commandCount;

      const allStats = await this.db
        .select()
        .from(userStats)
        .where(eq(userStats.guildId, guildId))
        .orderBy(desc(orderColumn));

      const rank = allStats.findIndex(s => s.userId === userId) + 1;
      return rank || null;
    } catch (error) {
      return null;
    }
  }
}
