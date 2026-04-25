# Hot Reload & Command Registry

Disapp provides automatic command registration and memory-safe hot reload for development.

## Features

- **Automatic Command Registration**: Commands are automatically synced to Discord
- **Memory-Safe Hot Reload**: File changes trigger reload without RAM leaks
- **Development Mode**: Hot reload enabled automatically in development
- **Command Registry**: Centralized command management and syncing

## Quick Start

```typescript
import { DisappClient } from '@disapp/core';
import path from 'path';

const client = new DisappClient({
  config: {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
  },
});

client.start();
```

## Automatic Command Registration

Commands are automatically registered when you call `client.start()`:

```typescript
await client.start();
```

The client will:
1. Load all commands from `commandsPath`
2. Register them in the CommandRegistry
3. Sync them to Discord (guild or global)
4. Enable hot reload in development mode

## Hot Reload

Hot reload is automatically enabled in development mode (`NODE_ENV=development`).

### How It Works

1. Watches command and event directories for changes
2. Clears module cache to prevent memory leaks
3. Reloads changed modules
4. Re-syncs commands to Discord
5. Re-registers event listeners

### Manual Control

```typescript
client.enableHotReload(
  path.join(__dirname, 'commands'),
  path.join(__dirname, 'events')
);
```

### Disable Hot Reload

Set `NODE_ENV=production` to disable hot reload:

```bash
NODE_ENV=production node dist/index.js
```

## Command Registry

The CommandRegistry manages all slash commands and syncing.

### Access Registry

```typescript
const registry = client.registry;
```

### Register Commands

```typescript
registry.register(myCommand);
await registry.sync();
```

### Unregister Commands

```typescript
registry.unregister('commandName');
await registry.sync();
```

### Get Commands

```typescript
const command = registry.get('ping');
const allCommands = registry.getAll();
```

### Clear Registry

```typescript
registry.clear();
```

### Auto-Sync

Automatically sync commands at intervals:

```typescript
const interval = await registry.autoSync(60000);
```

## Monitoring

Get statistics about your bot:

```typescript
const stats = client.getStats();
console.log(stats);
```

Output:
```json
{
  "commands": 5,
  "cooldowns": 2,
  "registry": {
    "totalCommands": 5,
    "commandNames": ["ping", "user", "server", "fluent", "quick"]
  },
  "hotReload": {
    "watchedPaths": 2,
    "cachedModules": 15
  }
}
```

## Graceful Shutdown

Clean up resources before exit:

```typescript
process.on('SIGINT', async () => {
  await client.shutdown();
  process.exit(0);
});
```

The shutdown process:
1. Stops hot reload watchers
2. Clears command registry
3. Clears cooldowns
4. Destroys Discord client
5. Logs completion

## Memory Management

Disapp prevents memory leaks by:

- Clearing module cache on hot reload
- Removing event listeners before reload
- Tracking cached modules
- Cleaning up watchers on shutdown

## Best Practices

1. **Development**: Use hot reload for fast iteration
2. **Production**: Disable hot reload for stability
3. **Guild Commands**: Use `guildId` for instant updates during development
4. **Global Commands**: Remove `guildId` for production deployment
5. **Monitoring**: Check stats regularly to detect issues

## Comparison with Discord.js

| Feature | Discord.js | Disapp |
|---------|-----------|--------|
| Command Registration | Manual REST calls | Automatic |
| Hot Reload | Manual implementation | Built-in |
| Memory Management | Manual cache clearing | Automatic |
| Command Registry | Manual collection | Built-in registry |
| Monitoring | Manual tracking | Built-in stats |

## Example: Complete Bot

```typescript
import { DisappClient } from '@disapp/core';
import { GatewayIntentBits } from 'discord.js';
import path from 'path';

const client = new DisappClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
  config: {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    logging: { level: 'info' },
  },
});

process.on('SIGINT', async () => {
  await client.shutdown();
  process.exit(0);
});

client.start().catch(console.error);
```

That's it! Your bot now has:
- Automatic command registration
- Memory-safe hot reload
- Graceful shutdown
- Built-in monitoring
