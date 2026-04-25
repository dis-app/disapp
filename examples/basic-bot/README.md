<div align="center">
  <h1>Basic Bot Example</h1>
  <p><strong>Complete Discord bot example showcasing Disapp framework features</strong></p>
  
  [![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](https://opensource.org/licenses/GPL-3.0)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
  [![Disapp](https://img.shields.io/badge/Disapp-Core-blue.svg)](../../packages/core)
</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🚀 Core Features
- **Slash Commands** - Auto-registration
- **Event System** - Flexible handlers
- **Hot Reload** - Development mode
- **TypeScript** - Full type safety
- **Error Handling** - Beautiful formatting
- **Cooldowns** - Built-in rate limiting

</td>
<td width="50%">

### 📊 Advanced Features
- **Voice Tracking** - Activity monitoring
- **Message Stats** - User statistics
- **Leaderboards** - Ranking system
- **Message Chunking** - Long message handling
- **Database** - PostgreSQL integration
- **i18n** - Multi-language support

</td>
</tr>
</table>

## 🚀 Quick Setup

### 1️⃣ Copy Environment File

```bash
cp .env.example .env
```

### 2️⃣ Configure Environment Variables

Edit the `.env` file with your Discord bot credentials:

```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
DATABASE_URL=postgresql://user:password@host:5432/database
NODE_ENV=development
```

### 🔑 Getting Discord Credentials

1. Visit [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Navigate to the "Bot" section and click "Add Bot"
4. Copy the **Bot Token** (this is your `DISCORD_TOKEN`)
5. Go to "General Information" and copy **Application ID** (this is your `CLIENT_ID`)
6. Enable these **Privileged Gateway Intents**:
   - ✅ Presence Intent
   - ✅ Server Members Intent
   - ✅ Message Content Intent
7. Right-click your Discord server and copy **Server ID** (this is your `GUILD_ID`)

### 3️⃣ Install Dependencies

From the **root directory** of the monorepo:

```bash
pnpm install
```

### 4️⃣ Build Core Package

```bash
pnpm --filter @disapp/core build
```

### 5️⃣ Build Bot

```bash
pnpm --filter basic-bot build
```

## 🎮 Running the Bot

### Development Mode (with Hot Reload)

Automatically reloads on file changes:

```bash
pnpm --filter basic-bot dev
```

### Production Mode

Optimized for production:

```bash
pnpm --filter basic-bot start
```

## 📝 Available Commands

### Basic Commands

| Command | Description |
|---------|-------------|
| `/ping` | Check bot latency and API response time |
| `/help` | Display help menu with all commands |

### Voice Tracking

| Command | Description |
|---------|-------------|
| `/voiceleaderboard [limit]` | Show voice activity leaderboard (top users by voice time) |
| `/voicestats [user]` | Display detailed voice statistics for a user |

### Message Tracking

| Command | Description |
|---------|-------------|
| `/messageleaderboard [limit]` | Show message leaderboard (top users by message count) |
| `/messagestats [user]` | Display detailed message statistics for a user |

### Testing & Examples

| Command | Description |
|---------|-------------|
| `/longmessage [length] [maxchunk]` | Test automatic message chunking for long messages |
| `/codeblock` | Test code block chunking and formatting |
| `/fluent` | Demonstrate Fluent API capabilities |

### Moderation

| Command | Description |
|---------|-------------|
| `/ban [user] [reason]` | Ban a user from the server |
| `/kick [user] [reason]` | Kick a user from the server |
| `/mute [user] [duration]` | Temporarily mute a user |
| `/role [user] [role]` | Assign or remove a role from a user |

## 📁 Project Structure

```
basic-bot/
├── src/
│   ├── commands/              # Slash command implementations
│   │   ├── ping.ts           # Latency check command
│   │   ├── help.ts           # Help menu with Components V2
│   │   ├── fluent.ts         # Fluent API demonstration
│   │   ├── ban.ts            # Ban moderation command
│   │   ├── kick.ts           # Kick moderation command
│   │   ├── mute.ts           # Mute moderation command
│   │   ├── role.ts           # Role management command
│   │   ├── voiceleaderboard.ts    # Voice activity leaderboard
│   │   ├── voicestats.ts          # Voice statistics
│   │   ├── messageleaderboard.ts  # Message leaderboard
│   │   ├── messagestats.ts        # Message statistics
│   │   ├── longmessage.ts         # Message chunking test
│   │   └── codeblock.ts           # Code block chunking test
│   ├── events/               # Event handlers
│   │   ├── interactionCreate.ts   # Handle slash commands
│   │   ├── messageCreate.ts       # Track messages
│   │   ├── messageReactionAdd.ts  # Track reactions
│   │   └── voiceStateUpdate.ts    # Track voice activity
│   └── index.ts              # Bot entry point
├── locales/                  # Translation files
│   ├── en.json              # English translations
│   └── tr.json              # Turkish translations
├── .env.example             # Environment template
├── .env                     # Your environment (gitignored)
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## 🔧 Troubleshooting

### Bot Won't Start - Token Not Found

**Error Message:**
```
❌ Discord Token Not Found!

Please set your Discord bot token:
1. Create a .env file in your project root
2. Add: DISCORD_TOKEN=your_token_here
3. Get your token from: https://discord.com/developers/applications
```

**Solution:**
1. Ensure `.env` file exists in `examples/basic-bot/`
2. Verify `DISCORD_TOKEN` is set correctly
3. Check for extra spaces or quotes around the token

### Bot Won't Start - Login Failed

**Error Message:**
```
❌ Failed to Login

Common issues:
• Invalid token
• Token expired
• Bot not invited to server
• Missing intents
```

**Solutions:**
1. **Invalid Token**: Regenerate token in Discord Developer Portal
2. **Missing Intents**: Enable Privileged Gateway Intents
3. **Not Invited**: Use OAuth2 URL Generator to invite bot
4. **Permissions**: Ensure bot has `applications.commands` scope

### Database Connection Failed

**Error Message:**
```
Error: Connection to database failed
```

**Solutions:**
1. Verify PostgreSQL is running
2. Check `DATABASE_URL` format: `postgresql://user:password@host:5432/database`
3. Test connection with a database client
4. Ensure database exists and user has permissions
5. For Neon: Check project is not paused

### Commands Not Showing Up

**Problem:** Slash commands don't appear in Discord

**Solutions:**
1. **Wait**: Discord caches commands (1-2 minutes for guild, up to 1 hour for global)
2. **Verify CLIENT_ID**: Must match your application ID
3. **Check GUILD_ID**: For guild commands, ensure it's correct
4. **Restart Discord**: Close and reopen Discord client
5. **Check Permissions**: Bot needs `applications.commands` scope
6. **Re-invite Bot**: Generate new invite URL with updated scopes

### Hot Reload Not Working

**Problem:** Changes don't reflect automatically

**Solutions:**
1. Ensure `NODE_ENV=development` in `.env`
2. Check file is saved properly
3. Look for syntax errors in console
4. Restart dev server: `pnpm --filter basic-bot dev`

### TypeScript Compilation Errors

**Problem:** Build fails with type errors

**Solutions:**
1. Run `pnpm install` to ensure dependencies are installed
2. Build core package first: `pnpm --filter @disapp/core build`
3. Check `tsconfig.json` is not modified
4. Clear build cache: `rm -rf dist` and rebuild

## 🛠️ Development

### Hot Reload

In development mode (`NODE_ENV=development`), the bot automatically reloads commands and events when files change. This provides a seamless development experience without manual restarts.

**Features:**
- ✅ Automatic command reloading
- ✅ Event handler updates
- ✅ Memory-safe reloading
- ✅ Error recovery

### Adding New Commands

Create powerful slash commands with minimal boilerplate:

**1. Create Command File**

Create a new file in `src/commands/`, for example `src/commands/greet.ts`:

```typescript
import { Command, successEmbed } from '@disapp/core';
import { SlashCommandBuilder } from 'discord.js';

export default class GreetCommand extends Command {
  constructor() {
    super({
      name: 'greet',
      description: 'Greet a user',
      data: new SlashCommandBuilder()
        .setName('greet')
        .setDescription('Greet a user')
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('User to greet')
            .setRequired(true)
        ) as SlashCommandBuilder,
      execute: async () => {},
    });
  }

  async execute(interaction: any) {
    const user = interaction.options.getUser('user');
    await interaction.reply({
      embeds: [successEmbed('Greeting', `Hello ${user}! 👋`)]
    });
  }
}
```

**2. Bot Auto-Loads**

The bot automatically discovers and registers your command. No manual registration needed!

### Adding New Events

Handle Discord events with ease:

**1. Create Event File**

Create a new file in `src/events/`, for example `src/events/guildMemberAdd.ts`:

```typescript
import { Event } from '@disapp/core';
import { GuildMember } from 'discord.js';

export default class GuildMemberAddEvent extends Event {
  constructor() {
    super('guildMemberAdd');
  }

  async execute(member: GuildMember) {
    const channel = member.guild.systemChannel;
    if (channel) {
      await channel.send(`Welcome ${member}! 🎉`);
    }
  }
}
```

**2. Bot Auto-Loads**

The bot automatically discovers and registers your event handler!

### Using Fluent API

Build complex messages with ease:

```typescript
import { msg, embed, primary, danger } from '@disapp/core';

const message = msg()
  .setContent('# Welcome!')
  .addEmbed(
    embed()
      .info('Getting Started', 'Choose an option below')
      .addFields(
        { name: 'Option 1', value: 'Description 1', inline: true },
        { name: 'Option 2', value: 'Description 2', inline: true }
      )
  )
  .buttons(
    primary('Get Started', 'start'),
    danger('Cancel', 'cancel')
  )
  .build();

await interaction.reply(message);
```

### Database Operations

Work with the database using type-safe repositories:

```typescript
import { UserRepository, UserStatsRepository } from '@disapp/core';

const userRepo = new UserRepository();
const statsRepo = new UserStatsRepository();

const user = await userRepo.getOrCreate(
  BigInt(interaction.user.id),
  interaction.user.username,
  interaction.user.avatar
);

await statsRepo.incrementMessageCount(
  BigInt(interaction.user.id),
  BigInt(interaction.guildId)
);

const stats = await statsRepo.getStats(
  BigInt(interaction.user.id),
  BigInt(interaction.guildId)
);
```

## 📚 Learn More

### Disapp Framework
- 📖 [Main Documentation](../../README.md)
- 🚀 [Quick Start Guide](../../README.md#quick-start)
- 📝 [API Reference](../../docs/API.md)
- 💡 [Examples](../../docs/EXAMPLES.md)

### Advanced Features
- ⚡ [Advanced Features](../../docs/ADVANCED_FEATURES.md)
- 🎯 [Fluent API](../../docs/FLUENT_API.md)
- 🎨 [Components](../../docs/COMPONENTS.md)
- 🎪 [Components V2](../../docs/COMPONENTS_V2.md)
- 🔥 [Hot Reload](../../docs/HOT_RELOAD.md)
- 🏆 [Leaderboard](../../docs/LEADERBOARD.md)
- 🌍 [i18n](../../docs/I18N.md)

### External Resources
- 📘 [Discord.js Guide](https://discordjs.guide/)
- 📚 [Discord.js Documentation](https://discord.js.org/)
- 🔧 [Discord Developer Portal](https://discord.com/developers/docs)
- 💬 [Discord.js Discord Server](https://discord.gg/djs)

## 🤝 Contributing

Found a bug or want to improve this example? Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## 📄 License

This example is part of the Disapp framework and is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

See [LICENSE](../../LICENSE) for full license text.

---

<div align="center">
  <strong>Part of the Disapp Framework</strong>
  <br><br>
  <a href="https://github.com/dis-app/disapp">⭐ Star us on GitHub</a>
</div>
