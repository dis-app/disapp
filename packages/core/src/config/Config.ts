import { config as dotenvConfig } from 'dotenv';
import { DisappConfig } from '../types';

export class Config {
  private static instance: Config;
  private config: DisappConfig;

  private constructor() {
    dotenvConfig();
    
    this.config = {
      token: process.env.DISCORD_TOKEN || '',
      clientId: process.env.CLIENT_ID || '',
      guildId: process.env.GUILD_ID,
      commandsPath: process.env.COMMANDS_PATH || './commands',
      eventsPath: process.env.EVENTS_PATH || './events',
      database: {
        url: process.env.DATABASE_URL || '',
      },
      logging: {
        level: (process.env.LOG_LEVEL as any) || 'info',
        file: process.env.LOG_FILE,
      },
    };
  }

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  get(): DisappConfig {
    return this.config;
  }

  set(config: Partial<DisappConfig>): void {
    this.config = { ...this.config, ...config };
  }
}
