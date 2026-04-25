import { eq, and, desc, sql } from 'drizzle-orm';
import { getDatabase } from '../db';
import { voiceActivity, voiceStats } from '../schema';

export class VoiceActivityRepository {
  private get db() {
    return getDatabase();
  }

  async startSession(userId: bigint, guildId: bigint, channelId: bigint, isMuted: boolean = false, isDeafened: boolean = false) {
    const [session] = await this.db
      .insert(voiceActivity)
      .values({
        userId,
        guildId,
        channelId,
        joinedAt: new Date(),
        isMuted,
        isDeafened,
      })
      .returning();

    return session;
  }

  async endSession(userId: bigint, guildId: bigint) {
    const activeSession = await this.db
      .select()
      .from(voiceActivity)
      .where(
        and(
          eq(voiceActivity.userId, userId),
          eq(voiceActivity.guildId, guildId),
          sql`${voiceActivity.leftAt} IS NULL`
        )
      )
      .limit(1);

    if (activeSession.length === 0) return null;

    const session = activeSession[0];
    const leftAt = new Date();
    const duration = Math.floor((leftAt.getTime() - session.joinedAt.getTime()) / 1000);

    const [updated] = await this.db
      .update(voiceActivity)
      .set({
        leftAt,
        duration,
      })
      .where(eq(voiceActivity.id, session.id))
      .returning();

    await this.updateStats(userId, guildId, duration);

    return updated;
  }

  async updateStats(userId: bigint, guildId: bigint, duration: number) {
    const existing = await this.db
      .select()
      .from(voiceStats)
      .where(
        and(
          eq(voiceStats.userId, userId),
          eq(voiceStats.guildId, guildId)
        )
      )
      .limit(1);

    if (existing.length === 0) {
      await this.db.insert(voiceStats).values({
        userId,
        guildId,
        totalDuration: duration,
        sessionCount: 1,
        lastActive: new Date(),
      });
    } else {
      await this.db
        .update(voiceStats)
        .set({
          totalDuration: existing[0].totalDuration + duration,
          sessionCount: existing[0].sessionCount + 1,
          lastActive: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(voiceStats.id, existing[0].id));
    }
  }

  async getLeaderboard(guildId: bigint, limit: number = 10) {
    return await this.db
      .select()
      .from(voiceStats)
      .where(eq(voiceStats.guildId, guildId))
      .orderBy(desc(voiceStats.totalDuration))
      .limit(limit);
  }

  async getUserStats(userId: bigint, guildId: bigint) {
    const stats = await this.db
      .select()
      .from(voiceStats)
      .where(
        and(
          eq(voiceStats.userId, userId),
          eq(voiceStats.guildId, guildId)
        )
      )
      .limit(1);

    return stats[0] || null;
  }

  async getUserRank(userId: bigint, guildId: bigint) {
    const allStats = await this.db
      .select()
      .from(voiceStats)
      .where(eq(voiceStats.guildId, guildId))
      .orderBy(desc(voiceStats.totalDuration));

    const rank = allStats.findIndex(s => s.userId === userId) + 1;
    return rank || null;
  }
}
