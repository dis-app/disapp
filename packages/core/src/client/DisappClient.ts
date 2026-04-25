import { Client, Collection, GatewayIntentBits, REST, Routes, Events } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { Command } from '../commands/Command';
import { Event } from '../events/Event';
import { Logger } from '../utils/Logger';
import { Config } from '../config/Config';
import { DisappClientOptions } from '../types';
import { initializeDatabase } from '../database/db';
import { CommandRegistry } from '../registry/CommandRegistry';
import { HotReload } from '../utils/HotReload';
import { InteractionHandler } from '../components/InteractionHandler';

export class DisappClient extends Client {
  public commands: Collection<string, Command>;
  public cooldowns: Collection<string, Collection<string, number>>;
  public logger: Logger;
  public config: Config;
  public registry: CommandRegistry;
  private hotReload?: HotReload;
  private syncInterval?: NodeJS.Timeout;

  constructor(options?: Partial<DisappClientOptions>) {
    super({
      intents: options?.intents || [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      ...options,
    });

    this.commands = new Collection();
    this.cooldowns = new Collection();
    this.config = Config.getInstance();
    
    if (options?.config) {
      this.config.set(options.config);
    }

    this.logger = new Logger(this.config.get().logging);
    
    const cfg = this.config.get();
    this.registry = new CommandRegistry(
      cfg.token,
      cfg.clientId,
      cfg.guildId,
      this.logger
    );

    this.setupAutomaticInteractionHandling();
  }

  private setupAutomaticInteractionHandling(): void {
    this.on(Events.InteractionCreate, async (interaction) => {
      if (interaction.isButton() || interaction.isStringSelectMenu() || interaction.isModalSubmit()) {
        const handled = await InteractionHandler.handle(interaction);
        
        if (!handled && !interaction.replied && !interaction.deferred) {
          try {
            await interaction.reply({
              content: '❌ This interaction is no longer available.',
              flags: 64,
            });
          } catch (error) {
          }
        }
      }
    });
  }

  private async loadModules(path: string, type: 'command' | 'event'): Promise<void> {
    try {
      const files = readdirSync(path).filter(f => f.endsWith('.js') && !f.endsWith('.d.ts'));

      for (const file of files) {
        const modulePath = join(path, file);
        
        delete require.cache[require.resolve(modulePath)];
        
        try {
          const module = await import(modulePath);
          const instance = new module.default();

          if (type === 'command') {
            this.commands.set(instance.name, instance);
            this.registry.register(instance);
            this.logger.info(`✓ Command loaded: ${instance.name}`);
          } else {
            if (instance.once) {
              this.once(instance.name, (...args) => instance.execute(...args));
            } else {
              this.on(instance.name, (...args) => instance.execute(...args));
            }
            this.logger.info(`✓ Event loaded: ${instance.name}`);
          }
        } catch (error) {
          this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          this.logger.error(`❌ Failed to Load ${type}: ${file}`);
          this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          this.logger.error('', error as Error);
          this.logger.error('');
          this.logger.error('Common issues:');
          this.logger.error('• Syntax error in file');
          this.logger.error('• Missing default export');
          this.logger.error('• Invalid class structure');
          this.logger.error('• Missing dependencies');
          this.logger.error('');
          this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        }
      }
    } catch (error) {
      this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      this.logger.error(`❌ Failed to Read ${type}s Directory`);
      this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      this.logger.error(`Path: ${path}`);
      this.logger.error('', error as Error);
      this.logger.error('');
      this.logger.error('Make sure the directory exists and is readable');
      this.logger.error('');
      this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
  }

  async registerCommands(): Promise<void> {
    await this.registry.sync();
  }

  enableHotReload(commandsPath?: string, eventsPath?: string): void {
    if (this.hotReload) {
      this.logger.warn('Hot reload already enabled');
      return;
    }

    this.hotReload = new HotReload(this.logger);

    if (commandsPath) {
      this.hotReload.watch(commandsPath, async () => {
        this.commands.clear();
        this.registry.clear();
        await this.loadModules(commandsPath, 'command');
        await this.registry.sync();
      });
    }

    if (eventsPath) {
      this.hotReload.watch(eventsPath, async () => {
        this.removeAllListeners();
        await this.loadModules(eventsPath, 'event');
      });
    }
  }

  async start(): Promise<void> {
    const config = this.config.get();

    if (!config.token) {
      this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      this.logger.error('❌ Discord Token Not Found!');
      this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      this.logger.error('');
      this.logger.error('Please set your Discord bot token:');
      this.logger.error('');
      this.logger.error('1. Create a .env file in your project root');
      this.logger.error('2. Add: DISCORD_TOKEN=your_token_here');
      this.logger.error('3. Get your token from: https://discord.com/developers/applications');
      this.logger.error('');
      this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      process.exit(1);
    }

    if (config.database?.url) {
      try {
        initializeDatabase(config.database.url);
        this.logger.success('Database connected');
      } catch (error) {
        this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        this.logger.error('❌ Database Connection Failed');
        this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        this.logger.error('', error as Error);
        this.logger.error('');
        this.logger.error('Common issues:');
        this.logger.error('• Invalid DATABASE_URL');
        this.logger.error('• Database server not running');
        this.logger.error('• Wrong credentials');
        this.logger.error('• Network/firewall issues');
        this.logger.error('');
        this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      }
    }

    if (config.commandsPath) {
      await this.loadModules(config.commandsPath, 'command');
    }

    if (config.eventsPath) {
      await this.loadModules(config.eventsPath, 'event');
    }

    await this.registry.sync();

    if (process.env.NODE_ENV === 'development') {
      this.enableHotReload(config.commandsPath, config.eventsPath);
    }

    try {
      await this.login(config.token);
      this.logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      this.logger.info('✓ Bot started successfully');
      this.logger.info(`✓ Loaded ${this.commands.size} commands`);
      this.logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } catch (error) {
      this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      this.logger.error('❌ Failed to Login');
      this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      this.logger.error('');
      this.logger.error(`Error: ${(error as Error).message}`);
      this.logger.error('');
      this.logger.error('Common issues:');
      this.logger.error('• Invalid token');
      this.logger.error('• Token expired');
      this.logger.error('• Bot not invited to server');
      this.logger.error('• Missing intents');
      this.logger.error('');
      this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      process.exit(1);
    }
  }

  async shutdown(): Promise<void> {
    this.logger.info('Shutting down...');

    if (this.hotReload) {
      this.hotReload.stopAll();
    }

    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }

    this.commands.clear();
    this.cooldowns.clear();
    this.registry.clear();

    await this.destroy();
    this.logger.info('Shutdown complete');
  }

  getStats() {
    return {
      commands: this.commands.size,
      cooldowns: this.cooldowns.size,
      registry: this.registry.getStats(),
      hotReload: this.hotReload?.getStats(),
    };
  }
}

