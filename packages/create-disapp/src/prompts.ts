import prompts from 'prompts';
import chalk from 'chalk';
import fs from 'fs-extra';
import { ProjectConfig } from './types.js';

export async function getProjectConfig(): Promise<ProjectConfig> {
  console.log(chalk.bold.cyan('\n🤖 Create Disapp Bot\n'));
  console.log(chalk.gray('Modern Discord.js framework with 50-90% less code\n'));

  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'Project folder name:',
      initial: 'my-discord-bot',
      validate: (value: string) => {
        if (!value) return 'Project name is required';
        if (!/^[a-z0-9-_]+$/.test(value)) return 'Use lowercase letters, numbers, hyphens, and underscores only';
        if (fs.existsSync(value)) return 'Folder already exists';
        return true;
      },
    },
    {
      type: 'text',
      name: 'botName',
      message: 'Bot name:',
      initial: 'My Bot',
      validate: (value: string) => value ? true : 'Bot name is required',
    },
    {
      type: 'toggle',
      name: 'useDatabase',
      message: 'Include database (Drizzle ORM + Neon PostgreSQL)?',
      initial: false,
      active: 'yes',
      inactive: 'no',
    },
    {
      type: 'toggle',
      name: 'useI18n',
      message: 'Include i18n (multi-language support)?',
      initial: true,
      active: 'yes',
      inactive: 'no',
    },
    {
      type: 'select',
      name: 'packageManager',
      message: 'Package manager:',
      choices: [
        { title: 'pnpm (recommended)', value: 'pnpm' },
        { title: 'npm', value: 'npm' },
        { title: 'yarn', value: 'yarn' },
      ],
      initial: 0,
    },
  ], {
    onCancel: () => {
      console.log(chalk.red('\n✖ Cancelled\n'));
      process.exit(0);
    },
  });

  return response as ProjectConfig;
}
