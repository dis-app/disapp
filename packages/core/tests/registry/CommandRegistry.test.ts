import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CommandRegistry } from '../../src/registry/CommandRegistry';
import { Command } from '../../src/commands/Command';
import { Logger } from '../../src/utils/Logger';
import { SlashCommandBuilder } from 'discord.js';

class TestCommand extends Command {
  async execute(): Promise<void> {
    return Promise.resolve();
  }
}

describe('CommandRegistry', () => {
  let registry: CommandRegistry;
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger({ level: 'error' });
    registry = new CommandRegistry('fake_token', 'fake_client_id', undefined, logger);
  });

  describe('register', () => {
    it('should register a command', () => {
      const command = new TestCommand({
        name: 'test',
        description: 'Test command',
        data: new SlashCommandBuilder().setName('test').setDescription('Test'),
      });

      registry.register(command);
      expect(registry.get('test')).toBe(command);
    });

    it('should replace existing command', () => {
      const command1 = new TestCommand({
        name: 'test',
        description: 'Test 1',
        data: new SlashCommandBuilder().setName('test').setDescription('Test 1'),
      });

      const command2 = new TestCommand({
        name: 'test',
        description: 'Test 2',
        data: new SlashCommandBuilder().setName('test').setDescription('Test 2'),
      });

      registry.register(command1);
      registry.register(command2);
      
      expect(registry.get('test')).toBe(command2);
    });
  });

  describe('unregister', () => {
    it('should unregister a command', () => {
      const command = new TestCommand({
        name: 'test',
        description: 'Test',
        data: new SlashCommandBuilder().setName('test').setDescription('Test'),
      });

      registry.register(command);
      const result = registry.unregister('test');
      
      expect(result).toBe(true);
      expect(registry.get('test')).toBeUndefined();
    });

    it('should return false for non-existent command', () => {
      const result = registry.unregister('nonexistent');
      expect(result).toBe(false);
    });
  });

  describe('get', () => {
    it('should get registered command', () => {
      const command = new TestCommand({
        name: 'test',
        description: 'Test',
        data: new SlashCommandBuilder().setName('test').setDescription('Test'),
      });

      registry.register(command);
      expect(registry.get('test')).toBe(command);
    });

    it('should return undefined for non-existent command', () => {
      expect(registry.get('nonexistent')).toBeUndefined();
    });
  });

  describe('getAll', () => {
    it('should return all commands', () => {
      const command1 = new TestCommand({
        name: 'test1',
        description: 'Test 1',
        data: new SlashCommandBuilder().setName('test1').setDescription('Test 1'),
      });

      const command2 = new TestCommand({
        name: 'test2',
        description: 'Test 2',
        data: new SlashCommandBuilder().setName('test2').setDescription('Test 2'),
      });

      registry.register(command1);
      registry.register(command2);

      const all = registry.getAll();
      expect(all.size).toBe(2);
      expect(all.has('test1')).toBe(true);
      expect(all.has('test2')).toBe(true);
    });
  });

  describe('clear', () => {
    it('should clear all commands', () => {
      const command = new TestCommand({
        name: 'test',
        description: 'Test',
        data: new SlashCommandBuilder().setName('test').setDescription('Test'),
      });

      registry.register(command);
      registry.clear();
      
      expect(registry.getAll().size).toBe(0);
    });
  });

  describe('getStats', () => {
    it('should return registry stats', () => {
      const command1 = new TestCommand({
        name: 'test1',
        description: 'Test 1',
        data: new SlashCommandBuilder().setName('test1').setDescription('Test 1'),
      });

      const command2 = new TestCommand({
        name: 'test2',
        description: 'Test 2',
        data: new SlashCommandBuilder().setName('test2').setDescription('Test 2'),
      });

      registry.register(command1);
      registry.register(command2);

      const stats = registry.getStats();
      expect(stats.totalCommands).toBe(2);
      expect(stats.commandNames).toContain('test1');
      expect(stats.commandNames).toContain('test2');
    });
  });
});
