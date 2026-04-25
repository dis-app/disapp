import { watch, FSWatcher } from 'fs';
import { Logger } from './Logger';

export class HotReload {
  private watchers: Map<string, FSWatcher> = new Map();
  private logger: Logger;
  private moduleCache: Set<string> = new Set();

  constructor(logger: Logger) {
    this.logger = logger;
  }

  watch(path: string, callback: () => Promise<void>): void {
    if (this.watchers.has(path)) {
      this.logger.warn(`Already watching: ${path}`);
      return;
    }

    const watcher = watch(path, { recursive: true }, async (eventType, filename) => {
      if (!filename || (!filename.endsWith('.ts') && !filename.endsWith('.js'))) {
        return;
      }

      this.logger.info(`🔄 File changed: ${filename}`);
      
      await this.clearModuleCache(path);
      
      try {
        await callback();
        this.logger.success('Hot reload completed');
      } catch (error) {
        this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        this.logger.error('❌ Hot Reload Failed');
        this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        this.logger.error(`File: ${filename}`);
        this.logger.error('', error as Error);
        this.logger.error('');
        this.logger.error('The bot will continue running with old code');
        this.logger.error('Fix the error and save again to retry');
        this.logger.error('');
        this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      }
    });

    this.watchers.set(path, watcher);
    this.logger.success(`Hot reload enabled: ${path}`);
  }

  private async clearModuleCache(basePath: string): Promise<void> {
    const keysToDelete: string[] = [];

    for (const key in require.cache) {
      if (key.includes(basePath)) {
        keysToDelete.push(key);
        this.moduleCache.add(key);
      }
    }

    keysToDelete.forEach(key => {
      delete require.cache[key];
    });

    if (keysToDelete.length > 0) {
      this.logger.debug(`Cleared ${keysToDelete.length} modules from cache`);
    }
  }

  stopAll(): void {
    this.watchers.forEach((watcher, path) => {
      watcher.close();
      this.logger.info(`Stopped watching: ${path}`);
    });
    
    this.watchers.clear();
    this.moduleCache.clear();
  }

  getStats() {
    return {
      watchedPaths: this.watchers.size,
      cachedModules: this.moduleCache.size,
    };
  }
}
