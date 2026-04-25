import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';
import { Logger } from '../utils/Logger';

export interface BotConfig {
  prefix?: string;
  color?: number;
  maintenanceMode?: boolean;
  features?: {
    commands?: boolean;
    events?: boolean;
    database?: boolean;
  };
  limits?: {
    commandCooldown?: number;
    maxMessageLength?: number;
  };
  customData?: Record<string, any>;
}

export class DynamicConfig extends EventEmitter {
  private config: BotConfig = {};
  private configPath: string;
  private watcher?: fs.FSWatcher;
  private logger: Logger;
  private static instance: DynamicConfig;

  private constructor(configPath: string, logger?: Logger) {
    super();
    this.configPath = configPath;
    this.logger = logger || new Logger();
    this.loadConfig();
  }

  static getInstance(configPath: string = './config.json', logger?: Logger): DynamicConfig {
    if (!this.instance) {
      this.instance = new DynamicConfig(configPath, logger);
    }
    return this.instance;
  }

  private loadConfig() {
    try {
      if (fs.existsSync(this.configPath)) {
        const data = fs.readFileSync(this.configPath, 'utf-8');
        this.config = JSON.parse(data);
        this.emit('loaded', this.config);
      } else {
        this.createDefaultConfig();
      }
    } catch (error) {
      this.logger.error('Failed to load config', error as Error);
      this.config = this.getDefaultConfig();
    }
  }

  private createDefaultConfig() {
    this.config = this.getDefaultConfig();
    this.saveConfig();
  }

  private getDefaultConfig(): BotConfig {
    return {
      prefix: '!',
      color: 0x5865f2,
      maintenanceMode: false,
      features: {
        commands: true,
        events: true,
        database: true,
      },
      limits: {
        commandCooldown: 3000,
        maxMessageLength: 2000,
      },
      customData: {},
    };
  }

  private saveConfig() {
    try {
      const dir = path.dirname(this.configPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(
        this.configPath,
        JSON.stringify(this.config, null, 2),
        'utf-8'
      );
    } catch (error) {
      this.logger.error('Failed to save config', error as Error);
    }
  }

  startWatching() {
    if (this.watcher) return;

    try {
      this.watcher = fs.watch(this.configPath, (eventType) => {
        if (eventType === 'change') {
          const oldConfig = { ...this.config };
          this.loadConfig();
          this.emit('changed', this.config, oldConfig);
          this.logger.success(`Config reloaded: ${this.configPath}`);
        }
      });

      this.logger.info(`Watching config file: ${this.configPath}`);
    } catch (error) {
      this.logger.error('Failed to watch config', error as Error);
    }
  }

  stopWatching() {
    if (this.watcher) {
      this.watcher.close();
      this.watcher = undefined;
      this.logger.info('Stopped watching config file');
    }
  }

  get<K extends keyof BotConfig>(key: K): BotConfig[K] {
    return this.config[key];
  }

  set<K extends keyof BotConfig>(key: K, value: BotConfig[K]) {
    this.config[key] = value;
    this.saveConfig();
    this.emit('updated', key, value);
  }

  update(updates: Partial<BotConfig>) {
    this.config = { ...this.config, ...updates };
    this.saveConfig();
    this.emit('updated', updates);
  }

  getAll(): BotConfig {
    return { ...this.config };
  }

  reset() {
    this.config = this.getDefaultConfig();
    this.saveConfig();
    this.emit('reset', this.config);
  }

  isMaintenanceMode(): boolean {
    return this.config.maintenanceMode || false;
  }

  isFeatureEnabled(feature: keyof NonNullable<BotConfig['features']>): boolean {
    return this.config.features?.[feature] ?? true;
  }

  getCustom(key: string): any {
    return this.config.customData?.[key];
  }

  setCustom(key: string, value: any) {
    if (!this.config.customData) {
      this.config.customData = {};
    }
    this.config.customData[key] = value;
    this.saveConfig();
    this.emit('custom-updated', key, value);
  }
}
