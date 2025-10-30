// src/app/questions/create/_test/helpers/session.helper.ts
import { vi } from 'vitest'

export interface MockUser {
  full_name: string
  email: string
  id?: string
}

let currentUser: MockUser | null = null

export function setMockUser(user: MockUser | null) {
  currentUser = user
}

export function getMockUser() {
  return currentUser
}

vi.mock('@/context/context.sesion', () => ({
  useSession: vi.fn(() => ({
    get user() {
      return currentUser  
    },
    login: vi.fn(),
    logout: vi.fn(),
    loading: false,
  })),
}))