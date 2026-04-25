CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discord_id BIGINT NOT NULL UNIQUE,
  username TEXT NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS guilds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discord_id BIGINT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS voice_activity (
  id SERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  guild_id BIGINT NOT NULL,
  channel_id BIGINT NOT NULL,
  joined_at TIMESTAMP NOT NULL,
  left_at TIMESTAMP,
  duration INTEGER,
  is_muted BOOLEAN DEFAULT false,
  is_deafened BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS voice_stats (
  id SERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  guild_id BIGINT NOT NULL,
  total_duration INTEGER DEFAULT 0 NOT NULL,
  session_count INTEGER DEFAULT 0 NOT NULL,
  last_active TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS user_stats (
  id SERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  guild_id BIGINT NOT NULL,
  message_count INTEGER DEFAULT 0 NOT NULL,
  reaction_count INTEGER DEFAULT 0 NOT NULL,
  command_count INTEGER DEFAULT 0 NOT NULL,
  last_message_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
