# Advanced Features

Disapp framework includes powerful advanced features that dramatically reduce boilerplate code and improve developer experience.

## 1. Smart Component Handling

Automatically manage button clicks and select menu interactions without manual collector setup.

### Before (Manual Collectors)

```typescript
// 50+ lines of collector setup
const collector = interaction.channel.createMessageComponentCollector({
  componentType: ComponentType.Button,
  time: 300000,
});

collector.on("collect", async (i) => {
  if (i.customId === "button1") {
    // Handle button1
  } else if (i.customId === "button2") {
    // Handle button2
  }
});
```

### After (Smart Handlers)

```typescript
const message = v2()
  .text("# Menu")
  .buttons(
    {
      id: "button1",
      label: "Option 1",
      style: ButtonStyle.Primary,
      onClick: async (i) => {
        await i.reply("You clicked Option 1!");
      },
    },
    {
      id: "button2",
      label: "Option 2",
      style: ButtonStyle.Success,
      onClick: async (i) => {
        await i.reply("You clicked Option 2!");
      },
    },
  )
  .build();

const reply = await interaction.reply(message);

// Auto-register handlers
if (message.handlers) {
  InteractionHandler.register(reply.id, message.handlers);
  InteractionHandler.setupCollector(interaction.channel, reply.id);
}
```

### Select Menus with Handlers

```typescript
const message = v2()
  .text("# Choose an option")
  .select(
    "my_select",
    "Select something",
    [
      { label: "Option A", value: "a" },
      { label: "Option B", value: "b" },
    ],
    async (i) => {
      const selected = i.values[0];
      await i.reply(`You selected: ${selected}`);
    },
  )
  .build();
```

### Benefits

- ✅ **90% less code** - No manual collector setup
- ✅ **Memory safe** - Auto cleanup after timeout
- ✅ **Type safe** - Full TypeScript support
- ✅ **Centralized** - All handlers in one place

---

## 2. Auto-Chunking

Automatically split long messages that exceed Discord's 2000 character limit.

### Basic Usage

```typescript
const message = v2()
  .enableAutoChunking()
  .text("Very long text that exceeds 2000 characters...")
  .build();
```

### With Code Block Preservation

```typescript
const message = v2()
  .enableAutoChunking({
    maxLength: 2000,
    preserveCodeBlocks: true,
    preserveMarkdown: true,
  })
  .text(
    `
# Documentation

\`\`\`typescript
// This code block will stay intact
function example() {
  return 'hello';
}
\`\`\`

More content here...
  `,
  )
  .build();
```

### Manual Chunking

```typescript
import { AutoChunker } from "@disapp/core";

const longText = "..."; // 5000 characters
const chunks = AutoChunker.autoChunk(longText, {
  maxLength: 2000,
  preserveCodeBlocks: true,
});

for (const chunk of chunks) {
  await channel.send(chunk);
}
```

### Options

```typescript
interface AutoChunkerOptions {
  maxLength?: number; // Default: 2000
  preserveCodeBlocks?: boolean; // Default: true
  preserveMarkdown?: boolean; // Default: true
  separator?: string; // Default: '\n'
}
```

### Benefits

- ✅ **Automatic** - No manual splitting needed
- ✅ **Smart** - Preserves code blocks and markdown
- ✅ **Configurable** - Customize behavior
- ✅ **Reliable** - Never hit character limits

---

## 3. Command Middleware

Add reusable logic to commands with middleware functions.

### Built-in Middleware

#### Admin Only

```typescript
import { Command, OnlyAdmin } from "@disapp/core";

export default class BanCommand extends Command {
  constructor() {
    super({
      name: "ban",
      description: "Ban a user",
      data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a user"),
      middlewares: [OnlyAdmin()],
      execute: async () => {},
    });
  }

  async execute(interaction: any) {
    // Only admins can reach here
    await interaction.reply("User banned!");
  }
}
```

#### Cooldown

```typescript
import { Cooldown } from "@disapp/core";

