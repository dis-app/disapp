import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Logger } from '../../src/utils/Logger';

describe('Logger', () => {
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger({ level: 'debug' });
  });

  describe('constructor', () => {
    it('should create logger with default config', () => {
      const defaultLogger = new Logger();
      expect(defaultLogger).toBeDefined();
    });

    it('should create logger with custom level', () => {
      const customLogger = new Logger({ level: 'warn' });
      expect(customLogger).toBeDefined();
    });

    it('should create logger with file output', () => {
      const fileLogger = new Logger({ level: 'info', file: 'test.log' });
      expect(fileLogger).toBeDefined();
    });
  });

  describe('info', () => {
    it('should log info message', () => {
      expect(() => logger.info('Test info message')).not.toThrow();
    });
  });

  describe('warn', () => {
    it('should log warning message', () => {
      expect(() => logger.warn('Test warning message')).not.toThrow();
    });
  });

  describe('error', () => {
    it('should log error message without error object', () => {
      expect(() => logger.error('Test error message')).not.toThrow();
    });

    it('should log error message with error object', () => {
      const error = new Error('Test error');
      expect(() => logger.error('Test error message', error)).not.toThrow();
    });
  });

  describe('debug', () => {
    it('should log debug message', () => {
      expect(() => logger.debug('Test debug message')).not.toThrow();
    });
  });

  describe('success', () => {
    it('should log success message', () => {
      expect(() => logger.success('Test success message')).not.toThrow();
    });
  });
});
