import { describe, it, expect } from 'vitest';
import { Event } from '../../src/events/Event';

class TestEvent extends Event {
  async execute(...args: any[]): Promise<void> {
    return Promise.resolve();
  }
}

describe('Event', () => {
  describe('constructor', () => {
    it('should create event with name', () => {
      const event = new TestEvent({ name: 'testEvent' });
      expect(event.name).toBe('testEvent');
      expect(event.once).toBe(false);
    });

    it('should create event with once flag', () => {
      const event = new TestEvent({ name: 'testEvent', once: true });
      expect(event.once).toBe(true);
    });

    it('should default once to false', () => {
      const event = new TestEvent({ name: 'testEvent' });
      expect(event.once).toBe(false);
    });
  });

  describe('execute', () => {
    it('should be implemented by subclass', async () => {
      const event = new TestEvent({ name: 'testEvent' });
      await expect(event.execute()).resolves.toBeUndefined();
    });
  });
});