export default class DailyCommand extends Command {
  constructor() {
    super({
      name: "daily",
      description: "Claim daily reward",
      data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Claim daily reward"),
      middlewares: [Cooldown(86400000)], // 24 hours in milliseconds
      execute: async () => {},
    });
  }
}
```

#### Require Permission

```typescript
import { RequirePermission } from "@disapp/core";
import { PermissionFlagsBits } from "discord.js";

export default class KickCommand extends Command {
  constructor() {
    super({
      name: "kick",
      description: "Kick a user",
      data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a user"),
      middlewares: [RequirePermission(PermissionFlagsBits.KickMembers)],
      execute: async () => {},
    });
  }
}
```

#### Require Database

```typescript
import { RequireDatabase } from "@disapp/core";

export default class StatsCommand extends Command {
  constructor() {
    super({
      name: "stats",
      description: "View stats",
      data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("View stats"),
      middlewares: [RequireDatabase()],
      execute: async () => {},
    });
  }
}
```

### Available Middleware

| Middleware                | Description                       | Usage                                                                  |
| ------------------------- | --------------------------------- | ---------------------------------------------------------------------- |
| `OnlyAdmin()`             | Requires Administrator permission | `middlewares: [OnlyAdmin()]`                                           |
| `RequirePermission(perm)` | Requires specific permission      | `middlewares: [RequirePermission(PermissionFlagsBits.ManageMessages)]` |
| `Cooldown(ms)`            | Adds cooldown per user            | `middlewares: [Cooldown(5000)]`                                        |
| `RateLimit(max, window)`  | Limits uses per time window       | `middlewares: [RateLimit(3, 60000)]`                                   |
| `RequireDatabase()`       | Requires database connection      | `middlewares: [RequireDatabase()]`                                     |
| `RequireGuild()`          | Requires command in server        | `middlewares: [RequireGuild()]`                                        |
| `RequireRole(roleId)`     | Requires specific role            | `middlewares: [RequireRole('123456789')]`                              |
| `OwnerOnly(ownerId)`      | Only bot owner can use            | `middlewares: [OwnerOnly('123456789')]`                                |

### Custom Middleware

```typescript
import { MiddlewareFunction } from "@disapp/core";

function RequireLevel(minLevel: number): MiddlewareFunction {
  return async (ctx) => {
    const userLevel = await getUserLevel(ctx.interaction.user.id);

    if (userLevel < minLevel) {
      await ctx.interaction.reply({
        content: `❌ You need level ${minLevel} to use this command!`,
        flags: 64,
      });
      return false;
    }

    return true;
  };
}

// Use it
export default class AdvancedCommand extends Command {
  constructor() {
    super({
      name: "advanced",
      description: "Advanced command",
      data: new SlashCommandBuilder()
        .setName("advanced")
        .setDescription("Advanced command"),
      middlewares: [RequireLevel(10)],
      execute: async () => {},
    });
  }
}
```

### Chaining Middleware

```typescript
export default class SecureCommand extends Command {
  constructor() {
    super({
      name: "secure",
      description: "Secure command",
      data: new SlashCommandBuilder()
        .setName("secure")
        .setDescription("Secure command"),
      middlewares: [
        RequireGuild(),
        OnlyAdmin(),
        Cooldown(10000),
        RequireDatabase(),
      ],
      execute: async () => {},
    });
  }
}
```

### Benefits

- ✅ **Reusable** - Write once, use everywhere
- ✅ **Clean** - No if statements in commands
- ✅ **Composable** - Chain multiple middleware
- ✅ **Type-safe** - Full TypeScript support

---

## 4. Dynamic Configuration

Hot-reload bot configuration without restarting.

### Setup

```typescript
import { DynamicConfig } from "@disapp/core";

// Get or create instance with config path
const config = DynamicConfig.getInstance("./config.json");

// Listen for changes
config.on("changed", (newConfig, oldConfig) => {
  console.log("Config updated!", newConfig);
});
```

### Default Config Structure

```json
{
  "prefix": "!",
  "color": 5814522,
  "maintenanceMode": false,
  "features": {
    "commands": true,
    "events": true,
    "database": true
  },
  "limits": {
    "commandCooldown": 3000,
    "maxMessageLength": 2000
  },
  "customData": {}
}
```

### Usage in Commands

```typescript
import { DynamicConfig } from "@disapp/core";

