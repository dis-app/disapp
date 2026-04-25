import { Event, CommandMiddleware } from '@disapp/core';
import { Events, Interaction } from 'discord.js';
import { DisappClient } from '@disapp/core';

export default class InteractionCreateEvent extends Event {
  constructor() {
    super({
      name: Events.InteractionCreate,
      once: false,
      execute: async () => {},
    });
  }

  async execute(interaction: Interaction): Promise<void> {
    if (interaction.isChatInputCommand()) {
      const client = interaction.client as DisappClient;
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        return;
      }

      try {
        if (command.middlewares && command.middlewares.length > 0) {
          const canExecute = await CommandMiddleware.execute(command.name, interaction, command);
          if (!canExecute) {
            return;
          }
        }

        await command.execute(interaction);
        client.logger.info(`${interaction.user.tag} used /${command.name}`);
      } catch (error) {
        client.logger.error(`Error executing command:`, error as Error);
        
        const errorMessage = {
          content: '❌ An error occurred while executing this command!',
          flags: 64,
        };

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(errorMessage);
        } else {
          await interaction.reply(errorMessage);
        }
      }
    }
  }
}

