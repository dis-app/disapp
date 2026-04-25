import { describe, it, expect, beforeEach } from 'vitest';
import { Config } from '../../src/config/Config';

describe('Config', () => {
  let config: Config;

  beforeEach(() => {
    config = Config.getInstance();
  });

  it('should be a singleton', () => {
    const instance1 = Config.getInstance();
    const instance2 = Config.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should have default configuration', () => {
    const cfg = config.get();
    expect(cfg).toBeDefined();
    expect(cfg.commandsPath).toBeDefined();
    expect(cfg.eventsPath).toBeDefined();
  });

  it('should allow setting configuration', () => {
    config.set({ commandsPath: './custom/commands' });
    const cfg = config.get();
    expect(cfg.commandsPath).toBe('./custom/commands');
  });

  it('should merge configuration', () => {
    const original = config.get();
    config.set({ commandsPath: './new/path' });
    const updated = config.get();
    
    expect(updated.commandsPath).toBe('./new/path');
    expect(updated.eventsPath).toBe(original.eventsPath);
  });

  it('should handle token configuration', () => {
    config.set({ token: 'test_token' });
    expect(config.get().token).toBe('test_token');
  });

  it('should handle clientId configuration', () => {
    config.set({ clientId: '123456789' });
    expect(config.get().clientId).toBe('123456789');
  });

  it('should handle guildId configuration', () => {
    config.set({ guildId: '987654321' });
    expect(config.get().guildId).toBe('987654321');
  });

  it('should handle database configuration', () => {
    config.set({ 
      database: { 
        url: 'postgresql://localhost:5432/test' 
      } 
    });
    expect(config.get().database?.url).toBe('postgresql://localhost:5432/test');
  });

  it('should handle logging configuration', () => {
    config.set({ 
      logging: { 
        level: 'debug',
        file: './logs/test.log'
      } 
    });
    const cfg = config.get();
    expect(cfg.logging?.level).toBe('debug');
    expect(cfg.logging?.file).toBe('./logs/test.log');
  });
});
