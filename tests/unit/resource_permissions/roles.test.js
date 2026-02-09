import { describe, it, expect } from 'vitest';
import { canCreate, canRead, canUpdate, canDelete } from '../../../server/resource_permissions/roles.js';
import { adminUser, cpicAdminUser, cpicMemberUser, implementerUser, viewerUser } from '../../fixtures/users.js';

describe('roles permissions', () => {
  describe('canCreate', () => {
    it('allows Admin', () => expect(canCreate(adminUser)).toBe(true));
    it('denies CPIC Admin', () => expect(canCreate(cpicAdminUser)).toBe(false));
    it('denies CPIC Member', () => expect(canCreate(cpicMemberUser)).toBe(false));
    it('denies Viewer', () => expect(canCreate(viewerUser)).toBe(false));
  });

  describe('canRead', () => {
    it('allows Admin', () => expect(canRead(adminUser)).toBe(true));
    it('allows CPIC Admin', () => expect(canRead(cpicAdminUser)).toBe(true));
    it('allows CPIC Member', () => expect(canRead(cpicMemberUser)).toBe(true));
    it('allows Implementer', () => expect(canRead(implementerUser)).toBe(true));
    it('denies Viewer', () => expect(canRead(viewerUser)).toBe(false));
  });

  describe('canUpdate', () => {
    it('allows Admin', () => expect(canUpdate(adminUser)).toBe(true));
    it('denies CPIC Admin', () => expect(canUpdate(cpicAdminUser)).toBe(false));
    it('denies others', () => expect(canUpdate(viewerUser)).toBe(false));
  });

  describe('canDelete', () => {
    it('allows Admin', () => expect(canDelete(adminUser)).toBe(true));
    it('denies CPIC Admin', () => expect(canDelete(cpicAdminUser)).toBe(false));
    it('denies others', () => expect(canDelete(viewerUser)).toBe(false));
  });
});
