import { REST, Routes } from 'discord.js';
import { Collection } from 'discord.js';
import { Command } from '../commands/Command';
import { Logger } from '../utils/Logger';

export class CommandRegistry {
  private commands: Collection<string, Command> = new Collection();
  private rest: REST;
  private logger: Logger;
  private clientId: string;
  private guildId?: string;

  constructor(token: string, clientId: string, guildId: string | undefined, logger: Logger) {
    this.rest = new REST().setToken(token);
    this.clientId = clientId;
    this.guildId = guildId;
    this.logger = logger;
  }

  register(command: Command): void {
    if (this.commands.has(command.name)) {
      this.logger.warn(`Command ${command.name} already registered, replacing...`);
    }
    
    this.commands.set(command.name, command);
    this.logger.info(`Command registered: ${command.name}`);
  }

  unregister(commandName: string): boolean {
    const deleted = this.commands.delete(commandName);
    if (deleted) {
      this.logger.info(`Command unregistered: ${commandName}`);
    }
    return deleted;
  }

  get(commandName: string): Command | undefined {
    return this.commands.get(commandName);
  }

  getAll(): Collection<string, Command> {
    return this.commands;
  }

  clear(): void {
    const count = this.commands.size;
    this.commands.clear();
    this.logger.info(`Cleared ${count} commands from registry`);
  }

  async sync(): Promise<void> {
    const commandData = this.commands.map(cmd => cmd.data.toJSON());

    try {
      this.logger.info(`Syncing ${commandData.length} slash commands...`);

      const route = this.guildId
        ? Routes.applicationGuildCommands(this.clientId, this.guildId)
        : Routes.applicationCommands(this.clientId);

      await this.rest.put(route, { body: commandData });

      const scope = this.guildId ? 'guild' : 'global';
      this.logger.success(`${commandData.length} ${scope} commands synced successfully`);
    } catch (error) {
      this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      this.logger.error('❌ Failed to Sync Commands');
      this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      this.logger.error('', error as Error);
      this.logger.error('');
      this.logger.error('Common issues:');
      this.logger.error('• Invalid CLIENT_ID');
      this.logger.error('• Invalid GUILD_ID (for guild commands)');
      this.logger.error('• Bot missing application.commands scope');
      this.logger.error('• Rate limited by Discord');
      this.logger.error('');
      this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      throw error;
    }
  }

  async autoSync(interval: number = 60000): Promise<NodeJS.Timeout> {
    await this.sync();

    return setInterval(async () => {
      try {
        await this.sync();
      } catch (error) {
        this.logger.error('Auto-sync failed:', error as Error);
      }
    }, interval);
  }

  getStats() {
    return {
      totalCommands: this.commands.size,
      commandNames: Array.from(this.commands.keys()),
    };
  }
}
