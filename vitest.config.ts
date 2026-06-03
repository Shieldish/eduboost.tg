import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment:   'jsdom',
    globals:       true,
    setupFiles:    ['./tests/setup.ts'],
    coverage: {
      provider:  'v8',
      reporter:  ['text', 'json', 'lcov', 'cobertura'],
      // Seuils appliqués seulement sur les fichiers couverts (pas sur l'app entière)
      include:   [
        'app/components/ticket/**',
        'hooks/useOtpAuth.ts',
        'lib/confirmation-store.ts',
        'config/index.ts',
      ],
      exclude:   ['tests/**', '**/*.test.*'],
      thresholds: {
        statements: 70,
        branches:   60,
        functions:  70,
        lines:      70,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
