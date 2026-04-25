import { describe, it, expect } from 'vitest';
import { chunkMessage } from '../../src/utils/MessageChunker';

describe('MessageChunker', () => {
  describe('chunkMessage', () => {
    it('should return single chunk for short message', () => {
      const message = 'Short message';
      const chunks = chunkMessage(message, { maxLength: 2000 });
      
      expect(chunks).toHaveLength(1);
      expect(chunks[0]).toBe(message);
    });

    it('should split long message into multiple chunks', () => {
      const message = 'a'.repeat(3000);
      const chunks = chunkMessage(message, { maxLength: 2000 });
      
      expect(chunks.length).toBeGreaterThan(1);
      chunks.forEach(chunk => {
        expect(chunk.length).toBeLessThanOrEqual(2000);
      });
    });

    it('should respect custom max length', () => {
      const message = 'a'.repeat(150);
      const chunks = chunkMessage(message, { maxLength: 100 });
      
      expect(chunks.length).toBeGreaterThan(1);
      chunks.forEach(chunk => {
        expect(chunk.length).toBeLessThanOrEqual(100);
      });
    });

    it('should split by newlines when possible', () => {
      const message = 'Line 1\n' + 'a'.repeat(2000) + '\nLine 2';
      const chunks = chunkMessage(message, { maxLength: 2000, splitBy: '\n' });
      
      expect(chunks.length).toBeGreaterThan(1);
    });

    it('should add prefix to chunks', () => {
      const message = 'a'.repeat(3000);
      const prefix = '>>> ';
      const chunks = chunkMessage(message, { maxLength: 2000, prefix });
      
      chunks.forEach(chunk => {
        expect(chunk.startsWith(prefix)).toBe(true);
      });
    });

    it('should add suffix to chunks', () => {
      const message = 'a'.repeat(3000);
      const suffix = '\n...';
      const chunks = chunkMessage(message, { maxLength: 2000, suffix });
      
      chunks.forEach(chunk => {
        expect(chunk.endsWith(suffix)).toBe(true);
      });
    });

    it('should handle empty message', () => {
      const chunks = chunkMessage('', { maxLength: 2000 });
      
      expect(chunks).toHaveLength(1);
      expect(chunks[0]).toBe('');
    });

    it('should preserve message content', () => {
      const message = 'Test message with special chars: !@#$%^&*()';
      const chunks = chunkMessage(message, { maxLength: 2000 });
      
      expect(chunks.join('')).toBe(message);
    });
  });
});
