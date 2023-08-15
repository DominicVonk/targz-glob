import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'lcov', 'clover'],
      watermarks: {
        lines: [80, 95],
        functions: [80, 95],
        branches: [80, 95],
        statements: [80, 95],
      },
    },
  },
});
