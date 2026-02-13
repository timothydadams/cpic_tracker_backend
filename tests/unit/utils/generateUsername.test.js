import { describe, it, expect } from 'vitest';
import { generateUsername } from '../../../server/utils/generateUsername.js';

describe('generateUsername', () => {
  it('returns a string starting with user_', () => {
    const username = generateUsername();
    expect(username).toMatch(/^user_/);
  });

  it('has 8 hex characters after the prefix', () => {
    const username = generateUsername();
    expect(username).toMatch(/^user_[0-9a-f]{8}$/);
  });

  it('generates unique values on successive calls', () => {
    const results = new Set(Array.from({ length: 100 }, () => generateUsername()));
    expect(results.size).toBe(100);
  });
});
