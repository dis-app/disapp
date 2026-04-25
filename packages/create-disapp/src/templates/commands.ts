import fs from 'fs-extra';
import path from 'path';
import { TemplateOptions } from '../types.js';

export async function generatePingCommand(options: TemplateOptions) {
  const { projectPath, config } = options;
  const { useI18n } = config;

  const content = `import { Command${useI18n ? ', I18nHelper' : ''} } from '@disapp/core';
import { SlashCommandBuilder } from 'discord.js';

export default class PingCommand extends Command {
  constructor() {
    super({
      name: 'ping',
      description: 'Check bot latency',
      data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check bot latency'),
      execute: async () => {},
    });
  }

  async execute(interaction: any) {
    ${useI18n ? 'const userId = interaction.user.id;' : ''}
    const latency = Math.round(interaction.client.ws.ping);
    
    await interaction.reply(${useI18n ? `I18nHelper.tUser(userId, 'commands.ping.response', { latency: latency.toString() })` : '`🏓 Pong! ${latency}ms`'});
  }
}
`;

  await fs.writeFile(path.join(projectPath, 'src/commands/ping.ts'), content);
}

export async function generateHelpCommand(options: TemplateOptions) {
  const { projectPath, config } = options;
  const { useI18n } = config;

  const content = `import { Command, v2${useI18n ? ', I18nHelper' : ''} } from '@disapp/core';
import { SlashCommandBuilder, ButtonStyle } from 'discord.js';

export default class HelpCommand extends Command {
  constructor() {
    super({
      name: 'help',
      description: 'Show help menu',
      data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show help menu'),
      execute: async () => {},
    });
  }

  async execute(interaction: any) {
    ${useI18n ? `const userId = interaction.user.id;
    const lang = I18nHelper.getUserLanguage(userId);
    const t = (key: string, params?: Record<string, any>) => I18nHelper.t(key, lang, params);

    const message = v2()
      .text(\`# \${t('commands.help.title')}\\n\\n\${t('commands.help.commands')}\`)
      .separator()
      .text(\`### 🏓 /ping - \${t('commands.ping.description')}\`)
      .text(\`### 📖 /help - \${t('commands.help.description')}\`)
      .separator(false)
      .text('-# Use slash commands to interact with the bot')
      .build();` : `const message = v2()
      .text('# 📚 Help Menu\\n\\nAvailable commands for this bot')
      .separator()
      .text('### 🏓 /ping - Check bot latency')
      .text('### 📖 /help - Show this help menu')
      .separator(false)
      .text('-# Use slash commands to interact with the bot')
      .build();`}

    await interaction.reply(message);
  }
}
`;

  await fs.writeFile(path.join(projectPath, 'src/commands/help.ts'), content);
}

export async function generateLanguageCommand(options: TemplateOptions) {
  const { projectPath } = options;

  const content = `import { Command, v2, I18nHelper } from '@disapp/core';
import { SlashCommandBuilder, ButtonStyle } from 'discord.js';

export default class LanguageCommand extends Command {
  constructor() {
    super({
      name: 'language',
      description: 'Change bot language',
      data: new SlashCommandBuilder()
        .setName('language')
        .setDescription('Change bot language'),
      execute: async () => {},
    });
  }

  async execute(interaction: any) {
    const userId = interaction.user.id;
    const currentLang = I18nHelper.getUserLanguage(userId);
    
    const message = v2()
      .text(\`# 🌍 \${I18nHelper.t('commands.language.title', currentLang)}\\n\\n\${I18nHelper.t('commands.language.current', currentLang)}: \${currentLang === 'en' ? 'English' : 'Türkçe'}\`)
      .separator()
      .buttons(
        {
          id: 'lang_en',
          label: 'English',
          style: ButtonStyle.Success,
          onClick: async (i) => {
            I18nHelper.setUserLanguage(i.user.id, 'en');
            await i.reply({ 
              content: I18nHelper.t('commands.language.success', 'en', { language: 'English' }), 
              flags: 64 
            });
          }
        },
        {
          id: 'lang_tr',
          label: 'Türkçe',
          style: ButtonStyle.Secondary,
          onClick: async (i) => {
            I18nHelper.setUserLanguage(i.user.id, 'tr');
            await i.reply({ 
              content: I18nHelper.t('commands.language.success', 'tr', { language: 'Türkçe' }), 
              flags: 64 
            });
          }
        }
      )
      .build();

    await interaction.reply(message);
  }
}
`;

  await fs.writeFile(path.join(projectPath, 'src/commands/language.ts'), content);
}
