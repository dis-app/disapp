import fs from 'fs-extra';
import path from 'path';
import { TemplateOptions } from '../types.js';

export async function generateIndexFile(options: TemplateOptions) {
  const { projectPath, config } = options;
  const { useDatabase, useI18n } = config;

  const content = `import 'dotenv/config';
import { DisappClient${useI18n ? ', I18n' : ''}${useDatabase ? ', initializeDatabase' : ''} } from '@disapp/core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

${useI18n ? `const i18n = I18n.getInstance();
i18n.loadLocales(path.join(__dirname, '../locales'));

` : ''}const client = new DisappClient({
  config: {
    token: process.env.DISCORD_TOKEN!,
    clientId: process.env.CLIENT_ID!,
    guildId: process.env.GUILD_ID,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    ${useDatabase ? `database: process.env.DATABASE_URL ? {
      url: process.env.DATABASE_URL
    } : undefined,` : ''}
  }
});

await client.start();
`;

  await fs.writeFile(path.join(projectPath, 'src/index.ts'), content);
}
