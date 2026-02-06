import { describe, it, expect } from 'vitest';
import { canCreate, canRead, canUpdate, canDelete } from '../../../server/resource_permissions/strategies.js';
import { adminUser, cpicAdminUser, cpicMemberUser, implementerUser, viewerUser } from '../../fixtures/users.js';

describe('strategies permissions', () => {
  describe('canCreate', () => {
    it('allows Admin', () => expect(canCreate(adminUser)).toBe(true));
    it('allows CPIC Admin', () => expect(canCreate(cpicAdminUser)).toBe(true));
    it('denies CPIC Member', () => expect(canCreate(cpicMemberUser)).toBe(false));
    it('denies Implementer', () => expect(canCreate(implementerUser)).toBe(false));
    it('denies Viewer', () => expect(canCreate(viewerUser)).toBe(false));
  });

  describe('canRead', () => {
    it('allows everyone (no user)', () => expect(canRead()).toBe(true));
    it('allows Admin', () => expect(canRead(adminUser)).toBe(true));
    it('allows Viewer', () => expect(canRead(viewerUser)).toBe(true));
  });

  describe('canUpdate', () => {
    it('allows Admin', () => expect(canUpdate(adminUser)).toBe(true));
    it('allows CPIC Admin', () => expect(canUpdate(cpicAdminUser)).toBe(true));
    it('allows CPIC Member', () => expect(canUpdate(cpicMemberUser)).toBe(true));
    it('denies Implementer', () => expect(canUpdate(implementerUser)).toBe(false));
    it('denies Viewer', () => expect(canUpdate(viewerUser)).toBe(false));
  });

  describe('canDelete', () => {
    it('allows Admin', () => expect(canDelete(adminUser)).toBe(true));
    it('denies CPIC Admin', () => expect(canDelete(cpicAdminUser)).toBe(false));
    it('denies CPIC Member', () => expect(canDelete(cpicMemberUser)).toBe(false));
    it('denies Implementer', () => expect(canDelete(implementerUser)).toBe(false));
    it('denies Viewer', () => expect(canDelete(viewerUser)).toBe(false));
  });
});
