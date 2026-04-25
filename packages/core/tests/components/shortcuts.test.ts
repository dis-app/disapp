import { describe, it, expect } from 'vitest';
import {
  msg,
  embed,
  interaction,
  btn,
  linkBtn,
  row,
  success,
  danger,
  primary,
  secondary,
  confirm,
  yesno,
  successEmbed,
  errorEmbed,
  warningEmbed,
  infoEmbed,
} from '../../src/components/shortcuts';
import { ButtonStyle } from 'discord.js';

describe('shortcuts', () => {
  describe('msg', () => {
    it('should create MessageBuilder', () => {
      const builder = msg();
      expect(builder).toBeDefined();
    });
  });

  describe('embed', () => {
    it('should create EmbedBuilder', () => {
      const builder = embed();
      expect(builder).toBeDefined();
    });
  });

  describe('interaction', () => {
    it('should create InteractionBuilder', () => {
      const builder = interaction();
      expect(builder).toBeDefined();
    });
  });

  describe('btn', () => {
    it('should create button with default style', () => {
      const button = btn('Test', 'test_id');
      expect(button.data.label).toBe('Test');
      expect(button.data.custom_id).toBe('test_id');
      expect(button.data.style).toBe(ButtonStyle.Primary);
    });

    it('should create button with custom style', () => {
      const button = btn('Test', 'test_id', ButtonStyle.Danger);
      expect(button.data.style).toBe(ButtonStyle.Danger);
    });
  });

  describe('linkBtn', () => {
    it('should create link button', () => {
      const button = linkBtn('Visit', 'https://example.com');
      expect(button.data.label).toBe('Visit');
      expect(button.data.url).toBe('https://example.com');
      expect(button.data.style).toBe(ButtonStyle.Link);
    });

    it('should create link button with emoji', () => {
      const button = linkBtn('Visit', 'https://example.com', '🔗');
      expect(button.data.emoji).toBeDefined();
    });
  });

  describe('row', () => {
    it('should create action row with components', () => {
      const button1 = btn('Button 1', 'btn1');
      const button2 = btn('Button 2', 'btn2');
      const actionRow = row(button1, button2);
      
      expect(actionRow.components).toHaveLength(2);
    });
  });

  describe('success', () => {
    it('should create success button', () => {
      const button = success('Confirm', 'confirm_id');
      expect(button.data.style).toBe(ButtonStyle.Success);
    });
  });

  describe('danger', () => {
    it('should create danger button', () => {
      const button = danger('Delete', 'delete_id');
      expect(button.data.style).toBe(ButtonStyle.Danger);
    });
  });

  describe('primary', () => {
    it('should create primary button', () => {
      const button = primary('Primary', 'primary_id');
      expect(button.data.style).toBe(ButtonStyle.Primary);
    });
  });

  describe('secondary', () => {
    it('should create secondary button', () => {
      const button = secondary('Secondary', 'secondary_id');
      expect(button.data.style).toBe(ButtonStyle.Secondary);
    });
  });

  describe('confirm', () => {
    it('should create confirm/cancel row', () => {
      const actionRow = confirm('yes_id', 'no_id');
      expect(actionRow.components).toHaveLength(2);
    });
  });

  describe('yesno', () => {
    it('should create yes/no row', () => {
      const actionRow = yesno('yes_id', 'no_id');
      expect(actionRow.components).toHaveLength(2);
    });
  });

  describe('successEmbed', () => {
    it('should create success embed', () => {
      const embedBuilder = successEmbed('Success', 'Operation completed');
      expect(embedBuilder.data.title).toBe('Success');
      expect(embedBuilder.data.description).toBe('Operation completed');
      expect(embedBuilder.data.color).toBe(0x57F287);
    });
  });

  describe('errorEmbed', () => {
    it('should create error embed', () => {
      const embedBuilder = errorEmbed('Error', 'Something went wrong');
      expect(embedBuilder.data.title).toBe('Error');
      expect(embedBuilder.data.color).toBe(0xED4245);
    });
  });

  describe('warningEmbed', () => {
    it('should create warning embed', () => {
      const embedBuilder = warningEmbed('Warning', 'Be careful');
      expect(embedBuilder.data.title).toBe('Warning');
      expect(embedBuilder.data.color).toBe(0xFEE75C);
    });
  });

  describe('infoEmbed', () => {
    it('should create info embed', () => {
      const embedBuilder = infoEmbed('Info', 'Information');
      expect(embedBuilder.data.title).toBe('Info');
      expect(embedBuilder.data.color).toBe(0x5865F2);
    });
  });
});
