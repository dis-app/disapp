import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DynamicConfig } from '../../src/config/DynamicConfig';
import { Logger } from '../../src/utils/Logger';
import fs from 'fs';
import path from 'path';

const TEST_CONFIG_PATH = path.join(__dirname, '__test_config__.json');

describe('DynamicConfig', () => {
  let config: DynamicConfig;
  let logger: Logger;

  beforeEach(() => {
    if (fs.existsSync(TEST_CONFIG_PATH)) {
      fs.unlinkSync(TEST_CONFIG_PATH);
    }
    logger = new Logger({ level: 'error' });
    config = DynamicConfig.getInstance(TEST_CONFIG_PATH, logger);
  });

  afterEach(() => {
    config.stopWatching();
    if (fs.existsSync(TEST_CONFIG_PATH)) {
      fs.unlinkSync(TEST_CONFIG_PATH);
    }
  });

  describe('getInstance', () => {
    it('should create singleton instance', () => {
      const instance1 = DynamicConfig.getInstance(TEST_CONFIG_PATH);
      const instance2 = DynamicConfig.getInstance(TEST_CONFIG_PATH);
      
      expect(instance1).toBe(instance2);
    });
  });

  describe('get', () => {
    it('should get config value', () => {
      const prefix = config.get('prefix');
      expect(prefix).toBe('!');
    });

    it('should get color value', () => {
      const color = config.get('color');
      expect(color).toBe(0x5865f2);
    });
  });

  describe('set', () => {
    it('should set config value', () => {
      config.set('prefix', '?');
      expect(config.get('prefix')).toBe('?');
    });

    it('should emit updated event', () => {
      return new Promise<void>((resolve) => {
        config.once('updated', (key, value) => {
          expect(key).toBe('prefix');
          expect(value).toBe('?');
          resolve();
        });
        
        config.set('prefix', '?');
      });
    });
  });

  describe('update', () => {
    it('should update multiple values', () => {
      config.update({
        prefix: '?',
        color: 0xFF0000,
      });
      
      expect(config.get('prefix')).toBe('?');
      expect(config.get('color')).toBe(0xFF0000);
    });

    it('should emit updated event', () => {
      return new Promise<void>((resolve) => {
        config.once('updated', (updates) => {
          expect(updates.prefix).toBe('?');
          resolve();
        });
        
        config.update({ prefix: '?' });
      });
    });
  });

  describe('getAll', () => {
    it('should get all config', () => {
      const all = config.getAll();
      
      expect(all).toHaveProperty('prefix');
      expect(all).toHaveProperty('color');
      expect(all).toHaveProperty('maintenanceMode');
    });
  });

  describe('reset', () => {
    it('should reset to default config', () => {
      config.set('prefix', '?');
      config.reset();
      
      expect(config.get('prefix')).toBe('!');
    });

    it('should emit reset event', () => {
      return new Promise<void>((resolve) => {
        config.once('reset', (cfg) => {
          expect(cfg.prefix).toBe('!');
          resolve();
        });
        
        config.reset();
      });
    });
  });

  describe('isMaintenanceMode', () => {
    it('should return false by default', () => {
      expect(config.isMaintenanceMode()).toBe(false);
    });

    it('should return true when enabled', () => {
      config.set('maintenanceMode', true);
      expect(config.isMaintenanceMode()).toBe(true);
    });
  });

  describe('isFeatureEnabled', () => {
    it('should return true for enabled features', () => {
      expect(config.isFeatureEnabled('commands')).toBe(true);
      expect(config.isFeatureEnabled('events')).toBe(true);
    });

    it('should return false for disabled features', () => {
      config.update({
        features: {
          commands: false,
          events: true,
          database: true,
        },
      });
      
      expect(config.isFeatureEnabled('commands')).toBe(false);
    });
  });

  describe('getCustom', () => {
    it('should get custom data', () => {
      config.setCustom('myKey', 'myValue');
      expect(config.getCustom('myKey')).toBe('myValue');
    });

    it('should return undefined for non-existent key', () => {
      expect(config.getCustom('nonexistent')).toBeUndefined();
    });
  });

  describe('setCustom', () => {
    it('should set custom data', () => {
      config.setCustom('myKey', 'myValue');
      expect(config.getCustom('myKey')).toBe('myValue');
    });

    it('should emit custom-updated event', () => {
      return new Promise<void>((resolve) => {
        config.once('custom-updated', (key, value) => {
          expect(key).toBe('myKey');
          expect(value).toBe('myValue');
          resolve();
        });
        
        config.setCustom('myKey', 'myValue');
      });
    });
  });

  describe('startWatching', () => {
    it('should start watching config file', () => {
      config.set('prefix', '!');
      expect(() => config.startWatching()).not.toThrow();
    });

    it('should not create multiple watchers', () => {
      config.set('prefix', '!');
      config.startWatching();
      config.startWatching();
      expect(() => config.stopWatching()).not.toThrow();
    });
  });

  describe('stopWatching', () => {
    it('should stop watching config file', () => {
      config.startWatching();
      expect(() => config.stopWatching()).not.toThrow();
    });

    it('should not throw when not watching', () => {
      expect(() => config.stopWatching()).not.toThrow();
    });
  });
});
