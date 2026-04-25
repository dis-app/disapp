import { describe, it, expect } from 'vitest';
import { AutoChunker } from '../../src/utils/AutoChunker';

describe('AutoChunker', () => {
  describe('autoChunk', () => {
    it('should return single chunk for short content', () => {
      const content = 'Short content';
      const chunks = AutoChunker.autoChunk(content);
      
      expect(chunks).toHaveLength(1);
      expect(chunks[0]).toBe(content);
    });

    it('should split long content into multiple chunks', () => {
      const lines = Array(150).fill('a'.repeat(20));
      const content = lines.join('\n');
      const chunks = AutoChunker.autoChunk(content, { maxLength: 2000 });
      
      expect(chunks.length).toBeGreaterThan(1);
      chunks.forEach(chunk => {
        expect(chunk.length).toBeLessThanOrEqual(2100);
      });
    });

    it('should use default max length of 2000', () => {
      const content = 'a'.repeat(2500);
      const chunks = AutoChunker.autoChunk(content);
      
      expect(chunks.length).toBeGreaterThan(1);
      chunks.forEach(chunk => {
        expect(chunk.length).toBeLessThanOrEqual(2000);
      });
    });

    it('should preserve content when chunking', () => {
      const content = 'Test content with multiple words and sentences.';
      const chunks = AutoChunker.autoChunk(content);
      
      expect(chunks.join('')).toBe(content);
    });

    it('should handle empty content', () => {
      const chunks = AutoChunker.autoChunk('');
      
      expect(chunks).toHaveLength(1);
      expect(chunks[0]).toBe('');
    });

    it('should respect custom max length', () => {
      const lines = Array(50).fill('a'.repeat(10));
      const content = lines.join('\n');
      const chunks = AutoChunker.autoChunk(content, { maxLength: 200 });
      
      expect(chunks.length).toBeGreaterThan(1);
      chunks.forEach(chunk => {
        expect(chunk.length).toBeLessThanOrEqual(220);
      });
    });
  });
});
