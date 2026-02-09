import { describe, it, expect } from 'vitest';
import { handleResponse } from '../../../server/utils/defaultResponse.js';
import { createMockRes } from '../../mocks/express.js';

describe('handleResponse', () => {
  it('calls res.status().json() with correct shape', () => {
    const res = createMockRes();
    handleResponse(res, 200, 'success', { id: 1 });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: 'success',
      data: { id: 1 },
    });
  });

  it('defaults data to null when not provided', () => {
    const res = createMockRes();
    handleResponse(res, 404, 'not found');

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: 'not found',
      data: null,
    });
  });

  it('handles error status codes', () => {
    const res = createMockRes();
    handleResponse(res, 500, 'server error');

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: 'server error',
      data: null,
    });
  });
});
