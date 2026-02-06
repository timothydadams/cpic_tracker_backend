import { describe, it, expect } from 'vitest';
import { canRead, canUpdate, canDelete, canAddRemoveRoles, canRemovePasskey } from '../../../server/resource_permissions/users.js';
import { adminUser, cpicAdminUser, cpicMemberUser, viewerUser } from '../../fixtures/users.js';

const selfObject = { id: 'viewer-uuid' };
const otherObject = { id: 'other-uuid' };

describe('users permissions', () => {
  describe('canRead', () => {
    it('allows Admin', () => expect(canRead(adminUser, otherObject)).toBe(true));
    it('allows self', () => expect(canRead(viewerUser, selfObject)).toBe(true));
    it('denies other user (non-admin)', () => expect(canRead(viewerUser, otherObject)).toBe(false));
  });

  describe('canUpdate', () => {
    it('allows Admin', () => expect(canUpdate(adminUser, otherObject)).toBe(true));
    it('allows self', () => expect(canUpdate(viewerUser, selfObject)).toBe(true));
    it('denies other user (non-admin)', () => expect(canUpdate(cpicMemberUser, otherObject)).toBe(false));
  });

  describe('canDelete', () => {
    it('allows Admin', () => expect(canDelete(adminUser, otherObject)).toBe(true));
    it('allows self', () => expect(canDelete(viewerUser, selfObject)).toBe(true));
    it('denies other user (non-admin)', () => expect(canDelete(cpicMemberUser, otherObject)).toBe(false));
  });

  describe('canAddRemoveRoles', () => {
    it('allows Admin', () => expect(canAddRemoveRoles(adminUser)).toBe(true));
    it('denies CPIC Admin', () => expect(canAddRemoveRoles(cpicAdminUser)).toBe(false));
    it('denies CPIC Member', () => expect(canAddRemoveRoles(cpicMemberUser)).toBe(false));
    it('denies Viewer', () => expect(canAddRemoveRoles(viewerUser)).toBe(false));
  });

  describe('canRemovePasskey', () => {
    it('allows owner', () => {
      const passkey = { userId: 'viewer-uuid' };
      expect(canRemovePasskey(viewerUser, passkey)).toBe(true);
    });
    it('denies non-owner', () => {
      const passkey = { userId: 'someone-else' };
      expect(canRemovePasskey(viewerUser, passkey)).toBe(false);
    });
  });
});
