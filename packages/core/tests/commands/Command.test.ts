import { describe, it, expect, vi } from 'vitest';
import { Command } from '../../src/commands/Command';
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

class TestCommand extends Command {
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply('Test response');
  }
}

describe('Command', () => {
  const commandData = new SlashCommandBuilder()
    .setName('test')
    .setDescription('Test command');

  describe('constructor', () => {
    it('should create command with basic options', () => {
      const command = new TestCommand({
        name: 'test',
        description: 'Test command',
        data: commandData,
      });

      expect(command.name).toBe('test');
      expect(command.description).toBe('Test command');
      expect(command.data).toBe(commandData);
      expect(command.middlewares).toEqual([]);
    });

    it('should create command with cooldown', () => {
      const command = new TestCommand({
        name: 'test',
        description: 'Test command',
        data: commandData,
        cooldown: 5000,
      });

      expect(command.cooldown).toBe(5000);
    });

    it('should create command with middlewares', () => {
      const middleware = vi.fn();
      const command = new TestCommand({
        name: 'test',
        description: 'Test command',
        data: commandData,
        middlewares: [middleware],
      });

      expect(command.middlewares).toHaveLength(1);
      expect(command.middlewares[0]).toBe(middleware);
    });
  });

  describe('use', () => {
    it('should add middleware', () => {
      const command = new TestCommand({
        name: 'test',
        description: 'Test command',
        data: commandData,
      });

      const middleware = vi.fn();
      command.use(middleware);

      expect(command.middlewares).toHaveLength(1);
      expect(command.middlewares[0]).toBe(middleware);
    });

    it('should chain middleware additions', () => {
      const command = new TestCommand({
        name: 'test',
        description: 'Test command',
        data: commandData,
      });

      const middleware1 = vi.fn();
      const middleware2 = vi.fn();
      
      command.use(middleware1).use(middleware2);

      expect(command.middlewares).toHaveLength(2);
    });
  });

  describe('execute', () => {
    it('should be implemented by subclass', async () => {
      const command = new TestCommand({
        name: 'test',
        description: 'Test command',
        data: commandData,
      });

      const mockInteraction = {
        reply: vi.fn().mockResolvedValue(undefined),
      } as any;

      await command.execute(mockInteraction);
      expect(mockInteraction.reply).toHaveBeenCalledWith('Test response');
    });
  });
});
