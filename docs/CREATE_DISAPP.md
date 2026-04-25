# create-disapp CLI

Modern, interactive CLI tool to scaffold a new Disapp bot project in seconds.

## Quick Start

```bash
npx create-disapp
```

## Features

- **Interactive Prompts** - Beautiful terminal UI with arrow key navigation
- **Smart Defaults** - Sensible defaults for quick setup
- **Optional Database** - Choose to include Drizzle ORM + Neon PostgreSQL
- **Auto Install** - Automatically installs dependencies
- **Complete Setup** - Generates all necessary files and configurations
- **Hot Reload** - Development mode with auto-restart included

## What Gets Created

### Basic Structure (Always)
```
my-bot/
├── src/
│   ├── commands/
│   │   ├── ping.ts       # Latency check command
│   │   └── help.ts       # Components V2 help menu
│   ├── events/
│   │   └── interactionCreate.ts
│   └── index.ts
├── .env
├── .env.example
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

### With Database Option
```
├── drizzle.config.ts
└── src/
    └── database/
        └── schema.ts
```

## Interactive Prompts

### 1. Project Folder Name
```
? Project folder name: › my-discord-bot
```
- Lowercase letters, numbers, hyphens, underscores
- Validates folder doesn't exist
- Default: `my-discord-bot`

### 2. Bot Name
```
? Bot name: › My Bot
```
- Used in README and help command
- Any characters allowed
- Default: `My Bot`

### 3. Database
```
? Include database (Drizzle ORM + Neon PostgreSQL)? › (Y/n)
```
- Toggle with arrow keys or Y/N
- Includes Drizzle ORM + Neon PostgreSQL
- Default: Yes

### 4. Package Manager
```
? Package manager: › 
  ❯ pnpm (recommended)
    npm
    yarn
```
- Navigate with arrow keys
- Default: pnpm

## Example Output

```bash
$ npx create-disapp

🤖 Create Disapp Bot

Modern Discord.js framework with 50-90% less code

✔ Project folder name: · my-awesome-bot
✔ Bot name: · My Awesome Bot  
✔ Include database (Drizzle ORM + Neon PostgreSQL)? … yes
✔ Package manager: › pnpm (recommended)

✔ Project created successfully!

📦 Installing dependencies...

✔ Dependencies installed!

✨ Done! Your bot is ready.

Next steps:

  1. cd my-awesome-bot
  2. Configure .env file with your bot token
  3. Configure DATABASE_URL in .env
  4. pnpm run db:push
  5. pnpm run dev

  Get your bot token: https://discord.com/developers/applications
```

## Generated Files

### `src/index.ts`
Entry point with DisappClient setup:
```typescript
import 'dotenv/config';
import { DisappClient, initializeDatabase } from '@disapp/core';

const client = new DisappClient({
  token: process.env.DISCORD_TOKEN!,
  clientId: process.env.CLIENT_ID!,
  guildId: process.env.GUILD_ID,
  commandsPath: path.join(__dirname, 'commands'),
  eventsPath: path.join(__dirname, 'events'),
});

await client.start();
```

### `src/commands/ping.ts`
Simple latency check:
```typescript
export default class PingCommand extends Command {
  async execute(interaction: any) {
    const sent = await interaction.reply({ 
      content: 'Pinging...', 
      fetchReply: true 
    });
    
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    await interaction.editReply(`🏓 Pong! Latency: ${latency}ms`);
  }
}
```

### `src/commands/help.ts`
Modern Components V2 help menu:
```typescript
export default class HelpCommand extends Command {
  async execute(interaction: any) {
    const message = v2()
      .text('# 📚 Help Menu')
      .separator()
      .text('### 🏓 /ping\\nCheck bot latency')
      .buttons(
        { label: 'Docs', style: ButtonStyle.Link, url: '...' }
      )
      .build();

    await interaction.reply(message);
  }
}
```

## Package.json Scripts

### Without Database
```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

### With Database
```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  }
}
```

## Environment Setup

### Required Variables
```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
```

### With Database
```env
DATABASE_URL=postgresql://user:pass@host/db
```

## Getting Started After Creation

### 1. Navigate to Project
```bash
cd my-awesome-bot
```

### 2. Configure Environment
Edit `.env` file with your bot credentials:
- Get token from [Discord Developer Portal](https://discord.com/developers/applications)
- Copy Application ID as CLIENT_ID
- (Optional) Add GUILD_ID for guild-specific commands

### 3. Setup Database (if enabled)
```bash
# Get connection string from Neon Console
# Add to .env as DATABASE_URL

# Push schema to database
pnpm run db:push
```

### 4. Start Development
```bash
pnpm run dev
```

## Comparison with Manual Setup

### Manual Setup (Traditional)
```bash
mkdir my-bot && cd my-bot
npm init -y
npm install discord.js typescript @types/node
# Create tsconfig.json
# Create src folder
# Create index.ts
# Create commands folder
# Create events folder
# Setup Discord client
# Create .env file
# Create .gitignore
# Write first command
# Write event handler
# Configure TypeScript
# Setup hot reload
# ... 30+ minutes
```

### With create-disapp
```bash
npx create-disapp
# Answer 4 questions
# ... 2 minutes
```

**Time Saved: 28+ minutes**

## Advanced Usage

### Skip Prompts (Coming Soon)
```bash
npx create-disapp --name my-bot --database --pm pnpm
```

### Use Template (Coming Soon)
```bash
npx create-disapp --template minimal
npx create-disapp --template full
```

## Troubleshooting

### "Command not found"
Make sure you have Node.js 18+ installed:
```bash
node --version
```

### Installation Fails
Manually install dependencies:
```bash
cd my-bot
pnpm install
```

### TypeScript Errors
Rebuild the project:
```bash
pnpm run build
```

### Bot Won't Start
1. Check `.env` has valid token
2. Verify CLIENT_ID is correct
3. Ensure bot has proper intents

## Technical Details

### Dependencies Installed

**Always:**
- `@disapp/core` - Framework
- `discord.js` - Discord API
- `dotenv` - Environment variables
- `typescript` - Type safety
- `tsx` - Hot reload
- `@types/node` - Node types

**With Database:**
- `drizzle-orm` - ORM
- `@neondatabase/serverless` - Neon driver
- `drizzle-kit` - Migrations

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true
  }
}
```

### File Permissions
The CLI automatically sets executable permissions on Unix systems.

## Contributing

Found a bug or have a feature request? Open an issue on GitHub!

## License

MIT
