import { describe, it, expect, vi } from 'vitest';
import { ComponentsV2Builder, v2 } from '../../src/components/ComponentsV2Builder';
import { ButtonStyle, MessageFlags, SeparatorSpacingSize } from 'discord.js';

describe('ComponentsV2Builder', () => {
  describe('constructor', () => {
    it('should create new builder', () => {
      const builder = new ComponentsV2Builder();
      expect(builder).toBeDefined();
    });
  });

  describe('text', () => {
    it('should add text component', () => {
      const builder = new ComponentsV2Builder();
      builder.text('Hello World');
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });

    it('should chunk long text when auto-chunking enabled', () => {
      const builder = new ComponentsV2Builder();
      builder.enableAutoChunking({ maxLength: 50 });
      builder.text('a'.repeat(150));
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });
  });

  describe('separator', () => {
    it('should add separator', () => {
      const builder = new ComponentsV2Builder();
      builder.separator();
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });

    it('should add separator with custom spacing', () => {
      const builder = new ComponentsV2Builder();
      builder.separator(true, SeparatorSpacingSize.Large);
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });
  });

  describe('buttons', () => {
    it('should add buttons', () => {
      const builder = new ComponentsV2Builder();
      builder.buttons(
        { id: 'btn1', label: 'Button 1', style: ButtonStyle.Primary },
        { id: 'btn2', label: 'Button 2', style: ButtonStyle.Secondary }
      );
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });

    it('should add button with onClick handler', () => {
      const builder = new ComponentsV2Builder();
      const onClick = vi.fn();
      
      builder.buttons({
        id: 'btn1',
        label: 'Click me',
        style: ButtonStyle.Primary,
        onClick,
      });
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });

    it('should add link button', () => {
      const builder = new ComponentsV2Builder();
      builder.buttons({
        label: 'Visit',
        style: ButtonStyle.Link,
        url: 'https://example.com',
      });
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });

    it('should add disabled button', () => {
      const builder = new ComponentsV2Builder();
      builder.buttons({
        id: 'btn1',
        label: 'Disabled',
        style: ButtonStyle.Primary,
        disabled: true,
      });
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });

    it('should add button with emoji', () => {
      const builder = new ComponentsV2Builder();
      builder.buttons({
        id: 'btn1',
        label: 'Like',
        style: ButtonStyle.Primary,
        emoji: '👍',
      });
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });
  });

  describe('select', () => {
    it('should add select menu', () => {
      const builder = new ComponentsV2Builder();
      builder.select('select1', 'Choose option', [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
      ]);
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });

    it('should add select with onChange handler', () => {
      const builder = new ComponentsV2Builder();
      const onChange = vi.fn();
      
      builder.select('select1', 'Choose', [
        { label: 'Option 1', value: 'opt1' },
      ], onChange);
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });

    it('should add select with emoji and description', () => {
      const builder = new ComponentsV2Builder();
      builder.select('select1', 'Choose', [
        { label: 'Option 1', value: 'opt1', emoji: '🎯', description: 'First option' },
      ]);
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });
  });

  describe('accentColor', () => {
    it('should set accent color', () => {
      const builder = new ComponentsV2Builder();
      builder.accentColor(0xFF0000);
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
    });
  });

  describe('enableAutoChunking', () => {
    it('should enable auto chunking', () => {
      const builder = new ComponentsV2Builder();
      builder.enableAutoChunking({ maxLength: 100 });
      
      expect(builder).toBeDefined();
    });
  });

  describe('build', () => {
    it('should build with components v2 flag', () => {
      const builder = new ComponentsV2Builder();
      builder.text('Test');
      
      const result = builder.build();
      expect(result.flags).toBe(MessageFlags.IsComponentsV2);
    });

    it('should build complete message', () => {
      const builder = new ComponentsV2Builder();
      builder
        .text('Hello')
        .separator()
        .buttons({ id: 'btn1', label: 'Click', style: ButtonStyle.Primary })
        .accentColor(0x5865F2);
      
      const result = builder.build();
      expect(result.components).toHaveLength(1);
      expect(result.flags).toBe(MessageFlags.IsComponentsV2);
    });
  });
});

describe('v2 helper', () => {
  it('should create new ComponentsV2Builder', () => {
    const builder = v2();
    expect(builder).toBeInstanceOf(ComponentsV2Builder);
  });

  it('should allow chaining', () => {
    const result = v2()
      .text('Test')
      .separator()
      .buttons({ id: 'btn1', label: 'Click', style: ButtonStyle.Primary })
      .build();
    
    expect(result.components).toHaveLength(1);
  });
});
