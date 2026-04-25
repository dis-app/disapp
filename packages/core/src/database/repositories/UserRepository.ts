import { eq } from 'drizzle-orm';
import { getDatabase, users, User } from '../db';

export class UserRepository {
  async create(discordId: bigint, username: string, avatar?: string): Promise<User> {
    const db = getDatabase();
    
    const result = await db
      .insert(users)
      .values({
        discordId,
        username,
        avatar,
      })
      .returning();

    return result[0];
  }

  async findByDiscordId(discordId: bigint): Promise<User | null> {
    const db = getDatabase();
    const result = await db
      .select()
      .from(users)
      .where(eq(users.discordId, discordId))
      .limit(1);

    return result[0] || null;
  }

  async findById(id: string): Promise<User | null> {
    const db = getDatabase();
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0] || null;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const db = getDatabase();
    const result = await db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    return result[0];
  }

  async getOrCreate(discordId: bigint, username: string, avatar?: string): Promise<User> {
    const existing = await this.findByDiscordId(discordId);
    if (existing) return existing;
    return this.create(discordId, username, avatar);
  }
}
