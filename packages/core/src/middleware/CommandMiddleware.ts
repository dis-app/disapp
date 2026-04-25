import { PermissionFlagsBits } from 'discord.js';

export interface MiddlewareContext {
  interaction: any;
  command: any;
  next: () => Promise<void>;
}

export type MiddlewareFunction = (ctx: MiddlewareContext) => Promise<boolean | void>;

export class CommandMiddleware {
  private static middlewares = new Map<string, MiddlewareFunction[]>();
  private static globalMiddlewares: MiddlewareFunction[] = [];

  static register(commandName: string, middleware: MiddlewareFunction) {
    if (!this.middlewares.has(commandName)) {
      this.middlewares.set(commandName, []);
    }
    this.middlewares.get(commandName)!.push(middleware);
  }

  static registerGlobal(middleware: MiddlewareFunction) {
    this.globalMiddlewares.push(middleware);
  }

  static async execute(commandName: string, interaction: any, command: any): Promise<boolean> {
    const middlewares = [
      ...this.globalMiddlewares,
      ...(this.middlewares.get(commandName) || []),
    ];

    for (const middleware of middlewares) {
      let nextCalled = false;
      
      const ctx: MiddlewareContext = {
        interaction,
        command,
        next: async () => {
          nextCalled = true;
        },
      };

      const result = await middleware(ctx);
      
      if (result === false) {
        return false;
      }
      
      if (!nextCalled && result !== true) {
        return false;
      }
    }

    return true;
  }
}

export function OnlyAdmin(): MiddlewareFunction {
  return async (ctx) => {
    const member = ctx.interaction.member;
    
    if (!member?.permissions?.has(PermissionFlagsBits.Administrator)) {
      await ctx.interaction.reply({
        content: '❌ This command requires Administrator permission!',
        flags: 64,
      });
      return false;
    }
    
    return true;
  };
}

export function RequirePermission(permission: bigint): MiddlewareFunction {
  return async (ctx) => {
    const member = ctx.interaction.member;
    
    if (!member?.permissions?.has(permission)) {
      await ctx.interaction.reply({
        content: `❌ You don't have the required permission!`,
        flags: 64,
      });
      return false;
    }
    
    return true;
  };
}

export function Cooldown(ms: number): MiddlewareFunction {
  const cooldowns = new Map<string, number>();
  
  return async (ctx) => {
    const userId = ctx.interaction.user.id;
    const key = `${ctx.command.name}:${userId}`;
    const now = Date.now();
    const cooldownEnd = cooldowns.get(key);
    
    if (cooldownEnd && now < cooldownEnd) {
      const remaining = Math.ceil((cooldownEnd - now) / 1000);
      await ctx.interaction.reply({
        content: `⏱️ Please wait ${remaining}s before using this command again!`,
        flags: 64,
      });
      return false;
    }
    
    cooldowns.set(key, now + ms);
    
    setTimeout(() => {
      cooldowns.delete(key);
    }, ms);
    
    return true;
  };
}

export function RequireDatabase(): MiddlewareFunction {
  return async (ctx) => {
    try {
      const { getDatabase } = await import('../database/db');
      const db = getDatabase();
      
      if (!db) {
        await ctx.interaction.reply({
          content: '❌ Database is not configured!',
          flags: 64,
        });
        return false;
      }
    } catch (error) {
      await ctx.interaction.reply({
        content: '❌ Database is not available!',
        flags: 64,
      });
      return false;
    }
    
    return true;
  };
}

export function RequireGuild(): MiddlewareFunction {
  return async (ctx) => {
    if (!ctx.interaction.guild) {
      await ctx.interaction.reply({
        content: '❌ This command can only be used in a server!',
        flags: 64,
      });
      return false;
    }
    
    return true;
  };
}

export function RequireRole(roleId: string): MiddlewareFunction {
  return async (ctx) => {
    const member = ctx.interaction.member;
    
    if (!member?.roles?.cache?.has(roleId)) {
      await ctx.interaction.reply({
        content: '❌ You do not have the required role!',
        flags: 64,
      });
      return false;
    }
    
    return true;
  };
}

export function OwnerOnly(ownerId: string): MiddlewareFunction {
  return async (ctx) => {
    if (ctx.interaction.user.id !== ownerId) {
      await ctx.interaction.reply({
        content: '❌ This command is only available to the bot owner!',
        flags: 64,
      });
      return false;
    }
    
    return true;
  };
}

export function RateLimit(maxUses: number, windowMs: number): MiddlewareFunction {
  const usages = new Map<string, number[]>();
  
  return async (ctx) => {
    const userId = ctx.interaction.user.id;
    const key = `${ctx.command.name}:${userId}`;
    const now = Date.now();
    
    let userUsages = usages.get(key) || [];
    userUsages = userUsages.filter(time => now - time < windowMs);
    
    if (userUsages.length >= maxUses) {
      const oldestUsage = Math.min(...userUsages);
      const resetTime = Math.ceil((oldestUsage + windowMs - now) / 1000);
      
      await ctx.interaction.reply({
        content: `⏱️ Rate limit exceeded! Try again in ${resetTime}s.`,
        flags: 64,
      });
      return false;
    }
    
    userUsages.push(now);
    usages.set(key, userUsages);
    
    return true;
  };
}
