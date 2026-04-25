import { Command, v2, I18nHelper } from '@disapp/core';
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
      .text(`# 🌍 ${I18nHelper.t('commands.language.title', currentLang)}\n\n${I18nHelper.t('commands.language.current', currentLang)}: ${currentLang === 'en' ? 'English' : 'Türkçe'}`)
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