export default class ConfigCommand extends Command {
  async execute(interaction: any) {
    const config = DynamicConfig.getInstance();

    // Check maintenance mode
    if (config.isMaintenanceMode()) {
      await interaction.reply("🔧 Bot is in maintenance mode!");
      return;
    }

    // Get color
    const color = config.get("color");

    // Check feature
    if (!config.isFeatureEnabled("commands")) {
      await interaction.reply("❌ Commands are disabled!");
      return;
    }

    await interaction.reply("✅ Command executed!");
  }
}
```

### Update Config Programmatically

```typescript
const config = DynamicConfig.getInstance();

// Update single value
config.set("maintenanceMode", true);

// Update multiple values
config.update({
  color: 0xff0000,
  maintenanceMode: false,
});

// Custom data
config.setCustom("welcomeMessage", "Hello!");
const message = config.getCustom("welcomeMessage");
```

### Live Reload Example

```typescript
// Edit config.json while bot is running
{
  "maintenanceMode": true  // Bot immediately enters maintenance mode
}

// No restart needed!
```

### Events

```typescript
config.on("loaded", (config) => {
  console.log("Config loaded:", config);
});

config.on("changed", (newConfig, oldConfig) => {
  console.log("Config changed:", newConfig);
});

config.on("updated", (key, value) => {
  console.log(`${key} updated to:`, value);
});

config.on("reset", (config) => {
  console.log("Config reset to defaults");
});
```

### Benefits

- ✅ **Hot Reload** - No bot restart needed
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Event-driven** - React to changes
- ✅ **Persistent** - Auto-saves to file

---

## Complete Example

Combining all features:

```typescript
import {
  Command,
  v2,
  OnlyAdmin,
  Cooldown,
  InteractionHandler,
  DynamicConfig,
} from "@disapp/core";
import { SlashCommandBuilder, ButtonStyle } from "discord.js";

export default class AdvancedCommand extends Command {
  constructor() {
    super({
      name: "advanced",
      description: "Advanced command with all features",
      data: new SlashCommandBuilder()
        .setName("advanced")
        .setDescription("Advanced command with all features"),
      middlewares: [OnlyAdmin(), Cooldown(5000)],
      execute: async () => {},
    });
  }

  async execute(interaction: any) {
    const config = DynamicConfig.getInstance();
    const color = config.get("color") || 0x5865f2;

    const longText = `
# Advanced Features Demo

This message demonstrates:
- Auto-chunking for long text
- Smart component handling
- Dynamic configuration
- Middleware protection

${"Lorem ipsum ".repeat(200)}
    `.trim();

    const message = v2()
      .enableAutoChunking()
      .accentColor(color)
      .text(longText)
      .separator()
      .buttons(
        {
          id: "refresh",
          label: "Refresh",
          style: ButtonStyle.Primary,
          emoji: "🔄",
          onClick: async (i) => {
            await i.update({
              content: "Refreshed at " + new Date().toLocaleTimeString(),
            });
          },
        },
        {
          id: "config",
          label: "Show Config",
          style: ButtonStyle.Secondary,
          emoji: "⚙️",
          onClick: async (i) => {
            const cfg = config.getAll();
            await i.reply({
              content: `\`\`\`json\n${JSON.stringify(cfg, null, 2)}\n\`\`\``,
              flags: 64,
            });
          },
        },
      )
      .select(
        "action",
        "Choose an action",
        [
          { label: "Enable Maintenance", value: "maintenance_on", emoji: "🔧" },
          {
            label: "Disable Maintenance",
            value: "maintenance_off",
            emoji: "✅",
          },
          { label: "Reset Config", value: "reset", emoji: "🔄" },
        ],
        async (i) => {
          const action = i.values[0];

          if (action === "maintenance_on") {
            config.set("maintenanceMode", true);
            await i.reply("🔧 Maintenance mode enabled!");
          } else if (action === "maintenance_off") {
            config.set("maintenanceMode", false);
            await i.reply("✅ Maintenance mode disabled!");
          } else if (action === "reset") {
            config.reset();
            await i.reply("🔄 Config reset to defaults!");
          }
        },
      )
      .build();

    const reply = await interaction.reply(message);

    if (message.handlers) {
      InteractionHandler.register(reply.id, message.handlers);
      InteractionHandler.setupCollector(interaction.channel, reply.id);
    }
  }
}
```

## Performance

All features are optimized for performance:

- **Smart Handlers**: O(1) lookup, automatic cleanup
- **Auto-Chunking**: Lazy evaluation, minimal overhead
- **Middleware**: Short-circuit on failure, cached results
- **Dynamic Config**: File watching with debounce, event-driven

## Best Practices

1. **Use middleware for common checks** - Don't repeat yourself
2. **Enable auto-chunking for user-generated content** - Prevent errors
3. **Use smart handlers for complex interactions** - Cleaner code
4. **Watch config in production** - Live updates without downtime

## Migration Guide

### From Manual Collectors

```typescript
// Before
const collector = channel.createMessageComponentCollector(...);
collector.on('collect', ...);

