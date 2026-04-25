import { Command, OnlyAdmin, I18nHelper } from '@disapp/core';
import { SlashCommandBuilder } from 'discord.js';

export default class BanCommand extends Command {
  constructor() {
    super({
      name: 'ban',
      description: 'Ban a user',
      data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user')
        .addUserOption(option =>
          option.setName('user').setDescription('User to ban').setRequired(true)
        )
        .addStringOption(option =>
          option.setName('reason').setDescription('Ban reason').setRequired(false)
        ) as any,
      middlewares: [OnlyAdmin()],
      execute: async () => {},
    });
  }

  async execute(interaction: any) {
    const userId = interaction.user.id;
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    try {
      await interaction.guild.members.ban(user, { reason });
      const message = `${I18nHelper.tUser(userId, 'commands.ban.success', { user: user.username })}\n${I18nHelper.tUser(userId, 'commands.ban.reason', { reason })}`;
      await interaction.reply(message);
    } catch (error) {
      await interaction.reply(I18nHelper.tUser(userId, 'commands.ban.error', { error: String(error) }));
    }
  }
}
