import { CommandOptions } from '../types';
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { MiddlewareFunction } from '../middleware/CommandMiddleware';

export abstract class Command {
  public name: string;
  public description: string;
  public data: SlashCommandBuilder;
  public cooldown?: number;
  public middlewares: MiddlewareFunction[] = [];

  constructor(options: CommandOptions) {
    this.name = options.name;
    this.description = options.description;
    this.data = options.data;
    this.cooldown = options.cooldown;
    this.middlewares = options.middlewares || [];
  }

  use(middleware: MiddlewareFunction): this {
    this.middlewares.push(middleware);
    return this;
  }

  abstract execute(interaction: ChatInputCommandInteraction): Promise<void>;
}
