import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { HotReload } from '../../src/utils/HotReload';
import { Logger } from '../../src/utils/Logger';

describe('HotReload', () => {
  let hotReload: HotReload;
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger({ level: 'error' });
    hotReload = new HotReload(logger);
  });

  afterEach(() => {
    hotReload.stopAll();
  });

  describe('constructor', () => {
    it('should create HotReload instance', () => {
      expect(hotReload).toBeDefined();
    });
  });

  describe('getStats', () => {
    it('should return initial stats', () => {
      const stats = hotReload.getStats();
      expect(stats.watchedPaths).toBe(0);
      expect(stats.cachedModules).toBe(0);
    });
  });

  describe('stopAll', () => {
    it('should stop all watchers', () => {
      hotReload.stopAll();
      const stats = hotReload.getStats();
      expect(stats.watchedPaths).toBe(0);
    });
  });
});
