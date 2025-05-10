import { create } from 'zustand'

interface AuthState {
  token: string | null
  setToken: (token: string) => void
  clearToken: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: sessionStorage.getItem('token'),
  setToken: (token) => {
    set({ token })
    sessionStorage.setItem('token', token)
  },
  clearToken: () => {
    set({ token: null })
    sessionStorage.removeItem('token')
  },
}))
