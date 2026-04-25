<div align="center">
  <img src="apps/web/public/disapp.svg" alt="Disapp Logo" width="120" height="120" />
  <h1>Disapp</h1>
  <p><strong>Modern Discord bot framework that makes Discord.js 50-90% easier to use</strong></p>
  
  [![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](https://opensource.org/licenses/GPL-3.0)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
  [![Discord.js](https://img.shields.io/badge/Discord.js-14-5865F2.svg)](https://discord.js.org/)
  [![Tests](https://img.shields.io/badge/Tests-301%20passing-success.svg)](./packages/core/TESTING.md)
  [![Coverage](https://img.shields.io/badge/Coverage-65%25+-success.svg)](./packages/core/TESTING.md)
</div>

---

## Why Disapp?

**Discord.js is powerful but verbose. Disapp makes it effortless.**

<table>
<tr>
<td width="50%">

**Discord.js** - 15 lines
```typescript
const button1 = new ButtonBuilder()
  .setCustomId('confirm')
  .setLabel('Confirm')
  .setStyle(ButtonStyle.Success);
const button2 = new ButtonBuilder()
  .setCustomId('cancel')
  .setLabel('Cancel')
  .setStyle(ButtonStyle.Danger);
const row = new ActionRowBuilder()
  .addComponents(button1, button2);
await interaction.reply({
  content: 'Are you sure?',
  components: [row]
});
```

</td>
<td width="50%">

**Disapp** - 1 line
```typescript
await interaction.reply({
  content: 'Are you sure?',
  components: [confirm('confirm', 'cancel')]
});
```

</td>
</tr>
</table>

📖 See [COMPARISON.md](./docs/COMPARISON.md) for more examples.

## ✨ Features

<table>
<tr>
<td width="50%">

### 🚀 Developer Experience
- **50-90% less code** than vanilla Discord.js
- **Fluent API** - Chain methods, build faster
- **Type-safe** - Full TypeScript support
- **Hot Reload** - Memory-safe, instant updates
- **Auto Registry** - Commands sync automatically
- **Zero overhead** - Fast and efficient

</td>
<td width="50%">

### 🛠️ Built-in Tools
- **Database** - Drizzle ORM + PostgreSQL
- **Logging** - Winston built-in
- **Config** - Centralized management
- **i18n** - Multi-language support
- **Components V2** - Advanced Discord UI
- **Error Handling** - Global error catching

</td>
</tr>
</table>

### 🎯 Why Choose Disapp?

- ✅ **100% Compatible** - Uses Discord.js under the hood
- ✅ **Production Ready** - 301 tests passing, 65%+ coverage
- ✅ **Open Source** - GPL-3.0 licensed
- ✅ **Modern Stack** - TypeScript, PNPM, Monorepo
- ✅ **Active Development** - Regular updates and improvements

## 🚀 Quick Start

### Option 1: Create New Bot (Recommended)

```bash
npx create-disapp my-bot
cd my-bot
npm install
npm run dev
```

### Option 2: Clone Repository

```bash
git clone https://github.com/dis-app/disapp.git
cd disapp
pnpm install
pnpm build:core
pnpm dev:bot
```

📚 See [CREATE_DISAPP.md](./docs/CREATE_DISAPP.md) for detailed setup guide.

## 📖 Examples

### Simple Command

```typescript
import { Command, successEmbed, confirm } from '@disapp/core';

export default class DeleteCommand extends Command {
  constructor() {
    super({
      name: 'delete',
      description: 'Delete something'
    });
  }

  async execute(interaction) {
    await interaction.reply({
      embeds: [successEmbed('Confirm', 'Are you sure?')],
      components: [confirm('yes', 'no')]
    });
  }
}
```

### Complex Message with Components

```typescript
import { msg, embed, ButtonStyle } from '@disapp/core';

const message = msg()
  .setContent('# User Management')
  .buttons(
    { label: 'View', id: 'view', style: ButtonStyle.Primary, emoji: '👁️' },
    { label: 'Edit', id: 'edit', style: ButtonStyle.Secondary, emoji: '✏️' },
    { label: 'Delete', id: 'delete', style: ButtonStyle.Danger, emoji: '🗑️' }
  )
  .userSelect('select_user', 'Choose users', [1, 5])
  .addEmbed(
    embed()
      .info('Info', 'Select an action')
      .addFields(
        { name: 'Total', value: '1,234', inline: true },
        { name: 'Online', value: '567', inline: true }
      )
  )
  .build();

await interaction.reply(message);
```

### Database Operations

```typescript
import { UserRepository } from '@disapp/core';

const userRepo = new UserRepository();
const user = await userRepo.getOrCreate(
  BigInt(userId),
  username,
  avatar
);
```

💡 See [EXAMPLES.md](./docs/EXAMPLES.md) for more code examples.

## 🎨 Shortcuts & Utilities

Disapp provides powerful shortcuts to reduce boilerplate:

| Shortcut | Description | Usage |
|----------|-------------|-------|
| `msg()` | MessageBuilder | Build complex messages |
| `embed()` | EmbedBuilder | Create embeds easily |
| `btn()` | Button | Create buttons |
| `primary()` | Primary button | Blue button |
| `success()` | Success button | Green button |
| `danger()` | Danger button | Red button |
| `confirm()` | Confirm/Cancel row | Two-button confirmation |
| `yesno()` | Yes/No row | Yes/No buttons |
| `successEmbed()` | Green embed | Success message |
| `errorEmbed()` | Red embed | Error message |
| `warningEmbed()` | Yellow embed | Warning message |
| `infoEmbed()` | Blue embed | Info message |

📘 See [FLUENT_API.md](./docs/FLUENT_API.md) for complete API reference.

## 📁 Project Structure

```
disapp/
├── apps/
│   └── web/                    # Next.js documentation website
├── packages/
│   ├── core/                   # Core framework (@disapp/core)
│   ├── create-disapp/          # CLI scaffolding tool
│   └── config/                 # Shared TypeScript configs
├── examples/
│   └── basic-bot/              # Example Discord bot
└── docs/                       # Documentation files
```

## 🛠️ Development Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start web documentation server |
| `pnpm dev:bot` | Run example bot in development |
| `pnpm build` | Build all packages |
| `pnpm build:core` | Build core package only |
| `pnpm test` | Run all tests |
| `pnpm test:core` | Run core package tests |
| `pnpm db:push` | Push database schema changes |
| `pnpm db:studio` | Open Drizzle Studio |
| `pnpm db:migrate` | Run database migrations |

## 📚 Documentation

### Getting Started
- 🚀 [CREATE_DISAPP.md](./docs/CREATE_DISAPP.md) - CLI tool for scaffolding new bots
- 📖 [COMPARISON.md](./docs/COMPARISON.md) - Disapp vs Discord.js comparison
- 🔥 [HOT_RELOAD.md](./docs/HOT_RELOAD.md) - Hot reload & auto registry

### Core Features
- 🎯 [FLUENT_API.md](./docs/FLUENT_API.md) - Fluent API guide
- 🎨 [COMPONENTS.md](./docs/COMPONENTS.md) - Component builders
- 🎪 [COMPONENTS_V2.md](./docs/COMPONENTS_V2.md) - Discord Components V2
- 🌍 [I18N.md](./docs/I18N.md) - Multi-language support
- 🏆 [LEADERBOARD.md](./docs/LEADERBOARD.md) - Leaderboard builder

### Advanced
- ⚡ [ADVANCED_FEATURES.md](./docs/ADVANCED_FEATURES.md) - Smart handlers, middleware, dynamic config
- 📝 [API.md](./docs/API.md) - Complete API reference
- 💡 [EXAMPLES.md](./docs/EXAMPLES.md) - Code examples
- 🧪 [TESTING.md](./packages/core/TESTING.md) - Testing guide

### Project
- 🗺️ [ROADMAP.md](./ROADMAP.md) - Project roadmap
- 🤝 [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines

## ⚖️ Disapp vs Discord.js

| Feature | Discord.js | Disapp |
|---------|-----------|--------|
| **Code Amount** | 100% | **10-50%** ⚡ |
| **Readability** | Medium | **High** 📖 |
| **Type Safety** | ✅ | ✅ |
| **Shortcuts** | ❌ | **✅** |
| **Database** | ❌ | **✅ Built-in** |
| **Logging** | ❌ | **✅ Winston** |
| **Config Management** | ❌ | **✅ Centralized** |
| **Hot Reload** | ❌ | **✅ Memory-safe** |
| **Auto Registry** | ❌ | **✅ Automatic** |
| **i18n Support** | ❌ | **✅ JSON-based** |
| **Cooldowns** | Manual | **✅ Built-in** |
| **Error Handling** | Manual | **✅ Global** |
| **Testing** | Manual | **✅ 301 tests** |

📊 See [COMPARISON.md](./docs/COMPARISON.md) for detailed comparison.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Setup

1. Fork and clone the repository
2. Install dependencies: `pnpm install`
3. Build core package: `pnpm build:core`
4. Run tests: `pnpm test:core`
5. Make your changes and submit a PR

## 📄 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

- ✅ Free to use, modify, and distribute
- ✅ Open source and transparent
- ✅ Derivative works must also be GPL-3.0

See [LICENSE](./LICENSE) for full license text.

## 🛠️ Tech Stack

<table>
<tr>
<td width="50%">

### Core
- **TypeScript** - Type-safe development
- **Discord.js 14** - Discord API wrapper
- **Drizzle ORM** - Type-safe database
- **PostgreSQL** - Reliable database
- **Winston** - Logging framework

</td>
<td width="50%">

### Tooling
- **PNPM Workspaces** - Monorepo management
- **Vitest** - Fast unit testing
- **Next.js 16.2.4** - Documentation site
- **Tailwind CSS 4.2.4** - Styling
- **ESLint** - Code quality

</td>
</tr>
</table>

## 🌟 Community & Support

- 📖 [Documentation](https://disapp-framework.vercel.app)
- 💬 [Discord Server](https://discord.gg/dqArfzANGp)
- 🐛 [Issue Tracker](https://github.com/dis-app/disapp/issues)
- 📦 [NPM Package](https://www.npmjs.com/package/@disapp/core)

## 🚀 Deployment

### Documentation Website

The documentation website (`apps/web`) can be deployed to Vercel:

**Quick Deploy**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dis-app/disapp)

**Manual Setup**:
1. Import repository to Vercel
2. Set Root Directory: `apps/web`
3. Set Install Command: `cd ../.. && pnpm install --frozen-lockfile`
4. Set Build Command: `cd ../.. && pnpm --filter web build`
5. Deploy

See [apps/web/BUILD.md](./apps/web/BUILD.md) for detailed instructions.

### Discord Bot

Deploy your Discord bot to any Node.js hosting platform:

- **Railway** - Automatic deployment from Git
- **Heroku** - Container or buildpack deployment
- **DigitalOcean** - App Platform or Droplet
- **AWS** - EC2, ECS, or Lambda
- **Self-hosted** - VPS with PM2 or systemd

## 🎯 Project Status

- ✅ **v0.1.0** - Comprehensive testing (301 tests, 65%+ coverage)
- 🚧 **v0.2.0** - Documentation improvements (in progress)
- 📋 **v0.3.0** - Examples & tutorials (planned)
- 🎯 **v1.0.0** - Stable release (planned)

See [ROADMAP.md](./ROADMAP.md) for detailed roadmap.

---

<div align="center">
  <strong>Disapp = Discord.js + Developer Experience + Best Practices + Productivity</strong>
  <br><br>
  Made with ❤️ by the Disapp team
  <br><br>
  <a href="https://github.com/dis-app/disapp">⭐ Star us on GitHub</a>
</div>


