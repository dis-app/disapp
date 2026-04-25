import fs from 'fs-extra';
import path from 'path';
import { TemplateOptions } from '../types.js';

export async function generateReadme(options: TemplateOptions) {
  const { projectPath, config } = options;
  const { projectName, botName, useDatabase, useI18n, packageManager } = config;

  const content = `# ${botName}

A Discord bot built with [Disapp](https://github.com/dis-app/disapp) - Modern Discord.js framework with 50-90% less code.

## Features

- ✅ Slash commands
- ✅ Event handling
- ✅ Hot reload (development)
- ✅ TypeScript
- ✅ Automatic button/select handling
${useI18n ? '- ✅ Multi-language support (i18n)' : ''}
${useDatabase ? '- ✅ Database (Drizzle ORM + Neon PostgreSQL)' : ''}

## Setup

1. Install dependencies:
\`\`\`bash
${packageManager} install
\`\`\`

2. Configure \`.env\` file:
\`\`\`env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
${useDatabase ? 'DATABASE_URL=your_neon_database_url_here' : ''}
\`\`\`

Get your bot token from [Discord Developer Portal](https://discord.com/developers/applications)

${useDatabase ? `3. Push database schema:
\`\`\`bash
${packageManager} run db:push
\`\`\`

4. Start the bot:` : '3. Start the bot:'}
\`\`\`bash
${packageManager} run dev
\`\`\`

## Commands

- \`/ping\` - Check bot latency
- \`/help\` - Show help menu
${useI18n ? '- `/language` - Change bot language' : ''}

## Development

- \`${packageManager} run dev\` - Start with hot reload
- \`${packageManager} run build\` - Build for production
- \`${packageManager} run start\` - Start production build
${useDatabase ? `- \`${packageManager} run db:push\` - Push database schema
- \`${packageManager} run db:studio\` - Open Drizzle Studio` : ''}

## Project Structure

\`\`\`
${projectName}/
├── src/
│   ├── commands/     # Slash commands
│   ├── events/       # Discord events
│   └── index.ts      # Entry point
${useI18n ? '├── locales/         # Translation files' : ''}
├── .env              # Environment variables
└── package.json
\`\`\`

## Learn More

- [Disapp Documentation](https://github.com/dis-app/disapp)
- [Discord.js Guide](https://discordjs.guide/)
- [Discord Developer Portal](https://discord.com/developers/docs)

## License

MIT
`;

  await fs.writeFile(path.join(projectPath, 'README.md'), content);
}
