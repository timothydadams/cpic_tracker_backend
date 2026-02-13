import { describe, it, expect } from 'vitest';
import { pick } from '../../../server/utils/sanitize.js';

describe('pick', () => {
  it('returns only the specified keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  it('ignores keys not present in the source object', () => {
    const obj = { a: 1 };
    expect(pick(obj, ['a', 'b'])).toEqual({ a: 1 });
  });

  it('returns empty object when no keys match', () => {
    const obj = { a: 1, b: 2 };
    expect(pick(obj, ['x', 'y'])).toEqual({});
  });

  it('returns empty object for empty keys array', () => {
    const obj = { a: 1 };
    expect(pick(obj, [])).toEqual({});
  });

  it('returns empty object for empty source object', () => {
    expect(pick({}, ['a', 'b'])).toEqual({});
  });

  it('preserves falsy values', () => {
    const obj = { a: 0, b: '', c: null, d: false, e: undefined };
    expect(pick(obj, ['a', 'b', 'c', 'd', 'e'])).toEqual({
      a: 0,
      b: '',
      c: null,
      d: false,
      e: undefined,
    });
  });

  it('does not include prototype properties', () => {
    const parent = { inherited: true };
    const obj = Object.create(parent);
    obj.own = 1;
    expect(pick(obj, ['own', 'inherited'])).toEqual({ own: 1 });
  });
});
