import { describe, it, expect } from 'vitest';
import { buildActivityChanges } from '../../../server/utils/buildActivityChanges.js';

describe('buildActivityChanges', () => {
  it('detects changed fields', () => {
    const oldData = { content: 'old text', status_id: 1 };
    const newData = { content: 'new text', status_id: 2 };

    const { changes, summary } = buildActivityChanges(oldData, newData);

    expect(changes).toEqual({
      content: { old: 'old text', new: 'new text' },
      status_id: { old: 1, new: 2 },
    });
    expect(summary).toBe('Updated content, status_id');
  });

  it('excludes unchanged fields', () => {
    const oldData = { content: 'same', status_id: 1, timeline_id: 3 };
    const newData = { content: 'same', status_id: 2 };

    const { changes } = buildActivityChanges(oldData, newData);

    expect(changes).toEqual({
      status_id: { old: 1, new: 2 },
    });
    expect(changes.content).toBeUndefined();
  });

  it('skips updatedAt and createdAt fields', () => {
    const oldData = { content: 'text', updatedAt: '2024-01-01', createdAt: '2024-01-01' };
    const newData = { content: 'text', updatedAt: '2024-06-01', createdAt: '2024-06-01' };

    const { changes } = buildActivityChanges(oldData, newData);

    expect(changes).toEqual({});
  });

  it('skips many-to-many relation fields but keeps foreign key relations', () => {
    const oldData = { content: 'text', focus_area: { id: 1 }, implementers: [], activities: [] };
    const newData = { content: 'text', focus_area: { id: 2 }, implementers: [1], activities: [] };

    const { changes } = buildActivityChanges(oldData, newData);

    expect(changes).toEqual({
      focus_area: { old: { id: 1 }, new: { id: 2 } },
    });
    expect(changes.implementers).toBeUndefined();
    expect(changes.activities).toBeUndefined();
  });

  it('skips id field', () => {
    const oldData = { id: 1, content: 'text' };
    const newData = { id: 1, content: 'new text' };

    const { changes } = buildActivityChanges(oldData, newData);

    expect(changes).toEqual({
      content: { old: 'text', new: 'new text' },
    });
    expect(changes.id).toBeUndefined();
  });

  it('returns "No changes" summary when nothing changed', () => {
    const oldData = { content: 'same', status_id: 1 };
    const newData = { content: 'same', status_id: 1 };

    const { changes, summary } = buildActivityChanges(oldData, newData);

    expect(changes).toEqual({});
    expect(summary).toBe('No changes');
  });

  it('handles null values in old data', () => {
    const oldData = { last_comms_date: null };
    const newData = { last_comms_date: '2024-06-01' };

    const { changes } = buildActivityChanges(oldData, newData);

    expect(changes).toEqual({
      last_comms_date: { old: null, new: '2024-06-01' },
    });
  });

  it('handles null values in new data', () => {
    const oldData = { last_comms_date: '2024-06-01' };
    const newData = { last_comms_date: null };

    const { changes } = buildActivityChanges(oldData, newData);

    expect(changes).toEqual({
      last_comms_date: { old: '2024-06-01', new: null },
    });
  });

  it('handles undefined values as null', () => {
    const oldData = {};
    const newData = { last_comms_date: '2024-06-01' };

    const { changes } = buildActivityChanges(oldData, newData);

    expect(changes).toEqual({
      last_comms_date: { old: null, new: '2024-06-01' },
    });
  });

  it('detects a single changed field', () => {
    const oldData = { content: 'old', status_id: 1 };
    const newData = { status_id: 2 };

    const { changes, summary } = buildActivityChanges(oldData, newData);

    expect(changes).toEqual({
      status_id: { old: 1, new: 2 },
    });
    expect(summary).toBe('Updated status_id');
  });
});
