# API Reference

Complete API documentation for Disapp.

## DisappClient

Main client class extending Discord.js Client.

### Constructor

```typescript
new DisappClient(options?: Partial<DisappClientOptions>)
```

**Options:**
- `intents`: Discord.js gateway intents
- `config`: Client configuration object
  - `token`: Discord bot token
  - `clientId`: Discord application ID
  - `guildId`: Guild ID for development (optional)
  - `commandsPath`: Path to commands directory
  - `eventsPath`: Path to events directory
  - `database.url`: PostgreSQL connection URL
  - `logging.level`: Log level (debug, info, warn, error)

### Methods

#### start()
```typescript
async start(): Promise<void>
```
Starts the bot, loads commands/events, syncs commands, enables hot reload in dev mode.

#### shutdown()
```typescript
async shutdown(): Promise<void>
```
Gracefully shuts down the bot, cleaning up all resources.

#### registerCommands()
```typescript
async registerCommands(): Promise<void>
```
Manually sync commands to Discord.

#### enableHotReload()
```typescript
enableHotReload(commandsPath?: string, eventsPath?: string): void
```
Manually enable hot reload for specified paths.

#### getStats()
```typescript
getStats(): object
```
Returns statistics about commands, cooldowns, registry, and hot reload.

### Properties

- `commands`: Collection of loaded commands
- `cooldowns`: Collection of active cooldowns
- `logger`: Winston logger instance
- `config`: Config instance
- `registry`: CommandRegistry instance

## Command

Base class for slash commands.

### Constructor

```typescript
new Command(options: CommandOptions)
```

**Options:**
- `name`: Command name
- `description`: Command description
- `data`: SlashCommandBuilder instance
- `execute`: Async function to execute
- `cooldown`: Cooldown in seconds (optional)
- `permissions`: Required permissions (optional)

### Example

```typescript
import { Command } from '@disapp/core';
import { SlashCommandBuilder } from 'discord.js';

export default class PingCommand extends Command {
  constructor() {
    super({
      name: 'ping',
      description: 'Ping command',
      data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping command'),
      execute: async () => {},
      cooldown: 5,
    });
  }

  async execute(interaction) {
    await interaction.reply('Pong!');
  }
}
```

## Event

Base class for Discord events.

### Constructor

```typescript
new Event(options: EventOptions)
```

**Options:**
- `name`: Event name (e.g., 'ready', 'interactionCreate')
- `once`: Execute only once (optional)
- `execute`: Async function to execute

### Example

```typescript
import { Event } from '@disapp/core';

export default class ReadyEvent extends Event {
  constructor() {
    super({
      name: 'ready',
      once: true,
      execute: async () => {},
    });
  }

  async execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
  }
}
```

## MessageBuilder

Fluent API for building Discord messages.

### Methods

#### setContent()
```typescript
setContent(content: string): this
```

#### addEmbed()
```typescript
addEmbed(embed: EmbedBuilder): this
```

#### buttons()
```typescript
buttons(...buttons: ButtonOptions[]): this
```

#### userSelect()
```typescript
userSelect(customId: string, placeholder?: string, range?: [number, number]): this
```

#### roleSelect()
```typescript
roleSelect(customId: string, placeholder?: string, range?: [number, number]): this
```

#### channelSelect()
```typescript
channelSelect(customId: string, placeholder?: string, range?: [number, number]): this
```

#### stringSelect()
```typescript
stringSelect(customId: string, options: SelectOption[], placeholder?: string, range?: [number, number]): this
```

#### build()
```typescript
build(): InteractionReplyOptions
```

### Example

```typescript
import { msg, embed } from '@disapp/core';
import { ButtonStyle } from 'discord.js';

const message = msg()
  .setContent('Hello!')
  .buttons(
    { label: 'Click', id: 'btn', style: ButtonStyle.Primary }
  )
  .addEmbed(
    embed().success('Success', 'Operation completed')
  )
  .build();
```

## EmbedBuilder

Extended Discord.js EmbedBuilder with shortcuts.

### Methods

#### success()
```typescript
success(title: string, description?: string): this
```
Green embed with checkmark.

#### error()
```typescript
error(title: string, description?: string): this
```
Red embed with X mark.

#### warning()
```typescript
warning(title: string, description?: string): this
```
Yellow embed with warning sign.

#### info()
```typescript
info(title: string, description?: string): this
```
Blue embed with info icon.

### Example

```typescript
import { embed } from '@disapp/core';

const successEmbed = embed()
  .success('Done', 'Task completed successfully')
  .addFields({ name: 'Time', value: '2s' })
  .build();
```

## Shortcuts

Quick functions for common patterns.

### msg()
```typescript
msg(): MessageBuilder
```
Create new MessageBuilder.

### embed()
```typescript
embed(): EmbedBuilder
```
Create new EmbedBuilder.

### btn()
```typescript
btn(label: string, customId: string, style?: ButtonStyle, emoji?: string): ButtonBuilder
```
Create button.

### primary()
```typescript
primary(label: string, customId: string, emoji?: string): ButtonBuilder
```
Create primary button.

