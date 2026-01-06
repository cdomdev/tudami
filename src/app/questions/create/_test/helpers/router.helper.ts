import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { vi } from 'vitest'
import { useRouter } from 'next/navigation'

export interface MockRouter extends AppRouterInstance {
  push: ReturnType<typeof vi.fn>
  replace: ReturnType<typeof vi.fn>
  refresh: ReturnType<typeof vi.fn>
  back: ReturnType<typeof vi.fn>
  forward: ReturnType<typeof vi.fn>
  prefetch: ReturnType<typeof vi.fn>
}

/**
 * Crea un mock del router de Next.js con todas las funciones necesarias
 */
export function createMockRouter(
  overrides?: Partial<MockRouter>
): MockRouter {
  return {
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    ...overrides,
  } as MockRouter
}

/**
 * Configura el mock del router para un test específico
 * @returns Las funciones mockeadas para hacer assertions
 */
export function setupRouterMock(overrides?: Partial<MockRouter>) {
  const mockRouter = createMockRouter(overrides)
  
  vi.mocked(useRouter).mockReturnValue(mockRouter)
  
  return mockRouter
}

/**
 * Resetea el mock del router a su estado por defecto
 */
export function resetRouterMock() {
  const defaultRouter = createMockRouter()
  vi.mocked(useRouter).mockReturnValue(defaultRouter)
  return defaultRouter
}