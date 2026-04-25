import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ErrorHandler } from '../../src/middleware/ErrorHandler';
import { Logger } from '../../src/utils/Logger';

describe('ErrorHandler', () => {
  let errorHandler: ErrorHandler;
  let mockLogger: Logger;

  beforeEach(() => {
    mockLogger = new Logger({ level: 'error' });
    errorHandler = new ErrorHandler(mockLogger);
  });

  describe('handle', () => {
    it('should handle error without context', () => {
      const error = new Error('Test error');
      expect(() => errorHandler.handle(error)).not.toThrow();
    });

    it('should handle error with context', () => {
      const error = new Error('Test error');
      expect(() => errorHandler.handle(error, 'test context')).not.toThrow();
    });
  });

  describe('handleAsync', () => {
    it('should execute function successfully', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      const result = await errorHandler.handleAsync(fn);
      
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalled();
    });

    it('should handle async function error', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('Async error'));
      const result = await errorHandler.handleAsync(fn, 'async context');
      
      expect(result).toBeNull();
      expect(fn).toHaveBeenCalled();
    });

    it('should return null on error', async () => {
      const fn = async () => {
        throw new Error('Test error');
      };
      
      const result = await errorHandler.handleAsync(fn);
      expect(result).toBeNull();
    });
  });

  describe('handleCommandError', () => {
    it('should handle command error', () => {
      const error = new Error('Command failed');
      expect(() => errorHandler.handleCommandError(error, 'ping', 'user123')).not.toThrow();
    });
  });

  describe('handleDatabaseError', () => {
    it('should handle database error', () => {
      const error = new Error('Database connection failed');
      expect(() => errorHandler.handleDatabaseError(error, 'SELECT * FROM users')).not.toThrow();
    });
  });

  describe('handleValidationError', () => {
    it('should handle validation errors', () => {
      const errors = ['Field is required', 'Invalid email format'];
      expect(() => errorHandler.handleValidationError(errors)).not.toThrow();
    });

    it('should handle empty validation errors', () => {
      expect(() => errorHandler.handleValidationError([])).not.toThrow();
    });
  });
});