### success()
```typescript
success(label: string, customId: string, emoji?: string): ButtonBuilder
```
Create success button.

### danger()
```typescript
danger(label: string, customId: string, emoji?: string): ButtonBuilder
```
Create danger button.

### confirm()
```typescript
confirm(confirmId: string, cancelId: string): ActionRowBuilder
```
Create confirm/cancel button row.

### yesno()
```typescript
yesno(yesId: string, noId: string): ActionRowBuilder
```
Create yes/no button row.

### successEmbed()
```typescript
successEmbed(title: string, description?: string): EmbedBuilder
```
Create success embed.

### errorEmbed()
```typescript
errorEmbed(title: string, description?: string): EmbedBuilder
```
Create error embed.

### warningEmbed()
```typescript
warningEmbed(title: string, description?: string): EmbedBuilder
```
Create warning embed.

### infoEmbed()
```typescript
infoEmbed(title: string, description?: string): EmbedBuilder
```
Create info embed.

## CommandRegistry

Manages command registration and syncing.

### Methods

#### register()
```typescript
register(command: Command): void
```
Register a command.

#### unregister()
```typescript
unregister(commandName: string): boolean
```
Unregister a command.

#### get()
```typescript
get(commandName: string): Command | undefined
```
Get a command by name.

#### getAll()
```typescript
getAll(): Collection<string, Command>
```
Get all commands.

#### clear()
```typescript
clear(): void
```
Clear all commands.

#### sync()
```typescript
async sync(): Promise<void>
```
Sync commands to Discord.

#### autoSync()
```typescript
async autoSync(interval?: number): Promise<NodeJS.Timeout>
```
Auto-sync commands at intervals (default: 60s).

#### getStats()
```typescript
getStats(): object
```
Get registry statistics.

## HotReload

Manages file watching and hot reload.

### Methods

#### watch()
```typescript
watch(path: string, callback: () => Promise<void>): void
```
Watch a directory for changes.

#### stopAll()
```typescript
stopAll(): void
```
Stop all watchers.

#### getStats()
```typescript
getStats(): object
```
Get hot reload statistics.

## Logger

Winston-based logger.

### Methods

#### debug()
```typescript
debug(message: string, ...meta: any[]): void
```

#### info()
```typescript
info(message: string, ...meta: any[]): void
```

#### warn()
```typescript
warn(message: string, ...meta: any[]): void
```

#### error()
```typescript
error(message: string, error?: Error): void
```

## Config

Centralized configuration management.

### Methods

#### getInstance()
```typescript
static getInstance(): Config
```
Get singleton instance.

#### get()
```typescript
get(): DisappConfig
```
Get current config.

#### set()
```typescript
set(config: Partial<DisappConfig>): void
```
Update config.

## Database

### initializeDatabase()
```typescript
initializeDatabase(url: string): void
```
Initialize database connection.

### getDatabase()
```typescript
getDatabase(): DrizzleDB
```
Get database instance.

## Repositories

### UserRepository

```typescript
const userRepo = new UserRepository();

await userRepo.getOrCreate(userId, username, avatar);
await userRepo.findById(userId);
await userRepo.update(userId, data);
await userRepo.delete(userId);
```

### GuildRepository

```typescript
const guildRepo = new GuildRepository();

await guildRepo.getOrCreate(guildId, name, icon);
await guildRepo.findById(guildId);
await guildRepo.update(guildId, data);
await guildRepo.delete(guildId);
```

## Utilities

### CooldownManager

```typescript
import { CooldownManager } from '@disapp/core';

const cooldown = new CooldownManager();

if (cooldown.isOnCooldown(userId, commandName)) {
  const remaining = cooldown.getRemainingTime(userId, commandName);
  return `Wait ${remaining}s`;
}

cooldown.setCooldown(userId, commandName, 60);
```

### Validator

```typescript
import { Validator } from '@disapp/core';

if (!Validator.isValidSnowflake(id)) {
  throw new Error('Invalid ID');
}

if (!Validator.isValidUrl(url)) {
  throw new Error('Invalid URL');
}
```

### ErrorHandler

```typescript
import { ErrorHandler } from '@disapp/core';

try {
  await riskyOperation();
} catch (error) {
  await ErrorHandler.handle(error, interaction);
}
```

## Types

### DisappClientOptions
```typescript
interface DisappClientOptions extends ClientOptions {
  config?: Partial<DisappConfig>;
}
```

### DisappConfig
```typescript
interface DisappConfig {
  token: string;
  clientId: string;
  guildId?: string;
  commandsPath?: string;
  eventsPath?: string;
  database?: {
    url: string;
  };
  logging?: {
    level: 'debug' | 'info' | 'warn' | 'error';
  };
}
```

### CommandOptions
```typescript
interface CommandOptions {
  name: string;
  description: string;
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
  cooldown?: number;
  permissions?: PermissionResolvable[];
}
```

### EventOptions
```typescript
interface EventOptions {
  name: string;
  once?: boolean;
  execute: (...args: any[]) => Promise<void>;
}
```
