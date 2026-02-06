import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.js'],
    coverage: {
      provider: 'v8',
      include: ['server/**/*.js'],
      exclude: ['server/index.js', 'server/configs/db.js'],
    },
  },
});
