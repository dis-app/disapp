import { Command, v2, I18nHelper } from '@disapp/core';
import { SlashCommandBuilder } from 'discord.js';

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
    const userId = interaction.user.id;
    const lang = I18nHelper.getUserLanguage(userId);
    const t = (key: string, params?: Record<string, any>) => I18nHelper.t(key, lang, params);

    const message = v2()
      .text(`# ${t('commands.help.title')}\n\n${t('commands.help.commands')}`)
      .separator()
      .text(`### ${t('commands.help.general')}\n• \`/ping\` - ${t('commands.ping.description')}\n• \`/help\` - ${t('commands.help.description')}\n• \`/language\` - ${t('commands.language.description')}`)
      .separator()
      .text(`### ${t('commands.help.moderation')}\n• \`/ban\` - ${t('commands.ban.description')}\n• \`/kick\` - ${t('commands.kick.description')}\n• \`/mute\` - ${t('commands.mute.description')}\n• \`/role\` - ${t('commands.role.description')}`)
      .separator()
      .text('-# Use slash commands to interact with the bot')
      .build();

    await interaction.reply(message);
  }
}
