import { describe, it, expect, vi } from 'vitest';
import { MessageBuilder, EmbedBuilder } from '../../src/components/MessageBuilder';
import { ButtonStyle } from 'discord.js';

describe('MessageBuilder', () => {
  describe('setContent', () => {
    it('should set message content', () => {
      const builder = new MessageBuilder();
      builder.setContent('Test message');
      
      const result = builder.build();
      expect(result.content).toBe('Test message');
    });
  });

  describe('addEmbed', () => {
    it('should add embed to message', () => {
      const builder = new MessageBuilder();
      const embed = new EmbedBuilder().setTitle('Test');
      
      builder.addEmbed(embed);
      const result = builder.build();
      
      expect(result.embeds).toHaveLength(1);
    });
  });

  describe('button', () => {
    it('should add single button', () => {
      const builder = new MessageBuilder();
      builder.button('Click me', 'btn_1');
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });

    it('should add button with custom style', () => {
      const builder = new MessageBuilder();
      builder.button('Danger', 'btn_danger', ButtonStyle.Danger);
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });
  });

  describe('buttons', () => {
    it('should add multiple buttons', () => {
      const builder = new MessageBuilder();
      builder.buttons(
        { label: 'Button 1', id: 'btn_1' },
        { label: 'Button 2', id: 'btn_2' }
      );
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });

    it('should add link button', () => {
      const builder = new MessageBuilder();
      builder.buttons(
        { label: 'Visit', id: 'btn_1', url: 'https://example.com' }
      );
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });

    it('should add button with emoji', () => {
      const builder = new MessageBuilder();
      builder.buttons(
        { label: 'Like', id: 'btn_like', emoji: '👍' }
      );
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });
  });

  describe('linkButton', () => {
    it('should add link button', () => {
      const builder = new MessageBuilder();
      builder.linkButton('Visit', 'https://example.com');
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });

    it('should add link button with emoji', () => {
      const builder = new MessageBuilder();
      builder.linkButton('Visit', 'https://example.com', '🔗');
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });
  });

  describe('userSelect', () => {
    it('should add user select menu', () => {
      const builder = new MessageBuilder();
      builder.userSelect('user_select');
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });

    it('should add user select with placeholder', () => {
      const builder = new MessageBuilder();
      builder.userSelect('user_select', 'Select a user');
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });

    it('should add user select with min/max values', () => {
      const builder = new MessageBuilder();
      builder.userSelect('user_select', 'Select users', [1, 5]);
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });
  });

  describe('roleSelect', () => {
    it('should add role select menu', () => {
      const builder = new MessageBuilder();
      builder.roleSelect('role_select');
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });
  });

  describe('channelSelect', () => {
    it('should add channel select menu', () => {
      const builder = new MessageBuilder();
      builder.channelSelect('channel_select');
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });
  });

  describe('stringSelect', () => {
    it('should add string select menu', () => {
      const builder = new MessageBuilder();
      builder.stringSelect('string_select', [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
      ]);
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });

    it('should add string select with descriptions', () => {
      const builder = new MessageBuilder();
      builder.stringSelect('string_select', [
        { label: 'Option 1', value: 'opt1', description: 'First option' },
      ]);
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });
  });

  describe('setEphemeral', () => {
    it('should set ephemeral flag', () => {
      const builder = new MessageBuilder();
      builder.setContent('Secret').setEphemeral();
      
      const result = builder.build();
      expect(result.flags).toBe(64);
    });

    it('should allow disabling ephemeral', () => {
      const builder = new MessageBuilder();
      builder.setContent('Public').setEphemeral(false);
      
      const result = builder.build();
      expect(result.flags).toBeUndefined();
    });
  });

  describe('enableChunking', () => {
    it('should enable chunking', () => {
      const builder = new MessageBuilder();
      builder.enableChunking({ maxLength: 100 });
      builder.setContent('a'.repeat(200));
      
      const result = builder.build();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should not chunk short content', () => {
      const builder = new MessageBuilder();
      builder.enableChunking();
      builder.setContent('Short message');
      
      const result = builder.build();
      expect(Array.isArray(result)).toBe(false);
    });
  });

  describe('disableChunking', () => {
    it('should disable chunking', () => {
      const builder = new MessageBuilder();
      builder.enableChunking().disableChunking();
      builder.setContent('a'.repeat(3000));
      
      const result = builder.build();
      expect(Array.isArray(result)).toBe(false);
    });
  });

  describe('build', () => {
    it('should build complete message', () => {
      const builder = new MessageBuilder();
      const embed = new EmbedBuilder().setTitle('Test');
      
      builder
        .setContent('Test message')
        .addEmbed(embed)
        .button('Click', 'btn_1')
        .setEphemeral();
      
      const result = builder.build();
      
      expect(result.content).toBe('Test message');
      expect(result.embeds).toHaveLength(1);
      expect(result.components).toHaveLength(1);
      expect(result.flags).toBe(64);
    });
  });
});

describe('EmbedBuilder', () => {
  describe('quick', () => {
    it('should create quick embed', () => {
      const embed = new EmbedBuilder().quick('Title', 'Description');
      expect(embed.data.title).toBe('Title');
      expect(embed.data.description).toBe('Description');
    });

    it('should create quick embed with color', () => {
      const embed = new EmbedBuilder().quick('Title', 'Description', 0xFF0000);
      expect(embed.data.color).toBe(0xFF0000);
    });
  });

  describe('success', () => {
    it('should create success embed', () => {
      const embed = new EmbedBuilder().success('Success', 'Operation completed');
      expect(embed.data.title).toBe('Success');
      expect(embed.data.color).toBe(0x57F287);
    });
  });

  describe('error', () => {
    it('should create error embed', () => {
      const embed = new EmbedBuilder().error('Error', 'Something went wrong');
      expect(embed.data.title).toBe('Error');
      expect(embed.data.color).toBe(0xED4245);
    });
  });

  describe('warning', () => {
    it('should create warning embed', () => {
      const embed = new EmbedBuilder().warning('Warning', 'Be careful');
      expect(embed.data.title).toBe('Warning');
      expect(embed.data.color).toBe(0xFEE75C);
    });
  });

  describe('info', () => {
    it('should create info embed', () => {
      const embed = new EmbedBuilder().info('Info', 'Information');
      expect(embed.data.title).toBe('Info');
      expect(embed.data.color).toBe(0x5865F2);
    });
  });
});
