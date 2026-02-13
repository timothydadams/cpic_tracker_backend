import { describe, it, expect } from 'vitest';
import {
  buildCommentTree,
  PUBLIC_USER_SELECT,
  AUTH_USER_SELECT,
  getUserSelect,
} from '../../../server/utils/commentTree.js';

describe('PUBLIC_USER_SELECT', () => {
  it('contains expected public user fields', () => {
    expect(PUBLIC_USER_SELECT).toEqual({
      id: true,
      username: true,
      profile_pic: true,
    });
  });
});

describe('AUTH_USER_SELECT', () => {
  it('contains all public fields plus authenticated fields', () => {
    expect(AUTH_USER_SELECT).toEqual({
      id: true,
      username: true,
      profile_pic: true,
      display_name: true,
      given_name: true,
      family_name: true,
      email: true,
    });
  });

  it('is a superset of PUBLIC_USER_SELECT', () => {
    for (const key of Object.keys(PUBLIC_USER_SELECT)) {
      expect(AUTH_USER_SELECT).toHaveProperty(key, true);
    }
  });
});

describe('getUserSelect', () => {
  it('returns AUTH_USER_SELECT when store is authenticated', () => {
    const mockAls = { getStore: () => ({ isAuthenticated: true }) };
    expect(getUserSelect(mockAls)).toEqual(AUTH_USER_SELECT);
  });

  it('returns PUBLIC_USER_SELECT when store is not authenticated', () => {
    const mockAls = { getStore: () => ({ isAuthenticated: false }) };
    expect(getUserSelect(mockAls)).toEqual(PUBLIC_USER_SELECT);
  });

  it('returns PUBLIC_USER_SELECT when store is undefined', () => {
    const mockAls = { getStore: () => undefined };
    expect(getUserSelect(mockAls)).toEqual(PUBLIC_USER_SELECT);
  });
});

describe('buildCommentTree', () => {
  it('returns empty array for empty input', () => {
    expect(buildCommentTree([])).toEqual([]);
  });

  it('returns all comments as roots when none have parent_id', () => {
    const comments = [
      { id: 1, parent_id: null, content: 'root 1' },
      { id: 2, parent_id: null, content: 'root 2' },
    ];

    const tree = buildCommentTree(comments);

    expect(tree).toHaveLength(2);
    expect(tree[0].children).toEqual([]);
    expect(tree[1].children).toEqual([]);
  });

  it('nests single-level replies under their parent', () => {
    const comments = [
      { id: 1, parent_id: null, content: 'root' },
      { id: 2, parent_id: 1, content: 'reply to root' },
      { id: 3, parent_id: 1, content: 'another reply to root' },
    ];

    const tree = buildCommentTree(comments);

    expect(tree).toHaveLength(1);
    expect(tree[0].id).toBe(1);
    expect(tree[0].children).toHaveLength(2);
    expect(tree[0].children[0].id).toBe(2);
    expect(tree[0].children[1].id).toBe(3);
  });

  it('handles deeply nested replies', () => {
    const comments = [
      { id: 1, parent_id: null, content: 'level 0' },
      { id: 2, parent_id: 1, content: 'level 1' },
      { id: 3, parent_id: 2, content: 'level 2' },
      { id: 4, parent_id: 3, content: 'level 3' },
      { id: 5, parent_id: 4, content: 'level 4' },
    ];

    const tree = buildCommentTree(comments);

    expect(tree).toHaveLength(1);
    expect(tree[0].children[0].children[0].children[0].children[0].id).toBe(5);
  });

  it('handles multiple root comments with separate reply chains', () => {
    const comments = [
      { id: 1, parent_id: null, content: 'root A' },
      { id: 2, parent_id: null, content: 'root B' },
      { id: 3, parent_id: 1, content: 'reply to A' },
      { id: 4, parent_id: 2, content: 'reply to B' },
    ];

    const tree = buildCommentTree(comments);

    expect(tree).toHaveLength(2);
    expect(tree[0].children).toHaveLength(1);
    expect(tree[0].children[0].id).toBe(3);
    expect(tree[1].children).toHaveLength(1);
    expect(tree[1].children[0].id).toBe(4);
  });

  it('preserves extra fields like user on each node', () => {
    const user = { id: 'u1', username: 'alice', profile_pic: 'pic.jpg' };
    const comments = [
      { id: 1, parent_id: null, content: 'root', user },
      { id: 2, parent_id: 1, content: 'reply', user },
    ];

    const tree = buildCommentTree(comments);

    expect(tree[0].user).toEqual(user);
    expect(tree[0].children[0].user).toEqual(user);
  });

  it('treats orphan comments (parent not in list) as roots', () => {
    const comments = [
      { id: 5, parent_id: 999, content: 'orphan reply' },
      { id: 6, parent_id: null, content: 'root' },
    ];

    const tree = buildCommentTree(comments);

    expect(tree).toHaveLength(2);
  });

  it('does not mutate the original comment objects', () => {
    const comments = [
      { id: 1, parent_id: null, content: 'root' },
      { id: 2, parent_id: 1, content: 'reply' },
    ];

    buildCommentTree(comments);

    expect(comments[0]).not.toHaveProperty('children');
    expect(comments[1]).not.toHaveProperty('children');
  });
});
