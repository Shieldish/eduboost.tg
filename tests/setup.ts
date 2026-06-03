// tests/setup.ts — Configuration globale des tests Vitest
import '@testing-library/jest-dom'
import React from 'react'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push:    vi.fn(),
    replace: vi.fn(),
    back:    vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock Next.js Image (retourne un <img> React valide)
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: { src: string; alt: string; width?: number; height?: number }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', { src, alt, width, height })
  },
}))

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem:    (k: string) => store[k] ?? null,
    setItem:    (k: string, v: string) => { store[k] = v },
    removeItem: (k: string) => { delete store[k] },
    clear:      () => { store = {} },
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem:    (k: string) => store[k] ?? null,
    setItem:    (k: string, v: string) => { store[k] = v },
    removeItem: (k: string) => { delete store[k] },
    clear:      () => { store = {} },
  }
})()
Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock })

// Nettoyer entre chaque test
beforeEach(() => {
  localStorageMock.clear()
  sessionStorageMock.clear()
  vi.clearAllMocks()
})
