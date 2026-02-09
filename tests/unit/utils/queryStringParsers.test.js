import { describe, it, expect } from 'vitest';
import { parseBoolean, buildNestedIncludeObject } from '../../../server/utils/queryStringParsers.js';

describe('parseBoolean', () => {
  it('returns true for "true"', () => {
    expect(parseBoolean('true')).toBe(true);
  });

  it('returns true for "TRUE" (case-insensitive)', () => {
    expect(parseBoolean('TRUE')).toBe(true);
  });

  it('returns true for "1"', () => {
    expect(parseBoolean('1')).toBe(true);
  });

  it('returns false for "false"', () => {
    expect(parseBoolean('false')).toBe(false);
  });

  it('returns false for "0"', () => {
    expect(parseBoolean('0')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(parseBoolean('')).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(parseBoolean(undefined)).toBe(false);
  });

  it('returns false for null', () => {
    expect(parseBoolean(null)).toBe(false);
  });

  it('returns true for non-zero number', () => {
    expect(parseBoolean(42)).toBe(true);
  });

  it('returns false for 0', () => {
    expect(parseBoolean(0)).toBe(false);
  });

  it('returns false for random string', () => {
    expect(parseBoolean('hello')).toBe(false);
  });
});

describe('buildNestedIncludeObject', () => {
  it('builds a single-level include', () => {
    expect(buildNestedIncludeObject(['policy'])).toEqual({ policy: true });
  });

  it('builds a two-level nested include', () => {
    expect(buildNestedIncludeObject(['policy', 'area'])).toEqual({
      policy: { include: { area: true } },
    });
  });

  it('builds a three-level nested include', () => {
    expect(buildNestedIncludeObject(['policy', 'area', 'strategies'])).toEqual({
      policy: { include: { area: { include: { strategies: true } } } },
    });
  });

  it('returns empty object for empty array', () => {
    expect(buildNestedIncludeObject([])).toEqual({});
  });
});
