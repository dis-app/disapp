import { describe, it, expect, vi } from 'vitest';
import { 
  OnlyAdmin, 
  RequirePermission, 
  Cooldown, 
  RequireGuild,
  OwnerOnly,
  RateLimit
} from '../../src/middleware/CommandMiddleware';
import { PermissionFlagsBits } from 'discord.js';

describe('CommandMiddleware', () => {
  describe('OnlyAdmin', () => {
    it('should allow admin users', async () => {
      const middleware = OnlyAdmin();
      const ctx = {
        interaction: {
          member: {
            permissions: {
              has: vi.fn().mockReturnValue(true)
            }
          },
          reply: vi.fn()
        },
        command: {},
        next: vi.fn()
      };

      const result = await middleware(ctx as any);
      expect(result).toBe(true);
      expect(ctx.interaction.reply).not.toHaveBeenCalled();
    });

    it('should deny non-admin users', async () => {
      const middleware = OnlyAdmin();
      const ctx = {
        interaction: {
          member: {
            permissions: {
              has: vi.fn().mockReturnValue(false)
            }
          },
          reply: vi.fn()
        },
        command: {},
        next: vi.fn()
      };

      const result = await middleware(ctx as any);
      expect(result).toBe(false);
      expect(ctx.interaction.reply).toHaveBeenCalled();
    });
  });

  describe('RequirePermission', () => {
    it('should allow users with permission', async () => {
      const middleware = RequirePermission(PermissionFlagsBits.ManageMessages);
      const ctx = {
        interaction: {
          member: {
            permissions: {
              has: vi.fn().mockReturnValue(true)
            }
          },
          reply: vi.fn()
        },
        command: {},
        next: vi.fn()
      };

      const result = await middleware(ctx as any);
      expect(result).toBe(true);
    });

    it('should deny users without permission', async () => {
      const middleware = RequirePermission(PermissionFlagsBits.ManageMessages);
      const ctx = {
        interaction: {
          member: {
            permissions: {
              has: vi.fn().mockReturnValue(false)
            }
          },
          reply: vi.fn()
        },
        command: {},
        next: vi.fn()
      };

      const result = await middleware(ctx as any);
      expect(result).toBe(false);
      expect(ctx.interaction.reply).toHaveBeenCalled();
    });
  });

  describe('Cooldown', () => {
    it('should allow first execution', async () => {
      const middleware = Cooldown(5000);
      const ctx = {
        interaction: {
          user: { id: 'user123' },
          reply: vi.fn()
        },
        command: { name: 'test' },
        next: vi.fn()
      };

      const result = await middleware(ctx as any);
      expect(result).toBe(true);
    });

    it('should deny execution during cooldown', async () => {
      const middleware = Cooldown(5000);
      const ctx = {
        interaction: {
          user: { id: 'user123' },
          reply: vi.fn()
        },
        command: { name: 'test' },
        next: vi.fn()
      };

      await middleware(ctx as any);
      const result = await middleware(ctx as any);
      
      expect(result).toBe(false);
      expect(ctx.interaction.reply).toHaveBeenCalled();
    });
  });

  describe('RequireGuild', () => {
    it('should allow guild commands', async () => {
      const middleware = RequireGuild();
      const ctx = {
        interaction: {
          guild: { id: 'guild123' },
          reply: vi.fn()
        },
        command: {},
        next: vi.fn()
      };

      const result = await middleware(ctx as any);
      expect(result).toBe(true);
    });

    it('should deny DM commands', async () => {
      const middleware = RequireGuild();
      const ctx = {
        interaction: {
          guild: null,
          reply: vi.fn()
        },
        command: {},
        next: vi.fn()
      };

      const result = await middleware(ctx as any);
      expect(result).toBe(false);
      expect(ctx.interaction.reply).toHaveBeenCalled();
    });
  });

  describe('OwnerOnly', () => {
    it('should allow owner', async () => {
      const middleware = OwnerOnly('owner123');
      const ctx = {
        interaction: {
          user: { id: 'owner123' },
          reply: vi.fn()
        },
        command: {},
        next: vi.fn()
      };

      const result = await middleware(ctx as any);
      expect(result).toBe(true);
    });

    it('should deny non-owner', async () => {
      const middleware = OwnerOnly('owner123');
      const ctx = {
        interaction: {
          user: { id: 'user456' },
          reply: vi.fn()
        },
        command: {},
        next: vi.fn()
      };

      const result = await middleware(ctx as any);
      expect(result).toBe(false);
      expect(ctx.interaction.reply).toHaveBeenCalled();
    });
  });

  describe('RateLimit', () => {
    it('should allow within rate limit', async () => {
      const middleware = RateLimit(3, 10000);
      const ctx = {
        interaction: {
          user: { id: 'user123' },
          reply: vi.fn()
        },
        command: { name: 'test' },
        next: vi.fn()
      };

      const result1 = await middleware(ctx as any);
      const result2 = await middleware(ctx as any);
      const result3 = await middleware(ctx as any);
      
      expect(result1).toBe(true);
      expect(result2).toBe(true);
      expect(result3).toBe(true);
    });

    it('should deny when rate limit exceeded', async () => {
      const middleware = RateLimit(2, 10000);
      const ctx = {
        interaction: {
          user: { id: 'user123' },
          reply: vi.fn()
        },
        command: { name: 'test' },
        next: vi.fn()
      };

      await middleware(ctx as any);
      await middleware(ctx as any);
      const result = await middleware(ctx as any);
      
      expect(result).toBe(false);
      expect(ctx.interaction.reply).toHaveBeenCalled();
    });
  });
});
