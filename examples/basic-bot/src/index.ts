import 'dotenv/config';
import { DisappClient, i18n } from '@disapp/core';
import { GatewayIntentBits } from 'discord.js';
import path from 'path';

const i18nInstance = i18n({
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
  localesPath: path.join(__dirname, 'locales'),
});

i18nInstance.loadLocales(path.join(__dirname, 'locales'));

const client = new DisappClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  config: {
    token: process.env.DISCORD_TOKEN || '',
    clientId: process.env.CLIENT_ID || '',
    guildId: process.env.GUILD_ID,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    logging: {
      level: 'info',
    },
  },
});

process.on('SIGINT', async () => {
  await client.shutdown();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await client.shutdown();
  process.exit(0);
});

client.start();
