import { Command, OnlyAdmin, I18nHelper } from '@disapp/core';
import { SlashCommandBuilder } from 'discord.js';

export default class KickCommand extends Command {
  constructor() {
    super({
      name: 'kick',
      description: 'Kick a user',
      data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user')
        .addUserOption(option =>
          option.setName('user').setDescription('User to kick').setRequired(true)
        )
        .addStringOption(option =>
          option.setName('reason').setDescription('Kick reason').setRequired(false)
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
      await interaction.guild.members.kick(user, reason);
      const message = `${I18nHelper.tUser(userId, 'commands.kick.success', { user: user.username })}\n${I18nHelper.tUser(userId, 'commands.kick.reason', { reason })}`;
      await interaction.reply(message);
    } catch (error) {
      await interaction.reply(I18nHelper.tUser(userId, 'commands.kick.error', { error: String(error) }));
    }
  }
}
