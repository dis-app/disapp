import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CooldownManager } from '../../src/utils/CooldownManager';

describe('CooldownManager', () => {
  let manager: CooldownManager;

  beforeEach(() => {
    manager = new CooldownManager();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should allow first command execution', () => {
    const remaining = manager.check('test', 'user123', 5);
    expect(remaining).toBeNull();
  });

  it('should return remaining time if cooldown active', () => {
    manager.check('test', 'user123', 5);
    
    vi.advanceTimersByTime(2000);
    
    const remaining = manager.check('test', 'user123', 5);
    expect(remaining).toBeGreaterThan(0);
    expect(remaining).toBeLessThanOrEqual(3);
  });

  it('should allow command after cooldown expires', () => {
    manager.check('test', 'user123', 5);
    
    vi.advanceTimersByTime(6000);
    
    const remaining = manager.check('test', 'user123', 5);
    expect(remaining).toBeNull();
  });

  it('should handle different users independently', () => {
    manager.check('test', 'user1', 5);
    const remaining = manager.check('test', 'user2', 5);
    
    expect(remaining).toBeNull();
  });

  it('should handle different commands independently', () => {
    manager.check('command1', 'user123', 5);
    const remaining = manager.check('command2', 'user123', 5);
    
    expect(remaining).toBeNull();
  });

  it('should clear specific command cooldowns', () => {
    manager.check('test', 'user123', 5);
    manager.clear('test');
    
    const remaining = manager.check('test', 'user123', 5);
    expect(remaining).toBeNull();
  });

  it('should clear all cooldowns', () => {
    manager.check('command1', 'user123', 5);
    manager.check('command2', 'user456', 5);
    manager.clear();
    
    expect(manager.check('command1', 'user123', 5)).toBeNull();
    expect(manager.check('command2', 'user456', 5)).toBeNull();
  });
});
