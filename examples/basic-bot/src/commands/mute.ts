import { Command, OnlyAdmin, I18nHelper } from '@disapp/core';
import { SlashCommandBuilder } from 'discord.js';

export default class MuteCommand extends Command {
  constructor() {
    super({
      name: 'mute',
      description: 'Mute a user',
      data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a user')
        .addUserOption(option =>
          option.setName('user').setDescription('User to mute').setRequired(true)
        )
        .addIntegerOption(option =>
          option.setName('duration').setDescription('Mute duration in seconds').setRequired(false)
        )
        .addStringOption(option =>
          option.setName('reason').setDescription('Mute reason').setRequired(false)
        ) as any,
      middlewares: [OnlyAdmin()],
      execute: async () => {},
    });
  }

  async execute(interaction: any) {
    const userId = interaction.user.id;
    const user = interaction.options.getUser('user');
    const duration = interaction.options.getInteger('duration') || 3600;
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = await interaction.guild.members.fetch(user.id);

    try {
      await member.timeout(duration * 1000, reason);
      const minutes = Math.floor(duration / 60);
      const message = `${I18nHelper.tUser(userId, 'commands.mute.success', { user: user.username, duration: minutes.toString() })}\n${I18nHelper.tUser(userId, 'commands.mute.reason', { reason })}`;
      await interaction.reply(message);
    } catch (error) {
      await interaction.reply(I18nHelper.tUser(userId, 'commands.mute.error', { error: String(error) }));
    }
  }
}
