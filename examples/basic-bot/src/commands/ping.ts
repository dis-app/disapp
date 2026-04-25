import { Command, I18nHelper } from '@disapp/core';
import { SlashCommandBuilder } from 'discord.js';

export default class PingCommand extends Command {
  constructor() {
    super({
      name: 'ping',
      description: 'Bot latency',
      data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Bot latency'),
      execute: async () => {},
    });
  }

  async execute(interaction: any) {
    const userId = interaction.user.id;
    const latency = Math.round(interaction.client.ws.ping);
    
    await interaction.reply(I18nHelper.tUser(userId, 'commands.ping.response', { latency: latency.toString() }));
  }
}
