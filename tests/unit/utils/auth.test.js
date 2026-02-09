import { describe, it, expect } from 'vitest';
import {
  hashPassword,
  comparePasswords,
  createJWT,
  createObjFromFilteredKeys,
  ensureUint8Array,
} from '../../../server/utils/auth.js';
import jwt from 'jsonwebtoken';

describe('hashPassword / comparePasswords', () => {
  it('hashes a password and successfully compares it', async () => {
    const password = 'testpassword123';
    const hash = await hashPassword(password);
    expect(hash).not.toBe(password);
    const match = await comparePasswords(password, hash);
    expect(match).toBe(true);
  });

  it('returns false for wrong password', async () => {
    const hash = await hashPassword('correct');
    const match = await comparePasswords('wrong', hash);
    expect(match).toBe(false);
  });
});

describe('createJWT', () => {
  const user = {
    id: 'user-123',
    email: 'test@test.com',
    roles: ['Admin'],
    name: 'Test User',
    display_name: 'Test',
    given_name: 'Test',
    family_name: 'User',
  };

  it('returns an object with accessToken and refreshToken', () => {
    const tokens = createJWT(user);
    expect(tokens).toHaveProperty('accessToken');
    expect(tokens).toHaveProperty('refreshToken');
    expect(typeof tokens.accessToken).toBe('string');
    expect(typeof tokens.refreshToken).toBe('string');
  });

  it('access token contains user claims', () => {
    const { accessToken } = createJWT(user);
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    expect(decoded.id).toBe(user.id);
    expect(decoded.email).toBe(user.email);
    expect(decoded.roles).toEqual(user.roles);
  });

  it('refresh token contains user id', () => {
    const { refreshToken } = createJWT(user);
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    expect(decoded.id).toBe(user.id);
  });

  it('uses SHORT duration by default', () => {
    const { refreshToken } = createJWT(user);
    const decoded = jwt.decode(refreshToken);
    // SHORT duration = 2m = 120s
    const lifetime = decoded.exp - decoded.iat;
    expect(lifetime).toBe(120);
  });

  it('uses LONG duration when specified', () => {
    const { refreshToken } = createJWT(user, 'LONG');
    const decoded = jwt.decode(refreshToken);
    // LONG duration = 10m = 600s
    const lifetime = decoded.exp - decoded.iat;
    expect(lifetime).toBe(600);
  });
});

describe('createObjFromFilteredKeys', () => {
  it('filters object to only include specified keys', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = createObjFromFilteredKeys(obj, ['a', 'c']);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('ignores keys not present in the object', () => {
    const obj = { a: 1 };
    const result = createObjFromFilteredKeys(obj, ['a', 'missing']);
    expect(result).toEqual({ a: 1 });
  });

  it('returns empty object when no keys match', () => {
    const obj = { a: 1 };
    const result = createObjFromFilteredKeys(obj, ['x', 'y']);
    expect(result).toEqual({});
  });
});

describe('ensureUint8Array', () => {
  it('returns same Uint8Array if already Uint8Array', () => {
    const arr = new Uint8Array([1, 2, 3]);
    expect(ensureUint8Array(arr)).toBe(arr);
  });

  it('converts a regular array', () => {
    const result = ensureUint8Array([1, 2, 3]);
    expect(result).toBeInstanceOf(Uint8Array);
    expect([...result]).toEqual([1, 2, 3]);
  });

  it('converts a Buffer', () => {
    const buf = Buffer.from([10, 20, 30]);
    const result = ensureUint8Array(buf);
    expect(result).toBeInstanceOf(Uint8Array);
    expect([...result]).toEqual([10, 20, 30]);
  });

  it('converts an object with numeric keys', () => {
    const obj = { '0': 165, '1': 1, '2': 2 };
    const result = ensureUint8Array(obj);
    expect(result).toBeInstanceOf(Uint8Array);
    expect([...result]).toEqual([165, 1, 2]);
  });

  it('throws for unsupported types', () => {
    expect(() => ensureUint8Array('string')).toThrow('Unsupported data format');
  });
});
