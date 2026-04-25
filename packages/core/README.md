<div align="center">
  <h1>@disapp/core</h1>
  <p><strong>Modern Discord bot framework with advanced component system and 50-90% less code</strong></p>
  
  [![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](https://opensource.org/licenses/GPL-3.0)
  [![npm](https://img.shields.io/npm/v/@disapp/core.svg)](https://www.npmjs.com/package/@disapp/core)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
  [![Tests](https://img.shields.io/badge/Tests-301%20passing-success.svg)](./TESTING.md)
  [![Coverage](https://img.shields.io/badge/Coverage-65%25+-success.svg)](./TESTING.md)
</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🚀 Core Features
- **Slash Commands** - Modern command system
- **Event System** - Flexible event handling
- **Hot Reload** - Memory-safe auto-restart
- **Auto Registry** - Commands sync automatically
- **Type-safe** - Full TypeScript support
- **Error Handling** - Global error catching

</td>
<td width="50%">

### 🛠️ Advanced Features
- **Database** - Drizzle ORM + PostgreSQL
- **Components V2** - Discord's latest UI
- **i18n** - Multi-language support
- **Logging** - Winston integration
- **Shortcuts** - Fluent API helpers
- **Middleware** - Request interceptors

</td>
</tr>
</table>

### 🎨 Component System

- ✅ **Text Display** - Rich markdown formatting
- ✅ **Media Gallery** - Image carousels
- ✅ **Containers** - Organized layouts
- ✅ **Select Menus** - User/Role/Channel pickers
- ✅ **Buttons** - Interactive actions
- ✅ **Modals** - Form inputs

## 📦 Installation

```bash
npm install @disapp/core
```

### Alternative Package Managers

```bash
pnpm add @disapp/core

yarn add @disapp/core
```

### Requirements

- Node.js 18.0.0 or higher
- TypeScript 5.0 or higher
- Discord.js 14.x

## 🚀 Quick Start

### Basic Setup

```typescript
import { DisappClient } from '@disapp/core';
import { GatewayIntentBits } from 'discord.js';

const client = new DisappClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
  config: {
    token: process.env.DISCORD_TOKEN!,
    clientId: process.env.CLIENT_ID!,
  },
});

await client.start();
```

### With Database

```typescript
import { DisappClient } from '@disapp/core';
import { GatewayIntentBits } from 'discord.js';

const client = new DisappClient({
  intents: [GatewayIntentBits.Guilds],
  config: {
    token: process.env.DISCORD_TOKEN!,
    clientId: process.env.CLIENT_ID!,
    database: {
      url: process.env.DATABASE_URL!
    },
  },
});

await client.start();
```

### Creating Commands

```typescript
import { Command, successEmbed, confirm } from '@disapp/core';

export default class PingCommand extends Command {
  constructor() {
    super({
      name: 'ping',
      description: 'Check bot latency'
    });
  }

  async execute(interaction) {
    const latency = Date.now() - interaction.createdTimestamp;
    await interaction.reply({
      embeds: [successEmbed('Pong!', `Latency: ${latency}ms`)],
      components: [confirm('refresh', 'close')]
    });
  }
}
```

## 🎨 Advanced Components

### Text Display

Rich markdown text with Discord formatting support.

```typescript
import { TextDisplay } from '@disapp/core';

const text = new TextDisplay('# Hello World\nThis is **bold** and *italic*');
```

**Features:**
- Markdown formatting
- Headers, lists, code blocks
- Discord mentions and emojis
- Line breaks and spacing

### Media Gallery

Image carousels with descriptions and navigation.

```typescript
import { MediaGallery } from '@disapp/core';

const gallery = new MediaGallery()
  .addItem('https://example.com/image1.png', 'First image')
  .addItem('https://example.com/image2.png', 'Second image')
  .addItem('https://example.com/image3.png', 'Third image');
```

**Features:**
- Multiple images
- Image descriptions
- Automatic carousel
- URL validation

### Container

Organized layouts with accent colors and multiple components.

```typescript
import { Container, TextDisplay, Button, ButtonStyle } from '@disapp/core';

const container = new Container()
  .setAccentColor(0xFF0000)
  .addComponent(new TextDisplay('# Important Notice'))
  .addComponent(new TextDisplay('Please read carefully'))
  .addComponent(new Button(ButtonStyle.Primary, 'Acknowledge', 'btn_ack'));
```

**Features:**
- Accent colors
- Multiple components
- Nested layouts
- Visual organization

### Select Menus

Interactive dropdowns for user, role, and channel selection.

```typescript
import { UserSelect, RoleSelect, ChannelSelect } from '@disapp/core';

const userSelect = new UserSelect('select_user')
  .setPlaceholder('Choose users')
  .setMinMax(1, 5);

const roleSelect = new RoleSelect('select_role')
  .setPlaceholder('Choose roles')
  .setMinMax(1, 3);

const channelSelect = new ChannelSelect('select_channel')
  .setChannelTypes([0, 2])
  .setPlaceholder('Choose channels');
```

**Features:**
- User selection with min/max
- Role selection with filters
- Channel selection by type
- Custom placeholders
- Multi-select support

## 🗄️ Database

### Setup

1. **Create Environment File**

Create a `.env` file in your project root:

```env
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
```

2. **Run Migrations**

```bash
pnpm db:migrate
```

Or manually:

```bash
node scripts/migrate.js
```

### Usage

#### User Repository

```typescript
import { UserRepository } from '@disapp/core';

const userRepo = new UserRepository();

const user = await userRepo.getOrCreate(
  BigInt(userId),
  username,
  avatar
);

await userRepo.updateUser(BigInt(userId), {
  username: 'NewName',
  avatar: 'newAvatar.png'
});
```

#### Guild Repository

```typescript
import { GuildRepository } from '@disapp/core';

const guildRepo = new GuildRepository();

const guild = await guildRepo.getOrCreate(
  BigInt(guildId),
  guildName,
  icon
);
```

#### User Stats Repository

```typescript
import { UserStatsRepository } from '@disapp/core';

const statsRepo = new UserStatsRepository();

await statsRepo.incrementMessageCount(
  BigInt(userId),
  BigInt(guildId)
);

const stats = await statsRepo.getStats(
  BigInt(userId),
  BigInt(guildId)
);
```

### Testing with Database

For running tests with a real database:

```bash
# Set DATABASE_URL in .env
DATABASE_URL=postgresql://user:password@host:port/testdb

# Run migrations
pnpm db:migrate

# Run tests
pnpm test
```

**Note:** Tests require a PostgreSQL database. Use [Neon](https://neon.tech) for free serverless PostgreSQL.

📚 See [TESTING.md](./TESTING.md) for detailed testing guide.

## 📝 Logging

Built-in Winston logger with multiple log levels and formatting.

### Basic Usage

```typescript
import { Logger } from '@disapp/core';

const logger = new Logger({ level: 'info' });

logger.info('Bot started successfully');
logger.warn('Rate limit approaching');
logger.error('Failed to connect', error);
logger.debug('Debug information', { data: 'value' });
```

### Log Levels

| Level | Description | Usage |
|-------|-------------|-------|
| `error` | Error messages | Critical failures |
| `warn` | Warning messages | Potential issues |
| `info` | Informational | General information |
| `debug` | Debug messages | Development details |

### Custom Configuration

```typescript
const logger = new Logger({
  level: 'debug',
  format: 'json',
  filename: 'bot.log'
});
```

## 🎯 Shortcuts & Utilities

Disapp provides powerful shortcuts to reduce boilerplate code:

```typescript
import {
  msg,              // MessageBuilder
  embed,            // EmbedBuilder
  btn,              // Button helper
  primary,          // Primary button
  success,          // Success button
  danger,           // Danger button
  confirm,          // Confirm/Cancel row
  yesno,            // Yes/No row
  successEmbed,     // Green embed
  errorEmbed,       // Red embed
  warningEmbed,     // Yellow embed
  infoEmbed,        // Blue embed
} from '@disapp/core';
```

### Example Usage

```typescript
await interaction.reply({
  embeds: [successEmbed('Success', 'Operation completed')],
  components: [confirm('accept', 'decline')]
});

const message = msg()
  .setContent('Choose an option')
  .buttons(
    primary('Option 1', 'opt1'),
    success('Option 2', 'opt2'),
    danger('Cancel', 'cancel')
  )
  .build();
```

## 🌍 Internationalization (i18n)

Multi-language support with JSON translation files.

### Setup

1. **Create Translation Files**

```json
// locales/en.json
{
  "welcome": "Welcome {username}!",
  "goodbye": "Goodbye {username}!"
}
```

```json
// locales/tr.json
{
  "welcome": "Hoş geldin {username}!",
  "goodbye": "Güle güle {username}!"
}
```

2. **Initialize i18n**

```typescript
import { I18n } from '@disapp/core';

const i18n = new I18n('./locales', 'en');
await i18n.loadLanguages();
```

3. **Use Translations**

```typescript
const message = i18n.t('en', 'welcome', { username: 'John' });
```

📚 See [I18N.md](../../docs/I18N.md) for complete guide.

## 📚 Documentation

### Core Documentation
- 🚀 [Quick Start Guide](../../README.md#quick-start)
- 📖 [API Reference](../../docs/API.md)
- 💡 [Examples](../../docs/EXAMPLES.md)
- 🧪 [Testing Guide](./TESTING.md)

### Advanced Features
- ⚡ [Advanced Features](../../docs/ADVANCED_FEATURES.md)
- 🎯 [Fluent API](../../docs/FLUENT_API.md)
- 🎨 [Components](../../docs/COMPONENTS.md)
- 🎪 [Components V2](../../docs/COMPONENTS_V2.md)
- 🔥 [Hot Reload](../../docs/HOT_RELOAD.md)
- 🏆 [Leaderboard](../../docs/LEADERBOARD.md)

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

### Development Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Build the package: `pnpm build:core`
4. Run tests: `pnpm test:core`

## 📄 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

See [LICENSE](../../LICENSE) for full license text.

## 🛠️ Tech Stack

- **TypeScript** - Type-safe development
- **Discord.js 14** - Discord API wrapper
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Reliable database
- **Winston** - Logging framework
- **Vitest** - Fast unit testing

## 🌟 Links

- 📦 [NPM Package](https://www.npmjs.com/package/@disapp/core)
- 📖 [Documentation](https://github.com/dis-app/disapp)
- 🐛 [Issue Tracker](https://github.com/dis-app/disapp/issues)
- 💬 [Discord Server](https://discord.gg/dqArfzANGp)

---

<div align="center">
  <strong>Part of the Disapp Framework</strong>
  <br><br>
  <a href="https://github.com/dis-app/disapp">⭐ Star us on GitHub</a>
</div>
