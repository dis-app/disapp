import { ClientOptions, SlashCommandBuilder } from 'discord.js';
import { MiddlewareFunction } from '../middleware/CommandMiddleware';

export interface DisappConfig {
  token: string;
  clientId: string;
  guildId?: string;
  commandsPath?: string;
  eventsPath?: string;
  database?: DatabaseConfig;
  logging?: LoggingConfig;
}

export interface DatabaseConfig {
  url: string;
}

export interface LoggingConfig {
  level: 'error' | 'warn' | 'info' | 'debug';
  file?: string;
}

export interface CommandOptions {
  name: string;
  description: string;
  data: SlashCommandBuilder;
  execute: (interaction: any) => Promise<void>;
  cooldown?: number;
  middlewares?: MiddlewareFunction[];
}

export interface EventOptions {
  name: string;
  once?: boolean;
  execute: (...args: any[]) => Promise<void>;
}

export interface DisappClientOptions extends ClientOptions {
  config: DisappConfig;
}
