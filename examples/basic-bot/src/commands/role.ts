import { Command, OnlyAdmin, I18nHelper } from '@disapp/core';
import { SlashCommandBuilder } from 'discord.js';

export default class RoleCommand extends Command {
  constructor() {
    super({
      name: 'role',
      description: 'Give or remove role from user',
      data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Give or remove role from user')
        .addUserOption(option =>
          option.setName('user').setDescription('User to give role').setRequired(true)
        )
        .addRoleOption(option =>
          option.setName('role').setDescription('Role to give').setRequired(true)
        )
        .addStringOption(option =>
          option.setName('action').setDescription('Give or remove role')
            .setRequired(true)
            .addChoices(
              { name: 'Give', value: 'give' },
              { name: 'Remove', value: 'remove' }
            )
        ) as any,
      middlewares: [OnlyAdmin()],
      execute: async () => {},
    });
  }

  async execute(interaction: any) {
    const userId = interaction.user.id;
    const user = interaction.options.getUser('user');
    const role = interaction.options.getRole('role');
    const action = interaction.options.getString('action');
    const member = await interaction.guild.members.fetch(user.id);

    try {
      if (action === 'give') {
        await member.roles.add(role);
        await interaction.reply(I18nHelper.tUser(userId, 'commands.role.given', { role: role.name, user: user.username }));
      } else {
        await member.roles.remove(role);
        await interaction.reply(I18nHelper.tUser(userId, 'commands.role.removed', { role: role.name, user: user.username }));
      }
    } catch (error) {
      await interaction.reply(I18nHelper.tUser(userId, 'commands.role.error', { error: String(error) }));
    }
  }
}
