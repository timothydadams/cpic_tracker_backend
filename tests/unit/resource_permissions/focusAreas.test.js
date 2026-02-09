import { describe, it, expect } from 'vitest';
import { canCreate, canRead, canUpdate, canDelete } from '../../../server/resource_permissions/focusAreas.js';
import { adminUser, cpicAdminUser, cpicMemberUser, implementerUser, viewerUser } from '../../fixtures/users.js';

describe('focusAreas permissions', () => {
  describe('canCreate', () => {
    it('allows Admin', () => expect(canCreate(adminUser)).toBe(true));
    it('denies CPIC Admin', () => expect(canCreate(cpicAdminUser)).toBe(false));
    it('denies CPIC Member', () => expect(canCreate(cpicMemberUser)).toBe(false));
    it('denies Viewer', () => expect(canCreate(viewerUser)).toBe(false));
  });

  describe('canRead', () => {
    it('allows everyone', () => expect(canRead()).toBe(true));
  });

  describe('canUpdate', () => {
    it('allows Admin', () => expect(canUpdate(adminUser)).toBe(true));
    it('denies CPIC Admin', () => expect(canUpdate(cpicAdminUser)).toBe(false));
    it('denies CPIC Member', () => expect(canUpdate(cpicMemberUser)).toBe(false));
    it('denies Implementer', () => expect(canUpdate(implementerUser)).toBe(false));
  });

  describe('canDelete', () => {
    it('allows Admin', () => expect(canDelete(adminUser)).toBe(true));
    it('denies CPIC Admin', () => expect(canDelete(cpicAdminUser)).toBe(false));
    it('denies others', () => expect(canDelete(viewerUser)).toBe(false));
  });
});
