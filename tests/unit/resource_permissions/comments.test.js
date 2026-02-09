import { describe, it, expect } from 'vitest';
import { canCreate, canRead, canReadAll, canUpdate, canDelete } from '../../../server/resource_permissions/comments.js';
import { adminUser, cpicAdminUser, cpicMemberUser, implementerUser, viewerUser } from '../../fixtures/users.js';

const ownComment = { user_id: 'viewer-uuid' };
const otherComment = { user_id: 'someone-else' };

describe('comments permissions', () => {
  describe('canCreate', () => {
    it('allows Admin', () => expect(canCreate(adminUser)).toBe(true));
    it('allows CPIC Admin', () => expect(canCreate(cpicAdminUser)).toBe(true));
    it('allows CPIC Member', () => expect(canCreate(cpicMemberUser)).toBe(true));
    it('allows Implementer', () => expect(canCreate(implementerUser)).toBe(true));
    it('denies Viewer', () => expect(canCreate(viewerUser)).toBe(false));
  });

  describe('canRead', () => {
    it('allows everyone', () => expect(canRead(viewerUser, {})).toBe(true));
  });

  describe('canReadAll', () => {
    it('allows Admin', () => expect(canReadAll(adminUser)).toBe(true));
    it('allows CPIC Admin', () => expect(canReadAll(cpicAdminUser)).toBe(true));
    it('denies CPIC Member', () => expect(canReadAll(cpicMemberUser)).toBe(false));
    it('denies Implementer', () => expect(canReadAll(implementerUser)).toBe(false));
    it('denies Viewer', () => expect(canReadAll(viewerUser)).toBe(false));
  });

  describe('canUpdate', () => {
    it('allows Admin (any comment)', () => expect(canUpdate(adminUser, otherComment)).toBe(true));
    it('allows comment owner', () => expect(canUpdate(viewerUser, ownComment)).toBe(true));
    it('denies non-owner non-admin', () => expect(canUpdate(cpicMemberUser, otherComment)).toBe(false));
  });

  describe('canDelete', () => {
    it('allows Admin', () => expect(canDelete(adminUser, otherComment)).toBe(true));
    it('allows CPIC Admin', () => expect(canDelete(cpicAdminUser, otherComment)).toBe(true));
    it('allows comment owner', () => expect(canDelete(viewerUser, ownComment)).toBe(true));
    it('denies non-owner CPIC Member', () => expect(canDelete(cpicMemberUser, otherComment)).toBe(false));
    it('denies non-owner Implementer', () => expect(canDelete(implementerUser, otherComment)).toBe(false));
  });
});
