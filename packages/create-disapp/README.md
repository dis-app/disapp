<div align="center">
  <h1>create-disapp</h1>
  <p><strong>Interactive CLI to scaffold a new Disapp bot project with modern setup</strong></p>
  
  [![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](https://opensource.org/licenses/GPL-3.0)
  [![npm](https://img.shields.io/npm/v/create-disapp.svg)](https://www.npmjs.com/package/create-disapp)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
</div>

---

## 🚀 Usage

```bash
npx create-disapp
```

### Alternative Package Managers

```bash
pnpm create disapp

yarn create disapp

npm create disapp
```

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎯 Setup Experience
- **Interactive CLI** - Modern prompts with validation
- **Progress Indicators** - Real-time feedback
- **Smart Defaults** - Sensible choices pre-selected
- **Error Handling** - Clear error messages

</td>
<td width="50%">

### 🛠️ Project Features
- **TypeScript** - Full type safety
- **Hot Reload** - Auto-restart on changes
- **Database** - Optional Drizzle ORM + PostgreSQL
- **Examples** - Ready-to-use commands
- **Package Manager** - Choose npm, pnpm, or yarn

</td>
</tr>
</table>

## 📦 What You Get

### Basic Project Structure

```
my-discord-bot/
├── src/
│   ├── commands/
│   │   ├── ping.ts              # Example ping command
│   │   └── help.ts              # Help menu with Components V2
│   ├── events/
│   │   └── interactionCreate.ts # Interaction handler
│   └── index.ts                 # Bot entry point
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript config
├── README.md                    # Project documentation
└── .gitignore                   # Git ignore rules
```

### With Database Option

When database is enabled, additional files are included:

```
├── drizzle.config.ts            # Drizzle ORM configuration
└── src/
    └── database/
        └── schema.ts            # Database schema definitions
```

## 🎨 Interactive Prompts

The CLI will guide you through the setup process with the following prompts:

### 1️⃣ Project Folder Name
- **Default**: `my-discord-bot`
- **Validation**: Lowercase letters, numbers, hyphens, and underscores only
- **Checks**: Ensures folder doesn't already exist

### 2️⃣ Bot Name
- **Default**: `My Bot`
- **Usage**: Displayed in README and help command
- **Format**: Any string

### 3️⃣ Database Setup
- **Options**: Yes / No
- **Default**: Yes
- **Includes**: Drizzle ORM + PostgreSQL (Neon)
- **Features**: Type-safe queries, migrations, Studio UI

### 4️⃣ Package Manager
- **Options**: pnpm (recommended), npm, yarn
- **Default**: pnpm
- **Auto-detection**: Uses your preferred package manager

## 💻 Example Session

```bash
$ npx create-disapp

🤖 Create Disapp Bot

Modern Discord.js framework with 50-90% less code

✔ Project folder name: · my-awesome-bot
✔ Bot name: · My Awesome Bot
✔ Include database (Drizzle ORM + PostgreSQL)? … yes
✔ Package manager: › pnpm (recommended)

✔ Project created successfully!

📦 Installing dependencies...

✔ Dependencies installed!

✨ Done! Your bot is ready.

Next steps:

  1. cd my-awesome-bot
  2. Configure .env file with your bot token
  3. Configure DATABASE_URL in .env (if database enabled)
  4. pnpm run db:push (if database enabled)
  5. pnpm run dev

  Get your bot token: https://discord.com/developers/applications
  Documentation: https://github.com/dis-app/disapp
```

## 🎮 Generated Commands

### `/ping` Command
Check bot latency and API response time with real-time metrics.

**Features:**
- Bot latency measurement
- API response time
- Uptime display
- Memory usage stats

### `/help` Command
Modern help menu using Discord Components V2 with advanced UI elements.

**Features:**
- Container layout for organized display
- Text displays with formatting
- Visual separators
- Interactive link buttons
- Command list with descriptions

## 📜 Available Scripts

### Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Start bot with hot reload (auto-restart on changes) |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run start` | Run production build |

### Database (if enabled)

| Command | Description |
|---------|-------------|
| `npm run db:push` | Push schema changes to database |
| `npm run db:studio` | Open Drizzle Studio (visual database editor) |
| `npm run db:migrate` | Run database migrations |

## ⚙️ Environment Variables

Create a `.env` file in your project root with the following variables:

```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
DATABASE_URL=your_database_url_here
```

### 🔑 Getting Your Bot Token

1. Visit [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Navigate to the "Bot" section in the sidebar
4. Click "Reset Token" and copy the token
5. Copy the "Application ID" from "General Information" (this is your CLIENT_ID)
6. Enable required intents (Server Members, Message Content, etc.)

### 🗄️ Getting Database URL (if enabled)

1. Visit [Neon Console](https://console.neon.tech/)
2. Create a new project (free tier available)
3. Copy the connection string from the dashboard
4. Paste it in `.env` as `DATABASE_URL`

**Format:** `postgresql://user:password@host/database?sslmode=require`

## 🎁 Features Included

### Disapp Framework
- ✅ **50-90% less code** than vanilla Discord.js
- ✅ **Fluent API** for building messages and components
- ✅ **Components V2** support with modern UI elements
- ✅ **Automatic command registration** - No manual REST API calls
- ✅ **Hot reload** in development mode
- ✅ **Built-in error handling** with global error catching
- ✅ **Type-safe** with full TypeScript support

### Development Tools
- ✅ **tsx** for hot reload and fast execution
- ✅ **Automatic command sync** on startup
- ✅ **Error handling** with detailed stack traces
- ✅ **Logging** with Winston (optional)
- ✅ **Environment validation** with dotenv

### Optional Database
- ✅ **Drizzle ORM** - Type-safe database queries
- ✅ **PostgreSQL** - Reliable and scalable database
- ✅ **Migrations** - Version control for your schema
- ✅ **Studio UI** - Visual database editor
- ✅ **Connection pooling** - Optimized performance

## 🎨 Customization

After creating your project, you can customize it further:

### Adding Commands
Create new command files in `src/commands/`:

```typescript
import { Command } from '@disapp/core';

export default class MyCommand extends Command {
  constructor() {
    super({
      name: 'mycommand',
      description: 'My custom command'
    });
  }

  async execute(interaction) {
    await interaction.reply('Hello!');
  }
}
```

### Adding Events
Create new event handlers in `src/events/`:

```typescript
import { Event } from '@disapp/core';

export default class MyEvent extends Event {
  constructor() {
    super('messageCreate');
  }

  async execute(message) {
    console.log(`Message: ${message.content}`);
  }
}
```

### Database Schema
Edit `src/database/schema.ts` to add tables:

```typescript
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});
```

### Bot Configuration
Customize bot behavior in `src/index.ts`:

```typescript
const client = new DisappClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
  presence: {
    status: 'online',
    activities: [{ name: 'with Disapp', type: 0 }]
  }
});
```

## 🔧 Troubleshooting

### Installation Issues

**Problem:** Installation fails or hangs

**Solution:**
```bash
cd my-bot
rm -rf node_modules package-lock.json
npm install
```

Or try a different package manager:
```bash
pnpm install
```

### Bot Won't Start

**Problem:** Bot doesn't connect to Discord

**Checklist:**
- ✅ Verify `.env` file exists and has valid `DISCORD_TOKEN`
- ✅ Ensure `CLIENT_ID` matches your application ID
- ✅ Check bot has required intents enabled in Developer Portal
- ✅ Verify bot is invited to your server with proper permissions

### Database Connection Fails

**Problem:** Cannot connect to database

**Solutions:**
1. Verify `DATABASE_URL` format is correct
2. Run `npm run db:push` to create tables
3. Check your Neon project is active and not paused
4. Ensure IP allowlist includes your IP (if configured)
5. Test connection string with a database client

### Commands Not Registering

**Problem:** Slash commands don't appear in Discord

**Solutions:**
1. Wait 1-2 minutes for Discord to sync commands
2. Restart Discord client
3. Check `CLIENT_ID` is correct
4. For guild commands, verify `GUILD_ID` is set
5. Check bot has `applications.commands` scope

### TypeScript Errors

**Problem:** Type errors during development

**Solutions:**
1. Run `npm run build` to check for errors
2. Ensure `@types/node` is installed
3. Check `tsconfig.json` is not modified
4. Update dependencies: `npm update`

## 📚 Learn More

### Official Resources
- 📖 [Disapp Documentation](https://github.com/dis-app/disapp) - Complete framework guide
- 🚀 [Disapp Examples](https://github.com/dis-app/disapp/tree/main/examples) - Sample projects
- 📝 [API Reference](https://github.com/dis-app/disapp/blob/main/docs/API.md) - Full API docs

### Discord.js Resources
- 📘 [Discord.js Guide](https://discordjs.guide/) - Official guide
- 📚 [Discord.js Documentation](https://discord.js.org/) - API reference
- 💬 [Discord.js Discord](https://discord.gg/djs) - Community support

### Database Resources
- 🗄️ [Drizzle ORM Docs](https://orm.drizzle.team/) - ORM documentation
- 🐘 [PostgreSQL Tutorial](https://www.postgresql.org/docs/) - Database guide
- ☁️ [Neon Documentation](https://neon.tech/docs) - Serverless Postgres

### TypeScript Resources
- 📖 [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Official docs
- 🎓 [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/) - In-depth guide

## 🤝 Contributing

Found a bug or have a feature request? Please open an issue on [GitHub](https://github.com/dis-app/disapp/issues).

## 📄 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

See [LICENSE](../../LICENSE) for full license text.

---

<div align="center">
  <strong>Built with ❤️ by the Disapp team</strong>
  <br><br>
  <a href="https://github.com/dis-app/disapp">⭐ Star Disapp on GitHub</a>
</div>
