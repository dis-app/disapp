import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InteractionHandler } from '../../src/components/InteractionHandler';

describe('InteractionHandler', () => {
  beforeEach(() => {
    InteractionHandler.clear();
  });

  describe('registerHandlers', () => {
    it('should register button handlers', () => {
      const handler = vi.fn();
      InteractionHandler.registerHandlers({
        buttons: {
          'test-button': handler
        }
      });

      const stats = InteractionHandler.getStats();
      expect(stats.buttonHandlers).toBe(1);
    });

    it('should register select handlers', () => {
      const handler = vi.fn();
      InteractionHandler.registerHandlers({
        selects: {
          'test-select': handler
        }
      });

      const stats = InteractionHandler.getStats();
      expect(stats.selectHandlers).toBe(1);
    });

    it('should register modal handlers', () => {
      const handler = vi.fn();
      InteractionHandler.registerHandlers({
        modals: {
          'test-modal': handler
        }
      });

      const stats = InteractionHandler.getStats();
      expect(stats.modalHandlers).toBe(1);
    });

    it('should register multiple handlers at once', () => {
      InteractionHandler.registerHandlers({
        buttons: {
          'btn1': vi.fn(),
          'btn2': vi.fn()
        },
        selects: {
          'select1': vi.fn()
        }
      });

      const stats = InteractionHandler.getStats();
      expect(stats.buttonHandlers).toBe(2);
      expect(stats.selectHandlers).toBe(1);
    });
  });

  describe('handle', () => {
    it('should handle button interaction', async () => {
      const handler = vi.fn();
      InteractionHandler.registerHandlers({
        buttons: {
          'test-button': handler
        }
      });

      const interaction = {
        customId: 'test-button',
        isButton: () => true,
        isStringSelectMenu: () => false,
        isModalSubmit: () => false
      };

      const result = await InteractionHandler.handle(interaction as any);
      expect(result).toBe(true);
      expect(handler).toHaveBeenCalledWith(interaction);
    });

    it('should handle select menu interaction', async () => {
      const handler = vi.fn();
      InteractionHandler.registerHandlers({
        selects: {
          'test-select': handler
        }
      });

      const interaction = {
        customId: 'test-select',
        isButton: () => false,
        isStringSelectMenu: () => true,
        isModalSubmit: () => false
      };

      const result = await InteractionHandler.handle(interaction as any);
      expect(result).toBe(true);
      expect(handler).toHaveBeenCalledWith(interaction);
    });

    it('should handle modal interaction', async () => {
      const handler = vi.fn();
      InteractionHandler.registerHandlers({
        modals: {
          'test-modal': handler
        }
      });

      const interaction = {
        customId: 'test-modal',
        isButton: () => false,
        isStringSelectMenu: () => false,
        isModalSubmit: () => true
      };

      const result = await InteractionHandler.handle(interaction as any);
      expect(result).toBe(true);
      expect(handler).toHaveBeenCalledWith(interaction);
    });

    it('should return false for unhandled interaction', async () => {
      const interaction = {
        customId: 'unknown',
        isButton: () => true,
        isStringSelectMenu: () => false,
        isModalSubmit: () => false
      };

      const result = await InteractionHandler.handle(interaction as any);
      expect(result).toBe(false);
    });

    it('should throw error if handler throws', async () => {
      const handler = vi.fn().mockRejectedValue(new Error('Handler error'));
      InteractionHandler.registerHandlers({
        buttons: {
          'test-button': handler
        }
      });

      const interaction = {
        customId: 'test-button',
        isButton: () => true,
        isStringSelectMenu: () => false,
        isModalSubmit: () => false
      };

      await expect(InteractionHandler.handle(interaction as any)).rejects.toThrow('Handler error');
    });
  });

  describe('clear', () => {
    it('should clear all handlers', () => {
      InteractionHandler.registerHandlers({
        buttons: { 'btn1': vi.fn() },
        selects: { 'select1': vi.fn() },
        modals: { 'modal1': vi.fn() }
      });

      InteractionHandler.clear();

      const stats = InteractionHandler.getStats();
      expect(stats.buttonHandlers).toBe(0);
      expect(stats.selectHandlers).toBe(0);
      expect(stats.modalHandlers).toBe(0);
    });
  });

  describe('getStats', () => {
    it('should return correct stats', () => {
      InteractionHandler.registerHandlers({
        buttons: { 'btn1': vi.fn(), 'btn2': vi.fn() },
        selects: { 'select1': vi.fn() }
      });

      const stats = InteractionHandler.getStats();
      expect(stats.buttonHandlers).toBe(2);
      expect(stats.selectHandlers).toBe(1);
      expect(stats.modalHandlers).toBe(0);
    });
  });
});