// After
const message = v2().buttons(..., onClick: ...).build();
InteractionHandler.register(...);
```

### From Manual Chunking

```typescript
// Before
if (text.length > 2000) {
  const chunks = splitText(text);
  for (const chunk of chunks) {
    await channel.send(chunk);
  }
}

// After
v2().enableAutoChunking().text(text).build();
```

### From Manual Permission Checks

```typescript
// Before
if (!interaction.member.permissions.has("ADMINISTRATOR")) {
  return interaction.reply("No permission!");
}

// After
middlewares: [OnlyAdmin()];
```

## License

MIT

---

## 5. Internationalization (i18n)

Multi-language support with JSON-based translations. Switch languages instantly without restarting the bot.

### Setup

Create locale files:

```
locales/
├── en.json
├── tr.json
└── de.json
```

**locales/en.json**

```json
{
  "commands": {
    "ping": {
      "response": "🏓 Pong! {latency}ms"
    }
  }
}
```

**locales/tr.json**

```json
{
  "commands": {
    "ping": {
      "response": "🏓 Pong! {latency}ms"
    }
  }
}
```

### Initialize

```typescript
import { i18n } from "@disapp/core";
import path from "path";

const i18nInstance = i18n({
  defaultLanguage: "en",
  fallbackLanguage: "en",
  localesPath: path.join(__dirname, "../locales"),
});

i18nInstance.loadLocales(path.join(__dirname, "../locales"));
```

### Usage in Commands

```typescript
import { Command, I18nHelper } from "@disapp/core";

export default class PingCommand extends Command {
  async execute(interaction: any) {
    const lang = interaction.locale?.split("-")[0] || "en";
    const latency = Math.round(interaction.client.ws.ping);

    const message = I18nHelper.command("ping.response", lang, { latency });
    await interaction.reply(message);
  }
}
```

### Helper Methods

```typescript
I18nHelper.t("key", "en", { param: "value" });
I18nHelper.button("confirm", "en");
I18nHelper.modal("settings", "en");
I18nHelper.message("welcome", "en");
I18nHelper.error("noPermission", "en");
I18nHelper.command("ping.response", "en", { latency: 50 });
I18nHelper.embed("welcome", "en");
```

### With Components V2

```typescript
const lang = interaction.locale?.split("-")[0] || "en";
const t = (key: string, params?: Record<string, any>) =>
  I18nHelper.command(key, lang, params);

const message = v2()
  .text(t("menu.title"))
  .buttons({
    id: "confirm",
    label: I18nHelper.button("confirm", lang),
    onClick: async (i) => {
      await i.reply(t("menu.confirmed"));
    },
  })
  .build();
```

### Benefits

- ✅ **Easy setup** - Just JSON files
- ✅ **Dynamic parameters** - Use `{param}` syntax
- ✅ **Auto language detection** - Uses Discord user locale
- ✅ **Fallback support** - Graceful degradation
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Zero overhead** - Cached in memory

See [I18N.md](./docs/I18N.md) for complete documentation.

## License

MIT
