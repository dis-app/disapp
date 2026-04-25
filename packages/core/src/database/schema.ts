import { pgTable, serial, text, timestamp, bigint, integer, boolean, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  discordId: bigint('discord_id', { mode: 'bigint' }).notNull().unique(),
  username: text('username').notNull(),
  avatar: text('avatar'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const guilds = pgTable('guilds', {
  id: uuid('id').primaryKey().defaultRandom(),
  discordId: bigint('discord_id', { mode: 'bigint' }).notNull().unique(),
  name: text('name').notNull(),
  icon: text('icon'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const voiceActivity = pgTable('voice_activity', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'bigint' }).notNull(),
  guildId: bigint('guild_id', { mode: 'bigint' }).notNull(),
  channelId: bigint('channel_id', { mode: 'bigint' }).notNull(),
  joinedAt: timestamp('joined_at').notNull(),
  leftAt: timestamp('left_at'),
  duration: integer('duration'),
  isMuted: boolean('is_muted').default(false),
  isDeafened: boolean('is_deafened').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const voiceStats = pgTable('voice_stats', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'bigint' }).notNull(),
  guildId: bigint('guild_id', { mode: 'bigint' }).notNull(),
  totalDuration: integer('total_duration').default(0).notNull(),
  sessionCount: integer('session_count').default(0).notNull(),
  lastActive: timestamp('last_active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userStats = pgTable('user_stats', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'bigint' }).notNull(),
  guildId: bigint('guild_id', { mode: 'bigint' }).notNull(),
  messageCount: integer('message_count').default(0).notNull(),
  reactionCount: integer('reaction_count').default(0).notNull(),
  commandCount: integer('command_count').default(0).notNull(),
  lastMessageAt: timestamp('last_message_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
