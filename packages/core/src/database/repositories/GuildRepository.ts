import { eq } from 'drizzle-orm';
import { getDatabase, guilds, Guild } from '../db';

export class GuildRepository {
  async create(
    discordId: bigint,
    name: string,
    icon?: string
  ): Promise<Guild> {
    const db = getDatabase();

    const result = await db
      .insert(guilds)
      .values({
        discordId,
        name,
        icon,
      })
      .returning();

    return result[0];
  }

  async findByDiscordId(discordId: bigint): Promise<Guild | null> {
    const db = getDatabase();
    const result = await db
      .select()
      .from(guilds)
      .where(eq(guilds.discordId, discordId))
      .limit(1);

    return result[0] || null;
  }

  async findById(id: string): Promise<Guild | null> {
    const db = getDatabase();
    const result = await db
      .select()
      .from(guilds)
      .where(eq(guilds.id, id))
      .limit(1);

    return result[0] || null;
  }

  async update(id: string, data: Partial<Guild>): Promise<Guild> {
    const db = getDatabase();
    const result = await db
      .update(guilds)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(guilds.id, id))
      .returning();

    return result[0];
  }

  async getOrCreate(
    discordId: bigint,
    name: string,
    icon?: string
  ): Promise<Guild> {
    const existing = await this.findByDiscordId(discordId);
    if (existing) return existing;
    return this.create(discordId, name, icon);
  }
}
